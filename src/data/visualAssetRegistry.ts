/**
 * Registro tipado auxiliar do patrimônio visual — Motor III.
 *
 * SSOT permanente: `docs/BIBLIOTECA_VISUAL.md`
 * Backlog operacional: `docs/BACKLOG_PATRIMONIO_VISUAL.md`
 *
 * Classificação: Tipo A (Editorial) · Tipo B (Técnico) · Comercial (SKU).
 * Prioridade de produção: Tipo B antes de Tipo A.
 *
 * Não duplicar masters: `public/images/…` · `src/assets/images/…`.
 * Specs: `editorialImageSpecs.ts`. Reviews 5 bocas: `productImages.ts`.
 */

export type VisualPriority = 'ALTA' | 'MEDIA' | 'BAIXA';
export type VisualRole =
	| 'packshot-card'
	| 'packshot-review'
	| 'hero-guide'
	| 'hero-article'
	| 'thumb-blog'
	| 'corpo-editorial'
	| 'tipologia-tecnica'
	| 'og'
	| 'logo';

/** Tipo A = contextual; Tipo B = patrimônio técnico; Comercial = packshot SKU */
export type VisualCategory = 'editorial' | 'tecnico' | 'comercial';

export type ReusePotential = 'baixo' | 'medio' | 'alto' | 'patrimonio';

export type VisualLifespan = 'curta' | 'media' | 'longa' | 'permanente';

/** Status de governança do ativo (SSOT §0.1) */
export type GovernanceStatus = 'planejado' | 'produzido' | 'validado' | 'incorporado';

/** Ficha de governança — obrigatória para ativos novos / lacunas em produção */
export interface VisualGovernance {
	category: VisualCategory;
	reusePotential: ReusePotential;
	lifespan: VisualLifespan;
	/** URLs que já consomem o ativo */
	usedBy: readonly string[];
	/** URLs ou clusters candidatos a reuso futuro */
	plannedFor: readonly string[];
	/** Responsável humano pela aprovação (Design System §6) */
	approver: string;
	status: GovernanceStatus;
}

export interface VisualAsset {
	id: string;
	/** Path público (/images/…) ou nota de asset Astro */
	path: string;
	role: VisualRole;
	/** SKU / tema editorial */
	subject: string;
	/** URLs que já consomem o ativo (reuso) — espelho de governance.usedBy quando houver */
	usedBy: readonly string[];
	notes?: string;
	/** Preencher em ativos novos; backfill gradual nos legados */
	governance?: VisualGovernance;
}

export interface VisualGap {
	id: string;
	priority: VisualPriority;
	/** Página ou cluster dono da intenção */
	url: string;
	need: string;
	/** Ativos candidatos a reuso (ids do registry) antes de produzir */
	reuseCandidates?: readonly string[];
	status: 'open' | 'in_progress' | 'done';
	/** Classificação A/B — obrigatória nas lacunas abertas */
	category: VisualCategory;
	reusePotential?: ReusePotential;
	/** ID de lacuna SSOT (L01…L17) quando houver */
	lacunaId?: string;
}

