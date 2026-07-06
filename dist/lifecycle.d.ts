import { CloseInfo } from './render';
export type LifecycleState = 'closed' | 'opening' | 'open' | 'closing';
export interface LifecycleHandlers {
    beforeOpen?: () => void;
    afterOpen?: () => void;
    /** Return false to cancel close before any DOM changes. */
    beforeClose?: (info: CloseInfo) => boolean | void;
    /** Sync close work — render, focus, settings. Runs after beforeClose approves. */
    onClose?: (info: CloseInfo) => void;
    afterClose?: () => void;
    /** Fires when fully open — used to attach document click-outside listener. */
    onOpenReady?: () => void;
    /** Fires when fully closed — used to detach document click-outside listener. */
    onCloseReady?: () => void;
}
export interface LifecycleOptions {
    /** Fallback when waitForAnimation is not provided (no CSS element yet). */
    timeoutDelay: number;
    waitForAnimation?: (phase: 'open' | 'close', signal?: AbortSignal) => Promise<void>;
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
    private animationAbort;
    constructor(handlers: LifecycleHandlers, options: LifecycleOptions);
    get isOpen(): boolean;
    get isFullOpen(): boolean;
    requestOpen(): Promise<void>;
    requestClose(info?: CloseInfo): Promise<boolean>;
    /** Cancel timers and resolve waiting phases — called when open/close race each other. */
    cancelPending(): void;
    destroy(): void;
    /**
     * Wait for the CSS animation to finish (or timeoutDelay when no waiter exists).
     * cancelPending() resolves the wait early for rapid open/close toggles.
     */
    private waitForPhase;
}
