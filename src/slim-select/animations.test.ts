import { describe, expect, test, vi } from 'vitest'
import {
  getAnimationDuration,
  parseAnimationDuration,
  waitForAnimationEnd,
  waitForTransitionEnd
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

  test('waitForAnimationEnd resolves on animationend', async () => {
    document.body.innerHTML = '<div id="chip"></div>'
    const el = document.getElementById('chip') as HTMLElement

    const promise = waitForAnimationEnd(el, 'ss-valueOut', 500)
    const event = new Event('animationend', { bubbles: false }) as AnimationEvent
    Object.defineProperty(event, 'animationName', { value: 'ss-valueOut' })
    el.dispatchEvent(event)
    await promise
  })

  test('waitForAnimationEnd uses instant path when reduced motion', async () => {
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

    await waitForAnimationEnd(el, 'ss-valueOut', 500)

    window.matchMedia = originalMatchMedia
  })

  test('waitForTransitionEnd resolves on transitionend', async () => {
    document.body.innerHTML = '<div id="panel"></div>'
    const el = document.getElementById('panel') as HTMLElement

    const promise = waitForTransitionEnd(el, 'opacity', 500)
    el.dispatchEvent(
      new TransitionEvent('transitionend', {
        bubbles: false,
        propertyName: 'opacity'
      })
    )
    await promise
  })
})
