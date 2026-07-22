import { describe, expect, test, vi, beforeEach } from 'vitest'
import SyncCoordinator, {
  resolveSelectedIds,
  shouldSkipStructureUpdate
} from './sync'
import Store, { Option } from './store'
import Select from './select'
import Render from './render'
import Settings from './settings'
import CssClasses from './classes'

describe('sync helpers', () => {
  test('shouldSkipStructureUpdate when data unchanged', () => {
    const store = new Store('single', [{ text: 'One', value: '1' }])
    const data = store.getData()
    expect(shouldSkipStructureUpdate(store, data)).toBe(true)
    expect(
      shouldSkipStructureUpdate(store, [{ text: 'Two', value: '2' }])
    ).toBe(false)
  })

  test('resolveSelectedIds by id and value', () => {
    const store = new Store('single', [
      { text: 'One', value: '1' },
      { text: 'Two', value: '2' }
    ])
    const options = store.getDataOptions()
    expect(resolveSelectedIds(store, options[0].id)).toEqual([options[0].id])
    expect(resolveSelectedIds(store, '2')).toEqual([options[1].id])
  })
})

describe('SyncCoordinator', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<select id="sync-test"><option value="1">One</option><option value="2">Two</option></select>'
  })

  function createCoordinator() {
    const selectEl = document.getElementById('sync-test') as HTMLSelectElement
    const settings = new Settings({ id: 'sync-test-id' })
    settings.isMultiple = false
    const select = new Select(selectEl)
    select.hideUI()
    const store = new Store('single', select.getData())
    const cssClasses = new CssClasses({})
    const events: {
      afterChange?: (v: Option[]) => void
      error?: (e: Error) => void
    } = {}

    const renderCallbacks = {
      open: vi.fn(),
      close: vi.fn(),
      setSelected: vi.fn(),
      addOption: vi.fn(),
      search: vi.fn()
    }

    const render = new Render(settings, cssClasses, store, renderCallbacks)
    document.body.appendChild(render.main.main)

    const coordinator = new SyncCoordinator({
      select,
      store,
      render,
      events
    })

    return { coordinator, select, store, render, events, selectEl, renderCallbacks }
  }

  test('batches multiple enqueues into single flush', async () => {
    const { coordinator, store } = createCoordinator()
    const setDataSpy = vi.spyOn(store, 'setData')

    coordinator.enqueue({
      type: 'structure',
      data: [{ text: 'A', value: 'a' }],
      source: 'native'
    })
    coordinator.enqueue({
      type: 'structure',
      data: [{ text: 'B', value: 'b' }],
      source: 'native'
    })

    await new Promise<void>((resolve) => queueMicrotask(resolve))

    expect(setDataSpy).toHaveBeenCalledTimes(1)
    expect(store.getDataOptions()[0].value).toBe('b')
  })

  test('selection-only update uses setSelectedByValue not updateOptions', () => {
    const { coordinator, select, store } = createCoordinator()
    const updateOptionsSpy = vi.spyOn(select, 'updateOptions')
    const setSelectedByValueSpy = vi.spyOn(select, 'setSelectedByValue')
    const ids = store.getDataOptions().map((o) => o.id)

    coordinator.enqueue({
      type: 'selection',
      values: ids[1],
      source: 'ui'
    })
    coordinator.flush()

    expect(setSelectedByValueSpy).toHaveBeenCalled()
    expect(updateOptionsSpy).not.toHaveBeenCalled()
  })

  test('selection-only update syncs option DOM in place when search is empty', () => {
    const { coordinator, store, render } = createCoordinator()
    render.renderOptions(store.getData())
    const renderOptionsSpy = vi.spyOn(render, 'renderOptions')
    const updateSpy = vi.spyOn(render, 'updateOptionSelection')
    const ids = store.getDataOptions().map((o) => o.id)

    coordinator.enqueue({
      type: 'selection',
      values: ids[1],
      source: 'ui'
    })
    coordinator.flush()

    expect(updateSpy).toHaveBeenCalled()
    expect(renderOptionsSpy).not.toHaveBeenCalled()
  })

  test('selection with active search updates options in place', () => {
    const { coordinator, store, render } = createCoordinator()
    render.renderOptions(store.getData())
    render.content.search.input.value = 'Two'
    const renderOptionsSpy = vi.spyOn(render, 'renderOptions')
    const updateSpy = vi.spyOn(render, 'updateOptionSelection')
    const ids = store.getDataOptions().map((o) => o.id)

    coordinator.enqueue({
      type: 'selection',
      values: ids[1],
      source: 'api'
    })
    coordinator.flush()

    expect(updateSpy).toHaveBeenCalled()
    expect(renderOptionsSpy).not.toHaveBeenCalled()
  })

  test('skips no-op selection updates', () => {
    const { coordinator, store, render } = createCoordinator()
    const renderValuesSpy = vi.spyOn(render, 'renderValues')
    const currentId = store.getSelected()[0] || store.getDataOptions()[0].id

    coordinator.enqueue({
      type: 'selection',
      values: currentId,
      source: 'api'
    })
    coordinator.flush()

    expect(renderValuesSpy).not.toHaveBeenCalled()
  })

  test('structure change skips redundant selection in same batch', () => {
    const { coordinator, select, store } = createCoordinator()
    const setSelectedByValueSpy = vi.spyOn(select, 'setSelectedByValue')
    const updateOptionsSpy = vi.spyOn(select, 'updateOptions')

    coordinator.enqueue({
      type: 'structure',
      data: [
        { text: 'One', value: '1', selected: true },
        { text: 'Two', value: '2' }
      ],
      source: 'native'
    })
    coordinator.enqueue({
      type: 'selection',
      values: store.getDataOptions()[0]?.id || '1',
      source: 'native'
    })
    coordinator.flush()

    expect(updateOptionsSpy).toHaveBeenCalledTimes(1)
    expect(setSelectedByValueSpy).not.toHaveBeenCalled()
  })

  test('search results re-render even when data matches store (#695)', () => {
    const { coordinator, store, render, select } = createCoordinator()
    const data = store.getData()
    const renderOptionsSpy = vi.spyOn(render, 'renderOptions')
    const updateOptionsSpy = vi.spyOn(select, 'updateOptions')

    coordinator.enqueue({
      type: 'structure',
      data,
      source: 'api',
      isSearchResult: true
    })
    coordinator.flush()

    expect(renderOptionsSpy).toHaveBeenCalled()
    expect(updateOptionsSpy).not.toHaveBeenCalled()
  })

  test('selection of missing native option rebuilds from selected options only', () => {
    const { coordinator, select, store, selectEl } = createCoordinator()
    // Simulate API search store page that is not on the native select
    store.setData(
      [
        { text: 'Remote', value: 'remote', id: 'id-remote' },
        { text: 'Other', value: 'other', id: 'id-other' }
      ],
      true
    )
    const remote = store.getDataOptions().find((o) => o.value === 'remote')!
    const updateOptionsSpy = vi.spyOn(select, 'updateOptions')

    coordinator.enqueue({
      type: 'selection',
      values: remote.id,
      source: 'ui'
    })
    coordinator.flush()

    expect(updateOptionsSpy).toHaveBeenCalled()
    expect(Array.from(selectEl.options).map((o) => o.value)).toEqual(['remote'])
    expect(selectEl.value).toBe('remote')
  })

  test('non-search structure still skips when data unchanged', () => {
    const { coordinator, store, render } = createCoordinator()
    const data = store.getData()
    const renderOptionsSpy = vi.spyOn(render, 'renderOptions')

    coordinator.enqueue({
      type: 'structure',
      data,
      source: 'api'
    })
    coordinator.flush()

    expect(renderOptionsSpy).not.toHaveBeenCalled()
  })
})
