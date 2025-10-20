import { debounce } from './helpers'
import Settings from './settings'
import Store, { DataArray, Optgroup, Option, OptionOptional } from './store'
import CssClasses from './classes'

export interface Callbacks {
  open: () => void
  close: () => void
  addable?: (
    value: string
  ) => Promise<OptionOptional | string> | OptionOptional | string | false | undefined | null | Error
  setSelected: (value: string | string[], runAfterChange: boolean) => void
  addOption: (option: Option) => void
  search: (search: string) => void
  beforeChange?: (newVal: Option[], oldVal: Option[]) => boolean | void
  afterChange?: (newVal: Option[]) => void
}

export interface Main {
  main: HTMLDivElement
  values: HTMLDivElement
  deselect: {
    main: HTMLDivElement
    svg: SVGSVGElement
    path: SVGPathElement
  }
  arrow: {
    main: SVGSVGElement
    path: SVGPathElement
  }
}

export interface Content {
  main: HTMLDivElement
  search: Search
  list: HTMLDivElement
}

export interface Search {
  main: HTMLDivElement
  input: HTMLInputElement
  addable?: {
    main: HTMLDivElement
    svg: SVGSVGElement
    path: SVGPathElement
  }
}

export default class Render {
  public settings: Settings
  public store: Store
  public callbacks: Callbacks
  // Used to compute the range selection
  private lastSelectedOption: Option | null

  // Elements
  public main: Main
  public content: Content

  // Classes
  public classes: CssClasses

  constructor(settings: Required<Settings>, classes: Required<CssClasses>, store: Store, callbacks: Callbacks) {
    this.store = store
    this.settings = settings
    this.classes = classes
    this.callbacks = callbacks
    this.lastSelectedOption = null

    this.main = this.mainDiv()
    this.content = this.contentDiv()

    // Add classes and styles to main/content
    this.updateClassStyles()
    this.updateAriaAttributes()

    // Add content to the content location settings
    if (this.settings.contentLocation) {
      this.settings.contentLocation.appendChild(this.content.main)
    }
  }

  // Remove disabled classes
  public enable(): void {
    // Remove disabled class
    this.main.main.classList.remove(this.classes.disabled)
    this.main.main.setAttribute('aria-disabled', 'false')

    // Set search input to "enabled"
    this.content.search.input.disabled = false
  }

  // Set disabled classes
  public disable(): void {
    // Add disabled class
    this.main.main.classList.add(this.classes.disabled)
    this.main.main.setAttribute('aria-disabled', 'true')

    // Set search input to disabled
    this.content.search.input.disabled = true
  }

  public open(): void {
    this.main.arrow.path.setAttribute('d', this.classes.arrowOpen)
    this.main.main.setAttribute('aria-expanded', 'true')

    // Set direction class on both main and content (persists, never removed)
    const isAbove = this.settings.openPosition === 'up'
    const dirClass = isAbove ? this.classes.dirAbove : this.classes.dirBelow
    this.main.main.classList.add(dirClass)
    this.content.main.classList.add(dirClass)

    // Add open class to content to trigger open animation
    this.content.main.classList.add(this.classes.contentOpen)

    // Make search visible to screen readers when opened
    this.content.search.input.removeAttribute('aria-hidden')

    // move the content in to the right location
    this.moveContent()

    // Move to last selected option
    const selectedOptions = this.store.getSelectedOptions()
    if (selectedOptions.length) {
      const selectedId = selectedOptions[selectedOptions.length - 1].id
      const selectedOption = this.content.list.querySelector('[data-id="' + selectedId + '"]') as HTMLElement
      if (selectedOption) {
        this.ensureElementInView(this.content.list, selectedOption)
      }
    }
  }

  public close(): void {
    this.main.main.setAttribute('aria-expanded', 'false')
    this.main.arrow.path.setAttribute('d', this.classes.arrowClose)

    // Remove open class from content to trigger close animation
    // Direction class (dirAbove/dirBelow) persists to maintain correct transform-origin
    this.content.main.classList.remove(this.classes.contentOpen)

    // Hide search from screen readers when closed
    this.content.search.input.setAttribute('aria-hidden', 'true')

    // Clear active descendant when closed
    this.main.main.removeAttribute('aria-activedescendant')
  }

  public updateClassStyles(): void {
    // Clear all classes and styles
    this.main.main.className = ''
    this.main.main.removeAttribute('style')
    this.content.main.className = ''
    this.content.main.removeAttribute('style')

    // Make sure main/content has its base class
    this.main.main.classList.add(this.classes.main)
    this.content.main.classList.add(this.classes.content)

    // Add styles
    if (this.settings.style !== '') {
      this.main.main.style.cssText = this.settings.style
      this.content.main.style.cssText = this.settings.style
    }

    // Add classes
    if (this.settings.class.length) {
      for (const c of this.settings.class) {
        if (c.trim() !== '') {
          this.main.main.classList.add(c.trim())
          this.content.main.classList.add(c.trim())
        }
      }
    }

    // Misc classes
    // Add content position class
    if (this.settings.contentPosition === 'relative' || this.settings.contentPosition === 'fixed') {
      this.content.main.classList.add('ss-' + this.settings.contentPosition)
    }
  }

  public updateAriaAttributes() {
    const listboxId = this.content.list.id

    // Main combobox
    this.main.main.role = 'combobox'
    this.main.main.setAttribute('aria-haspopup', 'listbox')
    this.main.main.setAttribute('aria-controls', listboxId)
    this.main.main.setAttribute('aria-expanded', 'false')

    this.content.list.setAttribute('role', 'listbox')
    this.content.list.setAttribute('aria-label', this.settings.ariaLabel + ' listbox')

    // Add aria-multiselectable for multiple selects
    if (this.settings.isMultiple) {
      this.content.list.setAttribute('aria-multiselectable', 'true')
    }

    // Search input should also control the listbox
    this.content.search.input.setAttribute('aria-controls', listboxId)
  }

