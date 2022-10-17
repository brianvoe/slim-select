import { Data, DataArray, Option, validateData } from './data'
import { debounce, ensureElementInView, hasClassInTree, putContent } from './helper'
import { Select } from './select'
import { Slim } from './slim'

export interface Constructor {
  select: string | Element
  data?: DataArray
  settings?: Settings
  events?: Events
}

export interface Settings {
  showSearch?: boolean
  searchPlaceholder?: string
  searchText?: string
  searchingText?: string
  searchFocus?: boolean
  searchHighlight?: boolean
  searchFilter?: (opt: Option, search: string) => boolean
  closeOnSelect?: boolean
  showContent?: string
  placeholderText?: string
  allowDeselect?: boolean
  allowDeselectOption?: boolean
  hideSelectedOption?: boolean
  deselectLabel?: string
  isEnabled?: boolean
  valuesUseText?: boolean // Use text value when showing selected value
  showOptionTooltips?: boolean
  selectByGroup?: boolean
  limit?: number
  timeoutDelay?: number
  addToBody?: boolean
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
  public select: HTMLSelectElement
  public id: string = '' // Primary ID for the select
  public style: string = '' // Style attribute from the select element
  public class: string[] = [] // Class attribute from the select element
  public isMultiple: boolean = false
  public isAjax: boolean = false
  public isSearching: boolean = false
  public showSearch: boolean = true
  public searchFocus: boolean = true
  public searchHighlight: boolean = false
  public searchFilter(opt: Option, search: string): boolean {
    return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
  }
  public closeOnSelect: boolean = true
  public showContent: string = 'auto' // options: auto, up, down
  public searchPlaceholder: string = 'Search'
  public searchText: string = 'No Results'
  public searchingText: string = 'Searching...'
  public placeholderText: string = 'Select Value'
  public allowDeselect: boolean = false
  public allowDeselectOption: boolean = false
  public hideSelectedOption: boolean = false
  public deselectLabel: string = 'x'
  public isEnabled: boolean = true
  public valuesUseText: boolean = false
  public showOptionTooltips: boolean = false
  public selectByGroup: boolean = false
  public limit: number = 0
  public timeoutDelay: number = 200
  public addToBody: boolean = false

  // Classes
  public classes = {
    main: 'ss-main',
    singleSelected: 'ss-single-selected',
    arrow: 'ss-arrow',
    multiSelected: 'ss-multi-selected',
    add: 'ss-add',
    plus: 'ss-plus',
    values: 'ss-values',
    value: 'ss-value',
    valueText: 'ss-value-text',
    valueDelete: 'ss-value-delete',
    content: 'ss-content',
    open: 'ss-open',
    openAbove: 'ss-open-above',
    openBelow: 'ss-open-below',
    search: 'ss-search',
    searchHighlighter: 'ss-search-highlight',
    addable: 'ss-addable',
    list: 'ss-list',
    optgroup: 'ss-optgroup',
    optgroupLabel: 'ss-optgroup-label',
    optgroupLabelSelectable: 'ss-optgroup-label-selectable',
    option: 'ss-option',
    optionSelected: 'ss-option-selected',
    highlighted: 'ss-highlighted',
    disabled: 'ss-disabled',
    hide: 'ss-hide',
  }

  public selectClass: Select
  public data: Data
  public slim: Slim
  public ajax: ((value: string, func: (info: any) => void) => void) | null = null
  public addable: ((value: string) => Option | string) | null = null
  public beforeOnChange: ((info: Option) => void | boolean) | null = null
  public onChange: ((info: Option) => void) | null = null
  public beforeOpen: (() => void) | null = null
  public afterOpen: (() => void) | null = null
  public beforeClose: (() => void) | null = null
  public afterClose: (() => void) | null = null

  private windowScroll: (e: Event) => void = debounce((e: Event) => {
    if (this.data.contentOpen) {
      if (putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
        this.moveContentAbove()
      } else {
        this.moveContentBelow()
      }
    }
  })

