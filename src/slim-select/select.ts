import { generateID, kebabCase } from './helper'
import SlimSelect, { Events, Settings } from './index'
import { DataArray, Optgroup, Option } from './store'

export default class Select2 {
  public select: HTMLSelectElement
  public data: DataArray
  public settings: Required<Settings>
  public events: Events

  // Mutation observer fields
  public mutationObserverOn: boolean = true
  public mutationObserver: MutationObserver | null = null

  constructor(select: HTMLSelectElement, data: DataArray, settings: Required<Settings>, events: Events) {
    this.select = select
    this.data = data
    this.settings = settings
    this.events = events
  }

  // public getData(): Option[] {
  //   return this.data.options
  // }

  // From passed in select element pull optgroup and options into data
  public getSelectData(select: HTMLSelectElement): DataArray {
    let data = []

    // Loop through nodes and get data
    const nodes = select.childNodes as any as HTMLOptGroupElement[] | HTMLOptionElement[]
    for (const n of nodes) {
      // Optgroup
      if (n.nodeName === 'OPTGROUP') {
        const node = n as HTMLOptGroupElement
        const optgroup = {
          label: node.label,
          options: [] as Option[],
        }
        const options = n.childNodes as any as HTMLOptionElement[]
        for (const o of options) {
          if (o.nodeName === 'OPTION') {
            const option = this.getOptionData(o as HTMLOptionElement)
            optgroup.options.push(option)
          }
        }
        data.push(optgroup)
      }

      // Option
      if (n.nodeName === 'OPTION') {
        const option = this.getOptionData(n as HTMLOptionElement)
        data.push(option)
      }
    }

    return data
  }

  // From passed in option pull pieces of usable information
  public getOptionData(option: HTMLOptionElement): Option {
    return {
      id: (option.dataset ? option.dataset.id : false) || generateID(),
      value: option.value,
      text: option.text,
      innerHTML: option.innerHTML,
      selected: option.selected,
      disabled: option.disabled,
      placeholder: option.dataset.placeholder || '',
      class: option.className,
      style: option.style.cssText,
      data: option.dataset,
      mandatory: option.dataset ? option.dataset.mandatory === 'true' : false,
    } as Required<Option>
  }
}

export class Select {
  public main: SlimSelect
  public mutationObserver: MutationObserver | null
  public triggerMutationObserver: boolean = true

  constructor(main: SlimSelect) {
    this.main = main

    // If original select is set to disabled lets make sure slim is too
    if (this.main.select.disabled) {
      this.main.settings.isEnabled = false
    }

    this.addAttributes()
    this.addEventListeners()
    this.mutationObserver = null
    this.addMutationObserver()

    // Add slim to original select dropdown
    const el = this.main.select as any
    el.slim = main
  }

  public setValue(): void {
    if (!this.main.data.getSelected()) {
      return
    }

    if (this.main.isMultiple) {
      // If multiple loop through options and set selected
      const selected = this.main.data.getSelected() as Option[]
      const options = this.main.select.options as any as HTMLOptionElement[]
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
      this.main.select.value = selected ? selected.value : ''
    }

    // Do not trigger onChange callbacks for this event listener
    this.main.data.isOnChangeEnabled = false
    // this.main.select.dispatchEvent(new CustomEvent('change', { bubbles: true }))
    this.main.data.isOnChangeEnabled = true
  }

  public addAttributes() {
    this.main.select.tabIndex = -1
    this.main.select.style.display = 'none'

    // Add slim select id
    this.main.select.dataset.ssid = this.main.id
    this.main.select.setAttribute('aria-hidden', 'true')
  }

  // Add onChange listener to original select
  public addEventListeners() {
    this.main.select.addEventListener('change', (e: Event) => {
      this.main.data.setSelectedFromSelect()
      this.main.render()
    })
  }

  // Add MutationObserver to select
  public addMutationObserver(): void {
    // Only add if not in ajax mode
    if (this.main.isAjax) {
      return
    }

    this.mutationObserver = new MutationObserver((mutations) => {
      if (!this.triggerMutationObserver) {
        return
      }

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
    if (!this.mutationObserver) {
      return
    }

    this.mutationObserver.observe(this.main.select, {
      attributes: true,
      childList: true,
      characterData: true,
    })
  }

  public disconnectMutationObserver(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  }

  // Create select element and optgroup/options
  public create(data: DataArray): void {
    // Clear out select
    this.main.select.innerHTML = ''

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
        this.main.select.appendChild(optgroupEl)
      } else {
        this.main.select.appendChild(this.createOption(d))
      }
    }
  }

  public createOption(info: any): HTMLOptionElement {
    const optionEl = document.createElement('option')
    optionEl.value = info.value !== '' ? info.value : info.text
    optionEl.innerHTML = info.innerHTML || info.text
    if (info.selected) {
      optionEl.selected = info.selected
    }
    if (info.display === false) {
      optionEl.style.display = 'none'
    }
    if (info.disabled) {
      optionEl.disabled = true
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
}
