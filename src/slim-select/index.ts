import CssClasses from './classes'
import { getAnimationTimeout } from './animations'
import GlobalEvents, { hasClassInTree } from './events'
import { debounce, getAssociatedLabelText } from './helpers'
import Lifecycle from './lifecycle'
import Render from './render'
import Select from './select'
import Settings, { MODAL_MOBILE_BREAKPOINT } from './settings'
import Store, { Option, Optgroup } from './store'
import SyncCoordinator from './sync'

// Export classes
export { Settings, Option, Optgroup, MODAL_MOBILE_BREAKPOINT }
export type { ModalSetting } from './settings'

// Export interfaces from render
export type { Main, Content, Search } from './render'

export interface Config {
  select: string | Element
  data?: (Partial<Option> | Partial<Optgroup>)[]
  settings?: Partial<Settings>
  cssClasses?: Partial<CssClasses>
  events?: Events
}

export interface Events {
  search?: (
    searchValue: string,
    selected: Option[],
    catalog?: (Option | Optgroup)[]
  ) =>
    | Promise<(Partial<Option> | Partial<Optgroup>)[]>
    | (Partial<Option> | Partial<Optgroup>)[]
  searchFilter?: (option: Option, search: string) => boolean
  addable?: (
    value: string
  ) =>
    | Promise<Partial<Option> | string>
    | Partial<Option>
    | string
    | false
    | null
    | undefined
    | Error
  beforeChange?: (newVal: Option[], oldVal: Option[]) => boolean | void
  afterChange?: (newVal: Option[]) => void
  beforeOpen?: () => void
  afterOpen?: () => void
  beforeClose?: () => void
  afterClose?: () => void
  error?: (err: Error) => void
}

export default class SlimSelect {
  public selectEl: HTMLSelectElement

  // Classes
  public settings!: Settings
  public cssClasses!: CssClasses
  public select!: Select
  public store!: Store
  public render!: Render
  public sync!: SyncCoordinator
  public lifecycle!: Lifecycle
  private globalEvents!: GlobalEvents
  /** Invalidates in-flight API search responses when the query changes or clears. */
  private searchGeneration = 0

  // Events
  public events = {
    search: undefined,
    searchFilter: (opt: Option, search: string) => {
      return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
    },
    addable: undefined,
    beforeChange: undefined,
    afterChange: undefined,
    beforeOpen: undefined,
    afterOpen: undefined,
    beforeClose: undefined,
    afterClose: undefined
  } as Events

