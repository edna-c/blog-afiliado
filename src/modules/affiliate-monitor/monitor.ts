import { getCollector } from './collectors/index.ts';
import {
	loadMonitoringPolicy,
	needsStatusConfirmation,
	pickConfirmationDelayMs,
} from './config/monitoring-policy.ts';
import { requireMarketplacePlugin } from './marketplaces/index.ts';
import { filterTargetsBySchedule, describePhaseSchedule } from './policy/schedule.ts';
import { toHtmlReport } from './reports/html-report.ts';
import { toAutomationManifest, toJsonReport } from './reports/json-report.ts';
import { toMarkdownReport } from './reports/markdown-report.ts';
import type {
	AffiliateHealthStatus,
	MonitoredProductResult,
	MonitorReport,
	MonitorRunOptions,
	MonitorTarget,
	ProductUsageLocations,
} from './types/index.ts';
import { buildArticleUsageMap } from './utils/article-usage.ts';
import { computeHealthScore, formatHealthScoreText } from './utils/health-score.ts';
import { loadAffiliateInventory } from './utils/inventory.ts';
import { buildMarketplaceSummaries, formatSummaryText } from './utils/summary.ts';
import { sleep } from './utils/url.ts';
import { validateAffiliateLink } from './validators/link-validator.ts';
import { resolveHealthStatus } from './validators/resolve-status.ts';

export type RunAffiliateMonitorResult = MonitorReport & {
	summaryText: string;
	healthText: string;
};

const EMPTY_USAGE: ProductUsageLocations = {
	articles: [],
	components: [],
	dataFiles: [],
};

/**
 * Motor principal do Affiliate Health Monitor.
 * Política escalonada: inventário completo (fase atual) + confirmação em 2 tentativas.
 * Filtros de prioridade/frequência estão prontos, mas só filtram quando solicitados.
 */
export async function runAffiliateMonitor(
	options: MonitorRunOptions = {},
): Promise<RunAffiliateMonitorResult> {
	const started = Date.now();
	const policy = loadMonitoringPolicy({
		confirmationEnabled: options.confirmationEnabled,
		confirmDelayMinMs: options.confirmDelayMinMs,
		confirmDelayMaxMs: options.confirmDelayMaxMs,
		respectFrequency: options.respectFrequency,
	});

	const delayMs = options.delayMs ?? 700;
	const timeoutMs = options.timeoutMs;

	let targets = loadAffiliateInventory({
		marketplaces: options.marketplaces,
		productIds: options.productIds,
	});

	targets = filterTargetsBySchedule(targets, {
		priorities: options.priorities,
		respectFrequency: options.respectFrequency ?? policy.respectFrequency,
		lastCheckedByKey: options.lastCheckedByKey,
		policy,
	});

	const productIds = [...new Set(targets.map((t) => t.productId))];
	const urlByProductId: Record<string, string[]> = {};
	for (const t of targets) {
		(urlByProductId[t.productId] ??= []).push(t.url);
	}
	const usageMap = buildArticleUsageMap(productIds, process.cwd(), urlByProductId);

	const results: MonitoredProductResult[] = [];
	let confirmationsRun = 0;

	for (let i = 0; i < targets.length; i++) {
		const target = targets[i]!;
		options.onProgress?.(i + 1, targets.length, target);

		const plugin = requireMarketplacePlugin(target.marketplace);
		const checkCtx = {
			timeoutMs: timeoutMs ?? plugin.timeoutMs ?? 30_000,
			retries: plugin.retries,
			articlesUsingProduct: usageMap[target.productId] ?? EMPTY_USAGE,
		};

		let result = await checkTarget(target, checkCtx);

		if (needsStatusConfirmation(result.status, policy)) {
			const waitMs = pickConfirmationDelayMs(policy);
			options.onProgress?.(i + 1, targets.length, target);
			if (waitMs > 0) {
				await sleep(waitMs);
			}
			const second = await checkTarget(target, checkCtx);
			confirmationsRun += 1;
			result = {
				...second,
				confirmationAttempts: 2,
				statusConfirmed: true,
				previousStatus: result.status,
				detail:
					second.detail ??
					(second.status === result.status
						? `Confirmado após 2ª tentativa (${result.status})`
						: `1ª tentativa: ${result.status}; confirmado como ${second.status}`),
			};
		} else {
			result = {
				...result,
				confirmationAttempts: 1,
				statusConfirmed: true,
			};
		}

		results.push(result);

		if (i < targets.length - 1 && delayMs > 0) {
			await sleep(delayMs);
		}
	}

	const generatedAt = new Date().toISOString();
	const summaries = buildMarketplaceSummaries(results);
	const health = computeHealthScore(results);
	const report: MonitorReport = {
		generatedAt,
		results,
		summaries,
		health,
		meta: {
			version: 1,
			idempotent: true,
			targetCount: targets.length,
			durationMs: Date.now() - started,
			policyPhase: `${policy.activePhase}: ${describePhaseSchedule(policy.activePhase)}`,
			confirmationEnabled: policy.confirmation.enabled,
			confirmationsRun,
		},
	};

	return {
		...report,
		summaryText: formatSummaryText(summaries),
		healthText: formatHealthScoreText(health),
	};
}

