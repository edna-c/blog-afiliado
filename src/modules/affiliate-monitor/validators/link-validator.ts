import type { LinkValidation, MarketplaceId } from '../types/index.ts';
import { detectMarketplaceFromUrl, parseHttpUrl } from '../utils/marketplace.ts';

/**
 * Valida sintaxe da URL e se o host pertence a um marketplace suportado.
 */
export function validateAffiliateLink(
	url: string,
	expectedMarketplace?: MarketplaceId,
): LinkValidation {
	const trimmed = url?.trim() ?? '';
	if (!trimmed) {
		return { ok: false, marketplace: null, reason: 'URL vazia' };
	}

	const parsed = parseHttpUrl(trimmed);
	if (!parsed) {
		return { ok: false, marketplace: null, reason: 'URL malformada' };
	}

	const marketplace = detectMarketplaceFromUrl(trimmed);
	if (!marketplace) {
		return {
			ok: false,
			marketplace: null,
			reason: 'Host não pertence a um marketplace suportado',
		};
	}

	if (expectedMarketplace && marketplace !== expectedMarketplace) {
		return {
			ok: false,
			marketplace,
			reason: `URL é de ${marketplace}, esperado ${expectedMarketplace}`,
		};
	}

	return { ok: true, marketplace };
}
