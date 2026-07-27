import { produtos } from './products';
import type { CommercialProduct, ComparisonRow } from '../types/commercial';

export type CommercialGuideId =
	| 'melhor-fogao-5-bocas'
	| 'melhor-fogao-4-bocas'
	| 'melhor-fogao-mesa-de-vidro';

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

const melhorFogao5Bocas: CommercialGuideBlock = {
	topProductsCopy: {
		eyebrow: 'Escolha rápida',
		heading: 'Os 3 melhores fogões 5 bocas — comparativo direto',
		introParagraphs: [
			'Alguns links podem gerar comissão para o site, sem custo para você. Os preços podem variar, então vale conferir no momento da compra.',
			'Confira abaixo os modelos recomendados neste guia. As justificativas de cada medalha continuam mais adiante na página.',
		],
		ctaParagraph:
			'Agora veja os modelos selecionados, <strong class="font-semibold text-on-ink-body">ofertas atualizadas hoje</strong> — estoque pode variar; use os botões para <strong class="font-semibold text-on-ink-body">ver disponibilidade</strong> na loja.',
	},
	comparisonCopy: {
		heading: 'Tabela comparativa: melhores fogões 5 bocas',
		introParagraphs: [
			'Compare os três modelos do ranking sem sair desta página.',
			'A tabela reúne preço de referência, nota e o perfil de cada medalha para acelerar a decisão.',
			'Se o foco for só economia, a coluna “Melhor para” aponta rápido o custo-benefício e a entrada.',
		],
		footerNote:
			'Ainda em dúvida entre 4 e 5 bocas? Feche o tamanho antes do modelo — o comparativo 4 vs 5 bocas resolve essa etapa.',
		footerCta: 'Continue lendo para ver por que cada medalha existe e qual perfil combina com você.',
	},
	reviewPathPrefix: '/melhores/melhor-fogao-5-bocas/#analises-detalhadas',
	heroRanking: [
		{ toneClass: 'text-pop', text: '🥇 Melhor geral: Electrolux FE5IG' },
		{ toneClass: 'text-cta', text: '💰 Melhor custo-benefício: Brastemp BFS5NCR' },
		{ toneClass: 'text-amber-300', text: '🔥 Entrada / mais acessível: Consul CFS5NAB' },
	],
	moduleIds: [
		'_melhor-fogao-5-bocas-justificativas',
		'_melhor-fogao-5-bocas-como-avaliamos',
		'_melhor-fogao-5-bocas-perfil',
		'_melhor-fogao-5-bocas-antes',
		'_melhor-fogao-5-bocas-aprofundar',
	],
	topProducts: [
		{
			name: 'Electrolux FE5IG',
			badge: '🥇 Melhor geral',
			badgeTone: 'emerald',
			basePrice: 'Confira na loja',
			benefits: [
				'Forno e acabamento para quem cozinha de verdade',
				'Mesa inox com presença mais premium',
				'Bom equilíbrio de bocas para várias panelas',
				'Linha com reputação consolidada no pós-venda',
			],
			socialProof: '⭐ Destaque do ranking 2026',
			reviewSlug: 'electrolux',
			mercadoLivreUrl: produtos.electroluxFE5IG.ml,
			shopeeUrl: produtos.electroluxFE5IG.shopee,
			mlCtaText: 'VER PREÇO NO MERCADO LIVRE',
			shopeeCtaText: 'VER OFERTA NA SHOPEE',
			image: '/images/melhores/melhor-fogao-5-bocas/electrolux-fe5ig.webp',
			imageAlt: 'Fogão Electrolux FE5IG 5 bocas em inox com mesa inox',
			featured: true,
		},
		{
			name: 'Brastemp BFS5NCR',
			badge: '💰 Melhor custo-benefício',
			badgeTone: 'pop',
			basePrice: 'Confira na loja',
			benefits: [
				'Potência e forno sem pagar o topo do ranking',
				'Equilíbrio forte para rotina familiar',
				'Limpeza e manutenção no uso diário',
				'Boa disponibilidade nas lojas afiliadas',
			],
			socialProof: '⭐ Melhor equilíbrio preço/desempenho',
			reviewSlug: 'brastemp',
			mercadoLivreUrl: produtos.brastempBFS5NCR.ml,
			shopeeUrl: produtos.brastempBFS5NCR.shopee,
			mlCtaText: 'VER PREÇO NO MERCADO LIVRE',
			shopeeCtaText: 'VER OFERTA NA SHOPEE',
			image: '/images/melhores/melhor-fogao-5-bocas/brastemp-bfs5ncr.webp',
			imageAlt: 'Fogão Brastemp BFS5NCR 5 bocas em inox',
		},
		{
			name: 'Consul CFS5NAB',
			badge: '🔥 Entrada / mais acessível',
			badgeTone: 'amber',
			basePrice: 'Confira na loja',
			benefits: [
				'Entra em 5 bocas com orçamento mais contido',
				'Uso simples, sem firula desnecessária',
				'Adequado para cozinha média e rotina básica',
				'SKU fácil de achar e comparar preço',
			],
			socialProof: '✔ Entrada mais acessível do ranking',
			reviewSlug: 'consul',
			mercadoLivreUrl: produtos.consulCFS5NAB.ml,
			shopeeUrl: produtos.consulCFS5NAB.shopee,
			mlCtaText: 'VER PREÇO NO MERCADO LIVRE',
			shopeeCtaText: 'VER OFERTA NA SHOPEE',
			image: '/images/melhores/melhor-fogao-5-bocas/consul-cfs5nab.webp',
			imageAlt: 'Fogão Consul CFS5NAB 5 bocas em inox com tampa de vidro',
		},
	],
	comparisonRows: [
		{
			badge: 'Melhor geral',
			recommended: true,
			model: 'Electrolux FE5IG',
			price: 'Confira na loja',
			rating: '⭐⭐⭐⭐⭐',
			bestFor: 'Forno + acabamento',
			slug: 'electrolux',
			links: produtos.electroluxFE5IG,
		},
		{
			badge: 'Custo-benefício',
			model: 'Brastemp BFS5NCR',
			price: 'Confira na loja',
			rating: '⭐⭐⭐⭐⭐',
			bestFor: 'Rotina familiar',
			slug: 'brastemp',
			links: produtos.brastempBFS5NCR,
		},
		{
			badge: 'Entrada',
			model: 'Consul CFS5NAB',
			price: 'Confira na loja',
			rating: '⭐⭐⭐⭐☆',
			bestFor: 'Orçamento contido',
			slug: 'consul',
			links: produtos.consulCFS5NAB,
		},
	],
};

