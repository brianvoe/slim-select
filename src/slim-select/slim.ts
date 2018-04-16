import SlimSelect from './index'
import { ensureElementInView, isValueInArrayOfObjects, highlight } from './helper'
import { option, optgroup, dataObject, validateOption } from './data'
import select from './select';

interface ContainerElement extends HTMLDivElement {
  slim: SlimSelect
}
interface singleSelected {
  container: HTMLDivElement
  placeholder: HTMLSpanElement
  deselect: HTMLSpanElement
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
  addable: HTMLDivElement
}

// Class is responsible for creating all the elements
export default class slim {
  main: SlimSelect
  container: ContainerElement
  singleSelected: singleSelected
  multiSelected: multiSelected
  content: HTMLDivElement
  search: search
  list: HTMLDivElement
  constructor(info: { main: SlimSelect }) {
    this.main = info.main

    // Create elements in order of appending
    this.container = this.containerDiv()
    this.container.slim = info.main
    this.content = this.contentDiv()
    this.search = this.searchDiv()
    this.list = this.listDiv()
    this.options()

    if (this.main.config.isMultiple) {
      this.multiSelected = this.multiSelectedDiv()
      this.container.appendChild(this.multiSelected.container)
    } else {
      this.singleSelected = this.singleSelectedDiv()
      this.container.appendChild(this.singleSelected.container)
    }
    this.container.appendChild(this.content)
    this.content.appendChild(this.search.container)
    this.content.appendChild(this.list)
  }

  // Create main container
  containerDiv(): ContainerElement {
    // Create main container
    let container = document.createElement('div') as ContainerElement
    container.classList.add(this.main.config.id)
    container.classList.add(this.main.config.main)

    // Add style and classes
    container.style.cssText = this.main.config.style
    for (var i = 0; i < this.main.config.class.length; i++) {
      container.classList.add(this.main.config.class[i])
    }

    return container
  }

