import { Config } from './config'
import { Select } from './select'
import { Slim } from './slim'
import { Data, dataArray, Option, validateData } from './data'
import { hasClassInTree, putContent, debounce, ensureElementInView } from './helper'

interface Constructor {
  select: string | Element
  data?: dataArray
  showSearch?: boolean
  searchPlaceholder?: string
  searchText?: string
  searchingText?: string
  searchFocus?: boolean
  searchHighlight?: boolean
  searchFilter?: (opt: Option, search: string) => boolean
  closeOnSelect?: boolean
  showContent?: string
  placeholder?: string
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

  // Events
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
  public config: Config
  public select: Select
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
  constructor(info: Constructor) {
    const selectElement = this.validate(info)

    // If select already has a slim select id on it lets destroy it first
    if (selectElement.dataset.ssid) { this.destroy(selectElement.dataset.ssid) }

    // Set ajax function if passed in
    if (info.ajax) { this.ajax = info.ajax }

    // Add addable if option is passed in
    if (info.addable) { this.addable = info.addable }

    this.config = new Config({
      select: selectElement,
      isAjax: (info.ajax ? true : false),
      showSearch: info.showSearch,
      searchPlaceholder: info.searchPlaceholder,
      searchText: info.searchText,
      searchingText: info.searchingText,
      searchFocus: info.searchFocus,
      searchHighlight: info.searchHighlight,
      searchFilter: info.searchFilter,
      closeOnSelect: info.closeOnSelect,
      showContent: info.showContent,
      placeholderText: info.placeholder,
      allowDeselect: info.allowDeselect,
      allowDeselectOption: info.allowDeselectOption,
      hideSelectedOption: info.hideSelectedOption,
      deselectLabel: info.deselectLabel,
      isEnabled: info.isEnabled,
      valuesUseText: info.valuesUseText,
      showOptionTooltips: info.showOptionTooltips,
      selectByGroup: info.selectByGroup,
      limit: info.limit,
      timeoutDelay: info.timeoutDelay,
      addToBody: info.addToBody
    })

    this.select = new Select({
      select: selectElement,
      main: this
    })

    this.data = new Data({ main: this })
    this.slim = new Slim({ main: this })

    // Add after original select element
    if (this.select.element.parentNode) {
      this.select.element.parentNode.insertBefore(this.slim.container, this.select.element.nextSibling)
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
    document.addEventListener('click', (e: Event) => {
      if (e.target && !hasClassInTree(e.target as HTMLElement, this.config.id)) {
        this.close()
      }
    })

    // If the user wants to show the content forcibly on a specific side,
    // there is no need to listen for scroll events
    if (this.config.showContent === 'auto') {
        window.addEventListener('scroll', debounce((e: Event) => {
            if (this.data.contentOpen) {
                if (putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
                    this.moveContentAbove()
                } else {
                    this.moveContentBelow()
                }
            }
        }), false)
    }

    // Add event callbacks after everthing has been created
    if (info.beforeOnChange) { this.beforeOnChange = info.beforeOnChange }
    if (info.onChange) { this.onChange = info.onChange }
    if (info.beforeOpen) { this.beforeOpen = info.beforeOpen }
    if (info.afterOpen) { this.afterOpen = info.afterOpen }
    if (info.beforeClose) { this.beforeClose = info.beforeClose }
    if (info.afterClose) { this.afterClose = info.afterClose }

    // If disabled lets call it
    if (!this.config.isEnabled) { this.disable() }
  }

  public validate(info: Constructor) {
    const select = (typeof info.select === 'string' ? document.querySelector(info.select) : info.select) as HTMLSelectElement
    if (!select) { throw new Error('Could not find select element') }
    if (select.tagName !== 'SELECT') { throw new Error('Element isnt of type select') }
    return select
  }

  public selected(): string | string[] {
    if (this.config.isMultiple) {
      const selected = this.data.getSelected() as Option[]
      const outputSelected: string[] = []
      for (const s of selected) {
        outputSelected.push(s.value as string)
      }
      return outputSelected
    } else {
      const selected = this.data.getSelected() as Option
      return (selected ? selected.value as string : '')
    }
  }

  // Sets value of the select, adds it to data and original select
  public set(value: string | string[], type: string = 'value', close: boolean = true, render: boolean = true) {
    if (this.config.isMultiple && !Array.isArray(value)) {
      this.data.addToSelected(value, type)
    } else {
      this.data.setSelected(value, type)
    }
    this.select.setValue()
    this.data.onDataChange() // Trigger on change callback
    this.render()

    if (close) { this.close() }
  }

  // setSelected is just mapped to the set method
  public setSelected(value: string | string[], type: string = 'value', close: boolean = true, render: boolean = true) {
    this.set(value, type, close, render)
  }

  public setData(data: dataArray) {
    // Validate data if passed in
    const isValid = validateData(data)
    if (!isValid) { console.error('Validation problem on: #' + this.select.element.id); return } // If data passed in is not valid DO NOT parse, set and render

    const newData = JSON.parse(JSON.stringify(data))
    const selected = this.data.getSelected()

    // If its an ajax type keep selected values
    if (this.config.isAjax && selected) {
      if (this.config.isMultiple) {
        const reverseSelected = (selected as Option[]).reverse()
        for (const r of reverseSelected) {
          newData.unshift(r)
        }
      } else {
        newData.unshift(this.data.getSelected())
        newData.unshift({ text: '', placeholder: true })
      }
    }

    this.select.create(newData)
    this.data.parseSelectData()
    this.data.setSelectedFromSelect()
  }

  // addData will append to the current data set
  public addData(data: Option) {
    // Validate data if passed in
    const isValid = validateData([data])
    if (!isValid) { console.error('Validation problem on: #' + this.select.element.id); return } // If data passed in is not valid DO NOT parse, set and render

    this.data.add(this.data.newOption(data))
    this.select.create(this.data.data)
    this.data.parseSelectData()
    this.data.setSelectedFromSelect()
    this.render()
  }

  // Open content section
  public open(): void {
    // Dont open if disabled
    if (!this.config.isEnabled) { return }

    // Dont do anything if the content is already open
    if (this.data.contentOpen) { return }

    // Run beforeOpen callback
    if (this.beforeOpen) { this.beforeOpen() }

    if (this.config.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.plus.classList.add('ss-cross')
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-down')
      this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-up')
    }
    (this.slim as any)[(this.config.isMultiple ? 'multiSelected' : 'singleSelected')].container.classList.add((this.data.contentPosition === 'above' ? this.config.openAbove : this.config.openBelow))

    if (this.config.addToBody) {
      // move the content in to the right location
      const containerRect = this.slim.container.getBoundingClientRect()
      this.slim.content.style.top = (containerRect.top + containerRect.height + window.scrollY) + 'px'
      this.slim.content.style.left = (containerRect.left + window.scrollX) + 'px'
      this.slim.content.style.width = containerRect.width + 'px'
    }
    this.slim.content.classList.add(this.config.open)

    // Check showContent to see if they want to specifically show in a certain direction
    if (this.config.showContent.toLowerCase() === 'up') {
      this.moveContentAbove()
    } else if (this.config.showContent.toLowerCase() === 'down') {
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
    if (!this.config.isMultiple) {
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
      if (this.config.searchFocus) {
        this.slim.search.input.focus()
      }

      // Run afterOpen callback
      if (this.afterOpen) {
        this.afterOpen()
      }
    }, this.config.timeoutDelay)
  }

  // Close content section
  public close(): void {
    // Dont do anything if the content is already closed
    if (!this.data.contentOpen) { return }

    // Run beforeClose calback
    if (this.beforeClose) { this.beforeClose() }

    // this.slim.search.input.blur() // Removed due to safari quirk
    if (this.config.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.remove(this.config.openAbove)
      this.slim.multiSelected.container.classList.remove(this.config.openBelow)
      this.slim.multiSelected.plus.classList.remove('ss-cross')
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.remove(this.config.openAbove)
      this.slim.singleSelected.container.classList.remove(this.config.openBelow)
      this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-down')
      this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-up')
    }
    this.slim.content.classList.remove(this.config.open)
    this.data.contentOpen = false

    this.search('') // Clear search

    // Reset the content below
    setTimeout(() => {
      this.slim.content.removeAttribute('style')
      this.data.contentPosition = 'below'

      if (this.config.isMultiple && this.slim.multiSelected) {
        this.slim.multiSelected.container.classList.remove(this.config.openAbove)
        this.slim.multiSelected.container.classList.remove(this.config.openBelow)
      } else if (this.slim.singleSelected) {
        this.slim.singleSelected.container.classList.remove(this.config.openAbove)
        this.slim.singleSelected.container.classList.remove(this.config.openBelow)
      }

      // After content is closed lets blur on the input field
      this.slim.search.input.blur()

      // Run afterClose callback
      if (this.afterClose) { this.afterClose() }
    }, this.config.timeoutDelay)
  }

  public moveContentAbove(): void {
    let selectHeight: number = 0
    if (this.config.isMultiple && this.slim.multiSelected) {
      selectHeight = this.slim.multiSelected.container.offsetHeight
    } else if (this.slim.singleSelected) {
      selectHeight = this.slim.singleSelected.container.offsetHeight
    }
    const contentHeight = this.slim.content.offsetHeight
    const height = selectHeight + contentHeight - 1
    this.slim.content.style.margin = '-' + height + 'px 0 0 0'
    this.slim.content.style.height = (height - selectHeight + 1) + 'px'
    this.slim.content.style.transformOrigin = 'center bottom'
    this.data.contentPosition = 'above'

    if (this.config.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.remove(this.config.openBelow)
      this.slim.multiSelected.container.classList.add(this.config.openAbove)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.remove(this.config.openBelow)
      this.slim.singleSelected.container.classList.add(this.config.openAbove)
    }
  }

  public moveContentBelow(): void {
    this.data.contentPosition = 'below'

    if (this.config.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.remove(this.config.openAbove)
      this.slim.multiSelected.container.classList.add(this.config.openBelow)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.remove(this.config.openAbove)
      this.slim.singleSelected.container.classList.add(this.config.openBelow)
    }
  }

  // Set to enabled, remove disabled classes and removed disabled from original select
  public enable(): void {
    this.config.isEnabled = true
    if (this.config.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.remove(this.config.disabled)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.remove(this.config.disabled)
    }

    // Disable original select but dont trigger observer
    this.select.triggerMutationObserver = false
    this.select.element.disabled = false
    this.slim.search.input.disabled = false
    this.select.triggerMutationObserver = true
  }

  // Set to disabled, add disabled classes and add disabled to original select
  public disable(): void {
    this.config.isEnabled = false
    if (this.config.isMultiple && this.slim.multiSelected) {
      this.slim.multiSelected.container.classList.add(this.config.disabled)
    } else if (this.slim.singleSelected) {
      this.slim.singleSelected.container.classList.add(this.config.disabled)
    }

    // Enable original select but dont trigger observer
    this.select.triggerMutationObserver = false
    this.select.element.disabled = true
    this.slim.search.input.disabled = true
    this.select.triggerMutationObserver = true
  }

  // Take in string value and search current options
  public search(value: string): void {
    // Only filter data and rerender if value has changed
    if (this.data.searchValue !== value) {
      this.slim.search.input.value = value
      if (this.config.isAjax) {
        const master = this
        this.config.isSearching = true
        this.render()

        // If ajax call it
        if (this.ajax) {
          this.ajax(value, (info: any) => {
            // Only process if return callback is not false
            master.config.isSearching = false
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
  }

  public setSearchText(text: string): void {
    this.config.searchText = text
  }

  public render(): void {
    if (this.config.isMultiple) {
      this.slim.values()
    } else {
      this.slim.placeholder()
      this.slim.deselect()
    }
    this.slim.options()
  }

  // Display original select again and remove slim
  public destroy(id: string | null = null): void {
    const slim = (id ? document.querySelector('.' + id + '.ss-main') : this.slim.container)
    const select = (id ? document.querySelector(`[data-ssid=${id}]`) as HTMLSelectElement : this.select.element)
    // If there is no slim dont do anything
    if (!slim || !select) { return }

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
    if (this.config.addToBody) {
      const slimContent = (id ? document.querySelector('.' + id + '.ss-content') : this.slim.content)
      if (!slimContent) { return }
      document.body.removeChild(slimContent)
    }
  }
}
