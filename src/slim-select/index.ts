import { debounce, hasClassInTree, putContent } from './helper'
import Render from './render'
import Select from './select'
import Settings from './settings'
import Store, { DataArray, Option } from './store'

export * from './helper'
export * from './render'
export * from './select'
export * from './settings'
export * from './store'

export interface Config {
  select: string | Element
  data?: DataArray
  settings?: Settings
  events?: Events
}

export interface Events {
  ajax?: (value: string, func: (info: any) => void) => void
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
    ajax: undefined,
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
      this.destroy(this.selectEl.dataset.ssid)
    }

    // Set settings
    this.settings = new Settings(config.settings)

    // Upate settings with style and classname
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
      this.select.updateOptions(config.data)
    }

    // Set render callbacks
    const callbacks = {
      open: () => {},
      close: () => {},
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

  public destroy(ssid: string): void {
    document.removeEventListener('click', this.documentClick)

    if (this.settings.contentPosition === 'auto') {
      window.removeEventListener('scroll', this.windowScroll, false)
    }
  }

  // Event listener for window scrolling`
  private windowScroll: (e: Event) => void = debounce((e: Event) => {
    if (this.settings.isOpen) {
      if (putContent(this.selectEl, this.settings.contentPosition, this.settings.isOpen) === 'above') {
        this.setPosition('up')
      } else {
        this.setPosition('down')
      }
    }
  })

  // Event listener for document click
  private documentClick: (e: Event) => void = (e: Event) => {
    if (e.target && !hasClassInTree(e.target as HTMLElement, this.settings.id)) {
      //   this.close()
    }
  }
}
