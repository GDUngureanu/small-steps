import test from 'node:test';
import assert from 'node:assert/strict';
import { getPriorityText, getPriorityClass, PRIORITY_LEVELS } from '../src/templates/actions/utils.js';

test('getPriorityText returns correct labels', () => {
  assert.equal(getPriorityText(PRIORITY_LEVELS.LOW), 'Low');
  assert.equal(getPriorityText(PRIORITY_LEVELS.MEDIUM), 'Medium');
  assert.equal(getPriorityText(PRIORITY_LEVELS.HIGH), 'High');
});

test('getPriorityClass returns correct classes', () => {
  assert.equal(getPriorityClass(PRIORITY_LEVELS.LOW), 'text-secondary');
  assert.equal(getPriorityClass(PRIORITY_LEVELS.MEDIUM), 'text-warning');
  assert.equal(getPriorityClass(PRIORITY_LEVELS.HIGH), 'text-danger');
});
