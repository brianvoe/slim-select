import SlimSelect from './index'

interface constructor {
  main: SlimSelect
}

export type dataArray = dataObject[]
export type dataObject = optgroup | option
export interface optgroup {
  label: string
  options: option[]
}

export interface option {
  id: string
  value: string
  text: string
  innerHTML: string
  disabled: boolean
  data: object
}

// Class is responsible for managing the data
export default class data {
  main: SlimSelect
  searchValue: string
  data: dataObject[]
  filtered: dataObject[]
  selected: option | option[]
  contentOpen: boolean = false
  constructor (info: constructor) {
    this.main = info.main
    this.searchValue = ''
    this.data = []
    this.filtered = null
    this.selected = (this.main.config.isMultiple ? [] : null)

    this.parseSelectData()
    this.setSelectedFromSelect()
  }

  // From passed in select element pull optgroup and options into data
  parseSelectData () {
    this.data = []
    // Loop through nodes and create data
    var element: HTMLSelectElement = this.main.select.element
    var nodes = element.childNodes
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeName === 'OPTGROUP') {
        let node = <HTMLOptGroupElement>nodes[i]
        let optgroup = {
          label: node.label,
          options: []
        }
        let options = nodes[i].childNodes
        for (var ii = 0; ii < options.length; ii++) {
          if (options[ii].nodeName === 'OPTION') {
            optgroup.options.push(this.pullOptionData(<HTMLOptionElement>options[ii]))
          }
        }
        this.data.push(optgroup)
      } else if (nodes[i].nodeName === 'OPTION') {
        this.data.push(this.pullOptionData(<HTMLOptionElement>nodes[i]))
      }
    }
  }

  // From passed in option pull pieces of usable information
  pullOptionData (option: HTMLOptionElement): option {
    return {
      id: (option.dataset ? option.dataset.id : false) || String(Math.floor(Math.random() * 100000000)),
      value: option.value,
      text: option.text,
      innerHTML: option.innerHTML,
      disabled: option.disabled,
      data: option.dataset
    }
  }

  // From select element get current selected and set selected
  setSelectedFromSelect (): void {
    let options = this.main.select.element.options
    if (this.main.config.isMultiple) {
      let newSelected = []
      for (var i = 0; i < options.length; i++) {
        let option = <HTMLOptionElement>options[i]
        if (option.selected) {
          newSelected.push(this.getObjectFromData(option.value, 'value').id)
        }
      }
      this.setSelected(newSelected, 'id')
    } else {
      // Single select element
      if (options.selectedIndex !== -1) {
        let option = <HTMLOptionElement>options[options.selectedIndex]
        let value = option.value
        this.setSelected(value, 'value')
      }
    }
  }

  // From value set the selected value
  setSelected (value: string | string[], type = 'id'): void {
    if (Array.isArray(value)) {
      this.selected = []
      for (var i = 0; i < value.length; i++) {
        this.selected.push(this.getObjectFromData(value[i], type))
      }
    } else {
      this.selected = this.getObjectFromData(value, type)
    }

    this.onDataChange()
  }

  // If select type is multiple
  addToSelected (value: string, type = 'id') {
    if (this.main.config.isMultiple) {
      let selected = <option[]>this.selected
      selected.push(this.getObjectFromData(value, type))

      this.onDataChange()
    }
  }

  // Remove object from selected
  removeFromSelected (value: string, type = 'id') {
    if (this.main.config.isMultiple) {
      let selected = <option[]>this.selected
      for (var i = 0; i < selected.length; i++) {
        if (String(selected[i][type]) === String(value)) {
          selected.splice(i, 1)
        }
      }

      this.onDataChange()
    }
  }

  // Trigger onChange callback
  onDataChange (): void {
    if (this.main.onChange) {
      let value
      if (this.main.config.isMultiple) {
        value = []
        for (var i = 0; i < (<option[]>this.selected).length; i++) {
          value.push((<option>this.selected[i]).value)
        }
      } else {
        value = (<option>this.selected).value
      }

      this.main.onChange(value)
    }
  }

  // Take in a value loop through the data till you find it and return it
  getObjectFromData (value: string, type = 'id'): option {
    for (var i = 0; i < this.data.length; i++) {
      // If option check if value is the same
      if (type in this.data[i] && String(this.data[i][type]) === String(value)) {
        return <option>this.data[i]
      }
      // If optgroup loop through options
      if (this.data[i].hasOwnProperty('options')) {
        let optgroupObject = <optgroup>this.data[i]
        for (var ii = 0; ii < optgroupObject.options.length; ii++) {
          if (String(optgroupObject.options[ii][type]) === String(value)) {
            return optgroupObject.options[ii]
          }
        }
      }
    }

    return null
  }

  // Take in search string and return filtered list of values
  search (search: string) {
    this.searchValue = search
    if (search.trim() === '') { this.filtered = null; return }

    var valuesArray = this.data.slice(0)
    search = search.trim().toLowerCase()
    var filtered = valuesArray.map(function (obj) {
      // If optgroup
      if (obj.hasOwnProperty('options')) {
        let optgroupObj = <optgroup>obj
        let options = optgroupObj.options.filter(function (opt) {
          return opt.text.toLowerCase().indexOf(search) !== -1
        })
        if (options.length !== 0) {
          var optgroup = (<any>Object).assign({}, optgroupObj) // Break pointer
          optgroup.options = options
          return optgroup
        }
      }

      // If single option
      if (obj.hasOwnProperty('text')) {
        let optionObj = <option>obj
        if (optionObj.text.toLowerCase().indexOf(search) !== -1) { return obj }
      }

      return null
    })

    // Filter out false values
    this.filtered = filtered.filter(function (info) { return info })
  }
}

export function validateData (data: dataArray) {
  if (!data) { throw new Error('Data must be an array of objects') }

  for (var i = 0; i < data.length; i++) {
    if (data[i].hasOwnProperty('label')) {
      if (data[i].hasOwnProperty('options')) {
        let optgroup = <optgroup>data[i]
        let options = optgroup.options
        for (var i = 0; i < options.length; i++) {
          validateOption(options[i])
        }
      }
    } else {
      let option = <option>data[i]
      validateOption(option)
    }


  }
}

export function validateOption (option: option) {
  if (!option.text) {
    throw new Error('Data object option must have at least a text')
  }
}
