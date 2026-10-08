import { test, expect } from '@playwright/test'
import { content, expectClosed, getSelected, gotoFixture, main, openContent, openSelect, option } from './helpers'

test.describe('keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
  })

  test('ArrowDown opens dropdown and highlights first option', async ({ page }) => {
    await main(page, 'keyboard').focus()
    await page.keyboard.press('ArrowDown')
    await expect(openContent(page, 'keyboard')).toBeVisible()
    await expect(content(page, 'keyboard').locator('.ss-option.ss-highlighted')).toHaveCount(1)
  })

  test('ArrowDown and Enter selects highlighted option', async ({ page }) => {
    await main(page, 'keyboard').focus()
    await page.keyboard.press('ArrowDown')
    const highlighted = content(page, 'keyboard').locator('.ss-option.ss-highlighted')
    await expect(highlighted).toHaveCount(1)
    const label = (await highlighted.textContent())?.trim()
    await page.keyboard.press('Enter')

    const selected = await getSelected(page, 'keyboard')
    expect(selected).toHaveLength(1)
    if (label === 'One') expect(selected).toEqual(['one'])
    if (label === 'Two') expect(selected).toEqual(['two'])
    if (label === 'Three') expect(selected).toEqual(['three'])
  })

  test('Escape closes from search input', async ({ page }) => {
    await openSelect(page, 'basic')
    await content(page, 'basic').locator('.ss-search input').focus()
    await page.keyboard.press('Escape')
    await expectClosed(page, 'basic')
  })

  test('typing opens dropdown on no-search select', async ({ page }) => {
    await main(page, 'noSearch').focus()
    await page.keyboard.press('b')
    await expect(openContent(page, 'noSearch')).toBeVisible()
    await expect(content(page, 'noSearch').locator('.ss-option.ss-highlighted')).toHaveText('Banana')
  })
})

test.describe('typeahead', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
  })

  test('typing jumps to the matching option without selecting it', async ({ page }) => {
    await main(page, 'typeahead').focus()
    await page.keyboard.press('b')

    await expect(openContent(page, 'typeahead')).toBeVisible()
    await expect(content(page, 'typeahead').locator('.ss-option.ss-highlighted')).toHaveText('Banana')
    expect(await getSelected(page, 'typeahead')).toEqual(['apple'])
  })

  test('a second letter narrows the prefix', async ({ page }) => {
    await main(page, 'typeahead').focus()
    await page.keyboard.press('h')
    await expect(content(page, 'typeahead').locator('.ss-option.ss-highlighted')).toHaveText('Horse')

    await page.keyboard.press('a')
    await expect(content(page, 'typeahead').locator('.ss-option.ss-highlighted')).toHaveText('Hamster')
    expect(await getSelected(page, 'typeahead')).toEqual(['apple'])
  })

  test('repeating a letter cycles to the next match', async ({ page }) => {
    await main(page, 'typeahead').focus()
    await page.keyboard.press('b')
    await expect(content(page, 'typeahead').locator('.ss-option.ss-highlighted')).toHaveText('Banana')

    await page.keyboard.press('b')
    await expect(content(page, 'typeahead').locator('.ss-option.ss-highlighted')).toHaveText('Blueberry')
  })

  test('Enter selects the highlighted option', async ({ page }) => {
    await main(page, 'typeahead').focus()
    await page.keyboard.press('b')
    await page.keyboard.press('Enter')

    expect(await getSelected(page, 'typeahead')).toEqual(['banana'])
    await expectClosed(page, 'typeahead')
  })

  test('typing does not jump to an option when search is on', async ({ page }) => {
    await main(page, 'basic').focus()
    await page.keyboard.press('t')

    await expect(openContent(page, 'basic')).toBeVisible()
    await expect(content(page, 'basic').locator('.ss-option.ss-highlighted')).toHaveCount(0)
    await expect(content(page, 'basic').locator('.ss-search input')).toBeFocused()
  })
})

test.describe('label interaction', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
  })

  test('clicking associated label opens the select', async ({ page }) => {
    await page.locator('label[for="label-select"]').click()
    await page.waitForTimeout(20)
    await expect(openContent(page, 'label')).toBeVisible()
  })

  test('label-opened select can choose an option', async ({ page }) => {
    await page.locator('label[for="label-select"]').click()
    await page.waitForTimeout(20)
    await option(page, 'label', 'Blue').click()
    await expect(main(page, 'label')).toContainText('Blue')
  })
})
