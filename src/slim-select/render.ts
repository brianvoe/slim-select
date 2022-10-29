import Settings from './settings'
import Store, { DataArray, Optgroup, Option, OptionOptional } from './store'

export interface Callbacks {
  open: () => void
  close: () => void
  addable?: (value: string) => OptionOptional | string
  addSelected: (value: string) => void
  setSelected: (value: string[]) => void
  addOption: (option: Option) => void
  search: (search: string) => void
  fetch?: (value: string, func: (info: any) => void) => void
  beforeChange?: (newVal: DataArray, oldVal: DataArray) => boolean
  afterChange?: (newVal: DataArray) => void
  beforeDelete?: (neVal: DataArray, oldVal: DataArray) => boolean
}

export interface Single {
  container: HTMLDivElement
  placeholder: HTMLSpanElement
  deselect: HTMLSpanElement
  arrowIcon: {
    container: HTMLSpanElement
    arrow: HTMLSpanElement
  }
}

export interface Multiple {
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
  public single: Single | null = null
  public multiple: Multiple | null = null
  public content: HTMLDivElement
  public search: Search
  public list: HTMLDivElement

  // Classes
  public classes = {
    main: 'ss-main',
    singleSelected: 'ss-single',
    multiSelected: 'ss-multi',
    placeholder: 'ss-placeholder',
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

    // Setup single or multiple
    this.single = null
    this.multiple = null
    if (this.settings.isMultiple) {
      this.multiple = this.multipleDiv()
      this.main.appendChild(this.multiple.container)
    } else {
      this.single = this.singleDiv()
      this.main.appendChild(this.single.container)
    }

    // Render the placeholder
    this.setSelected()

    // Add content to body
    this.content.classList.add(this.settings.id)
    document.body.appendChild(this.content)

    // Add search and list to content
    this.content.appendChild(this.search.container)
    this.content.appendChild(this.list)
  }

  // Remove disabled classes
  public enable(): void {
    // Set search input to "enabled"
    this.search.input.disabled = false

    // Remove disabled class
    if (this.settings.isMultiple && this.multiple) {
      this.multiple.container.classList.remove(this.classes.disabled)
    } else if (this.single) {
      this.single.container.classList.remove(this.classes.disabled)
    }
  }

  // Set disabled classes
  public disable(): void {
    // Set search input to disabled
    this.search.input.disabled = true

    // Add disabled class
    if (this.settings.isMultiple && this.multiple) {
      this.multiple.container.classList.add(this.classes.disabled)
    } else if (this.single) {
      this.single.container.classList.add(this.classes.disabled)
    }
  }

  public open(): void {
    if (this.settings.isMultiple && this.multiple) {
      this.multiple.plus.classList.add('ss-cross')
    } else if (this.single) {
      this.single.arrowIcon.arrow.classList.remove('arrow-down')
      this.single.arrowIcon.arrow.classList.add('arrow-up')
    }

    // Add class to single/multiple container
    this[this.settings.isMultiple ? 'multiple' : 'single']!.container.classList.add(
      this.settings.contentPosition === 'up' ? this.classes.openAbove : this.classes.openBelow,
    )

    // move the content in to the right location
    const containerRect = this.main.getBoundingClientRect()
    this.content.style.top = containerRect.top + containerRect.height + window.scrollY + 'px'
    this.content.style.left = containerRect.left + window.scrollX + 'px'
    this.content.style.width = containerRect.width + 'px'
    this.content.classList.add(this.classes.open)

    // Render the options
    this.renderOptions(this.store.getData())

    // Check showContent to see if they want to specifically show in a certain direction
    if (this.settings.contentPosition.toLowerCase() === 'up') {
      this.moveContentAbove()
    } else if (this.settings.contentPosition.toLowerCase() === 'down') {
      this.moveContentBelow()
    } else {
      // Auto identify where to put it
      if (this.putContent(this.content, this.settings.isOpen) === 'up') {
        this.moveContentAbove()
      } else {
        this.moveContentBelow()
      }
    }

    // Move to last selected option
    const selectedOptions = this.store.getSelectedOptions()
    if (selectedOptions.length) {
      const selectedId = selectedOptions[selectedOptions.length - 1].id
      const selectedOption = this.list.querySelector('[data-id="' + selectedId + '"]') as HTMLElement
      if (selectedOption) {
        this.ensureElementInView(this.list, selectedOption)
      }
    }
  }

