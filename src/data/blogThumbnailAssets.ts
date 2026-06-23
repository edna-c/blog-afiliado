import type { AstroRasterImport } from '../types/astro-image';
import { BLOG_THUMBNAIL } from './editorialImageSpecs';
import fogaoVidroOuInoxBlogPremium from '../assets/images/blog/comparativos/fogao-mesa-de-vidro-ou-inox-blog-premium.webp';

/**
 * Miniaturas do blog — ver `BLOG_THUMBNAIL` em `editorialImageSpecs.ts`
 * (export {width}×{height}, pasta, brief e Picture).
 */
const raw = import.meta.glob('../assets/images/blog/**/*-blog-premium.{webp,png}', {
	eager: true,
	import: 'default',
}) as Record<string, AstroRasterImport>;

const byPostId: Record<string, AstroRasterImport> = {};

for (const path of Object.keys(raw)) {
	const file = path.split('/').pop() ?? '';
	const m = /^(.+)-blog-premium\.(?:webp|png)$/.exec(file);
	if (m?.[1]) {
		byPostId[m[1]] = raw[path];
	}
}

/** Imports explícitos — garantem HMR e build quando o glob não recarrega subpastas novas. */
const explicitThumbnails: Record<string, AstroRasterImport> = {
	'fogao-mesa-de-vidro-ou-inox': fogaoVidroOuInoxBlogPremium,
};

for (const [postId, asset] of Object.entries(explicitThumbnails)) {
	byPostId[postId] = asset;
}

export function getBlogThumbnailAsset(postId: string): AstroRasterImport | undefined {
	return byPostId[postId];
}

/** Reexport para documentação em ferramentas de geração de imagem */
export const blogThumbnailSpec = BLOG_THUMBNAIL;
