import type { AffiliateHealthStatus, CollectedPage, MarketplaceId } from '../types/index.ts';
import { validateAffiliateLink } from './link-validator.ts';
import { validateProductPresence } from './product-validator.ts';
import { validateStock } from './stock-validator.ts';

export type ResolvedHealth = {
	status: AffiliateHealthStatus;
	detail?: string;
};

/**
 * Pipeline de validação: link → acesso/produto → estoque.
 */
export function resolveHealthStatus(
	url: string,
	expectedMarketplace: MarketplaceId,
	page: CollectedPage | null,
): ResolvedHealth {
	const link = validateAffiliateLink(url, expectedMarketplace);
	if (!link.ok) {
		return { status: 'LINK_INVALIDO', detail: link.reason };
	}

	if (!page) {
		return { status: 'ERRO_ACESSO', detail: 'Collector não retornou dados' };
	}

	const presence = validateProductPresence(page);
	if (presence.status) {
		return { status: presence.status, detail: presence.detail };
	}

	const stock = validateStock(page);
	return { status: stock.status, detail: stock.detail };
}
