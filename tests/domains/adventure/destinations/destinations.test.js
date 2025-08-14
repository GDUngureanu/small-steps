import { test, expect, vi } from 'vitest'
import { renderComponent, resolveRoute } from '../../pageTestUtils.js'

const file = 'src/domains/adventure/destinations/Destinations.vue'
const path = '/adventure/destinations'

// Expose mocks to tests for call count assertions
let mapMock, tileLayerMock, geoJSONMock

// Mock Leaflet imports since they're not available in test environment
vi.mock('leaflet', () => {
  mapMock = vi.fn(() => ({
    setView: vi.fn(),
    on: vi.fn(),
    remove: vi.fn(),
  }))
  tileLayerMock = vi.fn(() => ({
    addTo: vi.fn(),
  }))
  geoJSONMock = vi.fn(() => ({
    addTo: vi.fn(),
  }))
  return {
    default: {
      map: mapMock,
      tileLayer: tileLayerMock,
      geoJSON: geoJSONMock,
    },
  }
})

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

test('map loads only when observed and observer disconnects', async () => {
  // Ensure previous tests don't affect call counts
  mapMock.mockClear()

  const originalIO = global.IntersectionObserver
  const originalFetch = global.fetch

  let trigger
  let observeMock
  let disconnectMock
  class MockIO {
    constructor(cb) {
      this.cb = cb
      this.disconnected = false
      observeMock = vi.fn()
      disconnectMock = vi.fn(() => {
        this.disconnected = true
      })
      this.observe = observeMock
      this.disconnect = disconnectMock
      trigger = (entries) => {
        if (!this.disconnected) {
          this.cb(entries, this)
        }
      }
    }
  }

  Object.defineProperty(global, 'IntersectionObserver', {
    value: MockIO,
    configurable: true,
    writable: true,
  })

  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ type: 'FeatureCollection', features: [] }),
  })

  try {
    const wrapper = await renderComponent(file)

    expect(mapMock).not.toHaveBeenCalled()
    expect(wrapper.vm.isLoading).toBe(true)
    expect(observeMock).toHaveBeenCalledTimes(1)

    // Simulate map entering viewport
    trigger([{ isIntersecting: true }])
    await new Promise((r) => setTimeout(r, 0))

    expect(mapMock).toHaveBeenCalledTimes(1)
    // Observer should disconnect after loading
    expect(disconnectMock).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.find('.spinner-border').exists()).toBe(false)

    // Subsequent intersections should do nothing
    trigger([{ isIntersecting: true }])
    await new Promise((r) => setTimeout(r, 0))
    expect(mapMock).toHaveBeenCalledTimes(1)
    expect(disconnectMock).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.spinner-border').exists()).toBe(false)
  } finally {
    // Restore globals
    if (originalIO === undefined) {
      delete global.IntersectionObserver
    } else {
      Object.defineProperty(global, 'IntersectionObserver', {
        value: originalIO,
        configurable: true,
        writable: true,
      })
    }
    global.fetch = originalFetch
  }
})
