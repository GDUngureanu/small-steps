<script setup>
  import { computed } from 'vue'
  import ArticleTemplate from '@/components/shared/templates/Article.vue'
  import ActionsTemplate from '@/components/shared/templates/actions/Actions.vue'
  import { useHabits } from '@/composables/useHabits.js'
  import { useActivities } from '@/composables/useActivities.js'

  defineOptions({
    name: 'FitnessTemplate',
  })

  const { habitsData, loading: habitsLoading, error: habitsError } = useHabits()
  const {
    loading: activitiesLoading,
    error: activitiesError,
    isActivityDone,
    setActivityStatus,
  } = useActivities()

  const TIMEZONE = 'Europe/Bucharest'
  function getTodayKey() {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: TIMEZONE }))
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  const todayKey = getTodayKey()

  const fitnessHabits = computed(() =>
    habitsData.value.habits.filter((habit) => habit.category === 'fitness')
  )

  function toggleHabit(habitId) {
    const done = !isActivityDone(habitId, todayKey)
    setActivityStatus(habitId, todayKey, done)
  }
</script>

<template>
  <ArticleTemplate title="Fitness Actions" meta="Aug 6, 2025 by G. D. Ungureanu">
    <ActionsTemplate list-id="987cd0c1-a7e1-4e6a-aa4e-52a0da41d652" />
  </ArticleTemplate>

  <ArticleTemplate title="Workout Templates" meta="Aug 6, 2025 by G. D. Ungureanu">
    <ul>
      <li>
        <router-link to="/fitness/workouts/strength"><strong>Strength Training</strong></router-link>
      </li>
      <li>
        <router-link to="/fitness/workouts/cardio"><strong>Cardio Blast</strong></router-link>
      </li>
    </ul>
  </ArticleTemplate>

  <ArticleTemplate title="Exercise Habit Tracker" meta="Aug 6, 2025 by G. D. Ungureanu">
    <div v-if="habitsLoading || activitiesLoading">Loading habits...</div>
    <div v-else-if="habitsError || activitiesError">Failed to load habits.</div>
    <div v-else>
      <ul v-if="fitnessHabits.length">
        <li v-for="habit in fitnessHabits" :key="habit.id">
          <label>
            <input
              type="checkbox"
              :checked="isActivityDone(habit.id, todayKey)"
              @change="toggleHabit(habit.id)"
            />
            {{ habit.name }}
          </label>
        </li>
      </ul>
      <p v-else>No fitness habits found.</p>
    </div>
  </ArticleTemplate>
</template>

