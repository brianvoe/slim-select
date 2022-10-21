import { debounce, ensureElementInView, generateID, hasClassInTree, putContent } from './helper'
import { Slim } from './render'
import { Select } from './select'
import Store, { DataArray, Option } from './store'

export interface Constructor {
  select: string | Element
  data?: DataArray
  settings?: SettingsFields
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
  public id: string = '' // Primary ID for the select
  public style: string = '' // Style attribute from the select element
  public class: string[] = [] // Class attribute from the select element

  // Classes
  public select: Select
  public store: Store
  public slim: Slim

  // Misc internal settings

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

  constructor(info: Constructor) {
    this.selectEl = this.validate(info)

    // If select already has a slim select id on it lets destroy it first
    if (this.selectEl.dataset.ssid) {
      this.destroy(this.selectEl.dataset.ssid)
    }

    // Set misc attributes on the main select element
    this.selectEl.tabIndex = -1
    this.selectEl.style.display = 'none'
    this.selectEl.setAttribute('aria-hidden', 'true')

    // Set base values from select element
    this.id = 'ss-' + generateID()
    this.style = this.selectEl.style.cssText
    this.class = this.selectEl.className.split(' ')

    // Set settings from constructor
    this.setSettings(info.settings || {})

    // Set events from constructor
    this.setEvents(info.events || {})

    // Setup Select class
    this.select = new Select(this)
    if (info.data) {
      this.select.updateSelect(info.data)
    }
    this.select.addChangeListeners(() => {
      // Update the data in the store
      this.store.updateData(this.select.getData())
    })

    // Setup Store class from either passed in data or select element data
    this.store = info.data ? new Store(info.data) : new Store(this.select.getData())
    this.slim = new Slim(this)

    // Add after original select element
    if (this.selectEl.parentNode) {
      this.selectEl.parentNode.insertBefore(this.slim.container, this.selectEl.nextSibling)
    }

    // If data is passed in lets set it
    // and thus will start the render
    if (info.data) {
      this.setData(info.data)
    } else {
      // Do an initial render on startup
      this.render()
    }

    // Add onclick listener to document to closeContent if clicked outside
    document.addEventListener('click', this.documentClick)

    // If the user wants to show the content forcibly on a specific side,
    // there is no need to listen for scroll events
    if (this.settings.showContent === 'auto') {
      window.addEventListener('scroll', this.windowScroll, false)
    }

    // If disabled lets call it
    if (!this.settings.isEnabled) {
      this.disable()
    }
  }

  public validate(info: Constructor) {
    const select = (
      typeof info.select === 'string' ? document.querySelector(info.select) : info.select
    ) as HTMLSelectElement
    if (!select) {
      throw new Error('Could not find select element')
    }
    if (select.tagName !== 'SELECT') {
      throw new Error('Element isnt of type select')
    }
    return select
  }

  public setSettings(settings: Settings) {
    for (const key in settings) {
      // make sure key exists in this.settings and settings
      if (this.settings.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
        ;(this.settings as { [key: string]: any })[key] = (settings as { [key: string]: any })[key]
      }
    }
  }

  public setEvents(events: Events) {
    for (const key in events) {
      if (events.hasOwnProperty(key)) {
        ;(this.events as { [key: string]: any })[key] = (events as { [key: string]: any })[key]
      }
    }
  }

  public selected(): string | string[] {
    if (this.isMultiple) {
      const selected = this.store.getSelected()
      const outputSelected: string[] = []
      for (const s of selected) {
        outputSelected.push(s.value as string)
      }
      return outputSelected
    } else {
      const selected = this.store.getSelected() as Option
      return selected ? (selected.value as string) : ''
    }
  }

  // Sets value of the select, adds it to data and original select
  public set(value: string | string[], type: string = 'value', close: boolean = true, render: boolean = true) {
    if (this.isMultiple && !Array.isArray(value)) {
      this.store.addToSelected(value, type)
    } else {
      this.store.setSelected(value, type)
    }
    this.select.setValue()
    this.store.onDataChange() // Trigger on change callback
    this.render()

    // Close when all options are selected and hidden
    if (
      this.settings.hideSelectedOption &&
      this.isMultiple &&
      (this.store.getSelected() as Option[]).length === this.store.data.length
    ) {
      close = true
    }

    if (close) {
      this.close()
    }
  }

  // setSelected is just mapped to the set method
  public setSelected(value: string | string[], type: string = 'value', close: boolean = true, render: boolean = true) {
    this.set(value, type, close, render)
  }

