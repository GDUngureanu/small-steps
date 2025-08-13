# Small Steps - Memento Mori

A Vue 3 single-page application that serves as a personal passion project focused on mindful living and personal growth.

## Features

- Interactive checklists and suggestions for various life areas
- Multiple sections: Home, Ikigai, Ippo, Literature (Books, Poems), Entertainment (Anime, Movies), Nutrition, Adventure, Habit, Experiments, and Random
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

1. **Install Node.js** – this project is tested with Node 20+. Earlier versions
   may not support the tooling used here.
2. **Install dependencies**:

   ```sh
   npm install
   ```
3. **Add environment variables** – create a `.env` file in the project root
   with your Supabase credentials:

   ```
   VITE_SUPABASE_URL=<your-project-url>
   VITE_SUPABASE_ANON_KEY=<your-public-anon-key>
   ```

   A sample file is not provided and the process for obtaining these values is
   currently undocumented. Ask a maintainer for the correct values or use your
   own Supabase project.
4. **Start the development server** (port 8080):

   ```sh
   npm start
   ```
5. **Run the tests** to confirm your setup:

   ```sh
   npm test
   ```

## Available Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm start`       | Start development server on port 8080         |
| `npm run build`   | Build for production (outputs to `dist/`)     |
| `npm run preview` | Preview production build on port 4173         |
| `npm run lint`    | Run ESLint on .vue, .js files                 |
| `npm run fix`     | Fix linting issues automatically              |
| `npm run test`    | Run unit tests and linter                     |
| `npm run deploy`  | Deploy to GitHub Pages                        |

## Project Structure

```
src/
├── components/       # Page components organized by feature
├── composables/      # Reusable logic
├── configuration/    # Environment setup and clients
├── content/          # Static content and JSON data
├── pages/            # Route-level views
├── scss/             # Custom Bootstrap styling
├── App.vue           # Root component
└── main.js           # Application entry point
```

## Development

The application uses Vue 3's Composition API and follows component-based architecture. Each page section is organized in `src/components/[name]/` with:

- `ComponentName.vue` - Main component
- `suggestions.json` - Interactive checklist data (where applicable)

## Deployment

The app is configured for GitHub Pages deployment:

```sh
npm run deploy
```

This builds the project and deploys it to the `gh-pages` branch.

## Documentation

Complete project documentation is organized in the [`docs/`](docs/README.md) directory:

- [Overview](docs/overview.md)
- [Glossary](docs/glossary.md)
- [Code Map](docs/codemap.md)
- [Configuration](docs/configuration.md)
- [SCSS](docs/scss.md)
- [Testing](docs/testing.md)
- Components
  - [Overview](docs/components/README.md)
  - [Navigation](docs/components/layout/navigation.md)
  - [Header](docs/components/layout/header.md)
  - [Footer](docs/components/layout/footer.md)
  - [Templates](docs/components/shared/templates.md)

## Authentication

Some sections require password authentication:

- `/experiments` - Personal experiments and projects
- `/habit` - Personal habit tracking

Authentication is handled via Supabase integration. The setup process for the
required Supabase tables and initial passwords is not currently documented, so
new contributors should check with a maintainer for the correct configuration.

## Testing

The project mixes two testing tools:

- **Vitest** drives component and page tests in a simulated browser
  environment.
- **Node's built-in test runner** handles composables and router logic, with
  coverage enabled via `--experimental-test-coverage`.

Run all tests and linting with:

```sh
npm test
```

See [docs/testing.md](docs/testing.md) for a breakdown of the test folders and
commands. The reason for using two different runners is not documented; ask a
maintainer if you are unsure about the current strategy.

## License

MIT
