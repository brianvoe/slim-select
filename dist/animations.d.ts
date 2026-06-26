/**
 * Animation timing helpers.
 *
 * CSS still runs the motion — these keep lifecycle and DOM cleanup aligned with
 * --ss-animation-timing so we are not guessing with hardcoded setTimeout values.
 */
/** Extra ms added to CSS duration for transitionend/animationend safety-net timeouts. */
export declare const ANIMATION_TIMEOUT_BUFFER_MS = 50;
/** .ss-content open/close transitions — wait for both before lifecycle continues. */
export declare const CONTENT_PANEL_TRANSITION_PROPERTIES: readonly ["transform", "opacity"];
/** Parse a CSS time value (e.g. "0.2s", "200ms") into milliseconds. */
export declare function parseAnimationDuration(cssValue: string, fallback?: number): number;
/** Read --ss-animation-timing from an element's computed styles. */
export declare function getAnimationDuration(element: HTMLElement, fallback?: number): number;
/**
 * Safety-net timeout for animation waits.
 * Derived from --ss-animation-timing (+ buffer). An explicit settings.timeoutDelay
 * is treated as a minimum — never shorter than the CSS-driven duration.
 */
export declare function getAnimationTimeout(element: HTMLElement, userTimeout?: number, fallback?: number): number;
/** Respect user OS accessibility preference and jsdom (no matchMedia). */
export declare function prefersReducedMotion(): boolean;
/**
 * Wait for CSS transition(s) to finish, with a timeout fallback.
 *
 * Pass a single property name to resolve on that transitionend, or an array to
 * wait until every listed property has fired (e.g. transform + opacity on .ss-content).
 * Optional AbortSignal cleans up listeners when lifecycle cancels a rapid toggle.
 */
export declare function waitForTransitionEnd(element: HTMLElement, propertyNames?: string | readonly string[], timeoutMs?: number, signal?: AbortSignal): Promise<void>;
/**
 * Wait for a CSS @keyframes animation to finish, with a timeout fallback.
 *
 * Used when removing multi-select value chips (.ss-value-out). jsdom does not
 * fire animationend, so the timeout wins in unit tests.
 */
export declare function waitForAnimationEnd(element: HTMLElement, animationName?: string, timeoutMs?: number, signal?: AbortSignal): Promise<void>;
