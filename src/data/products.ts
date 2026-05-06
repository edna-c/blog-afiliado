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
	electroluxFE5IG: {
		ml: 'https://www.mercadolivre.com.br/fogo-5-bocas-electrolux-cinza-mesa-inox-perfectcook-fe5ig/p/MLB58200579?pdp_filters=item_id%3AMLB4510248811&matt_event_ts=1778028554553&matt_d2id=f3daa5c6-aabd-43a1-9dec-ee1d4967e855&matt_tracing_id=49d6633b-aa48-4908-96f2-9aada3f8c220',
	},
} as const satisfies Record<string, ProdutoAfiliado>;
