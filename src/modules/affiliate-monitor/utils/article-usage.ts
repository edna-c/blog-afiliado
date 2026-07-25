import fs from 'node:fs';
import path from 'node:path';
import type { ProductUsageLocations } from '../types/index.ts';

const SCAN_ROOTS = ['src/pages', 'src/components', 'src/content', 'src/data'] as const;
const SCAN_EXTENSIONS = new Set(['.astro', '.ts', '.tsx', '.js', '.mjs', '.md', '.mdx']);

export type ProductUsageMap = Record<string, ProductUsageLocations>;

function emptyUsage(): ProductUsageLocations {
	return { articles: [], components: [], dataFiles: [] };
}

/**
 * Mapeia productId → locais de uso separados por tipo.
 * Reduz falso negativo: busca `produtos.id`, `produtos['id']` e URL literal dos links.
 */
export function buildArticleUsageMap(
	productIds: string[],
	projectRoot: string = process.cwd(),
	urlByProductId: Record<string, string[]> = {},
): ProductUsageMap {
	const usage: ProductUsageMap = Object.fromEntries(
		productIds.map((id) => [id, emptyUsage()]),
	);

	const patterns = new Map(
		productIds.map((id) => {
			const escaped = escapeRegExp(id);
			return [
				id,
				[
					new RegExp(`\\bprodutos\\.${escaped}\\b`),
					new RegExp(`\\bprodutos\\[['"]${escaped}['"]\\]`),
				],
			] as const;
		}),
	);

	for (const root of SCAN_ROOTS) {
		const abs = path.join(projectRoot, root);
		if (!fs.existsSync(abs)) continue;
		walk(abs, (filePath) => {
			const rel = toPosix(path.relative(projectRoot, filePath));
			let content: string;
			try {
				content = fs.readFileSync(filePath, 'utf8');
			} catch {
				return;
			}

			for (const id of productIds) {
				const res = patterns.get(id)!;
				const matchedByRef = res.some((re) => {
					re.lastIndex = 0;
					return re.test(content);
				});
				const urls = urlByProductId[id] ?? [];
				const matchedByUrl = urls.some((u) => u && content.includes(u));
				if (!matchedByRef && !matchedByUrl) continue;
				pushUsage(usage[id]!, rel);
			}
		});
	}

	for (const id of productIds) {
		const entry = usage[id]!;
		entry.articles = uniqueSorted(entry.articles);
		entry.components = uniqueSorted(entry.components);
		entry.dataFiles = uniqueSorted(entry.dataFiles);
	}

	return usage;
}

function pushUsage(bucket: ProductUsageLocations, relPosix: string): void {
	if (relPosix.startsWith('src/pages/') || relPosix.startsWith('src/content/')) {
		bucket.articles.push(formatUsageLabel(relPosix));
		return;
	}
	if (relPosix.startsWith('src/components/')) {
		bucket.components.push(relPosix);
		return;
	}
	if (relPosix.startsWith('src/data/')) {
		bucket.dataFiles.push(relPosix);
		return;
	}
	bucket.dataFiles.push(relPosix);
}

function walk(dir: string, onFile: (filePath: string) => void): void {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name === 'node_modules' || entry.name === 'dist') continue;
			walk(full, onFile);
		} else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
			onFile(full);
		}
	}
}

function toPosix(p: string): string {
	return p.split(path.sep).join('/');
}

function formatUsageLabel(relPosix: string): string {
	if (relPosix.startsWith('src/pages/') && relPosix.endsWith('.astro')) {
		let route = relPosix.slice('src/pages/'.length, -'.astro'.length);
		if (route === 'index') return '/';
		route = route.replace(/\/index$/, '');
		if (route.includes('[')) return relPosix;
		return `/${route}/`;
	}
	return relPosix;
}

function uniqueSorted(values: string[]): string[] {
	return [...new Set(values)].sort();
}

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function flattenUsage(usage: ProductUsageLocations): string[] {
	return [...usage.articles, ...usage.components, ...usage.dataFiles];
}
