import { produtos } from './products';
import type { CommercialProduct, ComparisonRow } from '../types/commercial';

export type CommercialGuideId = 'melhor-fogao-4-bocas' | 'melhor-fogao-mesa-de-vidro';

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

export type HeroRankingLine = {
	/** Classes Tailwind de cor (ex.: text-pop). */
	toneClass: string;
	text: string;
};

export type CommercialGuideBlock = {
	topProducts: CommercialProduct[];
	comparisonRows: ComparisonRow[];
	topProductsCopy: CommercialTopProductsCopy;
	comparisonCopy: CommercialComparisonCopy;
	reviewPathPrefix: string;
	/** Box de ranking no Hero editorial (🥇 / 🥈 / 🥉). */
	heroRanking: HeroRankingLine[];
	/** Fragmentos markdown pós-tabela (ids da collection `melhores`). */
	moduleIds: readonly [
		string,
		string,
		string,
		string,
		string,
	];
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
	reviewPathPrefix: '/melhores/melhor-fogao-4-bocas/#analises-detalhadas',
	heroRanking: [
		{ toneClass: 'text-pop', text: '🥇 Melhor geral: Consul CF04NAR' },
		{ toneClass: 'text-cta', text: '🥈 Melhor premium: Electrolux Efficient FE4IW' },
		{ toneClass: 'text-amber-300', text: '🥉 Melhor custo-benefício: Atlas Mônaco Plus' },
	],
	moduleIds: [
		'_melhor-fogao-4-bocas-justificativas',
		'_melhor-fogao-4-bocas-como-avaliamos',
		'_melhor-fogao-4-bocas-perfil',
		'_melhor-fogao-4-bocas-antes',
		'_melhor-fogao-4-bocas-aprofundar',
	],
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

const melhorFogaoMesaDeVidro: CommercialGuideBlock = {
	topProductsCopy: {
		eyebrow: 'Escolha rápida',
		heading: 'Os 3 melhores fogões com mesa de vidro — comparativo direto',
		introParagraphs: [
			'Alguns links podem gerar comissão para o site, sem custo para você. Os preços podem variar, então vale conferir no momento da compra.',
			'Confira abaixo os modelos recomendados neste guia. As análises detalhadas de cada um continuam mais adiante no artigo.',
		],
		ctaParagraph:
			'Agora veja os modelos selecionados, <strong class="font-semibold text-on-ink-body">ofertas atualizadas hoje</strong> — estoque pode variar; use os botões para <strong class="font-semibold text-on-ink-body">ver disponibilidade</strong> na loja.',
	},
	comparisonCopy: {
		heading: 'Tabela comparativa: melhores fogões mesa de vidro',
		introParagraphs: [
			'Veja os modelos recomendados e compare as ofertas sem sair desta página.',
			'A tabela abaixo reúne preço de referência, nota e o destaque de cada modelo para facilitar sua decisão.',
			'Se o foco for economia, a coluna “Melhor para” ajuda a identificar rapidamente os modelos com melhor custo-benefício.',
		],
		footerNote:
			'Antes de fechar, confirme se a dúvida é acabamento (vidro) ou tamanho (4 vs 5 bocas) — são decisões diferentes.',
		footerCta: 'Continue lendo para entender melhor os critérios de compra e evitar erro na escolha.',
	},
	reviewPathPrefix: '/melhores/melhor-fogao-mesa-de-vidro/#analises-detalhadas',
	heroRanking: [
		{ toneClass: 'text-pop', text: '🥇 Melhor geral: Consul CFO4VAR' },
		{ toneClass: 'text-cta', text: '🥈 Melhor premium: Brastemp BFO4VAE' },
		{ toneClass: 'text-amber-300', text: '🥉 Melhor custo-benefício: Atlas Atenas Glass (Top Glass)' },
	],
	moduleIds: [
		'_melhor-fogao-mesa-de-vidro-justificativas',
		'_melhor-fogao-mesa-de-vidro-como-avaliamos',
		'_melhor-fogao-mesa-de-vidro-perfil',
		'_melhor-fogao-mesa-de-vidro-antes',
		'_melhor-fogao-mesa-de-vidro-aprofundar',
	],
	topProducts: [
		{
			name: 'Consul CFO4VAR',
			badge: '🥇 Melhor geral',
			badgeTone: 'emerald',
			basePrice: 'Confira na loja',
			benefits: [
				'Mesa de vidro temperado com limpeza mais ágil',
				'Grades de ferro fundido para uso diário',
				'Forno Cleartec com boa rotina de limpeza',
				'Assistência ampla e SKU fácil de achar',
			],
			socialProof: '⭐ Destaque do ranking 2026',
			reviewSlug: 'consul-cfo4var',
			mercadoLivreUrl: produtos.consulCFO4VAR.ml,
			shopeeUrl: produtos.consulCFO4VAR.shopee,
			imageVisualScale: 1,
			image: '/images/melhores/melhor-fogao-mesa-de-vidro/consul-cfo4var.webp',
			imageAlt: 'Fogão Consul CFO4VAR 4 bocas com mesa de vidro temperado',
			featured: true,
		},
		{
			name: 'Brastemp BFO4VAE',
			badge: '🥈 Melhor premium',
			badgeTone: 'pop',
			basePrice: 'Confira na loja',
			benefits: [
				'Grades duplas de ferro fundido — upgrade na mesa',
				'Conjunto preto + vidro com presença premium',
				'Forno esmaltado ~61 L para o dia a dia',
				'Corta-gás e acendimento automático',
			],
			socialProof: '⭐ Opção premium da categoria',
			reviewSlug: 'brastemp-bfo4vae',
			mercadoLivreUrl: produtos.brastempBFO4VAE.ml,
			shopeeUrl: produtos.brastempBFO4VAE.shopee,
			mlCtaText: 'VER PREÇO NO MERCADO LIVRE',
			shopeeCtaText: 'VER OFERTA NA SHOPEE',
			imageVisualScale: 1,
			image: '/images/melhores/melhor-fogao-mesa-de-vidro/brastemp-bfo4vae.webp',
			imageAlt: 'Fogão Brastemp BFO4VAE preto com mesa de vidro e grades duplas',
		},
		{
			name: 'Atlas Atenas Glass (Top Glass)',
			badge: '🥉 Melhor custo-benefício',
			badgeTone: 'amber',
			basePrice: 'Confira na loja',
			benefits: [
				'Entrada acessível em mesa de vidro temperado',
				'Acendimento automático e uso simples',
				'Forno ~50 L para rotina básica',
				'Boa disponibilidade comercial na faixa',
			],
			socialProof: '✔ Destaque em economia',
			reviewSlug: 'atlas-atenas-glass',
			mercadoLivreUrl: produtos.atlasAtenasGlass.ml,
			shopeeUrl: produtos.atlasAtenasGlass.shopee,
			mlCtaText: 'VER PREÇO NO MERCADO LIVRE',
			shopeeCtaText: 'VER OFERTA NA SHOPEE',
			imageVisualScale: 1,
			image: '/images/melhores/melhor-fogao-mesa-de-vidro/atlas-atenas-glass.webp',
			imageAlt: 'Fogão Atlas Atenas Glass (Top Glass) preto com mesa de vidro temperado',
		},
	],
	comparisonRows: [
		{
			badge: 'Melhor geral',
			recommended: true,
			model: 'Consul CFO4VAR',
			price: 'Confira na loja',
			rating: '⭐⭐⭐⭐⭐',
			bestFor: 'Uso geral em vidro',
			slug: 'consul-cfo4var',
			links: produtos.consulCFO4VAR,
		},
		{
			badge: 'Melhor premium',
			model: 'Brastemp BFO4VAE',
			price: 'Confira na loja',
			rating: '⭐⭐⭐⭐⭐',
			bestFor: 'Upgrade na mesa',
			slug: 'brastemp-bfo4vae',
			links: produtos.brastempBFO4VAE,
		},
		{
			badge: 'Melhor custo-benefício',
			model: 'Atlas Atenas Glass (Top Glass)',
			price: 'Confira na loja',
			rating: '⭐⭐⭐⭐☆',
			bestFor: 'Economia',
			slug: 'atlas-atenas-glass',
			links: produtos.atlasAtenasGlass,
		},
	],
};

export const commercialGuideBlocks: Record<CommercialGuideId, CommercialGuideBlock> = {
	'melhor-fogao-4-bocas': melhorFogao4Bocas,
	'melhor-fogao-mesa-de-vidro': melhorFogaoMesaDeVidro,
};

export function getCommercialGuideBlock(guideId: CommercialGuideId): CommercialGuideBlock {
	return commercialGuideBlocks[guideId];
}

export function isCommercialGuideId(id: string): id is CommercialGuideId {
	return id in commercialGuideBlocks;
}
