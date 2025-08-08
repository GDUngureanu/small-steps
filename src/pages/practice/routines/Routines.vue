<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import ArticleTemplate from '../../../components/shared/templates/Article.vue'
  import habitsData from './habits.json'
  import activitiesData from './activities.json'

  /*
SPEC—Temporal Windows (Europe/Bucharest, ISO week Monday)
Goal: For a selected scope ∈ {day, week, month, year}, produce exactly 13 ordered intervals:
I-10 … I-1, I0 (current), I+1 … I+2.

Interval IDs (deterministic):
- day:   YYYY-MM-DD
- week:  YYYY-Www  (ISO week-year, ww zero-padded)
- month: YYYY-MM
- year:  YYYY

Functions (pseudocode signatures & behavior):
- floorToInterval(scope, nowTZ):
  day   → start: 00:00 local; end: 23:59:59.999
  week  → start: Monday 00:00 of ISO week containing now; end: Sunday 23:59:59.999
  month → start: 1st 00:00; end: last day 23:59:59.999
  year  → start: Jan 1 00:00; end: Dec 31 23:59:59.999

- shiftInterval(intervalStart, scope, delta):
  Move by N units (N = delta), respecting:
    • ISO week-year rollover (e.g., 2015-W53 → 2016-W01)
    • variable month lengths
    • leap years for Feb 29

- formatIntervalId(scope, intervalStart):
  day   → YYYY-MM-DD
  week  → ISO week-year of Monday(start) + "-W" + 2-digit week number
  month → YYYY-MM of start
  year  → YYYY of start

- humanLabel(scope, start, end):
  day   → "Wed, Aug 6, 2025"
  week  → "W32 (Aug 4–Aug 10, 2025)"
  month → "August 2025"
  year  → "2025"

Algorithm:
computeWindows(scope, nowTZ):
  I0 = floorToInterval(scope, nowTZ)
  list = []
  for i=10..1: list.push(shiftInterval(I0, scope, -i))
  list.push(I0)
  for i=1..2: list.push(shiftInterval(I0, scope, +i))
  return {
    scope,
    currentIndex: 10,
    windows: list.map(s => ({
      intervalId: formatIntervalId(scope, s),
      label: humanLabel(scope, s, sEnd),
      start: s, end: corresponding end
    }))
  }

Test anchors (expected 13 IDs only; verify manually):
- Around New Year week-year rollover:
  Anchor now = 2015-12-31 (Thu), scope=week → expect window containing 2015-W53 and next 2016-W01.
- Leap year:
  Anchor now = 2024-02-29, scope=day → includes Feb 19…Mar 12.
- Month end:
  Anchor now = 2025-08-06, scope=month → includes Oct 2024 … Oct 2025 (13 months with Aug 2025 at index 10).
*/

  /*
SPEC—Streaks (gaps ≤ 3 allowed)
Definitions:
- Convert each intervalId to an integer index per scope (epoch-based):
  day   → days since 1970-01-01 (Europe/Bucharest)
  week  → ISO weeks since 1970-W01 (derived from ISO date)
  month → months since 1970-01
  year  → years since 1970
- Sort unique indices ascending. Let C = current interval index.

Link rule:
Two done indices a, b are linked iff (b - a - 1) ≤ 3. (Gap is missing intervals count between them.)

Current streak:
Let L be the most recent done index. If (C - L - 1) ≤ 3, current streak = length of the linked group ending at L; else 0.

Historical best:
Maximum length across all linked groups; tie-breaker = most recent end index.

Algorithm (O(n) time, O(1) extra):
computeStreaks(doneIndicesSorted, currentIndex):
  if empty → {current:0, best:0}
  bestLen=1; bestEnd=done[0]; currLen=1
  for i in 1..n-1:
    gap = done[i]-done[i-1]-1
    if gap ≤ 3: currLen++
    else:
      if (currLen > bestLen) or (currLen==bestLen and done[i-1]>bestEnd):
        bestLen=currLen; bestEnd=done[i-1]
      currLen=1
  // finalize
  if (currLen > bestLen) or (currLen==bestLen and done[n-1]>bestEnd):
    bestLen=currLen; bestEnd=done[n-1]
  // current
  gapToNow = (currentIndex - done[n-1]) - 1
  if gapToNow ≤ 3:
    currentLen=1; i=n-1
    while i>0 and (done[i]-done[i-1]-1) ≤ 3: currentLen++; i--
    curr=currentLen
  else curr=0
  return { current: curr, best: bestLen }

Worked examples (indices only):
- Day, C=1000:
  A) [995,996,999] → gaps 0,2; gapToNow (1000-999)-1=0 → current=3, best=3
  B) [980,983,986,990,1000] → gaps 2,2,3,9; gapToNow from 1000=-1 → current=1, best=4
- Week, C=100:
  A) [92,95,98,101] → gaps 2,2,2; gapToNow (100-101)-1=-2 → current=4, best=4
- Month, C=200:
  A) [196,197,199] → current=3, best=3
  B) [180,184,188,192] → gapToNow=7 → current=0, best=4
- Year, C=55:
  A) [50,52,55] → current=3, best=3
  B) [40,44,49] → current=0, best=2
*/

  /*
SPEC—State Model (Ephemeral only; no localStorage/URL)
Data sources:
- SeedHabits: loaded from habits.json
- SeedActivities: loaded from activities.json (sparse; only "done")
- SessionOverrides: Map key = `${habitId}|${scope}|${intervalId}`, value = "done"|"undone"

Derived:
- isDone(habitId, scope, intervalId):
    if key in SessionOverrides → that value
    else if exists in SeedActivities → "done"
    else → "undone"

Events:
- TOGGLE(habitId, scope, intervalId):
    current = isDone(...)
    next = (current == "done") ? "undone" : "done"
    if next == "done": set override to "done"
    else if next == "undone":
       if entry exists in SeedActivities: set override "undone"
       else: remove override (implicit undone)
    push to UndoStack (max 20), clear RedoStack
- UNDO / REDO: inverse of last action; bounded stacks.

Recompute:
- On any TOGGLE affecting habit H at scope S:
    recompute streaks for H,S using the set of intervalIds whose status resolves to "done".
- Windows memoized per scope until interval rollover.

Reset:
- On full refresh/navigation, SessionOverrides and undo/redo stacks are cleared by design.

SSR notes:
- If SSR computes windows, embed tz="Europe/Bucharest" and generatedAt; client revalidates at hydration.
*/

  /*
SPEC—Interaction & A11y (WCAG 2.2 AA)
Grid layout:
- One scope visible at a time; 13 interval columns; ~20+ habit rows.

Roles:
- Container: role="grid" aria-rowcount (habits) aria-colcount=13
- Row: role="row" with aria-label = habit name
- Cell: role="gridcell" containing role="checkbox" with aria-checked
- Live region: aria-live="polite" for announcements

Keyboard:
- Roving tabindex: only one cell focusable.
- ArrowLeft/Right: move interval
- ArrowUp/Down: move habit
- Home/End: first/last interval in row
- Space/Enter: toggle
- Ctrl/Cmd+Z: undo; Ctrl/Cmd+Shift+Z: redo
- Focus always visibly indicated (>= 3:1 contrast ring)

ARIA labels & announcements:
- Checkbox aria-label: `${habitName} — ${intervalHumanLabel} — ${Done|Not done}`
- On toggle, announce: `Marked ${habitName} as Done for ${intervalHumanLabel}` or `Reverted to Not done`.

Tooltips (hover/focus):
- "Toggle ${habitName} for ${intervalHumanLabel} (Space)"

Streak feedback:
- After toggle, recompute and update badges:
  • Current: "Current: N"
  • Best: "Best: M"
- Current streak cells get a high-contrast outline pill; do not rely on color alone.

Pointer:
- Click cell toggles; drag-range selection is out of scope for v1.

Empty/edge states:
- If no habits match scope, show guidance text.
- Long habit names: truncate with tooltip; never truncate ARIA labels.
*/

  /*
SPEC—Dark Tokens & Palette (WCAG 2.2 AA)
Purpose: Define color tokens usable with Bootstrap classes while ensuring AA contrast.

Core tokens (dark):
- --surface:    #0F1115
- --surface-2:  #151821
- --text:       #EAEFF7
- --muted:      #9AA4B2
- --border:     #2A2F3A
- --focus:      #A0C2FF   (>= 3:1 vs --surface)
- --on-accent:  #0B0F14   (text on accent fills; ensure AA)

Habit accents (controlled palette; choose any subset, document mapping):
- accent-1: #7DD3FC   (on-accent must be #0B0F14)  // cyan 300
- accent-2: #A7F3D0   (on-accent #0B0F14)          // emerald 200
- accent-3: #FDE68A   (on-accent #0B0F14)          // amber 200
- accent-4: #FCA5A5   (on-accent #0B0F14)          // rose 300
- accent-5: #C4B5FD   (on-accent #0B0F14)          // violet 300
- accent-6: #93C5FD   (on-accent #0B0F14)          // blue 300
- accent-7: #F9A8D4   (on-accent #0B0F14)          // pink 300
- accent-8: #86EFAC   (on-accent #0B0F14)          // green 300

State visuals:
- Cell "none": background --surface-2; text --text; border --border.
- Cell "done": background = habit accent; text/icon = --on-accent.
- Hover: subtle elevation + border brighten; Focus: 2px outline --focus.
- Streak current: 2px outline pill around linked cells using --focus (or #E5B8FF for alternative high-contrast).

Bootstrap mapping guidance:
- Map accents to utility classes via CSS variables or custom utilities; ensure final contrast ratios:
  • On-accent text vs accent fill ≥ 4.5:1
  • Text vs surfaces ≥ 4.5:1
  • Focus ring vs surroundings ≥ 3:1

Non-color affordances:
- Do not rely on color alone to convey "done" or "in streak"; include icon (✓) and outline.

Contrast verification (AA):
- Verify with automated checker; log ratios in a table:
  Accent-1 (#7DD3FC) vs On-accent (#0B0F14) → ratio ≥ 7:1 (pass)
  Repeat for all accents.
*/

  defineOptions({
    name: 'RoutinesTemplate',
  })

  // Reactive state
  const sessionOverrides = reactive(new Map())
  const activitiesMap = reactive(new Map())
  const seedActivityKeys = new Set()
  const currentTime = ref(new Date())
  const allScopes = ['day', 'week', 'month', 'year']

  // Temporal window functions
  function floorToInterval(scope, nowTZ) {
    const now = new Date(nowTZ.toLocaleString('en-US', { timeZone: 'Europe/Bucharest' }))

    switch (scope) {
      case 'day':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate())

      case 'week': {
        // Find Monday of current ISO week
        const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay() // Sunday = 7
        const mondayOffset = dayOfWeek - 1
        const monday = new Date(now)
        monday.setDate(now.getDate() - mondayOffset)
        monday.setHours(0, 0, 0, 0)
        return monday
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

  function formatIntervalId(scope, intervalStart) {
    const date = new Date(intervalStart)

    switch (scope) {
      case 'day':
        return date.toISOString().split('T')[0] // YYYY-MM-DD

      case 'week': {
        // Calculate ISO week number
        const yearStart = new Date(date.getFullYear(), 0, 1)
        const weekNum = Math.ceil(((date - yearStart) / 86400000 + yearStart.getDay() + 1) / 7)
        return `${date.getFullYear()}-W${weekNum.toString().padStart(2, '0')}`
      }

      case 'month':
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`

      case 'year':
        return date.getFullYear().toString()
    }
  }

  function humanLabel(scope, start, end) {
    const startDate = new Date(start)
    const endDate = new Date(end)

    switch (scope) {
      case 'day':
        return startDate.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })

      case 'week': {
        const weekId = formatIntervalId('week', startDate)
        const weekMatch = weekId.match(/(\d{4})-W(\d{2})/)
        const weekNum = weekMatch ? weekMatch[2] : '00'
        return `W${weekNum} (${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`
      }
      case 'month':
        return startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })

      case 'year':
        return startDate.getFullYear().toString()
    }
  }

  function computeWindows(scope, nowTZ) {
    const currentInterval = floorToInterval(scope, nowTZ)
    const windows = []

    // Generate I-10 to I-1
    for (let i = 10; i >= 1; i--) {
      const intervalStart = shiftInterval(currentInterval, scope, -i)
      const intervalEnd = new Date(shiftInterval(intervalStart, scope, 1))
      intervalEnd.setMilliseconds(intervalEnd.getMilliseconds() - 1)

      windows.push({
        intervalId: formatIntervalId(scope, intervalStart),
        label: humanLabel(scope, intervalStart, intervalEnd),
        start: intervalStart,
        end: intervalEnd,
      })
    }

    // Add current interval I0
    const currentEnd = new Date(shiftInterval(currentInterval, scope, 1))
    currentEnd.setMilliseconds(currentEnd.getMilliseconds() - 1)
    windows.push({
      intervalId: formatIntervalId(scope, currentInterval),
      label: humanLabel(scope, currentInterval, currentEnd),
      start: currentInterval,
      end: currentEnd,
    })

    // Generate I+1 to I+2
    for (let i = 1; i <= 2; i++) {
      const intervalStart = shiftInterval(currentInterval, scope, i)
      const intervalEnd = new Date(shiftInterval(intervalStart, scope, 1))
      intervalEnd.setMilliseconds(intervalEnd.getMilliseconds() - 1)

      windows.push({
        intervalId: formatIntervalId(scope, intervalStart),
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
  function isDone(habitId, scope, completedOn) {
    const key = `${habitId}|${scope}|${completedOn}`

    if (sessionOverrides.has(key)) {
      return sessionOverrides.get(key) === 'done'
    }

    return activitiesMap.has(key)
  }

  function toggleHabit(habitId, scope, completedOn) {
    const key = `${habitId}|${scope}|${completedOn}`
    const current = isDone(habitId, scope, completedOn)
    const next = !current

    if (next) {
        activitiesMap.set(key, true)
        sessionOverrides.set(key, 'done')
      } else {
        activitiesMap.delete(key)
        if (seedActivityKeys.has(key)) {
          sessionOverrides.set(key, 'undone')
        } else {
          sessionOverrides.delete(key)
        }
      }
  }

  // Completion count calculation
  function computeCompletionCount(habitId, scope) {
    const prefix = `${habitId}|${scope}|`
    let count = 0

    activitiesMap.forEach((_, key) => {
      if (key.startsWith(prefix)) {
        count++
      }
    })

    return count
  }

  function getFireColor(count) {
    if (count > 20) return 'text-primary' // Blue
    if (count > 10) return 'text-danger' // Red
    if (count > 5) return 'text-warning' // Yellow
    return 'text-muted' // Gray for <= 5
  }

  // Computed properties for each scope
  const scopeData = computed(() => {
    const data = {}

    allScopes.forEach((scope) => {
      const habits = habitsData.habits.filter((habit) => habit.scope === scope && !habit.archived).sort((a, b) => (a.sort || 0) - (b.sort || 0))

      const windows = computeWindows(scope, currentTime.value)

      const counts = {}
      habits.forEach((habit) => {
        counts[habit.id] = computeCompletionCount(habit.id, scope)
      })

      data[scope] = {
        habits,
        windows,
        counts,
      }
    })

    return data
  })

  const scopeLabels = {
    day: 'Daily Habits',
    week: 'Weekly Habits',
    month: 'Monthly Habits',
    year: 'Yearly Habits',
  }

  // Lifecycle
  onMounted(() => {
      activitiesData.activities.forEach((activity) => {
        const key = `${activity.habitId}|${activity.scope}|${activity.completedOn}`
        activitiesMap.set(key, true)
        seedActivityKeys.add(key)
      })

      // Update current time every minute for day scope
      setInterval(() => {
        currentTime.value = new Date()
      }, 60000)
    })
</script>

<template>
  <!-- Daily Habits -->
  <ArticleTemplate title="Daily Habits" meta="Aug 6, 2025 by G. D. Ungureanu">
    <div class="small" v-if="scopeData.day.habits.length > 0">
      <!-- Column Headers -->
      <div class="d-flex align-items-end pb-2 mb-3 border-bottom">
        <div class="habit-name-column"></div>
        <div class="d-flex flex-fill gap-2">
          <div v-for="(window, index) in scopeData.day.windows.windows" :key="window.intervalId" class="flex-fill text-center p-1 fw-medium text-secondary" :class="{ 'text-primary fw-semibold': index === scopeData.day.windows.currentIndex }" style="min-width: 60px; font-size: 1rem">
            <small>{{ window.label }}</small>
          </div>
        </div>
      </div>

      <!-- Habit Rows -->
      <div v-for="habit in scopeData.day.habits" :key="habit.id" class="d-flex align-items-center mb-3" role="row" :aria-label="habit.name">
        <!-- Habit Name -->
        <div class="d-flex align-items-center p-2 me-3 border rounded habit-name-column">
          <div class="d-flex align-items-center gap-2 me-2">
            <i class="bi bi-fire" :class="getFireColor(scopeData.day.counts[habit.id] || 0)" :title="`${scopeData.day.counts[habit.id] || 0} completions`"></i>
            <span class="text-secondary fw-medium small">{{ scopeData.day.counts[habit.id] || 0 }}</span>
          </div>
          <div class="text-truncate fw-medium text-dark-emphasis small">{{ habit.name }}</div>
        </div>

        <!-- Interval Cells -->
        <div class="d-flex flex-fill gap-2">
          <div
            v-for="(window, index) in scopeData.day.windows.windows"
            :key="`${habit.id}-${window.intervalId}`"
            class="flex-fill d-flex align-items-center justify-content-center p"
            :class="{
              'bg-primary bg-opacity-10 rounded': index === scopeData.day.windows.currentIndex,
            }"
            style="min-width: 60px"
          >
            <div class="form-check d-flex justify-content-center">
              <input
                :id="`${habit.id}-${window.intervalId}`"
                class="form-check-input"
                type="checkbox"
                :checked="isDone(habit.id, 'day', window.intervalId)"
                @change="toggleHabit(habit.id, 'day', window.intervalId)"
                :aria-label="`${habit.name} — ${window.label} — ${isDone(habit.id, 'day', window.intervalId) ? 'Done' : 'Not done'}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-muted">
      <p>No daily habits configured.</p>
    </div>
  </ArticleTemplate>

  <!-- Weekly Habits -->
  <ArticleTemplate title="Weekly Habits" meta="Aug 6, 2025 by G. D. Ungureanu">
    <div class="small" v-if="scopeData.week.habits.length > 0">
      <!-- Column Headers -->
      <div class="d-flex align-items-end pb-2 mb-3 border-bottom">
        <div class="habit-name-column"></div>
        <div class="d-flex flex-fill gap-2">
          <div v-for="(window, index) in scopeData.week.windows.windows" :key="window.intervalId" class="flex-fill text-center p-1 fw-medium text-secondary" :class="{ 'text-primary fw-semibold': index === scopeData.week.windows.currentIndex }" style="min-width: 60px; font-size: 1rem">
            <small>{{ window.label }}</small>
          </div>
        </div>
      </div>

      <!-- Habit Rows -->
      <div v-for="habit in scopeData.week.habits" :key="habit.id" class="d-flex align-items-center mb-3" role="row" :aria-label="habit.name">
        <!-- Habit Name -->
        <div class="d-flex align-items-center p-2 me-3 border rounded habit-name-column">
          <div class="d-flex align-items-center gap-2 me-2">
            <i class="bi bi-fire" :class="getFireColor(scopeData.week.counts[habit.id] || 0)" :title="`${scopeData.week.counts[habit.id] || 0} completions`"></i>
            <span class="text-secondary fw-medium small">{{ scopeData.week.counts[habit.id] || 0 }}</span>
          </div>
          <div class="text-truncate fw-medium text-dark-emphasis small">{{ habit.name }}</div>
        </div>

        <!-- Interval Cells -->
        <div class="d-flex flex-fill gap-2">
          <div
            v-for="(window, index) in scopeData.week.windows.windows"
            :key="`${habit.id}-${window.intervalId}`"
            class="flex-fill d-flex align-items-center justify-content-center p"
            :class="{
              'bg-primary bg-opacity-10 rounded': index === scopeData.week.windows.currentIndex,
            }"
            style="min-width: 60px"
          >
            <div class="form-check d-flex justify-content-center">
              <input
                :id="`${habit.id}-${window.intervalId}`"
                class="form-check-input"
                type="checkbox"
                :checked="isDone(habit.id, 'week', window.intervalId)"
                @change="toggleHabit(habit.id, 'week', window.intervalId)"
                :aria-label="`${habit.name} — ${window.label} — ${isDone(habit.id, 'week', window.intervalId) ? 'Done' : 'Not done'}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-muted">
      <p>No weekly habits configured.</p>
    </div>
  </ArticleTemplate>

  <!-- Monthly Habits -->
  <ArticleTemplate title="Monthly Habits" meta="Aug 6, 2025 by G. D. Ungureanu">
    <div class="small" v-if="scopeData.month.habits.length > 0">
      <!-- Column Headers -->
      <div class="d-flex align-items-end pb-2 mb-3 border-bottom">
        <div class="habit-name-column"></div>
        <div class="d-flex flex-fill gap-2">
          <div v-for="(window, index) in scopeData.month.windows.windows" :key="window.intervalId" class="flex-fill text-center p-1 fw-medium text-secondary" :class="{ 'text-primary fw-semibold': index === scopeData.month.windows.currentIndex }" style="min-width: 60px; font-size: 1rem">
            <small>{{ window.label }}</small>
          </div>
        </div>
      </div>

      <!-- Habit Rows -->
      <div v-for="habit in scopeData.month.habits" :key="habit.id" class="d-flex align-items-center mb-3" role="row" :aria-label="habit.name">
        <!-- Habit Name -->
        <div class="d-flex align-items-center p-2 me-3 border rounded habit-name-column">
          <div class="d-flex align-items-center gap-2 me-2">
            <i class="bi bi-fire" :class="getFireColor(scopeData.month.counts[habit.id] || 0)" :title="`${scopeData.month.counts[habit.id] || 0} completions`"></i>
            <span class="text-secondary fw-medium small">{{ scopeData.month.counts[habit.id] || 0 }}</span>
          </div>
          <div class="text-truncate fw-medium text-dark-emphasis small">{{ habit.name }}</div>
        </div>

        <!-- Interval Cells -->
        <div class="d-flex flex-fill gap-2">
          <div
            v-for="(window, index) in scopeData.month.windows.windows"
            :key="`${habit.id}-${window.intervalId}`"
            class="flex-fill d-flex align-items-center justify-content-center p"
            :class="{
              'bg-primary bg-opacity-10 rounded': index === scopeData.month.windows.currentIndex,
            }"
            style="min-width: 60px"
          >
            <div class="form-check d-flex justify-content-center">
              <input
                :id="`${habit.id}-${window.intervalId}`"
                class="form-check-input"
                type="checkbox"
                :checked="isDone(habit.id, 'month', window.intervalId)"
                @change="toggleHabit(habit.id, 'month', window.intervalId)"
                :aria-label="`${habit.name} — ${window.label} — ${isDone(habit.id, 'month', window.intervalId) ? 'Done' : 'Not done'}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-muted">
      <p>No monthly habits configured.</p>
    </div>
  </ArticleTemplate>

  <!-- Yearly Habits -->
  <ArticleTemplate title="Yearly Habits" meta="Aug 6, 2025 by G. D. Ungureanu">
    <div class="small" v-if="scopeData.year.habits.length > 0">
      <!-- Column Headers -->
      <div class="d-flex align-items-end pb-2 mb-3 border-bottom">
        <div class="habit-name-column"></div>
        <div class="d-flex flex-fill gap-2">
          <div v-for="(window, index) in scopeData.year.windows.windows" :key="window.intervalId" class="flex-fill text-center p-1 fw-medium text-secondary" :class="{ 'text-primary fw-semibold': index === scopeData.year.windows.currentIndex }" style="min-width: 60px; font-size: 1rem">
            <small>{{ window.label }}</small>
          </div>
        </div>
      </div>

      <!-- Habit Rows -->
      <div v-for="habit in scopeData.year.habits" :key="habit.id" class="d-flex align-items-center mb-3" role="row" :aria-label="habit.name">
        <!-- Habit Name -->
        <div class="d-flex align-items-center p-2 me-3 border rounded habit-name-column">
          <div class="d-flex align-items-center gap-2 me-2">
            <i class="bi bi-fire" :class="getFireColor(scopeData.year.counts[habit.id] || 0)" :title="`${scopeData.year.counts[habit.id] || 0} completions`"></i>
            <span class="text-secondary fw-medium small">{{ scopeData.year.counts[habit.id] || 0 }}</span>
          </div>
          <div class="text-truncate fw-medium text-dark-emphasis small">{{ habit.name }}</div>
        </div>

        <!-- Interval Cells -->
        <div class="d-flex flex-fill gap-2">
          <div
            v-for="(window, index) in scopeData.year.windows.windows"
            :key="`${habit.id}-${window.intervalId}`"
            class="flex-fill d-flex align-items-center justify-content-center p"
            :class="{
              'bg-primary bg-opacity-10 rounded': index === scopeData.year.windows.currentIndex,
            }"
            style="min-width: 60px"
          >
            <div class="form-check d-flex justify-content-center">
              <input
                :id="`${habit.id}-${window.intervalId}`"
                class="form-check-input"
                type="checkbox"
                :checked="isDone(habit.id, 'year', window.intervalId)"
                @change="toggleHabit(habit.id, 'year', window.intervalId)"
                :aria-label="`${habit.name} — ${window.label} — ${isDone(habit.id, 'year', window.intervalId) ? 'Done' : 'Not done'}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-muted">
      <p>No yearly habits configured.</p>
    </div>
  </ArticleTemplate>
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
