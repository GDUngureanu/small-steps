# CONTEXT.md — Small Steps

## Purpose
- Personal “Small Steps — Memento Mori” app to support mindful living through incremental progress across life areas.

## Audience
- Primary: maintainer/user (private sections behind a password).
- Secondary: public viewers for open sections.

## Domains
- Vocation: Ikigai (purpose exploration), Ippo (small steps checklist).
- Growth: Books, Poems.
- Curiosity: Anime, Movies, Destinations (map), Random, Experiments (private).
- Health: Nutrition, Fitness, Habits.
- Foundation: Finance.
- Pisicuta: Laptops, Health.
- Home: Landing/overview.

## Access & Security
- Routes gate access using `meta.requiresAuth` in `src/core/navigation/routes.js`.
- Protected examples: Vocation*, Experiments, Pisicuta* (and any route with `requiresAuth: true`).
- Auth mechanism: simple password check via Pinia store (`src/core/auth/useAuthentication.js`) using env var `VITE_APP_PASSWORD`.
- Global event bus (`src/core/auth/authenticationEvents.js`) announces auth requirements.

## Architecture
- Core: auth (Pinia + guard + events), router, layout, configuration (`env`, `supabase`).
- Domains: feature pages and local data (JSON); route components.
- Shared: UI templates (Article, MarkdownArticle, Actions), composables (`useSupabaseResource`, `usePrefetch`), utils (`dateIntervals`, etc.).
- Entry: `src/main.js` mounts Vue app, installs router/Pinia, and global styles.

## Data & Integrations
- Supabase: configured in `src/core/config/supabase.js`; session in `sessionStorage`; env via `src/core/config/env.js`.
- Static data: JSON in domain folders (e.g., `suggestions.json`), research markdown under `public/research/`.
- Maps: Leaflet for Destinations.
- Markdown: `marked` for rendering controlled content.

## Environment
- Required env vars:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_APP_PASSWORD`
- Dev: Node 20+, Vite dev server on port 8080.
- Deploy: GitHub Pages with base `/small-steps/`.

## Testing
- Vitest for unit/component/domain tests (jsdom default). See `package.json` scripts.
- E2E: Playwright with axe for basic accessibility checks.
- Note: legacy Node runner tests may exist under `tests/core`; prefer Vitest for new work and migrate when editing.

## Conventions
- Structure: `src/core`, `src/domains`, `src/shared`.
- Components: `<script setup>`, PascalCase filenames; kebab-case folders inside domains.
- Styling: Bootstrap 5 utilities preferred; shared SCSS in `src/shared/styles/styles.scss`.
- Routing: centralized in `src/core/navigation/routes.js`; add `meta` (`navLabel`, `navGroup`, `icon`, `requiresAuth`).

## Non‑Goals
- No backend beyond Supabase; no SSR; avoid state complexity; keep footprint small.

## Open Questions / Next Steps
- Unify tests under Vitest (migrate `tests/core` where applicable).
- Document Supabase schema/tables for contributors when stabilized.
