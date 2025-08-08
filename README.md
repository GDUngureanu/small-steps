# Small Steps - Memento Mori

A Vue 3 single-page application that serves as a personal passion project focused on mindful living and personal growth.

## Features

- Interactive checklists and suggestions for various life areas
- Multiple sections: Home, Ikigai, Ippo, Literature (Books, Poems), Entertainment (Anime, Movies), Nutrition, Adventure, Practice, Experiments, and Random
- Password-protected sections for personal content
- Responsive design using Bootstrap 5.3+
- Client-side routing with Vue Router
- GitHub Pages deployment ready

## Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **Routing**: Vue Router 4
- **Styling**: Bootstrap 5.3+ with custom SCSS
- **Build Tool**: Vite
- **Backend**: Supabase (for authentication and data)
- **Icons**: Bootstrap Icons
- **Maps**: Leaflet

## Quick Start

```sh
# Install dependencies
npm install

# Start development server (port 8080)
npm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 8080 |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build on port 4173 |
| `npm run lint` | Run ESLint on .vue, .js files |
| `npm run fix` | Fix linting issues automatically |
| `npm run test` | Run Node.js unit tests with coverage + ESLint |
| `npm run deploy` | Deploy to GitHub Pages |

## Project Structure

```
src/
├── components/           # Page components organized by feature
├── templates/           # Reusable templates (article.vue, suggestions.vue)
├── scss/               # Custom Bootstrap styling
├── application.vue     # Root component
└── main.js            # Application entry point
```

## Development

The application uses Vue 3's Composition API and follows component-based architecture. Each page section is organized in `src/components/[name]/` with:

- `template.vue` - Main component template
- `suggestions.json` - Interactive checklist data (where applicable)

## Deployment

The app is configured for GitHub Pages deployment:

```sh
npm run deploy
```

This builds the project and deploys it to the `gh-pages` branch.

## Documentation

- **Project documentation**: Available in the [`docs/`](docs) directory
- **Component documentation**: Per-module `README.md` files in `src/components/`
- **Development guidelines**: See `CLAUDE.md` for detailed development instructions

## Authentication

Some sections require password authentication:
- `/experiments` - Personal experiments and projects
- `/practice` - Personal routines and habits tracking

Authentication is handled via Supabase integration.

## Testing

The project uses Node.js built-in test runner:
- Unit tests: Located in `/tests` directory
- Coverage reporting: Enabled via `--experimental-test-coverage`
- Test files: Follow `.test.js` and `.spec.js` naming conventions

## License

MIT
