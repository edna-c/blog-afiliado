/**
 * Re-export de utilitários de URL/marketplace.
 * Host detection e labels vêm do registry de plugins.
 */

export { parseHttpUrl, hostMatches, sleep, decodeBasicEntities } from './url.ts';
export { extractPageTitle, extractHtmlTitle } from './title.ts';
export {
	detectMarketplaceFromUrl,
	getMarketplaceLabel,
	listRegisteredMarketplaces,
} from '../marketplaces/index.ts';

import { getMarketplaceLabel, listMarketplacePlugins } from '../marketplaces/index.ts';
import type { MarketplaceId } from '../types/index.ts';

/** Mapa label derivado do registry (compatível com consumidores existentes). */
export const MARKETPLACE_LABELS: Record<string, string> = Object.fromEntries(
	listMarketplacePlugins().map((p) => [p.id, p.label]),
);

export function marketplaceLabel(id: MarketplaceId): string {
	return getMarketplaceLabel(id);
}
