/**
 * Política de monitoramento escalonado — configuração centralizada.
 *
 * Nenhum limiar de evolução deve ficar espalhado no motor.
 * Ajuste aqui (ou via env) conforme o Casa Prática Eletro crescer.
 *
 * Fases intermediária/avançada estão documentadas e tipadas;
 * a seleção automática de fase NÃO é ativada nesta etapa.
 */

import type { AffiliateHealthStatus, MonitorFrequency, MonitorPriority } from '../types/index.ts';

export type MonitoringPhaseId = 'small_catalog' | 'intermediate' | 'advanced';

export type PrioritySchedule = {
	priority: MonitorPriority;
	frequency: MonitorFrequency;
	/** Intervalo sugerido em horas (para filtros futuros / cron). */
	intervalHours: number;
	description: string;
};

function envInt(name: string, fallback: number): number {
	const raw = process.env[name]?.trim();
	if (!raw) return fallback;
	const n = Number(raw);
	return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function envBool(name: string, fallback: boolean): boolean {
	const raw = process.env[name]?.trim()?.toLowerCase();
	if (raw == null || raw === '') return fallback;
	if (['1', 'true', 'yes', 'on'].includes(raw)) return true;
	if (['0', 'false', 'no', 'off'].includes(raw)) return false;
	return fallback;
}

/**
 * Status que exigem segunda tentativa antes de virar falha definitiva
 * (fase atual — catálogo pequeno).
 */
export const CONFIRMATION_STATUSES: readonly AffiliateHealthStatus[] = [
	'ERRO_ACESSO',
	'LINK_INVALIDO',
	'REMOVIDO',
] as const;

/** Agenda sugerida por prioridade (fase avançada — consumo futuro). */
export const PRIORITY_SCHEDULES: Record<MonitorPriority, PrioritySchedule> = {
	HIGH: {
		priority: 'HIGH',
		frequency: 'every_6h',
		intervalHours: 6,
		description: 'Home, destaques, comparativos principais, maior receita',
	},
	MEDIUM: {
		priority: 'MEDIUM',
		frequency: 'daily',
		intervalHours: 24,
		description: 'Reviews, guias, tráfego constante',
	},
	LOW: {
		priority: 'LOW',
		frequency: 'weekly',
		intervalHours: 168,
		description: 'Conteúdo antigo / baixo tráfego',
	},
};

/**
 * Limiares de evolução — NÃO disparam troca automática de fase no código.
 * Servem para documentação operacional e futuros jobs de decisão.
 */
export const EVOLUTION_THRESHOLDS = {
	/** Artigos publicados (aprox.) para considerar fase intermediária. */
	intermediateArticlesMin: envInt('AFFILIATE_MONITOR_PHASE_INTERMEDIATE_ARTICLES_MIN', 300),
	intermediateArticlesMax: envInt('AFFILIATE_MONITOR_PHASE_INTERMEDIATE_ARTICLES_MAX', 700),
	/** Produtos/links monitorados sugeridos para fase avançada. */
	advancedProductsMin: envInt('AFFILIATE_MONITOR_PHASE_ADVANCED_PRODUCTS_MIN', 500),
	advancedLinksMin: envInt('AFFILIATE_MONITOR_PHASE_ADVANCED_LINKS_MIN', 1000),
	/** Taxa de ERRO_ACESSO que sugere revisar política / browser. */
	errorAccessRateWarn: envInt('AFFILIATE_MONITOR_ERROR_ACCESS_RATE_WARN', 15) / 100,
	/** Health Score abaixo do qual a operação deve revisar cadência. */
	healthScoreWarnBelow: envInt('AFFILIATE_MONITOR_HEALTH_WARN_BELOW', 85),
} as const;

export type MonitoringPolicy = {
	/** Fase operacional atual (manual). Default: small_catalog. */
	activePhase: MonitoringPhaseId;
	/** Janela sugerida para varredura completa diária (cron externo). */
	dailyFullScanLocalHours: { start: number; end: number };
	confirmation: {
		enabled: boolean;
		statuses: readonly AffiliateHealthStatus[];
		delayMinMs: number;
		delayMaxMs: number;
		maxAttempts: number;
	};
	priorities: typeof PRIORITY_SCHEDULES;
	evolution: typeof EVOLUTION_THRESHOLDS;
	/**
	 * Quando true (futuro / flag explícita), o inventário pode filtrar
	 * apenas targets "due" conforme frequency + último check.
	 * Default false = varredura completa (fase atual).
	 */
	respectFrequency: boolean;
};

export function loadMonitoringPolicy(
	overrides: Partial<{
		activePhase: MonitoringPhaseId;
		confirmationEnabled: boolean;
		confirmDelayMinMs: number;
		confirmDelayMaxMs: number;
		respectFrequency: boolean;
	}> = {},
): MonitoringPolicy {
	const delayMin = overrides.confirmDelayMinMs ?? envInt('AFFILIATE_MONITOR_CONFIRM_DELAY_MIN_MS', 10 * 60 * 1000);
	const delayMax = overrides.confirmDelayMaxMs ?? envInt('AFFILIATE_MONITOR_CONFIRM_DELAY_MAX_MS', 30 * 60 * 1000);

	return {
		activePhase: overrides.activePhase ?? 'small_catalog',
		dailyFullScanLocalHours: { start: 4, end: 6 },
		confirmation: {
			enabled:
				overrides.confirmationEnabled ??
				envBool('AFFILIATE_MONITOR_CONFIRMATION_ENABLED', true),
			statuses: CONFIRMATION_STATUSES,
			delayMinMs: Math.min(delayMin, delayMax),
			delayMaxMs: Math.max(delayMin, delayMax),
			maxAttempts: 2,
		},
		priorities: PRIORITY_SCHEDULES,
		evolution: EVOLUTION_THRESHOLDS,
		respectFrequency:
			overrides.respectFrequency ?? envBool('AFFILIATE_MONITOR_RESPECT_FREQUENCY', false),
	};
}

/** Delay aleatório inclusivo entre min e max (confirmação). */
export function pickConfirmationDelayMs(policy: MonitoringPolicy): number {
	const { delayMinMs, delayMaxMs } = policy.confirmation;
	if (delayMaxMs <= delayMinMs) return delayMinMs;
	return delayMinMs + Math.floor(Math.random() * (delayMaxMs - delayMinMs + 1));
}

export function needsStatusConfirmation(
	status: AffiliateHealthStatus,
	policy: MonitoringPolicy = loadMonitoringPolicy(),
): boolean {
	return policy.confirmation.enabled && policy.confirmation.statuses.includes(status);
}
