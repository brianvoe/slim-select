export default class CssClasses {
  public main: string
  // Placeholder
  public placeholder: string

  // Values
  public values: string
  public single: string
  public max: string
  public value: string
  public valueText: string
  public valueDelete: string
  public valueOut: string

  // Deselect
  public deselect: string
  public deselectPath: string // Not a class but whatever

  // Arrow
  public arrow: string
  public arrowClose: string // Not a class but whatever
  public arrowOpen: string // Not a class but whatever

  // Content
  public content: string
  public openAbove: string
  public openBelow: string

  // Search
  public search: string
  public searchHighlighter: string
  public searching: string
  public addable: string
  public addablePath: string // Not a class but whatever

  // List optgroups/options
  public list: string

  // Optgroup
  public optgroup: string
  public optgroupLabel: string
  public optgroupLabelText: string
  public optgroupActions: string
  public optgroupSelectAll: string // optgroup select all
  public optgroupSelectAllBox: string // Not a class but whatever
  public optgroupSelectAllCheck: string // Not a class but whatever
  public optgroupClosable: string

  // Option
  public option: string
  public optionDelete: string // Not a class but whatever
  public highlighted: string

  // Misc
  public open: string
  public close: string
  public selected: string
  public error: string
  public disabled: string
  public hide: string

  constructor(classes?: Partial<CssClasses>) {
    if (!classes) {
      classes = {}
    }

    this.main = classes.main || 'ss-main'
    this.placeholder = classes.placeholder || 'ss-placeholder'
    this.values = classes.values || 'ss-values'
    this.single = classes.single || 'ss-single'
    this.max = classes.max || 'ss-max'
    this.value = classes.value || 'ss-value'
    this.valueText = classes.valueText || 'ss-value-text'
    this.valueDelete = classes.valueDelete || 'ss-value-delete'
    this.valueOut = classes.valueOut || 'ss-value-out'

    this.deselect = classes.deselect || 'ss-deselect'
    this.deselectPath = classes.deselectPath || 'M10,10 L90,90 M10,90 L90,10'
    this.arrow = classes.arrow || 'ss-arrow'
    this.arrowClose = classes.arrowClose || 'M10,30 L50,70 L90,30'
    this.arrowOpen = classes.arrowOpen || 'M10,70 L50,30 L90,70'
    this.content = classes.content || 'ss-content'
    this.openAbove = classes.openAbove || 'ss-open-above'
    this.openBelow = classes.openBelow || 'ss-open-below'
    this.search = classes.search || 'ss-search'
    this.searchHighlighter = classes.searchHighlighter || 'ss-search-highlight'
    this.searching = classes.searching || 'ss-searching'
    this.addable = classes.addable || 'ss-addable'
    this.addablePath = classes.addablePath || 'M50,10 L50,90 M10,50 L90,50'
    this.list = classes.list || 'ss-list'
    this.optgroup = classes.optgroup || 'ss-optgroup'
    this.optgroupLabel = classes.optgroupLabel || 'ss-optgroup-label'
    this.optgroupLabelText = classes.optgroupLabelText || 'ss-optgroup-label-text'
    this.optgroupActions = classes.optgroupActions || 'ss-optgroup-actions'
    this.optgroupSelectAll = classes.optgroupSelectAll || 'ss-selectall'
    this.optgroupSelectAllBox = classes.optgroupSelectAllBox || 'M60,10 L10,10 L10,90 L90,90 L90,50'
    this.optgroupSelectAllCheck = classes.optgroupSelectAllCheck || 'M30,45 L50,70 L90,10'
    this.optgroupClosable = classes.optgroupClosable || 'ss-closable'
    this.option = classes.option || 'ss-option'
    this.optionDelete = classes.optionDelete || 'M10,10 L90,90 M10,90 L90,10'
    this.highlighted = classes.highlighted || 'ss-highlighted'
    this.open = classes.open || 'ss-open'
    this.close = classes.close || 'ss-close'
    this.selected = classes.selected || 'ss-selected'
    this.error = classes.error || 'ss-error'
    this.disabled = classes.disabled || 'ss-disabled'
    this.hide = classes.hide || 'ss-hide'
  }
}
