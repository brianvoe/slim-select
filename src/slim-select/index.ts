import Config from './config'
import {hasClassInTree} from './helper'
import Select from './select'
import Data, {dataArray, optgroup, option, validateData} from './data'
import Create from './create'

interface constructor {
  select: string
  showSearch: boolean

  // Events
  beforeOnChange: Function
  onChange: Function
}

export default class SlimSelect {
  config: Config
  select: Select
  data: Data
  slim: Create
  beforeOnChange: Function = null
  onChange: Function = null
  constructor (info: constructor) {
    this.validate(info)
    let selectElement = <HTMLSelectElement>document.querySelector(info.select)

    this.config = new Config({
      select: selectElement,
      showSearch: info.showSearch
    })

    this.select = new Select({
      select: selectElement,
      main: this
    })

    this.data = new Data({
      main: this
    })

    this.slim = new Create({ main: this })
    // Add after original select element
    this.select.element.parentNode.insertBefore(this.slim.container, this.select.element.nextSibling)

    // Do an initial render on startup
    this.render()

    // Add onclick listener to document to closeContent if clicked outside
    document.addEventListener('click', (e: Event) => {
      if (!hasClassInTree(e.target, this.config.id)) { this.close() }
    })

    // Add event callbacks after everthing has been created
    if (info.beforeOnChange) {this.beforeOnChange = info.beforeOnChange}
    if (info.onChange) {this.onChange = info.onChange}
  }

  validate (info: constructor) {
    let select = <HTMLSelectElement>document.querySelector(info.select)
    if (!select) { throw new Error('Could not find select element') }
    if (select.tagName !== 'SELECT') { throw new Error('Element isnt of type select') }
  }

  // Sets value of the select, adds it to data and original select
  set (value: string | string[], type: string = 'value', close: boolean = true) {
    if (this.config.isMultiple && !Array.isArray(value)) {
      this.data.addToSelected(value, type)
    } else {
      this.data.setSelected(value, type)
    }
    this.render()
    this.select.setValue()
    if (close) { this.close() }
  }

  setData (data: dataArray) {
    // Validate data if passed in
    validateData(data)

    let newData = JSON.parse(JSON.stringify(data))
    this.select.create(newData)
    this.data.parseSelectData()
    this.data.setSelectedFromSelect()
    this.render()
  }

  // Open content section
  open (): void {
    this.slim.search.input.focus()

    // Dont do anything if the content is already open
    if (this.data.contentOpen) {return}

    this.data.contentOpen = true
    if (this.config.isMultiple) {
      this.slim.multiSelected.container.classList.add(this.config.open)
    } else {
      this.slim.singleSelected.container.classList.add(this.config.open)
      this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-up')
      this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-down')
    }
    this.slim.content.classList.add(this.config.open)
  }

  // Close content section
  close (): void {
    // Dont do anything if the content is already closed
    if (!this.data.contentOpen) {return}

    this.data.contentOpen = false
    this.slim.search.input.blur()
    if (this.config.isMultiple) {
      this.slim.multiSelected.container.classList.remove(this.config.open)
    } else {
      this.slim.singleSelected.container.classList.remove(this.config.open)
      this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-up')
      this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-down')
    }
    this.slim.content.classList.remove(this.config.open)

    this.search('') // Clear search
  }

  // Take in string value and search current options
  search (value: string): void {
    // Only filter data and rerender if value has changed
    if (this.data.searchValue !== value) {
      this.slim.search.input.value = value
      this.data.search(value)
      this.render()
    }
  }

  render (): void {
    if (this.config.isMultiple) {
      this.slim.values()
    } else {
      this.slim.placeholder()
    }
    this.slim.options()
  }

  // Display original select again and remove slim
  destroy (): void {
    // Show original select
    this.select.element.removeAttribute('style')

    // Destroy slim select
    this.slim.container.parentElement.removeChild(this.slim.container)
  }
}
