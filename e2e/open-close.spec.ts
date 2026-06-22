import { test, expect } from '@playwright/test'
import {
  closeWithEscape,
  content,
  expectClosed,
  getSelected,
  gotoFixture,
  instanceCall,
  main,
  openContent,
  openSelect,
  option,
  section
} from './helpers'

test.describe('open and close', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
  })

  test('opens on main click and shows options', async ({ page }) => {
    await openSelect(page, 'basic')
    await expect(option(page, 'basic', 'One')).toBeVisible()
    await expect(option(page, 'basic', 'Two')).toBeVisible()
    await expect(option(page, 'basic', 'Three')).toBeVisible()
  })

  test('closes on Escape', async ({ page }) => {
    await openSelect(page, 'basic')
    await closeWithEscape(page, 'basic')
    await expectClosed(page, 'basic')
  })

  test('toggles closed when main is clicked again', async ({ page }) => {
    await openSelect(page, 'basic')
    await main(page, 'basic').click()
    await expect(openContent(page, 'basic')).toHaveCount(0)
  })

  test('closes when clicking outside after fully open', async ({ page }) => {
    await openSelect(page, 'basic')
    await page.locator('[data-e2e="outside-target"]').click()
    await expect(openContent(page, 'basic')).toHaveCount(0)
  })

  test('sets aria-expanded on open and close', async ({ page }) => {
    const trigger = main(page, 'basic')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await openSelect(page, 'basic')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await closeWithEscape(page, 'basic')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  test('open down adds direction class below', async ({ page }) => {
    await openSelect(page, 'openDown')
    await expect(content(page, 'openDown')).toHaveClass(/ss-dir-below/)
  })

  test('open up adds direction class above', async ({ page }) => {
    await openSelect(page, 'openUp')
    await expect(content(page, 'openUp')).toHaveClass(/ss-dir-above/)
  })

  test('disabled select does not open on click', async ({ page }) => {
    await main(page, 'disabled').click({ force: true })
    await expect(openContent(page, 'disabled')).toHaveCount(0)
  })

  test('shows placeholder text before selection', async ({ page }) => {
    await expect(main(page, 'placeholder')).toContainText('Choose one...')
  })
})

test.describe('selection', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
  })

  test('selects an option and updates displayed value', async ({ page }) => {
    await openSelect(page, 'basic')
    await option(page, 'basic', 'Two').click()
    await expect(main(page, 'basic')).toContainText('Two')
    expect(await getSelected(page, 'basic')).toEqual(['two'])
  })

  test('syncs native select value on selection', async ({ page }) => {
    await openSelect(page, 'basic')
    await option(page, 'basic', 'Three').click()

    const nativeValue = await page.evaluate(() => {
      return (window as any).e2e.selects.basic.value
    })
    expect(nativeValue).toBe('three')
  })

  test('deselect button clears selection', async ({ page }) => {
    await instanceCall(page, 'deselect', 'setSelected', 'beta')
    expect(await getSelected(page, 'deselect')).toEqual(['beta'])
    await expect(main(page, 'deselect')).toContainText('Beta')

    await main(page, 'deselect').locator('.ss-deselect').click()
    expect(await getSelected(page, 'deselect')).toEqual([''])
  })

  test('does not select disabled options', async ({ page }) => {
    await openSelect(page, 'disabledOption')
    await option(page, 'disabledOption', 'Open').click()
    expect(await getSelected(page, 'disabledOption')).toEqual(['open'])

    await content(page, 'disabledOption')
      .locator('.ss-option.ss-disabled', { hasText: 'Locked' })
      .click({ force: true })
    expect(await getSelected(page, 'disabledOption')).toEqual(['open'])
  })

  test('renders optgroup labels', async ({ page }) => {
    await openSelect(page, 'optgroups')
    await expect(content(page, 'optgroups').locator('.ss-optgroup-label')).toHaveCount(
      2
    )
    await option(page, 'optgroups', 'Carrot').click()
    await expect(main(page, 'optgroups')).toContainText('Carrot')
  })
})
