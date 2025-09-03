# Small Steps - Memento Mori

## Project Purpose
Personal growth and mindful living application focused on building sustainable habits across life domains. Helps users practice "small steps" toward self-improvement through structured reflection, goal tracking, and incremental progress.

**Core Philosophy**: KISS (Keep It Simple, Straightforward) - Clean, minimal code that serves the user's growth journey.

## Architecture Overview
**Domain-First Structure** - Each life domain is self-contained:
- `src/domains/vocation/` - Purpose exploration (Ikigai), goal setting (Ippo)
- `src/domains/balance/` - Health, nutrition, fitness, habits
- `src/domains/stability/` - Financial planning, life foundations
- `src/domains/growth/` - Learning, books, poems, reflection
- `src/domains/curiosity/` - Travel, entertainment, experiments
- `src/domains/pisicuta/` - Personal tech tracking (protected)

## Tech Stack
- **Frontend**: Vue 3 Composition API, Vue Router 4
- **Styling**: Bootstrap 5 + Custom SCSS, Bootstrap Icons
- **Backend**: Supabase (auth + data persistence)
- **Build**: Vite with hot reload
- **Testing**: Vitest + Node test runner
- **Maps**: Leaflet for destinations
- **State**: Composables over Pinia (simpler)

## Development Commands
- `npm start` - Start dev server (port 8080)
- `npm run build` - Build for production
- `npm run lint` - ESLint check
- `npm run fix` - Auto-fix linting + formatting
- `npm test` - Run all tests + linting
- `npm run deploy` - Deploy to GitHub Pages

## Code Principles (KISS)
1. **Composables over stores** - Use `use*` pattern for business logic
2. **Template-driven development** - Reuse `Article.vue`, `Suggestions.vue` templates
3. **File-based routing** - Routes defined in `src/core/navigation/routes.js`
4. **Domain independence** - Each domain exports its own routes/composables
5. **Authentication by metadata** - `requiresAuth: true` in route meta
6. **Bootstrap-first styling** - Custom SCSS only when necessary

## File Structure
```
src/
├── core/                  # Authentication, routing, config
│   ├── auth/             # Supabase auth + route guards
│   ├── navigation/       # Centralized routing
│   └── config/           # Environment + service setup
├── domains/              # Feature domains (self-contained)
│   ├── vocation/         # Purpose, goals, Ikigai
│   ├── balance/          # Health, habits, nutrition
│   ├── growth/           # Learning, books, reflection
│   └── [domain]/         # Each domain: components + routes + logic
├── shared/               # Reusable templates + utilities
│   ├── components/ui/    # Article, Suggestions, Actions templates
│   ├── composables/      # Shared business logic
│   └── utils/            # Pure utility functions
└── App.vue               # Root shell + auth modal
```

## Best Practices
- **Always use templates first** - Check `src/shared/components/ui/templates/`
- **Keep components simple** - Single responsibility, minimal props
- **Composables for logic** - Extract business logic from components
- **Bootstrap utilities** - Avoid custom CSS unless absolutely needed
- **Authentication patterns** - Use `requiresAuth` meta + centralized guards
- **Testing mindset** - Write tests that verify user value, not implementation
- **Commit atomically** - One logical change per commit

## Testing Strategy
- **Component tests** (Vitest) - User interactions, props, events
- **Domain tests** (Node) - Business logic, composables, utilities
- **E2E tests** (Playwright) - Critical user flows
- **Run `npm test`** before any commit

## Common Patterns
1. **New domain**: Create `src/domains/[name]/` + export routes
2. **New component**: Check templates first, use Composition API
3. **New feature**: Add to existing domain or create minimal new one
4. **Authentication**: Add `requiresAuth: true` to route meta
5. **Data fetching**: Use `useSupabaseResource` composable pattern
- to memorize

## Assistant Operating Mode
- Plan-first: propose 3–6 concise steps; confirm before destructive or sweeping changes.
- Scope control: keep diffs minimal; avoid unrelated edits; prefer small, composable functions.
- Quality gates (before Done):
  - `npm run format:check` && `npm run lint:check`
  - `npm test` (or targeted `vitest run --dir tests/<area>`) 
  - Build sanity: `npm run build` when routing/config changes
- Safety:
  - Never print or commit env secrets
  - No external network calls beyond the toolchain; prefer local mocks in tests

## Boundaries & Imports
- Domains → Shared (OK). Domains → Core (routing types/config OK). Avoid deep Core internals.
- Core → Shared (OK). Core must not import Domains.
- Shared must never import Domains. Shared → Core only for config/adapters (e.g., `core/config/supabase`).

## Routing & Meta Conventions
- Centralize routes in `src/core/navigation/routes.js`.
- Every route sets:
  - `meta.navLabel`, `meta.navGroup`, `meta.icon`, `meta.requiresAuth`
- Protected sections: set `requiresAuth: true`; guard emits `auth-required`.

## Testing Runner Selection
- Default: Vitest (jsdom). Use Node env for pure utilities (add `// @vitest-environment node`).
- Structure for new tests: `tests/components`, `tests/domains`, `tests/shared`.
- Legacy: `tests/core` contains Node runner/old paths; migrate to Vitest when touching those files.
- Targeted commands:
  - Components: `vitest run --dir tests/components`
  - Domains:   `vitest run --dir tests/domains`
  - Shared:    `vitest run --dir tests/shared`
  - E2E:       `npm run test:e2e`

## Supabase Mocking & Secrets
- Unit tests should not hit real Supabase. Stub the client or use `useSupabaseResource` with fake handlers.
- Required env vars:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_APP_PASSWORD`
- Keep `.env*` untracked; never echo or log secrets in code/tests/CI.

## Quality Checklist
- Small, pure functions; clear names; no dead code.
- Use shared templates (Article/MarkdownArticle/Actions) before custom components.
- Bootstrap utilities first; minimize custom SCSS and scope it when needed.
- Add/adjust tests for new behavior; cover edge cases (dates, auth, routing).
- Update README/docs/CONTEXT when structure or behavior changes.

## Task Request Template
- Context: (what/why, files/areas)
- Goal: (desired outcome)
- Non-goals: (explicitly out of scope)
- Acceptance criteria: (observable checks)
- Affected files/dirs: (paths)
- Constraints: (no new deps, no API changes, etc.)
- Tests: (what to add/update and where)

## Feature Scaffold Template
- Create: `src/domains/<name>/<Name>.vue` (script setup, minimal state)
- Optional: `src/domains/<name>/suggestions.json` or local JSON data
- Wire route: add entry in `src/core/navigation/routes.js` with meta fields
- Tests:
  - Component: `tests/domains/<name>/<name>.test.js`
  - Shared logic: `tests/shared/...` with node/jsdom env as appropriate

## Accessibility & UX
- Use semantic HTML; label form controls; ensure focus states are visible.
- Provide `alt` text for images; prefer button semantics for actions.
- E2E a11y smoke: `npm run test:e2e` (axe) for critical flows when UI changes.

## Commit & PR Guidelines
- One logical change per commit; imperative subject (≤ 72 chars).
- PR includes: summary, scope, screenshots (UI), test notes, and risk.
- Must pass: format, lint, tests; build when routing/config changed.

## Command Cheatsheet
- Dev:     `npm start` (port 8080)
- Build:   `npm run build` ; Preview: `npm run preview`
- Lint:    `npm run lint:check` ; Fix: `npm run lint:fix`
- Format:  `npm run format:check` ; Write: `npm run format`
- Unit:    `npm test` (or targeted `vitest run --dir tests/<area>`) 
- E2E:     `npm run test:e2e`
- Deploy:  `npm run deploy`
