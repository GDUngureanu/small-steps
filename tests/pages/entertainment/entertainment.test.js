import { test, expect } from 'vitest'
import { renderComponent, resolveRoute } from '../pageTestUtils.js'
import path from 'node:path'

const pages = [
  { file: 'src/pages/entertainment/Entertainment.vue', route: '/entertainment' },
  { file: 'src/pages/entertainment/Anime.vue', route: '/entertainment/anime' },
  { file: 'src/pages/entertainment/Movies.vue', route: '/entertainment/movies' },
]

for (const { file, route } of pages) {
  const name = path.basename(file)
  test(`${name} renders without errors`, async () => {
    const wrapper = await renderComponent(file)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toContain('article-template-stub') // Component renders properly
  })

  test(`route ${route} resolves`, async () => {
    const resolved = await resolveRoute(route)
    expect(resolved).toBe(route)
  })
}
