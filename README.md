# Valet — Landing Page

Marketing site for **Valet**, a non-custodial Bitcoin Lightning wallet for Android
built on the IMMORTAN library. Static site built with [Astro](https://astro.build).

## Design principle: content / code separation

All human-readable copy lives in `src/data/*.ts`. Components in `src/components/`
contain only structure, layout, and SVG — no prose. To change wording, edit the
data files; you never need to touch a component.

```
src/
├── data/                 ← ALL copy lives here
│   ├── site.ts           ← nav links, footer columns, legal text
│   ├── hero.ts           ← headline, lede, CTA labels, phone manifest
│   ├── sovereignty.ts    ← comparison grid cells
│   ├── features.ts       ← feature cards + channel-viz data
│   ├── faq.ts            ← Q&A pairs
│   └── opensource.ts     ← stats, CTA labels, terminal lines
├── components/           ← structure + SVG only
├── layouts/
│   └── BaseLayout.astro  ← <html>, fonts, theme init, SVG defs
├── pages/
│   └── index.astro       ← composes the page
└── styles/
    └── global.css        ← all styles + the three color schemes
```

## Develop

Requires Node 20 (see `.nvmrc`).

```bash
npm install
npm run dev        # local dev server
npm run check      # astro check (TypeScript)
npm run build      # production build → dist/
npm run preview    # serve the built site
```

## Theming

Three color schemes — **Parchment** (default), **Modern**, **Dark** — selectable
from the switcher in the nav. The choice is stored in `localStorage` and applied
before first paint (inline script in `BaseLayout.astro`) to avoid a flash. Schemes
are defined as CSS custom properties under `[data-scheme]` in `global.css`.

## CI/CD

`.github/workflows/ci.yml` runs on every push and PR to `main`/`master`:

1. `npm ci`
2. `npx astro check` — catches TypeScript / template type errors
3. `npm run build` — catches broken imports and build failures

## Deploy — Cloudflare Pages

Connect the repository in the Cloudflare Pages dashboard:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |

No Wrangler config or API secrets are needed — Cloudflare Pages builds and deploys
from the GitHub integration automatically. Every push to `main` ships; pull requests
get preview deployments.

## License

App is GPL-3.0. This marketing site's copy and assets belong to the Valet project.
