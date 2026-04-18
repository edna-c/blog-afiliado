/** Path sem barra final; raiz como `'/'`. */
export function normalizePath(pathname: string): string {
	const trimmed = pathname.replace(/\/$/, '');
	return trimmed === '' ? '/' : trimmed;
}

/** Se o `href` do menu corresponde à página atual (para `aria-current="page"`). */
export function isNavActive(currentPathname: string, href: string): boolean {
	const path = normalizePath(currentPathname);
	const target = normalizePath(href);
	if (target === '/') return path === '/';
	return path === target || path.startsWith(`${target}/`);
}
