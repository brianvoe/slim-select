/**
 * Pure classification of MutationObserver records on the native <select>.
 *
 * Select.observeCall() uses these flags to decide which sync path to run
 * (class/disabled vs full structure vs selection-only). Keeping this logic
 * separate makes it testable without spinning up a full SlimSelect instance.
 */
/** What changed in a single observer callback batch (flags can all be true). */
export interface MutationFlags {
    /** Native select class attribute changed — sync to render styles only. */
    classChanged: boolean;
    /** Native select disabled attribute changed — enable/disable SlimSelect. */
    disabledChanged: boolean;
    /**
     * Options or optgroups were added, removed, or had attributes edited.
     * Triggers a full structure sync (store + native DOM + render).
     */
    optgroupOptionChanged: boolean;
    /**
     * Selection may have changed without a separate `change` event yet.
     * Used when a newly added <option> is already the select's value.
     */
    selectionChanged: boolean;
}
/**
 * Scan a MutationObserver batch and return which kinds of updates are needed.
 *
 * The observer watches the <select> with subtree: true, so mutations can
 * target the select itself or any child <option> / <optgroup>.
 */
export declare function classifyMutations(mutations: MutationRecord[], select: HTMLSelectElement): MutationFlags;
