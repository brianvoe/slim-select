import { generateID } from './helper'

export type DataArray = DataObject[]
export type DataObject = Optgroup | Option
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
  placeholder?: string
  class?: string
  style?: string
  data?: object
  mandatory?: boolean
}

export default class Store {
  public data: DataArray = []

  constructor() {}

  static mergeDefaultOption(option: Option): Option {
    const defaultOption: Option = {
      id: !option.id || option.id === '' ? generateID() : option.id,
      value: '',
      text: '',
      innerHTML: '',
      selected: false,
      display: true,
      disabled: false,
      placeholder: '',
      class: '',
      style: '',
      data: {},
      mandatory: false,
    } as Required<Option>

    return Object.assign({}, defaultOption, option)
  }

  // Set will take in a full data set
  // and set the data property to the new data
  public set(data: DataArray): DataArray {
    let dataOut: DataArray = []

    // Loop through each data object and merge with default option
    // if it doesn't already have one
    for (let dataObj of data) {
      // Optgroup
      if ('options' in dataObj) {
        if (dataObj.options) {
          let optOptions: Optgroup = {
            label: dataObj.label,
            options: [],
          } as Required<Optgroup>
          for (let option of dataObj.options) {
            optOptions.options!.push(Store.mergeDefaultOption(option))
          }
        }
      }

      // Option
      if ('text' in dataObj) {
        dataOut.push(Store.mergeDefaultOption(dataObj))
      }
    }

    this.data = dataOut
    return dataOut
  }

  // Pass in an array of id that will loop through
  // each option and set the selected property to true
  public setSelectedByID(selectedID: string[]) {
    for (let dataObj of this.data) {
      // Optgroup
      if ('options' in dataObj && dataObj.options) {
        for (let option of dataObj.options) {
          if (option.id) {
            option.selected = selectedID.includes(option.id)
          }
        }
      }

      // Option
      if ('id' in dataObj) {
        if (dataObj.id) {
          dataObj.selected = selectedID.includes(dataObj.id)
        }
      }
    }
  }

  // Pass in an array of id that will loop through
  // each option and set the selected property to true
  public setSelectedByValue(selectedValues: string[]) {
    for (let dataObj of this.data) {
      // Optgroup
      if ('options' in dataObj && dataObj.options) {
        dataObj.options.forEach((option: Option) => {
          if (option.value) {
            option.selected = selectedValues.includes(option.value)
          }
        })
      }

      // Option
      if ('id' in dataObj) {
        if (dataObj.value) {
          dataObj.selected = selectedValues.includes(dataObj.value)
        }
      }
    }
  }

  // Loop through each option and optgroup options
  // and return an array of all the selected options
  public getSelected(): DataArray {
    const selected: DataArray = []

    this.data.forEach((dataObj: DataObject) => {
      // Optgroup
      if ('options' in dataObj && dataObj.options) {
        let optOptions: Option[] = []
        dataObj.options.forEach((option: Option) => {
          if (option.selected) {
            optOptions.push(option)
          }
        })

        if (optOptions.length > 0) {
          selected.push({
            label: dataObj.label,
            options: optOptions,
          })
        }
      }

      // Option
      if ('id' in dataObj) {
        if (dataObj.selected) {
          selected.push(dataObj)
        }
      }
    })

    return selected
  }

  // Take in search string and return filtered list of values
  public search(search: string, searchFilter: (opt: Option, search: string) => boolean): DataArray {
    search = search.trim()
    if (search === '') {
      return []
    }

    const dataSearch: DataArray = []
    this.data.forEach((dataObj: DataObject) => {
      // Optgroup
      if ('options' in dataObj && dataObj.options) {
        let optOptions: Option[] = []
        dataObj.options.forEach((option: Option) => {
          if (searchFilter(option, search)) {
            optOptions.push(option)
          }
        })

        if (optOptions.length > 0) {
          dataSearch.push({
            label: dataObj.label,
            options: optOptions,
          })
        }
      }

      // Option
      if ('id' in dataObj) {
        if (searchFilter(dataObj, search)) {
          dataSearch.push(dataObj)
        }
      }
    })

    return dataSearch
  }
}
