/**
 * Classificação estrita de links afiliados do Mercado Livre.
 *
 * Critérios confirmados (qualquer um basta):
 * 1. Metadado explícito de geração pelo painel oficial (`generatedByPanel`)
 * 2. Caminho `/social/` na URL (vitrine/página social oficial do afiliado)
 *
 * Parâmetros de tracking (matt_*, utm_*, caminho /sec/, etc.) NÃO comprovam comissão
 * e nunca classificam o link como afiliado.
 */

export type MercadoLivreAffiliateConfidence = 'high' | 'none';

export type MercadoLivreAffiliateClassification = {
	isAffiliate: boolean;
	confidence: MercadoLivreAffiliateConfidence;
};

export type ClassifyMercadoLivreAffiliateOptions = {
	/** Indicador persistido: link gerado pelo painel oficial de afiliados. */
	generatedByPanel?: boolean;
};

const ML_HOST_SUFFIXES = ['mercadolivre.com.br', 'mercadolivre.com', 'meli.la'] as const;

function isMercadoLivreHost(hostname: string): boolean {
	const host = hostname.toLowerCase();
	return ML_HOST_SUFFIXES.some((suffix) => host === suffix || host.endsWith(`.${suffix}`));
}

function parseUrl(raw: string): URL | null {
	try {
		return new URL(raw);
	} catch {
		return null;
	}
}

/** True quando o pathname contém o segmento oficial `/social/`. */
export function hasMercadoLivreSocialPath(url: string): boolean {
	const parsed = parseUrl(url);
	if (!parsed || !isMercadoLivreHost(parsed.hostname)) return false;
	return parsed.pathname.toLowerCase().includes('/social/');
}

/**
 * Classifica um link do Mercado Livre como afiliado confirmado ou não.
 * Prefere falso negativo a falso positivo.
 */
export function classifyMercadoLivreAffiliate(
	url: string,
	options: ClassifyMercadoLivreAffiliateOptions = {},
): MercadoLivreAffiliateClassification {
	const confirmedByPanel = options.generatedByPanel === true;
	const confirmedBySocialPath = hasMercadoLivreSocialPath(url);

	if (confirmedByPanel || confirmedBySocialPath) {
		return { isAffiliate: true, confidence: 'high' };
	}

	return { isAffiliate: false, confidence: 'none' };
}

/** Atalho a partir do registro em `products.ts` (`ml` + `mlGeneratedByPanel`). */
export function classifyProdutoMercadoLivre(produto: {
	ml: string;
	mlGeneratedByPanel?: boolean;
}): MercadoLivreAffiliateClassification {
	return classifyMercadoLivreAffiliate(produto.ml, {
		generatedByPanel: produto.mlGeneratedByPanel,
	});
}
