// Class is responsible for managing the data
export default class data {
  constructor (info = {}) {
    this.select = info.select
    this.data = []
    this.filtered = null
    this.selected = {}

    this.hasSearch = info.hasSearch
    this.contentOpen = false

    this.parseSelectData()
    this.setSelectedFromSelect()
  }

  // From passed in select element pull optgroup and options into data
  parseSelectData () {
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
          optgroup.options.push(this.pullOptionData(options[ii]))
        }
        this.data.push(optgroup)
      } else {
        this.data.push(this.pullOptionData(nodes[i]))
      }
    }
  }

  // From passed in option pull pieces of usable information
  pullOptionData (option) {
    return {
      id: option.dataset.id || Math.floor(Math.random() * 100000000),
      value: option.value,
      text: option.text,
      innerHTML: option.innerHTML,
      data: option.dataset
    }
  }

  // From select element get current selected and set selected
  setSelectedFromSelect () {
    var value = this.select.options[this.select.options.selectedIndex].value
    this.setSelected(value, 'value')
  }

  // From value set the selected
  setSelected (value, type = 'id') {
    for (var i = 0; i < this.data.length; i++) {
      // If option check if value is the same
      if (this.data[i][type] && String(this.data[i][type]) === String(value)) {
        this.selected = this.data[i]
        break
      }
      // If optgroup loop through options
      if (this.data[i].label) {
        for (var ii = 0; ii < this.data[i].options.length; ii++) {
          if (String(this.data[i].options[ii][type]) === String(value)) {
            this.selected = this.data[i].options[ii]
            break
          }
        }
      }
    }
  }

  search (search) {
    if (search.trim() === '') { this.filtered = null; return }

    var valuesArray = this.data.slice(0)
    search = search.trim().toLowerCase()
    var filtered = valuesArray.map(function (obj) {
      // If optgroup
      if (obj.options) {
        let options = obj.options.filter(function (opt) {
          return opt.text.toLowerCase().indexOf(search) !== -1
        })
        if (options.length !== 0) {
          var optgroup = Object.assign({}, obj) // Break pointer
          optgroup.options = options
          return optgroup
        }
      }

      // If single option
      if (obj.text && obj.text.toLowerCase().indexOf(search) !== -1) { return obj }

      return false
    })

    this.filtered = filtered.filter(function (info) { return info })
  }
}
