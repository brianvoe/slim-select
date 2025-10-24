import { generateID } from './helpers'

export class Option {
  id: string
  value: string
  text: string
  html: string
  defaultSelected: boolean
  selected: boolean
  display: boolean
  disabled: boolean
  placeholder: boolean
  class: string
  style: string
  data: { [key: string]: string }
  mandatory: boolean

  constructor(option: Partial<Option>) {
    this.id = !option.id || option.id === '' ? generateID() : option.id
    this.value = option.value === undefined ? option.text || '' : option.value || ''
    this.text = option.text || ''
    this.html = option.html || ''
    this.defaultSelected = option.defaultSelected !== undefined ? option.defaultSelected : false
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
export class Optgroup {
  public id: string
  public label: string
  public selectAll: boolean
  public selectAllText: string
  public closable: 'off' | 'open' | 'close'
  public options: Partial<Option>[]

  constructor(optgroup: Partial<Optgroup>) {
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

export default class Store {
  private selectType: 'single' | 'multiple' = 'single'

  // Main data set, never null
  private data: (Option | Optgroup)[] = []
  private selectedOrder: string[] = []

  constructor(type: 'single' | 'multiple', data: (Partial<Option> | Partial<Optgroup>)[]) {
    this.selectType = type
    this.setData(data)
  }

  // Validate DataArrayPartial
  public validateDataArray(data: (Partial<Option> | Partial<Optgroup>)[]): Error | null {
    if (!Array.isArray(data)) {
      return new Error('Data must be an array')
    }

    // Loop through each data object
    for (let dataObj of data) {
      if (!dataObj) continue

      // Optgroup
      if (dataObj instanceof Optgroup || 'label' in dataObj) {
        if (!('label' in dataObj)) {
          return new Error('Optgroup must have a label')
        }

        if ('options' in dataObj && dataObj.options) {
          for (let option of dataObj.options) {
            const validationError = this.validateOption(option)
            if (validationError) {
              return validationError
            }
          }
        }
      } else if (dataObj instanceof Option || 'text' in dataObj) {
        const validationError = this.validateOption(dataObj)
        if (validationError) {
          return validationError
        }
      } else {
        return new Error('Data object must be a valid optgroup or option')
      }
    }

    return null
  }

  // Validate Option
  public validateOption(option: Partial<Option>): Error | null {
    if (!('text' in option)) {
      return new Error('Option must have a text')
    }

    return null
  }

  public partialToFullData(data: (Partial<Option> | Partial<Optgroup>)[]): (Option | Optgroup)[] {
    let dataFinal: (Option | Optgroup)[] = []
    data.forEach((dataObj) => {
      if (!dataObj) return

      // Optgroup
      if (dataObj instanceof Optgroup || 'label' in dataObj) {
        let optOptions: Option[] = []
        if ('options' in dataObj && dataObj.options) {
          dataObj.options.forEach((option: Partial<Option>) => {
            optOptions.push(new Option(option))
          })
        }

        if (optOptions.length > 0) {
          dataFinal.push(new Optgroup(dataObj as Partial<Optgroup>))
        }
      }

      // Option
      if (dataObj instanceof Option || 'text' in dataObj) {
        dataFinal.push(new Option(dataObj as Partial<Option>))
      }
    })

    return dataFinal
  }

  public setData(data: (Partial<Option> | Partial<Optgroup>)[], preserveSelected: boolean = false) {
    // Convert new data to full data array
    const newData = this.partialToFullData(data)

    if (preserveSelected) {
      // Get currently selected options before updating data
      const selectedOptions = this.getSelectedOptions()

      // Check which selected options are missing from new data
      const missingSelected: (Option | Optgroup)[] = []
      selectedOptions.forEach((selectedOption) => {
        let found = false

        // Check if this selected option exists in new data
        for (const newItem of newData) {
          if (newItem instanceof Option && newItem.id === selectedOption.id) {
            found = true
            break
          }
          if (newItem instanceof Optgroup) {
            for (const opt of newItem.options) {
              if (opt.id === selectedOption.id) {
                found = true
                break
              }
            }
          }
        }

        if (!found) {
          missingSelected.push(selectedOption)
        }
      })

      // Add missing selected options to the beginning of the data
      this.data = [...missingSelected, ...newData]
    } else {
      this.data = newData
    }

    // Run this.data through setSelected by value
    // to set the selected property and clean any wrong selected
    if (this.selectType === 'single') {
      this.setSelectedBy('id', this.getSelected())
    }
  }

  // Get data will return all the data
  public getData(): Option[] | Optgroup[] {
    return this.filter(null, true) as Option[] | Optgroup[]
  }

  // Get data options will return the data as a
  // flat array of just options
  public getDataOptions(): Option[] {
    return this.filter(null, false) as Option[]
  }

  public addOption(option: Partial<Option>, addToStart: boolean = false) {
    if (addToStart) {
      let data = [new Option(option)] as (Option | Optgroup)[]
      this.setData(data.concat(this.getData()))
    } else {
      this.setData(this.getData().concat(new Option(option)))
    }
  }

  // Pass in an array of id that will loop through
  // each option and set the selected property to true
  // but also clean selected by determining selectType
  public setSelectedBy(selectedType: 'id' | 'value', selectedValues: string[]) {
    let firstOption: Partial<Option> | null = null
    let hasSelected = false
    const selectedObjects: Partial<Option>[] = []

    for (let dataObj of this.data) {
      // Optgroup
      if (dataObj instanceof Optgroup) {
        for (let option of dataObj.options as Partial<Option>[]) {
          if (!firstOption) {
            firstOption = option
          }

          let optionValue = option[selectedType] || ''
          option.selected = hasSelected ? false : selectedValues.includes(optionValue)

          // If the option is selected, set hasSelected to true
          // for single based selects
          if (option.selected) {
            selectedObjects.push(option)

            if (this.selectType === 'single') {
              hasSelected = true
            }
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
        if (dataObj.selected) {
          selectedObjects.push(dataObj)

          if (this.selectType === 'single') {
            hasSelected = true
          }
        }
      }
    }

    // If no options are selected, select the first option
    if (this.selectType === 'single' && firstOption && !hasSelected) {
      firstOption.selected = true
      selectedObjects.push(firstOption)
    }

    // Put together a list of selected ids in the order of the selected values
    const selectedIds = selectedValues.map((value) => {
      return selectedObjects.find((option) => option[selectedType] === value)?.id || ''
    })

    this.selectedOrder = selectedIds
  }

  public getSelected(): string[] {
    return this.getSelectedOptions().map((option) => option.id)
  }

  public getSelectedValues(): string[] {
    return this.getSelectedOptions().map((option) => option.value)
  }

  public getSelectedOptions(): Option[] {
    return this.filter((opt: Option) => {
      return opt.selected
    }, false) as Option[]
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
        option = dataObj.options[0] as Option
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
  public search(search: string, searchFilter: (opt: Option, search: string) => boolean): (Option | Optgroup)[] {
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
  public filter(filter: { (opt: Option): boolean } | null, includeOptgroup: boolean): (Option | Optgroup)[] {
    const dataSearch: (Option | Optgroup)[] = []
    this.data.forEach((dataObj: Option | Optgroup) => {
      // Optgroup
      if (dataObj instanceof Optgroup) {
        let optOptions: Option[] = []
        let options = dataObj.options as Option[]
        options.forEach((option: Option) => {
          if (!filter || filter(option as Option)) {
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

  // Take in an array of options and reoder them based upon the selected order
  public selectedOrderOptions(options: Option[]): Option[] {
    const newOrder: Option[] = []
    this.selectedOrder.forEach((id) => {
      const option = options.find((opt) => opt.id === id)
      if (option) {
        newOrder.push(option)
      }
    })

    // add any remaining options that were not in the selected order
    options.forEach((option) => {
      let isIn = false
      newOrder.forEach((selectedOption) => {
        if (option.id === selectedOption.id) {
          isIn = true

          return
        }
      })

      if (!isIn) {
        newOrder.push(option)
      }
    })

    return newOrder
  }
}
