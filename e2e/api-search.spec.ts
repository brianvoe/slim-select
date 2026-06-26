import { test, expect } from '@playwright/test'
import {
  closeWithEscape,
  content,
  getSelected,
  gotoFixture,
  openSelect,
  option
} from './helpers'

async function typeApiSearch(
  page: import('@playwright/test').Page,
  key: 'apiSearch' | 'apiSearchMulti' | 'apiSearchAddable',
  value: string
): Promise<void> {
  const search = content(page, key).locator('.ss-search input')
  await search.fill(value)
  await page.waitForTimeout(200)
}

test.describe('API search', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
    await page.evaluate(() => {
      const state = (window as any).e2e.apiSearchState
      state.calls = []
      state.nextError = null
      state.results = [
        { value: 'api-one', text: 'API One' },
        { value: 'api-two', text: 'API Two' },
        { value: 'api-null', text: 'API Null' }
      ]
    })
  })

  test('loads API results when user searches', async ({ page }) => {
    await openSelect(page, 'apiSearch')
    await expect(option(page, 'apiSearch', 'Catalog A')).toBeVisible()
    await expect(option(page, 'apiSearch', 'Catalog B')).toBeVisible()

    await typeApiSearch(page, 'apiSearch', 'ap')

    await expect(option(page, 'apiSearch', 'API One')).toBeVisible()
    await expect(option(page, 'apiSearch', 'API Two')).toBeVisible()
    await expect(option(page, 'apiSearch', 'Catalog B')).toBeHidden()
    await expect(content(page, 'apiSearch').locator('.ss-option')).toHaveCount(4)
  })

  test('restores catalog when search is cleared on close', async ({ page }) => {
    await openSelect(page, 'apiSearch')
    await typeApiSearch(page, 'apiSearch', 'ap')
    await expect(option(page, 'apiSearch', 'API One')).toBeVisible()

    await closeWithEscape(page, 'apiSearch')
    await openSelect(page, 'apiSearch')

    await expect(option(page, 'apiSearch', 'Catalog A')).toBeVisible()
    await expect(option(page, 'apiSearch', 'Catalog B')).toBeVisible()
    await expect(option(page, 'apiSearch', 'API One')).toHaveCount(0)
  })

  test('shows error message when API search rejects', async ({ page }) => {
    await page.evaluate(() => {
      ;(window as any).e2e.apiSearchState.nextError = 'Something went wrong'
    })

    await openSelect(page, 'apiSearch')
    await typeApiSearch(page, 'apiSearch', 'fail')

    await expect(content(page, 'apiSearch').locator('.ss-error')).toHaveText(
      'Something went wrong'
    )
    await expect(content(page, 'apiSearch').locator('.ss-option')).toHaveCount(
      0
    )
  })

  test('recovers with new results after API search error', async ({ page }) => {
    await page.evaluate(() => {
      ;(window as any).e2e.apiSearchState.nextError = 'Temporary failure'
    })

    await openSelect(page, 'apiSearch')
    await typeApiSearch(page, 'apiSearch', 'bad')
    await expect(content(page, 'apiSearch').locator('.ss-error')).toHaveText(
      'Temporary failure'
    )

    await typeApiSearch(page, 'apiSearch', 'ok')
    await expect(content(page, 'apiSearch').locator('.ss-error')).toHaveCount(0)
    await expect(option(page, 'apiSearch', 'API One')).toBeVisible()
  })

  test('hides selected options in API results when hideSelected is true', async ({
    page
  }) => {
    await openSelect(page, 'apiSearchMulti')
    await typeApiSearch(page, 'apiSearchMulti', 'ap')
    await expect(option(page, 'apiSearchMulti', 'API Null')).toBeVisible()

    await option(page, 'apiSearchMulti', 'API Null').click({
      modifiers: ['Meta']
    })
    expect(await getSelected(page, 'apiSearchMulti')).toContain('api-null')

    await typeApiSearch(page, 'apiSearchMulti', 'ap')
    await expect(
      option(page, 'apiSearchMulti', 'API Null')
    ).toHaveClass(/ss-hide/)
    expect(await getSelected(page, 'apiSearchMulti')).toContain('api-null')
  })

  test('addable during API search adds option to catalog', async ({ page }) => {
    await openSelect(page, 'apiSearchAddable')
    await typeApiSearch(page, 'apiSearchAddable', 'new')
    await expect(
      content(page, 'apiSearchAddable').locator('.ss-option')
    ).toHaveCount(0)

    const search = content(page, 'apiSearchAddable').locator(
      '.ss-search input'
    )
    await search.fill('Custom')
    await search.press('Enter')
    await page.waitForTimeout(200)

    expect(await getSelected(page, 'apiSearchAddable')).toEqual(['custom'])

    await closeWithEscape(page, 'apiSearchAddable')
    await openSelect(page, 'apiSearchAddable')

    await expect(option(page, 'apiSearchAddable', 'Catalog A')).toBeVisible()
    await expect(option(page, 'apiSearchAddable', 'Catalog B')).toBeVisible()
    await expect(option(page, 'apiSearchAddable', 'Custom')).toBeVisible()
  })
})
