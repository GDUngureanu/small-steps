import { computed } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Build navigation structures from router route records.
 *
 * Routes that define `meta.navLabel` are included. Optional `meta.navGroup`
 * groups routes into dropdown sections.
 *
 * Returned helpers:
 * - `navigationItems` for top-level links
 * - `dropdownSections` for grouped items keyed by group name
 */
export function useNavigation() {
  const router = useRouter()
  const routes = router.getRoutes().filter((r) => r.meta && r.meta.navLabel)

  const navigationItems = computed(() =>
    routes
      .filter((r) => !r.meta.navGroup)
      .map((r) => ({
        path: r.path,
        label: r.meta.navLabel,
        requiresAuth: !!r.meta.requiresAuth,
        icon: r.meta.icon,
        badge: r.meta.badge,
      }))
  )

  const dropdownSections = computed(() => {
    const sections = {}
    routes
      .filter((r) => r.meta.navGroup)
      .forEach((route) => {
        const group = route.meta.navGroup
        if (!sections[group]) {
          sections[group] = {
            label: group.charAt(0).toUpperCase() + group.slice(1),
            items: [],
          }
        }
        sections[group].items.push({
          path: route.path,
          label: route.meta.navLabel,
          requiresAuth: !!route.meta.requiresAuth,
          icon: route.meta.icon,
          badge: route.meta.badge,
        })
      })
    return sections
  })

  return {
    navigationItems,
    dropdownSections,
  }
}
