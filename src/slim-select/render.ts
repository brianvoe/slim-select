import Settings from './settings'
import Store, { Option } from './store'

export interface SlimFields {
  id: string
  style?: string
  class?: string[]
}

export interface Callbacks {
  open: () => void
  close: () => void
  setSelected: (value: string[]) => void
  addOption: (option: Option) => void
  search: (search: string) => void
  beforeOnChange?: (value: string[]) => boolean
}

export interface SingleSelected {
  main: HTMLDivElement
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
  public fields: SlimFields
  public store: Store
  public settings: Required<Settings>
  public callbacks: Callbacks

  // Elements
  public main: HTMLDivElement
  public singleSelected: SingleSelected | null = null
  public multiSelected: MultiSelected | null = null
  public content: HTMLDivElement
  public search: Search

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

  constructor(fields: SlimFields, store: Store, settings: Required<Settings>, callbacks: Callbacks) {
    this.fields = fields
    this.store = store
    this.settings = settings
    this.callbacks = callbacks

    this.main = this.mainDiv()
    this.content = this.contentDiv()
    this.search = this.searchDiv()
  }

  public render() {}

  public mainDiv(): HTMLDivElement {
    // Create main container
    const container = document.createElement('div') as HTMLDivElement

    // Add style and classes
    container.style.cssText = this.fields.style || ''

    // Clear out classlist
    container.className = ''

    // Loop through config class and add
    container.classList.add(this.fields.id)
    container.classList.add(this.classes.main)
    if (this.fields.class) {
      for (const c of this.fields.class) {
        if (c.trim() !== '') {
          container.classList.add(c.trim())
        }
      }
    }

    return container
  }

  public singleSelectedDiv(): SingleSelected {
    const main: HTMLDivElement = document.createElement('div')
    main.classList.add(this.classes.singleSelected)

    // Placeholder text
    const placeholder: HTMLSpanElement = document.createElement('span')
    placeholder.classList.add('placeholder')
    main.appendChild(placeholder)

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
    main.appendChild(deselect)

    // Arrow
    const arrowContainer: HTMLSpanElement = document.createElement('span')
    arrowContainer.classList.add(this.classes.arrow)
    const arrowIcon = document.createElement('span')
    arrowIcon.classList.add('arrow-down')
    arrowContainer.appendChild(arrowIcon)
    main.appendChild(arrowContainer)

    // Add onclick for main selector div
    main.onclick = () => {
      if (!this.settings.isEnabled) {
        return
      }

      this.settings.isOpen ? this.callbacks.close() : this.callbacks.open()
    }

    return {
      main,
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
        this.callbacks.open()
        this.highlightUp()
        e.preventDefault()
      } else if (e.key === 'ArrowDown') {
        this.callbacks.open()
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

  public valueDiv(optionObj: Option): HTMLDivElement {
    const value = document.createElement('div')
    value.classList.add(this.classes.value)
    value.dataset.id = optionObj.id

    const text = document.createElement('span')
    text.classList.add(this.classes.valueText)
    text.innerHTML = optionObj.innerHTML && this.settings.valuesUseText !== true ? optionObj.innerHTML : optionObj.text
    value.appendChild(text)

    if (!optionObj.mandatory) {
      const deleteSpan = document.createElement('span')
      deleteSpan.classList.add(this.classes.valueDelete)
      deleteSpan.innerHTML = this.settings.deselectLabel
      deleteSpan.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let shouldUpdate = false

        // If no beforeOnChange is set automatically update at end
        if (!this.callbacks.beforeOnChange) {
          shouldUpdate = true
        }

        if (this.callbacks.beforeOnChange) {
          const selected = this.store.getSelected() as Option
          const currentValues = JSON.parse(JSON.stringify(selected))

          // Remove from current selection
          for (let i = 0; i < currentValues.length; i++) {
            if (currentValues[i].id === optionObj.id) {
              currentValues.splice(i, 1)
            }
          }

          const beforeOnchange = this.callbacks.beforeOnChange(currentValues)
          if (beforeOnchange !== false) {
            shouldUpdate = true
          }
        }

        if (shouldUpdate) {
          this.main.data.removeFromSelected(optionObj.id as any, 'id')
          this.main.render()
          this.main.selectClass.setValue()
          this.main.data.onDataChange() // Trigger on change callback
        }
      }

      value.appendChild(deleteSpan)
    }

    return value
  }
}
