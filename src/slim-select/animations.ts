/**
 * Animation timing helpers for SlimSelect
 *
 * CSS drives visible motion (.ss-content transitions, .ss-value-out keyframes).
 * These helpers keep JS lifecycle and DOM updates in sync with --ss-animation-timing.
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
  if (prefersReducedMotion()) {
    return Promise.resolve()
  }

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

/**
 * Wait for a CSS @keyframes animation to finish, with a timeout fallback.
 *
 * Used when removing multi-select value chips (.ss-value-out). jsdom does not
 * fire animationend, so the timeout wins in unit tests.
 */
export function waitForAnimationEnd(
  element: HTMLElement,
  animationName?: string,
  timeoutMs = DEFAULT_DURATION_MS
): Promise<void> {
  if (prefersReducedMotion()) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let timer: ReturnType<typeof setTimeout> | null = null

    const cleanup = () => {
      element.removeEventListener('animationend', onAnimationEnd)
      if (timer) {
        clearTimeout(timer)
      }
    }

    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== element) {
        return
      }
      if (animationName && event.animationName !== animationName) {
        return
      }
      cleanup()
      resolve()
    }

    element.addEventListener('animationend', onAnimationEnd)
    timer = setTimeout(() => {
      cleanup()
      resolve()
    }, timeoutMs)
  })
}
