import { test, expect } from 'vitest'
import { getPriorityText, getPriorityClass, PRIORITY_LEVELS } from '../../../../../src/components/shared/templates/actions/utils.js'

test('getPriorityText returns correct labels', () => {
  expect(getPriorityText(PRIORITY_LEVELS.LOW)).toBe('Low')
  expect(getPriorityText(PRIORITY_LEVELS.MEDIUM)).toBe('Medium')
  expect(getPriorityText(PRIORITY_LEVELS.HIGH)).toBe('High')
})

test('getPriorityClass returns correct classes', () => {
  expect(getPriorityClass(PRIORITY_LEVELS.LOW)).toBe('text-secondary')
  expect(getPriorityClass(PRIORITY_LEVELS.MEDIUM)).toBe('text-warning')
  expect(getPriorityClass(PRIORITY_LEVELS.HIGH)).toBe('text-danger')
})
