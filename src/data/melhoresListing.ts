/**
 * Listagem de Guias de Compra (`/melhores/`).
 *
 * Ids em `MELHORES_CARD_ONLY_IDS` existem só como card (sem rota própria).
 * O guia de fogão 5 bocas tem rota própria. `FOGAO_5_BOCAS_RANKING_HREF` permanece
 * apenas para páginas que ainda apontam a âncora antiga da Home; a vitrine e o card
 * do guia usam `/melhores/melhor-fogao-5-bocas/`.
 */
export const FOGAO_5_BOCAS_GUIDE_HREF = '/melhores/melhor-fogao-5-bocas/';

export const FOGAO_5_BOCAS_RANKING_HREF = '/#top-produtos';

export const MELHORES_CARD_ONLY_IDS = [] as const;

export const MELHORES_HREF_OVERRIDES: Record<string, string> = {};

export function isRoutedMelhoresGuide(id: string): boolean {
	return !id.startsWith('_') && !(MELHORES_CARD_ONLY_IDS as readonly string[]).includes(id);
}

export function melhoresGuideHref(id: string): string {
	return MELHORES_HREF_OVERRIDES[id] ?? `/melhores/${id}/`;
}
