/**
 * Custom event system for authentication state management.
 *
 * Provides a decoupled way for components to communicate about authentication
 * requirements without tight coupling to specific authentication implementations.
 */

export const AUTH_REQUIRED_EVENT = 'auth-required'

export const authenticationEvents = new EventTarget()