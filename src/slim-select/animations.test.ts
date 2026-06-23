import { describe, expect, test, vi } from 'vitest'
import {
  ANIMATION_TIMEOUT_BUFFER_MS,
  CONTENT_PANEL_TRANSITION_PROPERTIES,
  getAnimationDuration,
  getAnimationTimeout,
  parseAnimationDuration,
  prefersReducedMotion,
  waitForAnimationEnd,
  waitForTransitionEnd
} from './animations'

function mockPrefersReducedMotion(matches: boolean): () => void {
  const originalMatchMedia = window.matchMedia
  window.matchMedia = vi.fn().mockImplementation((query: string) => {
    return {
      matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    } as MediaQueryList
  })

  return () => {
    window.matchMedia = originalMatchMedia
  }
}

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

  test('getAnimationTimeout uses css duration plus buffer', () => {
    document.body.innerHTML =
      '<div id="anim" style="--ss-animation-timing: 200ms"></div>'
    const el = document.getElementById('anim') as HTMLElement
    expect(getAnimationTimeout(el)).toBe(200 + ANIMATION_TIMEOUT_BUFFER_MS)
  })

  test('getAnimationTimeout never goes below css-driven timeout', () => {
    document.body.innerHTML =
      '<div id="anim" style="--ss-animation-timing: 300ms"></div>'
    const el = document.getElementById('anim') as HTMLElement
    expect(getAnimationTimeout(el, 100)).toBe(300 + ANIMATION_TIMEOUT_BUFFER_MS)
    expect(getAnimationTimeout(el, 500)).toBe(500)
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
    const restore = mockPrefersReducedMotion(true)

    document.body.innerHTML = '<div id="chip"></div>'
    const el = document.getElementById('chip') as HTMLElement

    await waitForAnimationEnd(el, 'ss-valueOut', 500)

    restore()
  })

  describe('prefersReducedMotion', () => {
    test('returns true when OS prefers reduced motion', () => {
      const restore = mockPrefersReducedMotion(true)
      expect(prefersReducedMotion()).toBe(true)
      restore()
    })

    test('returns false when OS does not prefer reduced motion', () => {
      const restore = mockPrefersReducedMotion(false)
      expect(prefersReducedMotion()).toBe(false)
      restore()
    })
  })

  test('waitForTransitionEnd uses instant path when reduced motion', async () => {
    vi.useFakeTimers()
    const restore = mockPrefersReducedMotion(true)

    const el = document.createElement('div')
    let resolved = false

    void waitForTransitionEnd(
      el,
      CONTENT_PANEL_TRANSITION_PROPERTIES,
      5000
    ).then(() => {
      resolved = true
    })

    await Promise.resolve()
    expect(resolved).toBe(true)

    await vi.advanceTimersByTimeAsync(5000)
    expect(resolved).toBe(true)

    restore()
    vi.useRealTimers()
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

  test('waitForTransitionEnd waits for all listed properties', async () => {
    document.body.innerHTML = '<div id="panel"></div>'
    const el = document.getElementById('panel') as HTMLElement
    let resolved = false

    const promise = waitForTransitionEnd(
      el,
      ['transform', 'opacity'],
      500
    ).then(() => {
      resolved = true
    })

    el.dispatchEvent(
      new TransitionEvent('transitionend', {
        bubbles: false,
        propertyName: 'opacity'
      })
    )
    await Promise.resolve()
    expect(resolved).toBe(false)

    el.dispatchEvent(
      new TransitionEvent('transitionend', {
        bubbles: false,
        propertyName: 'transform'
      })
    )
    await promise
    expect(resolved).toBe(true)
  })

  test('waitForTransitionEnd resolves when aborted', async () => {
    const el = document.createElement('div')
    const controller = new AbortController()

    const promise = waitForTransitionEnd(
      el,
      ['transform', 'opacity'],
      5000,
      controller.signal
    )
    controller.abort()
    await promise
  })
})
