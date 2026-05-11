/**
 * Camada editorial — "cérebro" da interlinkagem do site.
 *
 * Cada página/post é catalogada com:
 *  - kind: tipo editorial (Guia, Review, Comparativo, Análise, Blog)
 *  - flow: posição no funil editorial
 *      1 = Lifestyle (descoberta, decoração, cozinha moderna, organização)
 *      2 = Guia (educacional, critérios, manutenção)
 *      3 = Comparativo (decisão entre opções)
 *      4 = Review/Análise (escolha do produto)
 *  - topics: clusters semânticos (cozinha-moderna, decoracao, manutencao, etc.)
 *  - anchorText: rótulo natural para uso inline (sem cara de "afiliado")
 *
 * As funções abaixo entregam:
 *  - getRelated: itens relevantes por interseção de tópicos/kind (retro-compatível com RelatedArticles)
 *  - getByTopic / getByKind: filtros diretos
 *  - getEditorialFlow: respeita o fluxo lifestyle → guia → comparativo → review
 *  - pickEditorialPairings: pareamentos editoriais curados manualmente
 */

export type EditorialKind = 'Guia' | 'Review' | 'Comparativo' | 'Análise' | 'Blog';

export type EditorialTopic =
	| 'fogao-5-bocas'
	| 'fogao-4-bocas'
	| 'cozinha-moderna'
	| 'cozinha-pequena'
	| 'cozinha-planejada'
	| 'decoracao'
	| 'organizacao'
	| 'manutencao'
	| 'instalacao'
	| 'custo-beneficio'
	| 'mesa-vidro'
	| 'compra-segura'
	| 'forno-grande'
	| 'inox-premium'
	| 'familia-grande';

export interface EditorialEntry {
	href: string;
	title: string;
	description: string;
	kind: EditorialKind;
	topics: EditorialTopic[];
	flow: 1 | 2 | 3 | 4;
	/** Rótulo opcional curto (ex.: "Cozinha moderna") usado em chips editoriais. */
	editorialLabel?: string;
	/** Texto âncora natural — usado por EditorialLinks para parecer texto editorial. */
	anchorText: string;
	/** Pequena chamada (uma frase) usada em listas inline. */
	teaser?: string;
	weight?: number;
}

export function canonPath(path: string): string {
	let p = path.trim();
	if (!p.startsWith('/')) p = `/${p}`;
	if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
	return p || '/';
}

/**
 * Catálogo editorial. Ordem padrão = prioridade quando empata em similaridade.
 * Mantém acordo com o conteúdo real existente no site.
 */
