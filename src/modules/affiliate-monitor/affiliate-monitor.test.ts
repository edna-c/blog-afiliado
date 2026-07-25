import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validateAffiliateLink } from './validators/link-validator.ts';
import { validateProductPresence } from './validators/product-validator.ts';
import { validateStock } from './validators/stock-validator.ts';
import { resolveHealthStatus } from './validators/resolve-status.ts';
import { buildMarketplaceSummaries, formatSummaryText } from './utils/summary.ts';
import { loadAffiliateInventory } from './utils/inventory.ts';
import { detectMarketplaceFromUrl } from './utils/marketplace.ts';
import { computeHealthScore, labelForScore } from './utils/health-score.ts';
import { extractPageTitle } from './utils/title.ts';
import { buildSignals } from './utils/page-signals.ts';
import { listMarketplacePlugins } from './marketplaces/index.ts';
import {
	loadMonitoringPolicy,
	needsStatusConfirmation,
} from './config/monitoring-policy.ts';
import { filterTargetsBySchedule, targetScheduleKey } from './policy/schedule.ts';
import type { CollectedPage, MonitoredProductResult } from './types/index.ts';

const emptyUsage = { articles: [] as string[], components: [] as string[], dataFiles: [] as string[] };

describe('detectMarketplaceFromUrl', () => {
	it('detecta Mercado Livre e Shopee via registry', () => {
		assert.equal(detectMarketplaceFromUrl('https://meli.la/abc'), 'mercadolivre');
		assert.equal(detectMarketplaceFromUrl('https://s.shopee.com.br/abc'), 'shopee');
		assert.equal(detectMarketplaceFromUrl('https://example.com/x'), null);
	});
});

describe('marketplace registry', () => {
	it('expõe plugins sem hardcode no motor', () => {
		const ids = listMarketplacePlugins().map((p) => p.id);
		assert.deepEqual(ids, ['mercadolivre', 'shopee']);
		assert.ok(listMarketplacePlugins().every((p) => p.collector && p.extractLink));
	});
});

describe('extractPageTitle', () => {
	it('prioriza og:title e JSON-LD Product', () => {
		const html = `
			<title>Genérico</title>
			<meta property="og:title" content="Fogão Consul OG" />
			<script type="application/ld+json">{"@type":"Product","name":"Fogão Consul LD"}</script>
		`;
		assert.equal(extractPageTitle(html), 'Fogão Consul OG');
	});
});

describe('buildSignals', () => {
	it('não marca productPresent só com HTTP 200', () => {
		const signals = buildSignals({
			html: '<html><body>shopee home</body></html>',
			finalUrl: 'https://shopee.com.br/',
			httpStatus: 200,
			removedHints: ['produto não encontrado'],
			outOfStockHints: ['esgotado'],
			productHints: ['"itemid"'],
			looksLikeProductUrl: () => false,
			looksLikeIntermediateUrl: () => false,
		});
		assert.equal(signals.productPresent, false);
	});

	it('detecta blocked anti-bot', () => {
		const signals = buildSignals({
			html: '<html>Just a moment... cf-browser-verification</html>',
			finalUrl: 'https://www.mercadolivre.com.br/x',
			httpStatus: 200,
			removedHints: [],
			outOfStockHints: [],
			productHints: [],
			looksLikeProductUrl: () => true,
			looksLikeIntermediateUrl: () => false,
		});
		assert.equal(signals.blocked, true);
		assert.equal(signals.productPresent, false);
	});
});

describe('validateAffiliateLink', () => {
	it('aceita URL válida do marketplace esperado', () => {
		const result = validateAffiliateLink('https://meli.la/31TdeBV', 'mercadolivre');
		assert.equal(result.ok, true);
		assert.equal(result.marketplace, 'mercadolivre');
	});

	it('rejeita URL vazia ou malformada', () => {
		assert.equal(validateAffiliateLink('').ok, false);
		assert.equal(validateAffiliateLink('not-a-url').ok, false);
	});

	it('rejeita host desconhecido', () => {
		const result = validateAffiliateLink('https://amazon.com.br/dp/1');
		assert.equal(result.ok, false);
		assert.match(result.reason ?? '', /marketplace/i);
	});
});

describe('validateProductPresence + validateStock', () => {
	const basePage = (overrides: Partial<CollectedPage> = {}): CollectedPage => ({
		marketplace: 'mercadolivre',
		url: 'https://meli.la/x',
		finalUrl: 'https://www.mercadolivre.com.br/p/MLB1',
		httpStatus: 200,
		fetched: true,
		title: 'Fogão',
		html: '<html></html>',
		error: null,
		signals: {
			removed: false,
			outOfStock: false,
			productPresent: true,
			blocked: false,
			intermediate: false,
		},
		responseTimeMs: 100,
		redirectCount: 1,
		collector: 'mercadolivre',
		...overrides,
	});

	it('marca REMOVIDO quando signals.removed', () => {
		const result = validateProductPresence(
			basePage({
				signals: {
					removed: true,
					outOfStock: false,
					productPresent: false,
					blocked: false,
					intermediate: false,
				},
			}),
		);
		assert.equal(result.status, 'REMOVIDO');
	});

	it('marca ERRO_ACESSO em blocked', () => {
		const result = validateProductPresence(
			basePage({
				signals: {
					removed: false,
					outOfStock: false,
					productPresent: false,
					blocked: true,
					intermediate: false,
				},
			}),
		);
		assert.equal(result.status, 'ERRO_ACESSO');
	});

	it('marca ERRO_ACESSO sem fetch', () => {
		const result = validateProductPresence(
			basePage({ fetched: false, httpStatus: null, error: 'Timeout' }),
		);
		assert.equal(result.status, 'ERRO_ACESSO');
	});

	it('marca SEM_ESTOQUE e OK via stock validator', () => {
		assert.equal(
			validateStock(
				basePage({
					signals: {
						removed: false,
						outOfStock: true,
						productPresent: true,
						blocked: false,
						intermediate: false,
					},
				}),
			).status,
			'SEM_ESTOQUE',
		);
		assert.equal(validateStock(basePage()).status, 'OK');
	});

	it('pipeline resolveHealthStatus prioriza LINK_INVALIDO', () => {
		const result = resolveHealthStatus('https://bad.example/x', 'mercadolivre', null);
		assert.equal(result.status, 'LINK_INVALIDO');
	});
});

