import { generateID } from './helper'

export type DataArray = DataObject[]
export type DataObject = Optgroup | Option

export type DataArrayPartial = DataObjectPartial[]
export type DataObjectPartial = OptgroupOptional | OptionOptional

export interface OptgroupOptional {
  id?: string
  label: string // Required
  options?: OptionOptional[]
}

export class Optgroup {
  public id: string
  public label: string
  public options: Option[]

  constructor(optgroup: OptgroupOptional) {
    this.id = !optgroup.id || optgroup.id === '' ? generateID() : optgroup.id
    this.label = optgroup.label || ''

    // If options exist, loop through options and create new option class
    // and set the options to the optgroup options field
    this.options = []
    if (optgroup.options) {
      for (const o of optgroup.options) {
        this.options.push(new Option(o))
      }
    }
  }
}

export interface OptionOptional {
  id?: string
  value?: string
  text: string // Required
  html?: string
  selected?: boolean
  display?: boolean
  disabled?: boolean
  placeholder?: boolean
  class?: string
  style?: string
  data?: { [key: string]: string }
  mandatory?: boolean
}

export class Option {
  id: string
  value: string
  text: string
  html: string
  selected: boolean
  display: boolean
  disabled: boolean
  placeholder: boolean
  class: string
  style: string
  data: { [key: string]: string }
  mandatory: boolean

  constructor(option: OptionOptional) {
    this.id = !option.id || option.id === '' ? generateID() : option.id
    this.value = option.value || ''
    this.text = option.text || ''
    this.html = option.html || ''
    this.selected = option.selected || false
    this.display = option.display || true
    this.disabled = option.disabled || false
    this.placeholder = option.placeholder || false
    this.class = option.class || ''
    this.style = option.style || ''
    this.data = option.data || {}
    this.mandatory = option.mandatory || false
  }
}

export default class Store {
  private data: DataArray = []

  constructor(data: DataArrayPartial) {
    this.setData(data)
  }

  public setData(data: DataArray | DataArrayPartial) {
    data.forEach((dataObj: DataObject | DataObjectPartial) => {
      // Optgroup
      if (dataObj instanceof Optgroup || 'label' in dataObj) {
        let optOptions: Option[] = []
        if ('options' in dataObj && dataObj.options) {
          dataObj.options.forEach((option: Option | OptionOptional) => {
            optOptions.push(new Option(option))
          })
        }

        if (optOptions.length > 0) {
          this.data.push(new Optgroup(dataObj))
        }
      }

      // Option
      if (dataObj instanceof Option || 'text' in dataObj) {
        this.data.push(new Option(dataObj))
      }
    })
  }

  // Get data will return all the data
  public getData(): DataArray {
    return this.filter(null, true)
  }

  // Get data options will return the data as a
  // flat array of just options
  public getDataOptions(): Option[] {
    return this.filter(null, false) as Option[]
  }

  // Pass in an array of id that will loop through
  // each option and set the selected property to true
  public setSelectedBy(selectedType: 'id' | 'value', selectedVals: string[]) {
    for (let dataObj of this.data) {
      // Optgroup
      if (dataObj instanceof Optgroup) {
        for (let option of dataObj.options) {
          if (option[selectedType]) {
            option.selected = selectedVals.includes(option[selectedType] as string)
          }
        }
      }

      // Option
      if (dataObj instanceof Option) {
        if (dataObj[selectedType]) {
          dataObj.selected = selectedVals.includes(dataObj[selectedType] as string)
        }
      }
    }
  }

  // Loop through each option and optgroup options
  // and return an array of all the selected options
  public getSelected(): DataArray {
    return this.filter((opt: Option) => {
      return opt.selected
    }, true)
  }

  public getSelectedOptions(): Option[] {
    return this.filter((opt: Option) => {
      return opt.selected
    }, false) as Option[]
  }

  public getSelectedIDs(): string[] {
    let selectedOptions = this.getSelected()

    let selectedIDs: string[] = []
    selectedOptions.forEach((dataObj: DataObject) => {
      if (dataObj instanceof Optgroup) {
        dataObj.options.forEach((option: Option) => {
          selectedIDs.push(option.id)
        })
      } else {
        selectedIDs.push(dataObj.id)
      }
    })

    return selectedIDs
  }

  public getSelectedValues(): string[] {
    let selectedOptions = this.getSelectedOptions()
    let selectedValues: string[] = []

    // Loop through each option and get the value
    selectedOptions.forEach((option: Option) => {
      selectedValues.push(option.value)
    })

    return selectedValues
  }

  public getOptionByID(id: string): Option | null {
    let options = this.filter((opt: Option) => {
      return opt.id === id
    }, false) as Option[]

    return options.length ? options[0] : null
  }

  // Take in search string and return filtered list of values
  public search(search: string, searchFilter?: (opt: Option, search: string) => boolean): DataArray {
    search = search.trim()
    if (search === '') {
      return []
    }

    return this.filter((opt: Option): boolean => {
      if (searchFilter) {
        return searchFilter(opt, search)
      }

      // If the searchFilter is not set use default
      return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }, true)
  }

  // Filter takes in a function that will be used to filter the data
  // This will also keep optgroups of sub options meet the filter requirements
  public filter(filter: { (opt: Option): boolean } | null, includeOptgroup: boolean): DataArray {
    const dataSearch: DataArray = []
    this.data.forEach((dataObj: DataObject) => {
      // Optgroup
      if (dataObj instanceof Optgroup) {
        // If you dont want to include optgroups
        if (!includeOptgroup) {
          // Loop through each option and check if it meets the filter requirements
          dataObj.options.forEach((option: Option) => {
            if (filter && filter(option)) {
              dataSearch.push(option)
            }
          })
        } else {
          let optOptions: Option[] = []
          dataObj.options.forEach((option: Option) => {
            if (!filter || filter(option)) {
              optOptions.push(new Option(option))
            }
          })

          if (optOptions.length > 0) {
            dataSearch.push(new Optgroup({ id: dataObj.id, label: dataObj.label, options: optOptions }))
          }
        }
      }

      // Option
      if (dataObj instanceof Option) {
        if (!filter || filter(dataObj)) {
          dataSearch.push(new Option(dataObj))
        }
      }
    })

    return dataSearch
  }
}
