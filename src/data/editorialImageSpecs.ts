/**
 * Especificações editoriais de imagem — dimensões, Picture e brief de produção.
 *
 * Usar estes valores ao exportar novos assets e ao integrar `<Picture />`.
 * O build Astro gera AVIF/WebP nas larguras de `picture.widths`; o master
 * deve ter resolução ≥ maior largura do tipo.
 */

export const PICTURE_FORMATS = ['avif', 'webp'] as const;

export type EditorialImageKind =
	| 'homeProductCard'
	| 'homeHero'
	| 'blogThumbnail'
	| 'blogArticleHero'
	| 'guidePageHero'
	| 'productReviewSquare'
	| 'productReviewWide';

export interface EditorialImageSpec {
	kind: EditorialImageKind;
	/** Proporção de exibição (Tailwind: aspect-[w/h]) */
	aspect: '1/1' | '4/5' | '16/10' | '16/9';
	/** Classe Tailwind de aspecto */
	aspectClass: string;
	/** Largura × altura recomendadas do ficheiro master (px) */
	exportSize: { width: number; height: number };
	/** Teto orientativo do master antes do build (KB) — evita fontes de 1–2 MB */
	maxSourceKb: number;
	/** Pasta sob `src/assets/images/` */
	folder: string;
	/** Padrão de nome (placeholders entre chaves) */
	filenamePattern: string;
	/** Config partilhada por `<Picture />` neste tipo */
	picture: {
		widths: readonly number[];
		sizes: string;
		quality: number;
	};
	/** Notas para geração (Gemini, Squoosh, etc.) */
	brief: string;
}

/** Cards da home (#top-produtos) — fogão em fundo escuro, object-contain */
export const HOME_PRODUCT_CARD: EditorialImageSpec = {
	kind: 'homeProductCard',
	aspect: '1/1',
	aspectClass: 'aspect-square',
	exportSize: { width: 1400, height: 1400 },
	maxSourceKb: 400,
	folder: 'cards/optimized',
	filenamePattern: '{modelo-slug}-card-premium.webp',
	picture: {
		widths: [320, 400, 512, 688],
		sizes: '(max-width: 768px) 85vw, (max-width: 1024px) 31vw, 344px',
		quality: 80,
	},
	brief:
		'Quadrado 1400×1400 px, fundo #121212–#151515, produto centralizado com sombra de contacto, luz lateral suave. WEBP master ≤400 KB. Não reutilizar artes do blog.',
};

/** Hero da home — cozinha / fogão, object-cover */
export const HOME_HERO: EditorialImageSpec = {
	kind: 'homeHero',
	aspect: '4/5',
	aspectClass: 'aspect-[4/5]',
	exportSize: { width: 1200, height: 1500 },
	maxSourceKb: 180,
	folder: 'heroes',
	filenamePattern: 'melhores-fogoes-5-bocas-hero.webp',
	picture: {
		widths: [360, 480, 640, 800, 960, 1200],
		sizes: '(min-width: 1024px) min(50vw, 640px), 100vw',
		quality: 82,
	},
	brief:
		'Vertical 4:5 (mín. 1200×1500 px), cozinha premium em bokeh, fogão legível. WEBP ≤180 KB. Recorte seguro no centro-superior (object-position ~60% 35%).',
};

/** Miniatura dos cards do blog (listagem + home) */
export const BLOG_THUMBNAIL: EditorialImageSpec = {
	kind: 'blogThumbnail',
	aspect: '16/10',
	aspectClass: 'aspect-[16/10]',
	exportSize: { width: 1200, height: 750 },
	maxSourceKb: 150,
	folder: 'blog/{guias|reviews|comparativos}',
	filenamePattern: '{post.id}-blog-premium.webp',
	picture: {
		widths: [480, 640, 800, 960],
		sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
		quality: 82,
	},
	brief:
		'1200×750 px (16:10), fundo escuro cinematográfico, sem texto na imagem. WEBP preferível (≤150 KB) ou PNG comprimido. Nome = slug do post + `-blog-premium`.',
};

/** Hero dentro do artigo (coluna max-w-2xl ≈ 672px) */
export const BLOG_ARTICLE_HERO: EditorialImageSpec = {
	kind: 'blogArticleHero',
	aspect: '16/10',
	aspectClass: 'aspect-[16/10]',
	exportSize: { width: 1280, height: 800 },
	maxSourceKb: 200,
	folder: 'blog/{guias|reviews|comparativos}',
	filenamePattern: '{post.id}-article-hero.webp',
	picture: {
		widths: [640, 768, 960, 1152],
		sizes: '(max-width: 768px) 100vw, 672px',
		quality: 82,
	},
	brief:
		'1280×800 px (16:10), mesma linguagem visual do thumbnail mas composição mais ampla. WEBP 80–85% ou PNG otimizado ≤200 KB. Registrar em `articleHeroes` em `blog/[slug].astro`.',
};

/** Hero de guias longos (ex.: melhor fogão 5 bocas) — largura max-w-3xl */
export const GUIDE_PAGE_HERO: EditorialImageSpec = {
	kind: 'guidePageHero',
	aspect: '16/10',
	aspectClass: 'aspect-[16/10] sm:aspect-[16/9]',
	exportSize: { width: 1280, height: 800 },
	maxSourceKb: 200,
	folder: 'heroes',
	filenamePattern: '{pagina-slug}-hero.webp',
	picture: {
		widths: [640, 768, 960, 1152],
		sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 768px, 960px',
		quality: 80,
	},
	brief:
		'1280×800 px (16:10), cena editorial larga; em desktop pode exibir 16:9. object-cover central. WEBP ≤200 KB.',
};

/** Reviews — vitrine quadrada (igual cards home) */
export const PRODUCT_REVIEW_SQUARE: EditorialImageSpec = {
	kind: 'productReviewSquare',
	aspect: '1/1',
	aspectClass: 'aspect-square',
	exportSize: { width: 1400, height: 1400 },
	maxSourceKb: 400,
	folder: 'reviews',
	filenamePattern: '{marca}-review-product.webp',
	picture: HOME_PRODUCT_CARD.picture,
	brief: HOME_PRODUCT_CARD.brief,
};

/** Reviews — figura editorial larga (opcional) */
export const PRODUCT_REVIEW_WIDE: EditorialImageSpec = {
	kind: 'productReviewWide',
	aspect: '16/10',
	aspectClass: 'aspect-[4/3] w-full sm:aspect-[16/10]',
	exportSize: { width: 1280, height: 800 },
	maxSourceKb: 200,
	folder: 'reviews',
	filenamePattern: '{marca}-review-hero.webp',
	picture: BLOG_ARTICLE_HERO.picture,
	brief: BLOG_ARTICLE_HERO.brief,
};

export const EDITORIAL_IMAGE_SPECS: Record<EditorialImageKind, EditorialImageSpec> = {
	homeProductCard: HOME_PRODUCT_CARD,
	homeHero: HOME_HERO,
	blogThumbnail: BLOG_THUMBNAIL,
	blogArticleHero: BLOG_ARTICLE_HERO,
	guidePageHero: GUIDE_PAGE_HERO,
	productReviewSquare: PRODUCT_REVIEW_SQUARE,
	productReviewWide: PRODUCT_REVIEW_WIDE,
};

/** Helper para spread em `<Picture />` */
export function picturePropsFrom(spec: EditorialImageSpec) {
	return {
		formats: PICTURE_FORMATS,
		widths: [...spec.picture.widths],
		sizes: spec.picture.sizes,
		quality: spec.picture.quality,
	} as const;
}