describe('inventory + summary + health', () => {
	it('carrega inventário a partir de products.ts via plugins', () => {
		const all = loadAffiliateInventory();
		assert.ok(all.length >= 18);
		assert.ok(all.every((t) => t.url.startsWith('http')));
	});

	it('formata resumo e health score', () => {
		const results: MonitoredProductResult[] = [
			{
				marketplace: 'mercadolivre',
				productId: 'a',
				productName: 'A',
				url: 'https://meli.la/a',
				finalUrl: 'https://mercadolivre.com.br/a',
				status: 'OK',
				httpStatus: 200,
				checkedAt: new Date().toISOString(),
				title: 'A',
				articlesUsingProduct: emptyUsage,
				responseTimeMs: 10,
				redirectCount: 1,
				collector: 'mercadolivre',
				monitorPriority: 'MEDIUM',
				monitorFrequency: 'daily',
				confirmationAttempts: 1,
				statusConfirmed: true,
			},
			{
				marketplace: 'mercadolivre',
				productId: 'b',
				productName: 'B',
				url: 'https://meli.la/b',
				finalUrl: null,
				status: 'REMOVIDO',
				httpStatus: 404,
				checkedAt: new Date().toISOString(),
				title: null,
				articlesUsingProduct: emptyUsage,
				responseTimeMs: 10,
				redirectCount: 0,
				collector: 'mercadolivre',
				monitorPriority: 'MEDIUM',
				monitorFrequency: 'daily',
				confirmationAttempts: 2,
				statusConfirmed: true,
				previousStatus: 'REMOVIDO',
			},
			{
				marketplace: 'shopee',
				productId: 'a',
				productName: 'A',
				url: 'https://s.shopee.com.br/a',
				finalUrl: 'https://shopee.com.br/a',
				status: 'OK',
				httpStatus: 200,
				checkedAt: new Date().toISOString(),
				title: 'A',
				articlesUsingProduct: emptyUsage,
				responseTimeMs: 10,
				redirectCount: 1,
				collector: 'shopee',
				monitorPriority: 'HIGH',
				monitorFrequency: 'every_6h',
				confirmationAttempts: 1,
				statusConfirmed: true,
			},
		];

		const summaries = buildMarketplaceSummaries(results);
		const text = formatSummaryText(summaries);
		assert.match(text, /Mercado Livre/);
		assert.match(text, /2 produtos/);
		assert.match(text, /1 OK/);
		assert.match(text, /1 Removido/);
		assert.match(text, /Shopee/);

		const health = computeHealthScore(results);
		assert.ok(health.score < 100);
		assert.equal(labelForScore(98), 'Excelente');
		assert.equal(labelForScore(60), 'Crítico');
	});
});

describe('monitoring policy + schedule', () => {
	it('marca status que precisam de confirmação', () => {
		const policy = loadMonitoringPolicy({ confirmationEnabled: true });
		assert.equal(needsStatusConfirmation('ERRO_ACESSO', policy), true);
		assert.equal(needsStatusConfirmation('REMOVIDO', policy), true);
		assert.equal(needsStatusConfirmation('OK', policy), false);
		assert.equal(needsStatusConfirmation('SEM_ESTOQUE', policy), false);
	});

	it('anexa prioridade default MEDIUM no inventário', () => {
		const all = loadAffiliateInventory();
		assert.ok(all.every((t) => t.monitorPriority === 'MEDIUM'));
		assert.ok(all.every((t) => t.monitorFrequency === 'daily'));
	});

	it('filtra por prioridade sem alterar o motor', () => {
		const targets = loadAffiliateInventory().map((t, i) =>
			i === 0 ? { ...t, monitorPriority: 'HIGH' as const, monitorFrequency: 'every_6h' as const } : t,
		);
		const highOnly = filterTargetsBySchedule(targets, { priorities: ['HIGH'] });
		assert.equal(highOnly.length, 1);
		assert.equal(highOnly[0]?.monitorPriority, 'HIGH');
	});

	it('respeita frequency quando solicitado', () => {
		const target = loadAffiliateInventory()[0]!;
		const key = targetScheduleKey(target);
		const recent = new Date().toISOString();
		const filtered = filterTargetsBySchedule([target], {
			respectFrequency: true,
			lastCheckedByKey: { [key]: recent },
		});
		assert.equal(filtered.length, 0);

		const stale = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
		const due = filterTargetsBySchedule([target], {
			respectFrequency: true,
			lastCheckedByKey: { [key]: stale },
		});
		assert.equal(due.length, 1);
	});
});
