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
} as const satisfies Record<string, ProdutoAfiliado>;