export const EDITORIAL_POOL: EditorialEntry[] = [
	{
		href: '/melhor-fogao-5-bocas',
		title: 'Melhor fogão 5 bocas (guia mestre)',
		description: 'Critérios de compra, perfis e leitura longa para fechar decisão com segurança.',
		kind: 'Guia',
		flow: 2,
		editorialLabel: 'Guia mestre',
		topics: ['fogao-5-bocas', 'compra-segura', 'custo-beneficio'],
		anchorText: 'guia mestre de fogão 5 bocas',
		teaser: 'critérios e perfis para fechar decisão com calma',
		weight: 9,
	},
	{
		href: '/como-escolher-fogao-5-bocas',
		title: 'Como escolher fogão 5 bocas',
		description: 'Medidas, gás, forno e ventilação — checklist prático antes de pagar.',
		kind: 'Guia',
		flow: 2,
		editorialLabel: 'Guia prático',
		topics: ['fogao-5-bocas', 'instalacao', 'compra-segura', 'manutencao'],
		anchorText: 'guia de como escolher fogão 5 bocas',
		teaser: 'checklist de medidas, gás, forno e ventilação',
		weight: 7,
	},
	{
		href: '/fogao-5-bocas-custo-beneficio',
		title: 'Fogão 5 bocas custo-benefício',
		description: 'Onde vale economizar e onde não vale na mesma categoria.',
		kind: 'Guia',
		flow: 2,
		editorialLabel: 'Compra inteligente',
		topics: ['fogao-5-bocas', 'custo-beneficio', 'compra-segura'],
		anchorText: 'guia de fogão 5 bocas custo-benefício',
		teaser: 'onde economizar (e onde não vale) na mesma categoria',
		weight: 7,
	},
	{
		href: '/comparativo-fogao-4-vs-5-bocas',
		title: 'Fogão 4 vs 5 bocas',
		description: 'Regra simples para decidir pelo tamanho certo da cozinha e da rotina.',
		kind: 'Comparativo',
		flow: 3,
		editorialLabel: 'Comparativo',
		topics: ['fogao-5-bocas', 'fogao-4-bocas', 'cozinha-pequena', 'compra-segura'],
		anchorText: 'comparativo entre fogões 4 e 5 bocas',
		teaser: 'tamanho certo de fogão para sua cozinha e rotina',
		weight: 8,
	},
	{
		href: '/brastemp-bfs5ncr-vale-a-pena',
		title: 'Brastemp BFS5NCR vale a pena? Análise completa',
		description: 'Análise longa com FAQ, ficha técnica e comparativo de uso real.',
		kind: 'Análise',
		flow: 4,
		editorialLabel: 'Análise completa',
		topics: [
			'fogao-5-bocas',
			'cozinha-moderna',
			'cozinha-planejada',
			'forno-grande',
			'inox-premium',
			'mesa-vidro',
			'familia-grande',
		],
		anchorText: 'análise completa do Brastemp BFS5NCR',
		teaser: 'forno generoso, acabamento premium e cara de cozinha planejada',
		weight: 9,
	},
	{
		href: '/review-fogao-5-bocas-brastemp',
		title: 'Review rápida: Brastemp BFS5NCR',
		description: 'Resumo direto + link para conferir preço na loja parceira.',
		kind: 'Review',
		flow: 4,
		editorialLabel: 'Review',
		topics: ['fogao-5-bocas', 'custo-beneficio', 'mesa-vidro', 'cozinha-moderna'],
		anchorText: 'review rápida do Brastemp BFS5NCR',
		teaser: 'leitura curta com pontos fortes e armadilhas comuns',
		weight: 6,
	},
	{
		href: '/review-fogao-5-bocas-consul',
		title: 'Review rápida: Consul CFS5NAB',
		description: 'Entrada sólida: para quem é e quando vale subir de linha.',
		kind: 'Review',
		flow: 4,
		editorialLabel: 'Review',
		topics: ['fogao-5-bocas', 'custo-beneficio', 'cozinha-pequena'],
		anchorText: 'review rápida do Consul CFS5NAB',
		teaser: 'entrada sólida quando o orçamento aperta',
		weight: 6,
	},
	{
		href: '/review-fogao-5-bocas-electrolux',
		title: 'Review rápida: Electrolux FE5IG',
		description: 'Acabamento e forno — recursos que costumam importar no dia a dia.',
		kind: 'Review',
		flow: 4,
		editorialLabel: 'Review',
		topics: ['fogao-5-bocas', 'cozinha-moderna', 'inox-premium', 'forno-grande'],
		anchorText: 'review rápida do Electrolux FE5IG',
		teaser: 'acabamento premium e forno bem dimensionado',
		weight: 6,
	},
	{
		href: '/blog/melhor-fogao-5-bocas/',
		title: 'Blog: melhor fogão 5 bocas',
		description: 'Versão em texto corrido com ângulos extras e leitura complementar.',
		kind: 'Blog',
		flow: 2,
		editorialLabel: 'Editorial',
		topics: ['fogao-5-bocas', 'compra-segura', 'custo-beneficio'],
		anchorText: 'leitura editorial sobre o melhor fogão 5 bocas',
		teaser: 'ângulos extras e linguagem corrida para leitura calma',
		weight: 5,
	},
	{
		href: '/blog/comparativo-fogao-4-bocas-2026/',
		title: 'Blog: melhores fogões 4 bocas em 2026',
		description: 'Se a cozinha apertar, compare o ecossistema 4 bocas com calma.',
		kind: 'Blog',
		flow: 3,
		editorialLabel: 'Comparativo editorial',
		topics: ['fogao-4-bocas', 'cozinha-pequena', 'custo-beneficio'],
		anchorText: 'comparativo editorial de fogões 4 bocas em 2026',
		teaser: 'três modelos para cozinhas mais compactas',
		weight: 6,
	},
	{
		href: '/blog/guia-fogao-embutir-ou-de-piso/',
		title: 'Embutir ou de piso: decisão de layout',
		description: 'Decisão de instalação e ambiente antes de travar marca/modelo.',
		kind: 'Blog',
		flow: 1,
		editorialLabel: 'Lifestyle · Decoração',
		topics: [
			'decoracao',
			'cozinha-planejada',
			'cozinha-moderna',
			'instalacao',
			'organizacao',
		],
		anchorText: 'decisão entre fogão de embutir ou de piso',
		teaser: 'embutido valoriza o visual; piso simplifica a troca',
		weight: 6,
	},
	{
		href: '/blog/review-fogao-com-mesa-de-vidro/',
		title: 'Fogão com mesa de vidro: vale a pena?',
		description: 'Limpeza, risco de impacto e quando o vidro compensa no visual.',
		kind: 'Blog',
		flow: 1,
		editorialLabel: 'Lifestyle · Cozinha moderna',
		topics: ['cozinha-moderna', 'decoracao', 'manutencao', 'mesa-vidro'],
		anchorText: 'leitura editorial sobre fogão com mesa de vidro',
		teaser: 'visual clean, com cuidados de manutenção que importam',
		weight: 6,
	},
];

