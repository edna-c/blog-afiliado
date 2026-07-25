/**
 * Overrides opcionais de prioridade/frequência por productId.
 *
 * Hoje o mapa pode ficar vazio: default = MEDIUM / daily.
 * No futuro: marcar home/destaques como HIGH sem alterar o motor.
 *
 * Não misturar com products.ts até o schema comercial precisar — mantém baixo acoplamento.
 */

import type { MonitorFrequency, MonitorPriority } from '../types/index.ts';
import { PRIORITY_SCHEDULES } from './monitoring-policy.ts';

export type ProductMonitorMeta = {
	priority: MonitorPriority;
	frequency: MonitorFrequency;
};

/** Preencher conforme o catálogo ganhar priorização editorial/comercial. */
export const PRODUCT_MONITOR_OVERRIDES: Partial<
	Record<string, Partial<ProductMonitorMeta>>
> = {
	// Exemplos futuros (descomentados quando houver necessidade):
	// brastempBFS5NCR: { priority: 'HIGH' },
	// atlasAtenasGlass: { priority: 'LOW' },
};

export function resolveProductMonitorMeta(productId: string): ProductMonitorMeta {
	const override = PRODUCT_MONITOR_OVERRIDES[productId];
	const priority = override?.priority ?? 'MEDIUM';
	const frequency = override?.frequency ?? PRIORITY_SCHEDULES[priority].frequency;
	return { priority, frequency };
}
