import type { AffiliateHealthStatus, CollectedPage } from '../types/index.ts';

/**
 * Avalia disponibilidade/estoque após confirmar que o produto existe.
 */
export function validateStock(page: CollectedPage): {
	status: Extract<AffiliateHealthStatus, 'SEM_ESTOQUE' | 'OK'>;
	detail?: string;
} {
	if (page.signals.outOfStock) {
		return {
			status: 'SEM_ESTOQUE',
			detail: 'Sinais de indisponibilidade/estoque esgotado na página',
		};
	}

	return { status: 'OK' };
}
