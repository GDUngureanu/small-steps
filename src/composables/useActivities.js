// =====================================================
// Activities Composable - Phase 2 Data Layer
// =====================================================

import { ref, computed, reactive } from 'vue'
import { supabase } from '@/configuration/supabase.js'

// Global state for activities
const activities = ref([])
const loading = ref(false)
const error = ref(null)

// Session overrides for optimistic updates
const sessionOverrides = reactive(new Map())

// Cache management
let activitiesSubscription = null
let isInitialized = false

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
   * Toggle activity status (create/delete)
   * @param {string} habitId - Habit ID
   * @param {string} periodKey - Period key (YYYY-MM-DD, YYYY-Www, etc.)
   * @returns {Promise<boolean>} Success status
   */
  async function toggleActivity(habitId, periodKey) {
    const key = `${habitId}|${periodKey}`
    const isDone = isActivityDone(habitId, periodKey)
    const shouldCreate = !isDone

    try {
      // Optimistic update
      sessionOverrides.set(key, shouldCreate ? 'done' : 'undone')

      if (shouldCreate) {
        // Create activity
        const { error: supabaseError } = await supabase.from('habit_activities').insert([
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
          activities.value.push({
            habitId,
            periodKey,
          })
        }
      } else {
        // Delete activity
        const { error: supabaseError } = await supabase.from('habit_activities').delete().eq('habit_id', habitId).eq('period_key', periodKey)

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
      // console.error('Error toggling activity:', err)
      error.value = err.message

      // Revert optimistic update
      sessionOverrides.delete(key)
      return false
    }
  }

  /**
   * Upsert activity (create if not exists, compatible with existing function)
   * @param {string} habitId - Habit ID
   * @param {string} periodKey - Period key
   * @param {boolean} done - Whether activity is done
   * @returns {Promise<boolean>} Success status
   */
  async function upsertActivity(habitId, periodKey, done) {
    const currentStatus = isActivityDone(habitId, periodKey)

    // Only toggle if status is different
    if (currentStatus !== done) {
      return await toggleActivity(habitId, periodKey)
    }

    return true
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

  /**
   * Initialize activities data and real-time subscription
   */
  async function initialize() {
    if (isInitialized) return

    // Load initial data
    await loadActivities()

    // Set up real-time subscription
    activitiesSubscription = supabase
      .channel('activities_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'habit_activities',
        },
        (payload) => {
          // console.log('Activities change:', payload)

          switch (payload.eventType) {
            case 'INSERT': {
              // Add new activity to local state
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
              // Remove activity from local state
              const deleteIndex = activities.value.findIndex((a) => a.habitId === payload.old.habit_id && a.periodKey === payload.old.period_key)
              if (deleteIndex >= 0) {
                activities.value.splice(deleteIndex, 1)
              }
              break
            }
          }
        }
      )
      .subscribe()

    isInitialized = true
  }

  /**
   * Clean up subscription and session overrides
   */
  function cleanup() {
    if (activitiesSubscription) {
      supabase.removeChannel(activitiesSubscription)
      activitiesSubscription = null
    }
    sessionOverrides.clear()
    isInitialized = false
  }

  // Auto-initialize when composable is used
  initialize()

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
    toggleActivity,
    upsertActivity,
    isActivityDone,
    getKeysForHabit,
    initialize,
    cleanup,
  }
}
