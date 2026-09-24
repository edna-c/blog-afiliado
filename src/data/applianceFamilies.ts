/**
 * Famílias de eletrodomésticos da Home.
 *
 * Só entra família que já tem página publicada. Cada `href` precisa ser uma URL real do site.
 * Não criar caminho de categoria que ainda não existe.
 *
 * Para abrir uma família nova (forno, micro-ondas, geladeira, lavadora):
 * 1. Publicar o guia ou a página de decisão.
 * 2. Acrescentar um item neste array, com links apenas para essas URLs.
 * A Home passa a mostrar a família sem rota nova de categoria.
 */
export type ApplianceFamilyLink = {
	label: string;
	href: string;
};

export type ApplianceFamily = {
	id: string;
	name: string;
	description: string;
	links: ApplianceFamilyLink[];
};

export const applianceFamilies: ApplianceFamily[] = [
	{
		id: 'fogoes',
		name: 'Fogões',
		description: 'Guias para comparar diferentes tipos e modelos de fogão antes de escolher.',
		links: [
			{ label: 'Melhor fogão 5 bocas', href: '/melhores/melhor-fogao-5-bocas/' },
			{ label: 'Melhor fogão 4 bocas', href: '/melhores/melhor-fogao-4-bocas/' },
			{ label: 'Melhor fogão mesa de vidro', href: '/melhores/melhor-fogao-mesa-de-vidro/' },
		],
	},
	{
		id: 'cooktops',
		name: 'Cooktops',
		description: 'Compare opções de 4 e 5 bocas e veja o que considerar antes de escolher.',
		links: [
			{ label: 'Melhor cooktop 4 bocas', href: '/melhores/melhor-cooktop-4-bocas/' },
			{ label: 'Melhor cooktop 5 bocas', href: '/melhores/melhor-cooktop-5-bocas/' },
		],
	},
];