  constructor(config: Config) {
    // Make sure you get the right element
    this.selectEl = (
      typeof config.select === 'string'
        ? document.querySelector(config.select)
        : config.select
    ) as HTMLSelectElement
    if (!this.selectEl) {
      if (config.events && config.events.error) {
        config.events.error(new Error('Could not find select element'))
      }
      return
    }
    if (this.selectEl.tagName !== 'SELECT') {
      if (config.events && config.events.error) {
        config.events.error(new Error('Element isnt of type select'))
      }
      return
    }

    // If select already has a slim select id on it lets destroy it first
    if (this.selectEl.dataset.ssid) {
      this.destroy()
    }

    // Set settings
    this.settings = new Settings(config.settings)

    // Set CSS classes
    this.cssClasses = new CssClasses(config.cssClasses)

    // Set events
    const debounceEvents = [
      'beforeOpen',
      'afterOpen',
      'beforeClose',
      'afterClose'
    ]
    for (const key in config.events) {
      // Check if key exists in events
      if (!config.events.hasOwnProperty(key)) {
        continue
      }

      // Check if key is in debounceEvents
      if (debounceEvents.indexOf(key) !== -1) {
        ;(this.events as { [key: string]: any })[key] = debounce(
          (config.events as { [key: string]: any })[key],
          100
        )
      } else {
        ;(this.events as { [key: string]: any })[key] = (
          config.events as { [key: string]: any }
        )[key]
      }
    }

    // Upate settings with type, style and classname
    this.settings.disabled = config.settings?.disabled
      ? config.settings.disabled
      : this.selectEl.disabled
    this.settings.isMultiple = this.selectEl.multiple
    this.settings.style = this.selectEl.style.cssText
    this.settings.class = this.selectEl.className.split(' ')

    // Set select class
    this.select = new Select(this.selectEl)
    // Ensure the select has an id for label associations
    if (!this.selectEl.id) {
      this.selectEl.id = this.settings.id
    }
    this.select.updateSelect(
      this.settings.id,
      this.settings.style,
      this.settings.class
    )
    this.select.hideUI() // Hide the original select element

    this.select.onClassChange = (classes: string[]) => {
      // Update settings with new class
      this.settings.class = classes

      // Run render updateClassStyles
      this.render.updateClassStyles()
    }
    this.select.onDisabledChange = (disabled: boolean) => {
      if (disabled) {
        this.disable()
      } else {
        this.enable()
      }
    }

    // Set up label click handler to toggle SlimSelect
    // This allows clicking the label to open/close, matching the main div behavior
    this.select.onLabelClick = () => {
      if (!this.settings.disabled) {
        this.settings.isOpen ? this.close() : this.open()
      }
    }

    // Set store class
    const data = config.data ? config.data : this.select.getData()
    this.store = new Store(
      this.settings.isMultiple ? 'multiple' : 'single',
      data
    )

    // If data is passed update the original select element
    if (config.data) {
      this.select.updateOptions(this.store.getData())
    }

    // Set render renderCallbacks
    const renderCallbacks = {
      open: this.open.bind(this),
      close: this.close.bind(this),
      addable: this.events.addable ? this.events.addable : undefined,
      // UI clicks route through SyncCoordinator (batched, avoids double updates)
      setSelected: (values: string | string[], runAfterChange: boolean) => {
        this.sync.enqueue({
          type: 'selection',
          values,
          source: 'ui',
          runAfterChange
        })
      },
      addOption: (option: Partial<Option>) => {
        this.sync.enqueue({
          type: 'addOption',
          option,
          source: 'ui'
        })
      },
      search: this.search.bind(this),
      beforeChange: this.events.beforeChange,
      afterChange: this.events.afterChange
    }

    // Setup render class
    this.settings.modalTitle =
      config.settings?.modalTitle ?? getAssociatedLabelText(this.selectEl)

    this.render = new Render(
      this.settings,
      this.cssClasses,
      this.store,
      renderCallbacks
    )

    // Align JS timeout with --ss-animation-timing (CSS is source of truth)
    this.settings.timeoutDelay = getAnimationTimeout(
      this.render.content.main,
      config.settings?.timeoutDelay
    )

    // Single coordinator batches native + API + UI updates (see sync.ts)
    this.sync = new SyncCoordinator({
      select: this.select,
      store: this.store,
      render: this.render,
      events: this.events,
      search: this.search.bind(this)
    })

    this.select.onValueChange = (options: Option[]) => {
      this.sync.enqueue({
        type: 'selection',
        values: options.map((option) => option.id),
        source: 'native'
      })
    }
    this.select.onOptionsChange = (data: (Option | Optgroup)[]) => {
      this.sync.enqueue({
        type: 'structure',
        data: data || [],
        source: 'native'
      })
    }

    // Open/close state machine — animation wait + outside-click attach timing
    this.lifecycle = new Lifecycle(
      {
        beforeOpen: this.events.beforeOpen,
        afterOpen: this.events.afterOpen,
        beforeClose: this.events.beforeClose,
        afterClose: () => {
          this.render.clearDirectionClasses()
          this.render.finalizeModalClose()
          if (this.events.afterClose) {
            this.events.afterClose()
          }
        },
        onOpenReady: () => this.globalEvents.attachDocumentClick(),
        onCloseReady: () => this.globalEvents.detachDocumentClick()
      },
      {
        timeoutDelay: this.settings.timeoutDelay,
        waitForAnimation: (phase, signal) =>
          this.render.waitForAnimation(phase, signal)
      }
    )

    // Resize/scroll/visibility listeners (document click via lifecycle onOpenReady)
    this.globalEvents = new GlobalEvents({
      onDocumentClick: this.documentClick.bind(this),
      onWindowResize: () => {
        if (!this.settings.isOpen && !this.settings.isFullOpen) {
          return
        }
        this.render.moveContent()
      },
      onWindowScroll: () => {
        if (!this.settings.isOpen && !this.settings.isFullOpen) {
          return
        }
        this.render.moveContent()
      },
      onVisibilityChange: () => {
        if (document.hidden) {
          this.close()
        }
      }
    })

    this.render.renderValues()
    this.render.renderOptions(this.store.getData(false))

    // Add aria-label or aria-labelledby if exists
    const selectAriaLabel = this.selectEl.getAttribute('aria-label')
    const selectAriaLabelledBy = this.selectEl.getAttribute('aria-labelledby')

    if (selectAriaLabel) {
      this.render.main.main.setAttribute('aria-label', selectAriaLabel)
    } else if (selectAriaLabelledBy) {
      this.render.main.main.removeAttribute('aria-label')
      this.render.main.main.setAttribute(
        'aria-labelledby',
        selectAriaLabelledBy
      )
    } else if (this.selectEl.labels && this.selectEl.labels.length > 0) {
      const labelledByIds = Array.from(this.selectEl.labels).map((label, i) => {
        if (!label.id) {
          label.id = `${this.settings.id}-label-${i}`
        }
        return label.id
      })
      this.render.main.main.removeAttribute('aria-label')
      this.render.main.main.setAttribute(
        'aria-labelledby',
        labelledByIds.join(' ')
      )
    }

    // Add render after original select element
    if (this.selectEl.parentNode) {
      this.selectEl.parentNode.insertBefore(
        this.render.main.main,
        this.selectEl.nextSibling
      )
    }

    this.globalEvents.attach({
      listenScroll: this.settings.openPosition === 'auto'
    })

    // If disabled lets call it
    if (this.settings.disabled) {
      this.disable()
    }

    // If alwaysOpnen then open it
    if (this.settings.alwaysOpen) {
      this.open()
    }

    // Set up label handlers to open SlimSelect when label is clicked
    this.select.setupLabelHandlers()

    // Add SlimSelect to select element
    ;(this.selectEl as any).slim = this
  }

