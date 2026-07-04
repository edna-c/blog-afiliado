export type PrimaryNavItem = {
	href: string;
	label: string;
	ariaLabel: string;
	activePrefixes?: string[];
};

/** Menu principal — fonte única para Header e referência editorial. */
export const primaryNav: PrimaryNavItem[] = [
	{ href: '/', label: 'Início', ariaLabel: 'Página inicial Casa Prática Eletro' },
	{ href: '/blog', label: 'Blog', ariaLabel: 'Blog — conteúdo informativo sobre eletrodomésticos' },
	{ href: '/sobre', label: 'Sobre', ariaLabel: 'Sobre o Casa Prática Eletro' },
	{ href: '/contato', label: 'Contato', ariaLabel: 'Página de contato' },
];
