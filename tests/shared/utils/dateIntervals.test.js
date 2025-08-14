import { test, expect } from 'vitest'
import {
  shiftInterval,
  formatPeriodKey,
  isoWeekId,
  parsePeriodKey,
  MS_DAY,
} from '../../../src/shared/utils/dateIntervals.js'

test('shiftInterval moves over leap day correctly', () => {
  const start = new Date(Date.UTC(2020, 1, 28))
  const feb29 = shiftInterval(start, 'day', 1)
  expect(feb29.getUTCFullYear()).toBe(2020)
  expect(feb29.getUTCMonth()).toBe(1)
  expect(feb29.getUTCDate()).toBe(29)

  const mar1 = shiftInterval(start, 'day', 2)
  expect(mar1.getUTCFullYear()).toBe(2020)
  expect(mar1.getUTCMonth()).toBe(2)
  expect(mar1.getUTCDate()).toBe(1)
})

test('formatPeriodKey creates key for leap day', () => {
  const date = new Date(Date.UTC(2024, 1, 29))
  expect(formatPeriodKey('day', date)).toBe('2024-02-29')
})

test('isoWeekId identifies week for leap day', () => {
  const date = new Date(Date.UTC(2020, 1, 29))
  expect(isoWeekId(date)).toBe('2020-W09')
})

test('parsePeriodKey parses week in leap year', () => {
  const expected = Date.UTC(2020, 1, 24) / MS_DAY / 7
  expect(parsePeriodKey('week', '2020-W09')).toBe(expected)
})
