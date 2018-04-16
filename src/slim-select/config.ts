interface constructor {
  select: HTMLSelectElement
  isAjax: boolean
  showSearch: boolean
  searchPlaceholder: string
  searchText: string
  searchHighlight: boolean
  closeOnSelect: boolean
  showContent: string
  placeholderText: string
  allowDeselect: boolean
  isEnabled: boolean
  valuesUseText: boolean
}

export default class config {
  id: string = ''
  style: string
  class: DOMTokenList
  isMultiple: boolean = false
  isAjax: boolean = false
  isSearching: boolean = false
  showSearch: boolean = true
  searchHighlight: boolean = false
  closeOnSelect: boolean = true
  showContent: string = 'auto' // options: auto, up, down
  searchPlaceholder: string = 'Search'
  searchText: string = 'No Results'
  placeholderText: string = 'Select Value'
  allowDeselect: boolean = false
  isEnabled: boolean = true
  valuesUseText: boolean = false

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
  readonly openAbove: string = 'ss-open-above'
  readonly openBelow: string = 'ss-open-below'
  readonly search: string = 'ss-search'
  readonly searchHighlighter: string = 'ss-search-highlight'
  readonly addable: string = 'ss-addable'
  readonly list: string = 'ss-list'
  readonly optgroup: string = 'ss-optgroup'
  readonly optgroupLabel: string = 'ss-optgroup-label'
  readonly option: string = 'ss-option'
  readonly highlighted: string = 'ss-highlighted'
  readonly disabled: string = 'ss-disabled'
  readonly hide: string = 'ss-hide'

  constructor(info: constructor) {
    this.id = 'ss-' + Math.floor(Math.random() * 100000)
    this.style = info.select.style.cssText
    this.class = info.select.classList

    this.isMultiple = info.select.multiple
    this.isAjax = info.isAjax
    this.showSearch = (info.showSearch === false ? false : true)
    this.searchHighlight = (info.searchHighlight === true ? true : false)
    this.closeOnSelect = (info.closeOnSelect === false ? false : true)
    if (info.showContent) { this.showContent = info.showContent }
    this.isEnabled = (info.isEnabled === false ? false : true)
    if (info.searchPlaceholder) { this.searchPlaceholder = info.searchPlaceholder }
    if (info.searchText) { this.searchText = info.searchText }
    if (info.placeholderText) { this.placeholderText = info.placeholderText }
    this.allowDeselect = (info.allowDeselect === true ? true : false)
    if (info.valuesUseText) { this.valuesUseText = info.valuesUseText }
  }
}