/** Packshots comerciais e reviews (canônicos em public/) */
export const PACKSHOT_ASSETS: readonly VisualAsset[] = [
	{
		id: 'review-brastemp-bfs5ncr',
		path: '/images/reviews/brastemp-bfs5ncr-review-premium.webp',
		role: 'packshot-review',
		subject: 'Brastemp BFS5NCR',
		usedBy: ['/review-fogao-5-bocas-brastemp/', '/brastemp-bfs5ncr-vale-a-pena/', 'og-fallback'],
	},
	{
		id: 'review-consul-cfs5nab',
		path: '/images/reviews/consul-cfs5nab-review-premium.webp',
		role: 'packshot-review',
		subject: 'Consul CFS5NAB',
		usedBy: ['/review-fogao-5-bocas-consul/'],
	},
	{
		id: 'review-electrolux-fe5ig',
		path: '/images/reviews/electrolux-fe5ig-review-premium.webp',
		role: 'packshot-review',
		subject: 'Electrolux FE5IG',
		usedBy: ['/review-fogao-5-bocas-electrolux/'],
	},
	{
		id: 'card-5b-brastemp',
		path: 'src/assets/images/cards/optimized/brastemp-bfs5ncr-card-premium.webp',
		role: 'packshot-card',
		subject: 'Brastemp BFS5NCR',
		usedBy: ['/'],
	},
	{
		id: 'card-5b-consul',
		path: 'src/assets/images/cards/optimized/consul-cfs5nab-card-premium.webp',
		role: 'packshot-card',
		subject: 'Consul CFS5NAB',
		usedBy: ['/'],
	},
	{
		id: 'card-5b-electrolux',
		path: 'src/assets/images/cards/optimized/electrolux-fe5ig-card-premium.webp',
		role: 'packshot-card',
		subject: 'Electrolux FE5IG',
		usedBy: ['/'],
	},
	{
		id: 'guide-5b-electrolux',
		path: '/images/melhores/melhor-fogao-5-bocas/electrolux-fe5ig.webp',
		role: 'packshot-card',
		subject: 'Electrolux FE5IG',
		usedBy: [],
	},
	{
		id: 'guide-5b-brastemp',
		path: '/images/melhores/melhor-fogao-5-bocas/brastemp-bfs5ncr.webp',
		role: 'packshot-card',
		subject: 'Brastemp BFS5NCR',
		usedBy: [],
	},
	{
		id: 'guide-5b-consul',
		path: '/images/melhores/melhor-fogao-5-bocas/consul-cfs5nab.webp',
		role: 'packshot-card',
		subject: 'Consul CFS5NAB',
		usedBy: [],
	},
	{
		id: 'guide-4b-consul',
		path: '/images/melhores/melhor-fogao-4-bocas/consul-cf04nar.webp',
		role: 'packshot-card',
		subject: 'Consul CF04NAR',
		usedBy: ['/melhores/melhor-fogao-4-bocas/', '/review-fogao-4-bocas-consul/'],
	},
	{
		id: 'guide-4b-electrolux',
		path: '/images/melhores/melhor-fogao-4-bocas/electrolux-fe4iw.webp',
		role: 'packshot-card',
		subject: 'Electrolux FE4IW',
		usedBy: ['/melhores/melhor-fogao-4-bocas/', '/review-fogao-4-bocas-electrolux/'],
	},
	{
		id: 'guide-4b-atlas',
		path: '/images/melhores/melhor-fogao-4-bocas/atlas-monaco-plus.webp',
		role: 'packshot-card',
		subject: 'Atlas Mônaco Plus',
		usedBy: ['/melhores/melhor-fogao-4-bocas/', '/fogao-atlas-e-bom/'],
	},
	{
		id: 'guide-vidro-consul',
		path: '/images/melhores/melhor-fogao-mesa-de-vidro/consul-cfo4var.webp',
		role: 'packshot-card',
		subject: 'Consul CFO4VAR',
		usedBy: ['/melhores/melhor-fogao-mesa-de-vidro/', '/review-fogao-mesa-de-vidro-consul/'],
	},
	{
		id: 'guide-vidro-brastemp',
		path: '/images/melhores/melhor-fogao-mesa-de-vidro/brastemp-bfo4vae.webp',
		role: 'packshot-card',
		subject: 'Brastemp BFO4VAE',
		usedBy: ['/melhores/melhor-fogao-mesa-de-vidro/'],
	},
	{
		id: 'guide-vidro-atlas',
		path: '/images/melhores/melhor-fogao-mesa-de-vidro/atlas-atenas-glass.webp',
		role: 'packshot-card',
		subject: 'Atlas Atenas Glass',
		usedBy: ['/melhores/melhor-fogao-mesa-de-vidro/', '/fogao-atlas-e-bom/'],
	},
] as const;

