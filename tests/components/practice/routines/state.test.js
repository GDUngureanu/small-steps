import test from 'node:test';
import assert from 'node:assert/strict';
import {
  activityIndex,
  completionCounts,
  sessionOverrides,
  isDone,
  toggleHabit,
  computeCompletionCount,
  resetState
} from '../../../../src/components/practice/routines/state.js';

test('toggle seeded activity updates index and counts', () => {
  resetState();
  const habit = 'h-001';
  const scope = 'day';
  const interval = '2025-08-01';
  const key = `${habit}|${scope}|${interval}`;
  const countKey = `${habit}|${scope}`;

  assert.equal(isDone(habit, scope, interval), true);
  assert.equal(computeCompletionCount(habit, scope), 5);

  toggleHabit(habit, scope, interval);
  assert.equal(isDone(habit, scope, interval), false);
  assert.equal(activityIndex.has(key), false);
  assert.equal(sessionOverrides.get(key), 'undone');
  assert.equal(completionCounts.get(countKey), 4);
  assert.equal(computeCompletionCount(habit, scope), 4);

  toggleHabit(habit, scope, interval);
  assert.equal(isDone(habit, scope, interval), true);
  assert.equal(activityIndex.has(key), true);
  assert.equal(sessionOverrides.has(key), false);
  assert.equal(completionCounts.get(countKey), 5);
  assert.equal(computeCompletionCount(habit, scope), 5);
});

test('toggle new activity updates index and counts', () => {
  resetState();
  const habit = 'h-001';
  const scope = 'day';
  const interval = '2025-08-03';
  const key = `${habit}|${scope}|${interval}`;
  const countKey = `${habit}|${scope}`;

  assert.equal(isDone(habit, scope, interval), false);
  assert.equal(computeCompletionCount(habit, scope), 5);

  toggleHabit(habit, scope, interval);
  assert.equal(isDone(habit, scope, interval), true);
  assert.equal(activityIndex.has(key), true);
  assert.equal(sessionOverrides.get(key), 'done');
  assert.equal(completionCounts.get(countKey), 6);
  assert.equal(computeCompletionCount(habit, scope), 6);

  toggleHabit(habit, scope, interval);
  assert.equal(isDone(habit, scope, interval), false);
  assert.equal(activityIndex.has(key), false);
  assert.equal(sessionOverrides.has(key), false);
  assert.equal(completionCounts.get(countKey), 5);
  assert.equal(computeCompletionCount(habit, scope), 5);
});

test('manual session overrides adjust counts without index changes', () => {
  resetState();
  const habit = 'h-002';
  const scope = 'day';
  const interval = '2025-08-06';
  const key = `${habit}|${scope}|${interval}`;

  assert.equal(isDone(habit, scope, interval), false);
  assert.equal(computeCompletionCount(habit, scope), 3);

  sessionOverrides.set(key, 'done');
  assert.equal(isDone(habit, scope, interval), true);
  assert.equal(computeCompletionCount(habit, scope), 4);

  sessionOverrides.set(key, 'undone');
  assert.equal(isDone(habit, scope, interval), false);
  assert.equal(computeCompletionCount(habit, scope), 3);

  sessionOverrides.delete(key);

  const seedHabit = 'h-003';
  const seedInterval = '2025-08-01';
  const seedKey = `${seedHabit}|${scope}|${seedInterval}`;
  assert.equal(isDone(seedHabit, scope, seedInterval), true);
  sessionOverrides.set(seedKey, 'undone');
  assert.equal(isDone(seedHabit, scope, seedInterval), false);
  assert.equal(computeCompletionCount(seedHabit, scope), 2);
});
