import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog-afiliado.vercel.app',
  integrations: [sitemap()],
  output: 'static', // 👈 ESSENCIAL
  vite: {
    plugins: [tailwindcss()],
  },
});