interface constructor {
  select: HTMLSelectElement
  showSearch: boolean
  searchText: string
  placeholderText: string
  isEnabled: boolean
}

export default class config {
  id: string = ''
  style: string
  class: DOMTokenList
  isMultiple: boolean = false
  showSearch: boolean = true
  searchText: string = 'No Results'
  placeholderText: string = 'Select Value'
  isEnabled: boolean = true

  // Classes
  readonly main: string = 'ss-main'
  readonly singleSelected: string = 'ss-single-selected'
  readonly arrow: string = 'ss-arrow'
  readonly multiSelected: string = 'ss-multi-selected'
  readonly add: string = 'ss-add'
  readonly plus: string = 'ss-plus'
  readonly values: string = 'ss-values'
  readonly value: string = 'ss-value'
  readonly valueText: string = 'ss-value-text'
  readonly valueDelete: string = 'ss-value-delete'
  readonly content: string = 'ss-content'
  readonly open: string = 'ss-open'
  readonly search: string = 'ss-search'
  readonly list: string = 'ss-list'
  readonly optgroup: string = 'ss-optgroup'
  readonly optgroupLabel: string = 'ss-optgroup-label'
  readonly option: string = 'ss-option'
  readonly highlighted: string = 'ss-highlighted'
  readonly disabled: string = 'ss-disabled'
  readonly hide: string = 'ss-hide'

  constructor (info: constructor) {
    this.id = 'ss-' + Math.floor(Math.random() * 100000)
    this.style = info.select.style.cssText
    this.class = info.select.classList

    this.isMultiple = info.select.multiple
    this.showSearch = (info.showSearch === false ? false : true)
    this.isEnabled = (info.isEnabled === false ? false : true)
    if (info.searchText) {this.searchText = info.searchText}
    if (info.placeholderText) {this.placeholderText = info.placeholderText}
  }
}
