import { createClient } from '@supabase/supabase-js'
import env from './env.js'

// Ensure a single Supabase client instance across the app and HMR cycles
const SUPABASE_KEY = Symbol.for('small-steps.supabase')

export const supabase =
  globalThis[SUPABASE_KEY] ||
  (globalThis[SUPABASE_KEY] = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'small-steps-key',
      storage: typeof window !== 'undefined' ? window.sessionStorage : undefined,
    },
    global: {
      headers: {
        'X-Client-Info': 'small-steps-client',
      },
    },
  }))

export default supabase
