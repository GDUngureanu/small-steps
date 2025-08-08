import { reactive } from 'vue';
import activitiesData from './activities.js';

const sessionOverrides = reactive(new Map());
const activityIndex = reactive(new Map());
const completionCounts = reactive(new Map());
const seedActivityKeys = new Set();

function buildIndex() {
  activityIndex.clear();
  completionCounts.clear();
  seedActivityKeys.clear();

  activitiesData.activities.forEach(activity => {
    const key = `${activity.habitId}|${activity.scope}|${activity.completedOn}`;
    activityIndex.set(key, true);
    seedActivityKeys.add(key);

    const countKey = `${activity.habitId}|${activity.scope}`;
    completionCounts.set(countKey, (completionCounts.get(countKey) || 0) + 1);
  });
}

// Initialize index on module load
buildIndex();

export function resetState() {
  sessionOverrides.clear();
  buildIndex();
}

export function isDone(habitId, scope, completedOn) {
  const key = `${habitId}|${scope}|${completedOn}`;
  if (sessionOverrides.has(key)) {
    return sessionOverrides.get(key) === 'done';
  }
  return activityIndex.has(key);
}

export function toggleHabit(habitId, scope, completedOn) {
  const key = `${habitId}|${scope}|${completedOn}`;
  const countKey = `${habitId}|${scope}`;
  const current = isDone(habitId, scope, completedOn);
  const next = !current;

  if (next) {
    if (!activityIndex.has(key)) {
      activityIndex.set(key, true);
      completionCounts.set(countKey, (completionCounts.get(countKey) || 0) + 1);
    }
    if (seedActivityKeys.has(key)) {
      sessionOverrides.delete(key);
    } else {
      sessionOverrides.set(key, 'done');
    }
  } else {
    if (activityIndex.has(key)) {
      activityIndex.delete(key);
      completionCounts.set(countKey, Math.max(0, (completionCounts.get(countKey) || 1) - 1));
    }
    if (seedActivityKeys.has(key)) {
      sessionOverrides.set(key, 'undone');
    } else {
      sessionOverrides.delete(key);
    }
  }
}

export function computeCompletionCount(habitId, scope) {
  const countKey = `${habitId}|${scope}`;
  let count = completionCounts.get(countKey) || 0;

  sessionOverrides.forEach((status, key) => {
    const [overrideHabitId, overrideScope] = key.split('|');
    if (overrideHabitId === habitId && overrideScope === scope) {
      const inIndex = activityIndex.has(key);
      if (status === 'done' && !inIndex) {
        count++;
      } else if (status === 'undone' && inIndex) {
        count--;
      }
    }
  });

  return count;
}

export { sessionOverrides, activityIndex, completionCounts };
