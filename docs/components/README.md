# Components

[\u2190 Back to main README](../../README.md)

Feature-oriented Vue components. Each subdirectory (e.g. `ikigai`, `nutrition`)
exposes a PascalCase component file (e.g. `Ikigai.vue`) that is registered with
Vue Router.

### Key directories

- `auth/` \u2013 access modal for gated routes.
- `navigation/`, `header/`, `footer/` \u2013 layout chrome shared across pages.
- Feature pages such as `adventure/`, `entertainment/`, `literature/`, `nutrition/`, `habit/`, `ikigai/`, `ippo/`, `random/` and `home/` each provide a router-mounted component file and optional JSON data files.

## Dependencies

- Vue 3 Composition API
- Bootstrap 5

## Local Development

Components are compiled and hot\u2011reloaded via Vite. Run the application from the repository root:

```sh
npm start
```

## Entry Points

Pages are rendered by these component files. Shared pieces such as headers and navigation live at the top level of this directory.
