/** Path sem barra final; raiz como `'/'`. */
export function normalizePath(pathname: string): string {
	const trimmed = pathname.replace(/\/$/, '');
	return trimmed === '' ? '/' : trimmed;
}

function matchesPrefix(path: string, prefix: string): boolean {
	const normalized = normalizePath(prefix);
	return path === normalized || path.startsWith(`${normalized}-`) || path.startsWith(`${normalized}/`);
}

/** Se o `href` do menu corresponde à página atual (para `aria-current="page"`). */
export function isNavActive(
	currentPathname: string,
	href: string,
	activePrefixes?: string[],
): boolean {
	const path = normalizePath(currentPathname);
	const target = normalizePath(href.split('#')[0]);

	if (activePrefixes?.length) {
		for (const prefix of activePrefixes) {
			if (matchesPrefix(path, prefix)) return true;
		}
	}

	if (target === '/') return path === '/';
	return path === target || path.startsWith(`${target}/`);
}
