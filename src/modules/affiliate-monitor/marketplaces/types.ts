import type { ProdutoAfiliado } from '../../../data/products.ts';
import type { MarketplaceCollector } from '../collectors/types.ts';
import type { MarketplaceId } from '../types/index.ts';

/**
 * Plugin de marketplace — único ponto a estender para Amazon/Magalu/etc.
 * O motor só consome o registry; sem if/else por loja.
 */
export type MarketplaceLinkRef = {
	url: string;
	generatedByPanel?: boolean;
};

export type MarketplacePlugin = {
	readonly id: MarketplaceId;
	readonly label: string;
	readonly hostSuffixes: readonly string[];
	readonly collector: MarketplaceCollector;
	/**
	 * Extrai o link deste marketplace a partir do registro de produto.
	 * Retorna null se o SKU não tiver oferta nesta loja.
	 */
	extractLink(produto: ProdutoAfiliado): MarketplaceLinkRef | null;
	/** Timeout sugerido para este marketplace (anti-bot / latência). */
	timeoutMs?: number;
	retries?: number;
};
