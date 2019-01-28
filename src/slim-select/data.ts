import SlimSelect from './index'

interface Constructor { main: SlimSelect }

export type dataArray = dataObject[]
export type dataObject = Optgroup | Option
export interface Optgroup {
  label: string
  options?: Option[]
}

export interface Option {
  id?: string
  value?: string
  text: string
  innerHTML?: string
  selected?: boolean
  display?: boolean
  disabled?: boolean
  placeholder?: boolean
  class?: string
  data?: object
}

// Class is responsible for managing the data
export default class Data {
  public main: SlimSelect
  public searchValue: string
  public data: dataObject[]
  public filtered: dataObject[] | null
  public contentOpen: boolean = false
  public contentPosition: string = 'below'
  public isOnChangeEnabled: boolean = true
  constructor(info: Constructor) {
    this.main = info.main
    this.searchValue = ''
    this.data = []
    this.filtered = null

    this.parseSelectData()
    this.setSelectedFromSelect()
  }

  public newOption(info: any): Option {
    return {
      id: (info.id ? info.id : String(Math.floor(Math.random() * 100000000))),
      value: (info.value ? info.value : ''),
      text: (info.text ? info.text : ''),
      innerHTML: (info.innerHTML ? info.innerHTML : ''),
      selected: (info.selected ? info.selected : false),
      display: (info.display !== undefined ? info.display : true),
      disabled: (info.disabled ? info.disabled : false),
      placeholder: (info.placeholder ? info.placeholder : false),
      class: (info.class ? info.class : undefined),
      data: (info.data ? info.data : {}),
    }
  }

  // Add to the current data array
  public add(data: Option) {
    const dataObject: Option = {
      id: String(Math.floor(Math.random() * 100000000)),
      value: data.value,
      text: data.text,
      innerHTML: '',
      selected: false,
      display: true,
      disabled: false,
      placeholder: false,
      class: undefined,
      data: {}
    }

    this.data.push(dataObject)
  }

