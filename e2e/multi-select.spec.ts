import { test, expect } from '@playwright/test'
import {
  getSelected,
  gotoFixture,
  main,
  openContent,
  openSelect,
  option
} from './helpers'

test.describe('multi select', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
  })

  test('selects multiple values with modifier clicks', async ({ page }) => {
    await openSelect(page, 'multi')
    await option(page, 'multi', 'Red').click({ modifiers: ['ControlOrMeta'] })
    await option(page, 'multi', 'Blue').click({ modifiers: ['ControlOrMeta'] })

    expect(await getSelected(page, 'multi')).toEqual(
      expect.arrayContaining(['red', 'blue'])
    )
    await expect(main(page, 'multi').locator('.ss-value')).toHaveCount(2)
  })

  test('stays open when closeOnSelect is false', async ({ page }) => {
    await openSelect(page, 'multi')
    await option(page, 'multi', 'Green').click()
    await expect(openContent(page, 'multi')).toBeVisible()
  })

  test('toggles option off with modifier click', async ({ page }) => {
    await openSelect(page, 'multi')
    await option(page, 'multi', 'Yellow').click({ modifiers: ['ControlOrMeta'] })
    expect(await getSelected(page, 'multi')).toContain('yellow')

    await option(page, 'multi', 'Yellow').click({ modifiers: ['ControlOrMeta'] })
    expect(await getSelected(page, 'multi')).not.toContain('yellow')
  })

  test('syncs multiple native selected options', async ({ page }) => {
    await openSelect(page, 'multi')
    await option(page, 'multi', 'Red').click({ modifiers: ['ControlOrMeta'] })
    await option(page, 'multi', 'Green').click({ modifiers: ['ControlOrMeta'] })

    const selectedValues = await page.evaluate(() => {
      return Array.from((window as any).e2e.selects.multi.selectedOptions).map(
        (o: HTMLOptionElement) => o.value
      )
    })
    expect(selectedValues).toEqual(expect.arrayContaining(['red', 'green']))
  })
})
