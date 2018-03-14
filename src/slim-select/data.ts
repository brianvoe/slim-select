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
  selected: boolean
  display?: boolean
  disabled: boolean
  placeholder: string
  data: object
}

// Class is responsible for managing the data
export default class data {
  main: SlimSelect
  searchValue: string
  data: dataObject[]
  filtered: dataObject[]
  contentOpen: boolean = false
  contentPosition: string = 'below'
  isOnChangeEnabled: boolean = true
  constructor (info: constructor) {
    this.main = info.main
    this.searchValue = ''
    this.data = []
    this.filtered = null

    this.parseSelectData()
    this.setSelectedFromSelect()
  }

  newOption (info: any): option {
    return {
      id: (info.id ? info.id : String(Math.floor(Math.random() * 100000000))),
      value: (info.value ? info.value : ''),
      text: (info.text ? info.text : ''),
      innerHTML: (info.innerHTML ? info.innerHTML : ''),
      selected: (info.selected ? info.selected : false),
      display: (info.display ? info.display : true),
      disabled: (info.disabled ? info.disabled : false),
      placeholder: (info.placeholder ? info.placeholder : ''),
      data: (info.data ? info.data : {}),
    }
  }

  // Add to the current data array
  add (data: option) {
    let dataObject: option = {
      id: String(Math.floor(Math.random() * 100000000)),
      value: data.value,
      text: data.text,
      innerHTML: '',
      selected: false,
      display: true,
      disabled: false,
      placeholder: '',
      data: {}
    }

    this.data.push(dataObject)
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
      selected: option.selected,
      disabled: option.disabled,
      placeholder: option.dataset.placeholder || null,
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
    // Loop through data and set selected values
    for (var i = 0; i < this.data.length; i++) {
      // Deal with optgroups
      if (this.data[i].hasOwnProperty('label')) {
        if (this.data[i].hasOwnProperty('options')) {
          let options = (<optgroup>this.data[i]).options
          for (var o = 0; o < options.length; o++) {
            options[o].selected = this.shouldBeSelected(options[o], value, type)
          }
        }
      } else {
        (<option>this.data[i]).selected = this.shouldBeSelected((<option>this.data[i]), value, type)
      }
    }
  }

  // Determines whether or not passed in option should be selected based upon possible values
  shouldBeSelected (option: option, value: string | string [], type = 'id'): boolean {
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) {
        if (String(option[type]) === String(value[i])) {
          return true
        }
      }
    } else {
      if (String(option[type]) === String(value)) {
        return true
      }
    }

    return false
  }

  // From data get option | option[] of selected values
  // If single select return last selected value
  getSelected (): option | option[] {
    var value = null
    var values = []
    for (var i = 0; i < this.data.length; i++) {
      // Deal with optgroups
      if (this.data[i].hasOwnProperty('label')) {
        if (this.data[i].hasOwnProperty('options')) {
          let options = (<optgroup>this.data[i]).options
          for (var o = 0; o < options.length; o++) {
            if (options[o].selected) {
              // If single return option
              if (!this.main.config.isMultiple) {
                value = options[o]
              } else {
                // Push to multiple array
                values.push(options[o])
              }
            }
          }
        }
      } else {
        // Push options to array
        if ((<option>this.data[i]).selected) {
          // If single return option
          if (!this.main.config.isMultiple) {
            value = this.data[i]
          } else {
            // Push to multiple array
            values.push(this.data[i])
          }
        }
      }
    }

    // Either return array or object or null
    if (this.main.config.isMultiple) {
      return values
    }
    return value
  }

  // If select type is multiple append value and set selected
  addToSelected (value: string, type = 'id') {
    if (this.main.config.isMultiple) {
      let values = []
      let selected = <option[]>this.getSelected()
      for (var i = 0; i < selected.length; i++) {
        values.push(selected[i][type])
      }
      values.push(value)

      this.setSelected(values, type)
    }
  }

  // Remove object from selected
  removeFromSelected (value: string, type = 'id') {
    if (this.main.config.isMultiple) {
      let values = []
      let selected = <option[]>this.getSelected()
      for (var i = 0; i < selected.length; i++) {
        if (String(selected[i][type]) !== String(value)) {
          values.push(selected[i][type])
        }
      }

      this.setSelected(values, type)
    }
  }

  // Trigger onChange callback
  onDataChange (): void {
    if (this.main.onChange && this.isOnChangeEnabled) {
      this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())))
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

export function validateData (data: dataArray): boolean {
  if (!data) { console.error('Data must be an array of objects'); return }
  let isValid = false
  let errorCount = 0

  for (var i = 0; i < data.length; i++) {
    if (data[i].hasOwnProperty('label')) {
      if (data[i].hasOwnProperty('options')) {
        let optgroup = <optgroup>data[i]
        let options = optgroup.options
        for (var j = 0; j < options.length; j++) {
          isValid = validateOption(options[j])
          if (!isValid) { errorCount++ }
        }
      }
    } else {
      let option = <option>data[i]
      isValid = validateOption(option)
      if (!isValid) { errorCount++ }
    }
  }

  return errorCount === 0
}

export function validateOption (option: option): boolean {
  if (option.text === undefined) {
    console.error('Data object option must have at least have a text value. Check object: '+JSON.stringify(option))
    return false
  }
  return true
}
