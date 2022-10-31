import { debounce, hasClassInTree } from './helper'
import Render from './render'
import Select from './select'
import Settings, { SettingsPartial } from './settings'
import Store, { DataArray, DataArrayPartial, Option, OptionOptional } from './store'

export * from './helper'
export * from './render'
export * from './select'
export * from './settings'
export * from './store'

export interface Config {
  select: string | Element
  data?: DataArrayPartial
  settings?: SettingsPartial
  events?: Events
}

export interface Events {
  fetch?: (value: string, func: (data: DataArrayPartial) => void) => void
  searchFilter?: (opt: Option, search: string) => boolean
  addable?: (value: string) => OptionOptional | string
  beforeChange?: (newVal: DataArray, oldVal: DataArray) => boolean
  afterChange?: (newVal: DataArray) => void
  beforeOpen?: () => void
  afterOpen?: () => void
  beforeClose?: () => void
  afterClose?: () => void
}

export default class SlimSelect {
  public selectEl: HTMLSelectElement

  // Classes
  public settings: Settings
  public select: Select
  public store: Store
  public render: Render

  // Events
  public events = {
    fetch: undefined,
    searchFilter: (opt: Option, search: string) => {
      return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
    },
    addable: undefined,
    beforeOnChange: undefined,
    onChange: undefined,
    beforeOpen: undefined,
    afterOpen: undefined,
    beforeClose: undefined,
    afterClose: undefined,
  } as Events

  constructor(config: Config) {
    // Make sure you get the right element
    this.selectEl = (
      typeof config.select === 'string' ? document.querySelector(config.select) : config.select
    ) as HTMLSelectElement
    if (!this.selectEl) {
      throw new Error('Could not find select element')
    }
    if (this.selectEl.tagName !== 'SELECT') {
      throw new Error('Element isnt of type select')
    }

    // If select already has a slim select id on it lets destroy it first
    if (this.selectEl.dataset.ssid) {
      this.destroy()
    }

    // Set settings
    this.settings = new Settings(config.settings)

    // Set events
    for (const key in config.events) {
      if (config.events.hasOwnProperty(key)) {
        ;(this.events as { [key: string]: any })[key] = (config.events as { [key: string]: any })[key]
      }
    }

    // Upate settings with type, style and classname
    this.settings.isMultiple = this.selectEl.multiple
    this.settings.style = this.selectEl.style.cssText
    this.settings.class = this.selectEl.className.split(' ')

    // Set select class
    this.select = new Select(this.selectEl)
    this.select.updateSelect(this.settings.id, this.settings.style, this.settings.class)
    this.select.hideUI()

    // Set store class
    this.store = new Store(config.data ? config.data : this.select.getData())

    // If data is passed update the original select element
    if (config.data) {
      this.select.updateOptions(this.store.getData())
    }

    // Set render callbacks
    const callbacks = {
      open: this.open.bind(this),
      close: this.close.bind(this),
      addable: this.events.addable ? this.events.addable : undefined,
      addSelected: this.addSelected.bind(this),
      setSelected: this.setSelected.bind(this),
      addOption: this.addOption.bind(this),
      search: this.search.bind(this),
      beforeChange: this.events.beforeChange,
      afterChange: this.events.afterChange,
      beforeDelete: (before: DataArray, after: DataArray) => {
        return true
      },
    }

    // Setup render class
    this.render = new Render(this.settings, this.store, callbacks)

    // Add render after original select element
    if (this.selectEl.parentNode) {
      this.selectEl.parentNode.insertBefore(this.render.main, this.selectEl.nextSibling)
    }

    // Add onclick listener to document to closeContent if clicked outside
    document.addEventListener('click', this.documentClick)

    // Add window resize listener to moveContent if window size changes
    window.addEventListener('resize', this.windowResize, false)

    // If the user wants to show the content forcibly on a specific side,
    // there is no need to listen for scroll events
    if (this.settings.contentPosition === 'auto') {
      window.addEventListener('scroll', this.windowScroll, false)
    }

    // If disabled lets call it
    if (!this.settings.isEnabled) {
      this.disable()
    }
  }

  // Set to enabled and remove disabled classes
  public enable(): void {
    this.settings.isEnabled = true

    this.select.enable()
    this.render.enable()
  }