/** Mapa rápido por path canônico. */
const ENTRY_BY_PATH = new Map<string, EditorialEntry>(EDITORIAL_POOL.map((e) => [canonPath(e.href), e]));

export function getEditorialEntry(path: string): EditorialEntry | undefined {
	return ENTRY_BY_PATH.get(canonPath(path));
}

interface RelatedOpts {
	limit?: number;
	excludePaths?: string[];
	/** Restringe aos kinds informados. */
	kinds?: EditorialKind[];
	/** Pondera tópicos preferidos (se omisso, usa os tópicos da entry atual). */
	preferTopics?: EditorialTopic[];
	/** Inclui também itens fora da entry atual com ao menos 1 tópico em comum. */
	requireTopicMatch?: boolean;
}

/**
 * Heurística de similaridade simples:
 *  - +3 por tópico em comum com a página atual / preferTopics
 *  - +1 se kind diferente da atual (estimula diversificação editorial)
 *  - +weight do item
 *  - se requireTopicMatch=true, descarta itens sem interseção
 */
export function getRelated(currentPath: string, opts: RelatedOpts = {}): EditorialEntry[] {
	const { limit = 4, excludePaths = [], kinds, preferTopics, requireTopicMatch = false } = opts;
	const exclude = new Set([canonPath(currentPath), ...excludePaths.map(canonPath)]);
	const current = getEditorialEntry(currentPath);
	const wantedTopics = new Set<EditorialTopic>(preferTopics ?? current?.topics ?? []);

	const scored = EDITORIAL_POOL.filter((item) => !exclude.has(canonPath(item.href)))
		.filter((item) => (kinds ? kinds.includes(item.kind) : true))
		.map((item) => {
			const overlap = item.topics.reduce((acc, t) => acc + (wantedTopics.has(t) ? 1 : 0), 0);
			const kindBoost = current && current.kind !== item.kind ? 1 : 0;
			return { item, score: overlap * 3 + kindBoost + (item.weight ?? 0) / 10, overlap };
		})
		.filter(({ overlap }) => (requireTopicMatch ? overlap > 0 : true))
		.sort((a, b) => b.score - a.score)
		.map(({ item }) => item);

	return scored.slice(0, limit);
}

