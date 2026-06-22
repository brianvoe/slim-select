/**
 * Open/close state machine for SlimSelect.
 *
 * Replaces scattered openTimeout/closeTimeout in index.ts with a single flow:
 *   closed → opening → open → closing → closed
 *
 * Maps to settings consumers expect:
 *   - isOpen: true during opening + open
 *   - isFullOpen: true only in open state (after animation / afterOpen)
 *
 * Lifecycle waits for render.waitForAnimation() (CSS transitionend + timeout fallback)
 * before firing afterOpen/afterClose and attaching the outside-click listener.
 */
export type LifecycleState = 'closed' | 'opening' | 'open' | 'closing';
export interface LifecycleHandlers {
    beforeOpen?: () => void;
    afterOpen?: () => void;
    beforeClose?: () => void;
    afterClose?: () => void;
    /** Fires when fully open — used to attach document click-outside listener. */
    onOpenReady?: () => void;
    /** Fires when fully closed — used to detach document click-outside listener. */
    onCloseReady?: () => void;
}
export interface LifecycleOptions {
    /** Public settings.timeoutDelay — fallback if transitionend never fires. */
    timeoutDelay: number;
    waitForAnimation?: (phase: 'open' | 'close') => Promise<void>;
}
export default class Lifecycle {
    private handlers;
    private options;
    state: LifecycleState;
    private pendingTimer;
    /** Resolvers for in-flight waitForPhase promises — cancelled on rapid toggle. */
    private waitResolvers;
    /** Incremented on cancelPending(); stale async completions check this before firing handlers. */
    private generation;
    constructor(handlers: LifecycleHandlers, options: LifecycleOptions);
    get isOpen(): boolean;
    get isFullOpen(): boolean;
    requestOpen(): Promise<void>;
    requestClose(): Promise<void>;
    /** Cancel timers and resolve waiting phases — called when open/close race each other. */
    cancelPending(): void;
    destroy(): void;
    /**
     * Wait for animation and/or timeout, whichever finishes first.
     * generation guard prevents afterOpen firing if close interrupted open.
     */
    private waitForPhase;
}
