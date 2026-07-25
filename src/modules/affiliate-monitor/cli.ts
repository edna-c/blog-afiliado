/**
 * CLI do Affiliate Health Monitor.
 *
 * Preparado para automação (CI / cron / Vercel Cron) sem dependência obrigatória de cron.
 *
 * Fase atual (catálogo pequeno):
 *   varredura completa + confirmação em 2 tentativas para falhas suspeitas.
 *
 * Uso:
 *   npm run monitor:affiliates
 *   npm run monitor:affiliates -- --no-confirm
 *   npm run monitor:affiliates -- --priority=HIGH
 *   npm run monitor:affiliates -- --quick-confirm
 */

import path from 'node:path';
import {
	formatHealthScoreText,
	formatSummaryText,
	listRegisteredMarketplaces,
	runAffiliateMonitor,
	writeMonitorReports,
	type MarketplaceId,
	type MonitorPriority,
} from './index.ts';

function parseArgs(argv: string[]) {
	const marketplaces: MarketplaceId[] = [];
	const productIds: string[] = [];
	const priorities: MonitorPriority[] = [];
	let outDir =
		process.env.AFFILIATE_MONITOR_OUT_DIR?.trim() ||
		path.join(process.cwd(), 'reports', 'affiliate-health');
	let delayMs: number | undefined = process.env.AFFILIATE_MONITOR_DELAY_MS
		? Number(process.env.AFFILIATE_MONITOR_DELAY_MS)
		: undefined;
	let writeReports = true;
	let confirmationEnabled: boolean | undefined;
	let confirmDelayMinMs: number | undefined;
	let confirmDelayMaxMs: number | undefined;
	let respectFrequency: boolean | undefined;

	for (const arg of argv) {
		if (arg.startsWith('--marketplace=')) {
			marketplaces.push(arg.slice('--marketplace='.length));
		} else if (arg.startsWith('--product=')) {
			productIds.push(arg.slice('--product='.length));
		} else if (arg.startsWith('--priority=')) {
			priorities.push(arg.slice('--priority='.length).toUpperCase() as MonitorPriority);
		} else if (arg.startsWith('--out=')) {
			outDir = path.resolve(arg.slice('--out='.length));
		} else if (arg.startsWith('--delay=')) {
			delayMs = Number(arg.slice('--delay='.length));
		} else if (arg === '--no-write') {
			writeReports = false;
		} else if (arg === '--no-confirm') {
			confirmationEnabled = false;
		} else if (arg === '--quick-confirm') {
			confirmationEnabled = true;
			confirmDelayMinMs = 2_000;
			confirmDelayMaxMs = 5_000;
		} else if (arg === '--respect-frequency') {
			respectFrequency = true;
		} else if (arg === '--help' || arg === '-h') {
			printHelp();
			process.exit(0);
		}
	}

	return {
		marketplaces: marketplaces.length ? marketplaces : undefined,
		productIds: productIds.length ? productIds : undefined,
		priorities: priorities.length ? priorities : undefined,
		outDir,
		delayMs,
		writeReports,
		confirmationEnabled,
		confirmDelayMinMs,
		confirmDelayMaxMs,
		respectFrequency,
	};
}

function printHelp(): void {
	const markets = listRegisteredMarketplaces().join('|');
	console.log(`Affiliate Health Monitor

Opções:
  --marketplace=<id>     Filtra marketplace (${markets}) — repetível
  --product=<productId>  Filtra SKU de products.ts — repetível
  --priority=HIGH|MEDIUM|LOW  Filtra prioridade (runs parciais futuras)
  --out=<dir>            Diretório dos relatórios
  --delay=<ms>           Delay entre requests (default 700)
  --no-confirm           Não faz 2ª tentativa (mais rápido / debug)
  --quick-confirm        Confirmação com delay curto (2–5s) para local
  --respect-frequency    Filtra por cadência (fase avançada; default off)
  --no-write             Só imprime no console
  -h, --help             Ajuda

Env:
  AFFILIATE_MONITOR_OUT_DIR
  AFFILIATE_MONITOR_DELAY_MS
  AFFILIATE_MONITOR_CONFIRMATION_ENABLED
  AFFILIATE_MONITOR_CONFIRM_DELAY_MIN_MS   (default 600000 = 10 min)
  AFFILIATE_MONITOR_CONFIRM_DELAY_MAX_MS   (default 1800000 = 30 min)
  AFFILIATE_MONITOR_RESPECT_FREQUENCY

Sugestão cron (fase atual, catálogo pequeno):
  1×/dia entre 04:00–06:00 → npm run monitor:affiliates

Exit codes:
  0  execução ok (sem REMOVIDO/LINK_INVALIDO confirmados)
  1  problemas bloqueantes confirmados
  2  falha de runtime
`);
}

async function main(): Promise<void> {
	const args = parseArgs(process.argv.slice(2));

	console.log('Affiliate Health Monitor — iniciando…');
	const report = await runAffiliateMonitor({
		marketplaces: args.marketplaces,
		productIds: args.productIds,
		priorities: args.priorities,
		delayMs: args.delayMs,
		confirmationEnabled: args.confirmationEnabled,
		confirmDelayMinMs: args.confirmDelayMinMs,
		confirmDelayMaxMs: args.confirmDelayMaxMs,
		respectFrequency: args.respectFrequency,
		onProgress: (done, total, current) => {
			console.log(
				`[${done}/${total}] ${current.marketplace} · ${current.productName}` +
					(current.monitorPriority ? ` [${current.monitorPriority}]` : ''),
			);
		},
	});

	console.log('');
	console.log(formatHealthScoreText(report.health));
	console.log(`Fase: ${report.meta.policyPhase}`);
	console.log(
		`Confirmações executadas: ${report.meta.confirmationsRun}` +
			(report.meta.confirmationEnabled ? '' : ' (desligado)'),
	);
	console.log('');
	console.log(formatSummaryText(report.summaries));
	console.log('');

	const problems = report.results.filter((r) => r.status !== 'OK');
	if (problems.length) {
		console.log('Problemas (status final confirmado):');
		for (const item of problems) {
			const prev = item.previousStatus ? ` (antes: ${item.previousStatus})` : '';
			console.log(
				`  - [${item.status}] ${item.productId} / ${item.productName} (${item.marketplace})${prev}: ${item.detail ?? item.url}`,
			);
		}
		console.log('');
	}

	if (args.writeReports) {
		const written = await writeMonitorReports(report, {
			outDir: args.outDir,
			writeHistory: true,
		});
		console.log('Relatórios:');
		for (const file of written) {
			console.log(`  ${file}`);
		}
	}

	const hasBlocking = report.results.some(
		(r) =>
			r.statusConfirmed &&
			(r.status === 'REMOVIDO' || r.status === 'LINK_INVALIDO'),
	);
	process.exitCode = hasBlocking ? 1 : 0;
}

main().catch((err) => {
	console.error(err);
	process.exitCode = 2;
});
