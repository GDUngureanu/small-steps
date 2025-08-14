import { onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Provide helpers for prefetching route components on hover.
 *
 * Returns `prefetch(path)` and `cancelPrefetch()` functions. Prefetched paths
 * are cached to avoid repeated network requests.
 */
export function usePrefetch() {
  const router = useRouter()
  const prefetched = new Set()
  let prefetchTimer

  const prefetch = (path) => {
    if (prefetched.has(path)) return
    clearTimeout(prefetchTimer)
    prefetchTimer = setTimeout(() => {
      const route = router.resolve(path)
      route.matched.forEach((record) => {
        const component = record.components?.default
        if (typeof component === 'function') {
          component()
        }
      })
      prefetched.add(path)
    }, 150)
  }

  const cancelPrefetch = () => {
    clearTimeout(prefetchTimer)
  }

  onBeforeUnmount(cancelPrefetch)

  return { prefetch, cancelPrefetch }
}