import { test, expect, vi } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/pages/adventure/destinations/Destinations.vue'
const path = '/adventure/destinations'

// Mock Leaflet imports since they're not available in test environment
vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => ({
      setView: vi.fn(),
      on: vi.fn(),
      remove: vi.fn(),
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
    geoJSON: vi.fn(() => ({
      addTo: vi.fn(),
    })),
  }
}))

vi.mock('leaflet/dist/leaflet.css', () => ({}))

test('Destinations page renders without errors', async () => {
  const wrapper = await renderComponent(file)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
})

test('Destinations route resolves correctly', async () => {
  const resolved = await resolveRoute(path)
  expect(resolved).toBe(path)
})
