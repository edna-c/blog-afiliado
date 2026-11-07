/**
 * Cruza cliques do GA4 (`affiliate_click`) com pedidos e comissão
 * exportados do Mercado Livre e da Shopee.
 *
 * `product_id` é a chave de `src/data/products.ts`.
 * Relatório da loja sem essa coluna é ligado pelo link do inventário
 * ou pelo código do modelo no título (ex.: FE5IG).
 *
 * Uso:
 *   npm run reconcile -- --ga4=exports/ga4.csv --ml=exports/ml.csv --shopee=exports/shopee.csv
 *   npm run reconcile -- --ga4=exports/ga4.csv --ml=exports/ml.csv --from=2026-10-01 --to=2026-10-31
 *   npm run reconcile -- --ga4=exports/ga4.csv --shopee=exports/shopee.csv --stdout-only
 *
 * GA4: date, product_id, merchant, clicks, users
 *   merchant: mercado_livre | shopee
 * Lojas: data, comissão e pedidos. product_id, título ou URL identificam o SKU.
 * CSV com vírgula ou ponto e vírgula. Datas YYYY-MM-DD, DD/MM/YYYY ou YYYYMMDD.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { produtos, type ProductId, type ProdutoAfiliado } from '../src/data/products.ts';
import { PRODUCT_DISPLAY_NAMES } from '../src/modules/affiliate-monitor/utils/inventory.ts';
import { isProductId } from '../src/utils/affiliateTracking.ts';

export type MerchantId = 'mercado_livre' | 'shopee';

export type ReconciliationRow = {
	productId: string;
	productName: string;
	merchant: MerchantId;
	clicks: number;
	users: number;
	orders: number;
	commission: number;
};

export type UnmatchedAffiliateRow = {
	merchant: MerchantId;
	date: string | null;
	label: string;
	orders: number;
	commission: number;
};

export type ReconcileInput = {
	ga4Csv: string;
	mercadoLivreCsv?: string;
	shopeeCsv?: string;
	from?: string;
	to?: string;
};

export type ReconcileReport = {
	from: string | null;
	to: string | null;
	rows: ReconciliationRow[];
	unmatched: UnmatchedAffiliateRow[];
	ignoredOutOfWindow: number;
	warnings: string[];
};

const DATE_HEADERS = ['date', 'data', 'day', 'data_do_pedido', 'order_date', 'order_time', 'horario_do_pedido'] as const;
const PRODUCT_HEADERS = ['product_id', 'productid', 'id_do_produto', 'sku', 'item_id'] as const;
const MERCHANT_HEADERS = ['merchant', 'loja', 'marketplace', 'canal'] as const;
const CLICK_HEADERS = ['clicks', 'cliques', 'event_count', 'eventcount', 'contagem_de_eventos', 'total_de_eventos'] as const;
const USER_HEADERS = ['users', 'usuarios', 'total_users', 'totalusers', 'usuarios_ativos', 'active_users'] as const;
const ORDER_HEADERS = ['orders', 'pedidos', 'vendas', 'quantidade', 'quantity', 'conversoes', 'itens_vendidos'] as const;
const COMMISSION_HEADERS = [
	'commission',
	'comissao',
	'valor_da_comissao',
	'comissao_estimada',
	'estimated_commission',
	'comissao_liquida',
	'net_commission',
] as const;
const TITLE_HEADERS = ['nome_do_produto', 'titulo', 'title', 'item_name', 'product_name', 'produto', 'nome', 'item'] as const;
const URL_HEADERS = ['url', 'link', 'link_do_produto', 'product_url', 'item_url'] as const;

type Alias = {
	productId: ProductId;
	merchant: MerchantId | null;
	token: string;
};

const MERCHANT_LABEL: Record<MerchantId, string> = {
	mercado_livre: 'Mercado Livre',
	shopee: 'Shopee',
};

export function parseCsv(text: string): string[][] {
	const source = text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
	const firstLine = source.split('\n').find((line) => {
		const trimmed = line.trim();
		return trimmed.length > 0 && !trimmed.startsWith('#');
	});
	if (!firstLine) return [];
	const delimiter = detectDelimiter(firstLine);
	const rows: string[][] = [];
	let row: string[] = [];
	let field = '';
	let inQuotes = false;

	for (let i = 0; i < source.length; i += 1) {
		const char = source[i] ?? '';
		if (inQuotes) {
			if (char === '"') {
				if (source[i + 1] === '"') {
					field += '"';
					i += 1;
				} else {
					inQuotes = false;
				}
			} else {
				field += char;
			}
			continue;
		}
		if (char === '"') {
			inQuotes = true;
			continue;
		}
		if (char === delimiter) {
			row.push(field);
			field = '';
			continue;
		}
		if (char === '\n') {
			row.push(field);
			field = '';
			pushRow(rows, row);
			row = [];
			continue;
		}
		field += char;
	}
	if (field.length > 0 || row.length > 0) {
		row.push(field);
		pushRow(rows, row);
	}
	return rows;
}

function pushRow(rows: string[][], row: string[]): void {
	if (row.every((cell) => cell.trim() === '')) return;
	if (row[0]?.trim().startsWith('#')) return;
	rows.push(row);
}

function detectDelimiter(line: string): ',' | ';' {
	let commas = 0;
	let semis = 0;
	let inQuotes = false;
	for (let i = 0; i < line.length; i += 1) {
		const char = line[i];
		if (char === '"') {
			if (inQuotes && line[i + 1] === '"') {
				i += 1;
			} else {
				inQuotes = !inQuotes;
			}
			continue;
		}
		if (inQuotes) continue;
		if (char === ',') commas += 1;
		if (char === ';') semis += 1;
	}
	return semis > commas ? ';' : ',';
}

export function normalizeHeader(value: string): string {
	return value
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{M}/gu, '')
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_|_$/g, '');
}

export function parseFlexibleDate(value: string): string | null {
	const trimmed = value.trim();
	const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
	if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
	const br = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(trimmed);
	if (br) return `${br[3]}-${br[2]}-${br[1]}`;
	const compact = /^(\d{4})(\d{2})(\d{2})$/.exec(trimmed);
	if (compact) return `${compact[1]}-${compact[2]}-${compact[3]}`;
	return null;
}

export function parseFlexibleNumber(value: string): number {
	const trimmed = value.trim().replace(/\s/g, '').replace(/r\$/i, '');
	if (!trimmed || trimmed === '-' || trimmed === '—') return 0;
	let normalized = trimmed;
	const hasComma = normalized.includes(',');
	const hasDot = normalized.includes('.');
	if (hasComma && hasDot) {
		if (normalized.lastIndexOf(',') > normalized.lastIndexOf('.')) {
			normalized = normalized.replace(/\./g, '').replace(',', '.');
		} else {
			normalized = normalized.replace(/,/g, '');
		}
	} else if (hasComma) {
		normalized = normalized.replace(',', '.');
	}
	const parsed = Number(normalized);
	return Number.isFinite(parsed) ? parsed : 0;
}

export function normalizeMerchant(value: string): MerchantId | null {
	const token = normalizeHeader(value);
	if (token === 'mercado_livre' || token === 'mercadolivre' || token === 'ml' || token === 'mercado') {
		return 'mercado_livre';
	}
	if (token === 'shopee') return 'shopee';
	return null;
}

type CsvTable = {
	headers: string[];
	records: Record<string, string>[];
};

function tableFromCsv(csv: string): CsvTable {
	const matrix = parseCsv(csv);
	if (matrix.length === 0) return { headers: [], records: [] };
	const headers = (matrix[0] ?? []).map((cell) => normalizeHeader(cell));
	const records = matrix.slice(1).map((cells) => {
		const record: Record<string, string> = {};
		headers.forEach((header, index) => {
			if (!header) return;
			record[header] = (cells[index] ?? '').trim();
		});
		return record;
	});
	return { headers, records };
}

function hasHeader(headers: readonly string[], names: readonly string[]): boolean {
	return names.some((name) => headers.includes(name));
}

function pick(record: Record<string, string>, names: readonly string[]): string {
	for (const name of names) {
		const value = record[name];
		if (value) return value;
	}
	return '';
}

function fold(value: string): string {
	return value
		.normalize('NFD')
		.replace(/\p{M}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, ' ')
		.trim();
}

function buildAliases(): Alias[] {
	const aliases: Alias[] = [];
	for (const productId of Object.keys(produtos) as ProductId[]) {
		/** União literal do inventário — `ml`/`shopee` são opcionais (ex.: FE4DG só Shopee). */
		const offer = produtos[productId] as ProdutoAfiliado;
		const tokens = new Set<string>();
		tokens.add(fold(productId));
		const display = PRODUCT_DISPLAY_NAMES[productId];
		if (display) tokens.add(fold(display));
		for (const code of productId.match(/[A-Z]{2,}\d[A-Z0-9]*/g) ?? []) {
			tokens.add(fold(code));
		}
		for (const token of tokens) {
			if (token.length < 4) continue;
			aliases.push({ productId, merchant: null, token });
		}
		pushUrlAlias(aliases, productId, 'mercado_livre', offer.ml);
		pushUrlAlias(aliases, productId, 'shopee', offer.shopee);
	}
	return aliases;
}