  public mainDiv(): Main {
    // Create main container
    const main = document.createElement('div')

    // Add id to data-id
    main.dataset.id = this.settings.id
    // main.id = this.settings.id+'-main' // Remove for now as it is not needed and add duplicate id errors

    // Add label
    main.setAttribute('aria-label', this.settings.ariaLabel)

    // Set tabable to allow tabbing to the element
    main.tabIndex = 0

    // Deal with keyboard events on the main div
    // This is to allow for normal selecting
    // when you may not have a search bar
    main.onkeydown = (e: KeyboardEvent): boolean => {
      // Convert above if else statemets to switch
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          this.callbacks.open()
          e.key === 'ArrowDown' ? this.highlight('down') : this.highlight('up')
          return false
        case 'Tab':
          this.callbacks.close()
          return true // Continue doing normal tabbing
        case 'Enter':
        case ' ':
          this.callbacks.open()
          const highlighted = this.content.list.querySelector('.' + this.classes.highlighted) as HTMLDivElement
          if (highlighted) {
            highlighted.click()
          }
          return false
        case 'Escape':
          this.callbacks.close()
          return false
      }

      // Check if they type a-z, A-Z and 0-9
      if (e.key.length === 1) {
        this.callbacks.open()
      }

      return true
    }

    // Add onclick for main div
    main.onclick = (e: Event): void => {
      // Dont do anything if disabled
      if (this.settings.disabled) {
        return
      }

      this.settings.isOpen ? this.callbacks.close() : this.callbacks.open()
    }

    // Add values
    const values = document.createElement('div')
    values.classList.add(this.classes.values)
    main.appendChild(values)

    // Add deselect
    const deselect = document.createElement('div')
    deselect.classList.add(this.classes.deselect)

    // Check if deselect is to be shown or not
    const selectedOptions = this.store?.getSelectedOptions()
    if (!this.settings.allowDeselect || (this.settings.isMultiple && selectedOptions && selectedOptions.length <= 0)) {
      deselect.classList.add(this.classes.hide)
    } else {
      deselect.classList.remove(this.classes.hide)
    }

    // Add deselect onclick event
    deselect.onclick = (e: Event) => {
      e.stopPropagation()

      // Dont do anything if disabled
      if (this.settings.disabled) {
        return
      }

      // By Default we will delete
      let shouldDelete = true
      const before = this.store.getSelectedOptions()
      const after = [] as Option[]

      // Add beforeChange callback
      if (this.callbacks.beforeChange) {
        shouldDelete = this.callbacks.beforeChange(after, before) === true
      }

      if (shouldDelete) {
        if (this.settings.isMultiple) {
          this.callbacks.setSelected([], false)
          this.updateDeselectAll()
        } else {
          // Get first option and set it as selected
          const firstOption = this.store.getFirstOption()
          const id = firstOption ? firstOption.id : ''

          this.callbacks.setSelected(id, false)
        }

        // Check if we need to close the dropdown
        if (this.settings.closeOnSelect) {
          this.callbacks.close()
        }

        // Run afterChange callback
        if (this.callbacks.afterChange) {
          this.callbacks.afterChange(this.store.getSelectedOptions())
        }
      }
    }

    // Add deselect svg
    const deselectSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    deselectSvg.setAttribute('viewBox', '0 0 100 100')
    const deselectPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    deselectPath.setAttribute('d', this.classes.deselectPath)
    deselectSvg.appendChild(deselectPath)
    deselect.appendChild(deselectSvg)
    main.appendChild(deselect)

    // Add arrow
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    arrow.classList.add(this.classes.arrow)
    arrow.setAttribute('viewBox', '0 0 100 100')
    const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    arrowPath.setAttribute('d', this.classes.arrowClose)
    if (this.settings.alwaysOpen) {
      arrow.classList.add(this.classes.hide)
    }
    arrow.appendChild(arrowPath)
    main.appendChild(arrow)

