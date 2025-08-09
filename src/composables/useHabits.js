// =====================================================
// Habits Composable - Phase 2 Data Layer
// =====================================================

import { ref, computed } from 'vue'
import { supabase } from '@/configuration/supabase.js'

// Global state for habits
const habits = ref([])
const loading = ref(false)
const error = ref(null)

// Cache management
let habitsSubscription = null
let isInitialized = false

/**
 * Composable for managing habits data with Supabase
 * @returns {Object} Habits data and methods
 */
export function useHabits() {
  
  /**
   * Load habits from Supabase
   * @returns {Promise<boolean>} Success status
   */
  async function loadHabits() {
    if (loading.value) return false
    
    try {
      loading.value = true
      error.value = null
      
      const { data, error: supabaseError } = await supabase
        .from('habits')
        .select('*')
        .order('scope')
        .order('category')
        .order('name')
      
      if (supabaseError) {
        throw supabaseError
      }
      
      // Transform to match existing JSON structure
      habits.value = data.map(habit => ({
        id: habit.id,
        name: habit.name,
        scope: habit.scope,
        category: habit.category,
        archived: habit.archived,
        sort: 0 // Not in DB, but needed for compatibility
      }))
      
      return true
    } catch (err) {
      // console.error('Error loading habits:', err)
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new habit
   * @param {Object} habitData - Habit data to create
   * @returns {Promise<Object|null>} Created habit or null
   */
  async function createHabit(habitData) {
    try {
      loading.value = true
      error.value = null
      
      const { data, error: supabaseError } = await supabase
        .from('habits')
        .insert([{
          name: habitData.name,
          scope: habitData.scope,
          category: habitData.category,
          archived: habitData.archived || false
        }])
        .select()
        .single()
      
      if (supabaseError) {
        throw supabaseError
      }
      
      // Add to local state immediately (optimistic update)
      const newHabit = {
        id: data.id,
        name: data.name,
        scope: data.scope,
        category: data.category,
        archived: data.archived,
        sort: 0
      }
      
      habits.value.push(newHabit)
      
      return newHabit
    } catch (err) {
      // console.error('Error creating habit:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Update an existing habit
   * @param {string} habitId - Habit ID to update
   * @param {Object} updates - Updates to apply
   * @returns {Promise<boolean>} Success status
   */
  async function updateHabit(habitId, updates) {
    try {
      loading.value = true
      error.value = null
      
      const { error: supabaseError } = await supabase
        .from('habits')
        .update(updates)
        .eq('id', habitId)
      
      if (supabaseError) {
        throw supabaseError
      }
      
      // Update local state immediately (optimistic update)
      const habitIndex = habits.value.findIndex(h => h.id === habitId)
      if (habitIndex >= 0) {
        Object.assign(habits.value[habitIndex], updates)
      }
      
      return true
    } catch (err) {
      // console.error('Error updating habit:', err)
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete (archive) a habit
   * @param {string} habitId - Habit ID to delete
   * @returns {Promise<boolean>} Success status
   */
  async function deleteHabit(habitId) {
    return updateHabit(habitId, { archived: true })
  }

  /**
   * Get habits compatible with existing JSON structure
   * @returns {Object} Habits data in JSON format
   */
  const habitsData = computed(() => ({
    version: '1.0',
    habits: habits.value
  }))

  /**
   * Initialize habits data and real-time subscription
   */
  async function initialize() {
    if (isInitialized) return
    
    // Load initial data
    await loadHabits()
    
    // Set up real-time subscription
    habitsSubscription = supabase
      .channel('habits_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'habits'
        },
        (payload) => {
          // console.log('Habits change:', payload)
          
          switch (payload.eventType) {
            case 'INSERT': {
              // Add new habit to local state
              const newHabit = {
                id: payload.new.id,
                name: payload.new.name,
                scope: payload.new.scope,
                category: payload.new.category,
                archived: payload.new.archived,
                sort: 0
              }
              if (!habits.value.find(h => h.id === newHabit.id)) {
                habits.value.push(newHabit)
              }
              break
            }
              
            case 'UPDATE': {
              // Update existing habit in local state
              const habitIndex = habits.value.findIndex(h => h.id === payload.new.id)
              if (habitIndex >= 0) {
                Object.assign(habits.value[habitIndex], {
                  name: payload.new.name,
                  scope: payload.new.scope,
                  category: payload.new.category,
                  archived: payload.new.archived
                })
              }
              break
            }
              
            case 'DELETE': {
              // Remove habit from local state
              const deleteIndex = habits.value.findIndex(h => h.id === payload.old.id)
              if (deleteIndex >= 0) {
                habits.value.splice(deleteIndex, 1)
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
   * Clean up subscription
   */
  function cleanup() {
    if (habitsSubscription) {
      supabase.removeChannel(habitsSubscription)
      habitsSubscription = null
    }
    isInitialized = false
  }

  // Auto-initialize when composable is used
  initialize()

  return {
    // Data
    habits: habits,
    habitsData,
    loading,
    error,
    
    // Methods
    loadHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    initialize,
    cleanup
  }
}