import type { CollectedPage, MarketplaceId, PageSignals } from '../types/index.ts';

/**
 * Contrato de collector por marketplace.
 * Novos marketplaces = nova implementação + registro no marketplace registry.
 */
export type MarketplaceCollector = {
	readonly marketplace: MarketplaceId;
	canHandle(url: string): boolean;
	collect(
		url: string,
		options?: { timeoutMs?: number; retries?: number },
	): Promise<CollectedPage>;
};

export { EMPTY_SIGNALS, includesAny } from '../utils/page-signals.ts';
export type { PageSignals };
