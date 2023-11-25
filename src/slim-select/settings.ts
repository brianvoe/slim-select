import { generateID } from './helpers'

export type SettingsPartial = Partial<Settings>

export default class Settings {
  public id: string = '' // Primary ID for the select
  public style: string = '' // Style attribute from the select element
  public class: string[] = [] // Class attribute from the select element

  // Dynamic settings
  public isMultiple: boolean = false
  public isOpen: boolean = false
  public isFullOpen: boolean = false
  public intervalMove: NodeJS.Timeout | null = null

  // Fields set from constructor
  public disabled: boolean
  public alwaysOpen: boolean
  public showSearch: boolean
  public ariaLabel: string
  public searchPlaceholder: string
  public searchText: string
  public searchingText: string
  public searchHighlight: boolean
  public closeOnSelect: boolean
  public contentLocation: HTMLElement
  public contentPosition: 'relative' | 'absolute'
  public openPosition: 'auto' | 'up' | 'down'
  public placeholderText: string
  public allowDeselect: boolean
  public hideSelected: boolean
  public showOptionTooltips: boolean
  public minSelected: number
  public maxSelected: number
  public timeoutDelay: number
  public maxValuesShown: number
  public maxValuesMessage: string

  constructor(settings?: SettingsPartial) {
    if (!settings) {
      settings = {}
    }

    this.id = 'ss-' + generateID()
    this.style = settings.style || ''
    this.class = settings.class || []

    this.disabled = settings.disabled !== undefined ? settings.disabled : false
    this.alwaysOpen = settings.alwaysOpen !== undefined ? settings.alwaysOpen : false
    this.showSearch = settings.showSearch !== undefined ? settings.showSearch : true
    this.ariaLabel = settings.ariaLabel || 'Combobox'
    this.searchPlaceholder = settings.searchPlaceholder || 'Search'
    this.searchText = settings.searchText || 'No Results'
    this.searchingText = settings.searchingText || 'Searching...'
    this.searchHighlight = settings.searchHighlight !== undefined ? settings.searchHighlight : false
    this.closeOnSelect = settings.closeOnSelect !== undefined ? settings.closeOnSelect : true
    this.contentLocation = settings.contentLocation || document.body
    this.contentPosition = settings.contentPosition || 'absolute'
    this.openPosition = settings.openPosition || 'auto' // options: auto, up, down
    this.placeholderText = settings.placeholderText !== undefined ? settings.placeholderText : 'Select Value'
    this.allowDeselect = settings.allowDeselect !== undefined ? settings.allowDeselect : false
    this.hideSelected = settings.hideSelected !== undefined ? settings.hideSelected : false
    this.showOptionTooltips = settings.showOptionTooltips !== undefined ? settings.showOptionTooltips : false
    this.minSelected = settings.minSelected || 0
    this.maxSelected = settings.maxSelected || 1000
    this.timeoutDelay = settings.timeoutDelay || 200
    this.maxValuesShown = settings.maxValuesShown || 20
    this.maxValuesMessage = settings.maxValuesMessage || '{number} selected'
  }
}
