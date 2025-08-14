import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home page has no detectable accessibility violations', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page }).analyze()
  const serious = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact))
  expect(serious).toEqual([])
})
