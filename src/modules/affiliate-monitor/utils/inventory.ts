import { produtos, type ProdutoAfiliado } from '../../../data/products.ts';
import { resolveProductMonitorMeta } from '../config/product-priorities.ts';
import { listMarketplacePlugins } from '../marketplaces/index.ts';
import type { MarketplaceId, MonitorTarget } from '../types/index.ts';

/** Nomes de exibição alinhados aos cards comerciais do site. */
export const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
	brastempBFS5NCR: 'Brastemp BFS5NCR',
	consulCFS5NAB: 'Consul CFS5NAB',
	electroluxFE5IG: 'Electrolux FE5IG',
	consulCF04NAR: 'Consul CF04NAR',
	electroluxFE4IW: 'Electrolux Efficient FE4IW',
	atlasMonacoPlus: 'Atlas Mônaco Plus',
	consulCFO4VAR: 'Consul CFO4VAR',
	brastempBFO4VAE: 'Brastemp BFO4VAE',
	atlasAtenasGlass: 'Atlas Atenas Glass',
};

export type InventoryOptions = {
	marketplaces?: MarketplaceId[];
	productIds?: string[];
};

function displayName(productId: string): string {
	return PRODUCT_DISPLAY_NAMES[productId] ?? productId;
}

/**
 * Inventário canônico a partir de `src/data/products.ts`.
 * Anexa monitorPriority/monitorFrequency quando houver override (ou default MEDIUM).
 */
export function loadAffiliateInventory(options: InventoryOptions = {}): MonitorTarget[] {
	const { marketplaces, productIds } = options;
	const plugins = listMarketplacePlugins().filter(
		(p) => !marketplaces || marketplaces.includes(p.id),
	);
	const entries = Object.entries(produtos) as [string, ProdutoAfiliado][];

	const targets: MonitorTarget[] = [];

	for (const [id, produto] of entries) {
		if (productIds && !productIds.includes(id)) continue;
		const meta = resolveProductMonitorMeta(id);
		for (const plugin of plugins) {
			const link = plugin.extractLink(produto);
			if (!link) continue;
			targets.push({
				productId: id,
				productName: displayName(id),
				marketplace: plugin.id,
				url: link.url,
				generatedByPanel: link.generatedByPanel,
				monitorPriority: meta.priority,
				monitorFrequency: meta.frequency,
			});
		}
	}

	return targets;
}
