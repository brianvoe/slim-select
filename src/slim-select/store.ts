import { copyOptionData, generateID } from './helpers'

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
    this.value =
      option.value === undefined ? option.text || '' : option.value || ''
    this.text = option.text || ''
    this.html = option.html || ''
    this.defaultSelected =
      option.defaultSelected !== undefined ? option.defaultSelected : false
    this.selected = option.selected !== undefined ? option.selected : false
    this.display = option.display !== undefined ? option.display : true
    this.disabled = option.disabled !== undefined ? option.disabled : false
    this.mandatory = option.mandatory !== undefined ? option.mandatory : false
    this.placeholder =
      option.placeholder !== undefined ? option.placeholder : false
    this.class = option.class || ''
    this.style = option.style || ''
    this.data = copyOptionData(option.data)
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
    this.selectAll =
      optgroup.selectAll === undefined ? false : optgroup.selectAll
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
  /** Baseline option list — restored when search is cleared (API results are temporary). */
  private catalog: (Option | Optgroup)[] | null = null

  constructor(
    type: 'single' | 'multiple',
    data: (Partial<Option> | Partial<Optgroup>)[]
  ) {
    this.selectType = type
    this.setData(data)
    this.snapshotCatalog()
  }

  // Validate DataArrayPartial
  public validateDataArray(
    data: (Partial<Option> | Partial<Optgroup>)[]
  ): Error | null {
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

  public partialToFullData(
    data: (Partial<Option> | Partial<Optgroup>)[]
  ): (Option | Optgroup)[] {
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

  /** Snapshot the current data as the catalog baseline (not called for API search results). */
  public snapshotCatalog(): void {
    this.catalog = this.cloneData(this.data)
  }

  /** Catalog baseline used when clearing search. */
  public getCatalogData(): (Option | Optgroup)[] {
    return this.cloneData(this.catalog ?? this.data)
  }

  private cloneData(data: (Option | Optgroup)[]): (Option | Optgroup)[] {
    return data.map((item) => {
      if (item instanceof Optgroup) {
        return new Optgroup({
          id: item.id,
          label: item.label,
          selectAll: item.selectAll,
          selectAllText: item.selectAllText,
          closable: item.closable,
          options: item.options.map((option) =>
            new Option(option instanceof Option ? { ...option } : option)
          )
        })
      }

      return new Option({ ...(item as Option) })
    })
  }

  private optionMatchesSelected(
    candidate: Option,
    selected: Option
  ): boolean {
    if (candidate.id === selected.id) {
      return true
    }

    return (
      selected.value !== '' &&
      candidate.value !== '' &&
      candidate.value === selected.value
    )
  }

  private findOptionInData(
    data: (Option | Optgroup)[],
    selected: Option
  ): Option | null {
    for (const item of data) {
      if (item instanceof Option) {
        if (this.optionMatchesSelected(item, selected)) {
          return item
        }
        continue
      }

      for (const option of item.options as Option[]) {
        if (this.optionMatchesSelected(option, selected)) {
          return option
        }
      }
    }

    return null
  }

  public setData(
    data: (Partial<Option> | Partial<Optgroup>)[],
    preserveSelected: boolean = false
  ) {
    // Convert new data to full data array
    const newData = this.partialToFullData(data)

    let selectedOptionsBeforeUpdate: Option[] = []

    if (preserveSelected) {
      // Get currently selected options before updating data
      selectedOptionsBeforeUpdate = this.getSelectedOptions()

      // Check which selected options are missing from new data
      const missingSelected: Option[] = []
      selectedOptionsBeforeUpdate.forEach((selectedOption) => {
        if (!this.findOptionInData(newData, selectedOption)) {
          missingSelected.push(selectedOption)
        }
      })

      // Add missing selected options to the beginning of the data
      this.data = [...missingSelected, ...newData]

      const allowEmptySelection =
        this.selectType === 'single' &&
        selectedOptionsBeforeUpdate.length === 0
      const selectedIds = selectedOptionsBeforeUpdate.map((selected) => {
        const match = this.findOptionInData(this.data, selected)
        return match ? match.id : selected.id
      })

      this.setSelectedBy('id', selectedIds, allowEmptySelection)
    } else {
      this.data = newData
    }

    // Run this.data through setSelected by value
    // to set the selected property and clean any wrong selected
    if (!preserveSelected && this.selectType === 'single') {
      this.setSelectedBy('id', this.getSelected(), false)
    }
  }

  // Get data will return all the data (cloned by default for public API safety)
  public getData(clone = true): Option[] | Optgroup[] {
    return this.filter(null, true, clone) as Option[] | Optgroup[]
  }

  // Get data options will return the data as a flat array of just options
  public getDataOptions(clone = true): Option[] {
    return this.filter(null, false, clone) as Option[]
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
  // When allowEmptySelection is true (e.g. after search with no prior selection), single select will not auto-select the first option
  public setSelectedBy(
    selectedType: 'id' | 'value',
    selectedValues: string[],
    allowEmptySelection: boolean = false
  ) {
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
          option.selected = hasSelected
            ? false
            : selectedValues.includes(optionValue)

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

        dataObj.selected = hasSelected
          ? false
          : selectedValues.includes(dataObj[selectedType])

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

    // If no options are selected, select the first option (unless allowEmptySelection, e.g. after search with no selection)
    if (
      this.selectType === 'single' &&
      firstOption &&
      !hasSelected &&
      !allowEmptySelection
    ) {
      firstOption.selected = true
      selectedObjects.push(firstOption)
    }

    // Put together a list of selected ids in the order of the selected values
    const selectedIds = selectedValues.map((value) => {
      return (
        selectedObjects.find((option) => option[selectedType] === value)?.id ||
        ''
      )
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
    const selected: Option[] = []

    for (const dataObj of this.data) {
      if (dataObj instanceof Optgroup) {
        for (const option of dataObj.options as Option[]) {
          if (option.selected) {
            selected.push(option)
          }
        }
      } else if (dataObj.selected) {
        selected.push(dataObj)
      }
    }

    return selected
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
    for (const dataObj of this.data) {
      if (dataObj instanceof Optgroup) {
        for (const option of dataObj.options as Option[]) {
          if (option.id === id) {
            return option
          }
        }
      } else if (dataObj.id === id) {
        return dataObj
      }
    }

    return null
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
  public search(
    search: string,
    searchFilter: (opt: Option, search: string) => boolean
  ): (Option | Optgroup)[] {
    search = search.trim()

    // If search is empty, return all data
    if (search === '') {
      return this.getData(false)
    }

    // Run filter with search function (read-only view for render)
    return this.filter((opt: Option): boolean => {
      return searchFilter(opt, search)
    }, true, false)
  }

  private createOptgroupView(
    source: Optgroup,
    options: Option[]
  ): Optgroup {
    const view = new Optgroup({
      id: source.id,
      label: source.label,
      selectAll: source.selectAll,
      selectAllText: source.selectAllText,
      closable: source.closable,
      options: []
    })
    view.options = options
    return view
  }

  // Filter takes in a function that will be used to filter the data
  // This will also keep optgroups of sub options meet the filter requirements
  public filter(
    filter: { (opt: Option): boolean } | null,
    includeOptgroup: boolean,
    clone = true
  ): (Option | Optgroup)[] {
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
              dataSearch.push(clone ? new Option(option) : option)
            } else {
              optOptions.push(clone ? new Option(option) : option)
            }
          }
        })

        // If we pushed any options to the optOptions array
        // push the optgroup to the dataSearch array
        if (optOptions.length > 0) {
          if (clone) {
            let optgroup = new Optgroup(dataObj)
            optgroup.options = optOptions
            dataSearch.push(optgroup)
          } else {
            dataSearch.push(this.createOptgroupView(dataObj, optOptions))
          }
        }
      }

      // Option
      if (dataObj instanceof Option) {
        if (!filter || filter(dataObj)) {
          dataSearch.push(clone ? new Option(dataObj) : dataObj)
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
