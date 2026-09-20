import type { AstroRasterImport } from './astro-image';
import type { ProductId, ProdutoAfiliado } from '../data/products';

export type ProductBadgeTone = 'emerald' | 'amber' | 'pop';

export interface CommercialProduct {
	name: string;
	badge: string;
	badgeTone: ProductBadgeTone;
	basePrice: string;
	benefits: string[];
	socialProof: string;
	reviewSlug: string;
	/** Chave SSOT em `produtos` — tracking `affiliate_click.product_id`. */
	productId: ProductId;
	mercadoLivreUrl: string;
	shopeeUrl?: string;
	mlCtaText?: string;
	shopeeCtaText?: string;
	image?: string | AstroRasterImport;
	imageVisualScale?: number;
	imageAlt?: string;
	featured?: boolean;
}

/** Colunas extras da tabela comparativa — hubs de fogão continuam no conjunto padrão. */
export type ComparisonColumnKey =
	| 'price'
	| 'rating'
	| 'bestFor'
	| 'burners'
	| 'surface'
	| 'grates'
	| 'flame'
	| 'ignition'
	| 'dimensions';

export interface ComparisonRow {
	badge: string;
	recommended?: boolean;
	model: string;
	price: string;
	rating: string;
	bestFor: string;
	slug: string;
	/** Chave SSOT em `produtos` — tracking `affiliate_click.product_id`. */
	productId: ProductId;
	links: ProdutoAfiliado;
	burners?: string;
	surface?: string;
	grates?: string;
	flame?: string;
	ignition?: string;
	dimensions?: string;
}
