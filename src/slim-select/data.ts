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
  placeholder?: boolean|string
  class?: string
  style?: string
  data?: object
  mandatory?: boolean
}

// Class is responsible for managing the data
export class Data {
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
      mandatory: (info.mandatory ? info.mandatory : false)
    }
  }

  // Add to the current data array
  public add(data: Option) {
    this.data.push({
      id: String(Math.floor(Math.random() * 100000000)),
      value: data.value,
      text: data.text,
      innerHTML: '',
      selected: false,
      display: true,
      disabled: false,
      placeholder: false,
      class: undefined,
      mandatory: data.mandatory,
      data: {}
    })
  }

  // From passed in select element pull optgroup and options into data
  public parseSelectData() {
    this.data = []
    // Loop through nodes and create data
    const nodes = (this.main.select.element as HTMLSelectElement).childNodes as any as HTMLOptGroupElement[] | HTMLOptionElement[]
    for (const n of nodes) {
      if (n.nodeName === 'OPTGROUP') {
        const node = n as HTMLOptGroupElement
        const optgroup = {
          label: node.label,
          options: [] as Option[]
        }
        const options = n.childNodes as any as HTMLOptionElement[]
        for (const o of options) {
          if (o.nodeName === 'OPTION') {
            const option = this.pullOptionData(o as HTMLOptionElement)
            optgroup.options.push(option)

            // If option has placeholder set to true set placeholder text
            if (option.placeholder && option.text.trim() !== '') {
              this.main.config.placeholderText = option.text
            }
          }
        }
        this.data.push(optgroup)
      } else if (n.nodeName === 'OPTION') {
        const option = this.pullOptionData(n as HTMLOptionElement)
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
      class: option.className,
      style: option.style.cssText,
      data: option.dataset,
      mandatory: (option.dataset ? option.dataset.mandatory === 'true' : false)
    }
  }

  // From select element get current selected and set selected
  public setSelectedFromSelect(): void {
    if (this.main.config.isMultiple) {
      const options = this.main.select.element.options as any as HTMLOptionElement[]
      const newSelected: string[] = []
      for (const o of options) {
        if (o.selected) {
          const newOption = this.getObjectFromData(o.value, 'value')
          if (newOption && newOption.id) {
            newSelected.push(newOption.id)
          }
        }
      }
      this.setSelected(newSelected, 'id')
    } else {
      const element = this.main.select.element

      // Single select element
      if (element.selectedIndex !== -1) {
        const option = element.options[element.selectedIndex] as HTMLOptionElement
        const value = option.value
        this.setSelected(value, 'value')
      }
    }
  }

  // From value set the selected value
  public setSelected(value: string | string[], type = 'id'): void {
    // Loop through data and set selected values
    for (const d of this.data) {
      // Deal with optgroups
      if (d.hasOwnProperty('label')) {
        if (d.hasOwnProperty('options')) {
          const options = (d as Optgroup).options
          if (options) {
            for (const o of options) {
              // Do not select if its a placeholder
              if (o.placeholder) {continue}

              o.selected = this.shouldBeSelected(o, value, type)
            }
          }
        }
      } else {
        (d as Option).selected = this.shouldBeSelected((d as Option), value, type)
      }
    }
  }

  // Determines whether or not passed in option should be selected based upon possible values
  public shouldBeSelected(option: Option, value: string | string[], type: string = 'id'): boolean {
    if (Array.isArray(value)) {
      for (const v of value) {
        if (type in option && String((option as any)[type]) === String(v)) {
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
    let value: Option = { text: '', placeholder: this.main.config.placeholderText } // Dont worry about setting this(make typescript happy). If single a value will be selected
    const values: Option[] = []
    for (const d of this.data) {
      // Deal with optgroups
      if (d.hasOwnProperty('label')) {
        if (d.hasOwnProperty('options')) {
          const options = (d as Optgroup).options
          if (options) {
            for (const o of options) {
              if (o.selected) {
                // If single return option
                if (!this.main.config.isMultiple) {
                  value = o
                } else {
                  // Push to multiple array
                  values.push(o)
                }
              }
            }
          }
        }
      } else {
        // Push options to array
        if ((d as Option).selected) {
          // If single return option
          if (!this.main.config.isMultiple) {
            value = d as Option
          } else {
            // Push to multiple array
            values.push(d as Option)
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
        for (const s of selected) {
          values.push((s as any)[type])
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
      for (const s of selected) {
        if (String((s as any)[type]) !== String(value)) {
          values.push((s as any)[type])
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
    for (const d of this.data) {
      // If option check if value is the same
      if (type in d && String((d as any)[type]) === String(value)) {
        return d as Option
      }
      // If optgroup loop through options
      if (d.hasOwnProperty('options')) {
        const optgroupObject = d as Optgroup
        if (optgroupObject.options) {
          for (const oo of optgroupObject.options) {
            if (String((oo as any)[type]) === String(value)) {
              return oo
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
    const filtered = valuesArray.map((obj) => {
      // If optgroup
      if (obj.hasOwnProperty('options')) {
        const optgroupObj = obj as Optgroup
        let options: Option[] = []
        if (optgroupObj.options) {
          options = optgroupObj.options.filter((opt) => {
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
    this.filtered = filtered.filter((info) => info)
  }
}

export function validateData(data: dataArray): boolean {
  if (!data) { console.error('Data must be an array of objects'); return false }
  let isValid = false
  let errorCount = 0

  for (const d of data) {
    if (d.hasOwnProperty('label')) {
      if (d.hasOwnProperty('options')) {
        const optgroup = d as Optgroup
        const options = optgroup.options
        if (options) {
          for (const o of options) {
            isValid = validateOption(o)
            if (!isValid) { errorCount++ }
          }
        }
      }
    } else {
      const option = d as Option
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
