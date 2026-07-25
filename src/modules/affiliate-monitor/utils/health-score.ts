import type {
	AffiliateHealthStatus,
	HealthScore,
	HealthScoreLabel,
	MonitoredProductResult,
} from '../types/index.ts';

/** Pesos para o Health Score (quanto maior, mais penaliza). */
const STATUS_WEIGHT: Record<AffiliateHealthStatus, number> = {
	OK: 0,
	SEM_ESTOQUE: 0.35,
	ERRO_ACESSO: 0.55,
	LINK_INVALIDO: 1,
	REMOVIDO: 1,
};

export function computeHealthScore(results: MonitoredProductResult[]): HealthScore {
	const total = results.length;
	if (total === 0) {
		return {
			score: 100,
			label: 'Excelente',
			total: 0,
			ok: 0,
			weightedIssues: 0,
		};
	}

	let weightedIssues = 0;
	let ok = 0;
	for (const item of results) {
		if (item.status === 'OK') ok += 1;
		weightedIssues += STATUS_WEIGHT[item.status];
	}

	const raw = 100 * (1 - weightedIssues / total);
	const score = Math.max(0, Math.min(100, Math.round(raw * 10) / 10));

	return {
		score,
		label: labelForScore(score),
		total,
		ok,
		weightedIssues: Math.round(weightedIssues * 100) / 100,
	};
}

export function labelForScore(score: number): HealthScoreLabel {
	if (score >= 95) return 'Excelente';
	if (score >= 85) return 'Bom';
	if (score >= 70) return 'Atenção';
	return 'Crítico';
}

export function formatHealthScoreText(health: HealthScore): string {
	return `Health Score: ${health.score}% — ${health.label}`;
}
