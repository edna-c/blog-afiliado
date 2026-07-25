import type { MonitorFrequency, MonitorPriority, MonitorTarget } from '../types/index.ts';
import {
	loadMonitoringPolicy,
	PRIORITY_SCHEDULES,
	type MonitoringPolicy,
} from '../config/monitoring-policy.ts';

export type ScheduleFilterOptions = {
	/** Filtra apenas estas prioridades (ex.: run das 12h = HIGH). */
	priorities?: MonitorPriority[];
	/**
	 * Quando true, exclui targets ainda dentro do intervalo da frequency.
	 * Requer lastCheckedByKey. Default: policy.respectFrequency.
	 */
	respectFrequency?: boolean;
	/** Chave: `${productId}::${marketplace}` → ISO da última verificação. */
	lastCheckedByKey?: Record<string, string>;
	now?: Date;
	policy?: MonitoringPolicy;
};

export function targetScheduleKey(target: Pick<MonitorTarget, 'productId' | 'marketplace'>): string {
	return `${target.productId}::${target.marketplace}`;
}

/**
 * Filtra inventário por prioridade e/ou cadência.
 * Fase atual: chamado sem filtros → retorna a lista intacta (varredura completa).
 * Fase intermediária/avançada: cron passa `priorities` / `respectFrequency`.
 */
export function filterTargetsBySchedule(
	targets: MonitorTarget[],
	options: ScheduleFilterOptions = {},
): MonitorTarget[] {
	const policy = options.policy ?? loadMonitoringPolicy();
	const respectFrequency = options.respectFrequency ?? policy.respectFrequency;
	const now = options.now ?? new Date();
	const priorities = options.priorities;

	return targets.filter((target) => {
		const priority = target.monitorPriority ?? 'MEDIUM';
		if (priorities?.length && !priorities.includes(priority)) return false;

		if (!respectFrequency) return true;

		const lastIso = options.lastCheckedByKey?.[targetScheduleKey(target)];
		if (!lastIso) return true;

		const last = Date.parse(lastIso);
		if (!Number.isFinite(last)) return true;

		const frequency = target.monitorFrequency ?? PRIORITY_SCHEDULES[priority].frequency;
		const intervalHours = intervalHoursFor(frequency, priority, policy);
		const elapsedMs = now.getTime() - last;
		return elapsedMs >= intervalHours * 60 * 60 * 1000;
	});
}

function intervalHoursFor(
	frequency: MonitorFrequency,
	priority: MonitorPriority,
	policy: MonitoringPolicy,
): number {
	if (frequency === 'every_6h') return 6;
	if (frequency === 'daily') return 24;
	if (frequency === 'weekly') return 168;
	return policy.priorities[priority].intervalHours;
}

/** Descrição operacional da fase (para README / manifest). */
export function describePhaseSchedule(phase: MonitoringPolicy['activePhase']): string {
	switch (phase) {
		case 'small_catalog':
			return 'Varredura completa 1×/dia (preferencialmente 04:00–06:00) + confirmação em 2 tentativas';
		case 'intermediate':
			return 'Completo de manhã + runs parciais (prioritários / críticos) — ativar via cron + --priority';
		case 'advanced':
			return 'Cadência por monitorPriority/monitorFrequency (HIGH 6h / MEDIUM diário / LOW semanal)';
		default:
			return phase;
	}
}