  constructor(info: Constructor) {
    this.select = this.validate(info)

    // If select already has a slim select id on it lets destroy it first
    if (this.select.dataset.ssid) {
      this.destroy(this.select.dataset.ssid)
    }

    // Set ajax function if passed in
    if (info.ajax) {
      this.ajax = info.ajax
    }

    // Add addable if option is passed in
    if (info.addable) {
      this.addable = info.addable
    }

    // Take the constructor info and set the primary fields
    this.setSettingsFromConstructor(info)

    this.selectClass = new Select(this)

    this.data = new Data(this)
    this.slim = new Slim(this)

    // Add after original select element
    if (this.select.parentNode) {
      this.select.parentNode.insertBefore(this.slim.container, this.select.nextSibling)
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
    if (this.showContent === 'auto') {
      window.addEventListener('scroll', this.windowScroll, false)
    }

    // Add event callbacks after everthing has been created
    if (info.beforeOnChange) {
      this.beforeOnChange = info.beforeOnChange
    }
    if (info.onChange) {
      this.onChange = info.onChange
    }
    if (info.beforeOpen) {
      this.beforeOpen = info.beforeOpen
    }
    if (info.afterOpen) {
      this.afterOpen = info.afterOpen
    }
    if (info.beforeClose) {
      this.beforeClose = info.beforeClose
    }
    if (info.afterClose) {
      this.afterClose = info.afterClose
    }

    // If disabled lets call it
    if (!this.isEnabled) {
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

  setSettingsFromConstructor(info: Constructor) {
    this.id = 'ss-' + Math.floor(Math.random() * 100000)
    this.style = this.select.style.cssText
    this.class = this.select.className.split(' ')
    this.isMultiple = this.select.multiple
    this.isAjax = info.ajax ? true : false
    this.showSearch = info.showSearch === false ? false : true
    this.searchFocus = info.searchFocus === false ? false : true
    this.searchHighlight = info.searchHighlight === true ? true : false
    this.closeOnSelect = info.closeOnSelect === false ? false : true
    if (info.showContent) {
      this.showContent = info.showContent
    }
    this.isEnabled = info.isEnabled === false ? false : true
    if (info.searchPlaceholder) {
      this.searchPlaceholder = info.searchPlaceholder
    }
    if (info.searchText) {
      this.searchText = info.searchText
    }
    if (info.searchingText) {
      this.searchingText = info.searchingText
    }
    if (info.placeholderText) {
      this.placeholderText = info.placeholderText
    }
    this.allowDeselect = info.allowDeselect === true ? true : false
    this.allowDeselectOption = info.allowDeselectOption === true ? true : false
    this.hideSelectedOption = info.hideSelectedOption === true ? true : false
    if (info.deselectLabel) {
      this.deselectLabel = info.deselectLabel
    }
    if (info.valuesUseText) {
      this.valuesUseText = info.valuesUseText
    }
    if (info.showOptionTooltips) {
      this.showOptionTooltips = info.showOptionTooltips
    }
    if (info.selectByGroup) {
      this.selectByGroup = info.selectByGroup
    }
    if (info.limit) {
      this.limit = info.limit
    }
    if (info.searchFilter) {
      this.searchFilter = info.searchFilter
    }
    if (info.timeoutDelay != null) {
      this.timeoutDelay = info.timeoutDelay
    }
    this.addToBody = info.addToBody === true ? true : false
  }

  public selected(): string | string[] {
    if (this.isMultiple) {
      const selected = this.data.getSelected() as Option[]
      const outputSelected: string[] = []
      for (const s of selected) {
        outputSelected.push(s.value as string)
      }
      return outputSelected
    } else {
      const selected = this.data.getSelected() as Option
      return selected ? (selected.value as string) : ''
    }
  }

  // Sets value of the select, adds it to data and original select
  public set(value: string | string[], type: string = 'value', close: boolean = true, render: boolean = true) {
    if (this.isMultiple && !Array.isArray(value)) {
      this.data.addToSelected(value, type)
    } else {
      this.data.setSelected(value, type)
    }
    this.selectClass.setValue()
    this.data.onDataChange() // Trigger on change callback
    this.render()

    // Close when all options are selected and hidden
    if (
      this.hideSelectedOption &&
      this.isMultiple &&
      (this.data.getSelected() as Option[]).length === this.data.data.length
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
      console.error('Validation problem on: #' + this.select.id)
      return
    } // If data passed in is not valid DO NOT parse, set and render

    const newData = JSON.parse(JSON.stringify(data))
    const selected = this.data.getSelected()

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

    this.selectClass.create(newData)
    this.data.parseSelectData()
    this.data.setSelectedFromSelect()
  }

  // addData will append to the current data set
  public addData(data: Option) {
    // Validate data if passed in
    const isValid = validateData([data])
    if (!isValid) {
      console.error('Validation problem on: #' + this.select.id)
      return
    } // If data passed in is not valid DO NOT parse, set and render

    this.data.add(this.data.newOption(data))
    this.selectClass.create(this.data.data)
    this.data.parseSelectData()
    this.data.setSelectedFromSelect()
    this.render()
  }

  // Open content section
  public open(): void {
    // Dont open if disabled
    if (!this.isEnabled) {
      return
    }

    // Dont do anything if the content is already open
    if (this.data.contentOpen) {
      return
    }

    // Dont open when all options are selected and hidden
    if (
      this.hideSelectedOption &&
      this.isMultiple &&
      (this.data.getSelected() as Option[]).length === this.data.data.length
    ) {
      return
    }

    // Run beforeOpen callback
    if (this.beforeOpen) {
      this.beforeOpen()
    }

    if (this.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.plus.classList.add('ss-cross')
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-down')
      this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-up')
    }
    ;(this.slim as any)[this.isMultiple ? 'multiSelected' : 'singleSelected'].container.classList.add(
      this.data.contentPosition === 'above' ? this.classes.openAbove : this.classes.openBelow,
    )

    if (this.addToBody) {
      // move the content in to the right location
      const containerRect = this.slim.container.getBoundingClientRect()
      this.slim.content.style.top = containerRect.top + containerRect.height + window.scrollY + 'px'
      this.slim.content.style.left = containerRect.left + window.scrollX + 'px'
      this.slim.content.style.width = containerRect.width + 'px'
    }
    this.slim.content.classList.add(this.classes.open)

    // Check showContent to see if they want to specifically show in a certain direction
    if (this.showContent.toLowerCase() === 'up') {
      this.moveContentAbove()
    } else if (this.showContent.toLowerCase() === 'down') {
      this.moveContentBelow()
    } else {
      // Auto identify where to put it
      if (putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
        this.moveContentAbove()
      } else {
        this.moveContentBelow()
      }
    }

    // Move to selected option for single option
    if (!this.isMultiple) {
      const selected = this.data.getSelected() as Option
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
      this.data.contentOpen = true

      // Focus on input field
      if (this.searchFocus) {
        this.slim.search.input.focus()
      }

      // Run afterOpen callback
      if (this.afterOpen) {
        this.afterOpen()
      }
    }, this.timeoutDelay)
  }

  // Close content section
  public close(): void {
    // Dont do anything if the content is already closed
    if (!this.data.contentOpen) {
      return
    }

    // Run beforeClose calback
    if (this.beforeClose) {
      this.beforeClose()
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
    this.data.contentOpen = false

    this.search('') // Clear search

    // Reset the content below
    setTimeout(() => {
      this.slim.content.removeAttribute('style')
      this.data.contentPosition = 'below'

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
      if (this.afterClose) {
        this.afterClose()
      }
    }, this.timeoutDelay)
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
    this.data.contentPosition = 'above'

    if (this.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.remove(this.classes.openBelow)
      this.slim.multiSelected.container.classList.add(this.classes.openAbove)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.remove(this.classes.openBelow)
      this.slim.singleSelected.container.classList.add(this.classes.openAbove)
    }
  }

  public moveContentBelow(): void {
    this.data.contentPosition = 'below'

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
    this.isEnabled = true
    if (this.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.remove(this.classes.disabled)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.remove(this.classes.disabled)
    }

    // Disable original select but dont trigger observer
    this.selectClass.triggerMutationObserver = false
    this.selectClass.element.disabled = false
    this.slim.search.input.disabled = false
    this.selectClass.triggerMutationObserver = true
  }

  // Set to disabled, add disabled classes and add disabled to original select
  public disable(): void {
    this.isEnabled = false
    if (this.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.add(this.classes.disabled)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.add(this.classes.disabled)
    }

    // Enable original select but dont trigger observer
    this.selectClass.triggerMutationObserver = false
    this.selectClass.element.disabled = true
    this.slim.search.input.disabled = true
    this.selectClass.triggerMutationObserver = true
  }

  // Take in string value and search current options
  public search(value: string): void {
    // Only filter data and rerender if value has changed
    if (this.data.searchValue === value) {
      return
    }

    this.slim.search.input.value = value
    if (this.isAjax) {
      const master = this
      this.isSearching = true
      this.render()

      // If ajax call it
      if (this.ajax) {
        this.ajax(value, (info: any) => {
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
      this.data.search(value)
      this.render()
    }
  }

  public setSearchText(text: string): void {
    this.searchText = text
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

    if (this.showContent === 'auto') {
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
    if (this.addToBody) {
      const slimContent = id ? document.querySelector('.' + id + '.ss-content') : this.slim.content
      if (!slimContent) {
        return
      }
      document.body.removeChild(slimContent)
    }
  }

  private documentClick: (e: Event) => void = (e: Event) => {
    if (e.target && !hasClassInTree(e.target as HTMLElement, this.id)) {
      this.close()
    }
  }
}
