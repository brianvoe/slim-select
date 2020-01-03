import { Option } from './data'

interface Constructor {
  select: HTMLSelectElement
  isAjax: boolean
  showSearch?: boolean
  searchPlaceholder?: string
  searchText?: string
  searchingText?: string
  searchFocus?: boolean
  searchHighlight?: boolean
  searchFilter?: (opt: Option, search: string) => boolean
  closeOnSelect?: boolean
  showContent?: string
  placeholderText?: string
  allowDeselect?: boolean
  allowDeselectOption?: boolean
  hideSelectedOption?: boolean
  deselectLabel?: string
  isEnabled?: boolean
  valuesUseText?: boolean
  showOptionTooltips?: boolean
  selectByGroup?: boolean
  limit?: number
  timeoutDelay?: number
  addToBody?: boolean
}

export class Config {
  public id: string = ''
  public style: string
  public class: string[]
  public isMultiple: boolean = false
  public isAjax: boolean = false
  public isSearching: boolean = false
  public showSearch: boolean = true
  public searchFocus: boolean = true
  public searchHighlight: boolean = false
  public closeOnSelect: boolean = true
  public showContent: string = 'auto' // options: auto, up, down
  public searchPlaceholder: string = 'Search'
  public searchText: string = 'No Results'
  public searchingText: string = 'Searching...'
  public placeholderText: string = 'Select Value'
  public allowDeselect: boolean = false
  public allowDeselectOption: boolean = false
  public hideSelectedOption: boolean = false
  public deselectLabel: string = 'x'
  public isEnabled: boolean = true
  public valuesUseText: boolean = false
  public showOptionTooltips: boolean = false
  public selectByGroup: boolean = false
  public limit: number = 0
  public timeoutDelay: number = 200
  public addToBody: boolean = false

  // Classes
  public readonly main: string = 'ss-main'
  public readonly singleSelected: string = 'ss-single-selected'
  public readonly arrow: string = 'ss-arrow'
  public readonly multiSelected: string = 'ss-multi-selected'
  public readonly add: string = 'ss-add'
  public readonly plus: string = 'ss-plus'
  public readonly values: string = 'ss-values'
  public readonly value: string = 'ss-value'
  public readonly valueText: string = 'ss-value-text'
  public readonly valueDelete: string = 'ss-value-delete'
  public readonly content: string = 'ss-content'
  public readonly open: string = 'ss-open'
  public readonly openAbove: string = 'ss-open-above'
  public readonly openBelow: string = 'ss-open-below'
  public readonly search: string = 'ss-search'
  public readonly searchHighlighter: string = 'ss-search-highlight'
  public readonly addable: string = 'ss-addable'
  public readonly list: string = 'ss-list'
  public readonly optgroup: string = 'ss-optgroup'
  public readonly optgroupLabel: string = 'ss-optgroup-label'
  public readonly optgroupLabelSelectable: string = 'ss-optgroup-label-selectable'
  public readonly option: string = 'ss-option'
  public readonly optionSelected: string = 'ss-option-selected'
  public readonly highlighted: string = 'ss-highlighted'
  public readonly disabled: string = 'ss-disabled'
  public readonly hide: string = 'ss-hide'

  constructor(info: Constructor) {
    this.id = 'ss-' + Math.floor(Math.random() * 100000)
    this.style = info.select.style.cssText
    this.class = info.select.className.split(' ')

    this.isMultiple = info.select.multiple
    this.isAjax = info.isAjax
    this.showSearch = (info.showSearch === false ? false : true)
    this.searchFocus = (info.searchFocus === false ? false : true)
    this.searchHighlight = (info.searchHighlight === true ? true : false)
    this.closeOnSelect = (info.closeOnSelect === false ? false : true)
    if (info.showContent) { this.showContent = info.showContent }
    this.isEnabled = (info.isEnabled === false ? false : true)
    if (info.searchPlaceholder) { this.searchPlaceholder = info.searchPlaceholder }
    if (info.searchText) { this.searchText = info.searchText }
    if (info.searchingText) { this.searchingText = info.searchingText }
    if (info.placeholderText) { this.placeholderText = info.placeholderText }
    this.allowDeselect = (info.allowDeselect === true ? true : false)
    this.allowDeselectOption = (info.allowDeselectOption === true ? true : false)
    this.hideSelectedOption = (info.hideSelectedOption === true ? true : false)
    if (info.deselectLabel) { this.deselectLabel = info.deselectLabel }
    if (info.valuesUseText) { this.valuesUseText = info.valuesUseText }
    if (info.showOptionTooltips) { this.showOptionTooltips = info.showOptionTooltips }
    if (info.selectByGroup) { this.selectByGroup = info.selectByGroup }
    if (info.limit) { this.limit = info.limit }
    if (info.searchFilter) { this.searchFilter = info.searchFilter }
    if (info.timeoutDelay != null) { this.timeoutDelay = info.timeoutDelay }
    this.addToBody = (info.addToBody === true ? true : false)
  }

  public searchFilter(opt: Option, search: string): boolean {
    return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
  }
}
