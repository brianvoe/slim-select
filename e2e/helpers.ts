import { expect, type Locator, type Page } from '@playwright/test'

export type E2EInstanceKey =
  | 'basic'
  | 'nativeSync'
  | 'multi'
  | 'deselect'
  | 'noSearch'
  | 'keepSearch'
  | 'disabled'
  | 'optgroups'
  | 'placeholder'
  | 'label'
  | 'openDown'
  | 'openUp'
  | 'searchHighlight'
  | 'disabledOption'
  | 'keyboard'

export async function gotoFixture(page: Page): Promise<void> {
  await page.goto('/e2e/index.html')
  await page.waitForFunction(() => (window as any).e2e?.instances?.basic)
}

export function section(page: Page, key: E2EInstanceKey): Locator {
  return page.locator(`[data-e2e="${camelToKebab(key)}"]`)
}

export function main(page: Page, key: E2EInstanceKey): Locator {
  return section(page, key).locator('.ss-main')
}

/** Dropdown panel is portaled to document.body — match via data-ss-id on the section. */
export function content(page: Page, key: E2EInstanceKey): Locator {
  const e2eKey = camelToKebab(key)
  return page.locator(
    `xpath=//div[contains(@class,"ss-content")][@data-id=//section[@data-e2e="${e2eKey}"]/@data-ss-id]`
  )
}

export function openContent(page: Page, key: E2EInstanceKey): Locator {
  const e2eKey = camelToKebab(key)
  return page.locator(
    `xpath=//div[contains(@class,"ss-content") and contains(@class,"ss-open")][@data-id=//section[@data-e2e="${e2eKey}"]/@data-ss-id]`
  )
}

export function option(page: Page, key: E2EInstanceKey, text: string): Locator {
  return content(page, key).locator('.ss-option', { hasText: text })
}

export async function openSelect(
  page: Page,
  key: E2EInstanceKey
): Promise<void> {
  await main(page, key).click()
  await expect(openContent(page, key)).toBeVisible()
  await waitForFullyOpen(page, key)
}

export async function closeWithEscape(
  page: Page,
  key: E2EInstanceKey
): Promise<void> {
  await main(page, key).focus()
  await page.keyboard.press('Escape')
  await expect(openContent(page, key)).toHaveCount(0)
}

export async function waitForFullyOpen(
  page: Page,
  key: E2EInstanceKey
): Promise<void> {
  await expect
    .poll(async () => {
      return page.evaluate((k) => {
        return (window as any).e2e.instances[k]?.settings?.isFullOpen === true
      }, key)
    })
    .toBe(true)
}

export async function getSelected(
  page: Page,
  key: E2EInstanceKey
): Promise<string[]> {
  return page.evaluate((k) => {
    return (window as any).e2e.instances[k].getSelected()
  }, key)
}

export async function instanceCall<T>(
  page: Page,
  key: E2EInstanceKey,
  fn: string,
  ...args: unknown[]
): Promise<T> {
  return page.evaluate(
    ({ k, fn, args }) => {
      const instance = (window as any).e2e.instances[k]
      return instance[fn](...args)
    },
    { k: key, fn, args }
  )
}

export async function expectClosed(
  page: Page,
  key: E2EInstanceKey
): Promise<void> {
  await expect(main(page, key)).toHaveAttribute('aria-expanded', 'false')
}

function camelToKebab(key: string): string {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}
