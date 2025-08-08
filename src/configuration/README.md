# Configuration

Centralised configuration and third‑party clients.

## Supabase

`supabase.js` initialises the Supabase client using environment variables:

- `VITE_SUPABASE_URL` – project URL
- `VITE_SUPABASE_ANON_KEY` – public anon key

The exported `supabase` instance is used by composables for authentication and data management.

## Authentication

The `authentication/` directory contains the complete authentication system:

- `useAuthentication.js` - Core authentication logic and password validation
- `authenticationEvents.js` - Event system for authentication state management  
- `components/PasswordModal.vue` - Password input modal component

## Router and Routes

- `router.js` - Vue Router factory with authentication guards
- `routes.js` - Route definitions with lazy-loaded components

## Local Development

Create a `.env` file with the variables above and start the dev server:

```sh
npm start
```

## Entry Points

Import from this directory when a component or composable needs to talk to
external services or shared configuration.