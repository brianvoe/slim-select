export default class SlimSelect {
  constructor (info = {}) {
    this.select = document.querySelector(info.select)
    // this.select.style.display = 'none'
    this.container = null
    this.selectedDiv = null
    this.arrow = null
    this.contentDiv = null
    this.searchInput = null
    this.options = null
    this.classes = this.setClasses()
    this.selected = {}
    this.data = []
    this.filteredData = null
    this.open = false

    this.parseData()
    this.getSelected()
    this.createSelect()

    // Add onChange listener to original select
    this.select.onchange = (e) => {
      this.setSelected(e.target.value)
    }

    // Add onclick listener to document to closeContent if clicked outside
    document.addEventListener('click', (e) => {
      if (!this.hasClassInTree(e.target, this.classes.id)) { this.closeContent() }
    })
  }

  setClasses () {
    return {
      id: 'ss-' + Math.floor(Math.random() * 100000),
      main: 'ss-main',
      selected: 'ss-selected',
      content: 'ss-content',
      search: 'ss-search',
      options: 'ss-options',
      optgroup: 'ss-optgroup',
      optgroupLabel: 'ss-optgroup-label',
      option: 'ss-option'
    }
  }

  parseData () {
    // Loop through nodes and create data
    var nodes = this.select.childNodes
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeName === 'OPTGROUP') {
        let optgroup = {
          label: nodes[i].label,
          options: []
        }
        let options = nodes[i].childNodes
        for (var ii = 0; ii < options.length; ii++) {
          optgroup.options.push({
            value: options[ii].value,
            text: options[ii].text,
            innerHTML: options[ii].innerHTML,
            data: options[ii].dataset
          })
        }
        this.data.push(optgroup)
      } else {
        this.data.push({
          value: nodes[i].value,
          text: nodes[i].text,
          innerHTML: nodes[i].innerHTML,
          data: nodes[i].dataset
        })
      }
    }
  }

  getSelected () {
    var selected = this.select.options[this.select.options.selectedIndex]
    this.selected = {
      value: selected.value,
      text: selected.text
    }
  }

  set (data) {
    this.selected = data // Set selected value

    this.updatePlaceholder()
    this.updateSelect()
    this.closeContent()

    return this.selected
  }

  setSelected (value) {
    for (var i = 0; i < this.data.length; i++) {
      // If option check if value is the same
      if (this.data[i].value && this.data[i].value === value) {
        return this.set(this.data[i])
      }
      // If optgroup loop through options
      if (this.data[i].label) {
        for (var ii = 0; ii < this.data[i].options.length; ii++) {
          if (this.data[i].options[ii].value === value) {
            return this.set(this.data[i].options[ii])
          }
        }
      }
    }
  }

  updatePlaceholder () {
    this.placeholder.innerHTML = this.selected.text
  }

  updateSelect () {
    this.select.value = this.selected.value
  }

  createSelect () {
    // Create main container
    this.container = document.createElement('div')
    this.container.classList.add(this.classes.id)
    this.container.classList.add(this.classes.main)

    // Append selector div
    this.container.appendChild(this.createSelected())

    // Create content section
    this.contentDiv = document.createElement('div')
    this.contentDiv.classList.add(this.classes.content)
    this.contentDiv.appendChild(this.createSearch())
    this.contentDiv.appendChild(this.createOptions())
    this.container.appendChild(this.contentDiv)

    // Add after original select
    this.select.after(this.container)
  }

  createSelected () {
    this.selectedDiv = document.createElement('div')
    this.selectedDiv.classList.add(this.classes.selected)

    // Placeholder
    this.placeholder = document.createElement('span')
    this.placeholder.classList.add('placeholder')
    this.placeholder.innerHTML = this.selected.text

    // Arrow
    var arrowDiv = document.createElement('span')
    arrowDiv.classList.add('arrow')
    this.arrow = document.createElement('i')
    this.arrow.classList.add('arrow-up')
    arrowDiv.appendChild(this.arrow)

    // Append placeholder an arrow
    this.selectedDiv.appendChild(this.placeholder)
    this.selectedDiv.appendChild(arrowDiv)

    // Add onclick for main selector div
    this.selectedDiv.onclick = () => {
      if (this.open) { this.closeContent() } else { this.openContent() }
    }
    return this.selectedDiv
  }

  openContent () {
    this.open = true
    if (!this.contentDiv.classList.contains('open')) {
      this.searchInput.focus()
      this.selectedDiv.classList.add('open')
      this.contentDiv.classList.add('open')
      this.arrow.classList.remove('arrow-up')
      this.arrow.classList.add('arrow-down')
    }
  }

  closeContent () {
    this.open = false
    if (this.contentDiv.classList.contains('open')) {
      this.searchInput.blur()
      this.clearSearch()
      this.selectedDiv.classList.remove('open')
      this.contentDiv.classList.remove('open')
      this.arrow.classList.add('arrow-up')
      this.arrow.classList.remove('arrow-down')
    }
  }

  createSearch () {
    var div = document.createElement('div')
    div.classList.add(this.classes.search)
    this.searchInput = document.createElement('input')
    this.searchInput.type = 'text'
    this.searchInput.placeholder = 'Search'
    this.searchInput.onkeyup = (e) => { this.search(e.target.value) }
    div.appendChild(this.searchInput)
    return div
  }

  search (value) {
    this.filteredData = (value === '' ? null : this.filterValues(this.data, value))
    this.renderOptions()
  }

  clearSearch () {
    this.searchInput.value = ''
    this.filteredData = null
    this.renderOptions()
  }

  createOptions () {
    // Create main div container
    this.options = document.createElement('div')
    this.options.classList.add(this.classes.options)
    this.renderOptions()

    return this.options
  }

  // Create single option
  createOption (data) {
    var option = document.createElement('div')
    option.classList.add(this.classes.option)
    option.dataset.value = data.value
    option.innerHTML = data.innerHTML
    option.onclick = (e) => { this.setSelected(e.target.dataset.value) }
    return option
  }

  renderOptions () {
    var data = this.filteredData || this.data
    this.options.innerHTML = ''

    // Append individual options to div container
    for (var i = 0; i < data.length; i++) {
      // Create optgroup
      if (data[i].label) {
        let optgroup = document.createElement('div')
        optgroup.classList.add(this.classes.optgroup)

        // Create label
        let optgroupLabel = document.createElement('div')
        optgroupLabel.classList.add(this.classes.optgroupLabel)
        optgroupLabel.innerHTML = data[i].label
        optgroup.appendChild(optgroupLabel)

        let options = data[i].options
        for (var ii = 0; ii < options.length; ii++) {
          optgroup.appendChild(this.createOption(options[ii]))
        }
        this.options.appendChild(optgroup)
      } else {
        this.options.appendChild(this.createOption(data[i]))
      }
    }
  }

  filterValues (values, part) {
    var valuesArray = values.slice(0)
    part = part.toLowerCase()
    var filtered = valuesArray.map(function (obj) {
      // If optgroup
      if (obj.options) {
        let options = obj.options.filter(function (opt) {
          return opt.text.toLowerCase().indexOf(part) !== -1
        })
        if (options.length !== 0) {
          var optgroup = Object.assign({}, obj) // Break pointer
          optgroup.options = options
          return optgroup
        }
      }

      // If single option
      if (obj.text && obj.text.toLowerCase().indexOf(part) !== -1) { return obj }

      return false
    })

    filtered = filtered.filter(function (info) { return info })

    return filtered
  }

  hasClassInTree (element, className) {
    function hasClass (element, className) {
      if (!(!className || !element || !element.classList || !element.classList.contains(className))) {
        return element
      }
      return null
    }

    function parentByClass (childElement, className) {
      if (!childElement || childElement === document) {
        return null
      } else if (hasClass(childElement, className)) {
        return childElement
      } else {
        return parentByClass(childElement.parentNode, className)
      }
    }

    return hasClass(element, className) || parentByClass(element, className)
  }
}
