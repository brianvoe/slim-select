import { ensureElementInView, highlight, isValueInArrayOfObjects } from './helper'
import Settings from './settings'
import Store, { DataArray, Optgroup, Option } from './store'

export interface Callbacks {
  open: () => void
  close: () => void
  addSelected: (value: string) => void
  setSelected: (value: string[]) => void
  addOption: (option: Option) => void
  search: (search: string) => void
  beforeChange?: (before: DataArray, after: DataArray) => boolean
  beforeDelete?: (before: DataArray, after: DataArray) => boolean
  deleteByID: (id: string) => void
}

export interface SingleSelected {
  container: HTMLDivElement
  placeholder: HTMLSpanElement
  deselect: HTMLSpanElement
  arrowIcon: {
    container: HTMLSpanElement
    arrow: HTMLSpanElement
  }
}

export interface MultiSelected {
  container: HTMLDivElement
  values: HTMLDivElement
  add: HTMLDivElement
  plus: HTMLSpanElement
}

export interface Search {
  container: HTMLDivElement
  input: HTMLInputElement
  addable?: HTMLDivElement
}

export default class Slim {
  public settings: Settings
  public store: Store
  public callbacks: Callbacks

  // Elements
  public main: HTMLDivElement
  public singleSelected: SingleSelected | null = null
  public multiSelected: MultiSelected | null = null
  public content: HTMLDivElement
  public search: Search
  public list: HTMLDivElement

