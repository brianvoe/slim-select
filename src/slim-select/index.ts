import Config from './config'
import {hasClassInTree} from './helper'
import Select from './select'
import Data from './data'
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
    this.config = new Config()

    let selectElement = <HTMLSelectElement>document.querySelector(info.select)
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

  set (value: string, type: string = 'value', close: boolean = true) {
    this.data.setSelected(value, type)

    this.slim.selected.placeholder.innerHTML = this.data.selected.innerHTML
    this.select.element.value = this.data.selected.value
    if (close) { this.close() }
  }

  open () {
    this.data.contentOpen = true
    this.slim.search.input.focus()
    this.slim.selected.container.classList.add('open')
    this.slim.selected.arrowIcon.classList.remove('arrow-up')
    this.slim.selected.arrowIcon.classList.add('arrow-down')
    this.slim.content.classList.add('open')
  }

  close () {
    this.data.contentOpen = false
    this.slim.search.input.blur()
    this.slim.selected.container.classList.remove('open')
    this.slim.selected.arrowIcon.classList.add('arrow-up')
    this.slim.selected.arrowIcon.classList.remove('arrow-down')
    this.slim.content.classList.remove('open')
    this.search('') // clear search
  }

  search (value) {
    this.slim.search.input.value = value
    this.data.search(value)
    this.render()
  }

  render () {
    this.slim.options()
  }
}
