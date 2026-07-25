import type { ProdutoAfiliado } from '../../../data/products.ts';
import { mercadoLivreCollector, MERCADO_LIVRE_HOST_SUFFIXES } from '../collectors/mercadolivre.ts';
import type { MarketplacePlugin } from './types.ts';

export const mercadoLivrePlugin: MarketplacePlugin = {
	id: 'mercadolivre',
	label: 'Mercado Livre',
	hostSuffixes: MERCADO_LIVRE_HOST_SUFFIXES,
	collector: mercadoLivreCollector,
	timeoutMs: 45_000,
	retries: 3,
	extractLink(produto: ProdutoAfiliado) {
		if (!produto.ml) return null;
		return {
			url: produto.ml,
			generatedByPanel: produto.mlGeneratedByPanel,
		};
	},
};
