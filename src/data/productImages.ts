/**
 * URLs em `public/images/…` (arquivos canônicos no disco).
 * Pastas espelhadas em `src/assets/images/reviews|blog|…` (vazias + `.gitkeep`) marcam convenção; não duplicar WEBP sem necessidade.
 * Nomenclatura: marca-modelo-tipo-premium.webp
 */
export const PRODUCT_IMAGE_REVIEW = {
	brastemp: '/images/reviews/brastemp-bfs5ncr-review-premium.webp',
	consul: '/images/reviews/consul-cfs5nab-review-premium.webp',
	electrolux: '/images/reviews/electrolux-fe5ig-review-premium.webp',
} as const;

export type ProductReviewSlug = keyof typeof PRODUCT_IMAGE_REVIEW;
