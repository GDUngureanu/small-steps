const get = (key) =>
  (import.meta && import.meta.env && import.meta.env[key]) ??
  (typeof process !== 'undefined' && process.env ? process.env[key] : undefined);

export default Object.freeze({
  VITE_SUPABASE_URL: get('VITE_SUPABASE_URL'),
  VITE_SUPABASE_ANON_KEY: get('VITE_SUPABASE_ANON_KEY'),
  VITE_APP_PASSWORD: get('VITE_APP_PASSWORD'),
});
