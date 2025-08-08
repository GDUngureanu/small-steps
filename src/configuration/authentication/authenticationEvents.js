/**
 * EventTarget used to dispatch and listen for authentication-related events,
 * such as {@link AUTH_REQUIRED_EVENT}.
 * @type {EventTarget}
 */
export const authenticationEvents = new EventTarget()

/**
 * Event name emitted on {@link authenticationEvents} when a route requires
 * authentication.
 * @type {string}
 */
export const AUTH_REQUIRED_EVENT = 'authentication-required'
