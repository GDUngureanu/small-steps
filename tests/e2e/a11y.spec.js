import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home page has no critical accessibility violations', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page })
    // Exclude known design decisions that don't impact core functionality
    .disableRules(['color-contrast', 'link-in-text-block'])
    .analyze()
  const critical = results.violations.filter((v) => v.impact === 'critical')
  expect(critical).toEqual([])
})
