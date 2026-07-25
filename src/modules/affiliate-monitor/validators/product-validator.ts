import type { AffiliateHealthStatus, CollectedPage } from '../types/index.ts';

/**
 * Avalia existência do produto a partir dos sinais coletados + HTTP.
 */
export function validateProductPresence(page: CollectedPage): {
	status: Extract<AffiliateHealthStatus, 'REMOVIDO' | 'ERRO_ACESSO'> | null;
	detail?: string;
} {
	if (!page.fetched || page.httpStatus == null) {
		return {
			status: 'ERRO_ACESSO',
			detail: page.error ?? 'Falha ao acessar a URL',
		};
	}

	if (page.signals.blocked) {
		return {
			status: 'ERRO_ACESSO',
			detail: `Possível bloqueio anti-bot (HTTP ${page.httpStatus})`,
		};
	}

	if (page.httpStatus >= 500) {
		return {
			status: 'ERRO_ACESSO',
			detail: `HTTP ${page.httpStatus}`,
		};
	}

	if (page.httpStatus === 404 || page.httpStatus === 410 || page.signals.removed) {
		return {
			status: 'REMOVIDO',
			detail: page.signals.removed
				? 'Sinais de produto/anúncio removido na página'
				: `HTTP ${page.httpStatus}`,
		};
	}

	if (page.httpStatus >= 400) {
		return {
			status: 'ERRO_ACESSO',
			detail: `HTTP ${page.httpStatus}`,
		};
	}

	if (page.signals.intermediate && !page.signals.productPresent) {
		return {
			status: 'ERRO_ACESSO',
			detail: 'Página intermediária (tracking/login) sem confirmação de produto',
		};
	}

	if (!page.signals.productPresent && !page.signals.outOfStock) {
		return {
			status: 'ERRO_ACESSO',
			detail: 'Página acessível, mas sem sinais claros de produto (evita falso OK)',
		};
	}

	return { status: null };
}
