import { debounce, shouldUseModalView } from './helpers'
import {
  CONTENT_PANEL_TRANSITION_PROPERTIES,
  getAnimationDuration,
  getAnimationTimeout,
  waitForAnimationEnd,
  waitForTransitionEnd
} from './animations'
import Settings from './settings'
import Store, { Optgroup, Option } from './store'
import CssClasses from './classes'

export interface Callbacks {
  open: () => void
  close: () => void
  addable?: (
    value: string
  ) =>
    | Promise<Partial<Option> | string>
    | Partial<Option>
    | string
    | false
    | undefined
    | null
    | Error
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
  status: HTMLDivElement
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

export interface ModalElements {
  overlay: HTMLDivElement
  dialog: HTMLDivElement
  closeButton: HTMLButtonElement
  title: HTMLDivElement | null
}

export default class Render {
  public settings: Settings
  public store: Store
  public callbacks: Callbacks

  // Used to compute the range selection
  private lastSelectedOption: Option | null
  private lastRenderedOptions: Option[]
  private optionsListIsFullData = false
  private lastSearchFilterTerm = ''

  // Timeout tracking for cleanup

  // Elements
  public main: Main
  public content: Content

  // Classes
  public classes: CssClasses

  private positionObserver: ResizeObserver | null = null
  private positionObserverRaf = 0

  private modalElements: ModalElements | null = null
  private modalSessionActive: boolean | null = null
  private bodyScrollLocked = false
  private savedBodyOverflow = ''

  constructor(
    settings: Required<Settings>,
    classes: Required<CssClasses>,
    store: Store,
    callbacks: Callbacks
  ) {
    this.store = store
    this.settings = settings
    this.classes = classes
    this.callbacks = callbacks
    this.lastSelectedOption = null
    this.lastRenderedOptions = []

    this.main = this.mainDiv()
    this.content = this.contentDiv()

    // Add classes and styles to main/content
    this.updateClassStyles()
    this.updateAriaAttributes()

    // Position content off-screen initially to prevent scrollbars
    // This must be after updateClassStyles() since it removes all style attributes
    // The main element isn't in the DOM yet, so getBoundingClientRect() would return zeros
    // Once opened, moveContent() will position it correctly
    if (this.settings.contentPosition !== 'relative') {
      this.content.main.style.top = '-9999px'
      this.content.main.style.left = '-9999px'
      this.content.main.style.margin = '0'
      this.content.main.style.width = 'auto'
    }

    // Add content to the content location settings
    if (this.settings.contentLocation) {
      this.settings.contentLocation.appendChild(this.content.main)
    }

    if (this.settings.modal !== 'off' && !this.settings.alwaysOpen) {
      this.modalElements = this.createModalElements()
      document.body.appendChild(this.modalElements.overlay)
    }
  }

  // Helper method to add classes that may contain spaces
  // Splits by spaces and adds each class individually to avoid DOMException
  public addClasses(
    element: HTMLElement | SVGElement,
    classValue: string
  ): void {
    if (!classValue || classValue.trim() === '') {
      return
    }
    const classes = classValue.split(' ').filter((c) => c.trim() !== '')
    for (const cls of classes) {
      element.classList.add(cls.trim())
    }
  }

  // Helper method to remove classes that may contain spaces
  public removeClasses(
    element: HTMLElement | SVGElement,
    classValue: string
  ): void {
    if (!classValue || classValue.trim() === '') {
      return
    }
    const classes = classValue.split(' ').filter((c) => c.trim() !== '')
    for (const cls of classes) {
      element.classList.remove(cls.trim())
    }
  }

  // Remove disabled classes
  public enable(): void {
    // Remove disabled class
    this.removeClasses(this.main.main, this.classes.disabled)
    this.main.main.setAttribute('aria-disabled', 'false')

    // Set search input to "enabled"
    this.content.search.input.disabled = false
  }

  // Set disabled classes
  public disable(): void {
    // Add disabled class
    this.addClasses(this.main.main, this.classes.disabled)
    this.main.main.setAttribute('aria-disabled', 'true')

    // Set search input to disabled
    this.content.search.input.disabled = true
  }

  public open(): void {
    this.main.arrow.path.setAttribute('d', this.classes.arrowOpen)
    this.main.main.setAttribute('aria-expanded', 'true')

    const useModal = this.resolveModalView()

    if (!useModal) {
      const isAbove = this.settings.openPosition === 'up'
      const dirClass = isAbove ? this.classes.dirAbove : this.classes.dirBelow
      this.addClasses(this.main.main, dirClass)
      this.addClasses(this.content.main, dirClass)
    }

    // Add open class to content to trigger open animation
    this.addClasses(this.content.main, this.classes.contentOpen)

    // Make search visible to screen readers when opened
    this.content.search.input.removeAttribute('aria-hidden')

    if (useModal) {
      this.showModal()
    } else {
      this.moveContent()
    }

    // Move to last selected option
    const selectedOptions = this.store.getSelectedOptions()
    if (selectedOptions.length) {
      const selectedId = selectedOptions[selectedOptions.length - 1].id
      const selectedOption = this.content.list.querySelector(
        '[data-id="' + selectedId + '"]'
      ) as HTMLElement
      if (selectedOption) {
        this.ensureElementInView(this.content.list, selectedOption)
      }
    }
  }

  public isModalViewActive(): boolean {
    return this.modalSessionActive === true
  }

  private resolveModalView(): boolean {
    if (
      this.settings.alwaysOpen ||
      this.settings.modal === 'off' ||
      !this.modalElements
    ) {
      return false
    }

    if (this.modalSessionActive === null) {
      this.modalSessionActive = shouldUseModalView(this.settings.modal)
    }

    return this.modalSessionActive
  }

  private createModalElements(): ModalElements {
    const overlay = document.createElement('div')
    this.addClasses(overlay, this.classes.modalOverlay)
    this.addClasses(overlay, this.classes.hide)
    overlay.dataset.id = this.settings.id

    const dialog = document.createElement('div')
    this.addClasses(dialog, this.classes.modalDialog)
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-modal', 'true')

    let title: HTMLDivElement | null = null
    if (this.settings.modalTitle) {
      title = document.createElement('div')
      this.addClasses(title, this.classes.modalTitle)
      title.id = `${this.settings.id}-modal-title`
      title.textContent = this.settings.modalTitle
      dialog.setAttribute('aria-labelledby', title.id)
    } else {
      dialog.setAttribute('aria-label', this.settings.ariaLabel)
    }

    const closeButton = document.createElement('button')
    closeButton.type = 'button'
    this.addClasses(closeButton, this.classes.modalClose)
    closeButton.setAttribute('aria-label', 'Close')
    closeButton.onclick = (e: Event) => {
      e.stopPropagation()
      this.callbacks.close()
    }

    const closeSvg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )
    closeSvg.setAttribute('viewBox', '0 0 100 100')
    const closePath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    closePath.setAttribute('d', this.classes.deselectPath)
    closeSvg.appendChild(closePath)
    closeButton.appendChild(closeSvg)

