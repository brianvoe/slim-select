import { generateID, kebabCase } from './helper'
import { DataArray, Optgroup, Option } from './store'

export default class Select {
  public select: HTMLSelectElement
  public listen: boolean = false

  // Mutation observer fields
  public changeFunc?: (data: DataArray) => void
  private observer: MutationObserver | null = null

  constructor(select: HTMLSelectElement) {
    this.select = select
  }

  // Set to enabled
  public enable(): void {
    // Disable original select but dont trigger observer
    this.disconnectObserver()
    this.select.disabled = false
    this.connectObserver()
  }

  // Set to disabled
  public disable(): void {
    // Enable original select but dont trigger observer
    this.disconnectObserver()
    this.select.disabled = true
    this.connectObserver()
  }

  // Set misc attributes on the main select element
  public hideUI(): void {
    this.select.tabIndex = -1
    this.select.style.display = 'none'
    this.select.setAttribute('aria-hidden', 'true')
  }

  public showUI(): void {
    this.select.removeAttribute('tabindex')
    this.select.style.display = ''
    this.select.removeAttribute('aria-hidden')
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

  public setSelected(value: string[]): void {
    // Loop through options and set selected
    const options = this.select.childNodes as any as (HTMLOptGroupElement | HTMLOptionElement)[]
    for (const o of options) {
      if (o.nodeName === 'OPTGROUP') {
        const optgroup = o as HTMLOptGroupElement
        const optgroupOptions = optgroup.childNodes as any as HTMLOptionElement[]
        for (const oo of optgroupOptions) {
          if (oo.nodeName === 'OPTION') {
            const option = oo as HTMLOptionElement
            option.selected = value.includes(option.value)
          }
        }
      }

      if (o.nodeName === 'OPTION') {
        const option = o as HTMLOptionElement
        option.selected = value.includes(option.value)
      }
    }
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
        data.push(this.getDataFromOptgroup(n as HTMLOptGroupElement))
      }

      // Option
      if (n.nodeName === 'OPTION') {
        data.push(this.getDataFromOption(n as HTMLOptionElement))
      }
    }

    return data
  }

  public getDataFromOptgroup(optgroup: HTMLOptGroupElement): Optgroup {
    let data = {
      id: '',
      label: optgroup.label,
      options: [],
    } as Optgroup

    const options = optgroup.childNodes as any as HTMLOptionElement[]
    for (const o of options) {
      if (o.nodeName === 'OPTION') {
        data.options.push(this.getDataFromOption(o as HTMLOptionElement))
      }
    }

    return data
  }

  // From passed in option pull pieces of usable information
  public getDataFromOption(option: HTMLOptionElement): Option {
    return {
      id: (option.dataset ? option.dataset.id : false) || generateID(),
      value: option.value,
      text: option.text,
      html: option.innerHTML,
      selected: option.selected,
      disabled: option.disabled,
      placeholder: option.dataset.placeholder === 'true',
      class: option.className,
      style: option.style.cssText,
      data: option.dataset,
      mandatory: option.dataset ? option.dataset.mandatory === 'true' : false,
    } as Option
  }

  public updateSelect(id?: string, style?: string, classes?: string[]): void {
    // Update id
    if (id) {
      this.select.id = id
    }

    // Update style
    if (style) {
      this.select.style.cssText = style
    }

    // Update classes
    if (classes) {
      this.select.className = ''
      classes.forEach((c) => {
        if (c.trim() !== '') {
          this.select.classList.add(c.trim())
        }
      })
    }
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
    optionEl.innerHTML = info.html || info.text
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