  // Classes
  public classes = {
    main: 'ss-main',
    singleSelected: 'ss-single-selected',
    multiSelected: 'ss-multi-selected',
    arrow: 'ss-arrow',
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

  constructor(settings: Required<Settings>, store: Store, callbacks: Callbacks) {
    this.store = store
    this.settings = settings
    this.callbacks = callbacks

    this.main = this.mainDiv()
    this.content = this.contentDiv()
    this.search = this.searchDiv()
    this.list = this.listDiv()
    this.options()

    this.singleSelected = null
    this.multiSelected = null
    if (this.settings.isMultiple) {
      this.multiSelected = this.multiSelectedDiv()
      this.main.appendChild(this.multiSelected.container)
    } else {
      this.singleSelected = this.singleSelectedDiv()
      this.main.appendChild(this.singleSelected.container)
    }
    if (this.settings.addToBody) {
      // add the id to the content as a class as well
      // this is important on touch devices as the close method is
      // triggered when clicks on the document body occur
      this.content.classList.add(this.main.id)
      document.body.appendChild(this.content)
    } else {
      this.main.appendChild(this.content)
    }
    this.content.appendChild(this.search.container)
    this.content.appendChild(this.list)
  }

  public mainDiv(): HTMLDivElement {
    // Create main container
    const container = document.createElement('div') as HTMLDivElement

    // Add style and classes
    container.style.cssText = this.settings.style || ''

    // Clear out classlist
    container.className = ''

    // Loop through config class and add
    container.classList.add(this.settings.id)
    container.classList.add(this.classes.main)
    if (this.settings.class) {
      for (const c of this.settings.class) {
        if (c.trim() !== '') {
          container.classList.add(c.trim())
        }
      }
    }

    return container
  }

  public singleSelectedDiv(): SingleSelected {
    const container: HTMLDivElement = document.createElement('div')
    container.classList.add(this.classes.singleSelected)

    // Placeholder text
    const placeholder: HTMLSpanElement = document.createElement('span')
    placeholder.classList.add('placeholder')
    container.appendChild(placeholder)

    // Deselect
    const deselect = document.createElement('span')
    deselect.innerHTML = this.settings.deselectLabel
    deselect.classList.add('ss-deselect')
    deselect.onclick = (e) => {
      e.stopPropagation()

      // Dont do anything if disabled
      if (!this.settings.isEnabled) {
        return
      }

      this.callbacks.setSelected([''])
    }
    container.appendChild(deselect)

    // Arrow
    const arrowContainer: HTMLSpanElement = document.createElement('span')
    arrowContainer.classList.add(this.classes.arrow)
    const arrowIcon = document.createElement('span')
    arrowIcon.classList.add('arrow-down')
    arrowContainer.appendChild(arrowIcon)
    container.appendChild(arrowContainer)

    // Add onclick for container selector div
    container.onclick = () => {
      if (!this.settings.isEnabled) {
        return
      }

      this.settings.isOpen ? this.callbacks.close() : this.callbacks.open()
    }

    return {
      container,
      placeholder,
      deselect,
      arrowIcon: {
        container: arrowContainer,
        arrow: arrowIcon,
      },
    }
  }

  public multiSelectedDiv(): MultiSelected {
    const container = document.createElement('div')
    container.classList.add(this.classes.multiSelected)

    const values = document.createElement('div')
    values.classList.add(this.classes.values)
    container.appendChild(values)

    const add = document.createElement('div')
    add.classList.add(this.classes.add)
    const plus = document.createElement('span')
    plus.classList.add(this.classes.plus)
    plus.onclick = (e) => {
      if (this.settings.isOpen) {
        this.callbacks.close()
        e.stopPropagation()
      }
    }
    add.appendChild(plus)
    container.appendChild(add)

    container.onclick = (e) => {
      if (!this.settings.isEnabled) {
        return
      }

      // Open only if you are not clicking on x text
      const target = e.target as Element
      if (!target.classList.contains(this.classes.valueDelete)) {
        this.settings.isOpen ? this.callbacks.close() : this.callbacks.open()
      }
    }

    return {
      container,
      values,
      add,
      plus,
    }
  }

  // Create content container
  public contentDiv(): HTMLDivElement {
    const container = document.createElement('div')
    container.classList.add(this.classes.content)
    return container
  }

  public searchDiv(): Search {
    const container = document.createElement('div')
    const input = document.createElement('input')
    const addable = document.createElement('div')
    container.classList.add(this.classes.search)

    // Setup search return object
    const searchReturn: Search = {
      container,
      input,
    }

    // We still want the search to be tabable but not shown
    if (!this.settings.showSearch) {
      container.classList.add(this.classes.hide)
      input.readOnly = true
    }

    input.type = 'search'
    input.placeholder = this.settings.searchPlaceholder
    input.tabIndex = 0
    input.setAttribute('aria-label', this.settings.searchPlaceholder)
    input.setAttribute('autocapitalize', 'off')
    input.setAttribute('autocomplete', 'off')
    input.setAttribute('autocorrect', 'off')
    input.onclick = (e) => {
      setTimeout(() => {
        const target = e.target as HTMLInputElement
        if (target.value === '') {
          this.callbacks.search('')
        }
      }, 10)
    }
    input.onkeydown = (e) => {
      if (e.key === 'ArrowUp') {
        if (this.settings.isOpen) {
          this.callbacks.open()
        }
        this.highlightUp()
        e.preventDefault()
      } else if (e.key === 'ArrowDown') {
        if (this.settings.isOpen) {
          this.callbacks.open()
        }
        this.highlightDown()
        e.preventDefault()
      } else if (e.key === 'Tab') {
        if (!this.settings.isOpen) {
          setTimeout(() => {
            this.callbacks.close()
          }, this.settings.timeoutDelay)
        } else {
          this.callbacks.close()
        }
      } else if (e.key === 'Enter') {
        e.preventDefault()
      }
    }
    input.onkeyup = (e) => {
      const target = e.target as HTMLInputElement
      if (e.key === 'Enter') {
        if (this.settings.isAddable && e.ctrlKey) {
          addable.click()
          e.preventDefault()
          e.stopPropagation()
          return
        }
        const highlighted = this.list.querySelector('.' + this.classes.highlighted) as HTMLDivElement
        if (highlighted) {
          highlighted.click()
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        // Cancel out to leave for onkeydown to handle
      } else if (e.key === 'Escape') {
        this.callbacks.close()
      } else {
        if (this.settings.showSearch && this.settings.isOpen) {
          this.callbacks.search(target.value)
        } else {
          input.value = ''
        }
      }
      e.preventDefault()
      e.stopPropagation()
    }
    input.onfocus = () => {
      this.callbacks.open()
    }
    container.appendChild(input)

    if (this.settings.isAddable) {
      addable.classList.add(this.classes.addable)
      addable.innerHTML = '+'
      addable.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const inputValue = this.search.input.value
        if (inputValue.trim() === '') {
          this.search.input.focus()
          return
        }

        // Call add option
        this.callbacks.addOption(new Option({ text: inputValue, value: inputValue }))

        // Add option to selected
        this.callbacks.setSelected([inputValue])

        // Clear search
        this.callbacks.search('')

        // Close it only if closeOnSelect = true
        if (this.settings.closeOnSelect) {
          setTimeout(() => {
            // Give it a little padding for a better looking animation
            this.callbacks.close()
          }, 100)
        }
      }
      container.appendChild(addable)

      searchReturn.addable = addable
    }

    return searchReturn
  }

  public highlightUp(): void {
    const highlighted = this.list.querySelector('.' + this.classes.highlighted) as HTMLDivElement
    let prev: HTMLDivElement | null = null
    if (highlighted) {
      prev = highlighted.previousSibling as HTMLDivElement
      while (prev !== null) {
        if (prev.classList.contains(this.classes.disabled)) {
          prev = prev.previousSibling as HTMLDivElement
          continue
        } else {
          break
        }
      }
    } else {
      const allOptions = this.list.querySelectorAll('.' + this.classes.option + ':not(.' + this.classes.disabled + ')')
      prev = allOptions[allOptions.length - 1] as HTMLDivElement
    }

    // Do not select if optgroup label
    if (prev && prev.classList.contains(this.classes.optgroupLabel)) {
      prev = null
    }

    // Check if parent is optgroup
    if (prev === null) {
      const parent = highlighted.parentNode as HTMLDivElement
      if (parent.classList.contains(this.classes.optgroup)) {
        if (parent.previousSibling) {
          const prevNodes = (parent.previousSibling as HTMLDivElement).querySelectorAll(
            '.' + this.classes.option + ':not(.' + this.classes.disabled + ')',
          )
          if (prevNodes.length) {
            prev = prevNodes[prevNodes.length - 1] as HTMLDivElement
          }
        }
      }
    }

    // If previous element exists highlight it
    if (prev) {
      if (highlighted) {
        highlighted.classList.remove(this.classes.highlighted)
      }
      prev.classList.add(this.classes.highlighted)
      ensureElementInView(this.list, prev)
    }
  }

  public highlightDown(): void {
    const highlighted = this.list.querySelector('.' + this.classes.highlighted) as HTMLDivElement
    let next = null

    if (highlighted) {
      next = highlighted.nextSibling as HTMLDivElement
      while (next !== null) {
        if (next.classList.contains(this.classes.disabled)) {
          next = next.nextSibling as HTMLDivElement
          continue
        } else {
          break
        }
      }
    } else {
      next = this.list.querySelector(
        '.' + this.classes.option + ':not(.' + this.classes.disabled + ')',
      ) as HTMLDivElement
    }

    // Check if parent is optgroup
    if (next === null && highlighted !== null) {
      const parent = highlighted.parentNode as HTMLDivElement
      if (parent.classList.contains(this.classes.optgroup)) {
        if (parent.nextSibling) {
          const sibling = parent.nextSibling as HTMLDivElement
          next = sibling.querySelector(
            '.' + this.classes.option + ':not(.' + this.classes.disabled + ')',
          ) as HTMLDivElement
        }
      }
    }

    // If previous element exists highlight it
    if (next) {
      if (highlighted) {
        highlighted.classList.remove(this.classes.highlighted)
      }
      next.classList.add(this.classes.highlighted)
      ensureElementInView(this.list, next)
    }
  }

  // Create main container that options will reside
  public listDiv(): HTMLDivElement {
    const list = document.createElement('div')
    list.classList.add(this.classes.list)
    list.setAttribute('role', 'listbox')

    return list
  }

  // Get selected values and append to multiSelected values container
  // and remove those who shouldnt exist
  public values(): void {
    if (!this.multiSelected) {
      return
    }
    let currentNodes = this.multiSelected.values.childNodes as any as HTMLDivElement[]
    let dataOptions = this.store.getDataOptions()
    let selectedIDs = this.store.getSelectedIDs()

    // Filter currentNodes to only include ones that are not in selectedIDs
    let removeNodes = currentNodes.filter((node) => {
      return selectedIDs.indexOf(String(node.dataset.id)) === -1
    })

    // Loop through and remove
    for (const n of removeNodes) {
      n.classList.add('ss-out')
      this.multiSelected.values.removeChild(n)
    }

    // Add values that dont currently exist
    currentNodes = this.multiSelected.values.childNodes as any as HTMLDivElement[]
    let exists = true
    for (let s = 0; s < dataOptions.length; s++) {
      exists = false
      for (const c of currentNodes) {
        if (dataOptions[s].id === String(c.dataset.id)) {
          exists = true
        }
      }

      if (!exists) {
        if (currentNodes.length === 0 || !HTMLElement.prototype.insertAdjacentElement) {
          this.multiSelected.values.appendChild(this.valueDiv(dataOptions[s]))
        } else if (s === 0) {
          this.multiSelected.values.insertBefore(this.valueDiv(dataOptions[s]), currentNodes[s] as any)
        } else {
          ;(currentNodes[s - 1] as any).insertAdjacentElement('afterend', this.valueDiv(dataOptions[s]))
        }
      }
    }

    // If there are no values set placeholder
    if (dataOptions.length === 0) {
      const placeholder = document.createElement('span')
      placeholder.classList.add(this.classes.disabled)
      placeholder.innerHTML = this.settings.placeholderText
      this.multiSelected.values.innerHTML = placeholder.outerHTML
    }
  }

  public valueDiv(option: Option): HTMLDivElement {
    const value = document.createElement('div')
    value.classList.add(this.classes.value)
    value.dataset.id = option.id

    const text = document.createElement('span')
    text.classList.add(this.classes.valueText)
    text.innerHTML = option.html && this.settings.valuesUseText !== true ? option.html : option.text
    value.appendChild(text)

    if (!option.mandatory) {
      const deleteSpan = document.createElement('span')
      deleteSpan.classList.add(this.classes.valueDelete)
      deleteSpan.innerHTML = this.settings.deselectLabel
      deleteSpan.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        // By Default we will delete
        let shouldDelete = true

        // If there is a beforeDeselect function run it
        // and determine
        if (this.callbacks.beforeDelete) {
          const before = this.store.getSelected()
          const after = this.store.getSelected().filter((o) => {
            return o.id !== option.id
          })

          shouldDelete = this.callbacks.beforeDelete(before, after) === true
        }

        if (shouldDelete) {
          this.callbacks.deleteByID(option.id)
        }
      }

      value.appendChild(deleteSpan)
    }

    return value
  }