  singleSelectedDiv(): singleSelected {
    let container: HTMLDivElement = document.createElement('div')
    container.classList.add(this.main.config.singleSelected)

    // Placeholder text
    let placeholder: HTMLSpanElement = document.createElement('span')
    placeholder.classList.add('placeholder')
    container.appendChild(placeholder)

    // Deselect
    let deselect: HTMLSpanElement = null
    deselect = document.createElement('span')
    deselect.innerHTML = 'X'
    deselect.classList.add('ss-deselect')
    deselect.onclick = (e) => {
      this.main.set('')
      e.stopPropagation()
    }
    container.appendChild(deselect)

    // Arrow
    var arrowContainer: HTMLSpanElement = document.createElement('span')
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
      deselect: deselect,
      arrowIcon: {
        container: arrowContainer,
        arrow: arrowIcon
      }
    }
  }

  // Based upon current selection set placeholder text
  placeholder(): void {
    let selected = <option>this.main.data.getSelected()

    // Placeholder display
    if (selected === null || (selected && selected.placeholder)) {
      let placeholder = document.createElement('span')
      placeholder.classList.add(this.main.config.disabled)
      placeholder.innerHTML = this.main.config.placeholderText
      this.singleSelected.placeholder.innerHTML = placeholder.outerHTML
    } else {
      let selectedValue = ''
      if (selected) {
        selectedValue = selected.innerHTML && this.main.config.valuesUseText !== true ? selected.innerHTML : selected.text
      }
      this.singleSelected.placeholder.innerHTML = (selected ? selectedValue : '')
    }
  }

  // Based upon current selection/settings hide/show deselect
  deselect(): void {
    // if allowDeselect is false just hide it
    if (!this.main.config.allowDeselect) {
      this.singleSelected.deselect.classList.add('ss-hide')
      return
    }

    if (this.main.selected() === '') {
      this.singleSelected.deselect.classList.add('ss-hide')
    } else {
      this.singleSelected.deselect.classList.remove('ss-hide')
    }
  }

  multiSelectedDiv(): multiSelected {
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
  // and remove those who shouldnt exist
  values(): void {
    if (!this.main.config.isMultiple) { return }
    let currentNodes = this.multiSelected.values.childNodes
    let selected = <option[]>this.main.data.getSelected()

    // Remove nodes that shouldnt be there
    let exists
    let nodesToRemove = []
    for (var c = 0; c < currentNodes.length; c++) {
      exists = true
      let node = <HTMLDivElement>currentNodes[c]
      for (var s = 0; s < selected.length; s++) {
        if (String(selected[s].id) === String(node.dataset.id)) {
          exists = false
        }
      }

      if (exists) { nodesToRemove.push(node) }
    }

    for (let i = 0; i < nodesToRemove.length; i++) {
      nodesToRemove[i].classList.add('ss-out')
      this.multiSelected.values.removeChild(nodesToRemove[i])
    }

    // Add values that dont currently exist
    currentNodes = this.multiSelected.values.childNodes
    for (var s = 0; s < selected.length; s++) {
      exists = false
      for (var c = 0; c < currentNodes.length; c++) {
        let node = <HTMLDivElement>currentNodes[c]
        if (String(selected[s].id) === String(node.dataset.id)) {
          exists = true
        }
      }

      if (!exists) {
        if (currentNodes.length === 0) {
          this.multiSelected.values.appendChild(this.valueDiv(selected[s]))
        } else if (s === 0) {
          this.multiSelected.values.insertBefore(this.valueDiv(selected[s]), (<any>currentNodes[s]))
        } else {
          (<any>currentNodes[s - 1]).insertAdjacentElement('afterend', this.valueDiv(selected[s]))
        }
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

  valueDiv(option: option): HTMLDivElement {
    let value = document.createElement('div')
    value.classList.add(this.main.config.value)
    value.dataset.id = option.id

    let text = document.createElement('span')
    text.classList.add(this.main.config.valueText)
    text.innerHTML = (option.innerHTML && this.main.config.valuesUseText !== true ? option.innerHTML : option.text)
    value.appendChild(text)

    let deleteSpan = document.createElement('span')
    deleteSpan.classList.add(this.main.config.valueDelete)
    deleteSpan.innerHTML = 'x'
    deleteSpan.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!this.main.config.isEnabled) { return }

      if (this.main.beforeOnChange) {
        let selected = <option>this.main.data.getSelected()
        let currentValues = JSON.parse(JSON.stringify(selected))

        // Remove from current selection
        for (var i = 0; i < currentValues.length; i++) {
          if (currentValues[i].id === option.id) {
            currentValues.splice(i, 1)
          }
        }

        let beforeOnchange = this.main.beforeOnChange(currentValues)
        if (beforeOnchange !== false) {
          this.main.data.removeFromSelected(option.id, 'id')
          this.main.render()
          this.main.select.setValue()
        }
      } else {
        this.main.data.removeFromSelected(option.id, 'id')
        this.main.render()
        this.main.select.setValue()
        this.main.data.onDataChange() // Trigger on change callback
      }
    }
    value.appendChild(deleteSpan)

    return value
  }

  // Create content container
  contentDiv(): HTMLDivElement {
    let container = document.createElement('div')
    container.classList.add(this.main.config.content)
    return container
  }

  searchDiv(): search {
    var container = document.createElement('div')
    var input = document.createElement('input')
    container.classList.add(this.main.config.search)

    // We still want the search to be tabable but not shown
    if (!this.main.config.showSearch) {
      container.classList.add(this.main.config.hide)
      input.readOnly = true
    }

    input.type = 'search'
    input.placeholder = this.main.config.searchPlaceholder
    input.tabIndex = 0
    input.onclick = (e) => {
      setTimeout(() => {
        let target = <HTMLInputElement>e.target
        if (target.value === '') { this.main.search('') }
      }, 10)
    }
    input.onkeydown = (e) => {
      if (e.key === 'ArrowUp') {
        this.main.open()
        this.highlightUp()
        e.preventDefault()
      } else if (e.key === 'ArrowDown') {
        this.main.open()
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
        if (this.main.addable && e.ctrlKey) {
          addable.click()
          e.preventDefault()
          e.stopPropagation()
          return
        }
        var highlighted = <HTMLDivElement>this.list.querySelector('.' + this.main.config.highlighted)
        if (highlighted) { highlighted.click() }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        // Cancel out to leave for onkeydown to handle
      } else if (e.key === 'Escape') {
        this.main.close()
      } else {
        if (this.main.config.showSearch && this.main.data.contentOpen) {
          this.main.search(target.value)
        } else {
          input.value = ''
        }
      }
      e.preventDefault()
      e.stopPropagation()
    }
    input.onfocus = () => { this.main.open() }
    container.appendChild(input)

    if (this.main.addable) {
      var addable = document.createElement('div')
      addable.classList.add(this.main.config.addable)
      addable.innerHTML = '+'
      addable.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        let inputValue = this.search.input.value
        if (inputValue.trim() === '') { this.search.input.focus(); return }

        let addableValue = this.main.addable(inputValue)
        let addableValueStr = ''
        if (!addableValue) { return }

        if (typeof addableValue == 'object') {
          let validValue = validateOption(addableValue)
          if (validValue) {
            this.main.addData(addableValue)
            addableValueStr = (addableValue.value ? addableValue.value : addableValue.text)
          }
        } else {
          this.main.addData(this.main.data.newOption({
            text: addableValue,
            value: addableValue
          }))
          addableValueStr = addableValue
        }

        this.main.search('')
        setTimeout(() => { // Temp fix to solve multi render issue
          this.main.set(addableValueStr, 'value', false, false)
        }, 100)

        // Close it only if closeOnSelect = true
        if (this.main.config.closeOnSelect) {
          setTimeout(() => { // Give it a little padding for a better looking animation
            this.main.close()
          }, 100)
        }
      }
      container.appendChild(addable)
    }

    return {
      container: container,
      input: input,
      addable: addable
    }
  }

  highlightUp(): void {
    var highlighted = <HTMLDivElement>this.list.querySelector('.' + this.main.config.highlighted)
    var prev = null
    if (highlighted) {
      prev = <HTMLDivElement>highlighted.previousSibling
      while (prev !== null) {
        if (prev.classList.contains(this.main.config.disabled)) {
          prev = <HTMLDivElement>prev.previousSibling
          continue
        } else {
          break
        }
      }
    } else {
      var allOptions = this.list.querySelectorAll('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')')
      prev = allOptions[allOptions.length - 1]
    }

    // Do not select if optgroup label
    if (prev && prev.classList.contains(this.main.config.optgroupLabel)) { prev = null }

    // Check if parent is optgroup
    if (prev === null) {
      var parent = <HTMLDivElement>highlighted.parentNode
      if (parent.classList.contains(this.main.config.optgroup)) {
        if (parent.previousSibling) {
          let prevNodes = (<HTMLDivElement>parent.previousSibling).querySelectorAll('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')')
          if (prevNodes.length) {
            prev = prevNodes[prevNodes.length - 1]
          }
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

  highlightDown(): void {
    var highlighted = <HTMLDivElement>this.list.querySelector('.' + this.main.config.highlighted)
    var next = null

    if (highlighted) {
      next = <HTMLDivElement>highlighted.nextSibling
      while (next !== null) {
        if (next.classList.contains(this.main.config.disabled)) {
          next = <HTMLDivElement>next.nextSibling
          continue
        } else {
          break
        }
      }
    } else {
      next = <HTMLDivElement>this.list.querySelector('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')')
    }

    // Check if parent is optgroup
    if (next === null && highlighted !== null) {
      var parent = <HTMLDivElement>highlighted.parentNode
      if (parent.classList.contains(this.main.config.optgroup)) {
        if (parent.nextSibling) {
          let sibling = <HTMLDivElement>parent.nextSibling
          next = <HTMLDivElement>sibling.querySelector('.' + this.main.config.option + ':not(.' + this.main.config.disabled + ')')
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
  listDiv(): HTMLDivElement {
    var list = document.createElement('div')
    list.classList.add(this.main.config.list)
    list.onmousewheel = (e) => {
      var scrollTop = list.scrollTop,
        scrollHeight = list.scrollHeight,
        height = list.offsetHeight,
        delta = (e.type == 'DOMMouseScroll' ? e.detail * -40 : e.wheelDelta),
        up = delta > 0;

      var prevent = function () {
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
  options(content: string = ''): void {
    var data = this.main.data.filtered || this.main.data.data

    // Clear out innerHtml
    this.list.innerHTML = ''

    // If content is being passed just use that text
    if (content !== '') {
      let searching = document.createElement('div')
      searching.classList.add(this.main.config.option)
      searching.classList.add(this.main.config.disabled)
      searching.innerHTML = content
      this.list.appendChild(searching)
      return
    }

    // If ajax and isSearching
    if (this.main.config.isAjax && this.main.config.isSearching) {
      let searching = document.createElement('div')
      searching.classList.add(this.main.config.option)
      searching.classList.add(this.main.config.disabled)
      searching.innerHTML = 'Searching...'
      this.list.appendChild(searching)
      return
    }

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
  option(data): HTMLDivElement {
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
    if (this.main.config.searchHighlight && this.main.slim && this.main.slim.search.input.value.trim() !== '') {
      option.innerHTML = highlight(data.innerHTML, this.main.slim.search.input.value, this.main.config.searchHighlighter)
    } else {
      option.innerHTML = data.innerHTML
    }
    let master = this
    option.onclick = function (e) {
      e.preventDefault()
      e.stopPropagation()

      let element = this
      let elementID = element.dataset.id
      if (master.main.beforeOnChange) {
        let value
        let objectInfo = JSON.parse(JSON.stringify(master.main.data.getObjectFromData(elementID)))
        objectInfo.selected = true

        if (master.main.config.isMultiple) {
          value = JSON.parse(JSON.stringify(selected))
          value.push(objectInfo)
        } else {
          value = JSON.parse(JSON.stringify(objectInfo))
        }

        let beforeOnchange = master.main.beforeOnChange(value)
        if (beforeOnchange !== false) {
          master.main.set(elementID, 'id', master.main.config.closeOnSelect)
        }
      } else {
        master.main.set(elementID, 'id', master.main.config.closeOnSelect)
      }
    }

    if (data.disabled || (selected && isValueInArrayOfObjects(selected, 'id', data.id))) {
      option.onclick = null
      option.classList.add(this.main.config.disabled)
    }

    return option
  }
}
