import { describe, expect, test, vi } from 'vitest'
import {
  animateClose,
  animateOpen,
  animateValueOut,
  getAnimationDuration,
  parseAnimationDuration
} from './animations'

describe('animations', () => {
  test('parseAnimationDuration handles ms and s', () => {
    expect(parseAnimationDuration('200ms')).toBe(200)
    expect(parseAnimationDuration('0.3s')).toBe(300)
    expect(parseAnimationDuration('')).toBe(200)
  })

  test('getAnimationDuration reads css variable', () => {
    document.body.innerHTML =
      '<div id="anim" style="--ss-animation-timing: 150ms"></div>'
    const el = document.getElementById('anim') as HTMLElement
    expect(getAnimationDuration(el)).toBe(150)
  })

  test('animateOpen resolves when element.animate finishes', async () => {
    document.body.innerHTML = '<div id="anim"></div>'
    const el = document.getElementById('anim') as HTMLElement
    const onFinish = vi.fn()

    el.animate = vi.fn(() => {
      const handlers: { onfinish?: () => void } = {}
      setTimeout(() => handlers.onfinish?.(), 0)
      return {
        get onfinish() {
          return handlers.onfinish
        },
        set onfinish(fn: (() => void) | undefined) {
          handlers.onfinish = fn
        },
        oncancel: null,
        cancel: vi.fn(),
        finish: vi.fn()
      } as unknown as Animation
    })

    await animateOpen(el, { duration: 200, onFinish })
    expect(onFinish).toHaveBeenCalled()
  })

  test('animateValueOut uses instant path when reduced motion', async () => {
    const originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    } as MediaQueryList)

    document.body.innerHTML = '<div id="chip"></div>'
    const el = document.getElementById('chip') as HTMLElement
    const onFinish = vi.fn()

    await animateValueOut(el, { duration: 200, onFinish })
    expect(onFinish).toHaveBeenCalled()

    window.matchMedia = originalMatchMedia
  })

  test('animateClose resolves without animate API', async () => {
    document.body.innerHTML = '<div id="anim"></div>'
    const el = document.getElementById('anim') as HTMLElement
    const onFinish = vi.fn()

    await animateClose(el, { duration: 200, onFinish })
    expect(onFinish).toHaveBeenCalled()
  })
})