  // Loop through data || filtered data and build options and append to list container
  public options(content: string = ''): void {
    const data = this.store.getData()

    // Clear out innerHtml
    this.list.innerHTML = ''

    // If content is being passed just use that text
    if (content !== '') {
      const searching = document.createElement('div')
      searching.classList.add(this.classes.option)
      searching.classList.add(this.classes.disabled)
      searching.innerHTML = content
      this.list.appendChild(searching)
      return
    }

    // If ajax and isSearching
    if (this.settings.isAjax && this.settings.isSearching) {
      const searching = document.createElement('div')
      searching.classList.add(this.classes.option)
      searching.classList.add(this.classes.disabled)
      searching.innerHTML = this.settings.searchingText
      this.list.appendChild(searching)
      return
    }

    // If no results show no results text
    if (data.length === 0) {
      const noResults = document.createElement('div')
      noResults.classList.add(this.classes.option)
      noResults.classList.add(this.classes.disabled)
      noResults.innerHTML = this.settings.searchText
      this.list.appendChild(noResults)
      return
    }

    // Append individual options to div container
    for (const d of data) {
      // Create optgroup
      if (d instanceof Optgroup) {
        const optgroupEl = document.createElement('div')
        optgroupEl.classList.add(this.classes.optgroup)

        // Create label
        const optgroupLabel = document.createElement('div')
        optgroupLabel.classList.add(this.classes.optgroupLabel)
        if (this.settings.selectByGroup && this.settings.isMultiple) {
          optgroupLabel.classList.add(this.classes.optgroupLabelSelectable)
        }
        optgroupLabel.innerHTML = d.label
        optgroupEl.appendChild(optgroupLabel)

        const options = d.options
        if (options) {
          for (const o of options) {
            optgroupEl.appendChild(this.option(o))
          }

          // Selecting all values by clicking the group label
          if (this.settings.selectByGroup && this.settings.isMultiple) {
            optgroupLabel.addEventListener('click', (e: MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()

              for (const childEl of optgroupEl.children as any as HTMLDivElement[]) {
                if (childEl.className.indexOf(this.classes.option) !== -1) {
                  childEl.click()
                }
              }
            })
          }
        }
        this.list.appendChild(optgroupEl)
      } else {
        this.list.appendChild(this.option(d as Option))
      }
    }
  }

