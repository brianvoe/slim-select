/**
 * Animation timing helpers.
 *
 * CSS still runs the motion — these keep lifecycle and DOM cleanup aligned with
 * --ss-animation-timing so we are not guessing with hardcoded setTimeout values.
 */

/** Matches default --ss-animation-timing in slimselect.scss */
const DEFAULT_DURATION_MS = 200

/** Extra ms added to CSS duration for transitionend/animationend safety-net timeouts. */
export const ANIMATION_TIMEOUT_BUFFER_MS = 50

/** .ss-content open/close transitions — wait for both before lifecycle continues. */
export const CONTENT_PANEL_TRANSITION_PROPERTIES = [
  'transform',
  'opacity'
] as const

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

/**
 * Safety-net timeout for animation waits.
 * Derived from --ss-animation-timing (+ buffer). An explicit settings.timeoutDelay
 * is treated as a minimum — never shorter than the CSS-driven duration.
 */
export function getAnimationTimeout(
  element: HTMLElement,
  userTimeout?: number,
  fallback = DEFAULT_DURATION_MS
): number {
  const fromCss =
    getAnimationDuration(element, fallback) + ANIMATION_TIMEOUT_BUFFER_MS

  if (userTimeout === undefined) {
    return fromCss
  }

  return Math.max(fromCss, userTimeout)
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

function normalizeTransitionProperties(
  propertyNames?: string | readonly string[]
): Set<string> | null {
  if (propertyNames === undefined) {
    return null
  }

  const list = Array.isArray(propertyNames) ? propertyNames : [propertyNames]
  return new Set(list)
}

/**
 * Wait for CSS transition(s) to finish, with a timeout fallback.
 *
 * Pass a single property name to resolve on that transitionend, or an array to
 * wait until every listed property has fired (e.g. transform + opacity on .ss-content).
 * Optional AbortSignal cleans up listeners when lifecycle cancels a rapid toggle.
 */
export function waitForTransitionEnd(
  element: HTMLElement,
  propertyNames?: string | readonly string[],
  timeoutMs = DEFAULT_DURATION_MS,
  signal?: AbortSignal
): Promise<void> {
  if (prefersReducedMotion() || signal?.aborted) {
    return Promise.resolve()
  }

  const pending = normalizeTransitionProperties(propertyNames)

  return new Promise<void>((resolve) => {
    let timer: ReturnType<typeof setTimeout> | null = null
    let settled = false

    const finish = () => {
      if (settled) {
        return
      }
      settled = true
      element.removeEventListener('transitionend', onTransitionEnd)
      signal?.removeEventListener('abort', onAbort)
      if (timer) {
        clearTimeout(timer)
      }
      resolve()
    }

    const onAbort = () => finish()

    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== element) {
        return
      }

      if (pending) {
        if (!pending.has(event.propertyName)) {
          return
        }
        pending.delete(event.propertyName)
        if (pending.size > 0) {
          return
        }
      }

      finish()
    }

    signal?.addEventListener('abort', onAbort, { once: true })
    element.addEventListener('transitionend', onTransitionEnd)
    timer = setTimeout(finish, timeoutMs)
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
  timeoutMs = DEFAULT_DURATION_MS,
  signal?: AbortSignal
): Promise<void> {
  if (prefersReducedMotion() || signal?.aborted) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    let timer: ReturnType<typeof setTimeout> | null = null
    let settled = false

    const finish = () => {
      if (settled) {
        return
      }
      settled = true
      element.removeEventListener('animationend', onAnimationEnd)
      signal?.removeEventListener('abort', onAbort)
      if (timer) {
        clearTimeout(timer)
      }
      resolve()
    }

    const onAbort = () => finish()

    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== element) {
        return
      }
      if (animationName && event.animationName !== animationName) {
        return
      }
      finish()
    }

    signal?.addEventListener('abort', onAbort, { once: true })
    element.addEventListener('animationend', onAnimationEnd)
    timer = setTimeout(finish, timeoutMs)
  })
}
