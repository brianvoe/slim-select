import { generateID } from './helper'
import { Option } from './store'

export type SettingsPartial = Partial<Settings>

export default class Settings {
  public id: string = '' // Primary ID for the select
  public style: string = '' // Style attribute from the select element
  public class: string[] = [] // Class attribute from the select element

  // Dynamic settings
  public isMultiple: boolean = false
  public isAjax: boolean = false
  public isOpen: boolean = false
  public isAddable: boolean = false
  public isSearching: boolean = false

  // Fields set from constructor
  public isEnabled: boolean
  public showSearch: boolean
  public searchPlaceholder: string
  public searchText: string
  public searchingText: string
  public searchFocus: boolean
  public searchHighlight: boolean
  public searchFilter: (opt: Option, search: string) => boolean
  public closeOnSelect: boolean
  public contentPosition: string
  public placeholderText: string
  public allowDeselect: boolean
  public allowDeselectOption: boolean
  public hideSelectedOption: boolean
  public deselectLabel: string
  public valuesUseText: boolean
  public showOptionTooltips: boolean
  public selectByGroup: boolean
  public limit: number
  public timeoutDelay: number
  public addToBody: boolean

  constructor(settings?: SettingsPartial) {
    if (!settings) {
      settings = {}
    }

    this.id = 'ss-' + generateID()
    this.style = settings.style || ''
    this.class = settings.class || []

    this.isEnabled = settings.isEnabled || true
    this.showSearch = settings.showSearch || true
    this.searchPlaceholder = settings.searchPlaceholder || 'Search'
    this.searchText = settings.searchText || 'No Results'
    this.searchingText = settings.searchingText || 'Searching...'
    this.searchFocus = settings.searchFocus || true
    this.searchHighlight = settings.searchHighlight || false
    this.searchFilter =
      settings.searchFilter ||
      ((opt: Option, search: string) => {
        return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
      })
    this.closeOnSelect = settings.closeOnSelect || true
    this.contentPosition = settings.contentPosition || 'auto' // options: auto, up, down
    this.placeholderText = settings.placeholderText || 'Select Value'
    this.allowDeselect = settings.allowDeselect || false
    this.allowDeselectOption = settings.allowDeselectOption || false
    this.hideSelectedOption = settings.hideSelectedOption || false
    this.deselectLabel = settings.deselectLabel || 'x'
    this.valuesUseText = settings.valuesUseText || false
    this.showOptionTooltips = settings.showOptionTooltips || false
    this.selectByGroup = settings.selectByGroup || false
    this.limit = settings.limit || 0
    this.timeoutDelay = settings.timeoutDelay || 200
    this.addToBody = settings.addToBody || false
  }
}
