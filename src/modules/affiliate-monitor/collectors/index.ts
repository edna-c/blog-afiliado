import type { MarketplaceCollector } from './types.ts';
import {
	getMarketplacePlugin,
	listMarketplacePlugins,
	listRegisteredMarketplaces,
	resolvePluginForUrl,
} from '../marketplaces/index.ts';
import type { MarketplaceId } from '../types/index.ts';

export function getCollector(marketplace: MarketplaceId): MarketplaceCollector {
	const plugin = getMarketplacePlugin(marketplace);
	if (!plugin) {
		throw new Error(`Collector não registrado para marketplace: ${marketplace}`);
	}
	return plugin.collector;
}

export function resolveCollectorForUrl(url: string): MarketplaceCollector | null {
	return resolvePluginForUrl(url)?.collector ?? null;
}

export { listRegisteredMarketplaces };

export { mercadoLivreCollector } from './mercadolivre.ts';
export { shopeeCollector } from './shopee.ts';
export type { MarketplaceCollector };

/** Lista collectors via plugins registrados. */
export function listCollectors(): MarketplaceCollector[] {
	return listMarketplacePlugins().map((p) => p.collector);
}
