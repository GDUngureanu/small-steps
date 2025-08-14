<script setup>
  import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import { useHabits } from '../../composables/useHabits.js'
  import { useActivities } from '../../composables/useActivities.js'
  import { computeWindows, parsePeriodKey } from '@/shared/utils/dateIntervals.js'

  defineOptions({
    name: 'HabitsTracker',
  })

  // Initialize composables
  const { habitsData, loading: habitsLoading, error: habitsError, deleteHabit: archiveHabit, createHabit } = useHabits()
  const {
    loading: activitiesLoading,
    error: activitiesError,
    isActivityDone: isDoneFromComposable,
    setActivityStatus,
    getKeysForHabit,
  } = useActivities()

  // Reactive state
  const currentTime = ref(new Date())

  // New habit form state
  const newHabitForm = reactive({
    name: '',
    scope: 'day',
    category: '',
  })
  const formLoading = ref(false)
  const formError = ref(null)
  const formSuccess = ref(false)
  const allScopes = ['day', 'week', 'month', 'year']

  // Category filter state (independent per scope)
  const categoryFilters = reactive({
    day: 'All',
    week: 'All',
    month: 'All',
    year: 'All',
  })

  // Scope configuration for template display
  const scopeConfig = {
    day: { title: 'Daily Habits', plural: 'daily' },
    week: { title: 'Weekly Habits', plural: 'weekly' },
    month: { title: 'Monthly Habits', plural: 'monthly' },
    year: { title: 'Yearly Habits', plural: 'yearly' },
  }

  // State management functions (now using composables)
  function isDone(habitId, periodKey) {
    return isDoneFromComposable(habitId, periodKey)
  }

  function toggleHabit(habitId, periodKey) {
    const next = !isDone(habitId, periodKey)
    setActivityStatus(habitId, periodKey, next)
  }

  // Delete habit function (now uses Supabase)
  function deleteHabit(habitId) {
    archiveHabit(habitId)
  }

  // Add new habit function
  async function addNewHabit() {
    if (!newHabitForm.name.trim() || !newHabitForm.category.trim()) {
      formError.value = 'Please fill in all required fields'
      return
    }

    try {
      formLoading.value = true
      formError.value = null

      const newHabit = await createHabit({
        name: newHabitForm.name.trim(),
        scope: newHabitForm.scope,
        category: newHabitForm.category.trim(),
        archived: false,
      })

      if (newHabit) {
        // Success - reset form
        resetForm()
        formSuccess.value = true

        // Hide success message after 3 seconds
        setTimeout(() => {
          formSuccess.value = false
        }, 3000)
      } else {
        formError.value = 'Failed to create habit. Please try again.'
      }
    } catch (error) {
      formError.value = error.message || 'An unexpected error occurred'
    } finally {
      formLoading.value = false
    }
  }

  function resetForm() {
    newHabitForm.name = ''
    newHabitForm.scope = 'day'
    newHabitForm.category = ''
    formError.value = null
    formSuccess.value = false
  }

  // Time update interval
  let timeInterval
  onMounted(() => {
    timeInterval = setInterval(() => {
      currentTime.value = new Date()
    }, 60000) // Update every minute
  })

  onUnmounted(() => {
    if (timeInterval) {
      clearInterval(timeInterval)
    }
  })

  // Computed properties for data processing
  const allCategories = computed(() => {
    const categories = new Set()
    habitsData.value.habits
      .filter((habit) => !habit.archived)
      .forEach((habit) => categories.add(habit.category))
    return ['All', ...Array.from(categories).sort()]
  })

  function getHabitsForScope(scope) {
    return habitsData.value.habits.filter((habit) => {
      if (habit.archived) return false
      if (habit.scope !== scope) return false
      if (categoryFilters[scope] === 'All') return true
      return habit.category === categoryFilters[scope]
    })
  }

  function getCategoriesForScope(scope) {
    const scopeCategories = new Set()
    habitsData.value.habits
      .filter((habit) => !habit.archived && habit.scope === scope)
      .forEach((habit) => scopeCategories.add(habit.category))
    return ['All', ...Array.from(scopeCategories).sort()]
  }

  function computeStreakInfo(habitId, scope) {
    const keys = getKeysForHabit(habitId)
    if (keys.length === 0) return { current: 0, max: 0 }

    const sortedKeys = keys.map((key) => parsePeriodKey(scope, key)).sort((a, b) => a - b)

    // Current streak (from most recent period backwards)
    let current = 0
    const now = parsePeriodKey(scope, computeWindows(scope, currentTime.value).windows[10].intervalId)

    // Start from current period and go backwards
    let period = now
    while (sortedKeys.includes(period)) {
      current++
      period--
    }

    // Max streak
    let max = 0
    let temp = 0
    let prev = null

    for (const key of sortedKeys) {
      if (prev === null || key === prev + 1) {
        temp++
      } else {
        max = Math.max(max, temp)
        temp = 1
      }
      prev = key
    }
    max = Math.max(max, temp)

    return { current, max }
  }

  // Lifecycle hooks for cleanup
  onUnmounted(() => {
    // Cleanup composables if needed
  })
