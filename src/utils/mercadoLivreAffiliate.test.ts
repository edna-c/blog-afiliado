import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
	classifyMercadoLivreAffiliate,
	hasMercadoLivreSocialPath,
} from './mercadoLivreAffiliate.ts';

describe('classifyMercadoLivreAffiliate', () => {
	it('confirma afiliado quando generatedByPanel = true', () => {
		const result = classifyMercadoLivreAffiliate(
			'https://www.mercadolivre.com.br/fogo-consul/p/MLB123',
			{ generatedByPanel: true },
		);
		assert.deepEqual(result, { isAffiliate: true, confidence: 'high' });
	});

	it('confirma afiliado quando a URL tem caminho /social/', () => {
		const result = classifyMercadoLivreAffiliate(
			'https://www.mercadolivre.com.br/social/loja-afiliado/item',
		);
		assert.deepEqual(result, { isAffiliate: true, confidence: 'high' });
	});

	it('confirma afiliado se painel e /social/ estiverem presentes', () => {
		const result = classifyMercadoLivreAffiliate(
			'https://www.mercadolivre.com.br/social/vitrine/produto',
			{ generatedByPanel: true },
		);
		assert.deepEqual(result, { isAffiliate: true, confidence: 'high' });
	});

	it('não usa matt_tool como prova de afiliado', () => {
		const result = classifyMercadoLivreAffiliate(
			'https://www.mercadolivre.com.br/fogo/p/MLB1?matt_tool=38524122',
		);
		assert.deepEqual(result, { isAffiliate: false, confidence: 'none' });
	});

	it('não usa matt_word, matt_source nem utm_*', () => {
		const result = classifyMercadoLivreAffiliate(
			'https://www.mercadolivre.com.br/fogo/p/MLB1?matt_word=x&matt_source=y&utm_source=aff&utm_medium=cpc',
		);
		assert.deepEqual(result, { isAffiliate: false, confidence: 'none' });
	});

	it('não usa caminho /sec/ como prova de afiliado', () => {
		const result = classifyMercadoLivreAffiliate(
			'https://www.mercadolivre.com.br/sec/abc123',
		);
		assert.deepEqual(result, { isAffiliate: false, confidence: 'none' });
	});

	it('URL de produto sem metadado e sem /social/ → não afiliado', () => {
		const result = classifyMercadoLivreAffiliate(
			'https://www.mercadolivre.com.br/fogo-consul-4-bocas-inox-mesa-de-vidro-cfo4var/p/MLB7939151',
		);
		assert.deepEqual(result, { isAffiliate: false, confidence: 'none' });
	});

	it('short link meli.la sem painel e sem /social/ → não afiliado', () => {
		const result = classifyMercadoLivreAffiliate('https://meli.la/2BvbH5s');
		assert.deepEqual(result, { isAffiliate: false, confidence: 'none' });
	});

	it('generatedByPanel false explícito não confirma afiliado', () => {
		const result = classifyMercadoLivreAffiliate(
			'https://www.mercadolivre.com.br/fogo/p/MLB1?matt_tool=1',
			{ generatedByPanel: false },
		);
		assert.deepEqual(result, { isAffiliate: false, confidence: 'none' });
	});

	it('URL inválida → não afiliado', () => {
		assert.deepEqual(classifyMercadoLivreAffiliate('not-a-url'), {
			isAffiliate: false,
			confidence: 'none',
		});
	});

	it('domínio alheio com /social/ → não afiliado (não é Mercado Livre)', () => {
		const result = classifyMercadoLivreAffiliate('https://example.com/social/loja');
		assert.deepEqual(result, { isAffiliate: false, confidence: 'none' });
	});
});

describe('hasMercadoLivreSocialPath', () => {
	it('detecta /social/ em hostname mercadolivre', () => {
		assert.equal(
			hasMercadoLivreSocialPath('https://produto.mercadolivre.com.br/social/x'),
			true,
		);
	});

	it('ignora querystring com a palavra social', () => {
		assert.equal(
			hasMercadoLivreSocialPath('https://www.mercadolivre.com.br/p/MLB1?ref=social'),
			false,
		);
	});
});
