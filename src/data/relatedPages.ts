/**
 * Cluster semântico fogão 5 bocas — usado por RelatedArticles para
 * topical authority, crawl depth e páginas por sessão.
 */
export type RelatedPageKind = 'Guia' | 'Review' | 'Comparativo' | 'Análise' | 'Blog';

export interface RelatedPageLink {
	href: string;
	title: string;
	description: string;
	kind: RelatedPageKind;
}

export function canonPath(path: string): string {
	let p = path.trim();
	if (!p.startsWith('/')) p = `/${p}`;
	if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
	return p || '/';
}

/** Ordem = prioridade quando a página atual é filtrada. */
const POOL: RelatedPageLink[] = [
	{
		href: '/melhor-fogao-5-bocas',
		title: 'Melhor fogão 5 bocas (guia mestre)',
		description: 'Critérios de compra, perfis e leitura longa para fechar decisão com segurança.',
		kind: 'Guia',
	},
	{
		href: '/como-escolher-fogao-5-bocas',
		title: 'Como escolher fogão 5 bocas',
		description: 'Medidas, gás, forno e ventilação — checklist prático antes de pagar.',
		kind: 'Guia',
	},
	{
		href: '/fogao-5-bocas-custo-beneficio',
		title: 'Fogão 5 bocas custo-benefício',
		description: 'Onde vale economizar e onde não vale na mesma categoria.',
		kind: 'Guia',
	},
	{
		href: '/comparativo-fogao-4-vs-5-bocas',
		title: 'Fogão 4 vs 5 bocas',
		description: 'Regra simples para decidir pelo tamanho certo da cozinha e da rotina.',
		kind: 'Comparativo',
	},
	{
		href: '/brastemp-bfs5ncr-vale-a-pena',
		title: 'Brastemp BFS5NCR vale a pena?',
		description: 'Review longa com FAQ, ficha técnica e comparativo de uso real.',
		kind: 'Análise',
	},
	{
		href: '/review-fogao-5-bocas-brastemp',
		title: 'Review rápida: Brastemp BFS5NCR',
		description: 'Resumo direto + link para conferir preço na loja parceira.',
		kind: 'Review',
	},
	{
		href: '/review-fogao-5-bocas-consul',
		title: 'Review rápida: Consul CFS5NAB',
		description: 'Entrada sólida: para quem é e quando vale subir de linha.',
		kind: 'Review',
	},
	{
		href: '/review-fogao-5-bocas-electrolux',
		title: 'Review rápida: Electrolux FE5IG',
		description: 'Acabamento e forno — recursos que costumam importar no dia a dia.',
		kind: 'Review',
	},
	{
		href: '/blog/melhor-fogao-5-bocas/',
		title: 'Blog: melhor fogão 5 bocas',
		description: 'Versão em texto corrido com ângulos extras e leitura complementar.',
		kind: 'Blog',
	},
	{
		href: '/blog/comparativo-fogao-4-bocas-2026/',
		title: 'Blog: melhores fogões 4 bocas em 2026',
		description: 'Se a cozinha apertar, compare o ecossistema 4 bocas com calma.',
		kind: 'Blog',
	},
	{
		href: '/blog/review-fogao-com-mesa-de-vidro/',
		title: 'Blog: fogão com mesa de vidro',
		description: 'Limpeza, risco de impacto e quando o vidro compensa no visual.',
		kind: 'Blog',
	},
	{
		href: '/blog/guia-fogao-embutir-ou-de-piso/',
		title: 'Blog: embutir ou de piso',
		description: 'Decisão de layout e instalação antes de travar em marca ou modelo.',
		kind: 'Blog',
	},
];

export function getRelatedPages(currentPath: string, limit = 4, extraExclude: string[] = []): RelatedPageLink[] {
	const exclude = new Set([canonPath(currentPath), ...extraExclude.map(canonPath)]);
	return POOL.filter((item) => !exclude.has(canonPath(item.href))).slice(0, limit);
}