</script>

<template>
  <ArticleTemplate title="Habit Tracker" meta="Powerful habit tracking and analytics">
    <!-- Loading/Error States -->
    <div v-if="habitsLoading || activitiesLoading" class="alert alert-info">
      <i class="bi bi-hourglass-split"></i> Loading habits and activities...
    </div>

    <div v-if="habitsError || activitiesError" class="alert alert-danger">
      <i class="bi bi-exclamation-triangle"></i>
      Error: {{ habitsError || activitiesError }}
    </div>

    <!-- Add Habit Tracker Form (Always Visible) -->
    <div class="mb-4">
      <h4>Add Habit Tracker</h4>

      <div v-if="formSuccess" class="alert alert-success">
        <i class="bi bi-check-circle"></i> Habit tracker created successfully!
      </div>

      <div v-if="formError" class="alert alert-danger">
        <i class="bi bi-exclamation-triangle"></i> {{ formError }}
      </div>

      <div class="row g-3">
        <div class="col-md-4">
          <input
            v-model="newHabitForm.name"
            type="text"
            class="form-control"
            placeholder="Habit name"
            :disabled="formLoading"
            @keyup.enter="addNewHabit"
          />
        </div>
        <div class="col-md-3">
          <select v-model="newHabitForm.scope" class="form-select" :disabled="formLoading">
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
        <div class="col-md-3">
          <input
            v-model="newHabitForm.category"
            type="text"
            class="form-control"
            placeholder="Category"
            list="category-suggestions"
            :disabled="formLoading"
            @keyup.enter="addNewHabit"
          />
          <datalist id="category-suggestions">
            <option v-for="category in allCategories.filter((c) => c !== 'All')" :key="category" :value="category">
              {{ category }}
            </option>
          </datalist>
        </div>
        <div class="col-md-2">
          <button type="button" class="btn btn-primary w-100" :disabled="formLoading" @click="addNewHabit">
            <i v-if="formLoading" class="bi bi-hourglass-split"></i>
            <i v-else class="bi bi-plus-lg"></i>
            {{ formLoading ? 'Adding...' : 'Add' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Habit Tracking Sections by Scope -->
    <div v-for="scope in allScopes" :key="scope" class="habit-scope-section mb-5">
      <h3>{{ scopeConfig[scope].title }}</h3>

      <!-- Category Filter -->
      <div class="mb-3">
        <select v-model="categoryFilters[scope]" class="form-select" style="max-width: 200px">
          <option v-for="category in getCategoriesForScope(scope)" :key="category" :value="category">
            {{ category === 'All' ? 'All Categories' : category }}
          </option>
        </select>
      </div>

      <!-- Habits Table -->
      <div v-if="getHabitsForScope(scope).length === 0" class="alert alert-secondary">
        No {{ scopeConfig[scope].plural }} habits found.
        {{ categoryFilters[scope] !== 'All' ? 'Try changing the category filter.' : '' }}
      </div>

      <div v-else class="table-responsive">
        <table class="table table-sm table-hover">
          <thead>
            <tr>
              <th>Habit</th>
              <th>Category</th>
              <th>Progress</th>
              <th>Current Streak</th>
              <th>Max Streak</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="habit in getHabitsForScope(scope)" :key="habit.id">
              <td>
                <strong>{{ habit.name }}</strong>
              </td>
              <td>
                <span class="badge bg-secondary">{{ habit.category }}</span>
              </td>
              <td>
                <!-- Progress Indicators -->
                <div class="d-flex gap-1">
                  <button
                    v-for="window in computeWindows(scope, currentTime).windows"
                    :key="window.intervalId"
                    type="button"
                    class="btn btn-sm"
                    :class="isDone(habit.id, window.intervalId) ? 'btn-success' : 'btn-outline-secondary'"
                    :title="window.label"
                    @click="toggleHabit(habit.id, window.intervalId)"
                  >
                    <i class="bi" :class="isDone(habit.id, window.intervalId) ? 'bi-check' : 'bi-dash'"></i>
                  </button>
                </div>
              </td>
              <td>
                <span class="badge bg-info">{{ computeStreakInfo(habit.id, scope).current }}</span>
              </td>
              <td>
                <span class="badge bg-warning text-dark">{{ computeStreakInfo(habit.id, scope).max }}</span>
              </td>
              <td>
                <button type="button" class="btn btn-sm btn-outline-danger" title="Archive habit" @click="deleteHabit(habit.id)">
                  <i class="bi bi-archive"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ArticleTemplate>
</template>

<style scoped>
.habit-scope-section {
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 2rem;
}

.habit-scope-section:last-child {
  border-bottom: none;
}

.btn-sm {
  font-size: 0.75rem;
}
</style>