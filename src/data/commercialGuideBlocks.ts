import { produtos } from './products';
import type { CommercialProduct, ComparisonRow } from '../types/commercial';

export type CommercialGuideId = 'melhor-fogao-4-bocas';

export type CommercialTopProductsCopy = {
	eyebrow: string;
	heading: string;
	introParagraphs: string[];
	ctaParagraph: string;
};

export type CommercialComparisonCopy = {
	heading: string;
	introParagraphs: string[];
	footerNote?: string;
	footerCta?: string;
};

export type CommercialGuideBlock = {
	topProducts: CommercialProduct[];
	comparisonRows: ComparisonRow[];
	topProductsCopy: CommercialTopProductsCopy;
	comparisonCopy: CommercialComparisonCopy;
	reviewPathPrefix: string;
};

const melhorFogao4Bocas: CommercialGuideBlock = {
	topProductsCopy: {
		eyebrow: 'Escolha rápida',
		heading: 'Os 3 melhores fogões 4 bocas — comparativo direto',
		introParagraphs: [
			'Alguns links podem gerar comissão para o site, sem custo para você. Os preços podem variar, então vale conferir no momento da compra.',
			'Confira abaixo os modelos recomendados neste guia. As análises detalhadas de cada um continuam mais adiante no artigo.',
		],
		ctaParagraph:
			'Agora veja os modelos selecionados, <strong class="font-semibold text-on-ink-body">ofertas atualizadas hoje</strong> — estoque pode variar; use os botões para <strong class="font-semibold text-on-ink-body">ver disponibilidade</strong> na loja.',
	},
	comparisonCopy: {
		heading: 'Tabela comparativa: melhores fogões 4 bocas',
		introParagraphs: [
			'Veja os modelos recomendados e compare as ofertas sem sair desta página.',
			'A tabela abaixo reúne preço de referência, nota e o destaque de cada modelo para facilitar sua decisão.',
			'Se o foco for economia, a coluna “Melhor para” ajuda a identificar rapidamente os modelos com melhor custo-benefício.',
		],
		footerNote:
			'Antes de fechar, vale cruzar com o comparativo entre fogões 4 e 5 bocas se ainda estiver em dúvida sobre o tamanho ideal.',
		footerCta: 'Continue lendo para entender melhor os critérios de compra e evitar erro na escolha.',
	},
	reviewPathPrefix: '/melhores/melhor-fogao-4-bocas#analises-detalhadas',
	topProducts: [
		{
			name: 'Consul CF04NAR',
			badge: '🥇 Melhor geral',
			badgeTone: 'emerald',
			basePrice: 'Confira na loja',
			benefits: [
				'Excelente equilíbrio entre preço e qualidade',
				'Mesa em inox resistente ao uso diário',
				'Acendimento automático nas bocas',
				'Assistência técnica amplamente disponível',
			],
			socialProof: '⭐ Destaque do ranking 2026',
			reviewSlug: 'consul-cf04nar',
			mercadoLivreUrl: produtos.consulCF04NAR.ml,
			shopeeUrl: produtos.consulCF04NAR.shopee,
			image: '/images/melhores/melhor-fogao-4-bocas/consul-cf04nar.webp',
			imageAlt: 'Fogão Consul CF04NAR 4 bocas inox com acendimento automático',
			featured: true,
		},
		{
			name: 'Electrolux Efficient FE4IW',
			badge: '🥈 Melhor premium',
			badgeTone: 'pop',
			basePrice: 'Confira na loja',
			benefits: [
				'Mesa inox e acabamento branco para cozinhas planejadas',
				'PerfectCook e VaporBake no forno',
				'Bivolt — mais flexibilidade na instalação',
				'Linha Efficient com visual mais atual',
			],
			socialProof: '⭐ Opção premium da categoria',
			reviewSlug: 'electrolux-fe4iw',
			mercadoLivreUrl: produtos.electroluxFE4IW.ml,
			shopeeUrl: produtos.electroluxFE4IW.shopee,
			mlCtaText: 'VER PREÇO NO MERCADO LIVRE',
			shopeeCtaText: 'VER OFERTA NA SHOPEE',
			image: '/images/melhores/melhor-fogao-4-bocas/electrolux-fe4iw.webp',
			imageAlt: 'Fogão Electrolux Efficient FE4IW branco com mesa inox',
		},
		{
			name: 'Atlas Mônaco Plus',
			badge: '🥉 Melhor custo-benefício',
			badgeTone: 'amber',
			basePrice: 'Confira na loja',
			benefits: [
				'Excelente preço para a categoria',
				'Baixo custo de manutenção',
				'Peças fáceis de encontrar',
				'Funcionamento simples e confiável',
			],
			socialProof: '✔ Destaque em economia',
			reviewSlug: 'atlas-monaco-plus',
			mercadoLivreUrl: produtos.atlasMonacoPlus.ml,
			shopeeUrl: produtos.atlasMonacoPlus.shopee,
			mlCtaText: 'VER PREÇO NO MERCADO LIVRE',
			shopeeCtaText: 'VER OFERTA NA SHOPEE',
			image: '/images/melhores/melhor-fogao-4-bocas/atlas-monaco-plus.webp',
			imageAlt: 'Fogão Atlas Mônaco Plus preto com mesa inox',
		},
	],
	comparisonRows: [
		{
			badge: 'Melhor geral',
			recommended: true,
			model: 'Consul CF04NAR',
			price: 'Confira na loja',
			rating: '⭐⭐⭐⭐⭐',
			bestFor: 'Uso geral',
			slug: 'consul-cf04nar',
			links: produtos.consulCF04NAR,
		},
		{
			badge: 'Melhor premium',
			model: 'Electrolux Efficient FE4IW',
			price: 'Confira na loja',
			rating: '⭐⭐⭐⭐⭐',
			bestFor: 'Acabamento premium',
			slug: 'electrolux-fe4iw',
			links: produtos.electroluxFE4IW,
		},
		{
			badge: 'Melhor custo-benefício',
			model: 'Atlas Mônaco Plus',
			price: 'Confira na loja',
			rating: '⭐⭐⭐⭐☆',
			bestFor: 'Economia',
			slug: 'atlas-monaco-plus',
			links: produtos.atlasMonacoPlus,
		},
	],
};

export const commercialGuideBlocks: Record<CommercialGuideId, CommercialGuideBlock> = {
	'melhor-fogao-4-bocas': melhorFogao4Bocas,
};

export function getCommercialGuideBlock(guideId: CommercialGuideId): CommercialGuideBlock {
	return commercialGuideBlocks[guideId];
}
