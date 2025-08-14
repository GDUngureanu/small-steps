import { createClient } from '@supabase/supabase-js'
import env from './env.js'

// Create and export Supabase client with v2 configuration
export const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // v2 feature for OAuth flows
    storageKey: 'small-steps-key', // Custom storage key for this app
    storage: typeof window !== 'undefined' ? window.sessionStorage : undefined, // Use sessionStorage instead of localStorage
  },
  global: {
    headers: {
      'X-Client-Info': 'small-steps-client',
    },
  },
})
