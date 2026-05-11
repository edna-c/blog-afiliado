/**
 * Compatibilidade: este arquivo foi a primeira camada de "veja também".
 * A fonte canônica agora é `editorialContent.ts` (cluster + tópicos + fluxo).
 *
 * Mantemos os mesmos nomes/exports usados por RelatedArticles para não exigir
 * refactor amplo nas páginas que já consomem `getRelatedPages`.
 */
import {
	canonPath,
	getRelated,
	type EditorialEntry,
	type EditorialKind,
} from './editorialContent';

export type RelatedPageKind = EditorialKind;

export interface RelatedPageLink {
	href: string;
	title: string;
	description: string;
	kind: RelatedPageKind;
}

export { canonPath };

function toRelated(entry: EditorialEntry): RelatedPageLink {
	return {
		href: entry.href,
		title: entry.title,
		description: entry.description,
		kind: entry.kind,
	};
}

export function getRelatedPages(currentPath: string, limit = 4, extraExclude: string[] = []): RelatedPageLink[] {
	return getRelated(currentPath, { limit, excludePaths: extraExclude }).map(toRelated);
}
