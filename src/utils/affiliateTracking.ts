/**
 * Mensuração comercial P0 — contrato de `affiliate_click` (GA4).
 * Vocabulários fechados; product_id = chave de `src/data/products.ts`.
 */
import { produtos, type ProductId } from '../data/products.ts';

export type { ProductId };

export type AffiliateMerchant = 'mercado_livre' | 'shopee';

export type AffiliateCtaType = 'price_check' | 'merchant_secondary';

export type AffiliateCtaPosition =
	| 'hero'
	| 'product_card'
	| 'comparison_table'
	| 'justification'
	| 'offer_block'
	| 'page_end'
	| 'inline';

export type AffiliatePageType =
	| 'home'
	| 'hub'
	| 'ranking'
	| 'review'
	| 'comparison'
	| 'guide'
	| 'institutional'
	| 'other';

export const PRODUCT_IDS = Object.keys(produtos) as ProductId[];

const PRODUCT_ID_SET = new Set<string>(PRODUCT_IDS);

export function isProductId(value: string | null | undefined): value is ProductId {
	return !!value && PRODUCT_ID_SET.has(value);
}

/** Janela em que um segundo clique no mesmo botão não gera outro `affiliate_click`. */
export const AFFILIATE_CLICK_DEBOUNCE_MS = 1000;

export type AffiliateClickSnapshot = {
	key: string;
	at: number;
};

/**
 * Decide se o clique vira evento.
 * Recusa `product_id` fora de `produtos` e repetição do mesmo botão dentro de 1s.
 * Outro produto, loja ou posição segue livre.
 */
export function shouldEmitAffiliateClick(
	previous: AffiliateClickSnapshot | null,
	productId: string,
	merchant: string,
	ctaType: string,
	ctaPosition: string,
	now: number,
): AffiliateClickSnapshot | null {
	if (!isProductId(productId)) return null;
	const key = `${productId}|${merchant}|${ctaType}|${ctaPosition}`;
	if (previous && previous.key === key && now - previous.at < AFFILIATE_CLICK_DEBOUNCE_MS) {
		return null;
	}
	return { key, at: now };
}

/** Normaliza path com barra final para mapear page_type. */
export function normalizePathname(pathname: string): string {
	if (!pathname || pathname === '/') return '/';
	const withLeading = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/**
 * Taxonomia page_type (função editorial, não categoria de produto).
 * Fallback explícito: `other`.
 */
export function resolvePageType(pathname: string): AffiliatePageType {
	const path = normalizePathname(pathname);

	if (path === '/') return 'home';
	if (path === '/melhores/') return 'hub';
	if (path.startsWith('/melhores/')) return 'ranking';

	if (path.startsWith('/review-') || path === '/brastemp-bfs5ncr-vale-a-pena/') {
		return 'review';
	}

	if (path.startsWith('/comparativo-')) return 'comparison';

	if (
		path.startsWith('/como-escolher-') ||
		path.includes('custo-beneficio') ||
		path === '/fogao-atlas-e-bom/'
	) {
		return 'guide';
	}

	if (
		path === '/sobre/' ||
		path === '/contato/' ||
		path === '/politica-de-afiliados/'
	) {
		return 'institutional';
	}

	return 'other';
}

export type AffiliateLinkAttrInput = {
	productId: ProductId;
	merchant: AffiliateMerchant;
	ctaType: AffiliateCtaType;
	ctaPosition: AffiliateCtaPosition;
};

/** Atributos data-* do contrato P0 (page_type fica no body). */
export function affiliateLinkAttrs(input: AffiliateLinkAttrInput): Record<string, string> {
	return {
		'data-product-id': input.productId,
		'data-merchant': input.merchant,
		'data-cta-type': input.ctaType,
		'data-cta-position': input.ctaPosition,
	};
}

export function mlAffiliateAttrs(
	productId: ProductId,
	ctaPosition: AffiliateCtaPosition,
): Record<string, string> {
	return affiliateLinkAttrs({
		productId,
		merchant: 'mercado_livre',
		ctaType: 'price_check',
		ctaPosition,
	});
}

export function shopeeAffiliateAttrs(
	productId: ProductId,
	ctaPosition: AffiliateCtaPosition,
): Record<string, string> {
	return affiliateLinkAttrs({
		productId,
		merchant: 'shopee',
		ctaType: 'merchant_secondary',
		ctaPosition,
	});
}
