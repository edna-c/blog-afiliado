import type { MarketplaceId } from '../types/index.ts';
import { hostMatches, parseHttpUrl } from '../utils/url.ts';
import { mercadoLivrePlugin } from './mercadolivre.ts';
import { shopeePlugin } from './shopee.ts';
import type { MarketplacePlugin } from './types.ts';

/**
 * Registry de marketplaces.
 * Para adicionar Amazon/Magalu/Casas Bahia: criar plugin + collector e incluir aqui.
 * O motor (monitor.ts) NÃO contém condicionais por loja.
 */
const PLUGINS: MarketplacePlugin[] = [mercadoLivrePlugin, shopeePlugin];

const BY_ID = new Map(PLUGINS.map((p) => [p.id, p]));

export function listMarketplacePlugins(): readonly MarketplacePlugin[] {
	return PLUGINS;
}

export function getMarketplacePlugin(id: MarketplaceId): MarketplacePlugin | undefined {
	return BY_ID.get(id);
}

export function requireMarketplacePlugin(id: MarketplaceId): MarketplacePlugin {
	const plugin = BY_ID.get(id);
	if (!plugin) {
		throw new Error(`Marketplace não registrado: ${id}`);
	}
	return plugin;
}

export function listRegisteredMarketplaces(): MarketplaceId[] {
	return PLUGINS.map((p) => p.id);
}

export function getMarketplaceLabel(id: MarketplaceId): string {
	return BY_ID.get(id)?.label ?? id;
}

export function detectMarketplaceFromUrl(url: string): MarketplaceId | null {
	const parsed = parseHttpUrl(url);
	if (!parsed) return null;
	for (const plugin of PLUGINS) {
		if (hostMatches(parsed.hostname, plugin.hostSuffixes)) return plugin.id;
	}
	return null;
}

export function resolvePluginForUrl(url: string): MarketplacePlugin | null {
	const id = detectMarketplaceFromUrl(url);
	return id ? (BY_ID.get(id) ?? null) : null;
}

export type { MarketplacePlugin };
export { mercadoLivrePlugin, shopeePlugin };
