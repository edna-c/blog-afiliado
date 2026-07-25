import type { MarketplaceCollector } from './types.ts';
import type { CollectedPage } from '../types/index.ts';
import { fetchPage } from '../utils/fetch-page.ts';
import { buildSignals, EMPTY_SIGNALS } from '../utils/page-signals.ts';
import { extractPageTitle } from '../utils/title.ts';
import { hostMatches, parseHttpUrl } from '../utils/url.ts';

const HOST_SUFFIXES = ['shopee.com.br', 's.shopee.com.br', 'shopee.com'] as const;

const REMOVED_HINTS = [
	'produto não encontrado',
	'product not found',
	'página não existe',
	'page not found',
	'não encontramos esse produto',
	'item not found',
	'o produto que você procura não está disponível',
	'produto foi removido',
	'item is unavailable',
	'error_item_not_found',
] as const;

const OUT_OF_STOCK_HINTS = [
	'produto esgotado',
	'estoque esgotado',
	'sem estoque',
	'out of stock',
	'indisponível para compra',
	'sold out',
] as const;

const PRODUCT_HINTS = [
	'"itemid"',
	'"shopid"',
	'product-briefing',
	'"@type":"Product"',
	'pdp-product',
	'product-detail',
] as const;

function looksLikeProductUrl(url: string): boolean {
	return (
		/\/product\/\d+\/\d+/i.test(url) ||
		/-i\.\d+\.\d+/i.test(url) ||
		/\/product\/\d+/i.test(url)
	);
}

function looksLikeIntermediateUrl(url: string): boolean {
	const lower = url.toLowerCase();
	// Landing de afiliados / deep-link sem PDP explícito
	return (
		lower.includes('/opaanlp/') ||
		lower.includes('/universal-link/') ||
		lower.includes('/login') ||
		/^https?:\/\/s\.shopee\.com\.br\/?$/i.test(lower)
	);
}

export function isShopeeHost(hostname: string): boolean {
	return hostMatches(hostname, HOST_SUFFIXES);
}

/**
 * Collector Shopee.
 * Heurísticas (P1): não marca OK só com HTTP 200; exige URL de produto ou sinais fortes;
 * trata opaanlp/universal-link como intermediário se não houver PDP.
 */
export const shopeeCollector: MarketplaceCollector = {
	marketplace: 'shopee',

	canHandle(url: string): boolean {
		const parsed = parseHttpUrl(url);
		return parsed ? isShopeeHost(parsed.hostname) : false;
	},

	async collect(url: string, options = {}): Promise<CollectedPage> {
		const fetched = await fetchPage(url, {
			timeoutMs: options.timeoutMs ?? 35_000,
			retries: options.retries ?? 2,
			retryDelayMs: 1_200,
		});

		const base = {
			marketplace: 'shopee' as const,
			url,
			finalUrl: fetched.finalUrl,
			httpStatus: fetched.httpStatus,
			responseTimeMs: fetched.responseTimeMs,
			redirectCount: fetched.redirectCount,
			collector: 'shopee' as const,
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

		// Soft-OK: intermediate affiliate hop that still lands with product id in query/path
		if (
			signals.intermediate &&
			fetched.finalUrl &&
			looksLikeProductUrl(fetched.finalUrl)
		) {
			signals.intermediate = false;
			signals.productPresent = !signals.removed && !signals.blocked;
		}

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

export const SHOPEE_HOST_SUFFIXES = HOST_SUFFIXES;
