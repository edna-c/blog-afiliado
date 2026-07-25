import type { MarketplaceCollector } from '../collectors/types.ts';
import type { CollectedPage } from '../types/index.ts';
import { fetchPage } from '../utils/fetch-page.ts';
import { buildSignals, EMPTY_SIGNALS } from '../utils/page-signals.ts';
import { extractPageTitle } from '../utils/title.ts';
import { hostMatches, parseHttpUrl } from '../utils/url.ts';

const HOST_SUFFIXES = ['mercadolivre.com.br', 'mercadolivre.com', 'meli.la'] as const;

const REMOVED_HINTS = [
	'publicação pausada',
	'publicacion pausada',
	'esse produto não está disponível',
	'este producto no está disponible',
	'não encontramos a página',
	'no encontramos la página',
	'página não encontrada',
	'anúncio não encontrado',
	'o produto não existe',
	'produto indisponível nesta região',
	'la publicación no está activa',
	'publicação finalizada',
] as const;

const OUT_OF_STOCK_HINTS = [
	'produto esgotado',
	'esgotado no momento',
	'sem estoque',
	'sin stock',
	'agotado',
	'no hay stock',
	'estoque esgotado',
	'temporarily out of stock',
] as const;

/** Hints fortes de PDP — evita OK só com HTTP 200. */
const PRODUCT_HINTS = [
	'itemprop="price"',
	'ui-pdp-price',
	'ui-pdp-title',
	'"@type":"Product"',
	'mlb-',
] as const;

function looksLikeProductUrl(url: string): boolean {
	return (
		/\/p\/MLB/i.test(url) ||
		/MLB-?\d+/i.test(url) ||
		/\/up\//i.test(url) ||
		/\/social\//i.test(url) ||
		/\/wide\//i.test(url)
	);
}

function looksLikeIntermediateUrl(url: string): boolean {
	const lower = url.toLowerCase();
	return (
		lower.includes('/gz/login') ||
		lower.includes('/login') ||
		lower.includes('/jms/') ||
		lower.includes('/tracking') ||
		/meli\.la\/?$/i.test(lower)
	);
}

export function isMercadoLivreHost(hostname: string): boolean {
	return hostMatches(hostname, HOST_SUFFIXES);
}

/**
 * Collector Mercado Livre.
 * Heurísticas (P1): anti-bot, páginas intermediárias, removido/estoque, título em cascata.
 * Não marca productPresent apenas por HTTP 2xx.
 */
export const mercadoLivreCollector: MarketplaceCollector = {
	marketplace: 'mercadolivre',

	canHandle(url: string): boolean {
		const parsed = parseHttpUrl(url);
		return parsed ? isMercadoLivreHost(parsed.hostname) : false;
	},

	async collect(url: string, options = {}): Promise<CollectedPage> {
		const timeoutMs = options.timeoutMs ?? 45_000;
		const fetched = await fetchPage(url, {
			timeoutMs,
			retries: options.retries ?? 3,
			retryDelayMs: 1_500,
		});

		const base = {
			marketplace: 'mercadolivre' as const,
			url,
			finalUrl: fetched.finalUrl,
			httpStatus: fetched.httpStatus,
			responseTimeMs: fetched.responseTimeMs,
			redirectCount: fetched.redirectCount,
			collector: 'mercadolivre' as const,
		};

		if (fetched.error && fetched.httpStatus == null) {
			return {
				...base,
				fetched: false,
				title: null,
				html: null,
				error: fetched.error,
				signals: { ...EMPTY_SIGNALS },
			};
		}

		const html = fetched.html ?? '';
		const title = html ? extractPageTitle(html) : null;
		const signals = html
			? buildSignals({
					html,
					finalUrl: fetched.finalUrl,
					httpStatus: fetched.httpStatus,
					removedHints: REMOVED_HINTS,
					outOfStockHints: OUT_OF_STOCK_HINTS,
					productHints: PRODUCT_HINTS,
					looksLikeProductUrl,
					looksLikeIntermediateUrl,
				})
			: { ...EMPTY_SIGNALS };

		return {
			...base,
			fetched: fetched.httpStatus != null,
			title,
			html: fetched.html,
			error: fetched.error,
			signals,
		};
	},
};

export const MERCADO_LIVRE_HOST_SUFFIXES = HOST_SUFFIXES;
