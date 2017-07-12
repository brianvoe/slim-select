import SlimSelect from './index'
import {ensureElementInView, isValueInArrayOfObjects} from './helper'
import {option, optgroup} from './data'

interface singleSelected {
  container: HTMLDivElement
  placeholder: HTMLSpanElement
  arrowIcon: {
    container: HTMLSpanElement
    arrow: HTMLSpanElement
  }
}

interface multiSelected {
  container: HTMLDivElement
  values: HTMLDivElement
  add: HTMLDivElement
  plus: HTMLSpanElement
}

interface search {
  container: HTMLDivElement
  input: HTMLInputElement
}

// Class is responsible for creating all the elements
export default class create {
  main: SlimSelect
  container: HTMLDivElement
  singleSelected: singleSelected
  multiSelected: multiSelected
  content: HTMLDivElement
  search: search
  list: HTMLDivElement
  constructor (info: {main: SlimSelect}) {
    this.main = info.main

    // Create elements in order of appending
    this.container = this.containerDiv()
    this.content = this.contentDiv()
    this.search = this.searchDiv()
    this.list = this.listDiv()
    this.options()

    if (this.main.config.isMultiple) {
      this.multiSelected = this.multiSelectedDiv()
      this.container.appendChild(this.multiSelected.container)
      this.container.appendChild(this.content)
      this.content.appendChild(this.search.container)
      this.content.appendChild(this.list)
    } else {
      this.singleSelected = this.singleSelectedDiv()
      this.container.appendChild(this.singleSelected.container)
      this.container.appendChild(this.content)
      this.content.appendChild(this.search.container)
      this.content.appendChild(this.list)
    }
  }

  // Create main container
  containerDiv (): HTMLDivElement {
    // Create main container
    let container = document.createElement('div')
    container.classList.add(this.main.config.id)
    container.classList.add(this.main.config.main)

    // Add style and classes
    container.style.cssText = this.main.config.style
    for (var i = 0; i < this.main.config.class.length; i++) {
      container.classList.add(this.main.config.class[i])
    }

    return container
  }

  singleSelectedDiv (): singleSelected {
    let container:HTMLDivElement = document.createElement('div')
    container.classList.add(this.main.config.singleSelected)

    // Placeholder text
    let placeholder:HTMLSpanElement = document.createElement('span')
    placeholder.classList.add('placeholder')
    container.appendChild(placeholder)

    // Arrow
    var arrowContainer:HTMLSpanElement = document.createElement('span')
    arrowContainer.classList.add(this.main.config.arrow)
    let arrowIcon = document.createElement('span')
    arrowIcon.classList.add('arrow-down')
    arrowContainer.appendChild(arrowIcon)
    container.appendChild(arrowContainer)

    // Add onclick for main selector div
    container.onclick = () => {
      if (!this.main.config.isEnabled) { return }

      this.main.data.contentOpen ? this.main.close() : this.main.open()
    }

    return {
      container: container,
      placeholder: placeholder,
      arrowIcon: {
        container: arrowContainer,
        arrow: arrowIcon
      }
    }
  }

  // Based upon current selection set placeholder text
  placeholder (): void {
    let selected = <option>this.main.data.getSelected()

    // Placeholder display
    if (selected && selected.placeholder) {
      let placeholder = document.createElement('span')
      placeholder.classList.add(this.main.config.disabled)
      placeholder.innerHTML = this.main.config.placeholderText
      this.singleSelected.placeholder.innerHTML = placeholder.outerHTML
    } else {
      this.singleSelected.placeholder.innerHTML = (selected ? selected.innerHTML || selected.text: '')
    }
  }

