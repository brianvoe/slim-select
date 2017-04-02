import SlimSelect from './index'
import {ensureElementInView} from './helper'
import {optgroup} from './data'

interface selected {
  container: HTMLDivElement
  placeholder: HTMLSpanElement
  arrowContainer: HTMLSpanElement
  arrowIcon: HTMLSpanElement
}

interface search {
  container: HTMLDivElement
  input: HTMLInputElement
}

// Class is responsible for creating all the elements
export default class create {
  main: SlimSelect
  container: HTMLDivElement
  selected: selected
  content: HTMLDivElement
  search: search
  list: HTMLDivElement
  constructor (info: {main: SlimSelect}) {
    this.main = info.main

    // Create elements in order of appending
    this.container = this.containerDiv()
    this.selected = this.selectedObject()
    this.container.appendChild(this.selected.container)
    this.content = this.contentDiv()
    this.container.appendChild(this.content)
    this.search = this.searchObject()
    this.content.appendChild(this.search.container)
    this.list = this.listDiv()
    this.options()
    this.content.appendChild(this.list)
  }

  // Create main container
  containerDiv (): HTMLDivElement {
    // Create main container
    let container = document.createElement('div')
    container.classList.add(this.main.config.id)
    container.classList.add(this.main.config.main)

    return container
  }

  selectedObject (): selected {
    let container:HTMLDivElement = document.createElement('div')
    container.classList.add(this.main.config.selected)

    // Placeholder text
    let placeholder:HTMLSpanElement = document.createElement('span')
    placeholder.classList.add('placeholder')
    if (this.main.data.selected) {
      placeholder.innerHTML = this.main.data.selected.innerHTML || this.main.data.selected.text
    }
    container.appendChild(placeholder)

    // Arrow
    var arrowContainer:HTMLSpanElement = document.createElement('span')
    arrowContainer.classList.add('arrow')
    let arrowIcon = document.createElement('span')
    arrowIcon.classList.add('arrow-up')
    arrowContainer.appendChild(arrowIcon)
    container.appendChild(arrowContainer)

    // Add onclick for main selector div
    container.onclick = () => { (this.main.data.contentOpen ? this.main.close() : this.main.open()) }

    return {
      container: container,
      placeholder: placeholder,
      arrowContainer: arrowContainer,
      arrowIcon: arrowIcon
    }
  }

  // Create content container
  contentDiv (): HTMLDivElement {
    let container = document.createElement('div')
    container.classList.add(this.main.config.content)
    return container
  }

  searchObject (): search {
    var container = document.createElement('div')
    container.classList.add(this.main.config.search)

    var input = document.createElement('input')
    input.type = 'search'
    input.placeholder = 'Search'
    input.tabIndex = 0
    input.onkeydown = (e) => {
      if (e.key === 'ArrowUp') {
        this.highlightUp()
      } else if (e.key === 'ArrowDown') {
        this.highlightDown()
      }
    }
    input.onkeyup = (e) => {
      let target = <HTMLInputElement>e.target
      if (e.key === 'Enter') {
        var highlighted = <HTMLDivElement>this.list.querySelector('.' + this.main.config.highlighted)
        highlighted.click()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        // Cancel out to leave for onkeydown to handle
      } else if (e.key === 'Escape') {
        this.main.close()
      } else {
        this.main.search(target.value)
      }
    }
    input.onfocus = () => { this.main.open() }
    container.appendChild(input)

    return {
      container: container,
      input: input
    }
  }

  highlightUp (): void {
    var highlighted = this.list.querySelector('.' + this.main.config.highlighted)
    var prev = null
    if (highlighted) {
      prev = highlighted.previousSibling
    } else {
      var allOptions = this.list.querySelectorAll('.' + this.main.config.option)
      prev = allOptions[allOptions.length - 1]
    }

    // Do not select if optgroup label
    if (prev && prev.classList.contains(this.main.config.optgroupLabel)) { prev = null }

    // Check if parent is optgroup
    if (prev === null) {
      var parent = <HTMLDivElement>highlighted.parentNode
      if (parent.classList.contains(this.main.config.optgroup)) {
        if (parent.previousSibling) {
          prev = parent.previousSibling.childNodes[parent.previousSibling.childNodes.length - 1]
        }
      }
    }

    // If previous element exists highlight it
    if (prev) {
      if (highlighted) { highlighted.classList.remove(this.main.config.highlighted) }
      prev.classList.add(this.main.config.highlighted)
      ensureElementInView(this.list, prev)
    }
  }

  highlightDown (): void {
    var highlighted = <HTMLDivElement>this.list.querySelector('.' + this.main.config.highlighted)
    var next:HTMLDivElement = (highlighted ? <HTMLDivElement>highlighted.nextSibling : <HTMLDivElement>this.list.querySelector('.' + this.main.config.option))

    // Check if parent is optgroup
    if (next === null) {
      var parent = <HTMLDivElement>highlighted.parentNode
      if (parent.classList.contains(this.main.config.optgroup)) {
        if (parent.nextSibling) {
          let sibling = <HTMLDivElement>parent.nextSibling
          next = <HTMLDivElement>sibling.querySelector('.' + this.main.config.option)
        }
      }
    }

    // If previous element exists highlight it
    if (next) {
      if (highlighted) { highlighted.classList.remove(this.main.config.highlighted) }
      next.classList.add(this.main.config.highlighted)
      ensureElementInView(this.list, next)
    }
  }

  // Create main container that options will reside
  listDiv (): HTMLDivElement {
    var list = document.createElement('div')
    list.classList.add(this.main.config.list)
    return list
  }

  // Loop through data || filtered data and build options and append to list container
  options (): void {
    var data = this.main.data.filtered || this.main.data.data
    this.list.innerHTML = ''

    // Append individual options to div container
    for (var i = 0; i < data.length; i++) {
      // Create optgroup
      if (data[i].hasOwnProperty('label')) {
        let item = <optgroup>data[i]
        let optgroup = document.createElement('div')
        optgroup.classList.add(this.main.config.optgroup)

        // Create label
        let optgroupLabel = document.createElement('div')
        optgroupLabel.classList.add(this.main.config.optgroupLabel)
        optgroupLabel.innerHTML = item.label
        optgroup.appendChild(optgroupLabel)

        let options = item.options
        for (var ii = 0; ii < options.length; ii++) {
          optgroup.appendChild(this.option(options[ii]))
        }
        this.list.appendChild(optgroup)
      } else {
        this.list.appendChild(this.option(data[i]))
      }
    }
  }

  // Create single option
  option (data): HTMLDivElement {
    console.log(data)
    var option = document.createElement('div')
    option.classList.add(this.main.config.option)
    if (this.main.data.selected.id === data.id) {
      option.classList.add(this.main.config.highlighted)
    }
    option.dataset.id = data.id
    option.innerHTML = data.innerHTML
    option.onclick = (e) => {
      let target = <HTMLDivElement>e.target
      this.main.set(target.dataset.id, 'id')
    }
    return option
  }
}
