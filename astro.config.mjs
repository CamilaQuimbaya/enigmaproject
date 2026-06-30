// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://enigmaenterprisesllc.org',
  // híbrido: todas las páginas siguen siendo estáticas; solo los endpoints
  // marcados con `prerender = false` (ej. /api/contact) corren en el servidor.
  output: 'hybrid',
  adapter: vercel(),
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
});