  public setData(data: DataArray) {
    // Validate data if passed in
    const isValid = validateData(data)
    if (!isValid) {
      console.error('Validation problem on: #' + this.selectEl.id)
      return
    } // If data passed in is not valid DO NOT parse, set and render

    const newData = JSON.parse(JSON.stringify(data))
    const selected = this.store.getSelected()

    // Check newData to make sure value is set
    // If not set from text
    for (let i = 0; i < newData.length; i++) {
      if (!newData[i].value && !newData[i].placeholder) {
        newData[i].value = newData[i].text
      }
    }

    // If its an ajax type keep selected values
    if (this.isAjax && selected) {
      if (this.isMultiple) {
        const reverseSelected = (selected as Option[]).reverse()
        for (const r of reverseSelected) {
          newData.unshift(r)
        }
      } else {
        newData.unshift(selected)

        // Look for duplicate selected if so remove it
        for (let i = 0; i < newData.length; i++) {
          if (
            !newData[i].placeholder &&
            newData[i].value === (selected as Option).value &&
            newData[i].text === (selected as Option).text
          ) {
            newData.splice(i, 1)
          }
        }

        // Add placeholder if it doesnt already have one
        let hasPlaceholder = false
        for (let i = 0; i < newData.length; i++) {
          if (newData[i].placeholder) {
            hasPlaceholder = true
          }
        }
        if (!hasPlaceholder) {
          newData.unshift({ text: '', placeholder: true })
        }
      }
    }

    this.select.create(newData)
    this.store.parseSelectData()
    this.store.setSelectedFromSelect()
  }

  // addData will append to the current data set
  public addData(data: Option) {
    // Validate data if passed in
    const isValid = validateData([data])
    if (!isValid) {
      console.error('Validation problem on: #' + this.selectEl.id)
      return
    } // If data passed in is not valid DO NOT parse, set and render

    this.store.add(this.store.newOption(data))
    this.select.create(this.store.data)
    this.store.parseSelectData()
    this.store.setSelectedFromSelect()
    this.render()
  }

  // Open content section
  public open(): void {
    // Dont open if disabled
    if (!this.settings.isEnabled) {
      return
    }

    // Dont do anything if the content is already open
    if (this.store.contentOpen) {
      return
    }

    // Dont open when all options are selected and hidden
    if (
      this.settings.hideSelectedOption &&
      this.isMultiple &&
      (this.store.getSelected() as Option[]).length === this.store.data.length
    ) {
      return
    }

    // Run beforeOpen callback
    if (this.events.beforeOpen) {
      this.events.beforeOpen()
    }

    if (this.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.plus.classList.add('ss-cross')
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-down')
      this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-up')
    }
    ;(this.slim as any)[this.isMultiple ? 'multiSelected' : 'singleSelected'].container.classList.add(
      this.store.contentPosition === 'above' ? this.classes.openAbove : this.classes.openBelow,
    )

    if (this.settings.addToBody) {
      // move the content in to the right location
      const containerRect = this.slim.container.getBoundingClientRect()
      this.slim.content.style.top = containerRect.top + containerRect.height + window.scrollY + 'px'
      this.slim.content.style.left = containerRect.left + window.scrollX + 'px'
      this.slim.content.style.width = containerRect.width + 'px'
    }
    this.slim.content.classList.add(this.classes.open)

    // Check showContent to see if they want to specifically show in a certain direction
    if (this.settings.showContent.toLowerCase() === 'up') {
      this.moveContentAbove()
    } else if (this.settings.showContent.toLowerCase() === 'down') {
      this.moveContentBelow()
    } else {
      // Auto identify where to put it
      if (putContent(this.slim.content, this.store.contentPosition, this.store.contentOpen) === 'above') {
        this.moveContentAbove()
      } else {
        this.moveContentBelow()
      }
    }

    // Move to selected option for single option
    if (!this.isMultiple) {
      const selected = this.store.getSelected() as Option
      if (selected) {
        const selectedId = selected.id
        const selectedOption = this.slim.list.querySelector('[data-id="' + selectedId + '"]') as HTMLElement
        if (selectedOption) {
          ensureElementInView(this.slim.list, selectedOption)
        }
      }
    }

    // setTimeout is for animation completion
    setTimeout(() => {
      this.store.contentOpen = true

      // Focus on input field
      if (this.settings.searchFocus) {
        this.slim.search.input.focus()
      }

      // Run afterOpen callback
      if (this.events.afterOpen) {
        this.events.afterOpen()
      }
    }, this.settings.timeoutDelay)
  }

  // Close content section
  public close(): void {
    // Dont do anything if the content is already closed
    if (!this.store.contentOpen) {
      return
    }

    // Run beforeClose calback
    if (this.events.beforeClose) {
      this.events.beforeClose()
    }

    // this.slim.search.input.blur() // Removed due to safari quirk
    if (this.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.remove(this.classes.openAbove)
      this.slim.multiSelected.container.classList.remove(this.classes.openBelow)
      this.slim.multiSelected.plus.classList.remove('ss-cross')
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.remove(this.classes.openAbove)
      this.slim.singleSelected.container.classList.remove(this.classes.openBelow)
      this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-down')
      this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-up')
    }
    this.slim.content.classList.remove(this.classes.open)
    this.store.contentOpen = false

    this.search('') // Clear search

    // Reset the content below
    setTimeout(() => {
      this.slim.content.removeAttribute('style')
      this.store.contentPosition = 'below'

      if (this.isMultiple && this.slim.multiSelected) {
        this.slim.multiSelected.container.classList.remove(this.classes.openAbove)
        this.slim.multiSelected.container.classList.remove(this.classes.openBelow)
      } else if (this.slim.singleSelected) {
        this.slim.singleSelected.container.classList.remove(this.classes.openAbove)
        this.slim.singleSelected.container.classList.remove(this.classes.openBelow)
      }

      // After content is closed lets blur on the input field
      this.slim.search.input.blur()

      // Run afterClose callback
      if (this.events.afterClose) {
        this.events.afterClose()
      }
    }, this.settings.timeoutDelay)
  }

