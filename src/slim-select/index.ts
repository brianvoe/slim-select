import Config from './config'
import {hasClassInTree} from './helper'
import Select from './select'
import Data, {option} from './data'
import Create from './create'

interface constructor {
  select: string
  data: object[]
}

export default class SlimSelect {
  config: Config
  select: Select
  data: Data
  slim: Create
  constructor (info: constructor) {
    this.validate(info)
    let selectElement = <HTMLSelectElement>document.querySelector(info.select)

    this.config = new Config({
      select: selectElement
    })

    this.select = new Select({
      select: selectElement,
      main: this,
      data: info.data || null
    })

    this.data = new Data({
      main: this
    })

    this.slim = new Create({ main: this })
    // Add after original select element
    this.select.element.after(this.slim.container)

    // Add onclick listener to document to closeContent if clicked outside
    document.addEventListener('click', (e: Event) => {
      if (!hasClassInTree(e.target, this.config.id)) { this.close() }
    })
  }

  validate (info: constructor) {
    let select = <HTMLSelectElement>document.querySelector(info.select)
    if (!select) { throw new Error('Could not find select element') }
    if (select.tagName !== 'SELECT') { throw new Error('Element isnt of type select') }
  }

  set (value: string | string[], type: string = 'value', close: boolean = true) {
    this.data.setSelected(value, type)

    if (this.config.isMultiple) {
      // If multi select, loop through values and update accordingly
      
    } else {
      // If single select set placeholder
      let selected = <option>this.data.selected
      this.slim.selected.placeholder.innerHTML = selected.innerHTML
      this.select.element.value = selected.value
    }
    if (close) { this.close() }
  }

  // Open content section
  open (): void {
    this.data.contentOpen = true
    this.slim.search.input.focus()
    this.slim.selected.container.classList.add('open')
    this.slim.selected.arrowIcon.classList.remove('arrow-up')
    this.slim.selected.arrowIcon.classList.add('arrow-down')
    this.slim.content.classList.add('open')
  }

  // Close content section
  close (): void {
    this.data.contentOpen = false
    this.slim.search.input.blur()
    this.slim.selected.container.classList.remove('open')
    this.slim.selected.arrowIcon.classList.add('arrow-up')
    this.slim.selected.arrowIcon.classList.remove('arrow-down')
    this.slim.content.classList.remove('open')
    this.search('') // clear search
  }

  search (value: string): void {
    this.slim.search.input.value = value
    this.data.search(value)
    this.render()
  }

  render (): void {
    this.slim.options()
  }
}
