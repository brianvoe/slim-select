import './index.scss'

import 'custom-event-polyfill' // Needed for IE to use custom events

import Config from './config'
import {hasClassInTree, putContent, debounce} from './helper'
import Select from './select'
import Data, {dataArray, optgroup, option, validateData} from './data'
import Create from './create'

interface constructor {
  select: string | Element
  data: dataArray
  showSearch: boolean
  searchText: string
  showContent: string
  placeholder: string
  isEnabled: boolean

  // Events
  beforeOnChange: Function
  onChange: Function
}

class SlimSelect {
  config: Config
  select: Select
  data: Data
  slim: Create
  beforeOnChange: Function = null
  onChange: Function = null
  constructor (info: constructor) {
    this.validate(info)
    let selectElement = <HTMLSelectElement>(typeof info.select === 'string' ? <HTMLSelectElement>document.querySelector(info.select) : info.select)

    this.config = new Config({
      select: selectElement,
      showSearch: info.showSearch,
      searchText: info.searchText,
      showContent: info.showContent,
      placeholderText: info.placeholder,
      isEnabled: info.isEnabled
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

    // If data is passed in lets set it
    // and thus will start the render
    if (info.data) {
      this.setData(info.data)
    } else {
      // Do an initial render on startup
      this.render()
    }

    // Add onclick listener to document to closeContent if clicked outside
    document.addEventListener('click', (e: Event) => {
      if (!hasClassInTree(e.target, this.config.id)) { this.close() }
    })

    window.addEventListener('scroll', debounce((e: Event) => {
      if (this.data.contentOpen && this.config.showContent === 'auto') {
        if (putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
          this.moveContentAbove()
        } else {
          this.moveContentBelow()
        }
      }
    }), false)

    // Add event callbacks after everthing has been created
    if (info.beforeOnChange) {this.beforeOnChange = info.beforeOnChange}
    if (info.onChange) {this.onChange = info.onChange}
  }

  validate (info: constructor) {
    let select = <HTMLSelectElement>(typeof info.select === 'string' ? <HTMLSelectElement>document.querySelector(info.select) : info.select)
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
    let isValid = validateData(data)
    if (!isValid) { console.error('Validation problem on: #'+this.select.element.id); return} // If data passed in is not valid DO NOT parse, set and render

    let newData = JSON.parse(JSON.stringify(data))
    this.select.create(newData)
    this.data.parseSelectData()
    this.data.setSelectedFromSelect()
    this.render()
  }

  // Open content section
  open (): void {
    // Dont open if disabled
    if (!this.config.isEnabled) {return}
    this.slim.search.input.focus()

    // Dont do anything if the content is already open
    if (this.data.contentOpen) {return}

    if (this.config.isMultiple) {
      this.slim.multiSelected.plus.classList.add('ss-cross')
    } else {
      this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-down')
      this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-up')
    }
    this.slim[(this.config.isMultiple ? 'multiSelected': 'singleSelected')].container.classList.add((this.data.contentPosition === 'above' ? this.config.openAbove: this.config.openBelow))
    this.slim.content.classList.add(this.config.open)

    // Check showContent to see if they want to specifically show in a certain direction
    if (this.config.showContent.toLowerCase() === 'up') {
      this.moveContentAbove()
    } else if (this.config.showContent.toLowerCase() === 'down') {
      this.moveContentBelow()
    } else {
      // Auto identify where to put it
      if (putContent(this.slim.content, this.data.contentPosition, this.data.contentOpen) === 'above') {
        this.moveContentAbove()
      } else {
        this.moveContentBelow()
      }
    }
    this.data.contentOpen = true
  }

  // Close content section
  close (): void {
    // Dont do anything if the content is already closed
    if (!this.data.contentOpen) {return}

    // this.slim.search.input.blur() // Removed due to safari quirk
    if (this.config.isMultiple) {
      this.slim.multiSelected.container.classList.remove(this.config.openAbove)
      this.slim.multiSelected.container.classList.remove(this.config.openBelow)
      this.slim.multiSelected.plus.classList.remove('ss-cross')
    } else {
      this.slim.singleSelected.container.classList.remove(this.config.openAbove)
      this.slim.singleSelected.container.classList.remove(this.config.openBelow)
      this.slim.singleSelected.arrowIcon.arrow.classList.add('arrow-down')
      this.slim.singleSelected.arrowIcon.arrow.classList.remove('arrow-up')
    }
    this.slim.content.classList.remove(this.config.open)
    this.data.contentOpen = false

    this.search('') // Clear search

    // Reset the content below
    setTimeout(() => {
      this.slim.content.removeAttribute('style')
      this.data.contentPosition = 'below'
      this.slim[(this.config.isMultiple ? 'multiSelected': 'singleSelected')].container.classList.remove(this.config.openAbove)
      this.slim[(this.config.isMultiple ? 'multiSelected': 'singleSelected')].container.classList.remove(this.config.openBelow)
    }, 300)
  }

  moveContentAbove (): void {
    let selectHeight = (this.config.isMultiple ? this.slim.multiSelected.container.offsetHeight: this.slim.singleSelected.container.offsetHeight)
    let contentHeight = this.slim.content.offsetHeight
    let height = selectHeight + contentHeight - 1
    this.slim.content.style.margin = '-' + height + 'px 0 0 0'
    this.slim.content.style['transform-origin'] = 'center bottom'
    this.data.contentPosition = 'above'
    this.slim[(this.config.isMultiple ? 'multiSelected': 'singleSelected')].container.classList.remove(this.config.openBelow)
    this.slim[(this.config.isMultiple ? 'multiSelected': 'singleSelected')].container.classList.add(this.config.openAbove)
  }

  moveContentBelow (): void {
    this.slim.content.removeAttribute('style')
    this.data.contentPosition = 'below'
    this.slim[(this.config.isMultiple ? 'multiSelected': 'singleSelected')].container.classList.remove(this.config.openAbove)
    this.slim[(this.config.isMultiple ? 'multiSelected': 'singleSelected')].container.classList.add(this.config.openBelow)
  }

  // Set to enabled, remove disabled classes and removed disabled from original select
  enable (): void {
    this.config.isEnabled = true
    if (this.config.isMultiple) {
      this.slim.multiSelected.container.classList.remove(this.config.disabled)
    } else {
      this.slim.singleSelected.container.classList.remove(this.config.disabled)
    }

    // Disable original select but dont trigger observer
    this.select.disconnectMutationObserver()
    this.select.element.disabled = false
    this.slim.search.input.disabled = false
    this.select.observeMutationObserver()
  }

  // Set to disabled, add disabled classes and add disabled to original select
  disable (): void {
    this.config.isEnabled = false
    if (this.config.isMultiple) {
      this.slim.multiSelected.container.classList.add(this.config.disabled)
    } else {
      this.slim.singleSelected.container.classList.add(this.config.disabled)
    }

    // Enable original select but dont trigger observer
    this.select.disconnectMutationObserver()
    this.select.element.disabled = true
    this.slim.search.input.disabled = true
    this.select.observeMutationObserver()
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
    this.select.element.style.display = 'inline-block'

    // Destroy slim select
    this.slim.container.parentElement.removeChild(this.slim.container)
  }
}

export default SlimSelect
declare var module: any;
(module).exports = SlimSelect
