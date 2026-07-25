import type { AffiliateHealthStatus, MarketplaceSummary, MonitorReport } from '../types/index.ts';
import { formatHealthScoreText } from '../utils/health-score.ts';
import { formatSummaryText } from '../utils/summary.ts';
import { flattenUsage } from '../utils/article-usage.ts';

const STATUS_LABEL: Record<AffiliateHealthStatus, string> = {
	OK: 'OK',
	SEM_ESTOQUE: 'Sem estoque',
	REMOVIDO: 'Removido',
	LINK_INVALIDO: 'Link inválido',
	ERRO_ACESSO: 'Erro de acesso',
};

export function toMarkdownReport(report: MonitorReport): string {
	const lines: string[] = [
		'# Affiliate Health Monitor',
		'',
		`Gerado em: ${report.generatedAt}`,
		'',
		`**${formatHealthScoreText(report.health)}**`,
		'',
		'## Resumo',
		'',
		'```',
		formatSummaryText(report.summaries),
		'```',
		'',
	];

	for (const summary of report.summaries) {
		lines.push(`## ${summary.label}`, '');
		lines.push(...summaryTable(summary), '');
	}

	lines.push('## Detalhes', '');
	lines.push(
		'| Marketplace | productId | Produto | Status | HTTP | ms | Redirects | Collector | Título | Detail | URL final | Uso |',
		'|---|---|---|---|---|---|---|---|---|---|---|---|',
	);

	for (const item of report.results) {
		const usage = flattenUsage(item.articlesUsingProduct).join('<br>') || '—';
		lines.push(
			`| ${item.marketplace} | ${escapeCell(item.productId)} | ${escapeCell(item.productName)} | ${STATUS_LABEL[item.status]} | ${item.httpStatus ?? '—'} | ${item.responseTimeMs ?? '—'} | ${item.redirectCount} | ${item.collector} | ${escapeCell(item.title ?? '—')} | ${escapeCell(item.detail ?? '—')} | ${escapeCell(item.finalUrl ?? '—')} | ${usage} |`,
		);
	}

	lines.push('');
	return lines.join('\n');
}

function summaryTable(summary: MarketplaceSummary): string[] {
	return [
		`- Total: **${summary.total}**`,
		`- OK: **${summary.byStatus.OK}**`,
		`- Sem estoque: **${summary.byStatus.SEM_ESTOQUE}**`,
		`- Removido: **${summary.byStatus.REMOVIDO}**`,
		`- Link inválido: **${summary.byStatus.LINK_INVALIDO}**`,
		`- Erro de acesso: **${summary.byStatus.ERRO_ACESSO}**`,
	];
}

function escapeCell(value: string): string {
	return value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}
