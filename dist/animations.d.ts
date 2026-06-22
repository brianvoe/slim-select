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
/** Parse a CSS time value (e.g. "0.2s", "200ms") into milliseconds. */
export declare function parseAnimationDuration(cssValue: string, fallback?: number): number;
/** Read --ss-animation-timing from an element's computed styles. */
export declare function getAnimationDuration(element: HTMLElement, fallback?: number): number;
/** Respect user OS accessibility preference and jsdom (no matchMedia). */
export declare function prefersReducedMotion(): boolean;
export interface AnimateOptions {
    duration: number;
    /** Called when animation completes or is skipped (reduced motion / no WAAPI). */
    onFinish?: () => void;
}
/**
 * WAAPI open animation for dropdown panel (scaleY + opacity).
 * Mirrors .ss-content.ss-open CSS transition; available for future lifecycle wiring.
 */
export declare function animateOpen(element: HTMLElement, options: AnimateOptions): Promise<void>;
/** WAAPI close animation — inverse of animateOpen. */
export declare function animateClose(element: HTMLElement, options: AnimateOptions): Promise<void>;
/**
 * Animate a multi-select value chip out before DOM removal.
 * Replaces the old hardcoded 100ms setTimeout in renderValues.
 */
export declare function animateValueOut(element: HTMLElement, options: AnimateOptions): Promise<void>;
/**
 * Wait for a CSS transition to finish, with a timeout fallback.
 *
 * Used by render.waitForAnimation() so Lifecycle afterOpen/afterClose align with
 * the real .ss-content transition. jsdom never fires transitionend, so the
 * timeout (from getAnimationDuration) always wins in unit tests.
 */
export declare function waitForTransitionEnd(element: HTMLElement, propertyName?: string, timeoutMs?: number): Promise<void>;
