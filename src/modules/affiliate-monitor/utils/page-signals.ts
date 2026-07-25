import type { PageSignals } from '../types/index.ts';

export const EMPTY_SIGNALS: PageSignals = {
	removed: false,
	outOfStock: false,
	productPresent: false,
	blocked: false,
	intermediate: false,
};

export function includesAny(haystack: string, needles: readonly string[]): boolean {
	const lower = haystack.toLowerCase();
	return needles.some((n) => lower.includes(n.toLowerCase()));
}

/** Sinais genéricos de anti-bot / challenge (independentes de marketplace). */
export const BLOCKED_HINTS = [
	'cf-browser-verification',
	'cf-challenge',
	'challenge-platform',
	'cdn-cgi/challenge',
	'attention required',
	'just a moment',
	'enable javascript',
	'are you a robot',
	'access denied',
	'verifique se você é humano',
	'captcha',
	'hcaptcha',
	'recaptcha',
	'bot detection',
] as const;

export function detectBlocked(html: string, httpStatus: number | null): boolean {
	if (httpStatus === 403 || httpStatus === 429 || httpStatus === 503) return true;
	return includesAny(html, BLOCKED_HINTS);
}

export function hasJsonLdProduct(html: string): boolean {
	return /"@type"\s*:\s*"Product"/i.test(html) || /"@type"\s*:\s*\[\s*"[^"]*Product/i.test(html);
}

/**
 * Heurísticas melhoradas (P1) — documentadas no README do módulo:
 * - blocked: challenge/captcha/403/429/503
 * - removed: HTTP 404/410 + frases explícitas de ausência
 * - outOfStock: frases específicas (não “indisponível” genérico sozinho)
 * - productPresent: URL de item OU JSON-LD Product OU hints fortes — nunca só HTTP 200
 * - intermediate: landing de tracking/login sem PDP
 */
export function buildSignals(input: {
	html: string;
	finalUrl: string | null;
	httpStatus: number | null;
	removedHints: readonly string[];
	outOfStockHints: readonly string[];
	productHints: readonly string[];
	looksLikeProductUrl: (url: string) => boolean;
	looksLikeIntermediateUrl: (url: string) => boolean;
}): PageSignals {
	const { html, finalUrl, httpStatus } = input;
	const blocked = detectBlocked(html, httpStatus);

	if (httpStatus === 404 || httpStatus === 410) {
		return {
			removed: true,
			outOfStock: false,
			productPresent: false,
			blocked: false,
			intermediate: false,
		};
	}

	const removed = !blocked && includesAny(html, input.removedHints);
	const outOfStock = !blocked && !removed && includesAny(html, input.outOfStockHints);
	const intermediate =
		!!finalUrl &&
		(input.looksLikeIntermediateUrl(finalUrl) ||
			includesAny(html, ['redirecionando', 'aguarde', 'você está sendo redirecionado']));

	const urlLooksProduct = !!finalUrl && input.looksLikeProductUrl(finalUrl);
	const strongHtml =
		hasJsonLdProduct(html) || includesAny(html, input.productHints);

	const productPresent =
		!blocked &&
		!removed &&
		!intermediate &&
		(urlLooksProduct || (strongHtml && !outOfStock) || (outOfStock && (urlLooksProduct || strongHtml)));

	return {
		removed,
		outOfStock,
		productPresent,
		blocked,
		intermediate: intermediate && !productPresent,
	};
}
