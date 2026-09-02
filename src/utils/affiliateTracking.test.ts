import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
	affiliateLinkAttrs,
	isProductId,
	mlAffiliateAttrs,
	normalizePathname,
	resolvePageType,
	shopeeAffiliateAttrs,
} from './affiliateTracking.ts';

describe('resolvePageType', () => {
	it('mapeia taxonomia P0', () => {
		assert.equal(resolvePageType('/'), 'home');
		assert.equal(resolvePageType('/melhores/'), 'hub');
		assert.equal(resolvePageType('/melhores/melhor-fogao-5-bocas/'), 'ranking');
		assert.equal(resolvePageType('/melhores/melhor-fogao-5-bocas'), 'ranking');
		assert.equal(resolvePageType('/review-fogao-5-bocas-brastemp/'), 'review');
		assert.equal(resolvePageType('/brastemp-bfs5ncr-vale-a-pena/'), 'review');
		assert.equal(resolvePageType('/comparativo-fogao-4-vs-5-bocas/'), 'comparison');
		assert.equal(resolvePageType('/como-escolher-fogao-5-bocas/'), 'guide');
		assert.equal(resolvePageType('/fogao-5-bocas-custo-beneficio/'), 'guide');
		assert.equal(resolvePageType('/fogao-atlas-e-bom/'), 'guide');
		assert.equal(resolvePageType('/fogao-atlas-e-bom'), 'guide');
		assert.equal(resolvePageType('/sobre/'), 'institutional');
		assert.equal(resolvePageType('/contato/'), 'institutional');
		assert.equal(resolvePageType('/politica-de-afiliados/'), 'institutional');
		assert.equal(resolvePageType('/blog/fogao-4-bocas-ainda-vale-a-pena/'), 'other');
		assert.equal(resolvePageType('/404/'), 'other');
	});
});

describe('normalizePathname', () => {
	it('garante barra final', () => {
		assert.equal(normalizePathname('/melhores'), '/melhores/');
		assert.equal(normalizePathname('/'), '/');
	});
});

describe('isProductId', () => {
	it('aceita chaves do inventário', () => {
		assert.equal(isProductId('brastempBFS5NCR'), true);
		assert.equal(isProductId('electroluxFE5IG'), true);
		assert.equal(isProductId('brastemp'), false);
		assert.equal(isProductId(null), false);
	});
});

describe('affiliateLinkAttrs', () => {
	it('emite contrato data-* P0 sem page_type', () => {
		assert.deepEqual(mlAffiliateAttrs('electroluxFE5IG', 'hero'), {
			'data-product-id': 'electroluxFE5IG',
			'data-merchant': 'mercado_livre',
			'data-cta-type': 'price_check',
			'data-cta-position': 'hero',
		});
		assert.deepEqual(shopeeAffiliateAttrs('brastempBFS5NCR', 'product_card'), {
			'data-product-id': 'brastempBFS5NCR',
			'data-merchant': 'shopee',
			'data-cta-type': 'merchant_secondary',
			'data-cta-position': 'product_card',
		});
		const attrs = affiliateLinkAttrs({
			productId: 'consulCFS5NAB',
			merchant: 'mercado_livre',
			ctaType: 'price_check',
			ctaPosition: 'comparison_table',
		});
		assert.equal(Object.keys(attrs).includes('data-page-type'), false);
	});
});
