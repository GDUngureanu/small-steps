<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import ArticleTemplate from '@/components/shared/templates/Article.vue'
import habitsData from './habits.json'
import activitiesData from './activities.json'


defineOptions({
  name: 'RoutinesTemplate',
})

// Reactive state
const sessionOverrides = reactive(new Map())
const activitiesMap = reactive(new Map())
const seedActivityKeys = new Set()
const currentTime = ref(new Date())
const allScopes = ['day', 'week', 'month', 'year']
const TIMEZONE = 'Europe/Bucharest'

// Category filter state (independent per scope)
const categoryFilters = reactive({
  day: 'All',
  week: 'All',
  month: 'All',
  year: 'All'
})

// Scope configuration for template display
const scopeConfig = {
  day: { title: 'Daily Habits', plural: 'daily' },
  week: { title: 'Weekly Habits', plural: 'weekly' },
  month: { title: 'Monthly Habits', plural: 'monthly' },
  year: { title: 'Yearly Habits', plural: 'yearly' }
}
const LOCALE = 'en-US'

// Temporal window functions
function floorToInterval(scope, nowTZ) {
  const now = new Date(nowTZ.toLocaleString(LOCALE, { timeZone: TIMEZONE }))

  switch (scope) {
    case 'day':
      return new Date(now.getFullYear(), now.getMonth(), now.getDate())

    case 'week': {
      // Monday (ISO) of the current week in Europe/Bucharest
      const monday = new Date(now)          // copy
      monday.setHours(0, 0, 0, 0)           // local midnight
      const isoDow = monday.getDay() || 7   // Sun=0 -> 7
      monday.setDate(monday.getDate() - (isoDow - 1))
      return monday                         // <-- return a Date, not a string
    }

    case 'month':
      return new Date(now.getFullYear(), now.getMonth(), 1)

    case 'year':
      return new Date(now.getFullYear(), 0, 1)

    default:
      throw new Error(`Unknown scope: ${scope}`)
  }
}

function shiftInterval(intervalStart, scope, delta) {
  const result = new Date(intervalStart)

  switch (scope) {
    case 'day':
      result.setDate(result.getDate() + delta)
      break

    case 'week':
      result.setDate(result.getDate() + delta * 7)
      break

    case 'month':
      result.setMonth(result.getMonth() + delta)
      break

    case 'year':
      result.setFullYear(result.getFullYear() + delta)
      break
  }

  return result
}