  public close(): void {
    if (this.settings.isMultiple && this.multiple) {
      this.multiple.container.classList.remove(this.classes.openAbove)
      this.multiple.container.classList.remove(this.classes.openBelow)
      this.multiple.plus.classList.remove('ss-cross')
    } else if (this.single) {
      this.single.container.classList.remove(this.classes.openAbove)
      this.single.container.classList.remove(this.classes.openBelow)
      this.single.arrowIcon.arrow.classList.add('arrow-down')
      this.single.arrowIcon.arrow.classList.remove('arrow-up')
    }
    this.content.classList.remove(this.classes.open)

    // Clear out the style after closing animation
    setTimeout(() => {
      this.content.removeAttribute('style')
    }, 200)
  }

  public setSelected(): void {
    if (this.settings.isMultiple && this.multiple) {
      // Multiple needs to just update the values display
      this.multipleValues()
    }

    if (!this.settings.isMultiple && this.single) {
      this.singlePlaceholder()
    }

    // Render the options
    this.renderOptions(this.store.getData())
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

  public singleDiv(): Single {
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
    deselect.onclick = (e: Event) => {
      e.stopPropagation()

      // Dont do anything if disabled
      if (!this.settings.isEnabled) {
        return
      }

      this.callbacks.setSelected([''])
    }
    container.appendChild(deselect)

    // If allow deselect is false, hide the deselect button
    if (!this.settings.allowDeselect) {
      deselect.style.display = 'none'
    }

    // Arrow
    const arrowContainer: HTMLSpanElement = document.createElement('span')
    arrowContainer.classList.add(this.classes.arrow)
    const arrowIcon = document.createElement('span')
    arrowIcon.classList.add('arrow-down')
    arrowContainer.appendChild(arrowIcon)
    container.appendChild(arrowContainer)

    // Add onclick for container selector div
    container.onclick = (e: Event) => {
      e.stopPropagation()

      // Dont do anything if disabled
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

  // Based upon current selection set placeholder text
  public singlePlaceholder(): void {
    if (!this.single) {
      return
    }

    const selected = this.store.getSelectedOptions()
    const selectedSingle = selected.length > 0 ? selected[0] : null

    // If nothing is seleected use settings placeholder text
    if (!selectedSingle) {
      this.single.placeholder.innerHTML = this.settings.placeholderText
      return
    }

    // If there is a selected value, set the text to the placeholder
    this.single.placeholder.innerHTML =
      selectedSingle.html && !this.settings.valuesUseText ? selectedSingle.html : selectedSingle.text
  }

  // Based upon current selection/settings hide/show deselect
  public singleDeselect(): void {
    if (!this.single) {
      return
    }

    if (!this.settings.allowDeselect) {
      this.single.deselect.classList.add('ss-hide')
      return
    }

    // If allowDeselect is false or selected value is empty just hide deslect
    if (!this.settings.allowDeselect || !this.store.getSelectedOptions().length) {
      this.single.deselect.classList.add('ss-hide')
    } else {
      this.single.deselect.classList.remove('ss-hide')
    }
  }

  public multipleDiv(): Multiple {
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
      e.stopPropagation()

      // If its open close it
      if (this.settings.isOpen) {
        this.callbacks.close()
      }
    }
    add.appendChild(plus)
    container.appendChild(add)

    container.onclick = (e: Event) => {
      if (!this.settings.isEnabled) {
        return
      }

      // Open only if you are not clicking on x text
      const target = e.target as HTMLDivElement
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

  // Get selected values and append to multiSelected values container
  // and remove those who shouldnt exist
  public multipleValues(): void {
    if (!this.multiple) {
      return
    }

    // Get various peices of data
    let currentNodes = this.multiple.values.childNodes as NodeListOf<HTMLDivElement>
    let selectedOptions = this.store.getSelectedOptions()
    let selectedIDs = this.store.getSelectedIDs()

    // If selectedOptions is empty set placeholder
    if (selectedOptions.length === 0) {
      const placeholder = document.createElement('span')
      placeholder.classList.add(this.classes.placeholder)
      placeholder.innerHTML = this.settings.placeholderText
      this.multiple.values.innerHTML = placeholder.outerHTML
      return
    } else {
      // If there is a placeholder, remove it
      const placeholder = this.multiple.values.querySelector('.' + this.classes.placeholder)
      if (placeholder) {
        placeholder.remove()
      }
    }

    // Loop through currentNodes and only include ones that are not in selectedIDs
    let removeNodes: HTMLDivElement[] = []
    for (let i = 0; i < currentNodes.length; i++) {
      const node = currentNodes[i]
      const id = node.getAttribute('data-id')
      if (id && selectedIDs.indexOf(id) === -1) {
        removeNodes.push(node)
      }
    }

    // Loop through and remove
    for (const n of removeNodes) {
      n.classList.add('ss-out')
      setTimeout(() => {
        if (this.multiple) {
          this.multiple.values.removeChild(n)
        }
      }, 100)
    }

    // Add values that dont currently exist
    currentNodes = this.multiple.values.childNodes as NodeListOf<HTMLDivElement>
    for (let d = 0; d < selectedOptions.length; d++) {
      let shouldAdd = true
      for (let i = 0; i < currentNodes.length; i++) {
        if (selectedOptions[d].id === String(currentNodes[i].dataset.id)) {
          shouldAdd = false
        }
      }

      // If shouldAdd, insertAdjacentElement it to the values container in the order of the selectedOptions
      if (shouldAdd) {
        if (currentNodes.length === 0) {
          this.multiple.values.appendChild(this.multipleValueDiv(selectedOptions[d]))
        } else if (d === 0) {
          this.multiple.values.insertBefore(this.multipleValueDiv(selectedOptions[d]), currentNodes[d])
        } else {
          currentNodes[d - 1].insertAdjacentElement('afterend', this.multipleValueDiv(selectedOptions[d]))
        }
      }
    }
  }

  public multipleValueDiv(option: Option): HTMLDivElement {
    const value = document.createElement('div')
    value.classList.add(this.classes.value)
    value.dataset.id = option.id

    const text = document.createElement('span')
    text.classList.add(this.classes.valueText)
    text.innerHTML = option.html && this.settings.valuesUseText !== true ? option.html : option.text
    value.appendChild(text)

    // Only add deletion if the option is not mandatory
    if (!option.mandatory) {
      const deleteSpan = document.createElement('span')
      deleteSpan.classList.add(this.classes.valueDelete)
      deleteSpan.innerHTML = this.settings.deselectLabel
      deleteSpan.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        // By Default we will delete
        let shouldDelete = true
        const before = this.store.getSelected()
        const after = this.store.getSelected().filter((o) => {
          return o.id !== option.id
        })

        // If there is a beforeDeselect function run it
        if (this.callbacks.beforeDelete) {
          shouldDelete = this.callbacks.beforeDelete(before, after) === true
        }

        if (shouldDelete) {
          // Loop through after and append values to a variable called selected
          let selectedValues: string[] = []
          for (const o of after) {
            if (o instanceof Optgroup) {
              for (const c of o.options) {
                selectedValues.push(c.value)
              }
            }

            if (o instanceof Option) {
              selectedValues.push(o.value)
            }
          }
          this.callbacks.setSelected(selectedValues)
        }
      }

      value.appendChild(deleteSpan)
    }

    return value
  }

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
        if (this.callbacks.addable && e.ctrlKey) {
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
      // If we are already open, do nothing
      if (this.settings.isOpen) {
        return
      }

      this.callbacks.open()
    }
    container.appendChild(input)

    // If addable is enabled, add the addable div
    if (this.callbacks.addable) {
      addable.classList.add(this.classes.addable)
      addable.innerHTML = '+'
      addable.onclick = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        if (!this.callbacks.addable) {
          return
        }

        const inputValue = this.search.input.value.trim()
        if (inputValue === '') {
          this.search.input.focus()
          return
        }

        // Call addable callback
        const addableValue = this.callbacks.addable(inputValue)

        // If the addableValue is a string, we will add it as a new option
        // Otherwise we will assume it is an option object
        if (typeof addableValue === 'string') {
          this.callbacks.addOption(
            new Option({
              text: addableValue,
              value: addableValue,
            }),
          )
        } else {
          this.callbacks.addOption(new Option(addableValue))
        }

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

      // Add the addable to the search return
      searchReturn.addable = addable
    }

    return searchReturn
  }

  public focusSearchInput(focus: boolean) {
    if (focus) {
      this.search.input.focus()
    } else {
      this.search.input.blur()
    }
  }

  public highlight(str: string, search: any, className: string) {
    // the completed string will be itself if already set, otherwise, the string that was passed in
    let completedString: any = str
    const regex = new RegExp('(' + search.trim() + ')(?![^<]*>[^<>]*</)', 'i')

    // If the regex doesn't match the string just exit
    if (!str.match(regex)) {
      return str
    }

    // Otherwise, get to highlighting
    const matchStartPosition = (str.match(regex) as any).index
    const matchEndPosition = matchStartPosition + (str.match(regex) as any)[0].toString().length
    const originalTextFoundByRegex = str.substring(matchStartPosition, matchEndPosition)
    completedString = completedString.replace(regex, `<mark class="${className}">${originalTextFoundByRegex}</mark>`)
    return completedString
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
      this.ensureElementInView(this.list, prev)
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
      this.ensureElementInView(this.list, next)
    }
  }

  // Create main container that options will reside
  public listDiv(): HTMLDivElement {
    const list = document.createElement('div')
    list.classList.add(this.classes.list)
    list.setAttribute('role', 'listbox')

    return list
  }

  // Take in data and add options to
  public renderOptions(data: DataArray): void {
    // Clear out innerHtml
    this.list.innerHTML = ''

    // If ajax and isSearching
    if (this.callbacks.fetch && this.settings.isSearching) {
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
      }

      if (d instanceof Option) {
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
    optionEl.setAttribute('role', 'option') // WCAG attribute
    if (option.class) {
      option.class.split(' ').forEach((dataClass: string) => {
        optionEl.classList.add(dataClass)
      })
    }

    // Add style to div element
    if (option.style) {
      optionEl.style.cssText = option.style
    }

    const selectedOptions = this.store.getSelectedOptions()

    optionEl.dataset.id = option.id

    // Set option content
    if (this.settings.searchHighlight && option.html && this.search.input.value.trim() !== '') {
      optionEl.innerHTML = this.highlight(option.html, this.search.input.value, this.classes.searchHighlighter)
    } else if (option.html && option.html !== '') {
      optionEl.innerHTML = option.html
    } else {
      optionEl.textContent = option.text
    }

    // Set title attribute
    if (this.settings.showOptionTooltips && optionEl.textContent) {
      optionEl.setAttribute('title', optionEl.textContent)
    }

    // If allowed to deselect, null onclick and add disabled
    if (option.selected || (option.disabled && !this.settings.allowDeselectOption)) {
      optionEl.classList.add(this.classes.disabled)
    }

    // If option is selected and hideSelectedOption is true, hide it
    if (option.selected && this.settings.hideSelectedOption) {
      optionEl.classList.add(this.classes.hide)
    }

    // If option is selected
    if (option.selected) {
      optionEl.classList.add(this.classes.optionSelected)
    } else {
      optionEl.classList.remove(this.classes.optionSelected)
    }

    // Add click event listener
    optionEl.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const element = e.target as HTMLDivElement
      const elementID = String(element.dataset.id)

      // If the option is disabled or selected and the user isnt allowed to deselect
      if (option.disabled || (option.selected && !this.settings.allowDeselectOption)) {
        return
      }

      // Check limit and do nothing if limit is reached
      if (
        this.settings.isMultiple &&
        Array.isArray(selectedOptions) &&
        this.settings.maxSelected <= selectedOptions.length
      ) {
        return
      }

      // Setup
      let shouldUpdate = false
      const before = this.store.getSelectedOptions()
      let after = [] as Option[]

      // If multiple
      if (this.settings.isMultiple) {
        if (option.selected) {
          // If selected after would remove
          after = before.filter((o: Option) => o.id !== elementID)
        } else {
          // If not selected after would add
          after = before.concat(option)
        }
      }

      // If single
      if (!this.settings.isMultiple) {
        after = [option]
      }

      // If no beforeOnChange is set automatically update at end
      if (!this.callbacks.beforeChange) {
        shouldUpdate = true
      }

      if (this.callbacks.beforeChange) {
        // Check if beforeChange returns true
        if (this.callbacks.beforeChange(after, before) === true) {
          shouldUpdate = true
        }
      }

      if (shouldUpdate) {
        // Get values from after and set as selected
        this.callbacks.setSelected(after.map((o: Option) => o.value))

        // callback that the value has changed
        if (this.callbacks.afterChange) {
          this.callbacks.afterChange(after)
        }
      }
    })

    return optionEl
  }

