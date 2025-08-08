import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'
import path from 'node:path'

const pages = [
  { file: 'src/pages/entertainment/Entertainment.vue', route: '/entertainment' },
  { file: 'src/pages/entertainment/Anime.vue', route: '/anime' },
  { file: 'src/pages/entertainment/Movies.vue', route: '/movies' },
]

for (const { file, route } of pages) {
  const name = path.basename(file)
  test(`${name} renders without errors`, async () => {
    const html = await renderComponent(file)
    expect(html.length).toBeGreaterThan(0)
  })

  test(`route ${route} resolves`, async () => {
    const resolved = await resolveRoute(route)
    expect(resolved).toBe(route)
  })
}