export function getByTopic(topic: EditorialTopic, limit = 4, excludePaths: string[] = []): EditorialEntry[] {
	const exclude = new Set(excludePaths.map(canonPath));
	return EDITORIAL_POOL.filter((item) => item.topics.includes(topic) && !exclude.has(canonPath(item.href)))
		.sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))
		.slice(0, limit);
}

export function getByKind(kind: EditorialKind, limit = 4, excludePaths: string[] = []): EditorialEntry[] {
	const exclude = new Set(excludePaths.map(canonPath));
	return EDITORIAL_POOL.filter((item) => item.kind === kind && !exclude.has(canonPath(item.href)))
		.sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))
		.slice(0, limit);
}

/**
 * Fluxo editorial: lifestyle → guia → comparativo → review.
 * Dado o path atual, devolve até `limit` itens completando o funil
 * (priorizando os "próximos passos" da jornada do leitor).
 *
 * Estratégia:
 *  - Se a página é Lifestyle (flow 1) → entrega Guia → Comparativo → Review
 *  - Se é Guia (flow 2) → Comparativo + Review (+ um Lifestyle como gancho)
 *  - Se é Comparativo (flow 3) → Reviews individuais (+ guia mestre)
 *  - Se é Review (flow 4) → outras Reviews + Comparativo + Lifestyle (volta no funil)
 */
export function getEditorialFlow(currentPath: string, limit = 3, excludePaths: string[] = []): EditorialEntry[] {
	const current = getEditorialEntry(currentPath);
	const flow = current?.flow ?? 1;
	const exclude = new Set([canonPath(currentPath), ...excludePaths.map(canonPath)]);
	const topics = current?.topics ?? [];

	const pickFromFlow = (target: 1 | 2 | 3 | 4, take: number, kindFilter?: EditorialKind[]): EditorialEntry[] => {
		const subset = EDITORIAL_POOL.filter((it) => it.flow === target)
			.filter((it) => (kindFilter ? kindFilter.includes(it.kind) : true))
			.filter((it) => !exclude.has(canonPath(it.href)));
		const scored = subset
			.map((it) => ({
				it,
				score: it.topics.filter((t) => topics.includes(t)).length * 3 + (it.weight ?? 0) / 10,
			}))
			.sort((a, b) => b.score - a.score)
			.map(({ it }) => it);
		const out: EditorialEntry[] = [];
		for (const item of scored) {
			if (out.length >= take) break;
			if (!exclude.has(canonPath(item.href))) {
				out.push(item);
				exclude.add(canonPath(item.href));
			}
		}
		return out;
	};

	let plan: EditorialEntry[] = [];
	switch (flow) {
		case 1:
			plan = [
				...pickFromFlow(2, 1),
				...pickFromFlow(3, 1),
				...pickFromFlow(4, 1, ['Review', 'Análise']),
			];
			break;
		case 2:
			plan = [
				...pickFromFlow(3, 1),
				...pickFromFlow(4, 1, ['Análise']),
				...pickFromFlow(1, 1),
			];
			break;
		case 3:
			plan = [
				...pickFromFlow(4, 2, ['Review', 'Análise']),
				...pickFromFlow(2, 1),
			];
			break;
		case 4:
			plan = [
				...pickFromFlow(4, 1, ['Review', 'Análise']),
				...pickFromFlow(3, 1),
				...pickFromFlow(1, 1),
			];
			break;
	}

	if (plan.length < limit) {
		const fallback = getRelated(currentPath, { limit: limit - plan.length, excludePaths: Array.from(exclude) });
		plan = [...plan, ...fallback];
	}

	return plan.slice(0, limit);
}

/** Busca uma entry por anchorText/title aproximado — usado por inline curado. */
export function findEntry(predicate: (e: EditorialEntry) => boolean): EditorialEntry | undefined {
	return EDITORIAL_POOL.find(predicate);
}
