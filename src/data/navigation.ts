export type PrimaryNavItem = {
	href: string;
	label: string;
	ariaLabel: string;
	activePrefixes?: string[];
	/** Paths sob o prefixo ativo que NÃO devem marcar este item (ex.: ranking Melhores ≠ Guia). */
	excludeActivePrefixes?: string[];
};

/** Menu principal — fonte única para Header e referência editorial. */
export const primaryNav: PrimaryNavItem[] = [
	{ href: '/', label: 'Início', ariaLabel: 'Página inicial Casa Prática Eletro' },
	{
		href: '/melhores/',
		label: 'Guias de Compra',
		ariaLabel: 'Guias de Compra — rankings, comparativos e reviews de eletrodomésticos',
		activePrefixes: ['/melhores'],
		excludeActivePrefixes: ['/melhores/melhor-fogao-5-bocas'],
	},
	{ href: '/blog/', label: 'Blog', ariaLabel: 'Blog — conteúdo informativo sobre eletrodomésticos' },
	{ href: '/sobre/', label: 'Sobre', ariaLabel: 'Sobre o Casa Prática Eletro' },
	{ href: '/contato/', label: 'Contato', ariaLabel: 'Página de contato' },
];
