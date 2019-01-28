import SlimSelect from './index'
import { option, optgroup, dataArray, dataObject } from './data'

interface Constructor {
  select: HTMLSelectElement
  main: SlimSelect
}

export default class Select {
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
      const selected = this.main.data.getSelected() as option[]
      const options = this.element.options
      for (let o = 0; o < options.length; o++) {
        const option = options[o] as HTMLOptionElement
        option.selected = false
        for (let s = 0; s < selected.length; s++) {
          if (selected[s].value === option.value) {
            option.selected = true
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

    for (let i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty('options')) {
        const optgroupObject = data[i] as optgroup
        const optgroup = document.createElement('optgroup') as HTMLOptGroupElement
        optgroup.label = optgroupObject.label
        if (optgroupObject.options) {
          for (let o = 0; o < optgroupObject.options.length; o++) {
            optgroup.appendChild(this.createOption(optgroupObject.options[o]))
          }
        }
        this.element.appendChild(optgroup)
      } else {
        this.element.appendChild(this.createOption(data[i]))
      }
    }
  }

  public createOption(info: any): HTMLOptionElement {
    const option = document.createElement('option')
    option.value = info.value || info.text
    option.innerHTML = info.innerHTML || info.text
    if (info.selected) { option.selected = info.selected }
    if (info.disabled) { option.disabled = true }
    if (info.placeholder) { option.setAttribute('data-placeholder', 'true') }
    if (info.class) {
      info.class.split(' ').forEach((optionClass: string) => {
        option.classList.add(optionClass)
      })
    }
    if (info.data && typeof info.data === 'object') {
      Object.keys(info.data).forEach(function(key) {
        option.setAttribute('data-' + key, info.data[key])
      })
    }

    return option
  }
}
