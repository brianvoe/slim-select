import { debounce, hasClassInTree } from './helper'
import Render from './render'
import Select from './select'
import Settings, { SettingsPartial } from './settings'
import Store, { DataArray, DataArrayPartial, Option } from './store'

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
  addable?: (value: string) => Option | string
  beforeOnChange?: (info: Option | Option[]) => void | boolean
  onChange?: (info: Option | Option[]) => void
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
      open: () => {
        console.log('hit open')
        this.setPosition('down')
      },
      close: () => {
        console.log('hit close')
        this.setPosition('up')
      },
      addSelected: (value: string) => {},
      setSelected: (value: string[]) => {},
      addOption: (option: Option) => {},
      search: (search: string) => {},
      beforeChange: (before: DataArray, after: DataArray) => {
        return true
      },
      beforeDelete: (before: DataArray, after: DataArray) => {
        return true
      },
      deleteByID: (id: string) => {},
    }

    // Setup render class
    this.render = new Render(this.settings, this.store, callbacks)

    // Add render after original select element
    if (this.selectEl.parentNode) {
      this.selectEl.parentNode.insertBefore(this.render.main, this.selectEl.nextSibling)
    }

    // Add onclick listener to document to closeContent if clicked outside
    document.addEventListener('click', this.documentClick)

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

  public setEvents(events: Events) {
    for (const key in events) {
      if (events.hasOwnProperty(key)) {
        ;(this.events as { [key: string]: any })[key] = (events as { [key: string]: any })[key]
      }
    }
  }

  // Set position will set the position of the content
  public setPosition(position: 'up' | 'down'): void {
    switch (position) {
      case 'up':
        this.settings.contentPosition = 'up'
        this.render.moveContentAbove()
        break

      case 'down':
        this.settings.contentPosition = 'down'
        this.render.moveContentBelow()
        break
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
    this.store.setSelectedBy('id', Array.isArray(value) ? value : [value])

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
      this.render.focusSearchInput(true)

      // Run afterOpen callback
      if (this.events.afterOpen) {
        this.events.afterOpen()
      }
    }, this.settings.timeoutDelay)
  }

  // Close content section
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
      this.render.focusSearchInput(false)

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

    this.render.search.input.value = value

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

    if (this.settings.contentPosition === 'auto') {
      window.removeEventListener('scroll', this.windowScroll, false)
    }
  }

  // Event listener for window scrolling
  private windowScroll: (e: Event) => void = debounce((e: Event) => {
    if (this.settings.isOpen) {
      if (this.render.putContent(this.selectEl, this.settings.isOpen) === 'up') {
        this.setPosition('up')
      } else {
        this.setPosition('down')
      }
    }
  })

  // Event listener for document click
  private documentClick: (e: Event) => void = (e: Event) => {
    if (e.target && !hasClassInTree(e.target as HTMLElement, this.settings.id)) {
      this.close()
    }
  }
}
