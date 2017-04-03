interface constructor {
  select: HTMLSelectElement
}

export default class config {
  id: string = ''
  readonly main: string = 'ss-main'
  readonly selected: string = 'ss-selected'
  readonly content: string = 'ss-content'
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
