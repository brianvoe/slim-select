import { test, expect } from '@playwright/test'
import {
  closeWithEscape,
  content,
  getSelected,
  gotoFixture,
  openContent,
  openSelect,
  option
} from './helpers'

test.describe('search', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
  })

  test('filters options as user types', async ({ page }) => {
    await openSelect(page, 'basic')
    const search = content(page, 'basic').locator('.ss-search input')
    await search.fill('tw')

    await expect(option(page, 'basic', 'Two')).toBeVisible()
    await expect(option(page, 'basic', 'One')).toBeHidden()
    await expect(option(page, 'basic', 'Three')).toBeHidden()
  })

  test('shows no results message when nothing matches', async ({ page }) => {
    await openSelect(page, 'basic')
    await content(page, 'basic').locator('.ss-search input').fill('zzzzz')
    await page.waitForTimeout(150)
    await expect(content(page, 'basic').locator('.ss-list')).toContainText(
      'No Results'
    )
  })

  test('clears search input when dropdown closes', async ({ page }) => {
    await openSelect(page, 'basic')
    const search = content(page, 'basic').locator('.ss-search input')
    await search.fill('two')
    await closeWithEscape(page, 'basic')
    await expect(search).toHaveValue('')
  })

  test('keeps search text when keepSearch is enabled', async ({ page }) => {
    await openSelect(page, 'keepSearch')
    const search = content(page, 'keepSearch').locator('.ss-search input')
    await search.fill('cat')
    await closeWithEscape(page, 'keepSearch')
    await expect(search).toHaveValue('cat')
  })

  test('highlights matching text when searchHighlight is on', async ({
    page
  }) => {
    await openSelect(page, 'searchHighlight')
    await content(page, 'searchHighlight')
      .locator('.ss-search input')
      .fill('Type')
    await page.waitForTimeout(150)
    await expect(
      content(page, 'searchHighlight').locator('.ss-search-highlight')
    ).not.toHaveCount(0)
  })

  test('no-search config hides the search bar', async ({ page }) => {
    await openSelect(page, 'noSearch')
    await expect(
      content(page, 'noSearch').locator('.ss-search')
    ).toHaveClass(/ss-hide/)
    await expect(option(page, 'noSearch', 'Apple')).toBeVisible()
  })
})