    overlay.onclick = (e: Event) => {
      if (e.target === overlay) {
        this.callbacks.close()
      }
    }

    if (title) {
      dialog.appendChild(title)
    }
    overlay.appendChild(dialog)

    return { overlay, dialog, closeButton, title }
  }

  private showModal(): void {
    if (!this.modalElements) {
      return
    }

    this.modalElements.dialog.appendChild(this.content.main)
    this.addClasses(this.content.main, this.classes.modalContent)
    this.content.main.appendChild(this.modalElements.closeButton)
    this.content.main.style.top = ''
    this.content.main.style.left = ''
    this.content.main.style.margin = ''
    this.content.main.style.width = ''

    this.removeClasses(this.modalElements.overlay, this.classes.hide)
    requestAnimationFrame(() => {
      if (!this.modalElements) {
        return
      }
      this.addClasses(this.modalElements.overlay, this.classes.contentOpen)
    })

    this.lockBodyScroll()
  }

  private lockBodyScroll(): void {
    if (this.bodyScrollLocked) {
      return
    }

    this.savedBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    this.bodyScrollLocked = true
  }

  private unlockBodyScroll(): void {
    if (!this.bodyScrollLocked) {
      return
    }

    document.body.style.overflow = this.savedBodyOverflow
    this.bodyScrollLocked = false
    this.savedBodyOverflow = ''
  }

  private restoreContentOffscreen(): void {
    if (this.settings.contentLocation) {
      this.settings.contentLocation.appendChild(this.content.main)
    }

    if (this.settings.contentPosition !== 'relative') {
      this.content.main.style.top = '-9999px'
      this.content.main.style.left = '-9999px'
      this.content.main.style.margin = '0'
      this.content.main.style.width = 'auto'
    }
  }

  /** Tear down modal shell after close animation completes. */
  public finalizeModalClose(): void {
    if (!this.modalElements) {
      return
    }

    if (this.content.main.parentElement !== this.modalElements.dialog) {
      return
    }

    this.addClasses(this.modalElements.overlay, this.classes.hide)
    this.removeClasses(this.modalElements.overlay, this.classes.contentOpen)
    this.removeClasses(this.content.main, this.classes.modalContent)
    this.restoreContentOffscreen()
    this.unlockBodyScroll()
  }

  /** Used by Lifecycle — wait for .ss-content CSS transition before afterOpen/afterClose. */
  public waitForAnimation(
    phase: 'open' | 'close',
    signal?: AbortSignal
  ): Promise<void> {
    const timeout = getAnimationTimeout(
      this.content.main,
      this.settings.timeoutDelay
    )
    return waitForTransitionEnd(
      this.content.main,
      CONTENT_PANEL_TRANSITION_PROPERTIES,
      timeout,
      signal
    )
  }

  public close(): void {
    this.main.main.setAttribute('aria-expanded', 'false')
    this.main.arrow.path.setAttribute('d', this.classes.arrowClose)

    const wasModal = this.modalSessionActive === true

    // Remove open class from content to trigger close animation
    // Direction on content persists for transform-origin during the panel animation
    this.removeClasses(this.content.main, this.classes.contentOpen)

    if (!wasModal) {
      this.removeClasses(this.main.main, this.classes.dirAbove)
      this.removeClasses(this.main.main, this.classes.dirBelow)
    }

    if (wasModal && this.modalElements) {
      this.removeClasses(this.modalElements.overlay, this.classes.contentOpen)
    }

    this.modalSessionActive = null

    // Hide search from screen readers when closed
    this.content.search.input.setAttribute('aria-hidden', 'true')

    // Clear active descendant when closed
    this.main.main.removeAttribute('aria-activedescendant')
  }

  /** Remove open-direction classes after close animation (lifecycle afterClose). */
  public clearDirectionClasses(): void {
    this.removeClasses(this.main.main, this.classes.dirAbove)
    this.removeClasses(this.main.main, this.classes.dirBelow)
    this.removeClasses(this.content.main, this.classes.dirAbove)
    this.removeClasses(this.content.main, this.classes.dirBelow)
  }

  public updateClassStyles(): void {
    // Clear all classes and styles
    this.main.main.className = ''
    this.main.main.removeAttribute('style')
    this.content.main.className = ''
    this.content.main.removeAttribute('style')

    // Make sure main/content has its base class
    this.addClasses(this.main.main, this.classes.main)
    this.addClasses(this.content.main, this.classes.content)

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
    if (
      this.settings.contentPosition === 'relative' ||
      this.settings.contentPosition === 'fixed'
    ) {
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
    this.content.list.setAttribute(
      'aria-label',
      this.settings.ariaLabel + ' listbox'
    )

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
          const highlighted = this.content.list.querySelector(
            '.' + this.classes.getFirst('highlighted')
          ) as HTMLDivElement
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
    this.addClasses(values, this.classes.values)
    main.appendChild(values)

    // Add deselect
    const deselect = document.createElement('div')
    this.addClasses(deselect, this.classes.deselect)
    deselect.setAttribute('role', 'button')
    deselect.setAttribute('aria-label', this.settings.deselectText)
    deselect.setAttribute('tabindex', '0')

    // Check if deselect is to be shown or not
    const selectedOptions = this.store?.getSelectedOptions()
    if (
      !this.settings.allowDeselect ||
      (this.settings.isMultiple &&
        selectedOptions &&
        selectedOptions.length <= 0) ||
      this.isAtMinSelected()
    ) {
      this.addClasses(deselect, this.classes.hide)
    } else {
      this.removeClasses(deselect, this.classes.hide)
    }

    // Add deselect onclick event
    deselect.onclick = (e: Event) => {
      e.stopPropagation()

      // Dont do anything if disabled
      if (this.settings.disabled) {
        return
      }

      if (this.settings.isMultiple && this.isAtMinSelected()) {
        return
      }

      // By Default we will delete
      let shouldDelete = true
      const before = this.store.getSelectedOptions()
      let after = [] as Option[]
      let newSelectedIds: string[] | string = ''

      if (this.settings.isMultiple) {
        const min = this.settings.minSelected
        const currentIds = this.store.getSelected()

        if (min > 0 && currentIds.length > min) {
          newSelectedIds = this.getMinimumSelectionIds()
          after = before.filter((o) => newSelectedIds.includes(o.id))
        } else if (min <= 0) {
          newSelectedIds = []
        } else {
          return
        }
      }

      // Add beforeChange callback
      if (this.callbacks.beforeChange) {
        shouldDelete = this.callbacks.beforeChange(after, before) === true
      }

      if (shouldDelete) {
        if (this.settings.isMultiple) {
          this.callbacks.setSelected(newSelectedIds, false)
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

    deselect.onkeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        deselect.click()
      }
    }

    // Add deselect svg
    const deselectSvg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )
    deselectSvg.setAttribute('viewBox', '0 0 100 100')
    const deselectPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    deselectPath.setAttribute('d', this.classes.deselectPath)
    deselectSvg.appendChild(deselectPath)
    deselect.appendChild(deselectSvg)
    main.appendChild(deselect)

    // Add arrow
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.addClasses(arrow, this.classes.arrow)
    arrow.setAttribute('viewBox', '0 0 100 100')
    const arrowPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    )
    arrowPath.setAttribute('d', this.classes.arrowClose)
    if (this.settings.alwaysOpen) {
      this.addClasses(arrow, this.classes.hide)
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
    const placeholderOption = this.store.filter(
      (o) => o.placeholder,
      false,
      false
    ) as Option[]

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
    this.addClasses(placeholder, this.classes.placeholder)
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
    }, false, false) as Option[]
    const selectedSingle = selected.length > 0 ? selected[0] : null

