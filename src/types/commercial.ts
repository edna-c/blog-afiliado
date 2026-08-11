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
}