function pushUrlAlias(
	aliases: Alias[],
	productId: ProductId,
	merchant: MerchantId,
	url: string | undefined,
): void {
	if (!url) return;
	aliases.push({ productId, merchant, token: url.toLowerCase() });
	try {
		const slug = new URL(url).pathname.replace(/^\//, '').toLowerCase();
		if (slug.length >= 4) aliases.push({ productId, merchant, token: slug });
	} catch {
		/* URL do inventário inválida não entra no índice. */
	}
}

const ALIASES = buildAliases();

function resolveProductId(merchant: MerchantId, record: Record<string, string>): ProductId | null {
	const explicit = pick(record, PRODUCT_HEADERS);
	if (isProductId(explicit)) return explicit;

	const haystack = [pick(record, URL_HEADERS), pick(record, TITLE_HEADERS), ...Object.values(record)]
		.join(' ')
		.toLowerCase();
	const urlHit = ALIASES.find(
		(alias) => alias.merchant === merchant && alias.token.length >= 4 && haystack.includes(alias.token),
	);
	if (urlHit) return urlHit.productId;

	const folded = ` ${fold(haystack)} `;
	const hits = new Map<ProductId, number>();
	for (const alias of ALIASES) {
		if (alias.merchant !== null) continue;
		if (!folded.includes(` ${alias.token} `)) continue;
		const previous = hits.get(alias.productId) ?? 0;
		if (alias.token.length > previous) hits.set(alias.productId, alias.token.length);
	}
	if (hits.size === 1) {
		const only = [...hits.keys()][0];
		return only ?? null;
	}
	if (hits.size > 1) {
		const ranked = [...hits.entries()].sort((a, b) => b[1] - a[1]);
		const best = ranked[0];
		const second = ranked[1];
		if (best && second && best[1] > second[1]) return best[0];
	}
	return null;
}

function inWindow(date: string | null, from: string | null, to: string | null): boolean {
	if (!from && !to) return true;
	if (!date) return true;
	if (from && date < from) return false;
	if (to && date > to) return false;
	return true;
}

function productName(productId: string): string {
	return PRODUCT_DISPLAY_NAMES[productId] ?? productId;
}

function bucketKey(productId: string, merchant: MerchantId): string {
	return `${productId}|${merchant}`;
}

export function reconcileAffiliateReports(input: ReconcileInput): ReconcileReport {
	const warnings: string[] = [];
	const ga4 = tableFromCsv(input.ga4Csv);
	if (!hasHeader(ga4.headers, PRODUCT_HEADERS)) {
		throw new Error(
			`CSV do GA4 sem coluna product_id. Cabeçalhos: ${ga4.headers.filter(Boolean).join(', ') || '(vazio)'}`,
		);
	}
	if (!hasHeader(ga4.headers, CLICK_HEADERS)) {
		throw new Error(
			`CSV do GA4 sem coluna de cliques. Cabeçalhos: ${ga4.headers.filter(Boolean).join(', ') || '(vazio)'}`,
		);
	}
	if (!hasHeader(ga4.headers, MERCHANT_HEADERS)) {
		warnings.push('GA4 sem coluna merchant. Cliques sem loja ficam de fora do cruzamento.');
	}

	const ga4Dates = ga4.records
		.map((record) => parseFlexibleDate(pick(record, DATE_HEADERS)))
		.filter((date): date is string => date !== null)
		.sort();
	const from = input.from ?? ga4Dates[0] ?? null;
	const to = input.to ?? ga4Dates[ga4Dates.length - 1] ?? null;
	if (!input.from && !input.to && from && to) {
		warnings.push(`Janela assumida pelo GA4: ${from} a ${to}.`);
	}

	const buckets = new Map<string, ReconciliationRow>();
	const unmatched: UnmatchedAffiliateRow[] = [];
	let ignoredOutOfWindow = 0;
	let unknownGa4 = 0;

	function bucketFor(productId: string, merchant: MerchantId): ReconciliationRow {
		const key = bucketKey(productId, merchant);
		const existing = buckets.get(key);
		if (existing) return existing;
		const created: ReconciliationRow = {
			productId,
			productName: productName(productId),
			merchant,
			clicks: 0,
			users: 0,
			orders: 0,
			commission: 0,
		};
		buckets.set(key, created);
		return created;
	}

	for (const record of ga4.records) {
		const date = parseFlexibleDate(pick(record, DATE_HEADERS));
		if (!inWindow(date, from, to)) {
			ignoredOutOfWindow += 1;
			continue;
		}
		const productId = pick(record, PRODUCT_HEADERS);
		const merchant = normalizeMerchant(pick(record, MERCHANT_HEADERS));
		if (!isProductId(productId) || !merchant) {
			unknownGa4 += 1;
			continue;
		}
		const row = bucketFor(productId, merchant);
		row.clicks += parseFlexibleNumber(pick(record, CLICK_HEADERS));
		row.users += parseFlexibleNumber(pick(record, USER_HEADERS));
	}

	absorbAffiliateFile('mercado_livre', input.mercadoLivreCsv, from, to, warnings, bucketFor, unmatched, () => {
		ignoredOutOfWindow += 1;
	});
	absorbAffiliateFile('shopee', input.shopeeCsv, from, to, warnings, bucketFor, unmatched, () => {
		ignoredOutOfWindow += 1;
	});

	if (unknownGa4 > 0) {
		warnings.push(`${unknownGa4} linha(s) do GA4 sem product_id do inventário ou sem loja reconhecida.`);
	}

	const rows = [...buckets.values()]
		.filter((row) => row.clicks > 0 || row.orders > 0 || row.commission > 0)
		.sort((a, b) => b.commission - a.commission || b.clicks - a.clicks || a.productId.localeCompare(b.productId));

	return { from, to, rows, unmatched, ignoredOutOfWindow, warnings };
}

function absorbAffiliateFile(
	merchant: MerchantId,
	csv: string | undefined,
	from: string | null,
	to: string | null,
	warnings: string[],
	bucketFor: (productId: string, merchant: MerchantId) => ReconciliationRow,
	unmatched: UnmatchedAffiliateRow[],
	onIgnored: () => void,
): void {
	if (csv === undefined) return;
	const table = tableFromCsv(csv);
	if (table.records.length === 0) {
		warnings.push(`${MERCHANT_LABEL[merchant]}: arquivo sem linhas de pedido.`);
		return;
	}
	if (!hasHeader(table.headers, COMMISSION_HEADERS)) {
		warnings.push(`${MERCHANT_LABEL[merchant]}: sem coluna de comissão. O valor fica zerado.`);
	}
	if (!hasHeader(table.headers, DATE_HEADERS)) {
		warnings.push(`${MERCHANT_LABEL[merchant]}: sem coluna de data. As linhas entram na janela inteira.`);
	}
	for (const record of table.records) {
		const date = parseFlexibleDate(pick(record, DATE_HEADERS));
		if (!inWindow(date, from, to)) {
			onIgnored();
			continue;
		}
		const orders = parseFlexibleNumber(pick(record, ORDER_HEADERS));
		const commission = parseFlexibleNumber(pick(record, COMMISSION_HEADERS));
		const productId = resolveProductId(merchant, record);
		if (!productId) {
			unmatched.push({
				merchant,
				date,
				label: pick(record, TITLE_HEADERS) || pick(record, URL_HEADERS) || pick(record, PRODUCT_HEADERS) || '(sem identificação)',
				orders,
				commission,
			});
			continue;
		}
		const row = bucketFor(productId, merchant);
		row.orders += orders;
		row.commission += commission;
	}
}

function formatBrl(value: number): string {
	return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatRatio(commission: number, clicks: number): string {
	if (clicks <= 0) return 'sem clique no GA4';
	return formatBrl(commission / clicks);
}

function cell(value: string): string {
	return value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

export function renderReconciliationMarkdown(report: ReconcileReport): string {
	const windowLabel =
		report.from && report.to ? `${report.from} a ${report.to}` : 'sem limite de data';
	const lines: string[] = [
		'# Conciliação de afiliados',
		'',
		`Janela: ${windowLabel}.`,
		'',
		'Usuários são a soma das linhas do GA4. A mesma pessoa em dias diferentes entra mais de uma vez. Comissão por clique usa os cliques do GA4 na mesma janela e na mesma loja.',
		'',
	];
	if (report.warnings.length > 0) {
		lines.push('## Avisos', '');
		for (const warning of report.warnings) lines.push(`- ${warning}`);
		lines.push('');
	}
	lines.push(
		'| Produto | Loja | Cliques (GA4) | Usuários (soma) | Pedidos | Comissão (R$) | R$ / clique |',
		'| --- | --- | ---: | ---: | ---: | ---: | ---: |',
	);
	if (report.rows.length === 0) {
		lines.push('| — | — | 0 | 0 | 0 | 0,00 | — |');
	}
	for (const row of report.rows) {
		lines.push(
			`| ${cell(row.productName)} | ${MERCHANT_LABEL[row.merchant]} | ${row.clicks} | ${row.users} | ${row.orders} | ${formatBrl(row.commission)} | ${formatRatio(row.commission, row.clicks)} |`,
		);
	}
	const clickTotal = report.rows.reduce((sum, row) => sum + row.clicks, 0);
	const orderTotal = report.rows.reduce((sum, row) => sum + row.orders, 0);
	const commissionTotal = report.rows.reduce((sum, row) => sum + row.commission, 0);
	const orderLabel = orderTotal === 1 ? 'pedido' : 'pedidos';
	lines.push(
		'',
		`Total cruzado: ${clickTotal} cliques, ${orderTotal} ${orderLabel}, R$ ${formatBrl(commissionTotal)}.`,
		'',
	);
	const affiliateUnmatched = report.unmatched.filter((row) => row.orders > 0 || row.commission > 0);
	lines.push('## Fora do inventário', '');
	if (affiliateUnmatched.length === 0) {
		lines.push('Nenhuma comissão ficou sem produto do inventário.', '');
	} else {
		const loose = affiliateUnmatched.reduce((sum, row) => sum + row.commission, 0);
		lines.push(
			`${affiliateUnmatched.length} linha(s), R$ ${formatBrl(loose)} sem product_id do Casa Prática.`,
			'',
			'| Loja | Data | Identificação | Pedidos | Comissão (R$) |',
			'| --- | --- | --- | ---: | ---: |',
		);
		for (const row of affiliateUnmatched) {
			lines.push(
				`| ${MERCHANT_LABEL[row.merchant]} | ${row.date ?? '—'} | ${cell(row.label)} | ${row.orders} | ${formatBrl(row.commission)} |`,
			);
		}
		lines.push('');
	}
	if (report.ignoredOutOfWindow > 0) {
		lines.push(`${report.ignoredOutOfWindow} linha(s) fora da janela de data.`, '');
	}
	return `${lines.join('\n')}\n`;
}

type CliOptions = {
	ga4Path: string;
	mlPath?: string;
	shopeePath?: string;
	from?: string;
	to?: string;
	outPath: string;
	stdoutOnly: boolean;
};

function printHelp(): void {
	console.log(`Concilia cliques do GA4 com comissão do Mercado Livre e da Shopee.

Uso:
  npm run reconcile -- --ga4=exports/ga4.csv --ml=exports/ml.csv --shopee=exports/shopee.csv
  npm run reconcile -- --ga4=exports/ga4.csv --ml=exports/ml.csv --from=2026-10-01 --to=2026-10-31
  npm run reconcile -- --ga4=exports/ga4.csv --shopee=exports/shopee.csv --stdout-only

Opções:
  --ga4=ARQUIVO       CSV do GA4 (date, product_id, merchant, clicks, users)
  --ml=ARQUIVO        CSV do Mercado Livre
  --shopee=ARQUIVO    CSV da Shopee
  --from=AAAA-MM-DD   início da janela
  --to=AAAA-MM-DD     fim da janela
  --out=ARQUIVO       markdown (padrão: reports/reconciliation-output.md)
  --stdout-only       só o terminal
`);
}

function parseCli(argv: string[]): CliOptions | null {
	let ga4Path = '';
	let mlPath: string | undefined;
	let shopeePath: string | undefined;
	let from: string | undefined;
	let to: string | undefined;
	let outPath = path.join(process.cwd(), 'reports', 'reconciliation-output.md');
	let stdoutOnly = false;

	for (const arg of argv) {
		if (arg === '--help' || arg === '-h') return null;
		if (arg.startsWith('--ga4=')) ga4Path = arg.slice('--ga4='.length);
		else if (arg.startsWith('--ml=')) mlPath = arg.slice('--ml='.length);
		else if (arg.startsWith('--shopee=')) shopeePath = arg.slice('--shopee='.length);
		else if (arg.startsWith('--from=')) from = arg.slice('--from='.length);
		else if (arg.startsWith('--to=')) to = arg.slice('--to='.length);
		else if (arg.startsWith('--out=')) outPath = path.resolve(arg.slice('--out='.length));
		else if (arg === '--stdout-only') stdoutOnly = true;
		else throw new Error(`Argumento desconhecido: ${arg}`);
	}
	if (!ga4Path) throw new Error('Informe --ga4=ARQUIVO.');
	if (!mlPath && !shopeePath) throw new Error('Informe --ml=ARQUIVO, --shopee=ARQUIVO ou os dois.');
	if (from && !parseFlexibleDate(from)) throw new Error('--from precisa ser AAAA-MM-DD.');
	if (to && !parseFlexibleDate(to)) throw new Error('--to precisa ser AAAA-MM-DD.');
	return { ga4Path, mlPath, shopeePath, from, to, outPath, stdoutOnly };
}

function readCsv(filePath: string): string {
	return readFileSync(path.resolve(filePath), 'utf8');
}

function isMainModule(): boolean {
	const entry = process.argv[1];
	if (!entry) return false;
	return import.meta.url === pathToFileURL(path.resolve(entry)).href;
}

function main(): void {
	const options = parseCli(process.argv.slice(2));
	if (!options) {
		printHelp();
		return;
	}
	const report = reconcileAffiliateReports({
		ga4Csv: readCsv(options.ga4Path),
		mercadoLivreCsv: options.mlPath ? readCsv(options.mlPath) : undefined,
		shopeeCsv: options.shopeePath ? readCsv(options.shopeePath) : undefined,
		from: options.from,
		to: options.to,
	});
	const markdown = renderReconciliationMarkdown(report);
	if (!options.stdoutOnly) {
		mkdirSync(path.dirname(options.outPath), { recursive: true });
		writeFileSync(options.outPath, markdown, 'utf8');
		console.log(`Relatório: ${options.outPath}`);
	}
	console.log(markdown);
}

if (isMainModule()) {
	try {
		main();
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(message);
		process.exitCode = 1;
	}
}
