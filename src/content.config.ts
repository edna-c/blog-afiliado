import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faqSchema = z
	.array(
		z.object({
			question: z.string(),
			answer: z.string(),
		}),
	)
	.optional();

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.string(),
		// Opcional: miniatura em src/assets/images/blog (subpastas): nome post.id + sufixo -blog-premium.webp ou .png; senão placeholder no grid.
		coverImage: z.string().optional(),
		faq: faqSchema,
	}),
});

/**
 * Coleção `melhores` — guias de compra e reviews comerciais (Centro de Guias).
 * Mesmo padrão do blog, com campos extras úteis para conteúdo de decisão de compra.
 * Rotas geradas em `/melhores/<id-do-arquivo>` por `src/pages/melhores/[slug].astro`.
 */
const melhores = defineCollection({
	loader: glob({ base: './src/content/melhores', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.string(),
		// Discriminador do tipo de conteúdo comercial dentro do cluster /melhores.
		// Define layout e schema.org no template: ranking → ItemList, review → Product/Review.
		// Opcional na Fase 0 (default de leitura no template = 'guia') para não quebrar conteúdo existente.
		type: z.enum(['ranking', 'comparativo', 'review', 'guia', 'custo-beneficio']).optional(),
		// Clusters semânticos para interlinkagem derivada do frontmatter (aposenta o catálogo manual).
		topics: z.array(z.string()).optional(),
		// Capa (caminho em /public, ex.: /images/melhores/<slug>/capa.webp). Usada no hero/OG da página do guia.
		coverImage: z.string().optional(),
		// Miniatura exclusiva de listagens (home, hub /melhores, grids). Não altera hero nem OG.
		cardImage: z.string().optional(),
		coverAlt: z.string().optional(),
		/** H1 quando diferente do title SEO. */
		headline: z.string().optional(),
		/** Subtítulo em destaque abaixo do H1. */
		lead: z.string().optional(),
		/** Texto auxiliar sob o lead (dek). */
		dek: z.string().optional(),
		/** Eyebrow acima do H1 (ex.: "Atualizado 2026 · Guia de compra"). */
		eyebrow: z.string().optional(),
		// Rótulo curto do "top pick" do guia (ex.: "Consul CF04NAR"). Opcional.
		topPick: z.string().optional(),
		/** Card "Decisão em 20 segundos" — equivalente ao TL;DR visual da página original. */
		tldr: z
			.object({
				title: z.string(),
				items: z.array(z.string()).min(1),
				footerText: z.string().optional(),
				footerHref: z.string().optional(),
				footerLabel: z.string().optional(),
			})
			.optional(),
		/** CTAs finais (botões primário/secundário). */
		ctas: z
			.array(
				z.object({
					href: z.string(),
					label: z.string(),
					ariaLabel: z.string().optional(),
					variant: z.enum(['primary', 'secondary']).optional(),
				}),
			)
			.optional(),
		faq: faqSchema,
	}),
});

export const collections = { blog, melhores };
