# Templates

[\u2190 Back to main README](../../../README.md) | [Back to Components](../README.md)

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

- `Article.vue` \u2013 basic article layout with title and metadata slots
- `Actions.vue` \u2013 interactive task management template with Supabase integration
- `Suggestions.vue` \u2013 renders a checklist from JSON data
