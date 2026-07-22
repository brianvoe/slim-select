/**
 * Central sync pipeline for SlimSelect.
 *
 * All paths that change store, native <select>, or custom UI should go through
 * SyncCoordinator instead of calling setData/setSelected directly. This gives us:
 *   - One place to batch/coalesce updates
 *   - Lightweight selection sync (no full native DOM rebuild)
 *   - No-op skips when nothing actually changed
 *
 * Wired from SlimSelect: native observer → enqueue(native), public API → enqueue(api),
 * render callbacks → enqueue(ui).
 */

import Render from './render'
import Select from './select'
import Store, { Optgroup, Option } from './store'
import { dataStructureEqual, selectedIdsEqual } from './helpers'

/** Where a change originated — affects batching and render behavior. */
export type ChangeSource = 'native' | 'ui' | 'api'

export interface SyncEvents {
  afterChange?: (newVal: Option[]) => void
  error?: (err: Error) => void
}

/**
 * A single unit of work in the sync queue.
 * Structure = replace option list; selection = change selected only; addOption = append one.
 */
export type SyncChange =
  | {
      type: 'structure'
      data: (Partial<Option> | Partial<Optgroup>)[]
      source: ChangeSource
      /** Keep current selection when replacing data (async search results). */
      preserveSelection?: boolean
      /** API search results — do not update the catalog baseline. */
      isSearchResult?: boolean
    }
  | {
      type: 'selection'
      values: string | string[]
      source: ChangeSource
      /** false when Vue/parent is pushing modelValue down (avoid emit loop). */
      runAfterChange?: boolean
    }
  | { type: 'addOption'; option: Partial<Option>; source: ChangeSource }

export interface SyncDeps {
  select: Select
  store: Store
  render: Render
  events: SyncEvents
  search?: (value: string) => void
  onError?: (err: Error) => void
}

/** Skip structure sync when incoming data matches what's already in the store. */
export function shouldSkipStructureUpdate(
  store: Store,
  data: (Partial<Option> | Partial<Optgroup>)[]
): boolean {
  return dataStructureEqual(store.getData(false), data)
}

/**
 * Resolve setSelected() arguments to option ids.
 * Accepts either ids or values for backward compatibility.
 */
export function resolveSelectedIds(
  store: Store,
  values: string | string[]
): string[] {
  const valueList = Array.isArray(values) ? values : [values]
  const options = store.getDataOptions(false)
  const ids: string[] = []

  for (const value of valueList) {
    if (options.find((option) => option.id == value)) {
      ids.push(value)
      continue
    }

    // Value may match multiple options (duplicate values) — select all matches
    for (const option of options.filter((option) => option.value == value)) {
      ids.push(option.id)
    }
  }

  return ids
}

export default class SyncCoordinator {
  private queue: SyncChange[] = []
  private flushScheduled = false
  /** True while applyChange is running — prevents re-entrant flush loops. */
  public isSyncing = false

  constructor(private deps: SyncDeps) {}

  public enqueue(change: SyncChange): void {
    this.queue.push(change)

    // Native mutations often arrive in bursts from MutationObserver; coalesce
    // them in one microtask so we render once per frame.
    if (change.source === 'native') {
      if (!this.flushScheduled) {
        this.flushScheduled = true
        queueMicrotask(() => this.flush())
      }
      return
    }

    // API/UI (setData, setSelected, clicks) should feel instant to callers.
    // If we're already inside flush(), defer until the current batch finishes.
    if (!this.isSyncing) {
      this.flush()
    }
  }

  /** Process everything in the queue. Callable from tests for deterministic native sync. */
  public flush(): void {
    this.flushScheduled = false

    if (this.queue.length === 0) {
      return
    }

    const batch = this.coalesceBatch(this.queue)
    this.queue = []

    this.isSyncing = true
    try {
      for (const change of batch) {
        this.applyChange(change)
      }
    } finally {
      this.isSyncing = false
      // Changes enqueued during applyChange (e.g. async search) run next
      if (this.queue.length > 0) {
        this.flush()
      }
    }
  }

  /**
   * Collapse a batch into the minimum work needed.
   * Structure sync already includes selection from getData(), so drop redundant
   * selection changes in the same batch. When multiple structure updates arrive,
   * only the last one wins.
   */
  private coalesceBatch(changes: SyncChange[]): SyncChange[] {
    const hasStructure = changes.some((c) => c.type === 'structure')
    const hasAddOption = changes.some((c) => c.type === 'addOption')

    if (hasStructure || hasAddOption) {
      const structureChanges = changes.filter(
        (c) => c.type === 'structure' || c.type === 'addOption'
      )
      const lastStructure = structureChanges[structureChanges.length - 1]

      if (lastStructure?.type === 'structure') {
        return [lastStructure]
      }

      return structureChanges
    }

    const selectionChanges = changes.filter((c) => c.type === 'selection')
    if (selectionChanges.length > 0) {
      return [selectionChanges[selectionChanges.length - 1]]
    }

    return changes
  }

  private applyChange(change: SyncChange): void {
    switch (change.type) {
      case 'structure':
        this.applyStructure(
          change.data,
          change.source,
          change.preserveSelection,
          change.isSearchResult
        )
        break
      case 'selection':
        this.applySelection(
          change.values,
          change.source,
          change.runAfterChange !== false
        )
        break
      case 'addOption':
        this.applyAddOption(change.option)
        break
    }
  }