/** Lifestyle / corpo editorial reutilizável */
export const EDITORIAL_BODY_ASSETS: readonly VisualAsset[] = [
	{
		id: 'hero-vidro-consul-cfo4var',
		path: '/images/melhores/melhor-fogao-mesa-de-vidro/consul-cfo4var-hero.webp',
		role: 'corpo-editorial',
		subject: 'Consul CFO4VAR mesa de vidro (hero)',
		usedBy: [
			'/melhores/melhor-fogao-mesa-de-vidro/',
			'/blog/fogao-mesa-de-vidro-ou-inox/',
		],
		notes: 'Função no comparativo: mostrar tampo de vidro em contexto de cozinha.',
	},
	{
		id: 'hero-4b-consul-cf04nar',
		path: '/images/melhores/melhor-fogao-4-bocas/consul-cf04nar-hero.webp',
		role: 'corpo-editorial',
		subject: 'Consul CF04NAR mesa inox (hero)',
		usedBy: ['/melhores/melhor-fogao-4-bocas/', '/blog/fogao-mesa-de-vidro-ou-inox/'],
		notes: 'Função no comparativo vidro/inox: contraste com tampo inox.',
	},
	{
		id: 'corpo-4b-cozinha-compacta',
		path: '/images/blog/fogao-4-bocas-ainda-vale-a-pena/corpo-fogao-4-bocas-cozinha-compacta-moderna.webp',
		role: 'corpo-editorial',
		subject: 'Fogão 4 bocas em cozinha compacta',
		usedBy: ['/blog/fogao-4-bocas-ainda-vale-a-pena/', '/comparativo-fogao-4-vs-5-bocas/'],
		notes: 'Função: leveza visual + planta compacta → favorece 4 bocas.',
	},
	{
		id: 'corpo-5b-corredor-estreito',
		path: '/images/blog/fogao-5-bocas-reduz-espaco-cozinha/corpo-cozinha-corredor-fogao-5-bocas-estreita.webp',
		role: 'corpo-editorial',
		subject: 'Fogão 5 bocas em cozinha corredor',
		usedBy: ['/blog/fogao-5-bocas-reduz-espaco-cozinha/', '/comparativo-fogao-4-vs-5-bocas/'],
		notes: 'Função: impacto de vão/circulação com 5 bocas.',
	},
	{
		id: 'corpo-comparativo-cooktop-piso',
		path: '/images/blog/fogao-5-bocas-reduz-espaco-cozinha/corpo-comparativo-cooktop-fogao-piso.webp',
		role: 'corpo-editorial',
		subject: 'Cooktop vs fogão de piso',
		usedBy: ['/blog/fogao-5-bocas-reduz-espaco-cozinha/'],
	},
	{
		id: 'corpo-comparativo-embutir-vs-piso',
		path: '/images/blog/guia-fogao-embutir-ou-de-piso/corpo-comparativo-embutir-vs-piso.webp',
		role: 'corpo-editorial',
		subject: 'Comparativo embutir × piso (mesmo ambiente)',
		usedBy: ['/blog/guia-fogao-embutir-ou-de-piso/'],
		notes: 'Tipo A Editorial (L01). Não confundir com cooktop×piso.',
		governance: {
			category: 'editorial',
			reusePotential: 'baixo',
			lifespan: 'media',
			usedBy: ['/blog/guia-fogao-embutir-ou-de-piso/'],
			plannedFor: [
				'/blog/fogao-5-bocas-reduz-espaco-cozinha/',
				'/comparativo-fogao-4-vs-5-bocas/',
			],
			approver: 'humano',
			status: 'incorporado',
		},
	},
	{
		id: 'tech-L06A-trempes',
		path: '/images/library/L06A.webp',
		role: 'tipologia-tecnica',
		subject: 'L06A ferro fundido × aramada esmaltada',
		usedBy: [
			'/fogao-5-bocas-custo-beneficio/',
			'/brastemp-bfs5ncr-vale-a-pena/',
			'/review-fogao-5-bocas-brastemp/',
			'/review-fogao-5-bocas-consul/',
			'/review-fogao-5-bocas-electrolux/',
			'/review-fogao-4-bocas-consul/',
			'/review-fogao-4-bocas-electrolux/',
			'/como-escolher-fogao-mesa-de-vidro/',
		],
		notes: 'Ver src/data/technicalLibrary.ts',
		governance: {
			category: 'tecnico',
			reusePotential: 'alto',
			lifespan: 'permanente',
			usedBy: [
				'/fogao-5-bocas-custo-beneficio/',
				'/brastemp-bfs5ncr-vale-a-pena/',
				'/review-fogao-5-bocas-brastemp/',
				'/review-fogao-5-bocas-consul/',
				'/review-fogao-5-bocas-electrolux/',
				'/review-fogao-4-bocas-consul/',
				'/review-fogao-4-bocas-electrolux/',
				'/como-escolher-fogao-mesa-de-vidro/',
			],
			plannedFor: ['/fogao-4-bocas-custo-beneficio/', '/'],
			approver: 'humano',
			status: 'incorporado',
		},
	},
	{
		id: 'tech-L09A-forno',
		path: '/images/library/L09A.webp',
		role: 'tipologia-tecnica',
		subject: 'L09A forno simples × forno duplo',
		usedBy: ['/blog/melhor-fogao-com-forno-duplo/'],
		notes: 'Texto na arte (desvio). Ver technicalLibrary.ts',
		governance: {
			category: 'tecnico',
			reusePotential: 'alto',
			lifespan: 'permanente',
			usedBy: ['/blog/melhor-fogao-com-forno-duplo/'],
			plannedFor: ['/como-escolher-fogao-5-bocas/'],
			approver: 'humano',
			status: 'incorporado',
		},
	},
	{
		id: 'corpo-forno-duplo-paralelos',
		path: '/images/blog/melhor-fogao-com-forno-duplo/corpo-fogao-forno-duplo-fornos-paralelos.png',
		role: 'corpo-editorial',
		subject: 'Forno duplo em uso paralelo',
		usedBy: ['/blog/melhor-fogao-com-forno-duplo/'],
	},
	{
		id: 'corpo-forno-duplo-cozinha-verde',
		path: '/images/blog/melhor-fogao-com-forno-duplo/corpo-fogao-forno-duplo-cozinha-verde.png',
		role: 'corpo-editorial',
		subject: 'Forno duplo em cozinha',
		usedBy: ['/blog/melhor-fogao-com-forno-duplo/'],
	},
	{
		id: 'corpo-forno-duplo-gabarito',
		path: '/images/blog/melhor-fogao-com-forno-duplo/corpo-fogao-forno-duplo-gabarito-medidas.webp',
		role: 'corpo-editorial',
		subject: 'Gabarito medidas forno duplo',
		usedBy: ['/blog/melhor-fogao-com-forno-duplo/'],
	},
	{
		id: 'corpo-5b-corredor',
		path: '/images/blog/fogao-5-bocas-reduz-espaco-cozinha/corpo-cozinha-corredor-fogao-5-bocas.webp',
		role: 'corpo-editorial',
		subject: 'Fogão 5 bocas em corredor (variante)',
		usedBy: [],
		notes: 'Canônico em disco; ainda sem wiring. Candidato a reuso no cluster espaço.',
	},
	{
		id: 'corpo-forno-duplo-editorial',
		path: '/images/blog/melhor-fogao-com-forno-duplo/corpo-fogao-forno-duplo-cozinha-editorial.webp',
		role: 'corpo-editorial',
		subject: 'Forno duplo lifestyle editorial',
		usedBy: [],
		notes: 'Canônico em disco; ainda sem wiring.',
	},
] as const;