  multiSelectedDiv (): multiSelected {
    let container = document.createElement('div')
    container.classList.add(this.main.config.multiSelected)

    let values = document.createElement('div')
    values.classList.add(this.main.config.values)
    container.appendChild(values)

    let add = document.createElement('div')
    add.classList.add(this.main.config.add)
    let plus = document.createElement('span')
    plus.classList.add(this.main.config.plus)
    plus.onclick = (e) => {
      if (this.main.data.contentOpen) {
        this.main.close()
        e.stopPropagation()
      }
    }
    add.appendChild(plus)
    container.appendChild(add)

    container.onclick = (e) => {
      if (!this.main.config.isEnabled) { return }

      // Open only if you are not clicking on x text
      let target = <Element>e.target
      if (!target.classList.contains(this.main.config.valueDelete)) {
        this.main.open()
      }
    }

    return {
      container: container,
      values: values,
      add: add,
      plus: plus
    }
  }

  // Get selected values and append to multiSelected values container
  // and remove those who
  values (): void {
    if (this.main.config.isMultiple) {
      let currentNodes = this.multiSelected.values.childNodes
      let selected = <option[]>this.main.data.getSelected()

      // Add values that dont currently exist
      let exists
      for (var s = 0; s < selected.length; s++) {
        exists = false
        for (var c = 0; c < currentNodes.length; c++) {
          let node = <HTMLDivElement>currentNodes[c]
          if (selected[s].id === node.dataset.id) {
            exists = true
          }
        }

        if (!exists) {
          this.multiSelected.values.appendChild(this.valueDiv(selected[s]))
        }
      }

      // Remove nodes that shouldnt be there
      for (var c = 0; c < currentNodes.length; c++) {
        exists = true
        let node = <HTMLDivElement>currentNodes[c]
        for (var s = 0; s < selected.length; s++) {
          if (String(selected[s].id) === String(node.dataset.id)) {
            exists = false
          }
        }

        if (exists) {
          let node = <HTMLDivElement>currentNodes[c]
          node.classList.add('ss-out')
          this.multiSelected.values.removeChild(node)
        }
      }

      // If there are no values set placeholder
      if (selected.length === 0) {
        let placeholder = document.createElement('span')
        placeholder.classList.add(this.main.config.disabled)
        placeholder.innerHTML = this.main.config.placeholderText
        this.multiSelected.values.innerHTML = placeholder.outerHTML
      }
    }
  }

  valueDiv (option: option): HTMLDivElement {
    let value = document.createElement('div')
    value.classList.add(this.main.config.value)
    value.dataset.id = option.id

    let text = document.createElement('span')
    text.classList.add(this.main.config.valueText)
    text.innerHTML = option.text
    value.appendChild(text)

    let deleteSpan = document.createElement('span')
    deleteSpan.classList.add(this.main.config.valueDelete)
    deleteSpan.innerHTML = 'x'
    deleteSpan.onclick = (e) => {
      if (!this.main.config.isEnabled) { return }

      this.main.data.removeFromSelected(option.id, 'id')
      this.main.render()
      this.main.select.setValue()
      e.preventDefault()
    }
    value.appendChild(deleteSpan)

    return value
  }

  // Create content container
  contentDiv (): HTMLDivElement {
    let container = document.createElement('div')
    container.classList.add(this.main.config.content)
    return container
  }

  searchDiv (): search {
    var container = document.createElement('div')
    container.classList.add(this.main.config.search)
    if (!this.main.config.showSearch) {container.style.display = 'none'}

    var input = document.createElement('input')
    input.type = 'search'
    input.placeholder = 'Search'
    input.tabIndex = 0
    input.onclick = (e) => {
      setTimeout(() => {
        let target = <HTMLInputElement>e.target
        if (target.value === '') { this.main.search('') }
      }, 10)
    }
    input.onkeydown = (e) => {
      if (e.key === 'ArrowUp') {
        this.highlightUp()
        e.preventDefault()
      } else if (e.key === 'ArrowDown') {
        this.highlightDown()
        e.preventDefault()
      } else if (e.key === 'Tab') {
        this.main.close()
      } else if (e.key === 'Enter') {
        e.preventDefault()
      }
    }
    input.onkeyup = (e) => {
      let target = <HTMLInputElement>e.target
      if (e.key === 'Enter') {
        var highlighted = <HTMLDivElement>this.list.querySelector('.' + this.main.config.highlighted)
        if (highlighted) { highlighted.click() }
        e.preventDefault()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        // Cancel out to leave for onkeydown to handle
      } else if (e.key === 'Escape') {
        this.main.close()
      } else {
        this.main.search(target.value)
      }
      e.preventDefault()
    }
    input.onfocus = () => { this.main.open() }
    container.appendChild(input)

    return {
      container: container,
      input: input
    }
  }

