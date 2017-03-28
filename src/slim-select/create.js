import {ensureElementInView} from './helper.js'

// Class is responsible for creating all the elements
export default class create {
  constructor (info) {
    this.main = info.main

    // Create elements in order of appending
    this.container = this.container()
    this.selected = this.selected()
    this.container.appendChild(this.selected.container)
    this.content = this.content()
    this.container.appendChild(this.content)
    this.search = this.search()
    this.content.appendChild(this.search.container)
    this.list = this.list()
    this.options()
    this.content.appendChild(this.list)
  }

  // Create main container
  container () {
    // Create main container
    let container = document.createElement('div')
    container.classList.add(this.main.config.id)
    container.classList.add(this.main.config.classes.main)

    return container
  }

  selected () {
    let container = document.createElement('div')
    container.classList.add(this.main.config.classes.selected)

    // Placeholder text
    let placeholder = document.createElement('span')
    placeholder.classList.add('placeholder')
    placeholder.innerHTML = this.main.data.selected.innerHTML
    container.appendChild(placeholder)

    // Arrow
    var arrowContainer = document.createElement('span')
    arrowContainer.classList.add('arrow')
    let arrowIcon = document.createElement('i')
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
  content () {
    let container = document.createElement('div')
    container.classList.add(this.main.config.classes.content)
    return container
  }

  search () {
    var container = document.createElement('div')
    container.classList.add(this.main.config.classes.search)
    if (!this.main.data.hasSearch) { container.style.display = 'none' }

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
      if (e.key === 'Enter') {
        var highlighted = this.list.querySelector('.' + this.main.config.classes.highlighted)
        highlighted.click()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        // Cancel out to leave for onkeydown to handle
      } else if (e.key === 'Escape') {
        this.main.close()
      } else {
        this.main.search(e.target.value)
      }
    }
    input.onfocus = () => { this.main.open() }
    container.appendChild(input)

    return {
      container: container,
      input: input
    }
  }

  highlightUp () {
    var highlighted = this.list.querySelector('.' + this.main.config.classes.highlighted)
    var prev = null
    if (highlighted) {
      prev = highlighted.previousSibling
    } else {
      var allOptions = this.list.querySelectorAll('.' + this.main.config.classes.option)
      prev = allOptions[allOptions.length - 1]
    }

    // Do not select if optgroup label
    if (prev && prev.classList.contains(this.main.config.classes.optgroupLabel)) { prev = null }

    // Check if parent is optgroup
    if (prev === null) {
      var parent = highlighted.parentNode
      if (parent.classList.contains(this.main.config.classes.optgroup)) {
        if (parent.previousSibling) {
          prev = parent.previousSibling.childNodes[parent.previousSibling.childNodes.length - 1]
        }
      }
    }

    // If previous element exists highlight it
    if (prev) {
      if (highlighted) { highlighted.classList.remove(this.main.config.classes.highlighted) }
      prev.classList.add(this.main.config.classes.highlighted)
      ensureElementInView(this.list, prev)
    }
  }

  highlightDown () {
    var highlighted = this.list.querySelector('.' + this.main.config.classes.highlighted)
    var next = (highlighted ? highlighted.nextSibling : this.list.querySelector('.' + this.main.config.classes.option))

    // Check if parent is optgroup
    if (next === null) {
      var parent = highlighted.parentNode
      if (parent.classList.contains(this.main.config.classes.optgroup)) {
        if (parent.nextSibling) {
          next = parent.nextSibling.querySelector('.' + this.main.config.classes.option)
        }
      }
    }

    // If previous element exists highlight it
    if (next) {
      if (highlighted) { highlighted.classList.remove(this.main.config.classes.highlighted) }
      next.classList.add(this.main.config.classes.highlighted)
      ensureElementInView(this.list, next)
    }
  }

  // Create main container that options will reside
  list () {
    var list = document.createElement('div')
    list.classList.add(this.main.config.classes.list)
    return list
  }

  // Loop through data || filtered data and build options and append to list container
  options () {
    var data = this.main.data.filtered || this.main.data.data
    this.list.innerHTML = ''

    // Append individual options to div container
    for (var i = 0; i < data.length; i++) {
      // Create optgroup
      if (data[i].label) {
        let optgroup = document.createElement('div')
        optgroup.classList.add(this.main.config.classes.optgroup)

        // Create label
        let optgroupLabel = document.createElement('div')
        optgroupLabel.classList.add(this.main.config.classes.optgroupLabel)
        optgroupLabel.innerHTML = data[i].label
        optgroup.appendChild(optgroupLabel)

        let options = data[i].options
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
  option (data) {
    var option = document.createElement('div')
    option.classList.add(this.main.config.classes.option)
    if (this.main.data.selected.id === data.id) {
      option.classList.add(this.main.config.classes.highlighted)
    }
    option.dataset.id = data.id
    option.innerHTML = data.innerHTML
    option.onclick = (e) => {
      this.main.set(e.target.dataset.id, 'id')
    }
    return option
  }
}