  // Set to enabled and remove disabled classes
  public enable(): void {
    this.settings.disabled = false

    this.select.enable()
    this.render.enable()
  }

  // Set to disabled and add disabled classes
  public disable(): void {
    this.settings.disabled = true

    this.select.disable()
    this.render.disable()
  }

  public getData(): Option[] | Optgroup[] {
    return this.store.getData()
  }

  public setData(data: (Partial<Option> | Partial<Optgroup>)[]): void {
    // Batched structure sync — rebuilds native select, store, and option list
    this.sync.enqueue({
      type: 'structure',
      data,
      source: 'api'
    })
  }

  public getSelected(): string[] {
    let options = this.store.getSelectedOptions()
    if (this.settings.keepOrder) {
      options = this.store.selectedOrderOptions(options)
    }
    return options.map((option) => option.value)
  }

  // Will take in a string or array of strings and set the selected by either the id or value
  public setSelected(values: string | string[], runAfterChange = true): void {
    // Lightweight path — store + native + chips only (no full DOM rebuild)
    this.sync.enqueue({
      type: 'selection',
      values,
      source: 'api',
      runAfterChange
    })
  }

  public addOption(option: Partial<Option>): void {
    this.sync.enqueue({
      type: 'addOption',
      option,
      source: 'api'
    })
  }

  public open(): void {
    // Dont open if disabled
    // Dont do anything if the content is already open
    if (this.settings.disabled || this.settings.isOpen) {
      return
    }

    // Cancel in-flight open/close animation wait (rapid toggle)
    this.lifecycle.cancelPending()

    // Tell render to open
    this.render.open()

    // Focus on input field only if search is enabled
    if (this.settings.showSearch && this.settings.focusSearch) {
      this.render.searchFocus()
    }

    this.settings.isOpen = true

    // Sync isFullOpen/isOpen after CSS transition (or timeoutDelay fallback)
    void this.lifecycle.requestOpen().then(() => {
      // close() may have run before this async completion (e.g. closeOnSelect)
      if (!this.settings.isOpen) {
        return
      }
      this.settings.isFullOpen = this.lifecycle.isFullOpen
      this.settings.isOpen = this.lifecycle.isOpen
    })

    // Reposition when trigger or ancestors resize (absolute content only)
    if (
      this.settings.contentPosition === 'absolute' &&
      !this.render.isModalViewActive()
    ) {
      this.render.startPositionTracking()
    }

    const searchValue = this.render.content.search.input.value.trim()
    if (searchValue !== '') {
      this.search(searchValue)
    }
  }