const melhorFogao4Bocas: CommercialGuideBlock = {
	topProductsCopy: {
		eyebrow: 'Escolha rápida',
		heading: 'Os 3 melhores fogões 4 bocas — comparativo direto',
		introParagraphs: [
			'Alguns links podem gerar comissão para o site, sem custo para você. Os preços podem variar, então vale conferir no momento da compra.',
			'Confira abaixo os modelos recomendados neste guia. As justificativas de cada medalha continuam mais adiante na página.',
		],
		ctaParagraph:
			'Agora veja os modelos selecionados, <strong class="font-semibold text-on-ink-body">ofertas atualizadas hoje</strong> — estoque pode variar; use os botões para <strong class="font-semibold text-on-ink-body">ver disponibilidade</strong> na loja.',
	},
	comparisonCopy: {
		heading: 'Tabela comparativa: melhores fogões 4 bocas',
		introParagraphs: [
			'Compare os três modelos do ranking sem sair desta página.',
			'A tabela reúne preço de referência, nota e o perfil de cada medalha para acelerar a decisão.',
			'Se o foco for só economia, a coluna “Melhor para” aponta rápido o custo-benefício.',
		],
		footerNote:
			'Ainda em dúvida entre 4 e 5 bocas? Feche o tamanho antes do modelo — o comparativo 4 vs 5 bocas resolve essa etapa.',
		footerCta: 'Continue lendo para ver por que cada medalha existe e qual perfil combina com você.',
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
			'Confira abaixo os modelos recomendados neste guia. As justificativas de cada medalha continuam mais adiante na página.',
		],
		ctaParagraph:
			'Agora veja os modelos selecionados, <strong class="font-semibold text-on-ink-body">ofertas atualizadas hoje</strong> — estoque pode variar; use os botões para <strong class="font-semibold text-on-ink-body">ver disponibilidade</strong> na loja.',
	},
	comparisonCopy: {
		heading: 'Tabela comparativa: melhores fogões mesa de vidro',
		introParagraphs: [
			'Compare os três modelos do ranking sem sair desta página.',
			'A tabela reúne preço de referência, nota e o perfil de cada medalha para acelerar a decisão.',
			'Se o foco for só economia, a coluna “Melhor para” aponta rápido o custo-benefício.',
		],
		footerNote:
			'Antes de fechar, confirme se a dúvida é acabamento (vidro) ou tamanho (4 vs 5 bocas) — são decisões diferentes.',
		footerCta: 'Continue lendo para ver por que cada medalha existe e qual perfil combina com você.',
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
	'melhor-fogao-5-bocas': melhorFogao5Bocas,
	'melhor-fogao-4-bocas': melhorFogao4Bocas,
	'melhor-fogao-mesa-de-vidro': melhorFogaoMesaDeVidro,
};

export function getCommercialGuideBlock(guideId: CommercialGuideId): CommercialGuideBlock {
	return commercialGuideBlocks[guideId];
}

export function isCommercialGuideId(id: string): id is CommercialGuideId {
	return id in commercialGuideBlocks;
}
