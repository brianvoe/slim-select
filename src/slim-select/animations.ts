/**
 * Animation timing helpers for SlimSelect
 *
 * Replaces scattered setTimeout delays with duration-aware promises. Used by:
 *   - Lifecycle (open/close via render.waitForAnimation → waitForTransitionEnd)
 *   - Render (value chip removal via animateValueOut, addable close delay)
 *
 * CSS still drives the visible transitions (.ss-content, .ss-value-out). These
 * helpers keep JS lifecycle callbacks in sync with --ss-animation-timing.
 */

/** Matches default --ss-animation-timing in slimselect.scss and settings.timeoutDelay */
const DEFAULT_DURATION_MS = 200

/** Parse a CSS time value (e.g. "0.2s", "200ms") into milliseconds. */
export function parseAnimationDuration(
  cssValue: string,
  fallback = DEFAULT_DURATION_MS
): number {
  const trimmed = cssValue.trim()
  if (!trimmed) {
    return fallback
  }

  if (trimmed.endsWith('ms')) {
    const ms = parseFloat(trimmed)
    return Number.isNaN(ms) ? fallback : ms
  }

  if (trimmed.endsWith('s')) {
    const seconds = parseFloat(trimmed)
    return Number.isNaN(seconds) ? fallback : seconds * 1000
  }

  const numeric = parseFloat(trimmed)
  return Number.isNaN(numeric) ? fallback : numeric
}

/** Read --ss-animation-timing from an element's computed styles. */
export function getAnimationDuration(
  element: HTMLElement,
  fallback = DEFAULT_DURATION_MS
): number {
  const computedStyle = getComputedStyle(element)
  const cssValue = computedStyle
    .getPropertyValue('--ss-animation-timing')
    .trim()
  return parseAnimationDuration(cssValue, fallback)
}

/** Respect user OS accessibility preference and jsdom (no matchMedia). */
export function prefersReducedMotion(): boolean {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export interface AnimateOptions {
  duration: number
  /** Called when animation completes or is skipped (reduced motion / no WAAPI). */
  onFinish?: () => void
}

/** Skip animation and run onFinish immediately. */
function runInstant(options: AnimateOptions): Promise<void> {
  options.onFinish?.()
  return Promise.resolve()
}

/**
 * WAAPI open animation for dropdown panel (scaleY + opacity).
 * Mirrors .ss-content.ss-open CSS transition; available for future lifecycle wiring.
 */
export function animateOpen(
  element: HTMLElement,
  options: AnimateOptions
): Promise<void> {
  if (prefersReducedMotion() || options.duration <= 0) {
    return runInstant(options)
  }

  if (typeof element.animate !== 'function') {
    return runInstant(options)
  }

  const animation = element.animate(
    [
      { transform: 'scaleY(0)', opacity: 0 },
      { transform: 'scaleY(1)', opacity: 1 }
    ],
    {
      duration: options.duration,
      easing: 'ease-out',
      fill: 'forwards'
    }
  )

  return new Promise((resolve) => {
    animation.onfinish = () => {
      options.onFinish?.()
      resolve()
    }
    // Rapid open/close can cancel in-flight animation — still resolve
    animation.oncancel = () => resolve()
  })
}

/** WAAPI close animation — inverse of animateOpen. */
export function animateClose(
  element: HTMLElement,
  options: AnimateOptions
): Promise<void> {
  if (prefersReducedMotion() || options.duration <= 0) {
    return runInstant(options)
  }

  if (typeof element.animate !== 'function') {
    return runInstant(options)
  }

  const animation = element.animate(
    [
      { transform: 'scaleY(1)', opacity: 1 },
      { transform: 'scaleY(0)', opacity: 0 }
    ],
    {
      duration: options.duration,
      easing: 'ease-out',
      fill: 'forwards'
    }
  )

  return new Promise((resolve) => {
    animation.onfinish = () => {
      options.onFinish?.()
      resolve()
    }
    animation.oncancel = () => resolve()
  })
}

/**
 * Animate a multi-select value chip out before DOM removal.
 * Replaces the old hardcoded 100ms setTimeout in renderValues.
 */
export function animateValueOut(
  element: HTMLElement,
  options: AnimateOptions
): Promise<void> {
  if (prefersReducedMotion() || options.duration <= 0) {
    return runInstant(options)
  }

  if (typeof element.animate !== 'function') {
    return runInstant(options)
  }

  const animation = element.animate(
    [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0)', opacity: 0 }
    ],
    {
      duration: options.duration,
      easing: 'ease-out',
      fill: 'forwards'
    }
  )

  return new Promise((resolve) => {
    animation.onfinish = () => {
      options.onFinish?.()
      resolve()
    }
    animation.oncancel = () => resolve()
  })
}

/**
 * Wait for a CSS transition to finish, with a timeout fallback.
 *
 * Used by render.waitForAnimation() so Lifecycle afterOpen/afterClose align with
 * the real .ss-content transition. jsdom never fires transitionend, so the
 * timeout (from getAnimationDuration) always wins in unit tests.
 */
export function waitForTransitionEnd(
  element: HTMLElement,
  propertyName?: string,
  timeoutMs = DEFAULT_DURATION_MS
): Promise<void> {
  return new Promise((resolve) => {
    let timer: ReturnType<typeof setTimeout> | null = null

    const cleanup = () => {
      element.removeEventListener('transitionend', onTransitionEnd)
      if (timer) {
        clearTimeout(timer)
      }
    }

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== element) {
        return
      }
      if (propertyName && event.propertyName !== propertyName) {
        return
      }
      cleanup()
      resolve()
    }

    element.addEventListener('transitionend', onTransitionEnd)
    timer = setTimeout(() => {
      cleanup()
      resolve()
    }, timeoutMs)
  })
}