// Upsert activity to prevent duplicates on write (for future persistence)
function upsertActivity(habitId, periodKey, done) {
  const key = `${habitId}|${periodKey}`
  if (done) {
    activitiesMap.set(key, true)
    sessionOverrides.set(key, 'done')
  } else {
    activitiesMap.delete(key)
    if (seedActivityKeys.has(key)) {
      // was part of initial seed; remember the explicit undo
      sessionOverrides.set(key, 'undone')
    } else {
      sessionOverrides.delete(key)
    }
  }
}
// One function for all period keys
function formatPeriodKey(scope, inputDate = new Date()) {
  switch (scope) {
    case 'day': {
      const y = inputDate.getFullYear()
      const m = String(inputDate.getMonth() + 1).padStart(2, '0')
      const d = String(inputDate.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`               // YYYY-MM-DD in local time
    }

    case 'week':
      return isoWeekId(inputDate); // <-- use the helper below

    case 'month': {
      const y = inputDate.getFullYear()
      const m = String(inputDate.getMonth() + 1).padStart(2, '0')
      return `${y}-${m}`
    }

    case 'year':
      return String(inputDate.getFullYear())

    default:
      throw new Error(`Unknown scope: ${scope}`);
  }
}

// ISO week id in UTC: "YYYY-Www"
function isoWeekId(inputDate) {
  // normalize to UTC midnight for stability
  const d = new Date(Date.UTC(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  ));

  // ISO: week starts Monday. Convert Sunday(0) to 7.
  const day = d.getUTCDay() || 7;

  // Move to Thursday of this week (ISO anchor)
  d.setUTCDate(d.getUTCDate() + 4 - day);

  const weekYear = d.getUTCFullYear();

  // Week 1 is the week with Jan 4 in it (equivalently, the first Thursday)
  const yearStart = new Date(Date.UTC(weekYear, 0, 1));
  const weekNum = Math.ceil((((d - yearStart) / MS_DAY) + 1) / 7)

  return `${weekYear}-W${String(weekNum).padStart(2, '0')}`;
}


function humanLabel(scope, start) {
  const startDate = new Date(start)

  switch (scope) {
    case 'day':
      return new Intl.DateTimeFormat(LOCALE, {
        timeZone: TIMEZONE, weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
      }).format(startDate)

    case 'week': {
      const weekId = formatPeriodKey('week', startDate)
      const m = weekId.match(/(\d{4})-W(\d{2})/)
      const num = m ? m[2] : '00'
      const endOfWeek = new Date(startDate)
      endOfWeek.setDate(endOfWeek.getDate() + 6)
      const fmt = new Intl.DateTimeFormat(LOCALE, { timeZone: TIMEZONE, month: 'short', day: 'numeric' })
      return `W${num} (${fmt.format(startDate)}–${fmt.format(endOfWeek)})`
    }
    case 'month':
      return new Intl.DateTimeFormat(LOCALE, { timeZone: TIMEZONE, year: 'numeric', month: 'long' }).format(startDate)


    case 'year':
      return startDate.getFullYear().toString()
  }
}

function computeWindows(scope, nowTZ) {
  const currentInterval = floorToInterval(scope, nowTZ)
  const windows = []

  // Generate I-10 to I-1
  for (let offset = 10; offset >= 1; offset--) {
    const intervalStart = shiftInterval(currentInterval, scope, -offset)
    const intervalEnd = new Date(shiftInterval(intervalStart, scope, 1))
    intervalEnd.setMilliseconds(intervalEnd.getMilliseconds() - 1)

    windows.push({
      intervalId: formatPeriodKey(scope, intervalStart),
      label: humanLabel(scope, intervalStart),
      start: intervalStart,
      end: intervalEnd,
    })
  }

  // Add current interval I0
  const currentEnd = new Date(shiftInterval(currentInterval, scope, 1))
  currentEnd.setMilliseconds(currentEnd.getMilliseconds() - 1)
  windows.push({
    intervalId: formatPeriodKey(scope, currentInterval),
    label: humanLabel(scope, currentInterval),
    start: currentInterval,
    end: currentEnd,
  })

  // Generate I+1 to I+2
  for (let offset = 1; offset <= 2; offset++) {
    const intervalStart = shiftInterval(currentInterval, scope, offset)
    const intervalEnd = new Date(shiftInterval(intervalStart, scope, 1))
    intervalEnd.setMilliseconds(intervalEnd.getMilliseconds() - 1)

    windows.push({
      intervalId: formatPeriodKey(scope, intervalStart),
      label: humanLabel(scope, intervalStart),
      start: intervalStart,
      end: intervalEnd,
    })
  }

  return {
    scope,
    currentIndex: 10,
    windows,
  }
}

// State management functions
function isDone(habitId, periodKey) {
  const key = `${habitId}|${periodKey}`

  if (sessionOverrides.has(key)) {
    return sessionOverrides.get(key) === 'done'
  }
  return activitiesMap.has(key)
}

function toggleHabit(habitId, periodKey) {
  const next = !isDone(habitId, periodKey)
  upsertActivity(habitId, periodKey, next)
}

// Streak calculation using streakStats
function computeStreakStats(habitId, scope) {
  const periodKeys = getKeysForHabit(habitId)
  return streakStats(scope, periodKeys, 3)
}


function getFireColor(streak) {
  if (streak > 20) return 'text-primary' // Blue
  if (streak > 10) return 'text-danger' // Red
  if (streak > 5) return 'text-warning' // Yellow
  return 'text-muted' // Gray for <= 5
}

// Get available categories for a scope
const getScopeCategories = (scope) => {
  const categories = new Set()
  habitsData.habits
    .filter((habit) => habit.scope === scope && !habit.archived)
    .forEach((habit) => categories.add(habit.category))
  return ['All', ...Array.from(categories).sort()]
}

// Computed properties for each scope
const scopeData = computed(() => {
  const scopeDetails = {}

  allScopes.forEach((scope) => {
    let habits = habitsData.habits
      .filter((habit) => habit.scope === scope && !habit.archived)

    // Apply category filter
    if (categoryFilters[scope] !== 'All') {
      habits = habits.filter((habit) => habit.category === categoryFilters[scope])
    }

    habits = habits.sort((firstHabit, secondHabit) => (firstHabit.sort || 0) - (secondHabit.sort || 0))

    const windows = computeWindows(scope, currentTime.value)
    const availableCategories = getScopeCategories(scope)

    const streaks = {}
    habits.forEach((habit) => {
      streaks[habit.id] = computeStreakStats(habit.id, scope)
    })

    scopeDetails[scope] = {
      habits,
      windows,
      streaks,
      availableCategories,
    }
  })

  return scopeDetails
})

const MS_DAY = 86_400_000;

function isoWeekStartUTC(year, week) {
  // ISO week 1 is the week with Jan 4. Find its Monday (UTC) and offset by (week-1)*7 days.
  const jan4 = Date.UTC(year, 0, 4);
  const jan4DowMon0 = (new Date(jan4).getUTCDay() + 6) % 7; // Mon=0..Sun=6
  const week1Mon = jan4 - jan4DowMon0 * MS_DAY;
  return week1Mon + (week - 1) * 7 * MS_DAY;
}

function parsePeriodKey(scope, key) {
  if (scope === 'day') {
    const [y, m, d] = key.split('-').map(Number);
    return Date.UTC(y, m - 1, d) / MS_DAY; // day ordinal
  }
  if (scope === 'week') {
    const [y, wRaw] = key.split('-W').map(Number);
    return isoWeekStartUTC(y, wRaw) / MS_DAY / 7; // week ordinal
  }
  if (scope === 'month') {
    const [y, m] = key.split('-').map(Number);
    return y * 12 + (m - 1); // month ordinal
  }
  return Number(key); // year ordinal
}

function streakStats(scope, periodKeys, gap = 3) {
  if (!periodKeys || periodKeys.length === 0) return 0

  // unique → ordinals → sort DESC (most recent first)
  const ords = [...new Set(periodKeys)]
    .map((k) => parsePeriodKey(scope, k))
    .filter(Number.isFinite)
    .sort((a, b) => b - a)

  if (ords.length === 0) return 0

  // Walk backward from the most recent completion while gaps are within the grace window
  let latest = 1
  for (let i = 1; i < ords.length; i++) {
    const step = ords[i - 1] - ords[i]   // intervals between completions
    if (step <= gap + 1) latest++
    else break
  }

  return latest
}


// Helper function to get period keys for a habit
function getKeysForHabit(habitId) {
  const prefix = `${habitId}|`
  const keys = []
  activitiesMap.forEach((_, key) => {
    if (key.startsWith(prefix)) {
      keys.push(key.slice(prefix.length))
    }
  })
  return keys
}


let timerId = null

onMounted(() => {
  activitiesData.activities.forEach((activity) => {
    const key = `${activity.habitId}|${activity.periodKey}`
    activitiesMap.set(key, true)
    seedActivityKeys.add(key)
  })

  timerId = setInterval(() => { currentTime.value = new Date() }, 60000)
})

onUnmounted(() => { if (timerId) clearInterval(timerId) })
</script>

<template>
  <div v-for="(scope, index) in allScopes" :key="scope">
    <!-- Add separator between sections -->
    <div v-if="index > 0" style="margin-top: 2rem; margin-bottom: 2rem">
      <hr />
    </div>

    <ArticleTemplate :title="scopeConfig[scope].title" meta="Aug 6, 2025 by G. D. Ungureanu">
      <div class="small" v-if="scopeData[scope].habits.length > 0 || categoryFilters[scope] !== 'All'">
        <!-- Column Headers -->
        <div class="d-flex align-items-end pb-2 mb-3 border-bottom">
          <div class="habit-name-column d-flex flex-column gap-1">
            <!-- Category Filter Header -->
            <div v-if="scopeData[scope].availableCategories.length > 2" class="d-flex flex-column gap-1">
              <select :id="`category-filter-${scope}`" v-model="categoryFilters[scope]" class="form-select form-select-sm" style="font-size: 0.75rem">
                <option v-for="category in scopeData[scope].availableCategories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
              <span class="text-muted" style="font-size: 0.65rem" v-if="categoryFilters[scope] !== 'All'">
                {{ scopeData[scope].habits.length }} of {{habitsData.habits.filter(h => h.scope === scope && !h.archived).length}} habits
              </span>
            </div>
            <div v-else class="text-secondary fw-medium text-center" style="font-size: 0.75rem; padding-top: 1rem">
              Habits
            </div>
          </div>
          <div class="d-flex flex-fill gap-2">
            <div v-for="(window, windowIndex) in scopeData[scope].windows.windows" :key="window.intervalId" class="flex-fill text-center p-1 fw-medium text-secondary"
              :class="{ 'text-primary fw-semibold': windowIndex === scopeData[scope].windows.currentIndex }" style="min-width: 60px; font-size: 1rem">
              <small>{{ window.label }}</small>
            </div>
          </div>
        </div>

        <!-- Habit Rows -->
        <div v-for="habit in scopeData[scope].habits" :key="habit.id" class="d-flex align-items-center mb-3" role="row" :aria-label="habit.name">
          <!-- Habit Name -->
          <div class="d-flex align-items-center p-2 me-3 border rounded habit-name-column">
            <div class="d-flex align-items-center gap-2 me-2">
              <i class="bi bi-fire" :class="getFireColor(scopeData[scope].streaks[habit.id])"></i>
              <span class="text-secondary fw-medium small">{{ scopeData[scope].streaks[habit.id] }}</span>
            </div>
            <div class="text-truncate fw-medium text-dark-emphasis small">{{ habit.name }}</div>
          </div>

          <!-- Interval Cells -->
          <div class="d-flex flex-fill gap-2">
            <div v-for="(window, windowIndex) in scopeData[scope].windows.windows" :key="`${habit.id}-${window.intervalId}`"
              class="flex-fill d-flex align-items-center justify-content-center p" :class="{
                'bg-primary bg-opacity-10 rounded': windowIndex === scopeData[scope].windows.currentIndex,
              }" style="min-width: 60px">
              <div class="form-check d-flex justify-content-center">
                <input :id="`${habit.id}-${window.intervalId}`" class="form-check-input" type="checkbox" role="switch" :aria-checked="isDone(habit.id, window.intervalId)"
                  :checked="isDone(habit.id, window.intervalId)" @change="toggleHabit(habit.id, window.intervalId)"
                  :aria-label="`${habit.name} — ${window.label} — ${isDone(habit.id, window.intervalId) ? 'Done' : 'Not done'}`" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-muted">
        <p v-if="categoryFilters[scope] === 'All'">No {{ scopeConfig[scope].plural }} habits configured.</p>
        <p v-else>No {{ scopeConfig[scope].plural }} habits found for category "{{ categoryFilters[scope] }}". <button @click="categoryFilters[scope] = 'All'"
            class="btn btn-link btn-sm p-0 text-decoration-underline">Show all</button></p>
      </div>
    </ArticleTemplate>
  </div>
</template>

<style scoped>
/* Minimal custom CSS - most styling now handled by Bootstrap */
.habit-name-column {
  width: 200px;
  flex-shrink: 0;
  min-height: 60px;
  /* Ensure consistent height for filter area */
}

/* Responsive design */
@media (max-width: 768px) {
  .habit-name-column {
    width: 180px;
    /* Slightly wider on mobile to accommodate filter */
  }
}
</style>
