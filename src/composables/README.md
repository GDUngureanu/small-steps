# Composables

Reusable logic for Vue components.

## Provided Utilities

### `useAuthentication`

Manages in-memory and `sessionStorage`-backed auth state. Returns reactive
helpers for logging in/out and for building navigation menus.

- **Inputs:** `authenticate(password)` expects the plain-text password.
- **Outputs:** `isAuthenticated` flag and navigation/route guard utilities.

### `useActions`

CRUD layer for action lists stored in Supabase with local caching and
optimistic updates.

- **Inputs:** `listIdRef` (`Ref<string>`) identifying the list to manage.
- **Outputs:** reactive `actions`, computed `rootActions`, and mutation
  functions such as `addAction`, `updateActionStatus`, `updateActionPriority`
  and `deleteAction`.

## Local Development

These modules are plain JavaScript and automatically bundled. No extra build steps are needed beyond running the dev server:

```sh
npm start
```

## Entry Points

Each composable exports a function as its default API. Import them into components as needed.
