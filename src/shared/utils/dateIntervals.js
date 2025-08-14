const LOCALE = 'en-US'
const TIMEZONE = 'Europe/Bucharest'
const MS_DAY = 86_400_000

function floorToInterval(scope, nowTZ) {
  const now = new Date(nowTZ.toLocaleString(LOCALE, { timeZone: TIMEZONE }))

  switch (scope) {
    case 'day':
      return new Date(now.getFullYear(), now.getMonth(), now.getDate())

    case 'week': {
      const monday = new Date(now)
      monday.setHours(0, 0, 0, 0)
      const isoDow = monday.getDay() || 7
      monday.setDate(monday.getDate() - (isoDow - 1))
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

function isoWeekId(inputDate) {
  const d = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()))
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  const weekYear = d.getUTCFullYear()
  const yearStart = new Date(Date.UTC(weekYear, 0, 1))
  const weekNum = Math.ceil(((d - yearStart) / MS_DAY + 1) / 7)
  return `${weekYear}-W${String(weekNum).padStart(2, '0')}`
}

function formatPeriodKey(scope, inputDate = new Date()) {
  switch (scope) {
    case 'day': {
      const y = inputDate.getFullYear()
      const m = String(inputDate.getMonth() + 1).padStart(2, '0')
      const d = String(inputDate.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    }

    case 'week':
      return isoWeekId(inputDate)

    case 'month': {
      const y = inputDate.getFullYear()
      const m = String(inputDate.getMonth() + 1).padStart(2, '0')
      return `${y}-${m}`
    }

    case 'year':
      return String(inputDate.getFullYear())

    default:
      throw new Error(`Unknown scope: ${scope}`)
  }
}

function humanLabel(scope, start) {
  const startDate = new Date(start)

  switch (scope) {
    case 'day':
      return new Intl.DateTimeFormat(LOCALE, {
        timeZone: TIMEZONE,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
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

  const currentEnd = new Date(shiftInterval(currentInterval, scope, 1))
  currentEnd.setMilliseconds(currentEnd.getMilliseconds() - 1)
  windows.push({
    intervalId: formatPeriodKey(scope, currentInterval),
    label: humanLabel(scope, currentInterval),
    start: currentInterval,
    end: currentEnd,
  })

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

function isoWeekStartUTC(year, week) {
  const jan4 = Date.UTC(year, 0, 4)
  const jan4DowMon0 = (new Date(jan4).getUTCDay() + 6) % 7
  const week1Mon = jan4 - jan4DowMon0 * MS_DAY
  return week1Mon + (week - 1) * 7 * MS_DAY
}

function parsePeriodKey(scope, key) {
  if (scope === 'day') {
    const [y, m, d] = key.split('-').map(Number)
    return Date.UTC(y, m - 1, d) / MS_DAY
  }
  if (scope === 'week') {
    const [y, wRaw] = key.split('-W').map(Number)
    return isoWeekStartUTC(y, wRaw) / MS_DAY / 7
  }
  if (scope === 'month') {
    const [y, m] = key.split('-').map(Number)
    return y * 12 + (m - 1)
  }
  return Number(key)
}

export {
  floorToInterval,
  shiftInterval,
  isoWeekId,
  formatPeriodKey,
  humanLabel,
  computeWindows,
  isoWeekStartUTC,
  parsePeriodKey,
  MS_DAY,
}