async function checkTarget(
	target: MonitorTarget,
	ctx: {
		timeoutMs: number;
		retries?: number;
		articlesUsingProduct: ProductUsageLocations;
	},
): Promise<MonitoredProductResult> {
	const checkedAt = new Date().toISOString();
	const base = {
		marketplace: target.marketplace,
		productId: target.productId,
		productName: target.productName,
		url: target.url,
		checkedAt,
		articlesUsingProduct: ctx.articlesUsingProduct,
		collector: target.marketplace,
		responseTimeMs: null as number | null,
		redirectCount: 0,
		monitorPriority: target.monitorPriority,
		monitorFrequency: target.monitorFrequency,
		confirmationAttempts: 1,
		statusConfirmed: false,
	};

	const link = validateAffiliateLink(target.url, target.marketplace);
	if (!link.ok) {
		return {
			...base,
			finalUrl: null,
			status: 'LINK_INVALIDO' satisfies AffiliateHealthStatus,
			httpStatus: null,
			title: null,
			detail: link.reason,
		};
	}

	const collector = getCollector(target.marketplace);
	const page = await collector.collect(target.url, {
		timeoutMs: ctx.timeoutMs,
		retries: ctx.retries,
	});
	const health = resolveHealthStatus(target.url, target.marketplace, page);

	return {
		...base,
		finalUrl: page.finalUrl,
		status: health.status,
		httpStatus: page.httpStatus,
		title: page.title,
		detail: health.detail,
		responseTimeMs: page.responseTimeMs,
		redirectCount: page.redirectCount,
		collector: page.collector,
	};
}

export type WriteReportsOptions = {
	/** Diretório raiz (ex.: reports/affiliate-health). */
	outDir: string;
	/** Prefixo legado para snapshot flat. Default: affiliate-health. */
	basename?: string;
	formats?: Array<'json' | 'markdown' | 'html'>;
	/** Grava histórico YYYY/MM/ + latest + manifest. Default: true. */
	writeHistory?: boolean;
};

/**
 * Grava relatórios em disco (latest + histórico). Retorna paths escritos.
 */
export async function writeMonitorReports(
	report: MonitorReport,
	options: WriteReportsOptions,
): Promise<string[]> {
	const fs = await import('node:fs/promises');
	const path = await import('node:path');

	const formats = options.formats ?? ['json', 'markdown', 'html'];
	const writeHistory = options.writeHistory ?? true;
	await fs.mkdir(options.outDir, { recursive: true });

	const written: string[] = [];
	const generated = new Date(report.generatedAt);
	const yyyy = String(generated.getUTCFullYear());
	const mm = String(generated.getUTCMonth() + 1).padStart(2, '0');
	const dd = String(generated.getUTCDate()).padStart(2, '0');
	const hh = String(generated.getUTCHours()).padStart(2, '0');
	const mi = String(generated.getUTCMinutes()).padStart(2, '0');
	const ss = String(generated.getUTCSeconds()).padStart(2, '0');

	const dayStamp = `${yyyy}-${mm}-${dd}`;
	const runStamp = `${dayStamp}_${hh}${mi}${ss}`;

	async function writeSet(dir: string, basename: string): Promise<void> {
		await fs.mkdir(dir, { recursive: true });
		for (const format of formats) {
			if (format === 'json') {
				const file = path.join(dir, `${basename}.json`);
				await fs.writeFile(file, toJsonReport(report), 'utf8');
				written.push(file);
			} else if (format === 'markdown') {
				const file = path.join(dir, `${basename}.md`);
				await fs.writeFile(file, toMarkdownReport(report), 'utf8');
				written.push(file);
			} else if (format === 'html') {
				const file = path.join(dir, `${basename}.html`);
				await fs.writeFile(file, toHtmlReport(report), 'utf8');
				written.push(file);
			}
		}
	}

	await writeSet(options.outDir, 'affiliate-health-latest');

	const manifestPath = path.join(options.outDir, 'affiliate-health-manifest.json');
	await fs.writeFile(manifestPath, toAutomationManifest(report), 'utf8');
	written.push(manifestPath);

	if (writeHistory) {
		const historyDir = path.join(options.outDir, yyyy, mm);
		await writeSet(historyDir, `affiliate-health-${dayStamp}`);
		await writeSet(historyDir, `affiliate-health-${runStamp}`);
	}

	if (options.basename) {
		await writeSet(options.outDir, options.basename);
	}

	return written;
}
