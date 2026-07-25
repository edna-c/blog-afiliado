import { decodeBasicEntities } from './url.ts';

/**
 * Extração de título em cascata: og:title → twitter:title → JSON-LD Product → <title>.
 */
export function extractPageTitle(html: string): string | null {
	const candidates = [
		extractMetaContent(html, 'property', 'og:title'),
		extractMetaContent(html, 'name', 'twitter:title'),
		extractJsonLdProductName(html),
		extractTagTitle(html),
	];

	for (const value of candidates) {
		const cleaned = cleanTitle(value);
		if (cleaned) return cleaned;
	}
	return null;
}

/** @deprecated Use extractPageTitle — mantido para compatibilidade interna. */
export function extractHtmlTitle(html: string): string | null {
	return extractPageTitle(html);
}

function extractTagTitle(html: string): string | null {
	const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
	return match?.[1] ? decodeBasicEntities(match[1]) : null;
}

function extractMetaContent(
	html: string,
	attr: 'property' | 'name',
	key: string,
): string | null {
	const metaTags = html.matchAll(/<meta\b[^>]*>/gi);
	for (const match of metaTags) {
		const tag = match[0];
		const attrRe = new RegExp(`${attr}\\s*=\\s*["']${escapeRegExp(key)}["']`, 'i');
		if (!attrRe.test(tag)) continue;
		const contentMatch = tag.match(/content\s*=\s*["']([^"']+)["']/i);
		if (contentMatch?.[1]) return decodeBasicEntities(contentMatch[1]);
	}
	return null;
}

function extractJsonLdProductName(html: string): string | null {
	const scripts = html.matchAll(
		/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
	);
	for (const script of scripts) {
		const raw = script[1]?.trim();
		if (!raw) continue;
		try {
			const data = JSON.parse(raw) as unknown;
			const name = findProductName(data);
			if (name) return name;
		} catch {
			// JSON-LD inválido — ignora
		}
	}
	return null;
}

function findProductName(data: unknown): string | null {
	if (!data) return null;
	if (Array.isArray(data)) {
		for (const item of data) {
			const found = findProductName(item);
			if (found) return found;
		}
		return null;
	}
	if (typeof data !== 'object') return null;
	const obj = data as Record<string, unknown>;
	const type = obj['@type'];
	const types = Array.isArray(type) ? type.map(String) : type ? [String(type)] : [];
	const isProduct = types.some((t) => /product/i.test(t));
	if (isProduct && typeof obj.name === 'string') return obj.name;
	if (obj['@graph']) return findProductName(obj['@graph']);
	return null;
}

function cleanTitle(value: string | null | undefined): string | null {
	if (!value) return null;
	const cleaned = value.replace(/\s+/g, ' ').trim();
	if (!cleaned) return null;
	// Títulos genéricos de challenge / home não contam
	if (/^(just a moment|attention required|access denied|shopee|mercado livre)\b/i.test(cleaned)) {
		return null;
	}
	return cleaned;
}

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