  public moveContentAbove(): void {
    let selectHeight: number = 0
    if (this.settings.isMultiple && this.multiple) {
      selectHeight = this.multiple.container.offsetHeight
    } else if (this.single) {
      selectHeight = this.single.container.offsetHeight
    }
    const contentHeight = this.content.offsetHeight
    const height = selectHeight + contentHeight - 1
    this.content.style.margin = '-' + height + 'px 0 0 0'
    this.content.style.height = height - selectHeight + 1 + 'px'
    this.content.style.transformOrigin = 'center bottom'

    if (this.settings.isMultiple && this.multiple) {
      this.multiple.container.classList.remove(this.classes.openBelow)
      this.multiple.container.classList.add(this.classes.openAbove)
    } else if (this.single) {
      this.single.container.classList.remove(this.classes.openBelow)
      this.single.container.classList.add(this.classes.openAbove)
    }
  }

  public moveContentBelow(): void {
    if (this.settings.isMultiple && this.multiple) {
      this.multiple.container.classList.remove(this.classes.openAbove)
      this.multiple.container.classList.add(this.classes.openBelow)
    } else if (this.single) {
      this.single.container.classList.remove(this.classes.openAbove)
      this.single.container.classList.add(this.classes.openBelow)
    }
  }

  public ensureElementInView(container: HTMLElement, element: HTMLElement): void {
    // Determine container top and bottom
    const cTop = container.scrollTop + container.offsetTop // Make sure to have offsetTop
    const cBottom = cTop + container.clientHeight

    // Determine element top and bottom
    const eTop = element.offsetTop
    const eBottom = eTop + element.clientHeight

    // Check if out of view
    if (eTop < cTop) {
      container.scrollTop -= cTop - eTop
    } else if (eBottom > cBottom) {
      container.scrollTop += eBottom - cBottom
    }
  }

  public putContent(el: HTMLElement, isOpen: boolean): 'up' | 'down' {
    const height = el.offsetHeight
    const rect = el.getBoundingClientRect()
    const elemTop = isOpen ? rect.top : rect.top - height
    const elemBottom = isOpen ? rect.bottom : rect.bottom + height

    if (elemTop <= 0) {
      return 'down'
    }
    if (elemBottom >= window.innerHeight) {
      return 'up'
    }

    // default to current position if we cant determine a perfect one
    return 'down'
  }
}
