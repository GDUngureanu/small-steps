const importMetaEnv = import.meta?.env ?? {}
const processEnv = globalThis.process?.env ?? {}

const {
  VITE_APP_PASSWORD,
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY,
} = { ...processEnv, ...importMetaEnv }

export const env = Object.freeze({
  VITE_APP_PASSWORD,
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY,
})

export { VITE_APP_PASSWORD, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY }
