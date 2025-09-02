# AGENTS.md — Engineering standards (Small Steps)

You are a senior engineer. Keep it simple (KISS). Prefer small, composable units. Isolate domain logic from frameworks and I/O when practical.

## Principles
- Small, pure functions; fail fast; clear names; no dead code.
- Components stay thin; logic lives in composables/utilities.
- Explicit boundaries between core, domains, and shared; avoid cycles.
- Fewer dependencies; wrap third‑party APIs behind small adapters.
- Always include/update tests with behavior changes.
- Keep diffs minimal and focused.

## Architecture (this repo)
- Folders:
  - `src/core`: cross‑cutting app modules (auth, router, layout, config).
  - `src/domains`: feature verticals (route components, local data/logic).
  - `src/shared`: reusable UI templates, composables, and pure utils.
- Imports (allowed direction):
  - Domains → Shared; Domains → Core (router types/config OK). Avoid deep Core internals.
  - Core → Shared (styles/utilities) OK.
  - Shared → Core only for config/adapters (e.g., `core/config/supabase`). Never import Domains.
  - Never import Domains from Core or Shared.
- Routing: centralize in `src/core/navigation/routes.js`. Use `meta` fields: `navLabel`, `navGroup`, `icon`, `requiresAuth`.
- Access: a simple guard checks `meta.requiresAuth` and emits an auth‑required event.

## Vue/JS conventions
- SFCs: use `<script setup>`; PascalCase component files; kebab-case folders.
- Components: stateless where possible; use props/emits; avoid global state.
- Composables: return state + actions; no direct DOM; inject I/O via params when feasible; handle errors explicitly.
- State: use Pinia for auth and rare cross‑route state; prefer local component state otherwise.
- Supabase: do not call directly from components; use small composables (e.g., `useSupabaseResource`) and `core/config/supabase` client.
- Security: keep secrets in env; never log secrets; allow `v-html` only in controlled Markdown components.
- Styling: prefer Bootstrap utilities; global SCSS in `src/shared/styles/styles.scss`; scope component styles when needed.

## Testing
- Runner: Vitest preferred (jsdom default). For pure node utilities, set node environment.
- Structure: `tests/components`, `tests/domains`, `tests/shared`.
- Coverage: test core logic (auth, route access, utils) and shared templates with shallow mounts where possible.
- Legacy: some tests under `tests/core` may use Node’s runner/old paths; migrate to Vitest when touching them.
- E2E: Playwright + axe for basic a11y checks.

## Tooling
- Format: Prettier (see `.prettierrc`).
- Lint: ESLint 9 + `eslint-plugin-vue` + `eslint-config-prettier` (see `eslint.config.cjs`).
- Commands: `npm run format`, `npm run lint[:fix]`, `npm test`, `npm run build`, `npm start`.
- CI: keep checks green; treat new warnings as errors in changed code.

## Definition of Done
- Formatted and linted; tests added/updated and passing.
- Clear props/events and minimal public API changes.
- No dead code or stray debug logs.
- Docs updated (README/docs/CONTEXT) if behavior or structure changed.

## Change workflow
- New feature: create/extend a domain under `src/domains/<area>`; register in routes with `meta`; add tests; update docs.
- Shared additions: add composables/utils in `src/shared` (framework‑free when possible) and document usage.
- Avoid cross‑domain imports and unnecessary abstractions. Prefer simple, explicit code.
