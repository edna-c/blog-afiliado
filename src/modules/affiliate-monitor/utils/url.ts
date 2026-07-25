/**
 * Utilitários HTTP compartilhados (sem lógica de marketplace).
 */

export function parseHttpUrl(raw: string): URL | null {
	try {
		const url = new URL(raw);
		if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
		return url;
	} catch {
		return null;
	}
}

export function hostMatches(hostname: string, suffixes: readonly string[]): boolean {
	const host = hostname.toLowerCase();
	return suffixes.some((suffix) => host === suffix || host.endsWith(`.${suffix}`));
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function decodeBasicEntities(value: string): string {
	return value
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&nbsp;/g, ' ');
}