  public moveContentAbove(): void {
    let selectHeight: number = 0
    if (this.isMultiple && this.slim.multiSelected) {
      selectHeight = this.slim.multiSelected.container.offsetHeight
    } else if (this.slim.singleSelected) {
      selectHeight = this.slim.singleSelected.container.offsetHeight
    }
    const contentHeight = this.slim.content.offsetHeight
    const height = selectHeight + contentHeight - 1
    this.slim.content.style.margin = '-' + height + 'px 0 0 0'
    this.slim.content.style.height = height - selectHeight + 1 + 'px'
    this.slim.content.style.transformOrigin = 'center bottom'
    this.store.contentPosition = 'above'

    if (this.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.remove(this.classes.openBelow)
      this.slim.multiSelected.container.classList.add(this.classes.openAbove)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.remove(this.classes.openBelow)
      this.slim.singleSelected.container.classList.add(this.classes.openAbove)
    }
  }

  public moveContentBelow(): void {
    this.store.contentPosition = 'below'

    if (this.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.remove(this.classes.openAbove)
      this.slim.multiSelected.container.classList.add(this.classes.openBelow)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.remove(this.classes.openAbove)
      this.slim.singleSelected.container.classList.add(this.classes.openBelow)
    }
  }

  // Set to enabled, remove disabled classes and removed disabled from original select
  public enable(): void {
    this.settings.isEnabled = true
    if (this.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.remove(this.classes.disabled)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.remove(this.classes.disabled)
    }

    // Disable original select but dont trigger observer
    this.select.triggerMutationObserver = false
    this.select.main.select.disabled = false
    this.slim.search.input.disabled = false
    this.select.triggerMutationObserver = true
  }

  // Set to disabled, add disabled classes and add disabled to original select
  public disable(): void {
    this.settings.isEnabled = false
    if (this.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.add(this.classes.disabled)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.add(this.classes.disabled)
    }

    // Enable original select but dont trigger observer
    this.select.triggerMutationObserver = false
    this.select.main.select.disabled = true
    this.slim.search.input.disabled = true
    this.select.triggerMutationObserver = true
  }

  // Take in string value and search current options
  public search(value: string): void {
    // Only filter data and rerender if value has changed
    if (this.store.searchValue === value) {
      return
    }

    this.slim.search.input.value = value
    if (this.isAjax) {
      const master = this
      this.isSearching = true
      this.render()

      // If ajax call it
      if (this.events.ajax) {
        this.events.ajax(value, (info: any) => {
          // Only process if return callback is not false
          master.isSearching = false
          if (Array.isArray(info)) {
            info.unshift({ text: '', placeholder: true })
            master.setData(info)
            master.data.search(value)
            master.render()
          } else if (typeof info === 'string') {
            master.slim.options(info)
          } else {
            master.render()
          }
        })
      }
    } else {
      this.store.search(value)
      this.render()
    }
  }

  public setSearchText(text: string): void {
    this.settings.searchText = text
  }

  public render(): void {
    if (this.isMultiple) {
      this.slim.values()
    } else {
      this.slim.placeholder()
      this.slim.deselect()
    }
    this.slim.options()
  }

  // Display original select again and remove slim
  public destroy(id: string | null = null): void {
    const slim = id ? document.querySelector('.' + id + '.ss-main') : this.slim.container
    const select = id ? (document.querySelector(`[data-ssid=${id}]`) as HTMLSelectElement) : this.select
    // If there is no slim dont do anything
    if (!slim || !select) {
      return
    }

    document.removeEventListener('click', this.documentClick)

    if (this.settings.showContent === 'auto') {
      window.removeEventListener('scroll', this.windowScroll, false)
    }

    // Show original select
    select.style.display = ''
    delete select.dataset.ssid

    // Remove slim from original select dropdown
    const el = select as any
    el.slim = null

    // Remove slim select
    if (slim.parentElement) {
      slim.parentElement.removeChild(slim)
    }

    // remove the content if it was added to the document body
    if (this.settings.addToBody) {
      const slimContent = id ? document.querySelector('.' + id + '.ss-content') : this.slim.content
      if (!slimContent) {
        return
      }
      document.body.removeChild(slimContent)
    }
  }

  // Event listener for window scrolling`
  private windowScroll: (e: Event) => void = debounce((e: Event) => {
    if (this.store.contentOpen) {
      if (putContent(this.slim.content, this.store.contentPosition, this.store.contentOpen) === 'above') {
        this.moveContentAbove()
      } else {
        this.moveContentBelow()
      }
    }
  })

  // Event listener for document click
  private documentClick: (e: Event) => void = (e: Event) => {
    if (e.target && !hasClassInTree(e.target as HTMLElement, this.id)) {
      this.close()
    }
  }
}
