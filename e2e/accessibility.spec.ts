import { test, expect } from '@playwright/test'
import { content, gotoFixture, instanceCall, main, openSelect } from './helpers'

test.describe('accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
  })

  test('main has combobox role and aria-label', async ({ page }) => {
    const trigger = main(page, 'basic')
    await expect(trigger).toHaveAttribute('role', 'combobox')
    await expect(trigger).toHaveAttribute('aria-label', 'Combobox')
  })

  test('setSelected reflects aria-selected in the list', async ({ page }) => {
    await instanceCall(page, 'basic', 'setSelected', 'two')
    await openSelect(page, 'basic')

    await expect(
      content(page, 'basic').locator('.ss-option', { hasText: 'Two' })
    ).toHaveAttribute('aria-selected', 'true')
    await expect(
      content(page, 'basic').locator('.ss-option', { hasText: 'One' })
    ).toHaveAttribute('aria-selected', 'false')
  })

  test('disabled instance sets aria-disabled', async ({ page }) => {
    await expect(main(page, 'disabled')).toHaveAttribute('aria-disabled', 'true')
  })

  test('search input is hidden from screen readers when closed', async ({
    page
  }) => {
    const search = content(page, 'basic').locator('.ss-search input')
    await expect(search).toHaveAttribute('aria-hidden', 'true')

    await openSelect(page, 'basic')
    await expect(search).not.toHaveAttribute('aria-hidden', 'true')
  })
})
