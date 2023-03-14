import Settings, { SettingsPartial } from './settings'
import Render from './render'
import Select from './select'
import Store, { DataArray, DataArrayPartial, Option, OptionOptional } from './store'
import { debounce, hasClassInTree, isEqual } from './helpers'

export interface Config {
  select: string | Element
  data?: DataArrayPartial
  settings?: SettingsPartial
  events?: Events
}

export interface Events {
  search?: (searchValue: string, currentData: DataArray) => Promise<DataArrayPartial> | DataArrayPartial
  searchFilter?: (option: Option, search: string) => boolean
  addable?: (value: string) => Promise<OptionOptional | string> | OptionOptional | string | false | null | undefined
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
  public select!: Select
  public store!: Store
  public render!: Render

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
    afterClose: undefined,
  } as Events

  constructor(config: Config) {
    // Make sure you get the right element
    this.selectEl = (
      typeof config.select === 'string' ? document.querySelector(config.select) : config.select
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

    // Set events
    const debounceEvents = ['afterChange', 'beforeOpen', 'afterOpen', 'beforeClose', 'afterClose']
    for (const key in config.events) {
      // Check if key exists in events
      if (!config.events.hasOwnProperty(key)) {
        continue
      }

      // Check if key is in debounceEvents
      if (debounceEvents.indexOf(key) !== -1) {
        ;(this.events as { [key: string]: any })[key] = debounce((config.events as { [key: string]: any })[key], 100)
      } else {
        ;(this.events as { [key: string]: any })[key] = (config.events as { [key: string]: any })[key]
      }
    }

    // Upate settings with type, style and classname
    this.settings.disabled = config.settings?.disabled ? config.settings.disabled : this.selectEl.disabled
    this.settings.isMultiple = this.selectEl.multiple
    this.settings.style = this.selectEl.style.cssText
    this.settings.class = this.selectEl.className.split(' ')

    // Set select class
    this.select = new Select(this.selectEl)
    this.select.updateSelect(this.settings.id, this.settings.style, this.settings.class)
    this.select.hideUI() // Hide the original select element

    // Add select listeners
    this.select.onValueChange = (values: string[]) => {
      // Run set selected from the values given
      this.setSelected(values)
    }
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
    this.select.onOptionsChange = (data: DataArrayPartial) => {
      // Run set data from the values given
      this.setData(data)
    }

    // Set store class
    this.store = new Store(
      this.settings.isMultiple ? 'multiple' : 'single',
      config.data ? config.data : this.select.getData(),
    )

    // If data is passed update the original select element
    if (config.data) {
      this.select.updateOptions(this.store.getData())
    }

    // Set render callbacks
    const callbacks = {
      open: this.open.bind(this),
      close: this.close.bind(this),
      addable: this.events.addable ? this.events.addable : undefined,
      setSelected: this.setSelected.bind(this),
      addOption: this.addOption.bind(this),
      search: this.search.bind(this),
      beforeChange: this.events.beforeChange,
      afterChange: this.events.afterChange,
    }

    // Setup render class
    this.render = new Render(this.settings, this.store, callbacks)
    this.render.renderValues()
    this.render.renderOptions(this.store.getData())

    // Add aria-label or aria-labelledby if exists
    const selectAriaLabel = this.selectEl.getAttribute('aria-label')
    const selectAriaLabelledBy = this.selectEl.getAttribute('aria-labelledby')

    if (selectAriaLabel) {
      this.render.main.main.setAttribute('aria-label', selectAriaLabel)
    } else if (selectAriaLabelledBy) {
      this.render.main.main.setAttribute('aria-labelledby', selectAriaLabelledBy)
    }

    // Add render after original select element
    if (this.selectEl.parentNode) {
      this.selectEl.parentNode.insertBefore(this.render.main.main, this.selectEl.nextSibling)
    }

    // Add onclick listener to document to closeContent if clicked outside
    document.addEventListener('click', this.documentClick)

    // Add window resize listener to moveContent if window size changes
    window.addEventListener('resize', this.windowResize, false)

    // If the user wants to show the content forcibly on a specific side,
    // there is no need to listen for scroll events
    if (this.settings.openPosition === 'auto') {
      window.addEventListener('scroll', this.windowScroll, false)
    }

    // Add window visibility change listener to closeContent if window is hidden
    document.addEventListener('visibilitychange', this.windowVisibilityChange)

    // If disabled lets call it
    if (this.settings.disabled) {
      this.disable()
    }

    // If alwaysOpnen then open it
    if (this.settings.alwaysOpen) {
      this.open()
    }

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

  public getData(): DataArray {
    return this.store.getData()
  }

  public setData(data: DataArrayPartial): void {
    // Get original selected values
    const selected = this.store.getSelected()

    // Validate data
    const err = this.store.validateDataArray(data)
    if (err) {
      if (this.events.error) {
        this.events.error(err)
      }
      return
    }

    // Update the store
    this.store.setData(data)
    const dataClean = this.store.getData()

    // Update original select element
    this.select.updateOptions(dataClean)

    // Update the render
    this.render.renderValues()
    this.render.renderOptions(dataClean)

    // Trigger afterChange event, if it doesnt equal the original selected values
    if (this.events.afterChange && !isEqual(selected, this.store.getSelected())) {
      this.events.afterChange(this.store.getSelectedOptions())
    }
  }

  public getSelected(): string[] {
    return this.store.getSelected()
  }

  public setSelected(value: string | string[], runAfterChange = true): void {
    // Get original selected values
    const selected = this.store.getSelected()

    // Update the store
    this.store.setSelectedBy('value', Array.isArray(value) ? value : [value])
    const data = this.store.getData()

    // Update the select element
    this.select.updateOptions(data)

    // Update the render
    this.render.renderValues()

    // If there is a search input value lets run through the search again
    // Otherwise we will just render the options from store data
    if (this.render.content.search.input.value !== '') {
      this.search(this.render.content.search.input.value)
    } else {
      this.render.renderOptions(data)
    }

    // Trigger afterChange event, if it doesnt equal the original selected values
    if (runAfterChange && this.events.afterChange && !isEqual(selected, this.store.getSelected())) {
      this.events.afterChange(this.store.getSelectedOptions())
    }
  }

  public addOption(option: OptionOptional): void {
    // Get original selected values
    const selected = this.store.getSelected()

    // Add option to store if it does not already include the option
    if (!this.store.getDataOptions().some((o) => o.value === (option.value ?? option.text))) {
      this.store.addOption(option)
    }
    const data = this.store.getData()

    // Update the select element
    this.select.updateOptions(data)

    // Update the render
    this.render.renderValues()
    this.render.renderOptions(data)

    // Trigger afterChange event, if it doesnt equal the original selected values
    if (this.events.afterChange && !isEqual(selected, this.store.getSelected())) {
      this.events.afterChange(this.store.getSelectedOptions())
    }
  }

  public open(): void {
    // Dont open if disabled
    // Dont do anything if the content is already open
    if (this.settings.disabled || this.settings.isOpen) {
      return
    }

    // Run beforeOpen callback
    if (this.events.beforeOpen) {
      this.events.beforeOpen()
    }

    // Tell render to open
    this.render.open()

    // Focus on input field only if search is enabled
    if (this.settings.showSearch) {
      this.render.searchFocus()
    }

    this.settings.isOpen = true
    // setTimeout is for animation completion
    setTimeout(() => {
      // Run afterOpen callback
      if (this.events.afterOpen) {
        this.events.afterOpen()
      }

      // Update settings
      // Prevent overide if user close fast without wait full open
      // For detail see issue https://github.com/brianvoe/slim-select/issues/397
      if (this.settings.isOpen) {
        this.settings.isFullOpen = true
      }
    }, this.settings.timeoutDelay)

    // Start an interval to check if main has moved
    // in order to keep content close to main
    if (this.settings.contentPosition === 'absolute') {
      if (this.settings.intervalMove) {
        clearInterval(this.settings.intervalMove)
      }
      this.settings.intervalMove = setInterval(this.render.moveContent.bind(this.render), 500)
    }
  }

  public close(eventType: string | null = null): void {
    // Dont do anything if the content is already closed
    // Dont do anything if alwaysOpen is true
    if (!this.settings.isOpen || this.settings.alwaysOpen) {
      return
    }

    // Run beforeClose calback
    if (this.events.beforeClose) {
      this.events.beforeClose()
    }

    // Tell render to close
    this.render.close()

    // Clear search only if not empty
    if (this.render.content.search.input.value !== '') {
      this.search('') // Clear search
    }

    // If we arent tabbing focus back on the main element
    this.render.mainFocus(eventType)

    // Update settings
    this.settings.isOpen = false
    this.settings.isFullOpen = false
    // Reset the content below
    setTimeout(() => {
      // Run afterClose callback
      if (this.events.afterClose) {
        this.events.afterClose()
      }
    }, this.settings.timeoutDelay)

    if (this.settings.intervalMove) {
      clearInterval(this.settings.intervalMove)
    }
  }

  // Take in string value and search current options
  public search(value: string): void {
    // If the passed in value is not the same as the search input value
    // then lets update the search input value
    if (this.render.content.search.input.value !== value) {
      this.render.content.search.input.value = value
    }

    // If no search event run regular search
    if (!this.events.search) {
      // If value is empty then render all options
      this.render.renderOptions(
        value === '' ? this.store.getData() : this.store.search(value, this.events.searchFilter!),
      )
      return
    }

    // Search event exists so lets render the searching text
    this.render.renderSearching()

    // Based upon the search event deal with the response
    const searchResp = this.events.search(value, this.store.getSelectedOptions())

    // If the search event returns a promise
    if (searchResp instanceof Promise) {
      searchResp
        .then((data: DataArrayPartial) => {
          // Update the render with the new data
          this.render.renderOptions(this.store.partialToFullData(data))
        })
        .catch((err: Error | string) => {
          // Update the render with error
          this.render.renderError(typeof err === 'string' ? err : err.message)
        })

      return
    } else if (Array.isArray(searchResp)) {
      // Update the render options
      this.render.renderOptions(this.store.partialToFullData(searchResp))
    } else {
      // Update the render with error
      this.render.renderError('Search event must return a promise or an array of data')
    }
  }

  public destroy(): void {
    // Remove all event listeners
    document.removeEventListener('click', this.documentClick)
    window.removeEventListener('resize', this.windowResize, false)
    if (this.settings.openPosition === 'auto') {
      window.removeEventListener('scroll', this.windowScroll, false)
    }
    document.removeEventListener('visibilitychange', this.windowVisibilityChange)

    // Delete the store data
    this.store.setData([])

    // Remove the render
    this.render.destroy()

    // Show the original select element
    this.select.destroy()
  }

  private windowResize: (e: Event) => void = debounce(() => {
    if (!this.settings.isOpen && !this.settings.isFullOpen) {
      return
    }

    this.render.moveContent()
  })

  // Event listener for window scrolling
  private windowScroll: (e: Event) => void = debounce(() => {
    // If the content is not open, there is no need to move it
    if (!this.settings.isOpen && !this.settings.isFullOpen) {
      return
    }

    this.render.moveContent()
  })

  // Event listener for document click
  private documentClick: (e: Event) => void = (e: Event) => {
    // If the content is not open, there is no need to close it
    if (!this.settings.isOpen) {
      return
    }

    // Check if the click was on the content by looking at the parents
    if (e.target && !hasClassInTree(e.target as HTMLElement, this.settings.id)) {
      this.close(e.type)
    }
  }

  // Event Listener for window visibility change
  private windowVisibilityChange: (e: Event) => void = () => {
    if (document.hidden) {
      this.close()
    }
  }
}
