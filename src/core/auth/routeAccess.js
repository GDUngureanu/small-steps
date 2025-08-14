// Pure utilities for evaluating route access based on route metadata.

/**
 * Build a Map of route metadata keyed by path for efficient lookup.
 *
 * @param {Array<import('vue-router').RouteRecordRaw>} routes
 * @returns {Map<string, any>} Map from path to meta object
 */
export function buildRouteMetaMap(routes) {
  return new Map(routes.map((route) => [route.path, route.meta || {}]))
}

/**
 * Determine whether the given path requires authentication.
 *
 * @param {Map<string, any>} metaMap
 * @param {string} path
 * @returns {boolean}
 */
export function isRouteRestricted(metaMap, path) {
  return Boolean(metaMap.get(path)?.requiresAuth)
}

/**
 * Determine whether the given path is public (does not require authentication).
 *
 * @param {Map<string, any>} metaMap
 * @param {string} path
 * @returns {boolean}
 */
export function isRoutePublic(metaMap, path) {
  return !isRouteRestricted(metaMap, path)
}

/**
 * Determine whether the user can access the given path.
 *
 * @param {Map<string, any>} metaMap
 * @param {string} path
 * @param {boolean} authenticated
 * @returns {boolean}
 */
export function canAccessRoute(metaMap, path, authenticated) {
  return isRoutePublic(metaMap, path) || authenticated
}