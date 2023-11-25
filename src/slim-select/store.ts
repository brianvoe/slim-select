import { generateID } from './helpers'

export type DataArray = DataObject[]
export type DataObject = Optgroup | Option

export type DataArrayPartial = DataObjectPartial[]
export type DataObjectPartial = OptgroupOptional | OptionOptional

type selectType = 'single' | 'multiple'

export interface OptgroupOptional {
  id?: string
  label: string // Required
  selectAll?: boolean
  selectAllText?: string
  closable?: 'off' | 'open' | 'close'
  options?: OptionOptional[]
}

export class Optgroup {
  public id: string
  public label: string
  public selectAll: boolean
  public selectAllText: string
  public closable: 'off' | 'open' | 'close'
  public options: Option[]

  constructor(optgroup: OptgroupOptional) {
    this.id = !optgroup.id || optgroup.id === '' ? generateID() : optgroup.id
    this.label = optgroup.label || ''
    this.selectAll = optgroup.selectAll === undefined ? false : optgroup.selectAll
    this.selectAllText = optgroup.selectAllText || 'Select All'
    this.closable = optgroup.closable || 'off'

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
  mandatory?: boolean
  placeholder?: boolean
  class?: string
  style?: string
  data?: { [key: string]: string }
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
    this.value = option.value === undefined ? option.text : option.value
    this.text = option.text || ''
    this.html = option.html || ''
    this.selected = option.selected !== undefined ? option.selected : false
    this.display = option.display !== undefined ? option.display : true
    this.disabled = option.disabled !== undefined ? option.disabled : false
    this.mandatory = option.mandatory !== undefined ? option.mandatory : false
    this.placeholder = option.placeholder !== undefined ? option.placeholder : false
    this.class = option.class || ''
    this.style = option.style || ''
    this.data = option.data || {}
  }
}

export default class Store {
  private selectType: selectType = 'single'

  // Main data set, never null
  private data: DataArray = []

  constructor(type: selectType, data: DataArrayPartial) {
    this.selectType = type
    this.setData(data)
  }

  // Validate DataArrayPartial
  public validateDataArray(data: DataArray | DataArrayPartial): Error | null {
    if (!Array.isArray(data)) {
      return new Error('Data must be an array')
    }

    // Loop through each data object
    for (let dataObj of data) {
      // Optgroup
      if (dataObj instanceof Optgroup || 'label' in dataObj) {
        if (!('label' in dataObj)) {
          return new Error('Optgroup must have a label')
        }

        if ('options' in dataObj && dataObj.options) {
          for (let option of dataObj.options) {
            return this.validateOption(option)
          }
        }
      } else if (dataObj instanceof Option || 'text' in dataObj) {
        return this.validateOption(dataObj)
      } else {
        return new Error('Data object must be a valid optgroup or option')
      }
    }

    return null
  }

  // Validate Option
  public validateOption(option: Option | OptionOptional): Error | null {
    if (!('text' in option)) {
      return new Error('Option must have a text')
    }

    return null
  }

