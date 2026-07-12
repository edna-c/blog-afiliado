/** Palavras por minuto assumidas para leitura editorial em pt-BR. */
const WORDS_PER_MINUTE = 200;

/**
 * Estima o tempo de leitura (em minutos, mínimo 1) a partir do corpo Markdown.
 * Remove frontmatter, sintaxe de imagem/links e marcações para contar apenas o texto.
 */
export function readingMinutes(markdown: string | undefined | null): number {
	if (!markdown) return 1;
	const text = markdown
		.replace(/^---[\s\S]*?---/, '') // frontmatter
		.replace(/```[\s\S]*?```/g, ' ') // blocos de código
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // imagens
		.replace(/\[[^\]]*\]\([^)]*\)/g, ' ') // links
		.replace(/[#>*_`|~-]/g, ' ') // marcações
		.replace(/\s+/g, ' ')
		.trim();
	const words = text ? text.split(' ').length : 0;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Rótulo pronto para UI, ex.: "5 min de leitura". */
export function readingTimeLabel(markdown: string | undefined | null): string {
	return `${readingMinutes(markdown)} min de leitura`;
}
