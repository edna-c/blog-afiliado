/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	/** E-mail exibido em /contato e `mailto:`; opcional na Vercel (Project → Settings → Environment Variables). */
	readonly PUBLIC_CONTACT_EMAIL?: string;
}
