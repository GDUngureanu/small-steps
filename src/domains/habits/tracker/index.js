// =====================================================
// Habits Domain - Public API
// =====================================================
// This module exposes the public interface for the habits domain.
// External domains should only import from this file.

// Re-export main composables
export { useHabits } from './composables/useHabits.js'
export { useActivities } from './composables/useActivities.js'

// Re-export types (when we add them)
// export * from './types/index.js'

// Domain-specific utilities (if any)
// export * from './utils/index.js'