/**
 * Gaps / backlog de ativos — espelho resumido de docs/BIBLIOTECA_VISUAL.md §4.
 * Produção de arquivo novo exige aprovação humana (DESIGN_SYSTEM §6).
 * Prioridade de fila: category === 'tecnico' antes de 'editorial'.
 */
export const VISUAL_GAPS: VisualGap[] = [
	{
		id: 'gap-asset-trempes',
		priority: 'ALTA',
		url: 'cluster-tecnico',
		need: 'Tipo B: tipologias de trempes — coberto por L06A (ferro fundido × aramada)',
		status: 'done',
		category: 'tecnico',
		reusePotential: 'alto',
		lacunaId: 'L06',
	},
	{
		id: 'gap-asset-queimadores',
		priority: 'ALTA',
		url: 'cluster-tecnico',
		need: 'Tipo B: tipologias de queimadores — L07A em staging (texto na arte)',
		status: 'in_progress',
		category: 'tecnico',
		reusePotential: 'alto',
		lacunaId: 'L07',
	},
	{
		id: 'gap-asset-closeup-tampo-vidro',
		priority: 'ALTA',
		url: '/blog/fogao-mesa-de-vidro-ou-inox/',
		need: 'Tipo B: close-up tampo vidro (material)',
		status: 'open',
		category: 'tecnico',
		reusePotential: 'alto',
		lacunaId: 'L03',
	},
	{
		id: 'gap-asset-closeup-tampo-inox',
		priority: 'ALTA',
		url: '/blog/fogao-mesa-de-vidro-ou-inox/',
		need: 'Tipo B: close-up tampo inox (material)',
		status: 'open',
		category: 'tecnico',
		reusePotential: 'alto',
		lacunaId: 'L04',
	},
	{
		id: 'gap-asset-topdown-4-vs-5',
		priority: 'ALTA',
		url: '/comparativo-fogao-4-vs-5-bocas/',
		need: 'Tipo B: vista superior mesa 4 bocas × 5 bocas (simultaneidade)',
		status: 'open',
		category: 'tecnico',
		reusePotential: 'medio',
		lacunaId: 'L02',
	},
	{
		id: 'gap-asset-forno-interior',
		priority: 'MEDIA',
		url: 'cluster-forno',
		need: 'Tipo B: interior de forno simples (1 cavidade)',
		status: 'open',
		category: 'tecnico',
		reusePotential: 'alto',
		lacunaId: 'L08',
	},
	{
		id: 'gap-asset-gabarito-4-5',
		priority: 'MEDIA',
		url: '/como-escolher-fogao-5-bocas/',
		need: 'Tipo B: gabaritos de medidas 4 bocas e 5 bocas',
		status: 'open',
		category: 'tecnico',
		reusePotential: 'medio',
		lacunaId: 'L10',
	},
	{
		id: 'gap-asset-embutir-vs-piso',
		priority: 'MEDIA',
		url: '/blog/guia-fogao-embutir-ou-de-piso/',
		need: 'Tipo A: comparativo embutir × piso (mesmo ambiente). cooktop≠embutir.',
		reuseCandidates: ['corpo-comparativo-embutir-vs-piso'],
		status: 'done',
		category: 'editorial',
		reusePotential: 'baixo',
		lacunaId: 'L01',
	},
	{
		id: 'gap-packshot-review-4b-vidro',
		priority: 'BAIXA',
		url: '/images/reviews/',
		need: 'Comercial: packshots review-premium 4 bocas / mesa de vidro sob demanda de URL review',
		status: 'open',
		category: 'comercial',
		reusePotential: 'baixo',
		lacunaId: 'L13',
	},
	{
		id: 'gap-comparativo-4-vs-5-corpo',
		priority: 'ALTA',
		url: '/comparativo-fogao-4-vs-5-bocas/',
		need: 'Corpo espaço/rotina 4 vs 5 (reuso)',
		reuseCandidates: ['corpo-4b-cozinha-compacta', 'corpo-5b-corredor-estreito'],
		status: 'done',
		category: 'editorial',
		reusePotential: 'medio',
	},
	{
		id: 'gap-blog-vidro-ou-inox-corpo',
		priority: 'ALTA',
		url: '/blog/fogao-mesa-de-vidro-ou-inox/',
		need: 'Corpo vidro vs inox via heroes de hub',
		status: 'done',
		category: 'editorial',
		reusePotential: 'medio',
	},
	{
		id: 'gap-blog-embutir-piso-corpo',
		priority: 'MEDIA',
		url: '/blog/guia-fogao-embutir-ou-de-piso/',
		need: 'Alias legado → gap-asset-embutir-vs-piso (Tipo A Incorporado)',
		status: 'done',
		category: 'editorial',
		reusePotential: 'baixo',
		lacunaId: 'L01',
	},
	{
		id: 'gap-blog-mesa-vidro-review-corpo',
		priority: 'MEDIA',
		url: '/blog/review-fogao-com-mesa-de-vidro/',
		need: 'Corpo editorial mesa de vidro',
		status: 'done',
		category: 'editorial',
		reusePotential: 'baixo',
	},
	{
		id: 'gap-blog-mesa-vidro-seguro-corpo',
		priority: 'MEDIA',
		url: '/blog/fogao-mesa-de-vidro-seguro/',
		need: 'Corpo editorial segurança vidro',
		status: 'done',
		category: 'editorial',
		reusePotential: 'baixo',
	},
	{
		id: 'gap-org-card-filenames-5b',
		priority: 'MEDIA',
		url: 'src/assets/images/cards/optimized/',
		need: 'Renomear cards home SKU correto',
		status: 'done',
		category: 'comercial',
		reusePotential: 'baixo',
	},
];

const CATEGORY_ORDER: readonly VisualCategory[] = ['tecnico', 'editorial', 'comercial'];

export function openGapsByPriority(priority: VisualPriority): VisualGap[] {
	return VISUAL_GAPS.filter((g) => g.status === 'open' && g.priority === priority);
}

/** Próximo gap: Tipo B (técnico) antes de editorial/comercial; dentro disso ALTA → MEDIA → BAIXA */
export function nextVisualGap(): VisualGap | undefined {
	const open = VISUAL_GAPS.filter((g) => g.status === 'open');
	const order: VisualPriority[] = ['ALTA', 'MEDIA', 'BAIXA'];
	for (const cat of CATEGORY_ORDER) {
		for (const p of order) {
			const hit = open.find((g) => g.category === cat && g.priority === p);
			if (hit) return hit;
		}
	}
	return undefined;
}
