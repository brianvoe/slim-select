/** Shared scroll offset for in-page doc section links (fixed site header). */
export declare function docScrollOffset(): number;
export declare function scrollToId(id: string, behavior?: ScrollBehavior): boolean;
/** Retry scrolling until lazy page sections exist in the DOM. */
export declare function scrollToHashId(id: string, options?: {
    behavior?: ScrollBehavior;
    maxAttempts?: number;
    intervalMs?: number;
}): void;
/**
 * Destroy SlimSelect instances left behind by doc page navigation and remove
 * their orphaned UI (especially dropdown panels appended to document.body).
 */
export declare function destroyOrphanedSlimSelects(): void;
