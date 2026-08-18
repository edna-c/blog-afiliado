/**
 * Listagem de Guias de Compra (`/melhores/`).
 *
 * Alguns ids existem só como card (sem artigo/rota própria).
 * Fogão 5 bocas: ranking comercial vive na home.
 */
export const FOGAO_5_BOCAS_RANKING_HREF = '/#top-produtos';

export const MELHORES_CARD_ONLY_IDS = ['melhor-fogao-5-bocas'] as const;

export const MELHORES_HREF_OVERRIDES: Record<string, string> = {
	'melhor-fogao-5-bocas': FOGAO_5_BOCAS_RANKING_HREF,
};

export function isRoutedMelhoresGuide(id: string): boolean {
	return !id.startsWith('_') && !(MELHORES_CARD_ONLY_IDS as readonly string[]).includes(id);
}

export function melhoresGuideHref(id: string): string {
	return MELHORES_HREF_OVERRIDES[id] ?? `/melhores/${id}/`;
}
