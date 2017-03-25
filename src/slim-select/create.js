// Class is responsible for creating all the elements
export default class create {
  constructor (info) {
    this.config = info.config
    this.data = info.data
    this.placeholderClick = info.placeholderClick
    this.searchInputChange = info.searchInputChange
    this.optionClick = info.optionClick
    this.open = info.open
    this.close = info.close

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
    container.classList.add(this.config.id)
    container.classList.add(this.config.classes.main)

    return container
  }

  selected () {
    let container = document.createElement('div')
    container.classList.add(this.config.classes.selected)

    // Placeholder text
    let placeholder = document.createElement('span')
    placeholder.classList.add('placeholder')
    placeholder.innerHTML = this.data.selected.innerHTML
    container.appendChild(placeholder)

    // Arrow
    var arrowContainer = document.createElement('span')
    arrowContainer.classList.add('arrow')
    let arrowIcon = document.createElement('i')
    arrowIcon.classList.add('arrow-up')
    arrowContainer.appendChild(arrowIcon)
    container.appendChild(arrowContainer)

    // Add onclick for main selector div
    container.onclick = this.placeholderClick

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
    container.classList.add(this.config.classes.content)
    return container
  }

  search () {
    var container = document.createElement('div')
    container.classList.add(this.config.classes.search)
    if (!this.data.hasSearch) { container.style.display = 'none' }

    var input = document.createElement('input')
    input.type = 'search'
    input.placeholder = 'Search'
    input.tabIndex = 0
    input.onkeyup = (e) => {
      if (e.key === 'Enter') {
        console.log(e.key)
      } else if (e.key === 'ArrowUp') {
        console.log(e.key)
      } else if (e.key === 'ArrowDown') {
        console.log(e.key)
      } else if (e.key === 'Escape') {
        this.close()
      } else {
        this.searchInputChange(e)
      }
    }
    input.onfocus = () => { this.open() }
    input.onblur = () => { this.close() }
    container.appendChild(input)

    return {
      container: container,
      input: input
    }
  }

  // Create main container that options will reside
  list () {
    var list = document.createElement('div')
    list.classList.add(this.config.classes.list)
    return list
  }

  // Loop through data || filtered data and build options and append to list container
  options () {
    var data = this.data.filtered || this.data.data
    this.list.innerHTML = ''

    // Append individual options to div container
    for (var i = 0; i < data.length; i++) {
      // Create optgroup
      if (data[i].label) {
        let optgroup = document.createElement('div')
        optgroup.classList.add(this.config.classes.optgroup)

        // Create label
        let optgroupLabel = document.createElement('div')
        optgroupLabel.classList.add(this.config.classes.optgroupLabel)
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
    option.classList.add(this.config.classes.option)
    option.dataset.id = data.id
    option.innerHTML = data.innerHTML
    option.onclick = this.optionClick
    return option
  }
}
