import type { ProdutoAfiliado } from '../../../data/products.ts';
import { shopeeCollector, SHOPEE_HOST_SUFFIXES } from '../collectors/shopee.ts';
import type { MarketplacePlugin } from './types.ts';

export const shopeePlugin: MarketplacePlugin = {
	id: 'shopee',
	label: 'Shopee',
	hostSuffixes: SHOPEE_HOST_SUFFIXES,
	collector: shopeeCollector,
	timeoutMs: 35_000,
	retries: 2,
	extractLink(produto: ProdutoAfiliado) {
		if (!produto.shopee) return null;
		return {
			url: produto.shopee,
			generatedByPanel: produto.shopeeGeneratedByPanel,
		};
	},
};
