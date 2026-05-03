/**
 * Links de afiliado por loja — única fonte para cards da home,
 * tabela comparativa e CTAs das reviews (ML como loja principal).
 */
export type ProdutoAfiliado = {
	ml: string;
	/** Omitir ou deixar vazio até haver link de afiliado Shopee para o modelo. */
	shopee?: string;
};

export const produtos = {
	brastempBFS5NCR: {
		ml: 'https://www.mercadolivre.com.br/fogao-5-bocas-brastemp-bfs5ncr/up/MLBU1757362978?matt_tool=38524122',
		shopee: 'https://s.shopee.com.br/2qQVdcWHwK',
	},
	consulCFS5NAB: {
		ml: 'https://www.mercadolivre.com.br/fogo-de-piso-5-bocas-consul-cfs5nar-acendimento-automatico-cor-inox/p/MLB15295566?matt_tool=38524122',
		shopee: 'https://s.shopee.com.br/1gExh55W8A?lp=aff',
	},
	electrolux76exv: {
		ml: 'https://meli.la/1yy3jCm',
	},
} as const satisfies Record<string, ProdutoAfiliado>;
