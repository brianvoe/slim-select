import SlimSelect from './index'
import {option, optgroup} from './data'

interface Constructor {
  select: HTMLSelectElement
  main: SlimSelect
  data: object[]
}

export default class select {
  element: HTMLSelectElement
  main: SlimSelect
  data: object[]
  constructor (info: Constructor) {
    this.element = info.select
    this.main = info.main

    // If they passed in just data create select
    if (info.data) { this.data = info.data; this.create() }

    this.addAttributes()
    this.addEventListeners()
    this.addMutationObserver()
  }

  addAttributes () {
    this.element.tabIndex = -1
    // this.element.style.display = 'none'
  }

  addEventListeners () {
    // Add onChange listener to original select
    this.element.addEventListener('change', (e: Event) => {
      let target: HTMLSelectElement = <HTMLSelectElement>e.target
      this.main.set(target.value, 'value')
    })
  }

  addMutationObserver () {
    // Add MutationObserver to select
    new MutationObserver((mutations) => {
      this.main.data.parseSelectData()
      this.main.data.setSelectedFromSelect()
      this.main.slim.options()
      if (this.main.config.isMultiple) {
        let multiSelect = <option[]>this.main.data.selected
        let multiValues: string[] = []
        for (var i = 0; i < multiSelect.length; i++) {multiValues.push(multiSelect[i].id)}
        this.main.set(multiValues, 'id', false)
      } else {
        let singleSelect = <option>this.main.data.selected
        this.main.set(singleSelect.id, 'id', false)
      }
    }).observe(this.element, {
      attributes: true,
      childList: true,
      characterData: true
    })
  }

  // Create select element and optgroup/options
  create (): void {
    // Clear out select
    this.element.innerHTML = ''

    let data = this.data || this.main.data.data
    for (var i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty('options')) {
        let optgroupObject = <optgroup>data[i]
        let optgroup:HTMLOptGroupElement = <HTMLOptGroupElement>document.createElement('optgroup')
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
    option.value = info.value
    option.innerHTML = info.innerHTML || info.text

    return option
  }
}