  highlightUp (): void {
    var highlighted = <HTMLDivElement>this.list.querySelector('.' + this.main.config.highlighted)
    var prev = null
    if (highlighted) {
      prev = highlighted.previousSibling
    } else {
      var allOptions = this.list.querySelectorAll('.' + this.main.config.option + ':not(.'+this.main.config.disabled+')')
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
    var next = (
      highlighted ?
      <HTMLDivElement>highlighted.nextSibling :
      <HTMLDivElement>this.list.querySelector('.' + this.main.config.option + ':not(.'+this.main.config.disabled+')')
    )

    // Check if parent is optgroup
    if (next === null) {
      var parent = <HTMLDivElement>highlighted.parentNode
      if (parent.classList.contains(this.main.config.optgroup)) {
        if (parent.nextSibling) {
          let sibling = <HTMLDivElement>parent.nextSibling
          next = <HTMLDivElement>sibling.querySelector('.' + this.main.config.option + ':not(.'+this.main.config.disabled+')')
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
    list.onmousewheel = (e) => {
      var scrollTop = list.scrollTop,
        scrollHeight = list.scrollHeight,
        height = list.offsetHeight,
        delta = (e.type == 'DOMMouseScroll' ? e.detail * -40 : e.wheelDelta),
        up = delta > 0;

      var prevent = function() {
        e.stopPropagation();
        e.preventDefault();
        e.returnValue = false;
        return false;
      }

      if (!up && -delta > scrollHeight - height - scrollTop) {
        // Scrolling down, but this will take us past the bottom.
        list.scrollTop = scrollHeight;
        return prevent();
      } else if (up && delta > scrollTop) {
        // Scrolling up, but this will take us past the top.
        list.scrollTop = 0;
        return prevent();
      }
    }

    return list
  }

  // Loop through data || filtered data and build options and append to list container
  options (): void {
    var data = this.main.data.filtered || this.main.data.data
    this.list.innerHTML = ''

    // If no results show no results text
    if (data.length === 0) {
      let noResults = document.createElement('div')
      noResults.classList.add(this.main.config.option)
      noResults.classList.add(this.main.config.disabled)
      noResults.innerHTML = this.main.config.searchText
      this.list.appendChild(noResults)
      return
    }

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
    // Add hidden placeholder
    if (data.placeholder) {
      let placeholder = document.createElement('div')
      placeholder.classList.add(this.main.config.option)
      placeholder.classList.add(this.main.config.hide)
      return placeholder
    }

    var option = document.createElement('div')
    option.classList.add(this.main.config.option)

    let selected = <option>this.main.data.getSelected()

    option.dataset.id = data.id
    option.innerHTML = data.innerHTML
    option.onclick = (e) => {
      if (this.main.beforeOnChange) {
        let value
        let objectInfo = JSON.parse(JSON.stringify(this.main.data.getObjectFromData((<HTMLDivElement>e.target).dataset.id)))
        objectInfo.selected = true

        if (this.main.config.isMultiple) {
          value = JSON.parse(JSON.stringify(selected))
          value.push(objectInfo)
        } else {
          value = JSON.parse(JSON.stringify(objectInfo))
        }

        let beforeOnchange = this.main.beforeOnChange(value)
        if (beforeOnchange !== false) {
          this.main.set((<HTMLDivElement>e.target).dataset.id, 'id')
        }
      } else {
        this.main.set((<HTMLDivElement>e.target).dataset.id, 'id')
      }
    }

    if (data.disabled || (selected && isValueInArrayOfObjects(selected, 'id', data.id))) {
      option.onclick = null
      option.classList.add(this.main.config.disabled)
    }

    return option
  }
}
