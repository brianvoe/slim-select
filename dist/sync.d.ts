import { default as Render } from './render';
import { default as Select } from './select';
import { default as Store, Optgroup, Option } from './store';
/** Where a change originated — affects batching and render behavior. */
export type ChangeSource = 'native' | 'ui' | 'api';
export interface SyncEvents {
    afterChange?: (newVal: Option[]) => void;
    error?: (err: Error) => void;
}
/**
 * A single unit of work in the sync queue.
 * Structure = replace option list; selection = change selected only; addOption = append one.
 */
export type SyncChange = {
    type: 'structure';
    data: (Partial<Option> | Partial<Optgroup>)[];
    source: ChangeSource;
    /** Keep current selection when replacing data (async search results). */
    preserveSelection?: boolean;
    /** API search results — do not update the catalog baseline. */
    isSearchResult?: boolean;
} | {
    type: 'selection';
    values: string | string[];
    source: ChangeSource;
    /** false when Vue/parent is pushing modelValue down (avoid emit loop). */
    runAfterChange?: boolean;
} | {
    type: 'addOption';
    option: Partial<Option>;
    source: ChangeSource;
};
export interface SyncDeps {
    select: Select;
    store: Store;
    render: Render;
    events: SyncEvents;
    search?: (value: string) => void;
    onError?: (err: Error) => void;
}
/** Skip structure sync when incoming data matches what's already in the store. */
export declare function shouldSkipStructureUpdate(store: Store, data: (Partial<Option> | Partial<Optgroup>)[]): boolean;
/**
 * Resolve setSelected() arguments to option ids.
 * Accepts either ids or values for backward compatibility.
 */
export declare function resolveSelectedIds(store: Store, values: string | string[]): string[];
export default class SyncCoordinator {
    private deps;
    private queue;
    private flushScheduled;
    /** True while applyChange is running — prevents re-entrant flush loops. */
    isSyncing: boolean;
    constructor(deps: SyncDeps);
    enqueue(change: SyncChange): void;
    /** Process everything in the queue. Callable from tests for deterministic native sync. */
    flush(): void;
    /**
     * Collapse a batch into the minimum work needed.
     * Structure sync already includes selection from getData(), so drop redundant
     * selection changes in the same batch. When multiple structure updates arrive,
     * only the last one wins.
     */
    private coalesceBatch;
    private applyChange;
    /**
     * Full sync: store → native <select> rebuild → render values + options.
     * Used when the option list itself changes (setData, native DOM edits, search results).
     */
    private applyStructure;
    /**
     * Lightweight selection sync: flip option.selected on native DOM only.
     * Avoids select.updateOptions() (innerHTML rebuild) for selection-only changes.
     */
    private applySelection;
    /** Append a single option then full-sync native + render (same as legacy addOption). */
    private applyAddOption;
}
