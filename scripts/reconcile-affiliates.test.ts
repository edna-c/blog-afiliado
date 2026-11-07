import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
	parseCsv,
	parseFlexibleDate,
	parseFlexibleNumber,
	reconcileAffiliateReports,
	renderReconciliationMarkdown,
} from './reconcile-affiliates.ts';

describe('parseCsv', () => {
	it('aceita ponto e vírgula e aspas', () => {
		const rows = parseCsv('nome;valor\n"Fogão; 5 bocas";12,50\n');
		assert.deepEqual(rows, [
			['nome', 'valor'],
			['Fogão; 5 bocas', '12,50'],
		]);
	});
});

describe('parseFlexibleDate', () => {
	it('normaliza os formatos de export', () => {
		assert.equal(parseFlexibleDate('2026-10-01'), '2026-10-01');
		assert.equal(parseFlexibleDate('01/10/2026 14:00'), '2026-10-01');
		assert.equal(parseFlexibleDate('20261001'), '2026-10-01');
		assert.equal(parseFlexibleDate('ontem'), null);
	});
});

describe('parseFlexibleNumber', () => {
	it('lê real brasileiro e decimal com ponto', () => {
		assert.equal(parseFlexibleNumber('R$ 1.234,50'), 1234.5);
		assert.equal(parseFlexibleNumber('8.00'), 8);
		assert.equal(parseFlexibleNumber(''), 0);
	});
});

describe('reconcileAffiliateReports', () => {
	const ga4Csv = [
		'date,product_id,merchant,clicks,users',
		'2026-10-01,electroluxFE5IG,mercado_livre,10,4',
		'2026-10-02,electroluxFE5IG,mercado_livre,5,2',
		'2026-10-20,electroluxFE5IG,shopee,3,1',
		'2026-09-01,electroluxFE5IG,mercado_livre,99,9',
	].join('\n');

	const mlCsv = [
		'Data;Nome do produto;Comissão;Pedidos',
		'01/10/2026;Fogão Electrolux FE5IG;12,50;1',
		'03/10/2026;Modelo que não está no site;4,00;1',
		'20/10/2026;Fogão Electrolux FE5IG;9,00;1',
	].join('\n');

	const shopeeCsv = [
		'order_date,item_url,commission,orders',
		'2026-10-03,https://s.shopee.com.br/60Rt89HrOg,8.00,1',
	].join('\n');

	it('soma cliques e comissão na janela e separa o que não é do inventário', () => {
		const report = reconcileAffiliateReports({
			ga4Csv,
			mercadoLivreCsv: mlCsv,
			shopeeCsv,
			from: '2026-10-01',
			to: '2026-10-15',
		});
		const ml = report.rows.find(
			(row) => row.productId === 'electroluxFE5IG' && row.merchant === 'mercado_livre',
		);
		const shopee = report.rows.find(
			(row) => row.productId === 'electroluxFE5IG' && row.merchant === 'shopee',
		);
		assert.ok(ml);
		assert.equal(ml.clicks, 15);
		assert.equal(ml.users, 6);
		assert.equal(ml.orders, 1);
		assert.equal(ml.commission, 12.5);
		assert.ok(shopee);
		assert.equal(shopee.clicks, 0);
		assert.equal(shopee.orders, 1);
		assert.equal(shopee.commission, 8);
		assert.equal(report.unmatched.some((row) => row.commission === 4), true);
		assert.equal(report.ignoredOutOfWindow, 3);
	});

	it('escreve a relação clique-comissão no markdown', () => {
		const report = reconcileAffiliateReports({
			ga4Csv,
			mercadoLivreCsv: mlCsv,
			from: '2026-10-01',
			to: '2026-10-02',
		});
		const markdown = renderReconciliationMarkdown(report);
		assert.match(markdown, /Electrolux FE5IG/);
		assert.match(markdown, /Mercado Livre/);
		assert.match(markdown, /12,50/);
		assert.match(markdown, /2026-10-01 a 2026-10-02/);
	});
});
