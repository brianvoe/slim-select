import { hasClassInTree } from './helpers';
export interface GlobalEventHandlers {
    onDocumentClick: (e: Event) => void;
    onWindowResize: () => void;
    onWindowScroll: () => void;
    onVisibilityChange: () => void;
}
export default class GlobalEvents {
    private handlers;
    private attached;
    constructor(handlers: GlobalEventHandlers);
    /** Attach long-lived listeners for the SlimSelect instance lifetime. */
    attach(options: {
        listenScroll: boolean;
    }): void;
    /** Attached after open animation completes — closes on outside click. */
    attachDocumentClick(): void;
    detachDocumentClick(): void;
    detach(options: {
        listenScroll: boolean;
    }): void;
    private resizeHandler;
    private scrollHandler;
    private visibilityHandler;
}
export { hasClassInTree };
