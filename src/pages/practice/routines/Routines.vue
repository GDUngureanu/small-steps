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
    case 'day':{
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


function humanLabel(scope, start, end) {
  const startDate = new Date(start)
  const endDate = new Date(end)

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
      label: humanLabel(scope, intervalStart, intervalEnd),
      start: intervalStart,
      end: intervalEnd,
    })
  }

  // Add current interval I0
  const currentEnd = new Date(shiftInterval(currentInterval, scope, 1))
  currentEnd.setMilliseconds(currentEnd.getMilliseconds() - 1)
  windows.push({
    intervalId: formatPeriodKey(scope, currentInterval),
    label: humanLabel(scope, currentInterval, currentEnd),
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
      label: humanLabel(scope, intervalStart, intervalEnd),
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

// Computed properties for each scope
const scopeData = computed(() => {
  const scopeDetails = {}

  allScopes.forEach((scope) => {
    const habits = habitsData.habits
      .filter((habit) => habit.scope === scope && !habit.archived)
      .sort((firstHabit, secondHabit) => (firstHabit.sort || 0) - (secondHabit.sort || 0))

    const windows = computeWindows(scope, currentTime.value)

    const streaks = {}
    habits.forEach((habit) => {
      streaks[habit.id] = computeStreakStats(habit.id, scope)
    })

    scopeDetails[scope] = {
      habits,
      windows,
      streaks,
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

function todayOrdinal(scope, now = new Date()) {
  // compute using the browser's local time (so your keys match what you record)
  if (scope === 'day') {
    return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / MS_DAY;
  }
  if (scope === 'week') {
    // get ISO week of today, then convert to week ordinal
    const tmp = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const dayNr = (tmp.getUTCDay() + 6) % 7; // Mon=0
    tmp.setUTCDate(tmp.getUTCDate() - dayNr + 3); // Thursday of ISO week
    const year = tmp.getUTCFullYear();
    const firstThu = new Date(Date.UTC(year, 0, 4));
    const week = 1 + Math.round((+tmp - +firstThu) / (7 * MS_DAY));
    return isoWeekStartUTC(year, week) / MS_DAY / 7;
  }
  if (scope === 'month') return now.getFullYear() * 12 + now.getMonth();
  return now.getFullYear();
}
function streakStats(scope, periodKeys, gap = 3, now = new Date()) {
  // no data → no streak
  if (!periodKeys || periodKeys.length === 0) return 0

  // unique + convert to ordinals, then sort DESC so we can walk backward only as long as needed
  const ords = [...new Set(periodKeys)]
    .map((k) => parsePeriodKey(scope, k))
    .sort((a, b) => b - a)

  const today = todayOrdinal(scope, now)

  // If the last completion is too far in the past, streak is broken
  if (today - ords[0] > gap) return 0

  // Count backwards while gaps are within the grace window
  let current = 1
  for (let i = 1; i < ords.length; i++) {
    const step = ords[i - 1] - ords[i]
    if (step <= gap + 1) current++
    else break
  }

  return current
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
      <div class="small" v-if="scopeData[scope].habits.length > 0">
        <!-- Column Headers -->
        <div class="d-flex align-items-end pb-2 mb-3 border-bottom">
          <div class="habit-name-column"></div>
          <div class="d-flex flex-fill gap-2">
            <div v-for="(window, windowIndex) in scopeData[scope].windows.windows" 
                 :key="window.intervalId" 
                 class="flex-fill text-center p-1 fw-medium text-secondary"
                 :class="{ 'text-primary fw-semibold': windowIndex === scopeData[scope].windows.currentIndex }" 
                 style="min-width: 60px; font-size: 1rem">
              <small>{{ window.label }}</small>
            </div>
          </div>
        </div>

        <!-- Habit Rows -->
        <div v-for="habit in scopeData[scope].habits" 
             :key="habit.id" 
             class="d-flex align-items-center mb-3" 
             role="row" 
             :aria-label="habit.name">
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
            <div v-for="(window, windowIndex) in scopeData[scope].windows.windows" 
                 :key="`${habit.id}-${window.intervalId}`"
                 class="flex-fill d-flex align-items-center justify-content-center p" 
                 :class="{
                   'bg-primary bg-opacity-10 rounded': windowIndex === scopeData[scope].windows.currentIndex,
                 }" 
                 style="min-width: 60px">
              <div class="form-check d-flex justify-content-center">
                <input :id="`${habit.id}-${window.intervalId}`" 
                       class="form-check-input" 
                       type="checkbox" 
                    role="switch"
                    :aria-checked="isDone(habit.id, window.intervalId)"
                       :checked="isDone(habit.id, window.intervalId)"
                       @change="toggleHabit(habit.id, window.intervalId)"
                       :aria-label="`${habit.name} — ${window.label} — ${isDone(habit.id, window.intervalId) ? 'Done' : 'Not done'}`" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-muted">
        <p>No {{ scopeConfig[scope].plural }} habits configured.</p>
      </div>
    </ArticleTemplate>
  </div>
</template>

<style scoped>
/* Minimal custom CSS - most styling now handled by Bootstrap */
.habit-name-column {
  width: 200px;
  flex-shrink: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .habit-name-column {
    width: 150px;
  }
}
</style>
