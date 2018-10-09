import SlimSelect from './index'
import { option, optgroup, dataArray } from './data'

interface Constructor {
  select: HTMLSelectElement
  main: SlimSelect
}

export default class Select {
  element: HTMLSelectElement
  main: SlimSelect
  mutationObserver: MutationObserver | null
  triggerMutationObserver: boolean = true
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
    let el = this.element as any
    el.slim = info.main
  }

  setValue(): void {
    if (!this.main.data.getSelected()) { return }

    if (this.main.config.isMultiple) {
      // If multiple loop through options and set selected
      let selected = <option[]>this.main.data.getSelected()
      let options = this.element.options
      for (var o = 0; o < options.length; o++) {
        let option = <HTMLOptionElement>options[o]
        option.selected = false
        for (var s = 0; s < selected.length; s++) {
          if (selected[s].value === option.value) {
            option.selected = true
          }
        }
      }
    } else {
      // If single select simply set value
      let selected = this.main.data.getSelected() as any
      this.element.value = (selected ? selected.value : '')
    }

    // Do not trigger onChange callbacks for this event listener
    this.main.data.isOnChangeEnabled = false
    this.element.dispatchEvent(new CustomEvent('change', { bubbles: true }))
    this.main.data.isOnChangeEnabled = true
  }

  addAttributes() {
    this.element.tabIndex = -1
    this.element.style.display = 'none'

    // Add slim select id
    this.element.dataset.ssid = this.main.config.id
  }

  // Add onChange listener to original select
  addEventListeners() {
    this.element.addEventListener('change', (e: Event) => {
      this.main.data.setSelectedFromSelect()
      this.main.render()
    })
  }

  // Add MutationObserver to select
  addMutationObserver(): void {
    // Only add if not in ajax mode
    if (this.main.config.isAjax) { return }

    this.mutationObserver = new MutationObserver((mutations) => {
      if (!this.triggerMutationObserver) {return}

      this.main.data.parseSelectData()
      this.main.data.setSelectedFromSelect()
      this.main.render()

      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          this.main.slim.updateContainerDivClass(this.main.slim.container)
        }
      })
    })

    this.observeMutationObserver()
  }

  observeMutationObserver(): void {
    if (!this.mutationObserver) { return }

    this.mutationObserver.observe(this.element, {
      attributes: true,
      childList: true,
      characterData: true
    })
  }

  disconnectMutationObserver(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  }

  // Create select element and optgroup/options
  create(data: dataArray): void {
    // Clear out select
    this.element.innerHTML = ''

    for (var i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty('options')) {
        let optgroupObject = <optgroup>data[i]
        let optgroup = <HTMLOptGroupElement>document.createElement('optgroup')
        optgroup.label = optgroupObject.label
        if (optgroupObject.options) {
          for (var o = 0; o < optgroupObject.options.length; o++) {
            optgroup.appendChild(this.createOption(optgroupObject.options[o]))
          }
        }
        this.element.appendChild(optgroup)
      } else {
        this.element.appendChild(this.createOption(data[i]))
      }
    }
  }

  createOption(info: any): HTMLOptionElement {
    var option = document.createElement('option')
    option.value = info.value || info.text
    option.innerHTML = info.innerHTML || info.text
    if (info.selected) { option.selected = info.selected }
    if (info.disabled) { option.disabled = true }
    if (info.placeholder) { option.setAttribute('data-placeholder', 'true') }
    if (info.data && typeof info.data === 'object') {
      Object.keys(info.data).forEach(function (key) {
        option.setAttribute('data-' + key, info.data[key])
      })
    }

    return option
  }
}