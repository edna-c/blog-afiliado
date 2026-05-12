import type { ImageMetadata } from 'astro:assets';

/**
 * Miniaturas editoriais do blog (`<slug-do-post>-blog-premium.webp|png`) em
 * `src/assets/images/blog/{guias,reviews,comparativos}/`.
 *
 * **Gemini (geração):** exportar WEBP ~1200×750 (16:10), fundo #121212–#1a1a1a, luz lateral suave,
 * produto nítido com sombra de contacto suave; cozinha premium só em bokeh desfocado; sem fundo branco,
 * sem neon, sem estética de thumbnail sensacionalista. Não reutilizar as artes dos cards da home.
 *
 * **Cursor (integração):** manter o nome do ficheiro igual ao `post.id` + sufixo `-blog-premium`;
 * substituir o asset na pasta da categoria e rodar `bun run build`.
 */
const raw = import.meta.glob<{ default: ImageMetadata }>('../assets/images/blog/**/*-blog-premium.{webp,png}', {
	eager: true,
	import: 'default',
});

const byPostId: Record<string, ImageMetadata> = {};

for (const path of Object.keys(raw)) {
	const file = path.split('/').pop() ?? '';
	const m = /^(.+)-blog-premium\.(?:webp|png)$/.exec(file);
	if (m?.[1]) {
		byPostId[m[1]] = raw[path] as ImageMetadata;
	}
}

export function getBlogThumbnailAsset(postId: string): ImageMetadata | undefined {
	return byPostId[postId];
}
