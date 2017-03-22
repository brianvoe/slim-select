export default function () {
  return {
    id: 'ss-' + Math.floor(Math.random() * 100000),
    classes: {
      main: 'ss-main',
      selected: 'ss-selected',
      content: 'ss-content',
      search: 'ss-search',
      list: 'ss-list',
      optgroup: 'ss-optgroup',
      optgroupLabel: 'ss-optgroup-label',
      option: 'ss-option'
    }
  }
}