  // Set to disabled and add disabled classes
  public disable(): void {
    this.settings.isEnabled = false

    this.select.disable()
    this.render.disable()
  }

  public getSelected(): DataArray {
    return this.store.getSelected()
  }

  public getSelectedOptions(): Option[] {
    return this.store.getSelectedOptions()
  }

  public setSelected(value: string | string[]): void {
    // Update the store
    this.store.setSelectedBy('value', Array.isArray(value) ? value : [value])

    // Update the select element
    this.select.setSelected(this.store.getSelectedValues())

    // Update the render
    this.render.setSelected()
  }

  public setData(data: DataArrayPartial): void {
    this.store.setData(data)
    this.select.updateOptions(this.store.getData())
    this.render.renderOptions(this.store.getData())
  }

  public addOption(option: OptionOptional): void {
    // Add option to store
    this.store.addOption(option)
    const data = this.store.getData()

    // Update the select element
    this.select.updateOptions(data)

    // Update the render
    this.render.renderOptions(data)
  }

  public addSelected(value: string): void {
    // Update the store
    let selectedValues = this.store.getSelectedValues()
    selectedValues.push(value)
    this.store.setSelectedBy('value', selectedValues)

    // Update the select element
    this.select.setSelected(this.store.getSelectedValues())

    // Update the render
    this.render.setSelected()
  }

  public open(): void {
    // Dont open if disabled
    if (!this.settings.isEnabled) {
      return
    }

    // Dont do anything if the content is already open
    if (this.settings.isOpen) {
      return
    }

    // Run beforeOpen callback
    if (this.events.beforeOpen) {
      this.events.beforeOpen()
    }

    this.render.open()

    // setTimeout is for animation completion
    setTimeout(() => {
      // Update settings
      this.settings.isOpen = true

      // Focus on input field
      this.render.search.input.focus()

      // Run afterOpen callback
      if (this.events.afterOpen) {
        this.events.afterOpen()
      }
    }, this.settings.timeoutDelay)
  }

  public close(): void {
    // Dont do anything if the content is already closed
    if (!this.settings.isOpen) {
      return
    }

    // Run beforeClose calback
    if (this.events.beforeClose) {
      this.events.beforeClose()
    }

    // Tell render to close
    this.render.close()

    // Update settings
    this.settings.isOpen = false

    // Clear search
    this.search('') // Clear search

    // Reset the content below
    setTimeout(() => {
      // After content is closed lets blur on the input field
      this.render.search.input.blur()

      // Run afterClose callback
      if (this.events.afterClose) {
        this.events.afterClose()
      }
    }, this.settings.timeoutDelay)
  }

  // Take in string value and search current options
  public search(value: string): void {
    // Only filter data and rerender if value has changed
    if (this.settings.searchValue === value) {
      return
    }

    if (this.render.search.input.value !== value) {
      this.render.search.input.value = value
    }

    // If not fetch run regular search
    if (!this.events.fetch) {
      this.render.renderOptions(this.store.search(value))
      return
    }

    // Fetch event exists so lets update isSearching settings
    this.settings.isSearching = true

    // Call fetch function
    this.events.fetch(value, (data: DataArrayPartial) => {
      // Only process if return callback is not false
      this.settings.isSearching = false
      data.unshift({ text: '', placeholder: true })
      this.store.setData(data)
      this.store.search(value)
      this.render.renderOptions(this.store.getData())
    })
  }

  public destroy(): void {
    document.removeEventListener('click', this.documentClick)

    window.removeEventListener('resize', this.windowResize, false)

    if (this.settings.contentPosition === 'auto') {
      window.removeEventListener('scroll', this.windowScroll, false)
    }
  }

  private windowResize: (e: Event) => void = debounce(() => {
    if (!this.settings.isOpen) {
      return
    }

    this.render.moveContent()
  })

  // Event listener for window scrolling
  private windowScroll: (e: Event) => void = debounce(() => {
    if (!this.settings.isOpen) {
      return
    }

    // Determine where to put the content
    if (this.render.putContent(this.render.content, this.settings.isOpen) === 'up') {
      this.render.moveContentAbove()
    } else {
      this.render.moveContentBelow()
    }
  })

  // Event listener for document click
  private documentClick: (e: Event) => void = (e: Event) => {
    if (e.target && !hasClassInTree(e.target as HTMLElement, this.settings.id)) {
      this.close()
    }
  }
}
