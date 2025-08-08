/* global process */
import { createClient } from '@supabase/supabase-js';

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
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