    return {
      main: main,
      values: values,
      deselect: {
        main: deselect,
        svg: deselectSvg,
        path: deselectPath
      },
      arrow: {
        main: arrow,
        path: arrowPath
      }
    }
  }

  public mainFocus(eventType: string | null): void {
    // Trigger focus but dont scroll to it
    // Need for prevent refocus the element if event is not keyboard event.
    // For example if event is mouse click or tachpad click this condition prevent refocus on element
    // because click by mouse change focus position and not need return focus to element.
    if (eventType !== 'click') {
      this.main.main.focus({ preventScroll: true })
    }
  }

  public placeholder(): HTMLDivElement {
    // Figure out if there is a placeholder option
    const placeholderOption = this.store.filter((o) => o.placeholder, false) as Option[]

    // If there is a placeholder option use that
    // If placeholder has an html value, use that
    // If placeholder has a text, use that
    // If nothing is set, use the placeholder text
    let placeholderText = this.settings.placeholderText
    if (placeholderOption.length) {
      if (placeholderOption[0].html !== '') {
        placeholderText = placeholderOption[0].html
      } else if (placeholderOption[0].text !== '') {
        placeholderText = placeholderOption[0].text
      }
    }

    // Create placeholder div
    const placeholder = document.createElement('div')
    placeholder.classList.add(this.classes.placeholder)
    placeholder.innerHTML = placeholderText
    return placeholder
  }

  // Get selected values and append to multiSelected values container
  // and remove those who shouldnt exist
  public renderValues(): void {
    // If single select set placeholder or selected value
    if (!this.settings.isMultiple) {
      this.renderSingleValue()
      return
    }

    this.renderMultipleValues()

    this.updateDeselectAll()
  }

  private renderSingleValue(): void {
    const selected = this.store.filter((o: Option): boolean => {
      return o.selected && !o.placeholder
    }, false) as Option[]
    const selectedSingle = selected.length > 0 ? selected[0] : null

    // If nothing is seleected use settings placeholder text
    if (!selectedSingle) {
      this.main.values.innerHTML = this.placeholder().outerHTML
    } else {
      // Create single value container
      const singleValue = document.createElement('div')
      singleValue.classList.add(this.classes.single)
      if (selectedSingle.html) {
        singleValue.innerHTML = selectedSingle.html
      } else {
        singleValue.innerText = selectedSingle.text
      }

      // If there is a selected value, set a single div
      this.main.values.innerHTML = singleValue.outerHTML
    }

    // If allowDeselect is false or selected value is empty just hide deselect
    if (!this.settings.allowDeselect || !selected.length) {
      this.main.deselect.main.classList.add(this.classes.hide)
    } else {
      this.main.deselect.main.classList.remove(this.classes.hide)
    }
  }

  private renderMultipleValues(): void {
    // Get various pieces of data
    let currentNodes = this.main.values.childNodes as NodeListOf<HTMLDivElement>
    let selectedOptions = this.store.filter((opt: Option) => {
      // Only grab options that are selected and display is true
      return opt.selected && opt.display
    }, false) as Option[]

    // If selectedOptions is empty set placeholder
    if (selectedOptions.length === 0) {
      this.main.values.innerHTML = this.placeholder().outerHTML
      return
    } else {
      // If there is a placeholder, remove it
      const placeholder = this.main.values.querySelector('.' + this.classes.placeholder)
      if (placeholder) {
        placeholder.remove()
      }
    }

    // If selectedOptions is greater than maxItems, set maxValuesMessage
    if (selectedOptions.length > this.settings.maxValuesShown) {
      // Creating the element that shows the number of selected items
      const singleValue = document.createElement('div')
      singleValue.classList.add(this.classes.max)
      singleValue.textContent = this.settings.maxValuesMessage.replace('{number}', selectedOptions.length.toString())

      // If there is a selected value, set a single div
      this.main.values.innerHTML = singleValue.outerHTML
      return
    } else {
      // If there is a message, remove it
      const maxValuesMessage = this.main.values.querySelector('.' + this.classes.max)
      if (maxValuesMessage) {
        maxValuesMessage.remove()
      }
    }

    // Lets check for data selected order
    if (this.settings.keepOrder) {
      selectedOptions = this.store.selectedOrderOptions(selectedOptions)
    }

    // Loop through currentNodes and only include ones that are not in selectedIDs
    let removeNodes: HTMLDivElement[] = []
    for (let i = 0; i < currentNodes.length; i++) {
      const node = currentNodes[i]
      const id = node.getAttribute('data-id')
      if (id) {
        // Check if id is in selectedOptions
        const found = selectedOptions.filter((opt: Option) => {
          return opt.id === id
        }, false)

        // If not found, add to removeNodes
        if (!found.length) {
          removeNodes.push(node)
        }
      }
    }

    // Loop through and remove
    for (const n of removeNodes) {
      n.classList.add(this.classes.valueOut)
      setTimeout(() => {
        if (this.main.values.hasChildNodes() && this.main.values.contains(n)) {
          this.main.values.removeChild(n)
        }
      }, 100)
    }

    // Add values that dont currently exist
    currentNodes = this.main.values.childNodes as NodeListOf<HTMLDivElement>
    for (let d = 0; d < selectedOptions.length; d++) {
      let shouldAdd = true
      for (let i = 0; i < currentNodes.length; i++) {
        if (selectedOptions[d].id === String(currentNodes[i].dataset.id)) {
          shouldAdd = false
        }
      }

      // If shouldAdd, insertAdjacentElement it to the values container in the order of the selectedOptions
      if (shouldAdd) {
        // If keepOrder is true, we will just append it to the end
        if (this.settings.keepOrder) {
          this.main.values.appendChild(this.multipleValue(selectedOptions[d]))
        } else {
          // else we will insert it in the order of the selectedOptions
          if (currentNodes.length === 0) {
            this.main.values.appendChild(this.multipleValue(selectedOptions[d]))
          } else if (d === 0) {
            this.main.values.insertBefore(this.multipleValue(selectedOptions[d]), currentNodes[d])
          } else {
            currentNodes[d - 1].insertAdjacentElement('afterend', this.multipleValue(selectedOptions[d]))
          }
        }
      }
    }
  }

  public multipleValue(option: Option): HTMLDivElement {
    const value = document.createElement('div')
    value.classList.add(this.classes.value)
    value.dataset.id = option.id

    const text = document.createElement('div')
    text.classList.add(this.classes.valueText)
    text.textContent = option.text // For multiple values always use text
    value.appendChild(text)

    // Only add deletion if the option is not mandatory
    if (!option.mandatory) {
      // Create delete div element
      const deleteDiv = document.createElement('div')
      deleteDiv.classList.add(this.classes.valueDelete)
      deleteDiv.setAttribute('tabindex', '0') // Make the div focusable for tab navigation

      // Add delete onclick event
      deleteDiv.onclick = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()

        // Dont do anything if disabled
        if (this.settings.disabled) {
          return
        }

        // By Default we will delete
        let shouldDelete = true
        const before = this.store.getSelectedOptions()
        const after = before.filter((o) => {
          return o.selected && o.id !== option.id
        }, true)

        // Check if minSelected is set and if after length so, return
        if (this.settings.minSelected && after.length < this.settings.minSelected) {
          return
        }

        // If there is a beforeDeselect function run it
        if (this.callbacks.beforeChange) {
          shouldDelete = this.callbacks.beforeChange(after, before) === true
        }

        if (shouldDelete) {
          // Loop through after and append ids to a variable called selected
          let selectedIds: string[] = []
          for (const o of after) {
            if (o instanceof Optgroup) {
              for (const c of o.options) {
                selectedIds.push(c.id)
              }
            }

            if (o instanceof Option) {
              selectedIds.push(o.id)
            }
          }
          this.callbacks.setSelected(selectedIds, false)

          // Check if we need to close the dropdown
          if (this.settings.closeOnSelect) {
            this.callbacks.close()
          }

          // Run afterChange callback
          if (this.callbacks.afterChange) {
            this.callbacks.afterChange(after)
          }

          this.updateDeselectAll()
        }
      }

      // Add delete svg
      const deleteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      deleteSvg.setAttribute('viewBox', '0 0 100 100')
      const deletePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      deletePath.setAttribute('d', this.classes.optionDelete)
      deleteSvg.appendChild(deletePath)
      deleteDiv.appendChild(deleteSvg)

      value.appendChild(deleteDiv)

      // Add keydown event listener for keyboard navigation (Enter key)
      deleteDiv.onkeydown = (e) => {
        if (e.key === 'Enter') {
          deleteDiv.click() // Trigger the click event when Enter is pressed
        }
      }
    }

    return value
  }

  public contentDiv(): Content {
    const main = document.createElement('div')

    // Add id to data-id
    main.dataset.id = this.settings.id
    // main.id = this.settings.id + '-content' // Remove for now as it is not needed and add duplicate id errors

    // Add search
    const search = this.searchDiv()
    main.appendChild(search.main)

    // Add list
    const list = this.listDiv()
    main.appendChild(list)

    return {
      main: main,
      search: search,
      list: list
    }
  }

  public moveContent(): void {
    // If contentPosition is relative, dont move the content anywhere other than below
    if (this.settings.contentPosition === 'relative') {
      this.moveContentBelow()
      return
    }

    // If openContent is not auto set content
    if (this.settings.openPosition === 'down') {
      this.moveContentBelow()
      return
    } else if (this.settings.openPosition === 'up') {
      this.moveContentAbove()
      return
    }

    // Auto - Determine where to put the content
    if (this.putContent() === 'up') {
      this.moveContentAbove()
    } else {
      this.moveContentBelow()
    }
  }

  public searchDiv(): Search {
    const main = document.createElement('div')
    const input = document.createElement('input')
    const addable = document.createElement('div')
    main.classList.add(this.classes.search)

    // Setup search return object
    const searchReturn: Search = {
      main,
      input
    }

    // We still want the search to be tabable but not shown
    if (!this.settings.showSearch) {
      main.classList.add(this.classes.hide)
      input.readOnly = true
    }

    input.type = 'search'
    input.placeholder = this.settings.searchPlaceholder
    input.tabIndex = -1
    input.setAttribute('aria-label', this.settings.searchPlaceholder)
    input.setAttribute('aria-autocomplete', 'list')
    input.setAttribute('autocapitalize', 'off')
    input.setAttribute('autocomplete', 'off')
    input.setAttribute('autocorrect', 'off')
    // Hide from screen readers by default (shown when opened)
    input.setAttribute('aria-hidden', 'true')

    input.oninput = debounce((e: Event) => {
      this.callbacks.search((e.target as HTMLInputElement).value)
    }, 100)

    // Deal with keyboard events on search input field
    input.onkeydown = (e: KeyboardEvent): boolean => {
      // Convert above if else statemets to switch
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
          e.key === 'ArrowDown' ? this.highlight('down') : this.highlight('up')
          return false
        case 'Tab':
          // When tabbing close the dropdown
          // which will also focus on main div
          // and then continuing normal tabbing
          this.callbacks.close()
          return true // Continue doing normal tabbing
        case 'Escape':
          this.callbacks.close()
          return false
        case ' ':
          const highlighted = this.content.list.querySelector('.' + this.classes.highlighted) as HTMLDivElement
          if (highlighted) {
            highlighted.click()
            return false
          }
          return true
        case 'Enter':
          // Check if there's a highlighted option first
          const highlightedEnter = this.content.list.querySelector('.' + this.classes.highlighted) as HTMLDivElement
          if (highlightedEnter) {
            // If an option is highlighted, select it (even if addable is enabled)
            highlightedEnter.click()
            return false
          } else if (this.callbacks.addable) {
            // If no option is highlighted and addable is enabled, add new item
            addable.click()
            return false
          }
          return true
      }

      return true // Allow normal typing
    }

    main.appendChild(input)

    // If addable is enabled, add the addable div
    if (this.callbacks.addable) {
      // Add main class
      addable.classList.add(this.classes.addable)

      // Add svg icon
      const plus = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      plus.setAttribute('viewBox', '0 0 100 100')
      const plusPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      plusPath.setAttribute('d', this.classes.addablePath)
      plus.appendChild(plusPath)
      addable.appendChild(plus)

      // Add click event to addable div
      addable.onclick = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()

        // Do nothing if addable is not set
        if (!this.callbacks.addable) {
          return
        }

        // Grab input value
        const inputValue = this.content.search.input.value.trim()
        if (inputValue === '') {
          this.content.search.input.focus()
          return
        }

        // Run finish will be ran at the end of the addable function.
        // Reason its in a function is so we can run it after the
        // addable function is done for promise based addables
        const runFinish = (oo: OptionOptional) => {
          let newOption = new Option(oo)

          // Call addOption to add the new option
          this.callbacks.addOption(newOption)

          // set selected value for single and multiple
          if (this.settings.isMultiple) {
            let ids = this.store.getSelected()
            ids.push(newOption.id)
            this.callbacks.setSelected(ids, true)
          } else {
            this.callbacks.setSelected([newOption.id], true)
          }

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

        // Call addable callback
        const addableValue = this.callbacks.addable(inputValue)

        // If addableValue is false, undefined or null, do nothing
        if (addableValue === false || addableValue === undefined || addableValue === null) {
          return
        }

        // If addableValue is a promise, wait for it to resolve
        if (addableValue instanceof Promise) {
          addableValue.then((value) => {
            if (typeof value === 'string') {
              runFinish({
                text: value,
                value: value
              })
            } else if (addableValue instanceof Error) {
              this.renderError(addableValue.message)
            } else {
              runFinish(value)
            }
          })
        } else if (typeof addableValue === 'string') {
          runFinish({
            text: addableValue,
            value: addableValue
          })
        } else if (addableValue instanceof Error) {
          this.renderError(addableValue.message)
        } else {
          runFinish(addableValue)
        }

        return
      }
      main.appendChild(addable)

      // Add the addable to the search return
      searchReturn.addable = {
        main: addable,
        svg: plus,
        path: plusPath
      }
    }

    return searchReturn
  }

  public searchFocus(): void {
    this.content.search.input.focus()
  }

  public clearSearch(): void {
    this.content.search.input.value = ''
  }

  public getOptions(notPlaceholder = false, notDisabled = false, notHidden = false): HTMLDivElement[] {
    // Put together query string
    let query = '.' + this.classes.option
    if (notPlaceholder) {
      query += ':not(.' + this.classes.placeholder + ')'
    }
    if (notDisabled) {
      query += ':not(.' + this.classes.disabled + ')'
    }
    if (notHidden) {
      query += ':not(.' + this.classes.hide + ')'
    }

    return Array.from(this.content.list.querySelectorAll(query))
  }

  // highlightUp is used to highlight the previous option in the list
  public highlight(dir: 'up' | 'down'): void {
    // Get full list of options in list
    const options = this.getOptions(true, true, true)

    // If there are no options, do nothing
    if (options.length === 0) {
      return
    }

    // If length is 1, highlight it
    if (options.length === 1) {
      // Check if option doesnt already have highlighted class
      if (!options[0].classList.contains(this.classes.highlighted)) {
        options[0].classList.add(this.classes.highlighted)
        return
      }
    }

    // Loop through options and see if there are no highlighted ones
    let highlighted = false
    for (const o of options) {
      if (o.classList.contains(this.classes.highlighted)) {
        highlighted = true
      }
    }

    // If no highlighted, see if any are selected and if so highlight selected first one
    if (!highlighted) {
      for (const o of options) {
        if (o.classList.contains(this.classes.selected)) {
          o.classList.add(this.classes.highlighted)
          break
        }
      }
    }

    // Loop through options and find the highlighted one
    for (let i = 0; i < options.length; i++) {
      // Found highlighted option
      if (options[i].classList.contains(this.classes.highlighted)) {
        const prevOption = options[i]
        // Remove highlighted class from current one
        prevOption.classList.remove(this.classes.highlighted)

        // If previous option has parent classes ss-optgroup with ss-open then click it
        const prevParent = prevOption.parentElement
        if (prevParent && prevParent.classList.contains(this.classes.mainOpen)) {
          const optgroupLabel = prevParent.querySelector('.' + this.classes.optgroupLabel) as HTMLDivElement
          if (optgroupLabel) {
            optgroupLabel.click()
          }
        }

        // Highlight the next one
        let selectOption =
          options[dir === 'down' ? (i + 1 < options.length ? i + 1 : 0) : i - 1 >= 0 ? i - 1 : options.length - 1]
        selectOption.classList.add(this.classes.highlighted)
        this.ensureElementInView(this.content.list, selectOption)

        // Update aria-activedescendant for screen readers
        if (selectOption.id) {
          this.main.main.setAttribute('aria-activedescendant', selectOption.id)
        }

        // If selected option has parent classes ss-optgroup with ss-close then click it
        const selectParent = selectOption.parentElement
        if (selectParent && selectParent.classList.contains(this.classes.close)) {
          const optgroupLabel = selectParent.querySelector('.' + this.classes.optgroupLabel) as HTMLDivElement
          if (optgroupLabel) {
            optgroupLabel.click()
          }
        }

        return
      }
    }

    // If we get here, there is no highlighted option
    // So we will highlight the first or last based upon direction
    const firstHighlight = options[dir === 'down' ? 0 : options.length - 1]
    firstHighlight.classList.add(this.classes.highlighted)

    // Update aria-activedescendant for screen readers
    if (firstHighlight.id) {
      this.main.main.setAttribute('aria-activedescendant', firstHighlight.id)
    }

    // Scroll to highlighted one
    this.ensureElementInView(this.content.list, firstHighlight)
  }

  // Create main container that options will reside
  public listDiv(): HTMLDivElement {
    const options = document.createElement('div')
    options.classList.add(this.classes.list)

    // Add id for ARIA controls reference
    const listId = this.settings.id + '-list'
    options.id = listId
    options.dataset.id = listId

    return options
  }

  public renderError(error: string) {
    // Clear out innerHtml
    this.content.list.innerHTML = ''

    const errorDiv = document.createElement('div')
    errorDiv.classList.add(this.classes.error)
    errorDiv.textContent = error
    this.content.list.appendChild(errorDiv)
  }

  public renderSearching() {
    // Clear out innerHtml
    this.content.list.innerHTML = ''

    const searchingDiv = document.createElement('div')
    searchingDiv.classList.add(this.classes.searching)
    searchingDiv.textContent = this.settings.searchingText
    this.content.list.appendChild(searchingDiv)
  }

  // Take in data and add options to
  public renderOptions(data: DataArray): void {
    // Clear out innerHtml
    this.content.list.innerHTML = ''

    // If no results show no results text
    if (data.length === 0) {
      const noResults = document.createElement('div')
      noResults.classList.add(this.classes.search)

      //
      if (this.callbacks.addable) {
        noResults.innerHTML = this.settings.addableText.replace('{value}', this.content.search.input.value)
      } else {
        noResults.innerHTML = this.settings.searchText
      }
      this.content.list.appendChild(noResults)
      return
    }

    // If settings has allowDeselect and isSingle, add empty placeholder in the event they want to deselect
    if (this.settings.allowDeselect && !this.settings.isMultiple) {
      // Check if store options have a placeholder
      const placeholderOption = this.store.filter((o) => o.placeholder, false) as Option[]
      if (!placeholderOption.length) {
        this.store.addOption(
          new Option({
            text: '',
            value: '',
            selected: false,
            placeholder: true
          }),
          true
        )
      }
    }

    // Append individual options to div container
    const fragment = document.createDocumentFragment()
    for (const d of data) {
      // Create optgroup
      if (d instanceof Optgroup) {
        // Create optgroup
        const optgroupEl = document.createElement('div')
        optgroupEl.classList.add(this.classes.optgroup)

        // Create label
        const optgroupLabel = document.createElement('div')
        optgroupLabel.classList.add(this.classes.optgroupLabel)
        optgroupEl.appendChild(optgroupLabel)

        // Create label text div element
        const optgroupLabelText = document.createElement('div')
        optgroupLabelText.classList.add(this.classes.optgroupLabelText)
        optgroupLabelText.textContent = d.label
        optgroupLabel.appendChild(optgroupLabelText)

        // Create options container
        const optgroupActions = document.createElement('div')
        optgroupActions.classList.add(this.classes.optgroupActions)
        optgroupLabel.appendChild(optgroupActions)

        // If selectByGroup is true and isMultiple then add click event to label
        if (this.settings.isMultiple && d.selectAll) {
          // Create new div to hold a checkbox svg
          const selectAll = document.createElement('div')
          selectAll.classList.add(this.classes.optgroupSelectAll)

          // Check options and if all are selected, if so add class selected
          let allSelected = true
          for (const o of d.options) {
            if (!o.selected) {
              allSelected = false
              break
            }
          }

          // Add class if all selected
          if (allSelected) {
            selectAll.classList.add(this.classes.selected)
          }

          // Add select all text span
          const selectAllText = document.createElement('span')
          selectAllText.textContent = d.selectAllText
          selectAll.appendChild(selectAllText)

          // Create new svg for checkbox
          const selectAllSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          selectAllSvg.setAttribute('viewBox', '0 0 100 100')
          selectAll.appendChild(selectAllSvg)

          // Create new path for box
          const selectAllBox = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          selectAllBox.setAttribute('d', this.classes.optgroupSelectAllBox)
          selectAllSvg.appendChild(selectAllBox)

          // Create new path for check
          const selectAllCheck = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          selectAllCheck.setAttribute('d', this.classes.optgroupSelectAllCheck)
          selectAllSvg.appendChild(selectAllCheck)

          // Add click event listener to select all
          selectAll.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            // Get the store current selected values
            const currentSelected = this.store.getSelected()

            // If all selected, remove all options from selected
            // call setSelected and return
            if (allSelected) {
              // Put together new list minus all options in this optgroup
              const newSelected = currentSelected.filter((s) => {
                for (const o of d.options) {
                  if (s === o.id) {
                    return false
                  }
                }

                return true
              })

              this.callbacks.setSelected(newSelected, true)
              return
            } else {
              // Put together new list with all options in this optgroup
              const newSelected = currentSelected.concat(d.options.map((o) => o.id))

              // Loop through options and if they don't exist in the store
              // run addOption callback
              for (const o of d.options) {
                if (!this.store.getOptionByID(o.id)) {
                  this.callbacks.addOption(o)
                }
              }

              this.callbacks.setSelected(newSelected, true)
              return
            }
          })

          // Append select all to label
          optgroupActions.appendChild(selectAll)
        }

        // If optgroup has collapsable
        if (d.closable !== 'off') {
          // Create new div to hold a checkbox svg
          const optgroupClosable = document.createElement('div')
          optgroupClosable.classList.add(this.classes.optgroupClosable)

          // Create svg arrow
          const optgroupClosableSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          optgroupClosableSvg.setAttribute('viewBox', '0 0 100 100')
          optgroupClosableSvg.classList.add(this.classes.arrow)
          optgroupClosable.appendChild(optgroupClosableSvg)

          // Create new path for arrow
          const optgroupClosableArrow = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          optgroupClosableSvg.appendChild(optgroupClosableArrow)

          // If any options are selected or someone is searching, set optgroup to open
          if (d.options.some((o) => o.selected) || this.content.search.input.value.trim() !== '') {
            optgroupClosable.classList.add(this.classes.mainOpen)
            optgroupClosableArrow.setAttribute('d', this.classes.arrowOpen)
          } else if (d.closable === 'open') {
            optgroupEl.classList.add(this.classes.mainOpen)
            optgroupClosableArrow.setAttribute('d', this.classes.arrowOpen)
          } else if (d.closable === 'close') {
            optgroupEl.classList.add(this.classes.close)
            optgroupClosableArrow.setAttribute('d', this.classes.arrowClose)
          }

          // Add click event listener to close
          optgroupLabel.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            // If optgroup is closed, open it
            if (optgroupEl.classList.contains(this.classes.close)) {
              optgroupEl.classList.remove(this.classes.close)
              optgroupEl.classList.add(this.classes.mainOpen)
              optgroupClosableArrow.setAttribute('d', this.classes.arrowOpen)
            } else {
              optgroupEl.classList.remove(this.classes.mainOpen)
              optgroupEl.classList.add(this.classes.close)
              optgroupClosableArrow.setAttribute('d', this.classes.arrowClose)
            }
          })

          // Append close to label
          optgroupActions.appendChild(optgroupClosable)
        }

        // Add optgroup label
        optgroupEl.appendChild(optgroupLabel)

        // Loop through options
        for (const o of d.options) {
          optgroupEl.appendChild(this.option(o))
          fragment.appendChild(optgroupEl)
        }
      }

      // Create option
      if (d instanceof Option) {
        fragment.appendChild(this.option(d as Option))
      }
    }

    // Append fragment to list
    this.content.list.appendChild(fragment)
  }

  // Create option div element
  public option(option: Option): HTMLDivElement {
    // Add hidden placeholder
    if (option.placeholder) {
      const placeholder = document.createElement('div')
      placeholder.classList.add(this.classes.option)
      placeholder.classList.add(this.classes.hide)
      return placeholder
    }

    // Create option
    const optionEl = document.createElement('div')
    optionEl.dataset.id = option.id // Dataset id for identifying an option
    optionEl.id = this.settings.id + '-' + option.id // Unique ID for ARIA references
    optionEl.classList.add(this.classes.option)
    optionEl.setAttribute('role', 'option') // WCAG attribute
    if (option.class) {
      option.class.split(' ').forEach((dataClass: string) => {
        optionEl.classList.add(dataClass)
      })
    }
    if (option.style) {
      optionEl.style.cssText = option.style
    }

    // Set option content
    if (this.settings.searchHighlight && this.content.search.input.value.trim() !== '') {
      optionEl.innerHTML = this.highlightText(
        option.html !== '' ? option.html : option.text,
        this.content.search.input.value,
        this.classes.searchHighlighter
      )
    } else if (option.html !== '') {
      optionEl.innerHTML = option.html
    } else {
      optionEl.textContent = option.text
    }

    // Set title attribute
    if (this.settings.showOptionTooltips && optionEl.textContent) {
      optionEl.setAttribute('title', optionEl.textContent)
    }

    // If option is disabled
    if (!option.display) {
      optionEl.classList.add(this.classes.hide)
    }

    // If allowed to deselect, null onclick and add disabled
    if (option.disabled) {
      optionEl.classList.add(this.classes.disabled)
    }

    // If option is selected and hideSelectedOption is true, hide it
    if (option.selected && this.settings.hideSelected) {
      optionEl.classList.add(this.classes.hide)
    }

    // If option is selected
    if (option.selected) {
      optionEl.classList.add(this.classes.selected)
      optionEl.setAttribute('aria-selected', 'true')
      this.main.main.setAttribute('aria-activedescendant', optionEl.id)
    } else {
      optionEl.classList.remove(this.classes.selected)
      optionEl.setAttribute('aria-selected', 'false')
    }

    // Add click event listener
    optionEl.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      // Setup variables
      const selectedOptions = this.store.getSelected()
      const element = e.currentTarget as HTMLDivElement
      const elementID = String(element.dataset.id)
      const isCmd = e.ctrlKey || e.metaKey // Cmd (Mac) or Ctrl (Windows/Linux)

      // If the option is disabled, do nothing
      if (option.disabled) {
        return
      }

      // allowDeselect only applies to single-select mode
      // In multi-select, you can always toggle options on/off
      if (!this.settings.isMultiple && option.selected && !this.settings.allowDeselect) {
        return
      }

      // Check limit and do nothing if limit is reached and the option is not selected
      // Also check reverse for min limit and is selected (allow Cmd to bypass minSelected)
      if (
        (this.settings.isMultiple && this.settings.maxSelected <= selectedOptions.length && !option.selected) ||
        (this.settings.isMultiple && this.settings.minSelected >= selectedOptions.length && option.selected && !isCmd)
      ) {
        return
      }

      // Setup variables
      let shouldUpdate = false
      const before = this.store.getSelectedOptions()
      let after = [] as Option[]

      // If multiple - mimic native browser multi-select behavior
      if (this.settings.isMultiple) {
        const isCurrentlySelected = before.some((o: Option) => o.id === elementID)
        const isShift = e.shiftKey

        // Shift+Click: Select range from last clicked to current
        if (isShift && this.lastSelectedOption) {
          const options = this.store.getDataOptions()
          const lastIndex = options.findIndex((o: Option) => o.id === this.lastSelectedOption!.id)
          const currentIndex = options.findIndex((o: Option) => o.id === option.id)

          if (lastIndex >= 0 && currentIndex >= 0) {
            const startIndex = Math.min(lastIndex, currentIndex)
            const endIndex = Math.max(lastIndex, currentIndex)
            const rangeOptions = options.slice(startIndex, endIndex + 1)

            // Check if range would exceed maxSelected
            const newSelections = rangeOptions.filter((opt) => !before.find((b) => b.id === opt.id))
            if (before.length + newSelections.length <= this.settings.maxSelected) {
              // Add range to existing selections
              after = before.concat(newSelections)
            } else {
              // Range too large, keep existing selections
              after = before
            }
          } else {
            after = before
          }
        }
        // Cmd/Ctrl+Click: Toggle selection without affecting others (keeps dropdown open)
        else if (isCmd) {
          if (isCurrentlySelected) {
            // Deselect this option
            after = before.filter((o: Option) => o.id !== elementID)
          } else {
            // Add this option to selection
            after = before.concat(option)
          }
          this.lastSelectedOption = option
        }
        // Regular Click: Toggle this option (add/remove), will close dropdown
        else {
          if (isCurrentlySelected) {
            // Deselect this option
            after = before.filter((o: Option) => o.id !== elementID)
          } else {
            // Add this option to selection
            after = before.concat(option)
          }
          this.lastSelectedOption = option
        }
      }

      // If single
      if (!this.settings.isMultiple) {
        if (option.selected) {
          // If selected after would remove
          after = []
        } else {
          // If not selected after would add
          after = [option]
        }
      }

      // If no beforeOnChange is set automatically update at end
      if (!this.callbacks.beforeChange) {
        shouldUpdate = true
      }

      if (this.callbacks.beforeChange) {
        // Check if beforeChange returns false
        if (this.callbacks.beforeChange(after, before) === false) {
          shouldUpdate = false
        } else {
          shouldUpdate = true
        }
      }

      if (shouldUpdate) {
        // Check if the option exists in the store
        // if not run addOption callback
        if (!this.store.getOptionByID(elementID)) {
          this.callbacks.addOption(option)
        }

        // Get values from after and set as selected
        this.callbacks.setSelected(
          after.map((o: Option) => o.id),
          false
        )

        // Close dropdown unless using modifier keys in multi-select
        // (mimics native multi-select behavior where you can keep selecting)
        const isModifierKey = e.ctrlKey || e.metaKey || e.shiftKey // Cmd/Ctrl or Shift
        const shouldClose = this.settings.closeOnSelect && !(this.settings.isMultiple && isModifierKey)

        if (shouldClose) {
          this.callbacks.close()
        }

        // callback that the value has changed
        if (this.callbacks.afterChange) {
          this.callbacks.afterChange(after)
        }
      }
    })

    return optionEl
  }

  public destroy(): void {
    // Remove main
    this.main.main.remove()

    // Remove content
    this.content.main.remove()
  }

  private highlightText(str: string, search: any, className: string) {
    const searchTerm = search.trim()
    if (searchTerm === '') {
      return str
    }

    // Escape special regex characters in the search term to prevent regex injection
    const escapedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // Create a temporary div to parse HTML and work with text nodes only
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = str

    // Function to recursively process text nodes
    const highlightTextNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || ''
        const regex = new RegExp('(' + escapedSearch + ')', 'i')

        if (regex.test(text)) {
          // Create a temporary container for the highlighted content
          const wrapper = document.createElement('span')
          const parts = text.split(regex)

          parts.forEach((part, index) => {
            if (part && regex.test(part)) {
              // This is the matched part - wrap it in mark
              const mark = document.createElement('mark')
              mark.className = className
              mark.textContent = part
              wrapper.appendChild(mark)
            } else if (part) {
              // This is not the matched part - keep as text
              wrapper.appendChild(document.createTextNode(part))
            }
          })

          // Replace the text node with the wrapper
          node.parentNode?.replaceChild(wrapper, node)
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recursively process child nodes
        Array.from(node.childNodes).forEach((child) => highlightTextNodes(child))
      }
    }

    // Process all text nodes in the temporary div
    Array.from(tempDiv.childNodes).forEach((node) => highlightTextNodes(node))

    return tempDiv.innerHTML
  }

  public moveContentAbove(): void {
    // Get main and content height
    const mainHeight = this.main.main.offsetHeight
    const contentHeight = this.content.main.offsetHeight

    // Set direction classes on both main and content
    this.main.main.classList.remove(this.classes.dirBelow)
    this.main.main.classList.add(this.classes.dirAbove)
    this.content.main.classList.remove(this.classes.dirBelow)
    this.content.main.classList.add(this.classes.dirAbove)

    // Set the content position
    const containerRect = this.main.main.getBoundingClientRect()
    this.content.main.style.margin = '-' + (mainHeight + contentHeight - 1) + 'px 0px 0px 0px'
    this.content.main.style.top =
      containerRect.top + containerRect.height + (this.settings.contentPosition === 'fixed' ? 0 : window.scrollY) + 'px'
    this.content.main.style.left =
      containerRect.left + (this.settings.contentPosition === 'fixed' ? 0 : window.scrollX) + 'px'
    this.content.main.style.width = containerRect.width + 'px'
  }

  public moveContentBelow(): void {
    // Set direction classes on both main and content
    this.main.main.classList.remove(this.classes.dirAbove)
    this.main.main.classList.add(this.classes.dirBelow)
    this.content.main.classList.remove(this.classes.dirAbove)
    this.content.main.classList.add(this.classes.dirBelow)

    // Set the content position
    const containerRect = this.main.main.getBoundingClientRect()
    this.content.main.style.margin = '-1px 0px 0px 0px'
    // Dont do anything if the content is relative
    if (this.settings.contentPosition !== 'relative') {
      this.content.main.style.top =
        containerRect.top +
        containerRect.height +
        (this.settings.contentPosition === 'fixed' ? 0 : window.scrollY) +
        'px'
      this.content.main.style.left =
        containerRect.left + (this.settings.contentPosition === 'fixed' ? 0 : window.scrollX) + 'px'
      this.content.main.style.width = containerRect.width + 'px'
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

  public putContent(): 'up' | 'down' {
    // Get main and content height
    const mainHeight = this.main.main.offsetHeight
    const mainRect = this.main.main.getBoundingClientRect()
    const contentHeight = this.content.main.offsetHeight

    // From bottom of mainHeight figure out if content will fit below without going below the window
    const spaceBelow = window.innerHeight - (mainRect.top + mainHeight)

    // If space below is less than content height
    if (spaceBelow <= contentHeight) {
      // If space above is more than content height
      if (mainRect.top > contentHeight) {
        // Move content above
        return 'up'
      } else {
        // Move content below
        return 'down'
      }
    }

    // Move content below
    return 'down'
  }

  // Updates deselect based on item count and allowDeselect setting
  public updateDeselectAll(): void {
    if (!this.store || !this.settings) {
      return
    }
    const selected = this.store.getSelectedOptions()
    const hasSelectedItems = selected && selected.length > 0
    const isMultiple = this.settings.isMultiple
    const allowDeselect = this.settings.allowDeselect

    const deselectButton = this.main.deselect.main
    const hideClass = this.classes.hide

    if (allowDeselect && !(isMultiple && !hasSelectedItems)) {
      deselectButton.classList.remove(hideClass)
    } else {
      deselectButton.classList.add(hideClass)
    }
  }
}
