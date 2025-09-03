import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

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
export const useNavigation = defineStore('navigation', () => {
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

    // Normalize each section: rename overview link to the domain name
    // and ensure it appears first in the list
    const toTitleCase = (key) => key.charAt(0).toUpperCase() + key.slice(1)
    const groupLabelMap = {
      curiosity: 'Curiozity',
      'inner-circle': 'Inner Circle',
      pisicuta: 'Pisicuta',
    }

    Object.keys(sections).forEach((group) => {
      const overviewPath = `/${group}`
      const overviewLabel = groupLabelMap[group] || toTitleCase(group)
      sections[group].items = sections[group].items
        .map((item) => (item.path === overviewPath ? { ...item, label: overviewLabel } : item))
        .sort((a, b) => (a.path === overviewPath ? -1 : b.path === overviewPath ? 1 : 0))
    })

    // Enforce custom group order and labels
    const groupOrder = ['curiosity', 'foundation', 'health', 'vocation', 'growth', 'pisicuta']
    const groupLabelMapOrder = {
      curiosity: 'Curiozity',
      pisicuta: 'Pisicuta',
    }

    const ordered = {}
    const titleCase = (key) => key.charAt(0).toUpperCase() + key.slice(1)

    groupOrder.forEach((key) => {
      if (sections[key]) {
        ordered[key] = {
          ...sections[key],
          label: groupLabelMapOrder[key] || titleCase(key),
        }
      }
    })
    // Append any groups not explicitly ordered
    Object.keys(sections).forEach((key) => {
      if (!ordered[key]) {
        ordered[key] = sections[key]
      }
    })
    return ordered
  })

  return {
    navigationItems,
    dropdownSections,
  }
})
