import { createClient } from '@supabase/supabase-js'
import { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } from './env.js'

/**
 * Initialise and export a configured Supabase client.
 *
 * Reads credentials from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
 * environment variables (supporting both Vite's `import.meta.env` and
 * `process.env`). The function throws during module evaluation if either value
 * is missing so that misconfiguration is surfaced immediately.
 *
 * @returns {import('@supabase/supabase-js').SupabaseClient} ready-to-use client
 */
// Environment variables with fallbacks for development and testing
const supabaseUrl = VITE_SUPABASE_URL
const supabaseKey = VITE_SUPABASE_ANON_KEY

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Create and export Supabase client with v2 configuration
export const supabase = createClient(supabaseUrl, supabaseKey, {
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