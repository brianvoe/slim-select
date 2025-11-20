import { kebabCase, hasClassInTree } from './helpers'
import { Optgroup, Option } from './store'

export default class Select {
  public select: HTMLSelectElement

  // Mutation observer fields
  public onValueChange?: (value: Option[]) => void
  public onClassChange?: (classes: string[]) => void
  public onDisabledChange?: (disabled: boolean) => void
  public onOptionsChange?: (data: (Option | Optgroup)[]) => void
  public onLabelClick?: () => void

  // Change observers
  private listen: boolean = false
  private observer: MutationObserver | null = null
  private isUpdating: boolean = false
  private pendingOptionsChange: (Option | Optgroup)[] | null = null

  // Event handlers for preventing native select behavior (especially on iOS Safari)
  private preventNativeSelect: ((e: Event) => void) | null = null
  private preventNativeSelectMousedown: ((e: Event) => void) | null = null
  private preventNativeSelectFocus: ((e: Event) => void) | null = null

  constructor(select: HTMLSelectElement) {
    this.select = select

    this.valueChange = this.valueChange.bind(this)
    // Add change event listener
    this.select.addEventListener('change', this.valueChange, {
      // allow bubbling of event
      passive: true
    })

    // Initiate mutation observer
    this.observer = new MutationObserver(this.observeCall.bind(this))

    // Start listening for changes
    this.changeListen(true)
  }

  public enable(): void {
    this.select.disabled = false
  }

  public disable(): void {
    this.select.disabled = true
  }

  public hideUI(): void {
    this.select.tabIndex = -1
    // Visually hide but keep focusable for form validation
    // Use 1px dimensions so browser validation popup can display
    this.select.style.position = 'absolute'
    this.select.style.width = '1px'
    this.select.style.height = '1px'
    this.select.style.opacity = '0'
    this.select.style.overflow = 'hidden'
    this.select.style.pointerEvents = 'none'
    // Remove any spacing or borders that could affect layout
    this.select.style.margin = '0'
    this.select.style.padding = '0'
    this.select.style.borderWidth = '0'
    // Clip to completely hide the 1px
    this.select.style.clip = 'rect(0 0 0 0)'
    this.select.setAttribute('aria-hidden', 'true')

    // Prevent native select from opening when label is clicked (especially on iOS Safari)
    // iOS Safari programmatically focuses/clicks the select when label is clicked,
    // bypassing pointer-events: none, so we need to prevent these events
    // Only add listeners if they haven't been added yet
    if (!this.preventNativeSelect) {
      this.preventNativeSelect = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }

      this.preventNativeSelectMousedown = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }

