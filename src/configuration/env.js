export const env = {
  getViteAppPassword: () => import.meta.env?.VITE_APP_PASSWORD ?? globalThis.process?.env?.VITE_APP_PASSWORD,
  getViteSupabaseUrl: () => import.meta.env?.VITE_SUPABASE_URL ?? globalThis.process?.env?.VITE_SUPABASE_URL,
  getViteSupabaseAnonKey: () => import.meta.env?.VITE_SUPABASE_ANON_KEY ?? globalThis.process?.env?.VITE_SUPABASE_ANON_KEY,
}

export const { getViteAppPassword, getViteSupabaseUrl, getViteSupabaseAnonKey } = env
