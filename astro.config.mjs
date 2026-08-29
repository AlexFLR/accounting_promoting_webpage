import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs, sitemap.xml and Open Graph tags. Change this.
  site: 'https://www.valviocontexpert.ro',

  i18n: {
    // Romanian is the default and sits at the root: it carries essentially all
    // of the search traffic for a Ploiești firm. English is a deliberately
    // partial set under /en/ — only the pages a foreign-owned client needs.
    defaultLocale: 'ro',
    locales: ['ro', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ro',
        locales: { ro: 'ro-RO', en: 'en-GB' },
      },
    }),
  ],

  // Every page is prerendered to static HTML. Only /api/contact opts out,
  // via `export const prerender = false`, which is why an adapter is needed.
  // Swap `node` for netlify/vercel/cloudflare when you pick a host —
  // or drop the adapter entirely and use Web3Forms (see README).
  output: 'static',
  adapter: node({ mode: 'standalone' }),
});
