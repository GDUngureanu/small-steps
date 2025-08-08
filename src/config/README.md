# Config

Centralised configuration and third‑party clients.

## Supabase

`supabase.js` initialises the Supabase client using environment variables:

- `VITE_SUPABASE_URL` – project URL
- `VITE_SUPABASE_ANON_KEY` – public anon key

The exported `supabase` instance is used by composables such as `useActions`
to perform database reads/writes.

## Local Development

Create a `.env` file with the variables above and start the dev server:

```sh
npm start
```

## Entry Points

Import from this directory when a component or composable needs to talk to
external services or shared configuration.