  // Create single option
  public option(option: Option): HTMLDivElement {
    // Add hidden placeholder
    if (option.placeholder) {
      const placeholder = document.createElement('div')
      placeholder.classList.add(this.classes.option)
      placeholder.classList.add(this.classes.hide)
      return placeholder
    }

    const optionEl = document.createElement('div')

    // Add class to div element
    optionEl.classList.add(this.classes.option)
    // Add WCAG attribute
    optionEl.setAttribute('role', 'option')
    if (option.class) {
      option.class.split(' ').forEach((dataClass: string) => {
        optionEl.classList.add(dataClass)
      })
    }

    // Add style to div element
    if (option.style) {
      optionEl.style.cssText = option.style
    }

    const selected = this.store.getSelected()

    optionEl.dataset.id = option.id
    if (this.settings.searchHighlight && option.html && this.search.input.value.trim() !== '') {
      optionEl.innerHTML = highlight(option.html, this.search.input.value, this.classes.searchHighlighter)
    } else if (option.html) {
      optionEl.innerHTML = option.html
    }
    if (this.settings.showOptionTooltips && optionEl.textContent) {
      optionEl.setAttribute('title', optionEl.textContent)
    }
    optionEl.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const element = e.target as HTMLDivElement
      const elementID = element.dataset.id as string

      // If option is selected and is allow to be deselected
      if (option.selected && this.settings.allowDeselectOption) {
        let shouldUpdate = false

        // If no beforeOnChange is set automatically update at end
        if (!this.callbacks.beforeChange || !this.settings.isMultiple) {
          shouldUpdate = true
        }

        if (this.callbacks.beforeChange && this.settings.isMultiple) {
          const before = this.store.getSelectedOptions()
          const after = before.filter((option: Option) => {
            return option.id !== elementID
          })

          // Check if beforeChange returns true
          if (this.callbacks.beforeChange(before, after) === true) {
            shouldUpdate = true
          }
        }

        if (shouldUpdate) {
          this.callbacks.addSelected(elementID)
        }
      } else {
        // Check if option is disabled or is already selected, do nothing
        if (option.disabled || option.selected) {
          return
        }

        // Check if hit limit
        if (this.settings.limit && Array.isArray(selected) && this.settings.limit <= selected.length) {
          return
        }

        if (this.callbacks.beforeChange) {
          // Get the option that is being selected
          const clickedOption = this.store.getOptionByID(elementID) as Option
          clickedOption.selected = true

          const before = this.store.getSelectedOptions()
          const after = before.concat(clickedOption)

          // Check if beforeChange returns true
          if (this.callbacks.beforeChange(before, after) === true) {
            this.callbacks.addSelected(elementID)
          }
        } else {
          this.callbacks.addSelected(elementID)
        }
      }
    })

    const isSelected = selected && isValueInArrayOfObjects(selected, 'id', option.id as string)
    if (option.disabled || isSelected) {
      optionEl.onclick = null
      if (!this.settings.allowDeselectOption) {
        optionEl.classList.add(this.classes.disabled)
      }
      if (this.settings.hideSelectedOption) {
        optionEl.classList.add(this.classes.hide)
      }
    }

    if (isSelected) {
      optionEl.classList.add(this.classes.optionSelected)
    } else {
      optionEl.classList.remove(this.classes.optionSelected)
    }

    return optionEl
  }

  // Remove disabled classes
  public enable(): void {
    // Set search input to "enabled"
    this.search.input.disabled = false

    // Remove disabled class
    if (this.settings.isMultiple && this.multiSelected) {
      this.multiSelected.container.classList.remove(this.classes.disabled)
    } else if (this.singleSelected) {
      this.singleSelected.container.classList.remove(this.classes.disabled)
    }
  }

  // Set disabled classes
  public disable(): void {
    // Set search input to disabled
    this.search.input.disabled = true

    // Add disabled class
    if (this.settings.isMultiple && this.multiSelected) {
      this.multiSelected.container.classList.add(this.classes.disabled)
    } else if (this.singleSelected) {
      this.singleSelected.container.classList.add(this.classes.disabled)
    }
  }

  public moveContentAbove(): void {
    let selectHeight: number = 0
    if (this.settings.isMultiple && this.multiSelected) {
      selectHeight = this.multiSelected.container.offsetHeight
    } else if (this.singleSelected) {
      selectHeight = this.singleSelected.container.offsetHeight
    }
    const contentHeight = this.content.offsetHeight
    const height = selectHeight + contentHeight - 1
    this.content.style.margin = '-' + height + 'px 0 0 0'
    this.content.style.height = height - selectHeight + 1 + 'px'
    this.content.style.transformOrigin = 'center bottom'

    if (this.settings.isMultiple && this.multiSelected) {
      this.multiSelected.container.classList.remove(this.classes.openBelow)
      this.multiSelected.container.classList.add(this.classes.openAbove)
    } else if (this.singleSelected) {
      this.singleSelected.container.classList.remove(this.classes.openBelow)
      this.singleSelected.container.classList.add(this.classes.openAbove)
    }
  }

  public moveContentBelow(): void {
    if (this.settings.isMultiple && this.multiSelected) {
      this.multiSelected.container.classList.remove(this.classes.openAbove)
      this.multiSelected.container.classList.add(this.classes.openBelow)
    } else if (this.singleSelected) {
      this.singleSelected.container.classList.remove(this.classes.openAbove)
      this.singleSelected.container.classList.add(this.classes.openBelow)
    }
  }
}
