# Accounting firm website

Astro 5, static-first, English + Romanian, Markdown-authored content.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run check    # TypeScript + Astro diagnostics
```

## Folder structure

```
accounting_promoting_webpage/
├── public/                 Served verbatim at the site root. Never processed.
│   ├── images/             og-default.jpg, logo — things referenced by URL
│   ├── fonts/              self-hosted woff2 (faster + GDPR-safer than Google Fonts)
│   └── robots.txt
│
├── src/
│   ├── assets/images/      Images imported into components. Astro optimises,
│   │                       resizes and hashes these — prefer over public/.
│   │
│   ├── components/
│   │   ├── ui/             Dumb primitives: Button, Card, Input, Icon
│   │   ├── sections/       Full page bands: Hero, Services, Testimonials, FAQ, CTA
│   │   ├── layout/         Header, Footer, LanguagePicker
│   │   └── islands/        The only components that ship JavaScript
│   │
│   ├── layouts/            Page shells. BaseLayout owns <head>, SEO, JSON-LD.
│   │
│   ├── content/            Markdown the client can edit without touching code
│   │   ├── blog/en/  blog/ro/
│   │   └── services/en/  services/ro/
│   ├── content.config.ts   Zod schemas — a malformed article fails the build
│   │
│   ├── i18n/
│   │   ├── ui.ts           Every UI string + translated URL slugs
│   │   └── utils.ts        getLangFromUrl, useTranslations, pathFor
│   │
│   ├── lib/                Framework-free helpers
│   │   ├── schema.ts       JSON-LD builders (LocalBusiness, Article)
│   │   └── validation.ts   Shared by the form island AND the API route
│   │
│   ├── data/site.ts        Business details — one place to change the phone number
│   │
│   ├── pages/              File-based routing. This IS the sitemap.
│   │   ├── index.astro           /
│   │   ├── contact.astro         /contact
│   │   ├── blog/index.astro      /blog
│   │   ├── blog/[...slug].astro  /blog/five-deductions...
│   │   ├── api/contact.ts        POST /api/contact  (server-rendered)
│   │   └── ro/                   the same tree, Romanian slugs
│   │
│   └── styles/
│       ├── tokens.css      Colours, type scale, spacing. Change brand here.
│       └── global.css      Reset + layout primitives (.container, .section)
│
├── astro.config.mjs
├── tsconfig.json           Path aliases: @components/*, @i18n/*, @layouts/*
└── .env.example            Copy to .env
```

### Why these boundaries

**`components/ui` vs `components/sections`.** `ui/` pieces know nothing about
accounting — a Button is a Button. `sections/` pieces are page-specific bands
composed of `ui/` pieces. When a marketing request comes in ("move the
testimonials above pricing"), you reorder sections in one page file and touch
nothing else.

**`components/islands` is a separate folder on purpose.** Everything Astro
builds is zero-JS HTML unless a component explicitly opts in. Keeping the
interactive ones in one folder makes the JavaScript budget visible — if that
folder has eight things in it on a brochure site, something has gone wrong.

**`content/` is not `data/`.** `content/` is Markdown, schema-validated,
meant to grow, and editable by a non-developer. `data/site.ts` is a handful
of constants that change once a year.

**`lib/validation.ts` is imported by both the browser and the server.** The
form validates on the client for fast feedback and revalidates on the server
because client validation is a convenience, not a security boundary.

## Internationalisation

English lives at `/`, Romanian at `/ro/`, configured in `astro.config.mjs`.
URL slugs are translated (`/services` vs `/ro/servicii`) via the `routes` map
in `src/i18n/ui.ts` — localised URLs rank better in local search.

Adding a string: add the key to **both** language objects in `ui.ts`.
TypeScript flags the one you forget.

Adding a third language: add it to `languages` + `routes` in `ui.ts`, add the
locale to `astro.config.mjs`, create `src/pages/<lang>/` and
`src/content/blog/<lang>/`.

`BaseLayout` emits `hreflang` tags automatically, so Google treats the two
versions as translations rather than duplicate content.

## Contact form

`src/components/islands/ContactForm.astro` is a real `<form>` that posts to
`/api/contact`. It works without JavaScript; the inline script upgrades it to
async submit with inline validation. It includes a honeypot field for spam.

The API route sets `export const prerender = false`, which needs a server
adapter. Pick one:

```bash
npx astro add netlify     # or: vercel, cloudflare, node
```

**Or skip the server entirely:** delete `src/pages/api/contact.ts`, sign up
for Web3Forms/Formspree, and point the form's `action` at their endpoint. For
a five-page brochure site that is a defensible choice — one fewer moving part.

## Before launch

- [ ] Replace `site` in `astro.config.mjs` and `src/data/site.ts`
- [ ] Replace the palette in `src/styles/tokens.css`
- [ ] Add `public/favicon.svg` and `public/images/og-default.jpg` (1200×630)
- [ ] Update the sitemap URL in `public/robots.txt`
- [ ] Write a real privacy policy — the contact form collects personal data
- [ ] Run Lighthouse; a site like this should score 100 on every axis
