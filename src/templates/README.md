# Templates

Shared Vue components that act as structural layouts for feature sections. They
provide consistent markup for lists, articles and suggestions so feature modules
only worry about content.

## Local Development

Templates are imported by feature modules and require no special setup beyond
the standard dev server:

```sh
npm start
```

## Entry Points

- `article.vue` – basic article layout with title and metadata slots
- `actions.vue` – wrapper around the `useActions` composable rendering an action list by ID
- `suggestions.vue` – renders a checklist from JSON data
