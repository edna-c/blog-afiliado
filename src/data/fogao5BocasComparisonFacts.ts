/**
 * Fatos verificados dos 3 SKUs do ranking fogão 5 bocas.
 * SSOT único — usado pela tabela factual (guia Melhores e ramo legado Home).
 * Não inventar especificações aqui; só o que já foi confirmado no projeto.
 */
export const fogao5BocasComparisonFacts = {
	electroluxFE5IG: {
		oven: '88,6 L',
		shelves: '2',
		doorGlass: 'removível',
		resources: 'Vapor, cavidade selada e Tripla Chama',
	},
	brastempBFS5NCR: {
		oven: '96 L',
		shelves: '2',
		doorGlass: 'removível',
		resources: 'Forno convencional e 5 bocas',
	},
	consulCFS5NAR: {
		oven: '96 L',
		shelves: '1',
		doorGlass: 'vedado',
		resources: 'Forno convencional e 5 bocas',
	},
} as const;

export type Fogao5BocasFactProductId = keyof typeof fogao5BocasComparisonFacts;

export function getFogao5BocasComparisonFact(productId: string) {
	if (productId in fogao5BocasComparisonFacts) {
		return fogao5BocasComparisonFacts[productId as Fogao5BocasFactProductId];
	}
	return null;
}
