import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://casapraticaeletro.com.br',
  integrations: [sitemap()],
  output: 'static', // 👈 ESSENCIAL
  vite: {
    plugins: [tailwindcss()],
  },
});