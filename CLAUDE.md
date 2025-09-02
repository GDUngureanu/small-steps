# Small Steps - Memento Mori

## Project Purpose
Personal growth and mindful living application focused on building sustainable habits across life domains. Helps users practice "small steps" toward self-improvement through structured reflection, goal tracking, and incremental progress.

**Core Philosophy**: KISS (Keep It Simple, Straightforward) - Clean, minimal code that serves the user's growth journey.

## Architecture Overview
**Domain-First Structure** - Each life domain is self-contained:
- `src/domains/ambition/` - Purpose exploration (Ikigai), goal setting (Ippo)
- `src/domains/balance/` - Health, nutrition, fitness, habits
- `src/domains/stability/` - Financial planning, life foundations
- `src/domains/growth/` - Learning, books, poems, reflection
- `src/domains/exploration/` - Travel, entertainment, experiments
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
│   ├── ambition/         # Purpose, goals, Ikigai
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