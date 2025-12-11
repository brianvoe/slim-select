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
  public contentOpen: string
  public dirAbove: string
  public dirBelow: string

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
  public mainOpen: string
  public close: string
  public selected: string
  public error: string
  public disabled: string
  public hide: string

  constructor(classes?: Partial<CssClasses>) {
    if (!classes) {
      classes = {}
    }

    let join = (a = '', b = '') => `${a} ${b}`.trim()

    this.main = join('ss-main', classes.main)
    this.placeholder = join('ss-placeholder', classes.placeholder)
    this.values = join('ss-values', classes.values)
    this.single = join('ss-single', classes.single)
    this.max = join('ss-max', classes.max)
    this.value = join('ss-value', classes.value)
    this.valueText = join('ss-value-text', classes.valueText)
    this.valueDelete = join('ss-value-delete', classes.valueDelete)
    this.valueOut = join('ss-value-out', classes.valueOut)

    this.deselect = join('ss-deselect', classes.deselect)
    this.deselectPath = classes.deselectPath || 'M10,10 L90,90 M10,90 L90,10'
    this.arrow = join('ss-arrow', classes.arrow)
    this.arrowClose = classes.arrowClose || 'M10,30 L50,70 L90,30'
    this.arrowOpen = classes.arrowOpen || 'M10,70 L50,30 L90,70'
    this.content = join('ss-content', classes.content)
    this.contentOpen = join('ss-open', classes.contentOpen)
    this.dirAbove = join('ss-dir-above', classes.dirAbove)
    this.dirBelow = join('ss-dir-below', classes.dirBelow)
    this.search = join('ss-search', classes.search)
    this.searchHighlighter = join('ss-search-highlight', classes.searchHighlighter)
    this.searching = join('ss-searching', classes.searching)
    this.addable = join('ss-addable', classes.addable)
    this.addablePath = classes.addablePath || 'M50,10 L50,90 M10,50 L90,50'
    this.list = join('ss-list', classes.list)
    this.optgroup = join('ss-optgroup', classes.optgroup)
    this.optgroupLabel = join('ss-optgroup-label', classes.optgroupLabel)
    this.optgroupLabelText = join('ss-optgroup-label-text', classes.optgroupLabelText)
    this.optgroupActions = join('ss-optgroup-actions', classes.optgroupActions)
    this.optgroupSelectAll = join('ss-selectall', classes.optgroupSelectAll)
    this.optgroupSelectAllBox = classes.optgroupSelectAllBox || 'M60,10 L10,10 L10,90 L90,90 L90,50'
    this.optgroupSelectAllCheck = classes.optgroupSelectAllCheck || 'M30,45 L50,70 L90,10'
    this.optgroupClosable = join('ss-closable', classes.optgroupClosable)
    this.option = join('ss-option', classes.option)
    this.optionDelete = classes.optionDelete || 'M10,10 L90,90 M10,90 L90,10'
    this.highlighted = join('ss-highlighted', classes.highlighted)
    this.mainOpen = join('ss-open', classes.mainOpen)
    this.close = join('ss-close', classes.close)
    this.selected = join('ss-selected', classes.selected)
    this.error = join('ss-error', classes.error)
    this.disabled = join('ss-disabled', classes.disabled)
    this.hide = join('ss-hide', classes.hide)
  }

  public getFirst(name: keyof Omit<CssClasses, 'getFirst'>): string {
    return this[name].split(' ')[0]
  }
}
