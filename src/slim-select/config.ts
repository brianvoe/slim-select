interface constructor {
  select: HTMLSelectElement
}

export default class config {
  id: string = ''
  readonly main: string = 'ss-main'
  readonly singleSelected: string = 'ss-single-selected'
  readonly arrow: string = 'ss-arrow'
  readonly multiSelected: string = 'ss-multi-selected'
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

  isMultiple: boolean = false
  constructor (info: constructor) {
    this.id = 'ss-' + Math.floor(Math.random() * 100000)

    this.isMultiple = info.select.multiple
  }
}