    // If nothing is seleected use settings placeholder text
    if (!selectedSingle) {
      this.main.values.innerHTML = this.placeholder().outerHTML
    } else {
      // Create single value container
      const singleValue = document.createElement('div')
      this.addClasses(singleValue, this.classes.single)
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
      this.addClasses(this.main.deselect.main, this.classes.hide)
    } else {
      this.removeClasses(this.main.deselect.main, this.classes.hide)
    }
  }

  private renderMultipleValues(): void {
    // Get various pieces of data
    let currentNodes = this.main.values.childNodes as NodeListOf<HTMLDivElement>
    let selectedOptions = this.store.filter((opt: Option) => {
      // Only grab options that are selected and display is true
      return opt.selected && opt.display
    }, false, false) as Option[]

    // If selectedOptions is empty set placeholder
    if (selectedOptions.length === 0) {
      this.main.values.innerHTML = this.placeholder().outerHTML
      return
    } else {
      // If there is a placeholder, remove it
      const placeholder = this.main.values.querySelector(
        '.' + this.classes.getFirst('placeholder')
      )
      if (placeholder) {
        placeholder.remove()
      }
    }

    // If multiString is enabled, render a single text element containing the
    // selected values joined by commas instead of individual value pills.
    // CSS truncates the text with an ellipsis when it exceeds the container width.
    if (this.settings.multiString) {
      let commaOptions = selectedOptions
      if (this.settings.keepOrder) {
        commaOptions = this.store.selectedOrderOptions(commaOptions)
      }

      const commaValue = document.createElement('div')
      this.addClasses(commaValue, this.classes.multiString)
      commaValue.textContent = commaOptions
        .map((o: Option) => o.text)
        .join(', ')

      if (this.settings.showOptionTooltips) {
        commaValue.setAttribute('title', commaValue.textContent)
      }

      this.main.values.innerHTML = commaValue.outerHTML
      return
    }

    // If selectedOptions is greater than maxItems, set maxValuesMessage
    if (selectedOptions.length > this.settings.maxValuesShown) {
      // Creating the element that shows the number of selected items
      const singleValue = document.createElement('div')
      this.addClasses(singleValue, this.classes.max)
      singleValue.textContent = this.settings.maxValuesMessage.replace(
        '{number}',
        selectedOptions.length.toString()
      )

      // If there is a selected value, set a single div
      this.main.values.innerHTML = singleValue.outerHTML
      return
    } else {
      // If there is a message, remove it
      const maxValuesMessage = this.main.values.querySelector(
        '.' + this.classes.getFirst('max')
      )
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

    const animationDuration = getAnimationTimeout(
      this.content.main,
      this.settings.timeoutDelay
    )

    // Loop through and remove
    for (const n of removeNodes) {
      this.addClasses(n, this.classes.valueOut)
      void waitForAnimationEnd(n, 'ss-valueOut', animationDuration).then(() => {
        if (this.main.values.hasChildNodes() && this.main.values.contains(n)) {
          this.main.values.removeChild(n)
        }
      })
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
            this.main.values.insertBefore(
              this.multipleValue(selectedOptions[d]),
              currentNodes[d]
            )
          } else {
            currentNodes[d - 1].insertAdjacentElement(
              'afterend',
              this.multipleValue(selectedOptions[d])
            )
          }
        }
      }
    }

    this.updateMultipleValueDeleteVisibility()
  }

  private isAtMinSelected(): boolean {
    return (
      this.settings.isMultiple &&
      this.settings.minSelected > 0 &&
      this.store.getSelectedOptions().length <= this.settings.minSelected
    )
  }

  private getMinimumSelectionIds(): string[] {
    let selected = this.store.getSelectedOptions()
    if (this.settings.keepOrder) {
      selected = this.store.selectedOrderOptions(selected)
    }

    return selected
      .slice(0, this.settings.minSelected)
      .map((option) => option.id)
  }

  private updateMultipleValueDeleteVisibility(): void {
    if (!this.settings.isMultiple || this.settings.multiString) {
      return
    }

    const canRemove = !this.isAtMinSelected()
    const deleteButtons = this.main.values.querySelectorAll(
      '.' + this.classes.getFirst('valueDelete')
    )

    for (const deleteButton of deleteButtons) {
      if (canRemove) {
        this.removeClasses(deleteButton as HTMLElement, this.classes.hide)
      } else {
        this.addClasses(deleteButton as HTMLElement, this.classes.hide)
      }
    }
  }

  public multipleValue(option: Option): HTMLDivElement {
    const value = document.createElement('div')
    this.addClasses(value, this.classes.value)
    value.dataset.id = option.id

    const text = document.createElement('div')
    this.addClasses(text, this.classes.valueText)
    text.textContent = option.text // For multiple values always use text
    value.appendChild(text)

    // Only add deletion if the option is not mandatory
    if (!option.mandatory) {
      // Create delete div element
      const deleteDiv = document.createElement('div')
      this.addClasses(deleteDiv, this.classes.valueDelete)
      deleteDiv.setAttribute('tabindex', '0') // Make the div focusable for tab navigation
      deleteDiv.setAttribute('role', 'button')
      deleteDiv.setAttribute(
        'aria-label',
        `${this.settings.removeText} ${option.text}`
      )

      if (this.isAtMinSelected()) {
        this.addClasses(deleteDiv, this.classes.hide)
      }

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
        if (
          this.settings.minSelected &&
          after.length < this.settings.minSelected
        ) {
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
                if (c.id) {
                  selectedIds.push(c.id)
                }
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
          this.updateMultipleValueDeleteVisibility()
        }
      }

      // Add delete svg
      const deleteSvg = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      )
      deleteSvg.setAttribute('viewBox', '0 0 100 100')
      const deletePath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      )
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

    // Screen reader announcements for search result updates
    const status = document.createElement('div')
    this.addClasses(status, this.classes.status)
    status.setAttribute('aria-live', 'polite')
    status.setAttribute('aria-atomic', 'true')
    status.setAttribute('role', 'status')
    main.appendChild(status)

    // Add list
    const list = this.listDiv()
    main.appendChild(list)

    return {
      main: main,
      search: search,
      status: status,
      list: list
    }
  }

  private announce(message: string): void {
    if (!this.settings.showSearch) {
      return
    }

    this.content.status.textContent = message
  }

  public moveContent(): void {
    if (this.isModalViewActive()) {
      return
    }

    if (this.settings.contentPosition === 'relative') {
      this.moveContentBelow()
      return
    }

    if (this.settings.openPosition === 'down') {
      this.moveContentBelow()
      return
    } else if (this.settings.openPosition === 'up') {
      this.moveContentAbove()
      return
    }

    if (this.putContent() === 'up') {
      this.moveContentAbove()
    } else {
      this.moveContentBelow()
    }
  }

  /** Track trigger/content layout changes and reposition the dropdown panel. */
  public startPositionTracking(): void {
    if (this.settings.contentPosition !== 'absolute' || this.isModalViewActive()) {
      return
    }

    this.stopPositionTracking()

    if (typeof ResizeObserver === 'undefined') {
      return
    }

    this.positionObserver = new ResizeObserver(() => {
      if (!this.settings.isOpen) {
        return
      }

      cancelAnimationFrame(this.positionObserverRaf)
      this.positionObserverRaf = requestAnimationFrame(() => {
        this.moveContent()
      })
    })

    this.observePositionTargets()
  }

  public stopPositionTracking(): void {
    cancelAnimationFrame(this.positionObserverRaf)
    this.positionObserver?.disconnect()
    this.positionObserver = null
  }

  private observePositionTargets(): void {
    if (!this.positionObserver) {
      return
    }

    const observed = new Set<Element>()
    const observe = (el: Element | null): void => {
      if (!el || observed.has(el)) {
        return
      }

      observed.add(el)
      this.positionObserver!.observe(el)
    }

    observe(this.main.main)
    observe(this.content.main)

    let parent: HTMLElement | null = this.main.main.parentElement
    const stopAt = this.settings.contentLocation

    for (let depth = 0; parent && depth < 8; depth++) {
      observe(parent)
      if (parent === stopAt) {
        break
      }
      parent = parent.parentElement
    }
  }

  public searchDiv(): Search {
    const main = document.createElement('div')
    const input = document.createElement('input')
    const addable = document.createElement('div')
    this.addClasses(main, this.classes.search)

    // Setup search return object
    const searchReturn: Search = {
      main,
      input
    }

    // We still want the search to be tabable but not shown
    if (!this.settings.showSearch) {
      this.addClasses(main, this.classes.hide)
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
          const highlighted = this.content.list.querySelector(
            '.' + this.classes.getFirst('highlighted')
          ) as HTMLDivElement
          if (highlighted) {
            highlighted.click()
            return false
          }
          return true
        case 'Enter':
          // Check if there's a highlighted option first
          const highlightedEnter = this.content.list.querySelector(
            '.' + this.classes.getFirst('highlighted')
          ) as HTMLDivElement
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
      this.addClasses(addable, this.classes.addable)

      // Add svg icon
      const plus = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      plus.setAttribute('viewBox', '0 0 100 100')
      const plusPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      )
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
        const runFinish = (oo: Partial<Option>) => {
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
            const animationDuration = getAnimationDuration(this.content.main)
            setTimeout(() => {
              this.callbacks.close()
            }, animationDuration)
          }
        }

        // Call addable callback
        const addableValue = this.callbacks.addable(inputValue)

        // If addableValue is false, undefined or null, do nothing
        if (
          addableValue === false ||
          addableValue === undefined ||
          addableValue === null
        ) {
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
    this.content.search.input.focus({ preventScroll: true })
  }

  public getOptions(
    notPlaceholder = false,
    notDisabled = false,
    notHidden = false
  ): HTMLDivElement[] {
    // Put together query string
    let query = '.' + this.classes.getFirst('option')
    if (notPlaceholder) {
      query += ':not(.' + this.classes.getFirst('placeholder') + ')'
    }
    if (notDisabled) {
      query += ':not(.' + this.classes.getFirst('disabled') + ')'
    }
    if (notHidden) {
      query += ':not(.' + this.classes.getFirst('hide') + ')'
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
      if (
        !options[0].classList.contains(this.classes.getFirst('highlighted'))
      ) {
        this.addClasses(options[0], this.classes.highlighted)
        return
      }
    }

    // Loop through options and see if there are no highlighted ones
    let highlighted = false
    for (const o of options) {
      if (o.classList.contains(this.classes.getFirst('highlighted'))) {
        highlighted = true
      }
    }

    // If no highlighted, see if any are selected and if so highlight selected first one
    if (!highlighted) {
      for (const o of options) {
        if (o.classList.contains(this.classes.getFirst('selected'))) {
          this.addClasses(o, this.classes.highlighted)
          break
        }
      }
    }

    // Loop through options and find the highlighted one
    for (let i = 0; i < options.length; i++) {
      // Found highlighted option
      if (options[i].classList.contains(this.classes.getFirst('highlighted'))) {
        const prevOption = options[i]
        // Remove highlighted class from current one
        this.removeClasses(prevOption, this.classes.highlighted)

        // If previous option has parent classes ss-optgroup with ss-open then click it
        const prevParent = prevOption.parentElement
        if (
          prevParent &&
          prevParent.classList.contains(this.classes.getFirst('mainOpen'))
        ) {
          const optgroupLabel = prevParent.querySelector(
            '.' + this.classes.getFirst('optgroupLabel')
          ) as HTMLDivElement
          if (optgroupLabel) {
            optgroupLabel.click()
          }
        }

        // Highlight the next one
        let selectOption =
          options[
            dir === 'down'
              ? i + 1 < options.length
                ? i + 1
                : 0
              : i - 1 >= 0
                ? i - 1
                : options.length - 1
          ]
        this.addClasses(selectOption, this.classes.highlighted)
        this.ensureElementInView(this.content.list, selectOption)

        // Update aria-activedescendant for screen readers
        if (selectOption.id) {
          this.main.main.setAttribute('aria-activedescendant', selectOption.id)
        }

        // If selected option has parent classes ss-optgroup with ss-close then click it
        const selectParent = selectOption.parentElement
        if (
          selectParent &&
          selectParent.classList.contains(this.classes.getFirst('close'))
        ) {
          const optgroupLabel = selectParent.querySelector(
            '.' + this.classes.getFirst('optgroupLabel')
          ) as HTMLDivElement
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
    this.addClasses(firstHighlight, this.classes.highlighted)

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
    this.addClasses(options, this.classes.list)

    // Add id for ARIA controls reference
    const listId = this.settings.id + '-list'
    options.id = listId
    options.dataset.id = listId

    return options
  }

  public renderError(error: string) {
    this.optionsListIsFullData = false
    // Clear out innerHtml
    this.content.list.innerHTML = ''

    const errorDiv = document.createElement('div')
    this.addClasses(errorDiv, this.classes.error)
    errorDiv.textContent = error
    this.content.list.appendChild(errorDiv)
  }

  public renderSearching() {
    this.optionsListIsFullData = false
    // Clear out innerHtml
    this.content.list.innerHTML = ''

    const searchingDiv = document.createElement('div')
    this.addClasses(searchingDiv, this.classes.searching)
    searchingDiv.textContent = this.settings.searchingText
    this.content.list.appendChild(searchingDiv)
    this.announce(this.settings.searchingText)
  }

  // Take in data and add options to
  public renderOptions(data: (Option | Optgroup)[]): void {
    this.lastSearchFilterTerm = ''
    this.lastRenderedOptions = data
      .map((o) =>
        o instanceof Option ? [o] : o.options.map((po) => new Option(po))
      )
      .flat()

    // Clear out innerHtml
    this.content.list.innerHTML = ''

    // If no results show no results text
    if (data.length === 0) {
      this.optionsListIsFullData = false
      const noResults = document.createElement('div')
      this.addClasses(noResults, this.classes.search)

      //
      if (this.callbacks.addable) {
        const addableMessage = this.settings.addableText.replace(
          '{value}',
          this.content.search.input.value
        )
        noResults.innerHTML = addableMessage
        this.announce(addableMessage)
      } else {
        noResults.innerHTML = this.settings.searchText
        this.announce(this.settings.searchText)
      }
      this.content.list.appendChild(noResults)
      return
    }

    // If settings has allowDeselect and isSingle, add empty placeholder in the event they want to deselect
    if (this.settings.allowDeselect && !this.settings.isMultiple) {
      // Check if store options have a placeholder
      const placeholderOption = this.store.filter(
        (o) => o.placeholder,
        false,
        false
      ) as Option[]
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
        this.addClasses(optgroupEl, this.classes.optgroup)

        // Create label
        const optgroupLabel = document.createElement('div')
        this.addClasses(optgroupLabel, this.classes.optgroupLabel)
        optgroupEl.appendChild(optgroupLabel)

        // Create label text div element
        const optgroupLabelText = document.createElement('div')
        this.addClasses(optgroupLabelText, this.classes.optgroupLabelText)
        optgroupLabelText.textContent = d.label
        optgroupLabel.appendChild(optgroupLabelText)

        // Create options container
        const optgroupActions = document.createElement('div')
        this.addClasses(optgroupActions, this.classes.optgroupActions)
        optgroupLabel.appendChild(optgroupActions)

        // If selectByGroup is true and isMultiple then add click event to label
        if (this.settings.isMultiple && d.selectAll) {
          // Create new div to hold a checkbox svg
          const selectAll = document.createElement('div')
          this.addClasses(selectAll, this.classes.optgroupSelectAll)

          // Check options and if all are selected, if so add class selected
          const allSelected = this.isOptgroupAllSelected(d.options as Option[])

          // Add class if all selected
          if (allSelected) {
            this.addClasses(selectAll, this.classes.selected)
          }

          // Add select all text span
          const selectAllLabel = document.createElement('span')
          selectAllLabel.textContent = this.optgroupSelectAllLabel(allSelected)
          selectAll.appendChild(selectAllLabel)

          // Create new svg for checkbox
          const selectAllSvg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
          )
          selectAllSvg.setAttribute('viewBox', '0 0 100 100')
          selectAll.appendChild(selectAllSvg)

          // Create new path for box
          const selectAllBox = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
          )
          selectAllBox.setAttribute('d', this.classes.optgroupSelectAllBox)
          selectAllSvg.appendChild(selectAllBox)

          // Create new path for check
          const selectAllCheck = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
          )
          selectAllCheck.setAttribute('d', this.classes.optgroupSelectAllCheck)
          selectAllSvg.appendChild(selectAllCheck)

          // Add click event listener to select all
          selectAll.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            // Get the store current selected values
            const currentSelected = this.store.getSelected()
            const allSelectedNow = this.isOptgroupAllSelected(
              d.options as Option[],
              new Set(currentSelected)
            )

            // If all selected, remove all options from selected
            if (allSelectedNow) {
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
              let optionIds = d.options
                .map((o) => o.id)
                .filter((id) => id !== undefined)
              const newSelected = currentSelected.concat(optionIds)

              // Loop through options and if they don't exist in the store
              // run addOption callback
              for (const o of d.options) {
                if (o.id && !this.store.getOptionByID(o.id)) {
                  this.callbacks.addOption(new Option(o))
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
          this.addClasses(optgroupClosable, this.classes.optgroupClosable)

          // Create svg arrow
          const optgroupClosableSvg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
          )
          optgroupClosableSvg.setAttribute('viewBox', '0 0 100 100')
          this.addClasses(optgroupClosableSvg, this.classes.arrow)
          optgroupClosable.appendChild(optgroupClosableSvg)

          // Create new path for arrow
          const optgroupClosableArrow = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
          )
          optgroupClosableSvg.appendChild(optgroupClosableArrow)

          // If any options are selected or someone is searching, set optgroup to open
          if (
            d.options.some((o) => o.selected) ||
            this.content.search.input.value.trim() !== ''
          ) {
            this.addClasses(optgroupClosable, this.classes.mainOpen)
            optgroupClosableArrow.setAttribute('d', this.classes.arrowOpen)
          } else if (d.closable === 'open') {
            this.addClasses(optgroupEl, this.classes.mainOpen)
            optgroupClosableArrow.setAttribute('d', this.classes.arrowOpen)
          } else if (d.closable === 'close') {
            this.addClasses(optgroupEl, this.classes.close)
            optgroupClosableArrow.setAttribute('d', this.classes.arrowClose)
          }

          // Add click event listener to close
          optgroupLabel.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            const isOpen = this.isClosableOptgroupOpen(
              optgroupEl,
              optgroupClosable
            )

            if (!isOpen) {
              this.closeOtherClosableOptgroups(optgroupEl)
              this.removeClasses(optgroupEl, this.classes.close)
              this.removeClasses(optgroupClosable, this.classes.mainOpen)
              this.addClasses(optgroupEl, this.classes.mainOpen)
              optgroupClosableArrow.setAttribute('d', this.classes.arrowOpen)
            } else {
              this.removeClasses(optgroupEl, this.classes.mainOpen)
              this.removeClasses(optgroupClosable, this.classes.mainOpen)
              this.addClasses(optgroupEl, this.classes.close)
              optgroupClosableArrow.setAttribute('d', this.classes.arrowClose)
            }
          })

          // Append close to label
          optgroupActions.appendChild(optgroupClosable)
        }

        // Add optgroup label
        optgroupEl.appendChild(optgroupLabel)

        // Loop through options
        for (const option of d.options) {
          optgroupEl.appendChild(this.option(new Option(option)))
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
    this.setOptionsListFullData(data)
    this.announce(
      this.settings.resultsText.replace(
        '{count}',
        String(this.lastRenderedOptions.length)
      )
    )
  }

  /** True when the list DOM contains every store option (local search can show/hide in place). */
  public canFilterOptionsInPlace(): boolean {
    if (!this.optionsListIsFullData) {
      return false
    }

    return (
      this.content.list.querySelector(
        '.' + this.classes.getFirst('option')
      ) !== null
    )
  }

  public resetSearchFilterState(): void {
    this.lastSearchFilterTerm = ''
  }

  /** Filter visible options by search without rebuilding the list. */
  public filterOptionsInPlace(
    search: string,
    searchFilter: (opt: Option, search: string) => boolean
  ): void {
    const searchTrim = search.trim()
    if (searchTrim === this.lastSearchFilterTerm) {
      return
    }
    this.lastSearchFilterTerm = searchTrim

    const visibleOptions: Option[] = []
    const optionEls = this.content.list.querySelectorAll(
      '.' + this.classes.getFirst('option')
    ) as NodeListOf<HTMLDivElement>

    for (const optionEl of optionEls) {
      const id = optionEl.dataset.id
      if (!id) {
        continue
      }

      const storeOption = this.store.getOptionByID(id)
      if (!storeOption) {
        continue
      }

      const isPermanentlyHidden =
        storeOption.placeholder ||
        !storeOption.display ||
        (storeOption.selected && this.settings.hideSelected)

      const matchesSearch = searchFilter(storeOption, searchTrim)

      if (isPermanentlyHidden || !matchesSearch) {
        this.addClasses(optionEl, this.classes.hide)
        this.removeClasses(optionEl, this.classes.highlighted)
      } else {
        this.removeClasses(optionEl, this.classes.hide)
        this.setOptionElementContent(optionEl, storeOption, searchTrim)
        visibleOptions.push(storeOption)
      }

      if (storeOption.selected) {
        this.addClasses(optionEl, this.classes.selected)
        optionEl.setAttribute('aria-selected', 'true')
      } else {
        this.removeClasses(optionEl, this.classes.selected)
        optionEl.setAttribute('aria-selected', 'false')
      }
    }

    this.lastRenderedOptions = visibleOptions
    this.updateOptgroupVisibilityAfterSearch(searchTrim)

    if (visibleOptions.length === 0) {
      this.updateSearchResultsMessage(0, searchTrim)
    } else {
      this.removeListSearchMessage()
      this.announce(
        this.settings.resultsText.replace(
          '{count}',
          String(visibleOptions.length)
        )
      )
    }

    this.updateOptgroupSelectAllStates()
  }

  private setOptionsListFullData(data: (Option | Optgroup)[]): void {
    const storeOptions = this.store.getDataOptions(false)
    const renderedOptions = data
      .map((o) =>
        o instanceof Option ? [o] : o.options.map((po) => new Option(po))
      )
      .flat()

    if (renderedOptions.length !== storeOptions.length) {
      this.optionsListIsFullData = false
      return
    }

    const storeIds = new Set(storeOptions.map((o) => o.id))
    this.optionsListIsFullData = renderedOptions.every((o) =>
      storeIds.has(o.id)
    )
  }

  private isClosableOptgroupOpen(
    optgroupEl: HTMLElement,
    optgroupClosable: HTMLElement
  ): boolean {
    if (optgroupEl.classList.contains(this.classes.getFirst('close'))) {
      return false
    }

    return (
      optgroupEl.classList.contains(this.classes.getFirst('mainOpen')) ||
      optgroupClosable.classList.contains(this.classes.getFirst('mainOpen'))
    )
  }

  private closeClosableOptgroup(optgroupEl: HTMLElement): void {
    const closable = optgroupEl.querySelector(
      '.' + this.classes.getFirst('optgroupClosable')
    ) as HTMLElement | null
    if (!closable) {
      return
    }

    if (optgroupEl.classList.contains(this.classes.getFirst('close'))) {
      return
    }

    this.removeClasses(optgroupEl, this.classes.mainOpen)
    this.removeClasses(closable, this.classes.mainOpen)
    this.addClasses(optgroupEl, this.classes.close)

    const arrow = closable.querySelector('path')
    if (arrow) {
      arrow.setAttribute('d', this.classes.arrowClose)
    }
  }

  private closeOtherClosableOptgroups(exceptOptgroupEl: HTMLElement): void {
    const optgroups = this.content.list.querySelectorAll(
      '.' + this.classes.getFirst('optgroup')
    )

    for (const optgroupEl of optgroups) {
      if (optgroupEl === exceptOptgroupEl) {
        continue
      }

      this.closeClosableOptgroup(optgroupEl as HTMLElement)
    }
  }

  private updateOptgroupVisibilityAfterSearch(searchTrim: string): void {
    const optgroups = this.content.list.querySelectorAll(
      '.' + this.classes.getFirst('optgroup')
    )

    for (const optgroupEl of optgroups) {
      const optionEls = optgroupEl.querySelectorAll(
        '.' + this.classes.getFirst('option')
      ) as NodeListOf<HTMLDivElement>

      let hasVisibleOption = false
      for (const optionEl of optionEls) {
        if (!optionEl.classList.contains(this.classes.getFirst('hide'))) {
          hasVisibleOption = true
          break
        }
      }

      if (!hasVisibleOption) {
        this.addClasses(optgroupEl as HTMLDivElement, this.classes.hide)
        continue
      }

      this.removeClasses(optgroupEl as HTMLDivElement, this.classes.hide)

      if (searchTrim !== '') {
        this.removeClasses(optgroupEl as HTMLDivElement, this.classes.close)
        this.addClasses(optgroupEl as HTMLDivElement, this.classes.mainOpen)
      }
    }
  }

  private updateSearchResultsMessage(
    visibleCount: number,
    searchTrim: string
  ): void {
    this.removeListSearchMessage()

    if (visibleCount > 0) {
      return
    }

    const noResults = document.createElement('div')
    this.addClasses(noResults, this.classes.search)

    if (this.callbacks.addable) {
      const addableMessage = this.settings.addableText.replace(
        '{value}',
        searchTrim
      )
      noResults.innerHTML = addableMessage
      this.announce(addableMessage)
    } else {
      noResults.innerHTML = this.settings.searchText
      this.announce(this.settings.searchText)
    }

    this.content.list.appendChild(noResults)
  }

  private removeListSearchMessage(): void {
    const messages = this.content.list.querySelectorAll(
      '.' + this.classes.getFirst('search')
    )
    messages.forEach((message) => message.remove())
  }

  private setOptionElementContent(
    optionEl: HTMLDivElement,
    option: Option,
    search: string
  ): void {
    const searchTrim = search.trim()
    if (this.settings.searchHighlight && searchTrim !== '') {
      optionEl.innerHTML = this.highlightText(
        option.html !== '' ? option.html : option.text,
        searchTrim,
        this.classes.searchHighlighter
      )
    } else if (option.html !== '') {
      optionEl.innerHTML = option.html
    } else {
      optionEl.textContent = option.text
    }

    if (this.settings.showOptionTooltips && optionEl.textContent) {
      optionEl.setAttribute('title', optionEl.textContent)
    } else {
      optionEl.removeAttribute('title')
    }
  }

  /** True when option nodes exist in the list (selection can sync without re-searching). */
  public hasRenderedOptions(): boolean {
    return (
      this.content.list.querySelector(
        '.' + this.classes.getFirst('option')
      ) !== null
    )
  }

  /** True when the open list already has options and search is not filtering. */
  public canUpdateOptionSelectionInPlace(): boolean {
    if (this.content.search.input.value.trim() !== '') {
      return false
    }

    return this.hasRenderedOptions()
  }

  /** Sync selected/hidden state on existing option nodes without rebuilding the list. */
  public updateOptionSelection(): void {
    const selectedIds = new Set(this.store.getSelected())
    const optionEls = this.content.list.querySelectorAll(
      '.' + this.classes.getFirst('option')
    ) as NodeListOf<HTMLDivElement>

    let lastSelectedEl: HTMLDivElement | null = null

    for (const optionEl of optionEls) {
      const id = optionEl.dataset.id
      if (!id) {
        continue
      }

      const storeOption = this.store.getOptionByID(id)
      if (!storeOption) {
        continue
      }

      const isSelected = selectedIds.has(id)

      if (isSelected) {
        this.addClasses(optionEl, this.classes.selected)
        optionEl.setAttribute('aria-selected', 'true')
        lastSelectedEl = optionEl
      } else {
        this.removeClasses(optionEl, this.classes.selected)
        optionEl.setAttribute('aria-selected', 'false')
      }

      if (this.settings.hideSelected) {
        if (isSelected) {
          this.addClasses(optionEl, this.classes.hide)
        } else {
          this.removeClasses(optionEl, this.classes.hide)
          if (!storeOption.display) {
            this.addClasses(optionEl, this.classes.hide)
          }
        }
      }
    }

    if (!this.settings.isMultiple && lastSelectedEl) {
      this.main.main.setAttribute('aria-activedescendant', lastSelectedEl.id)
    } else if (!this.settings.isMultiple && selectedIds.size === 0) {
      this.main.main.removeAttribute('aria-activedescendant')
    }

    this.updateOptgroupSelectAllStates()
  }

  private updateOptgroupSelectAllStates(): void {
    if (!this.settings.isMultiple) {
      return
    }

    const selectedIds = new Set(this.store.getSelected())
    const optgroups = this.content.list.querySelectorAll(
      '.' + this.classes.getFirst('optgroup')
    )

    for (const optgroupEl of optgroups) {
      const selectAll = optgroupEl.querySelector(
        '.' + this.classes.getFirst('optgroupSelectAll')
      ) as HTMLDivElement | null

      if (!selectAll) {
        continue
      }

      const optionEls = optgroupEl.querySelectorAll(
        '.' + this.classes.getFirst('option')
      ) as NodeListOf<HTMLDivElement>

      let allSelected = optionEls.length > 0
      for (const optionEl of optionEls) {
        const id = optionEl.dataset.id
        if (!id || !selectedIds.has(id)) {
          allSelected = false
          break
        }
      }

      if (allSelected) {
        this.addClasses(selectAll, this.classes.selected)
      } else {
        this.removeClasses(selectAll, this.classes.selected)
      }

      const selectAllLabel = selectAll.querySelector('span')
      if (selectAllLabel) {
        selectAllLabel.textContent = this.optgroupSelectAllLabel(allSelected)
      }
    }
  }

  private optgroupSelectAllLabel(allSelected: boolean): string {
    return allSelected ? 'Unselect All' : 'Select All'
  }

  private isOptgroupAllSelected(
    options: Option[],
    selectedIds?: Set<string>
  ): boolean {
    if (options.length === 0) {
      return false
    }

    for (const option of options) {
      const isSelected = selectedIds
        ? Boolean(option.id && selectedIds.has(option.id))
        : option.selected

      if (!isSelected) {
        return false
      }
    }

    return true
  }

  // Create option div element
  public option(option: Option): HTMLDivElement {
    // Add hidden placeholder
    if (option.placeholder) {
      const placeholder = document.createElement('div')
      this.addClasses(placeholder, this.classes.option)
      this.addClasses(placeholder, this.classes.hide)
      return placeholder
    }

    // Create option
    const optionEl = document.createElement('div')
    optionEl.dataset.id = option.id // Dataset id for identifying an option
    optionEl.id = this.settings.id + '-' + option.id // Unique ID for ARIA references
    this.addClasses(optionEl, this.classes.option)
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
    this.setOptionElementContent(
      optionEl,
      option,
      this.content.search.input.value
    )

    // If option is disabled
    if (!option.display) {
      this.addClasses(optionEl, this.classes.hide)
    }

    // If allowed to deselect, null onclick and add disabled
    if (option.disabled) {
      this.addClasses(optionEl, this.classes.disabled)
    }

    // If option is selected and hideSelectedOption is true, hide it
    if (option.selected && this.settings.hideSelected) {
      this.addClasses(optionEl, this.classes.hide)
    }

    // If option is selected
    if (option.selected) {
      this.addClasses(optionEl, this.classes.selected)
      optionEl.setAttribute('aria-selected', 'true')
      this.main.main.setAttribute('aria-activedescendant', optionEl.id)
    } else {
      this.removeClasses(optionEl, this.classes.selected)
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
      if (
        !this.settings.isMultiple &&
        option.selected &&
        !this.settings.allowDeselect
      ) {
        return
      }

      // Prevent deselection of mandatory options
      if (option.selected && option.mandatory) {
        return
      }

      // Check limit and do nothing if limit is reached and the option is not selected
      // Also check reverse for min limit and is selected (allow Cmd to bypass minSelected)
      if (
        (this.settings.isMultiple &&
          this.settings.maxSelected <= selectedOptions.length &&
          !option.selected) ||
        (this.settings.isMultiple &&
          this.settings.minSelected >= selectedOptions.length &&
          option.selected &&
          !isCmd)
      ) {
        return
      }

      // Setup variables
      let shouldUpdate = false
      const before = this.store.getSelectedOptions()
      let after = [] as Option[]

      // If multiple - mimic native browser multi-select behavior
      if (this.settings.isMultiple) {
        const isCurrentlySelected = before.some(
          (o: Option) => o.id === elementID
        )
        const isShift = e.shiftKey

        // Shift+Click: Select range from last clicked to current
        if (isShift && this.lastSelectedOption) {
          const options = this.lastRenderedOptions
          const lastIndex = options.findIndex(
            (o: Option) => o.id === this.lastSelectedOption!.id
          )
          const currentIndex = options.findIndex(
            (o: Option) => o.id === option.id
          )

          if (lastIndex >= 0 && currentIndex >= 0) {
            const startIndex = Math.min(lastIndex, currentIndex)
            const endIndex = Math.max(lastIndex, currentIndex)
            const rangeOptions = options.slice(startIndex, endIndex + 1)

            // Check if range would exceed maxSelected
            const newSelections = rangeOptions.filter(
              (opt) => !before.find((b) => b.id === opt.id)
            )
            if (
              before.length + newSelections.length <=
              this.settings.maxSelected
            ) {
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
        const shouldClose =
          this.settings.closeOnSelect &&
          !(this.settings.isMultiple && isModifierKey)

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
    this.stopPositionTracking()

    if (this.modalElements) {
      this.unlockBodyScroll()
      if (this.content.main.parentElement === this.modalElements.dialog) {
        this.restoreContentOffscreen()
      }
      this.modalElements.overlay.remove()
      this.modalElements = null
    }

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
        Array.from(node.childNodes).forEach((child) =>
          highlightTextNodes(child)
        )
      }
    }

    // Process all text nodes in the temporary div
    Array.from(tempDiv.childNodes).forEach((node) => highlightTextNodes(node))

    return tempDiv.innerHTML
  }

  private setContentDirection(direction: 'above' | 'below'): void {
    const isAbove = direction === 'above'
    const addClass = isAbove ? this.classes.dirAbove : this.classes.dirBelow
    const removeClass = isAbove ? this.classes.dirBelow : this.classes.dirAbove

    this.removeClasses(this.main.main, removeClass)
    this.addClasses(this.main.main, addClass)
    this.removeClasses(this.content.main, removeClass)
    this.addClasses(this.content.main, addClass)

    if (isAbove) {
      const mainHeight = this.main.main.offsetHeight
      const contentHeight = this.content.main.offsetHeight
      this.content.main.style.margin =
        '-' + (mainHeight + contentHeight - 1) + 'px 0px 0px 0px'
    } else {
      this.content.main.style.margin = '-1px 0px 0px 0px'
    }
  }

  private setContentPosition(): void {
    if (this.settings.contentPosition === 'relative') {
      return
    }

    const containerRect = this.main.main.getBoundingClientRect()
    let top: number
    let left: number

    if (this.settings.contentPosition === 'fixed') {
      top = containerRect.top + containerRect.height
      left = containerRect.left
    } else {
      top = containerRect.top + window.scrollY + containerRect.height
      left = containerRect.left + window.scrollX
    }

    this.content.main.style.top = top + 'px'
    this.content.main.style.left = left + 'px'

    const cw = this.settings.contentWidth
    this.content.main.style.width = ''
    this.content.main.style.minWidth = ''
    this.content.main.style.maxWidth = ''

    if (!cw) {
      this.content.main.style.width = containerRect.width + 'px'
    } else if (cw.startsWith('>')) {
      this.content.main.style.minWidth = cw.slice(1)
    } else if (cw.startsWith('<')) {
      this.content.main.style.maxWidth = cw.slice(1)
    } else {
      this.content.main.style.width = cw
    }

    const padding = 20
    const viewportRight = window.innerWidth - padding

    const applyOverflowShift = (): void => {
      const contentRect = this.content.main.getBoundingClientRect()
      const contentRight = contentRect.right
      if (contentRight <= viewportRight) return

      const overflow = contentRight - viewportRight
      const currentLeft = parseFloat(this.content.main.style.left) || 0

      if (this.settings.contentPosition === 'fixed') {
        const newLeft = Math.max(padding, currentLeft - overflow)
        this.content.main.style.left = newLeft + 'px'
      } else {
        const newLeft = Math.max(
          window.scrollX + padding,
          currentLeft - overflow
        )
        this.content.main.style.left = newLeft + 'px'
      }
    }

    requestAnimationFrame(() => {
      applyOverflowShift()
      requestAnimationFrame(applyOverflowShift)
    })
  }

  public moveContentAbove(): void {
    this.setContentDirection('above')
    this.setContentPosition()
  }

  public moveContentBelow(): void {
    this.setContentDirection('below')
    this.setContentPosition()
  }

  public ensureElementInView(
    container: HTMLElement,
    element: HTMLElement
  ): void {
    const cTop = container.scrollTop + container.offsetTop
    const cBottom = cTop + container.clientHeight
    const eTop = element.offsetTop
    const eBottom = eTop + element.clientHeight

    if (eTop < cTop) {
      container.scrollTop -= cTop - eTop
    } else if (eBottom > cBottom) {
      container.scrollTop += eBottom - cBottom
    }
  }

  public putContent(): 'up' | 'down' {
    const mainHeight = this.main.main.offsetHeight
    const mainRect = this.main.main.getBoundingClientRect()
    const contentHeight = this.content.main.offsetHeight
    const spaceBelow = window.innerHeight - (mainRect.top + mainHeight)

    if (spaceBelow <= contentHeight) {
      if (mainRect.top > contentHeight) {
        return 'up'
      }
      return 'down'
    }

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
    const atMinSelected = this.isAtMinSelected()

    const deselectButton = this.main.deselect.main
    const hideClass = this.classes.hide

    if (
      allowDeselect &&
      !(isMultiple && !hasSelectedItems) &&
      !atMinSelected
    ) {
      this.removeClasses(deselectButton, hideClass)
    } else {
      this.addClasses(deselectButton, hideClass)
    }
  }
}