  /**
   * Full sync: store → native <select> rebuild → render values + options.
   * Used when the option list itself changes (setData, native DOM edits).
   * API search results update store + UI only — native select stays form/selection state.
   */
  private applyStructure(
    data: (Partial<Option> | Partial<Optgroup>)[],
    _source: ChangeSource,
    preserveSelection = false,
    isSearchResult = false
  ): void {
    const { store, select, render, events } = this.deps

    // API search always shows "Searching..." first — even when results match the
    // current store, we must re-render the UI so that placeholder is cleared (#695).
    // Search hits stay out of the native <select> (form options update on selection).
    if (!isSearchResult && shouldSkipStructureUpdate(store, data)) {
      return
    }

    const selected = store.getSelected()

    const err = store.validateDataArray(data)
    if (err) {
      if (events.error) {
        events.error(err)
      } else if (this.deps.onError) {
        this.deps.onError(err)
      }
      return
    }

    store.setData(data, preserveSelection)
    const dataClean = store.getData(false)

    if (!isSearchResult) {
      store.snapshotCatalog()
    }

    // Ephemeral API search pages must not rewrite the native <select>
    if (!isSearchResult) {
      select.updateOptions(dataClean)
    }

    render.renderValues()
    render.renderOptions(dataClean)

    if (events.afterChange && !selectedIdsEqual(selected, store.getSelected())) {
      events.afterChange(store.getSelectedOptions())
    }
  }

  /**
   * Sync native <select> to current selection (form truth).
   * When selected options are missing from the native DOM (e.g. picked from API
   * search results), rebuild from selected options only — never from search hits.
   */
  private syncNativeSelection(): void {
    const { store, select } = this.deps
    const selectedOptions = store.getSelectedOptions()
    const selectedValues = store.getSelectedValues()

    if (!select.hasOptionValues(selectedValues)) {
      if (selectedOptions.length > 0) {
        select.updateOptions(selectedOptions)
        return
      }

      // Empty selection with no matching native options: prefer catalog placeholder
      const placeholder = store
        .getCatalogData()
        .find(
          (item): item is Option =>
            item instanceof Option && item.placeholder === true
        )
      if (placeholder) {
        select.updateOptions([new Option({ ...placeholder, selected: true })])
        return
      }
    }

    // Use values on the native DOM — HTML option ids may be empty while store uses generated ids
    select.setSelectedByValue(selectedValues)
  }

  /**
   * Lightweight selection sync: flip option.selected on native DOM only.
   * Avoids select.updateOptions() (innerHTML rebuild) for selection-only changes
   * when the options already exist on the native select.
   */
  private applySelection(
    values: string | string[],
    _source: ChangeSource,
    runAfterChange: boolean
  ): void {
    const { store, select, render, events } = this.deps

    const selected = store.getSelected()
    const ids = resolveSelectedIds(store, values)

    if (selectedIdsEqual(selected, ids)) {
      return
    }

    store.setSelectedBy('id', ids)
    this.syncNativeSelection()
    render.renderValues()

    const searchValue = render.content.search.input.value.trim()
    if (searchValue !== '') {
      if (render.hasRenderedOptions()) {
        render.updateOptionSelection()
      } else if (this.deps.search) {
        this.deps.search(searchValue)
      }
    } else if (render.canUpdateOptionSelectionInPlace()) {
      render.updateOptionSelection()
    } else {
      render.renderOptions(store.getData(false))
    }

    if (
      runAfterChange &&
      events.afterChange &&
      !selectedIdsEqual(selected, store.getSelected())
    ) {
      events.afterChange(store.getSelectedOptions())
    }
  }

  /** Append a single option then full-sync native + render (same as legacy addOption). */
  private applyAddOption(option: Partial<Option>): void {
    const { store, select, render, events } = this.deps
    const selected = store.getSelected()
    const searchValue = render.content.search.input.value.trim()
    const isApiSearchOverlay = searchValue !== '' && !!this.deps.search
    const optionValue = option.value ?? option.text ?? ''

    const optionExists = (data: (Option | Optgroup)[]): boolean => {
      for (const item of data) {
        if (item instanceof Optgroup) {
          if (
            item.options.some((opt) => (opt.value ?? opt.text) === optionValue)
          ) {
            return true
          }
          continue
        }

        if ((item.value ?? item.text) === optionValue) {
          return true
        }
      }

      return false
    }

    if (!optionExists(store.getData(false))) {
      if (isApiSearchOverlay) {
        const baseline = store.getCatalogData()
        if (!optionExists(baseline)) {
          store.setData([...baseline, new Option(option)], true)
        }
        store.snapshotCatalog()
      } else {
        store.addOption(option)
        store.snapshotCatalog()
      }
    }

    const data = store.getData(false)

    // During API search, native select is form truth (selected options), not search hits
    if (isApiSearchOverlay) {
      const selectedOptions = store.getSelectedOptions()
      if (selectedOptions.length > 0) {
        select.updateOptions(selectedOptions)
      }
    } else {
      select.updateOptions(data)
    }

    render.renderValues()
    render.renderOptions(data)

    if (events.afterChange && !selectedIdsEqual(selected, store.getSelected())) {
      events.afterChange(store.getSelectedOptions())
    }
  }
}