      this.preventNativeSelectFocus = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }

      // Add event listeners with capture phase to catch events before they reach the select
      this.select.addEventListener('click', this.preventNativeSelect, { capture: true, passive: false })
      this.select.addEventListener('mousedown', this.preventNativeSelectMousedown, { capture: true, passive: false })
      this.select.addEventListener('focus', this.preventNativeSelectFocus, { capture: true, passive: false })
    }
  }

  public showUI(): void {
    this.select.removeAttribute('tabindex')
    // Reset visual hiding styles
    this.select.style.position = ''
    this.select.style.width = ''
    this.select.style.height = ''
    this.select.style.opacity = ''
    this.select.style.overflow = ''
    this.select.style.pointerEvents = ''
    this.select.style.margin = ''
    this.select.style.padding = ''
    this.select.style.borderWidth = ''
    this.select.style.clip = ''
    this.select.removeAttribute('aria-hidden')

    // Remove event listeners that prevent native select behavior
    if (this.preventNativeSelect) {
      this.select.removeEventListener('click', this.preventNativeSelect, { capture: true })
      this.preventNativeSelect = null
    }
    if (this.preventNativeSelectMousedown) {
      this.select.removeEventListener('mousedown', this.preventNativeSelectMousedown, { capture: true })
      this.preventNativeSelectMousedown = null
    }
    if (this.preventNativeSelectFocus) {
      this.select.removeEventListener('focus', this.preventNativeSelectFocus, { capture: true })
      this.preventNativeSelectFocus = null
    }
  }

  public changeListen(listen: boolean) {
    this.listen = listen

    // Start listening for changes
    if (listen) {
      if (this.observer) {
        this.observer.observe(this.select, {
          subtree: true, // subtree for optgroups options
          childList: true, // children changes
          attributes: true // attributes changes
        })
      }
    }

    // Stop listening for changes
    if (!listen) {
      if (this.observer) {
        this.observer.disconnect()
      }
    }
  }

  // This function get triggers when the select value changes
  // and will call the onValueChange function if it exists
  public valueChange(ev: Event): boolean {
    if (this.listen && this.onValueChange) {
      this.onValueChange(this.getSelectedOptions())
    }

    // Allow bubbling back to other change event listeners
    return true
  }

  private observeCall(mutations: MutationRecord[]): void {
    // If we are not listening, do nothing.
    if (!this.listen) {
      return
    }

    let classChanged = false
    let disabledChanged = false
    let optgroupOptionChanged = false
    let selectionChanged = false

    // Loop through mutations and check various things
    for (const m of mutations) {
      // Check if its the select
      if (m.target === this.select) {
        // Check if disabled has changed
        if (m.attributeName === 'disabled') {
          disabledChanged = true
        }

        // Check if class has changed
        if (m.attributeName === 'class') {
          classChanged = true
        }

        if (m.type === 'childList') {
          for (const n of Array.from(m.addedNodes)) {
            if (n.nodeName === 'OPTION' && (<HTMLOptionElement>n).value === this.select.value) {
              // we added a new option that's now the select value
              selectionChanged = true
              break
            }
          }

          // options changed, so we need the optionsChange event to fire
          optgroupOptionChanged = true
        }
      }

      // Check if its an optgroup or option
      if (m.target.nodeName === 'OPTGROUP' || m.target.nodeName === 'OPTION') {
        optgroupOptionChanged = true
      }
    }

    // If class has changed then call the class change function
    if (classChanged && this.onClassChange) {
      this.onClassChange(this.select.className.split(' '))
    }

    // If disabled has changed then call the disabled change function
    if (disabledChanged && this.onDisabledChange) {
      this.changeListen(false)
      this.onDisabledChange(this.select.disabled)
      this.changeListen(true)
    }

    // If optgroup or option has changed then call the select change function
    if (optgroupOptionChanged && this.onOptionsChange) {
      // If we're currently updating, queue this change to process after update completes
      if (this.isUpdating) {
        // Only queue if the select element actually has options (not empty from updateOptions clearing)
        // Check the select element directly, not getData() which might return stale data
        if (this.select.options.length > 0) {
          const currentData = this.getData()
          // Only queue if we have actual data
          if (currentData.length > 0) {
            this.pendingOptionsChange = currentData
          }
        }
        if (selectionChanged) {
          this.select.dispatchEvent(new Event('change'))
        }
        return
      }

      this.changeListen(false)
      this.onOptionsChange(this.getData())
      this.changeListen(true)
    }

    if (selectionChanged) {
      this.select.dispatchEvent(new Event('change'))
    }
  }

  // From the select element pull optgroup and options into data
  public getData(): (Option | Optgroup)[] {
    let data = []

    // Loop through nodes and get data
    const nodes = this.select.childNodes as any as HTMLOptGroupElement[] | HTMLOptionElement[]
    for (const n of nodes) {
      // Optgroup
      if (n.nodeName === 'OPTGROUP') {
        data.push(this.getDataFromOptgroup(n as HTMLOptGroupElement))
      }

      // Option
      if (n.nodeName === 'OPTION') {
        data.push(this.getDataFromOption(n as HTMLOptionElement))
      }
    }

    return data
  }

  public getDataFromOptgroup(optgroup: HTMLOptGroupElement): Optgroup {
    let data = {
      id: optgroup.id,
      label: optgroup.label,
      selectAll: optgroup.dataset ? optgroup.dataset.selectall === 'true' : false,
      selectAllText: optgroup.dataset ? optgroup.dataset.selectalltext : 'Select all',
      closable: optgroup.dataset ? optgroup.dataset.closable : 'off',
      options: []
    } as Optgroup

    const options = optgroup.childNodes as any as HTMLOptionElement[]
    for (const o of options) {
      if (o.nodeName === 'OPTION') {
        data.options!.push(this.getDataFromOption(o as HTMLOptionElement))
      }
    }

    return data
  }

  // From passed in option pull pieces of usable information
  public getDataFromOption(option: HTMLOptionElement): Option {
    return {
      id: option.id,
      value: option.value,
      text: option.text,
      html: option.dataset && option.dataset.html ? option.dataset.html : '',
      defaultSelected: option.defaultSelected,
      selected: option.selected,
      display: option.style.display !== 'none',
      disabled: option.disabled,
      mandatory: option.dataset ? option.dataset.mandatory === 'true' : false,
      placeholder: option.dataset.placeholder === 'true',
      class: option.className,
      style: option.style.cssText,
      data: option.dataset
    } as Option
  }

  public getSelectedOptions(): Option[] {
    let options = []

    // Loop through options and set selected
    const opts = this.select.childNodes as any as (HTMLOptGroupElement | HTMLOptionElement)[]
    for (const o of opts) {
      if (o.nodeName === 'OPTGROUP') {
        const optgroupOptions = o.childNodes as any as HTMLOptionElement[]
        for (const oo of optgroupOptions) {
          if (oo.nodeName === 'OPTION') {
            const option = oo as HTMLOptionElement
            if (option.selected) {
              options.push(this.getDataFromOption(option))
            }
          }
        }
      }

      if (o.nodeName === 'OPTION') {
        const option = o as HTMLOptionElement
        if (option.selected) {
          options.push(this.getDataFromOption(option))
        }
      }
    }

    return options
  }

  public getSelectedValues(): string[] {
    return this.getSelectedOptions().map((option) => option.value)
  }

  public setSelected(ids: string[]): void {
    // Stop listening to changes
    this.changeListen(false)

    // Loop through options and set selected
    const options = this.select.childNodes as any as (HTMLOptGroupElement | HTMLOptionElement)[]
    for (const o of options) {
      if (o.nodeName === 'OPTGROUP') {
        const optgroup = o as HTMLOptGroupElement
        const optgroupOptions = optgroup.childNodes as any as HTMLOptionElement[]
        for (const oo of optgroupOptions) {
          if (oo.nodeName === 'OPTION') {
            const option = oo as HTMLOptionElement
            option.selected = ids.includes(option.id)
          }
        }
      }

      if (o.nodeName === 'OPTION') {
        const option = o as HTMLOptionElement
        option.selected = ids.includes(option.id)
      }
    }

    // Stop listening to changes
    this.changeListen(true)
  }

  // Set selected options by value instead of id
  // This is useful when the id is not known
  // and only the value is known
  // but the value is not unique and can be duplicated
  public setSelectedByValue(values: string[]): void {
    // Stop listening to changes
    this.changeListen(false)

    // Loop through options and set selected
    const options = this.select.childNodes as any as (HTMLOptGroupElement | HTMLOptionElement)[]
    for (const o of options) {
      if (o.nodeName === 'OPTGROUP') {
        const optgroup = o as HTMLOptGroupElement
        const optgroupOptions = optgroup.childNodes as any as HTMLOptionElement[]
        for (const oo of optgroupOptions) {
          if (oo.nodeName === 'OPTION') {
            const option = oo as HTMLOptionElement
            option.selected = values.includes(option.value)
          }
        }
      }

      if (o.nodeName === 'OPTION') {
        const option = o as HTMLOptionElement
        option.selected = values.includes(option.value)
      }
    }

    // Stop listening to changes
    this.changeListen(true)
  }

  public updateSelect(id?: string, style?: string, classes?: string[]): void {
    // Stop listening to changes
    this.changeListen(false)

    // Update id, only if the id isnt already set
    if (id) {
      this.select.dataset.id = id
    }

    // Update style
    if (style) {
      this.select.style.cssText = style
    }

    // Update classes
    if (classes) {
      this.select.className = ''
      classes.forEach((c) => {
        if (c.trim() !== '') {
          this.select.classList.add(c.trim())
        }
      })
    }

    // Start listening to changes
    this.changeListen(true)
  }

  public updateOptions(data: (Option | Optgroup)[]): void {
    // Don't update if data is empty (prevents clearing select when no data)
    if (!data || data.length === 0) {
      return
    }

    // Set updating flag FIRST to prevent mutation observer from processing during update
    // This must be set before stopping listening so any queued mutations see the flag
    this.isUpdating = true
    this.pendingOptionsChange = null

    // Stop listening to changes
    this.changeListen(false)

    // Clear out select
    this.select.innerHTML = ''

    for (const d of data) {
      if (d instanceof Optgroup) {
        this.select.appendChild(this.createOptgroup(d))
      }

      if (d instanceof Option) {
        this.select.appendChild(this.createOption(d))
      }
    }

    // Trigger change event on original select
    this.select.dispatchEvent(new Event('change', { bubbles: true }))

    // Start listening to changes
    this.changeListen(true)

    // Clear updating flag
    this.isUpdating = false

    // Process any pending options change that was queued during the update
    // Only process if it has data (don't process empty data from innerHTML clearing)
    if (this.pendingOptionsChange !== null) {
      const pending: (Option | Optgroup)[] = this.pendingOptionsChange
      if (pending.length > 0 && this.onOptionsChange) {
        this.pendingOptionsChange = null
        // Process the queued change
        this.changeListen(false)
        this.onOptionsChange(pending)
        this.changeListen(true)
      } else {
        // Clear pending if it was empty
        this.pendingOptionsChange = null
      }
    }
  }

  public createOptgroup(optgroup: Optgroup): HTMLOptGroupElement {
    const optgroupEl = document.createElement('optgroup')
    optgroupEl.id = optgroup.id
    optgroupEl.label = optgroup.label
    if (optgroup.selectAll) {
      optgroupEl.dataset.selectAll = 'true'
    }
    if (optgroup.closable !== 'off') {
      optgroupEl.dataset.closable = optgroup.closable
    }
    if (optgroup.options) {
      for (const option of optgroup.options) {
        optgroupEl.appendChild(this.createOption(option as Option))
      }
    }
    return optgroupEl
  }

  public createOption(info: Option): HTMLOptionElement {
    const optionEl = document.createElement('option')
    optionEl.id = info.id
    optionEl.value = info.value
    optionEl.textContent = info.text
    if (info.html !== '') {
      optionEl.setAttribute('data-html', info.html)
    }
    optionEl.defaultSelected = info.defaultSelected
    optionEl.selected = info.selected // Explicitly set selected because defaultSelected: true sets selected to true
    if (info.disabled) {
      optionEl.disabled = true
    }
    if (!info.display) {
      optionEl.style.display = 'none'
    }
    if (info.placeholder) {
      optionEl.setAttribute('data-placeholder', 'true')
    }
    if (info.mandatory) {
      optionEl.setAttribute('data-mandatory', 'true')
    }
    if (info.class) {
      info.class.split(' ').forEach((optionClass: string) => {
        optionEl.classList.add(optionClass)
      })
    }
    if (info.data && typeof info.data === 'object') {
      Object.keys(info.data).forEach((key) => {
        optionEl.setAttribute('data-' + kebabCase(key), info.data[key])
      })
    }

    return optionEl
  }

  // Find and handle labels associated with this select
  public setupLabelHandlers(): void {
    const labels: HTMLLabelElement[] = []

    // Find labels that point to this select via 'for' attribute
    const selectId = this.select.id
    if (selectId) {
      const labelsByFor = document.querySelectorAll<HTMLLabelElement>(`label[for="${selectId}"]`)
      labelsByFor.forEach((label) => labels.push(label))
    }

    // Find labels that wrap this select (label contains select)
    let parent = this.select.parentElement
    while (parent && parent !== document.body) {
      if (parent.tagName === 'LABEL') {
        labels.push(parent as HTMLLabelElement)
        break
      }
      parent = parent.parentElement
    }

    // Remove duplicates
    const uniqueLabels = Array.from(new Set(labels))

    uniqueLabels.forEach((label) => {
      // Skip if already handled
      if ((label as any).__slimSelectLabelHandler) {
        return
      }

      // Add click handler to label
      const labelClickHandler = (e: MouseEvent) => {
        const target = e.target as HTMLElement

        // Check if click is on SlimSelect UI elements (main div or content)
        const isSlimSelectElement = hasClassInTree(target, this.select.dataset.id!)

        // Prevent default label behavior (focusing the select)
        // This needs to happen for all clicks on the label or its children
        // to prevent the browser from focusing the hidden select
        e.preventDefault()
        // e.stopPropagation() // dont stop propagation

        // Only trigger the toggle if the click is NOT on SlimSelect elements
        // This allows clicking label text/children to toggle, while wrapped SlimSelect handles its own clicks
        if (!isSlimSelectElement && this.onLabelClick) {
          this.onLabelClick()
        }
      }

      // Store the handler on the label for cleanup later
      ;(label as any).__slimSelectLabelHandler = labelClickHandler
      label.addEventListener('click', labelClickHandler, { capture: true, passive: false })
    })
  }

  // Remove label handlers
  public removeLabelHandlers(): void {
    const labels: HTMLLabelElement[] = []

    // Find labels that point to this select via 'for' attribute
    const selectId = this.select.id
    if (selectId) {
      const labelsByFor = document.querySelectorAll<HTMLLabelElement>(`label[for="${selectId}"]`)
      labelsByFor.forEach((label) => labels.push(label))
    }

    // Find labels that wrap this select
    let parent = this.select.parentElement
    while (parent && parent !== document.body) {
      if (parent.tagName === 'LABEL') {
        labels.push(parent as HTMLLabelElement)
        break
      }
      parent = parent.parentElement
    }

    // Remove duplicates
    const uniqueLabels = Array.from(new Set(labels))

    uniqueLabels.forEach((label) => {
      const handler = (label as any).__slimSelectLabelHandler
      if (handler) {
        label.removeEventListener('click', handler, { capture: true })
        delete (label as any).__slimSelectLabelHandler
      }
    })
  }

  public destroy() {
    this.changeListen(false)

    // Remove event change listener
    this.select.removeEventListener('change', this.valueChange)

    // Remove event listeners that prevent native select behavior
    if (this.preventNativeSelect) {
      this.select.removeEventListener('click', this.preventNativeSelect, { capture: true })
      this.preventNativeSelect = null
    }
    if (this.preventNativeSelectMousedown) {
      this.select.removeEventListener('mousedown', this.preventNativeSelectMousedown, { capture: true })
      this.preventNativeSelectMousedown = null
    }
    if (this.preventNativeSelectFocus) {
      this.select.removeEventListener('focus', this.preventNativeSelectFocus, { capture: true })
      this.preventNativeSelectFocus = null
    }

    // Disconnect observer and null
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }

    // Remove label handlers
    this.removeLabelHandlers()

    // Remove dataset id from original select
    delete this.select.dataset.id

    // Show the original select
    this.showUI()
  }
}
