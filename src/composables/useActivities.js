// =====================================================
// Activities Composable - Phase 2 Data Layer
// =====================================================

import { ref, computed, reactive } from 'vue'
import { supabase } from '@/configuration/supabase.js'
import { useSupabaseResource } from './useSupabaseResource.js'

// Global state for activities
const activities = ref([])
const loading = ref(false)
const error = ref(null)

// Session overrides for optimistic updates
const sessionOverrides = reactive(new Map())

/**
 * Composable for managing habit activities with Supabase
 * @returns {Object} Activities data and methods
 */
export function useActivities() {
  /**
   * Load activities from Supabase
   * @returns {Promise<boolean>} Success status
   */
  async function loadActivities() {
    if (loading.value) return false

    try {
      loading.value = true
      error.value = null

      const { data, error: supabaseError } = await supabase.from('habit_activities').select('*').order('period_key')

      if (supabaseError) {
        throw supabaseError
      }

      // Transform to match existing JSON structure
      activities.value = data.map((activity) => ({
        habitId: activity.habit_id,
        periodKey: activity.period_key,
      }))

      return true
    } catch (err) {
      // console.error('Error loading activities:', err)
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Set activity status (create/delete based on done flag)
   * @param {string} habitId - Habit ID
   * @param {string} periodKey - Period key (YYYY-MM-DD, YYYY-Www, etc.)
   * @param {boolean} done - true to mark activity as done
   * @returns {Promise<boolean>} Success status
   */
  async function setActivityStatus(habitId, periodKey, done) {
    const key = `${habitId}|${periodKey}`
    const currentStatus = isActivityDone(habitId, periodKey)

    // Only proceed if status changes
    if (currentStatus === done) {
      return true
    }

    try {
      // Optimistic update
      sessionOverrides.set(key, done ? 'done' : 'undone')

      if (done) {
        // Upsert activity
        const { error: supabaseError } = await supabase
          .from('habit_activities')
          .upsert([
            {
              habit_id: habitId,
              period_key: periodKey,
            },
          ])

        if (supabaseError) {
          throw supabaseError
        }

        // Add to local state
        if (!activities.value.find((a) => a.habitId === habitId && a.periodKey === periodKey)) {
          activities.value.push({ habitId, periodKey })
        }
      } else {
        // Delete activity
        const { error: supabaseError } = await supabase
          .from('habit_activities')
          .delete()
          .eq('habit_id', habitId)
          .eq('period_key', periodKey)

        if (supabaseError) {
          throw supabaseError
        }

        // Remove from local state
        const index = activities.value.findIndex((a) => a.habitId === habitId && a.periodKey === periodKey)
        if (index >= 0) {
          activities.value.splice(index, 1)
        }
      }

      // Clear optimistic update
      sessionOverrides.delete(key)
      return true
    } catch (err) {
      error.value = err.message

      // Revert optimistic update
      sessionOverrides.delete(key)
      return false
    }
  }

  /**
   * Check if activity is done (with session overrides)
   * @param {string} habitId - Habit ID
   * @param {string} periodKey - Period key
   * @returns {boolean} Whether activity is done
   */
  function isActivityDone(habitId, periodKey) {
    const key = `${habitId}|${periodKey}`

    // Check session overrides first
    if (sessionOverrides.has(key)) {
      return sessionOverrides.get(key) === 'done'
    }

    // Check actual data
    return activities.value.some((activity) => activity.habitId === habitId && activity.periodKey === periodKey)
  }

  /**
   * Get period keys for a specific habit (for streak calculation)
   * @param {string} habitId - Habit ID
   * @returns {string[]} Array of period keys
   */
  function getKeysForHabit(habitId) {
    const keys = []

    // Get keys from actual data
    activities.value.forEach((activity) => {
      if (activity.habitId === habitId) {
        keys.push(activity.periodKey)
      }
    })

    // Apply session overrides
    sessionOverrides.forEach((value, key) => {
      const [overrideHabitId, periodKey] = key.split('|')
      if (overrideHabitId === habitId) {
        if (value === 'done' && !keys.includes(periodKey)) {
          keys.push(periodKey)
        } else if (value === 'undone') {
          const index = keys.indexOf(periodKey)
          if (index >= 0) {
            keys.splice(index, 1)
          }
        }
      }
    })

    return keys
  }

  /**
   * Get activities compatible with existing JSON structure
   * @returns {Object} Activities data in JSON format
   */
  const activitiesData = computed(() => ({
    version: '1.0',
    activities: activities.value,
  }))

  /**
   * Create activities map for existing code compatibility
   * @returns {Map} Map of activity keys to boolean
   */
  const activitiesMap = computed(() => {
    const map = new Map()

    activities.value.forEach((activity) => {
      const key = `${activity.habitId}|${activity.periodKey}`
      map.set(key, true)
    })

    // Apply session overrides
    sessionOverrides.forEach((value, key) => {
      if (value === 'done') {
        map.set(key, true)
      } else if (value === 'undone') {
        map.delete(key)
      }
    })

    return map
  })

  function handleActivitiesChange(payload) {
    switch (payload.eventType) {
      case 'INSERT': {
        const newActivity = {
          habitId: payload.new.habit_id,
          periodKey: payload.new.period_key,
        }
        if (!activities.value.find((a) => a.habitId === newActivity.habitId && a.periodKey === newActivity.periodKey)) {
          activities.value.push(newActivity)
        }
        break
      }

      case 'DELETE': {
        const deleteIndex = activities.value.findIndex(
          (a) => a.habitId === payload.old.habit_id && a.periodKey === payload.old.period_key
        )
        if (deleteIndex >= 0) {
          activities.value.splice(deleteIndex, 1)
        }
        break
      }
    }
  }

  const { initialize: resourceInitialize, cleanup: resourceCleanup } = useSupabaseResource(
    'habit_activities',
    loadActivities,
    handleActivitiesChange
  )

  function cleanup() {
    resourceCleanup()
    sessionOverrides.clear()
  }

  // Auto-initialize when composable is used
  resourceInitialize()

  return {
    // Data
    activities,
    activitiesData,
    activitiesMap,
    sessionOverrides,
    loading,
    error,

    // Methods
    loadActivities,
    setActivityStatus,
    isActivityDone,
    getKeysForHabit,
    initialize: resourceInitialize,
    cleanup,
  }
}
