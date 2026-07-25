import { sleep } from './url.ts';

export type FetchPageOptions = {
	timeoutMs?: number;
	userAgent?: string;
	method?: 'GET' | 'HEAD';
	/** Tentativas extras após falha de rede/timeout/anti-bot leve. Default: 2. */
	retries?: number;
	retryDelayMs?: number;
	/** Seguir redirects manualmente para contar hops. Default: true. */
	countRedirects?: boolean;
};

export type FetchPageResult = {
	ok: boolean;
	httpStatus: number | null;
	finalUrl: string | null;
	html: string | null;
	error: string | null;
	responseTimeMs: number;
	redirectCount: number;
};

const USER_AGENTS = [
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
] as const;

const MAX_REDIRECTS = 12;

function isRetryableStatus(status: number | null): boolean {
	return status === 429 || status === 503 || status === 502 || status === 504;
}

function looksLikeSoftBlock(html: string | null, status: number | null): boolean {
	if (status === 403 || status === 429) return true;
	if (!html) return false;
	const lower = html.toLowerCase();
	return (
		lower.includes('cf-browser-verification') ||
		lower.includes('just a moment') ||
		lower.includes('challenge-platform') ||
		lower.includes('attention required')
	);
}

async function fetchManualRedirects(
	url: string,
	options: { timeoutMs: number; userAgent: string; method: 'GET' | 'HEAD' },
): Promise<FetchPageResult> {
	const started = Date.now();
	let current = url;
	let redirectCount = 0;

	for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), options.timeoutMs);
		try {
			const response = await fetch(current, {
				method: options.method,
				redirect: 'manual',
				signal: controller.signal,
				headers: {
					'User-Agent': options.userAgent,
					Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
					'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
					'Cache-Control': 'no-cache',
					'Upgrade-Insecure-Requests': '1',
				},
			});

			if (response.status >= 300 && response.status < 400) {
				const location = response.headers.get('location');
				if (!location) {
					return {
						ok: false,
						httpStatus: response.status,
						finalUrl: current,
						html: null,
						error: `Redirect ${response.status} sem Location`,
						responseTimeMs: Date.now() - started,
						redirectCount,
					};
				}
				current = new URL(location, current).href;
				redirectCount += 1;
				continue;
			}

			let html: string | null = null;
			if (options.method === 'GET') {
				html = await response.text();
			}

			return {
				ok: response.ok,
				httpStatus: response.status,
				finalUrl: response.url || current,
				html,
				error: null,
				responseTimeMs: Date.now() - started,
				redirectCount,
			};
		} catch (err) {
			const message =
				err instanceof Error
					? err.name === 'AbortError'
						? `Timeout após ${options.timeoutMs}ms`
						: err.message
					: String(err);
			return {
				ok: false,
				httpStatus: null,
				finalUrl: redirectCount > 0 ? current : null,
				html: null,
				error: message,
				responseTimeMs: Date.now() - started,
				redirectCount,
			};
		} finally {
			clearTimeout(timer);
		}
	}

	return {
		ok: false,
		httpStatus: null,
		finalUrl: current,
		html: null,
		error: `Limite de ${MAX_REDIRECTS} redirects excedido`,
		responseTimeMs: Date.now() - started,
		redirectCount,
	};
}

/**
 * Fetch com contagem de redirects, timeout, retry exponencial e rotação de UA.
 */
export async function fetchPage(
	url: string,
	options: FetchPageOptions = {},
): Promise<FetchPageResult> {
	const timeoutMs = options.timeoutMs ?? 30_000;
	const method = options.method ?? 'GET';
	const retries = options.retries ?? 2;
	const retryDelayMs = options.retryDelayMs ?? 1_200;

	let last: FetchPageResult = {
		ok: false,
		httpStatus: null,
		finalUrl: null,
		html: null,
		error: 'Não executado',
		responseTimeMs: 0,
		redirectCount: 0,
	};

	for (let attempt = 0; attempt <= retries; attempt++) {
		const userAgent =
			options.userAgent ?? USER_AGENTS[attempt % USER_AGENTS.length]!;

		last = await fetchManualRedirects(url, { timeoutMs, userAgent, method });

		const softBlock = looksLikeSoftBlock(last.html, last.httpStatus);
		const networkFail = last.httpStatus == null;
		const retryableHttp = isRetryableStatus(last.httpStatus);

		if (!networkFail && !softBlock && !retryableHttp) {
			return last;
		}

		if (attempt < retries) {
			await sleep(retryDelayMs * Math.pow(2, attempt));
			continue;
		}
	}

	return last;
}
