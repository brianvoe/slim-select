import SlimSelect from './index'
import {option, optgroup, dataArray} from './data'

interface Constructor {
  select: HTMLSelectElement
  main: SlimSelect
}

export default class select {
  element: HTMLSelectElement
  main: SlimSelect
  mutationObserver: MutationObserver
  constructor (info: Constructor) {
    this.element = info.select
    this.main = info.main

    this.addAttributes()
    this.addEventListeners()
    this.mutationObserver = this.addMutationObserver()
  }

  setValue (): void {
    if (!this.main.data.selected) {return}

    if (this.main.config.isMultiple) {
      let selected = <option[]>this.main.data.selected
      let options = this.element.options
      let selectedValues = []
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
      let selected = <option>this.main.data.selected
      this.element.value = selected.value
    }
  }

  addAttributes () {
    this.element.tabIndex = -1
    this.element.style.display = 'none'
  }

  // Add onChange listener to original select
  addEventListeners () {
    this.element.addEventListener('change', (e: Event) => {
      this.main.data.setSelectedFromSelect()
      this.main.render()
    })
  }

  // Add MutationObserver to select
  addMutationObserver (): MutationObserver {
    let mutation = new MutationObserver((mutations) => {
      this.main.data.parseSelectData()
      this.main.data.setSelectedFromSelect()
      this.main.render()
    })
    mutation.observe(this.element, {
      attributes: true,
      childList: true,
      characterData: true
    })

    return mutation
  }

  // Create select element and optgroup/options
  create (data: dataArray): void {
    // Clear out select
    this.element.innerHTML = ''

    for (var i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty('options')) {
        let optgroupObject = <optgroup>data[i]
        let optgroup = <HTMLOptGroupElement>document.createElement('optgroup')
        optgroup.label = optgroupObject.label
        for (var o = 0; o < optgroupObject.options.length; o++) {
          optgroup.appendChild(this.createOption(optgroupObject.options[o]))
        }
        this.element.appendChild(optgroup)
      } else {
        this.element.appendChild(this.createOption(data[i]))
      }
    }
  }

  createOption (info): HTMLOptionElement {
    var option = document.createElement('option')
    option.value = info.value || info.text
    option.innerHTML = info.innerHTML || info.text
    if (info.selected) {option.selected = info.selected}
    if (info.disabled) { option.disabled = true }
    if (info.data && typeof info.data === 'object') {
      Object.keys(info.data).forEach(function(key) {
        option.setAttribute('data-' + key, info.data[key])
      })
    }

    return option
  }
}
