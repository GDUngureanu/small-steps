export const PRIORITY_LEVELS = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2
};

export const PRIORITY_CONFIG = {
    [PRIORITY_LEVELS.LOW]: {
        text: 'Low',
        class: 'text-secondary',
        icon: 'bi-flag'
    },
    [PRIORITY_LEVELS.MEDIUM]: {
        text: 'Medium',
        class: 'text-warning',
        icon: 'bi-flag-fill'
    },
    [PRIORITY_LEVELS.HIGH]: {
        text: 'High',
        class: 'text-danger',
        icon: 'bi-flag-fill'
    }
};

export const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString();

export const getPriorityText = (priority) =>
    PRIORITY_CONFIG[priority]?.text || 'Low';

export const getPriorityClass = (priority) =>
    PRIORITY_CONFIG[priority]?.class || 'text-secondary';
