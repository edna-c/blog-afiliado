/**
 * Links de oferta por loja — única fonte para cards da home,
 * tabela comparativa e CTAs das reviews (ML como loja principal).
 *
 * Status de afiliado ML: usar `classifyMercadoLivreAffiliate` em
 * `src/utils/mercadoLivreAffiliate.ts`. Só confirme comissão com
 * `mlGeneratedByPanel` ou URL `/social/` — nunca via params matt_ ou utm_.
 *
 * Status de afiliado Shopee: `shopeeGeneratedByPanel` quando o link
 * foi gerado/confirmado no programa de afiliados Shopee.
 */
export type ProdutoAfiliado = {
	ml: string;
	/**
	 * Link ML gerado pelo painel oficial de afiliados.
	 * Sem este flag (e sem `/social/` na URL), a classificação
	 * estrita trata o link como não confirmado.
	 */
	mlGeneratedByPanel?: boolean;
	/** Link Shopee; omitir até haver oferta para o modelo. */
	shopee?: string;
	/** Link Shopee gerado/confirmado no painel de afiliados. */
	shopeeGeneratedByPanel?: boolean;
};

export const produtos = {
	brastempBFS5NCR: {
		ml: 'https://meli.la/31TdeBV',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/2qQVdcWHwK',
		shopeeGeneratedByPanel: true,
	},
	consulCFS5NAB: {
		ml: 'https://meli.la/1TeBv2U',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/1gExh55W8A?lp=aff',
		shopeeGeneratedByPanel: true,
	},
	electroluxFE5IG: {
		ml: 'https://meli.la/1BfryZq',
		mlGeneratedByPanel: true,
		/**
		 * Shopee omitido de propósito: o short link antigo (`4AyaNdARrV`)
		 * redirecionava para busca genérica (`/search?keyword=electrolux+fe5ig`),
		 * não para o SKU — cliques sem conversão e perda de confiança.
		 * Reativar só com short link novo gerado no painel, apontando ao produto.
		 */
	},
	consulCF04NAR: {
		ml: 'https://meli.la/1mrHBpJ',
		mlGeneratedByPanel: true,
		shopee: 'https://shopee.com.br/Fog%C3%A3o-de-Piso-4-Bocas-Consul-CFO4NAR-com-Acendimento-Autom%C3%A1tico-BIV-i.443109642.22897480606',
		shopeeGeneratedByPanel: true,
	},
	electroluxFE4IW: {
		ml: 'https://meli.la/2SNgQnU',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/5VThxEhHjk',
		shopeeGeneratedByPanel: true,
	},
	atlasMonacoPlus: {
		ml: 'https://meli.la/2x9CLkK',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/1VxZCI4Dcy',
		shopeeGeneratedByPanel: true,
	},
	/** Mesa de vidro — Money Page /melhores/melhor-fogao-mesa-de-vidro */
	consulCFO4VAR: {
		ml: 'https://meli.la/1w6gKzF',
		mlGeneratedByPanel: true,
		shopee: 'https://shopee.com.br/product/1541325700/22294431199',
		shopeeGeneratedByPanel: true,
	},
	brastempBFO4VAE: {
		ml: 'https://meli.la/2oF53cc',
		mlGeneratedByPanel: true,
		shopee: 'https://shopee.com.br/Fog%C3%A3o-4-Bocas-Brastemp-BFO4VAE-Autom%C3%A1tico-i.1329429906.22597762187',
		shopeeGeneratedByPanel: true,
	},
	/** Mesa de vidro — Atlas Atenas Glass / Top Glass (mesma linha; Top Glass é a nomenclatura comercial frequente) */
	atlasAtenasGlass: {
		ml: 'https://meli.la/1LpAT6R',
		mlGeneratedByPanel: true,
		shopee: 'https://shopee.com.br/Fog%C3%A3o-4-Bocas-Preto-com-Mesa-de-Vidro-Atlas-M%C3%B4naco-Top-Glass-Acendimento-Autom%C3%A1tico-Bivolt-i.1334945356.50162071184',
		shopeeGeneratedByPanel: true,
	},
	/** Cooktop 5 bocas — ranking /melhores/melhor-cooktop-5-bocas */
	electroluxKE5GR: {
		ml: 'https://meli.la/2LCaLFw',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/5VVRFPiYzn',
		shopeeGeneratedByPanel: true,
	},
	brastempBDS75AE: {
		ml: 'https://meli.la/1s4vxJ8',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/AUu7CzBQzS',
		shopeeGeneratedByPanel: true,
	},
	/** Itatiaia Essencial 5 bocas — código de fábrica 3700000193 */
	itatiaiaEssencial5Bocas: {
		ml: 'https://meli.la/1UsmgiR',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/2BEzKXFFmt',
		shopeeGeneratedByPanel: true,
	},
	/** Cooktop 4 bocas — ranking /melhores/melhor-cooktop-4-bocas */
	electroluxKE4GR: {
		ml: 'https://meli.la/1XaSZcB',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/5LC13l6dbK',
		shopeeGeneratedByPanel: true,
	},
	fischerFitLine4Bocas: {
		ml: 'https://meli.la/31Tttd7',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/5q8HhAuqmE',
		shopeeGeneratedByPanel: true,
	},
	muellerMCG4BK: {
		ml: 'https://meli.la/1pyXcPQ',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/3LQwicU1hf',
		shopeeGeneratedByPanel: true,
	},
	/** Fogão 4 bocas de embutir — núcleo comercial (Brastemp / Electrolux / Dako) */
	brastempBYO4EBR: {
		ml: 'https://meli.la/1iaWxzZ',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/3B7eSXUvrf',
		shopeeGeneratedByPanel: true,
	},
	electroluxFE4BB: {
		ml: 'https://meli.la/2JJhEbq',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/8KpkcLL7Qr',
		shopeeGeneratedByPanel: true,
	},
	/** Dako Supreme embutir 4 bocas mesa de vidro (EAN 7897180510176) — não confundir com Supreme de piso */
	dakoSupremeEmbutir4Bocas: {
		ml: 'https://meli.la/2Rqts2M',
		mlGeneratedByPanel: true,
		shopee: 'https://s.shopee.com.br/6q0wpnzAwQ',
		shopeeGeneratedByPanel: true,
	},
} as const satisfies Record<string, ProdutoAfiliado>;

/** Chave estável do inventário — usar como `product_id` no tracking comercial. */
export type ProductId = keyof typeof produtos;
