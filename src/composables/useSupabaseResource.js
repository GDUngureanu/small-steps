import { supabase } from '@/configuration/supabase.js'

/**
 * Generic helper for Supabase-backed resources providing
 * initialization, cleanup and subscription handling.
 *
 * @param {string} tableName - database table to subscribe to
 * @param {Function} loadFn - async function loading initial data
 * @param {Function} changeHandler - callback for realtime changes
 * @returns {{initialize: Function, cleanup: Function}}
 */
export function useSupabaseResource(tableName, loadFn, changeHandler) {
  let subscription = null
  let isInitialized = false

  async function initialize() {
    if (isInitialized) return

    if (loadFn) {
      await loadFn()
    }

    subscription = supabase
      .channel(`${tableName}_changes`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, (payload) => {
        if (changeHandler) {
          changeHandler(payload)
        }
      })
      .subscribe()

    isInitialized = true
  }

  function cleanup() {
    if (subscription) {
      supabase.removeChannel(subscription)
      subscription = null
    }
    isInitialized = false
  }

  return { initialize, cleanup }
}

