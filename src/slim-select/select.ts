import { generateID, kebabCase } from './helper'
import { DataArray, Optgroup, Option } from './store'

export interface SelectFields {
  id?: string
  style?: string
  class?: string[]
}

export default class Select {
  public select: HTMLSelectElement
  public listen: boolean = false

  // Mutation observer fields
  public changeFunc?: (data: DataArray) => void
  private observer: MutationObserver | null = null

  constructor(select: HTMLSelectElement) {
    this.select = select
  }

  public changeListen(on: boolean) {
    this.listen = on

    // Deal with some observer situations
    if (this.listen) {
      this.connectObserver()
    } else {
      this.disconnectObserver()
    }
  }

  // Add change listener to original select
  public addChangeFunc(func: (data: DataArray) => void): void {
    this.changeFunc = func
    this.addObserver()
    this.connectObserver()
    this.changeListen(true) // Last start listening
  }

  // remove change listener from original select
  public removeChangeFunc(): void {
    this.changeListen(false) // First stop listening
    this.changeFunc = undefined
  }

  private observeWrapper(mutations: MutationRecord[]): void {
    if (this.changeFunc) {
      this.changeFunc(this.getData())
    }
  }

  // Add MutationObserver to select
  private addObserver(): void {
    // If mutation observer already exists then disconnect and
    if (this.observer) {
      this.disconnectObserver()
      this.observer = null
    }

    // If anything changes in the select then update the data
    this.observer = new MutationObserver(this.observeWrapper)
  }

  private connectObserver(): void {
    if (this.observer) {
      this.observer.observe(this.select, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      })
    }
  }

  private disconnectObserver(): void {
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  // From the select element pull optgroup and options into data
  public getData(): DataArray {
    let data = []

    // Loop through nodes and get data
    const nodes = this.select.childNodes as any as HTMLOptGroupElement[] | HTMLOptionElement[]
    for (const n of nodes) {
      // Optgroup
      if (n.nodeName === 'OPTGROUP') {
        data.push(this.getOptgroupData(n as HTMLOptGroupElement))
      }

      // Option
      if (n.nodeName === 'OPTION') {
        data.push(this.getOptionData(n as HTMLOptionElement))
      }
    }

    return data
  }

  public getOptgroupData(optgroup: HTMLOptGroupElement): Optgroup {
    let data = {
      id: '',
      label: optgroup.label,
      options: [],
    } as Optgroup

    const options = optgroup.childNodes as any as HTMLOptionElement[]
    for (const o of options) {
      if (o.nodeName === 'OPTION') {
        data.options.push(this.getOptionData(o as HTMLOptionElement))
      }
    }

    return data
  }

  // From passed in option pull pieces of usable information
  public getOptionData(option: HTMLOptionElement): Option {
    return {
      id: (option.dataset ? option.dataset.id : false) || generateID(),
      value: option.value,
      text: option.text,
      innerHTML: option.innerHTML,
      selected: option.selected,
      disabled: option.disabled,
      placeholder: option.dataset.placeholder || '',
      class: option.className,
      style: option.style.cssText,
      data: option.dataset,
      mandatory: option.dataset ? option.dataset.mandatory === 'true' : false,
    } as Option
  }

  public updateSelect(selectFields: SelectFields, data: DataArray): void {
    // Update specific select fields
    if (selectFields.id) {
      this.select.id = selectFields.id
    }
    if (selectFields.style) {
      this.select.style.cssText = selectFields.style
    }
    if (selectFields.class) {
      this.select.className = ''
      selectFields.class.forEach((c) => {
        this.select.classList.add(c)
      })
    }

    // Update options
    this.updateOptions(data)
  }

  public updateOptions(data: DataArray): void {
    // Clear out select
    this.select.innerHTML = ''

    for (const d of data) {
      if (d instanceof Optgroup) {
        this.select.appendChild(this.createOptgroup(d))
      }

      if (d instanceof Option) {
        this.select.appendChild(this.createOption(d))
      }
    }
  }

  public createOptgroup(optgroup: Optgroup): HTMLOptGroupElement {
    const optgroupEl = document.createElement('optgroup')
    optgroupEl.id = optgroup.id
    optgroupEl.label = optgroup.label
    if (optgroup.options) {
      for (const o of optgroup.options) {
        optgroupEl.appendChild(this.createOption(o))
      }
    }
    return optgroupEl
  }

  public createOption(info: Option): HTMLOptionElement {
    const optionEl = document.createElement('option')
    optionEl.id = info.id
    optionEl.value = info.value !== '' ? info.value : info.text
    optionEl.innerHTML = info.innerHTML || info.text
    if (info.selected) {
      optionEl.selected = info.selected
    }
    if (info.display === false) {
      optionEl.style.display = 'none'
    }
    if (info.disabled) {
      optionEl.disabled = true
    }
    if (info.placeholder) {
      optionEl.setAttribute('data-placeholder', 'true')
    }
    if (info.mandatory) {
      optionEl.setAttribute('data-mandatory', 'true')
    }
    if (info.class) {
      info.class.split(' ').forEach((optionClass: string) => {
        optionEl.classList.add(optionClass)
      })
    }
    if (info.data && typeof info.data === 'object') {
      Object.keys(info.data).forEach((key) => {
        optionEl.setAttribute('data-' + kebabCase(key), info.data[key])
      })
    }

    return optionEl
  }
}
