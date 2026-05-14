/**
 * Contacto e redes oficiais — fonte única para footer, /contato e metadados.
 *
 * **E-mail:** em produção na Vercel, pode definir-se `PUBLIC_CONTACT_EMAIL` (env público Astro)
 * para alterar sem novo deploy de código; se vazio, usa `DEFAULT_CONTACT_EMAIL`.
 *
 * **YouTube:** URL canónica do @handle, sem `?si=` (parâmetros de partilha mudam e não devem ir no site).
 */
export const DEFAULT_CONTACT_EMAIL = 'casapraticaeletro@gmail.com';

/** Canal oficial (@casapraticaeletro), HTTPS + www, sem query string. */
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@casapraticaeletro';

export function getPublicContactEmail(): string {
	return import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
}
