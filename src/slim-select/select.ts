import SlimSelect from './index'
import { Option, Optgroup, dataArray } from './data'
import { kebabCase } from './helper'

interface Constructor {
  select: HTMLSelectElement
  main: SlimSelect
}

export class Select {
  public element: HTMLSelectElement
  public main: SlimSelect
  public mutationObserver: MutationObserver | null
  public triggerMutationObserver: boolean = true
  constructor(info: Constructor) {
    this.element = info.select
    this.main = info.main

    // If original select is set to disabled lets make sure slim is too
    if (this.element.disabled) { this.main.config.isEnabled = false }

    this.addAttributes()
    this.addEventListeners()
    this.mutationObserver = null
    this.addMutationObserver()

    // Add slim to original select dropdown
    const el = this.element as any
    el.slim = info.main
  }

  public setValue(): void {
    if (!this.main.data.getSelected()) { return }

    if (this.main.config.isMultiple) {
      // If multiple loop through options and set selected
      const selected = this.main.data.getSelected() as Option[]
      const options = this.element.options as any as HTMLOptionElement[]
      for (const o of options) {
        o.selected = false
        for (const s of selected) {
          if (s.value === o.value) {
            o.selected = true
          }
        }
      }
    } else {
      // If single select simply set value
      const selected = this.main.data.getSelected() as any
      this.element.value = (selected ? selected.value : '')
    }

    // Do not trigger onChange callbacks for this event listener
    this.main.data.isOnChangeEnabled = false
    this.element.dispatchEvent(new CustomEvent('change', { bubbles: true }))
    this.main.data.isOnChangeEnabled = true
  }

  public addAttributes() {
    this.element.tabIndex = -1
    this.element.style.display = 'none'

    // Add slim select id
    this.element.dataset.ssid = this.main.config.id
    this.element.setAttribute('aria-hidden', 'true')
  }

  // Add onChange listener to original select
  public addEventListeners() {
    this.element.addEventListener('change', (e: Event) => {
      this.main.data.setSelectedFromSelect()
      this.main.render()
    })
  }

  // Add MutationObserver to select
  public addMutationObserver(): void {
    // Only add if not in ajax mode
    if (this.main.config.isAjax) { return }

    this.mutationObserver = new MutationObserver((mutations) => {
      if (!this.triggerMutationObserver) {return}

      this.main.data.parseSelectData()
      this.main.data.setSelectedFromSelect()
      this.main.render()

      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          this.main.slim.updateContainerDivClass(this.main.slim.container)
        }
      })
    })

    this.observeMutationObserver()
  }

  public observeMutationObserver(): void {
    if (!this.mutationObserver) { return }

    this.mutationObserver.observe(this.element, {
      attributes: true,
      childList: true,
      characterData: true
    })
  }

  public disconnectMutationObserver(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  }

  // Create select element and optgroup/options
  public create(data: dataArray): void {
    // Clear out select
    this.element.innerHTML = ''

    for (const d of data) {
      if (d.hasOwnProperty('options')) {
        const optgroupObject = d as Optgroup
        const optgroupEl = document.createElement('optgroup') as HTMLOptGroupElement
        optgroupEl.label = optgroupObject.label
        if (optgroupObject.options) {
          for (const oo of optgroupObject.options) {
            optgroupEl.appendChild(this.createOption(oo))
          }
        }
        this.element.appendChild(optgroupEl)
      } else {
        this.element.appendChild(this.createOption(d))
      }
    }
  }

  public createOption(info: any): HTMLOptionElement {
    const optionEl = document.createElement('option')
    optionEl.value = info.value !== '' ? info.value : info.text
    optionEl.innerHTML = info.innerHTML || info.text
    if (info.selected) { optionEl.selected = info.selected }
    if (info.display === false) {
      optionEl.style.display = 'none'
    }
    if (info.disabled) { optionEl.disabled = true }
    if (info.placeholder) { optionEl.setAttribute('data-placeholder', 'true') }
    if (info.mandatory) { optionEl.setAttribute('data-mandatory', 'true') }
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
}