  public partialToFullData(data: DataArrayPartial): DataArray {
    let dataFinal: DataArray = []
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
          dataFinal.push(new Optgroup(dataObj))
        }
      }

      // Option
      if (dataObj instanceof Option || 'text' in dataObj) {
        dataFinal.push(new Option(dataObj))
      }
    })

    return dataFinal
  }

  public setData(data: DataArray | DataArrayPartial) {
    this.data = this.partialToFullData(data)

    // Run this.data through setSelected by value
    // to set the selected property and clean any wrong selected
    if (this.selectType === 'single') {
      this.setSelectedBy('value', this.getSelected())
    }
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

  public addOption(option: OptionOptional) {
    this.setData(this.getData().concat(new Option(option)))
  }

  // Pass in an array of id that will loop through
  // each option and set the selected property to true
  // but also clean selected by determining selectType
  public setSelectedBy(selectedType: 'id' | 'value', selectedValues: string[]) {
    let firstOption: Option | null = null
    let hasSelected = false

    for (let dataObj of this.data) {
      // Optgroup
      if (dataObj instanceof Optgroup) {
        for (let option of dataObj.options) {
          if (!firstOption) {
            firstOption = option
          }

          option.selected = hasSelected ? false : selectedValues.includes(option[selectedType])

          // If the option is selected, set hasSelected to true
          // for single based selects
          if (option.selected && this.selectType === 'single') {
            hasSelected = true
          }
        }
      }

      // Option
      if (dataObj instanceof Option) {
        if (!firstOption) {
          firstOption = dataObj
        }

        dataObj.selected = hasSelected ? false : selectedValues.includes(dataObj[selectedType])

        // If the option is selected, set hasSelected to true
        // for single based selects
        if (dataObj.selected && this.selectType === 'single') {
          hasSelected = true
        }
      }
    }

    // If no options are selected, select the first option
    if (this.selectType === 'single' && firstOption && !hasSelected) {
      firstOption.selected = true
    }
  }

  public getSelected(): string[] {
    let selectedOptions = this.getSelectedOptions()
    let selectedValues: string[] = []

    // Loop through each option and get the value
    selectedOptions.forEach((option: Option) => {
      selectedValues.push(option.value)
    })

    return selectedValues
  }

  public getSelectedOptions(): Option[] {
    return this.filter((opt: Option) => {
      return opt.selected
    }, false) as Option[]
  }

  public getSelectedIDs(): string[] {
    let selectedOptions = this.getSelectedOptions()

    let selectedIDs: string[] = []
    selectedOptions.forEach((op: Option) => {
      selectedIDs.push(op.id)
    })

    return selectedIDs
  }

  public getOptgroupByID(id: string): Optgroup | null {
    // Loop through each data object
    // and if optgroup is found, return it
    for (let dataObj of this.data) {
      if (dataObj instanceof Optgroup && dataObj.id === id) {
        return dataObj
      }
    }

    return null
  }

  public getOptionByID(id: string): Option | null {
    let options = this.filter((opt: Option) => {
      return opt.id === id
    }, false) as Option[]

    return options.length ? options[0] : null
  }

  public getSelectType(): string {
    return this.selectType
  }

  public getFirstOption(): Option | null {
    let option: Option | null = null
    for (let dataObj of this.data) {
      if (dataObj instanceof Optgroup) {
        option = dataObj.options[0]
      } else if (dataObj instanceof Option) {
        option = dataObj
      }

      if (option) {
        break
      }
    }
    return option
  }

  // Take in search string and return filtered list of values
  public search(search: string, searchFilter: (opt: Option, search: string) => boolean): DataArray {
    search = search.trim()

    // If search is empty, return all data
    if (search === '') {
      return this.getData()
    }

    // Run filter with search function
    return this.filter((opt: Option): boolean => {
      return searchFilter(opt, search)
    }, true)
  }

  // Filter takes in a function that will be used to filter the data
  // This will also keep optgroups of sub options meet the filter requirements
  public filter(filter: { (opt: Option): boolean } | null, includeOptgroup: boolean): DataArray {
    const dataSearch: DataArray = []
    this.data.forEach((dataObj: DataObject) => {
      // Optgroup
      if (dataObj instanceof Optgroup) {
        let optOptions: Option[] = []
        dataObj.options.forEach((option: Option) => {
          if (!filter || filter(option)) {
            // If you dont want to include optgroups
            // just push to the dataSearch array
            if (!includeOptgroup) {
              dataSearch.push(new Option(option))
            } else {
              optOptions.push(new Option(option))
            }
          }
        })

        // If we pushed any options to the optOptions array
        // push the optgroup to the dataSearch array
        if (optOptions.length > 0) {
          // Create new optgroup with the new options
          let optgroup = new Optgroup(dataObj)
          optgroup.options = optOptions

          // Push optgroup to dataSearch
          dataSearch.push(optgroup)
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
