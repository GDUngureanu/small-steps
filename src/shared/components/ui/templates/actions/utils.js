/**
 * Discrete priority levels used by actions.
 * @readonly
 */
export const PRIORITY_LEVELS = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
}

/**
 * Display configuration for each priority level.
 */
export const PRIORITY_CONFIG = {
  [PRIORITY_LEVELS.LOW]: {
    text: 'Low',
    class: 'text-secondary',
    icon: 'bi-flag',
  },
  [PRIORITY_LEVELS.MEDIUM]: {
    text: 'Medium',
    class: 'text-warning',
    icon: 'bi-flag-fill',
  },
  [PRIORITY_LEVELS.HIGH]: {
    text: 'High',
    class: 'text-danger',
    icon: 'bi-flag-fill',
  },
}

/**
 * Format an ISO date string for display using the user's locale.
 * @param {string|number|Date} dateString
 * @returns {string}
 */
export const formatDate = (dateString) => new Date(dateString).toLocaleDateString()

/**
 * Resolve a human-readable label for the given priority.
 * @param {number} priority
 * @returns {string}
 */
export const getPriorityText = (priority) => PRIORITY_CONFIG[priority]?.text || 'Low'

/**
 * Resolve the CSS class associated with the given priority.
 * @param {number} priority
 * @returns {string}
 */
export const getPriorityClass = (priority) => PRIORITY_CONFIG[priority]?.class || 'text-secondary'
