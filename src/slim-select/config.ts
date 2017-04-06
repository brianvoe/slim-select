interface constructor {
  select: HTMLSelectElement
}

export default class config {
  id: string = ''
  placeholder: string = ''
  isMultiple: boolean = false

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

  constructor (info: constructor) {
    this.id = 'ss-' + Math.floor(Math.random() * 100000)

    this.isMultiple = info.select.multiple
  }
}
