import {
	AFFILIATE_HEALTH_STATUSES,
	type AffiliateHealthStatus,
	type MarketplaceId,
	type MarketplaceSummary,
	type MonitoredProductResult,
} from '../types/index.ts';
import { getMarketplaceLabel, listRegisteredMarketplaces } from '../marketplaces/index.ts';

function emptyStatusCounts(): Record<AffiliateHealthStatus, number> {
	return Object.fromEntries(AFFILIATE_HEALTH_STATUSES.map((s) => [s, 0])) as Record<
		AffiliateHealthStatus,
		number
	>;
}

export function buildMarketplaceSummaries(
	results: MonitoredProductResult[],
): MarketplaceSummary[] {
	const order = listRegisteredMarketplaces();
	const byMarketplace = new Map<MarketplaceId, MonitoredProductResult[]>();

	for (const result of results) {
		const list = byMarketplace.get(result.marketplace) ?? [];
		list.push(result);
		byMarketplace.set(result.marketplace, list);
	}

	const summaries: MarketplaceSummary[] = [];
	const seen = new Set<MarketplaceId>();

	for (const marketplace of order) {
		const list = byMarketplace.get(marketplace);
		if (!list?.length) continue;
		seen.add(marketplace);
		summaries.push(toSummary(marketplace, list));
	}

	for (const [marketplace, list] of byMarketplace) {
		if (seen.has(marketplace)) continue;
		summaries.push(toSummary(marketplace, list));
	}

	return summaries;
}

function toSummary(
	marketplace: MarketplaceId,
	list: MonitoredProductResult[],
): MarketplaceSummary {
	const byStatus = emptyStatusCounts();
	for (const item of list) {
		byStatus[item.status] += 1;
	}
	return {
		marketplace,
		label: getMarketplaceLabel(marketplace),
		total: list.length,
		byStatus,
	};
}

/** Texto de resumo no formato solicitado pelo produto. */
export function formatSummaryText(summaries: MarketplaceSummary[]): string {
	const lines: string[] = [];

	for (const summary of summaries) {
		lines.push(summary.label);
		lines.push('');
		lines.push(`${summary.total} produtos`);
		if (summary.byStatus.OK) lines.push(`${summary.byStatus.OK} OK`);
		if (summary.byStatus.SEM_ESTOQUE) {
			lines.push(`${summary.byStatus.SEM_ESTOQUE} Sem estoque`);
		}
		if (summary.byStatus.REMOVIDO) {
			lines.push(`${summary.byStatus.REMOVIDO} Removido`);
		}
		if (summary.byStatus.LINK_INVALIDO) {
			lines.push(`${summary.byStatus.LINK_INVALIDO} Link inválido`);
		}
		if (summary.byStatus.ERRO_ACESSO) {
			lines.push(`${summary.byStatus.ERRO_ACESSO} Erro de acesso`);
		}
		lines.push('');
	}

	return lines.join('\n').trimEnd();
}
