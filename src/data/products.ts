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
		ml: 'https://meli.la/2BvbH5s',
		shopee: 'https://s.shopee.com.br/2qQVdcWHwK',
	},
	consulCFS5NAB: {
		ml: 'https://www.mercadolivre.com.br/fogo-de-piso-5-bocas-consul-cfs5nar-acendimento-automatico-cor-inox/p/MLB15295566?matt_tool=38524122',
		shopee: 'https://s.shopee.com.br/1gExh55W8A?lp=aff',
	},
	electroluxFE5IG: {
		ml: 'https://www.mercadolivre.com.br/fogo-5-bocas-electrolux-cinza-mesa-inox-perfectcook-fe5ig/p/MLB58200579?pdp_filters=item_id%3AMLB4510248811&matt_event_ts=1778028554553&matt_d2id=f3daa5c6-aabd-43a1-9dec-ee1d4967e855&matt_tracing_id=49d6633b-aa48-4908-96f2-9aada3f8c220',
	},
	/** Placeholders temporários — substituir pelos links definitivos de afiliado. */
	consulCF04NAR: {
		ml: 'https://www.mercadolivre.com.br/fogo-consul-cf04nar-4-bocas-acendimento-aut-inox/p/MLB6331388?pdp_filters=item_id%3AMLB2048022316&matt_tool=38524122',
		shopee: 'https://s.shopee.com.br/8pk9rbQxV1',
	},
	electroluxFE4IW: {
		ml: 'https://www.mercadolivre.com.br/fogo-4-bocas-electrolux-efficient-branco-mesa-inox-perfectcook-e-vaporbake-fe4iw-bivolt/p/MLB58911417?pdp_filters=item_id%3AMLB6545490148&matt_tool=38524122',
		shopee: 'https://s.shopee.com.br/5VThxEhHjk',
	},
	atlasMonacoPlus: {
		ml: 'https://www.mercadolivre.com.br/fogao-monaco-plus-4-bocas-mesa-de-inox-forno-48-litros-atlas/up/MLBU3862344155?pdp_filters=item_id%3AMLB6526475006&matt_tool=38524122',
		shopee: 'https://s.shopee.com.br/1VxZCI4Dcy',
	},
	/** Mesa de vidro — Money Page /melhores/melhor-fogao-mesa-de-vidro */
	consulCFO4VAR: {
		ml: 'https://produto.mercadolivre.com.br/MLB-1543127903-fogo-consul-4-bocas-cor-inox-com-mesa-de-vidro-cfo4var-_JM?matt_tool=38524122',
		shopee: 'https://shopee.com.br/product/1541325700/22294431199',
	},
	brastempBFO4VAE: {
		ml: 'https://www.mercadolivre.com.br/fogo-4-bocas-vidro-grade-dupla-bfo4vae-preto-brastemp/p/MLB19159839?matt_tool=38524122',
		shopee: 'https://shopee.com.br/product/1388709282/20098076533',
	},
	atlasAtenasGlass: {
		ml: 'https://produto.mercadolivre.com.br/MLB-1923847287-fogo-atlas-4-bocas-preto-atenas-glass-bivolt-_JM?matt_tool=38524122',
		shopee: 'https://shopee.com.br/product/864722805/20899889849',
	},
} as const satisfies Record<string, ProdutoAfiliado>;
