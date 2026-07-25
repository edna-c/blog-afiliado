import type { MonitorReport } from '../types/index.ts';
import { formatHealthScoreText } from '../utils/health-score.ts';
import { formatSummaryText } from '../utils/summary.ts';

export function toJsonReport(report: MonitorReport, pretty = true): string {
	return JSON.stringify(report, null, pretty ? 2 : undefined);
}

/** Manifesto estável para CI/cron/dashboard consumirem sem parsear HTML. */
export function toAutomationManifest(report: MonitorReport): string {
	return JSON.stringify(
		{
			generatedAt: report.generatedAt,
			health: report.health,
			healthText: formatHealthScoreText(report.health),
			summaryText: formatSummaryText(report.summaries),
			summaries: report.summaries,
			meta: report.meta,
			counts: {
				total: report.results.length,
				ok: report.results.filter((r) => r.status === 'OK').length,
				problems: report.results.filter((r) => r.status !== 'OK').length,
				blocking: report.results.filter(
					(r) => r.status === 'REMOVIDO' || r.status === 'LINK_INVALIDO',
				).length,
			},
			latestJson: 'affiliate-health-latest.json',
			latestHtml: 'affiliate-health-latest.html',
			latestMarkdown: 'affiliate-health-latest.md',
		},
		null,
		2,
	);
}