  public close(eventType: string | null = null): void {
    // Dont do anything if the content is already closed
    // Dont do anything if alwaysOpen is true
    if (!this.settings.isOpen || this.settings.alwaysOpen) {
      return
    }

    this.lifecycle.cancelPending()

    // Tell render to close
    this.render.close()

    // Clear search only if not empty and keepSearch is false
    if (
      !this.settings.keepSearch &&
      this.render.content.search.input.value !== ''
    ) {
      this.sync.flush()
      this.search('') // Clear search
    }

    // If we arent tabbing focus back on the main element
    this.render.mainFocus(eventType)

    // Update settings
    this.settings.isOpen = false
    this.settings.isFullOpen = false

    // Sync isOpen/isFullOpen after close animation completes
    void this.lifecycle.requestClose().then(() => {
      // open() may have run before this async completion
      if (this.settings.isOpen) {
        return
      }
      this.settings.isOpen = this.lifecycle.isOpen
      this.settings.isFullOpen = this.lifecycle.isFullOpen
    })

    this.render.stopPositionTracking()
  }

  // Take in string value and search current options
  public search(value: string): void {
    const trimmed = value.trim()

    if (trimmed === '') {
      this.render.content.search.input.value = ''
      this.clearSearch()
      return
    }

    // Sync programmatic search calls, but never strip spaces from user input
    if (this.render.content.search.input.value !== value) {
      this.render.content.search.input.value = value
    }

    if (this.events.search) {
      this.runApiSearch(trimmed)
      return
    }

    this.runLocalSearch(trimmed)
  }

  private clearSearch(): void {
    this.searchGeneration++

    if (!this.events.search && this.render.canFilterOptionsInPlace()) {
      this.render.filterOptionsInPlace('', this.events.searchFilter!)
      this.render.resetSearchFilterState()
      return
    }

    this.render.resetSearchFilterState()
    this.sync.enqueue({
      type: 'structure',
      data: this.store.getCatalogData(),
      source: 'api',
      preserveSelection: true
    })
  }

  private runLocalSearch(value: string): void {
    if (this.render.canFilterOptionsInPlace()) {
      this.render.filterOptionsInPlace(value, this.events.searchFilter!)
      return
    }

    const searchResults = this.store.search(value, this.events.searchFilter!)
    this.render.renderOptions(searchResults)
  }

  private runApiSearch(value: string): void {
    const generation = ++this.searchGeneration
    this.render.renderSearching()

    const searchResp = this.events.search!(
      value,
      this.store.getSelectedOptions(),
      this.store.getCatalogData()
    )

    const applyResults = (
      data: (Partial<Option> | Partial<Optgroup>)[]
    ): void => {
      if (generation !== this.searchGeneration) {
        return
      }
      if (this.render.content.search.input.value.trim() !== value) {
        return
      }

      this.sync.enqueue({
        type: 'structure',
        data,
        source: 'api',
        preserveSelection: true,
        isSearchResult: true
      })
    }

    if (searchResp instanceof Promise) {
      searchResp.then(applyResults).catch((err: Error | string) => {
        if (generation !== this.searchGeneration) {
          return
        }
        this.render.renderError(typeof err === 'string' ? err : err.message)
      })

      return
    }

    if (Array.isArray(searchResp)) {
      applyResults(searchResp)
      return
    }

    this.render.renderError(
      'Search event must return a promise or an array of data'
    )
  }

  public destroy(): void {
    this.lifecycle.destroy()

    this.render.stopPositionTracking()

    this.globalEvents.detach({
      listenScroll: this.settings.openPosition === 'auto'
    })

    // Delete the store data
    this.store.setData([])

    // Remove the render
    this.render.destroy()

    // Show the original select element
    this.select.destroy()

    delete (this.selectEl as HTMLSelectElement & { slim?: SlimSelect }).slim
  }

  // Event listener for document click
  private documentClick(e: Event): void {
    // If the content is not open, there is no need to close it
    if (!this.settings.isOpen) {
      return
    }

    // Check if the click was on the content by looking at the parents
    if (
      e.target &&
      !hasClassInTree(e.target as HTMLElement, this.settings.id)
    ) {
      this.close(e.type)
    }
  }
}
