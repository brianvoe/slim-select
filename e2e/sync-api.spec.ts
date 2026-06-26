import { test, expect } from '@playwright/test'
import { getSelected, gotoFixture, instanceCall, main, openContent } from './helpers'

test.describe('native sync', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
  })

  test('keeps options when native option is added and selected', async ({
    page
  }) => {
    await page.evaluate(() => {
      const select = (window as any).e2e.selects.nativeSync as HTMLSelectElement
      const option = document.createElement('option')
      option.value = '1'
      option.textContent = 'One'
      select.appendChild(option)
      select.value = '1'
    })

    await page.waitForTimeout(150)

    const optionCount = await page.evaluate(() => {
      return (window as any).e2e.selects.nativeSync.options.length
    })
    const dataLength = await page.evaluate(() => {
      return (window as any).e2e.instances.nativeSync.getData().length
    })

    expect(optionCount).toBe(1)
    expect(dataLength).toBe(1)
    expect(await getSelected(page, 'nativeSync')).toEqual(['1'])
  })

  test('handles rapid native option additions', async ({ page }) => {
    await page.evaluate(() => {
      const select = (window as any).e2e.selects.nativeSync as HTMLSelectElement
      for (let i = 1; i <= 3; i++) {
        const option = document.createElement('option')
        option.value = String(i)
        option.textContent = `Option ${i}`
        select.appendChild(option)
      }
      select.value = '3'
    })

    await page.waitForTimeout(200)

    expect(
      await page.evaluate(() => (window as any).e2e.selects.nativeSync.options.length)
    ).toBe(3)
    expect(await getSelected(page, 'nativeSync')).toEqual(['3'])
  })
})

test.describe('public API', () => {
  test.beforeEach(async ({ page }) => {
    await gotoFixture(page)
  })

  test('setSelected updates UI and native value', async ({ page }) => {
    await instanceCall(page, 'basic', 'setSelected', 'three')
    expect(await getSelected(page, 'basic')).toEqual(['three'])

    const nativeValue = await page.evaluate(
      () => (window as any).e2e.selects.basic.value
    )
    expect(nativeValue).toBe('three')
  })

  test('setData replaces options', async ({ page }) => {
    await instanceCall(page, 'basic', 'setData', [
      { text: 'New A', value: 'a' },
      { text: 'New B', value: 'b' }
    ])

    const data = await page.evaluate(() =>
      (window as any).e2e.instances.basic.getData()
    )
    expect(data).toHaveLength(2)
    expect(data[0].text).toBe('New A')
  })

  test('enable and disable toggle interaction', async ({ page }) => {
    await instanceCall(page, 'disabled', 'enable')
    await main(page, 'disabled').click()
    await expect(openContent(page, 'disabled')).toBeVisible()

    await instanceCall(page, 'disabled', 'close')
    await page.waitForTimeout(250)

    await instanceCall(page, 'disabled', 'disable')
    await main(page, 'disabled').click({ force: true })
    await expect(openContent(page, 'disabled')).toHaveCount(0)
  })

  test('open and close via API', async ({ page }) => {
    await instanceCall(page, 'basic', 'open')
    await expect(openContent(page, 'basic')).toBeVisible()

    await instanceCall(page, 'basic', 'close')
    await page.waitForTimeout(250)
    await expect(openContent(page, 'basic')).toHaveCount(0)
  })
})