  // From passed in select element pull optgroup and options into data
  public parseSelectData() {
    this.data = []
    // Loop through nodes and create data
    const element: HTMLSelectElement = this.main.select.element
    const nodes = element.childNodes
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeName === 'OPTGROUP') {
        const node = nodes[i] as HTMLOptGroupElement
        const optgroup = {
          label: node.label,
          options: [] as Option[]
        }
        const options = nodes[i].childNodes
        for (let ii = 0; ii < options.length; ii++) {
          if (options[ii].nodeName === 'OPTION') {
            const option = this.pullOptionData(options[ii] as HTMLOptionElement)
            optgroup.options.push(option)

            // If option has placeholder set to true set placeholder text
            if (option.placeholder && option.text.trim() !== '') {
              this.main.config.placeholderText = option.text
            }
          }
        }
        this.data.push(optgroup)
      } else if (nodes[i].nodeName === 'OPTION') {
        const option = this.pullOptionData(nodes[i] as HTMLOptionElement)
        this.data.push(option)

        // If option has placeholder set to true set placeholder text
        if (option.placeholder && option.text.trim() !== '') {
          this.main.config.placeholderText = option.text
        }
      }
    }
  }

  // From passed in option pull pieces of usable information
  public pullOptionData(option: HTMLOptionElement): Option {
    return {
      id: (option.dataset ? option.dataset.id : false) || String(Math.floor(Math.random() * 100000000)),
      value: option.value,
      text: option.text,
      innerHTML: option.innerHTML,
      selected: option.selected,
      disabled: option.disabled,
      placeholder: option.dataset.placeholder === 'true',
      class: option.classList.value,
      data: option.dataset
    }
  }

  // From select element get current selected and set selected
  public setSelectedFromSelect(): void {
    const options = this.main.select.element.options
    if (this.main.config.isMultiple) {
      const newSelected: string[] = []
      for (let i = 0; i < options.length; i++) {
        const option = options[i] as HTMLOptionElement
        if (option.selected) {
          const newOption = this.getObjectFromData(option.value, 'value')
          if (newOption && newOption.id) {
            newSelected.push(newOption.id)
          }
        }
      }
      this.setSelected(newSelected, 'id')
    } else {
      // Single select element
      if (options.selectedIndex !== -1) {
        const option = options[options.selectedIndex] as HTMLOptionElement
        const value = option.value
        this.setSelected(value, 'value')
      }
    }
  }

  // From value set the selected value
  public setSelected(value: string | string[], type = 'id'): void {
    // Loop through data and set selected values
    for (let i = 0; i < this.data.length; i++) {
      // Deal with optgroups
      if (this.data[i].hasOwnProperty('label')) {
        if (this.data[i].hasOwnProperty('options')) {
          const options = (this.data[i] as Optgroup).options
          if (options) {
            for (let o = 0; o < options.length; o++) {
              // Do not select if its a placeholder
              if (options[o].placeholder) {continue}

              options[o].selected = this.shouldBeSelected(options[o], value, type)
            }
          }
        }
      } else {
        (this.data[i] as Option).selected = this.shouldBeSelected((this.data[i] as Option), value, type)
      }
    }
  }

  // Determines whether or not passed in option should be selected based upon possible values
  public shouldBeSelected(option: Option, value: string | string[], type: string = 'id'): boolean {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (type in option && String((option as any)[type]) === String(value[i])) {
          return true
        }
      }
    } else {
      if (type in option && String((option as any)[type]) === String(value)) {
        return true
      }
    }

    return false
  }

  // From data get option | option[] of selected values
  // If single select return last selected value
  public getSelected(): Option | Option[] {
    let value: Option = { text: '' } // Dont worry about setting this(make typescript happy). If single a value will be selected
    const values: Option[] = []
    for (let i = 0; i < this.data.length; i++) {
      // Deal with optgroups
      if (this.data[i].hasOwnProperty('label')) {
        if (this.data[i].hasOwnProperty('options')) {
          const options = (this.data[i] as Optgroup).options
          if (options) {
            for (let o = 0; o < options.length; o++) {
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
        }
      } else {
        // Push options to array
        if ((this.data[i] as Option).selected) {
          // If single return option
          if (!this.main.config.isMultiple) {
            value = this.data[i] as Option
          } else {
            // Push to multiple array
            values.push(this.data[i] as Option)
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
  public addToSelected(value: string, type = 'id') {
    if (this.main.config.isMultiple) {
      const values = []
      const selected = this.getSelected()
      if (Array.isArray(selected)) {
        for (let i = 0; i < selected.length; i++) {
          values.push((selected[i] as any)[type])
        }
      }
      values.push(value)

      this.setSelected(values, type)
    }
  }

  // Remove object from selected
  public removeFromSelected(value: string, type = 'id') {
    if (this.main.config.isMultiple) {
      const values = []
      const selected = this.getSelected() as Option[]
      for (let i = 0; i < selected.length; i++) {
        if (String((selected[i] as any)[type]) !== String(value)) {
          values.push((selected[i] as any)[type])
        }
      }

      this.setSelected(values, type)
    }
  }

  // Trigger onChange callback
  public onDataChange(): void {
    if (this.main.onChange && this.isOnChangeEnabled) {
      this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())))
    }
  }

  // Take in a value loop through the data till you find it and return it
  public getObjectFromData(value: string, type = 'id'): Option | null {
    for (let i = 0; i < this.data.length; i++) {
      // If option check if value is the same
      if (type in this.data[i] && String((this.data[i] as any)[type]) === String(value)) {
        return this.data[i] as Option
      }
      // If optgroup loop through options
      if (this.data[i].hasOwnProperty('options')) {
        const optgroupObject = this.data[i] as Optgroup
        if (optgroupObject.options) {
          for (let ii = 0; ii < optgroupObject.options.length; ii++) {
            if (String((optgroupObject.options[ii] as any)[type]) === String(value)) {
              return optgroupObject.options[ii]
            }
          }
        }
      }
    }

    return null
  }

  // Take in search string and return filtered list of values
  public search(search: string) {
    this.searchValue = search
    if (search.trim() === '') { this.filtered = null; return }

    const searchFilter = this.main.config.searchFilter
    const valuesArray = this.data.slice(0)
    search = search.trim()
    const filtered = valuesArray.map(function(obj) {
      // If optgroup
      if (obj.hasOwnProperty('options')) {
        const optgroupObj = obj as Optgroup
        let options: Option[] = []
        if (optgroupObj.options) {
          options = optgroupObj.options.filter(function(opt) {
            return searchFilter(opt, search)
          })
        }
        if (options.length !== 0) {
          const optgroup = (Object as any).assign({}, optgroupObj) // Break pointer
          optgroup.options = options
          return optgroup
        }
      }

      // If single option
      if (obj.hasOwnProperty('text')) {
        const optionObj = obj as Option
        if (searchFilter(optionObj, search)) { return obj }
      }

      return null
    })

    // Filter out false values
    this.filtered = filtered.filter(function(info) { return info })
  }
}

export function validateData(data: dataArray): boolean {
  if (!data) { console.error('Data must be an array of objects'); return false }
  let isValid = false
  let errorCount = 0

  for (let i = 0; i < data.length; i++) {
    if (data[i].hasOwnProperty('label')) {
      if (data[i].hasOwnProperty('options')) {
        const optgroup = data[i] as Optgroup
        const options = optgroup.options
        if (options) {
          for (let j = 0; j < options.length; j++) {
            isValid = validateOption(options[j])
            if (!isValid) { errorCount++ }
          }
        }
      }
    } else {
      const option = data[i] as Option
      isValid = validateOption(option)
      if (!isValid) { errorCount++ }
    }
  }

  return errorCount === 0
}

export function validateOption(option: Option): boolean {
  if (option.text === undefined) {
    console.error('Data object option must have at least have a text value. Check object: ' + JSON.stringify(option))
    return false
  }
  return true
}
