import SlimSelect from '/dist/slimselect.es.js'

/** @type {Record<string, import('../dist/index').default>} */
const instances = {}

/** @type {Record<string, HTMLSelectElement>} */
const selects = {}

/**
 * @param {string} key
 * @param {string} selector
 * @param {import('../dist/index').Config} [config]
 */
function init(key, selector, config = {}) {
  const el = document.querySelector(selector)
  const instance = new SlimSelect({ select: el, ...config })
  instances[key] = instance
  selects[key] = el
  const section = el.closest('section')
  if (section) {
    section.setAttribute('data-ss-id', instance.settings.id)
  }
  return instance
}

window.SlimSelect = SlimSelect
window.e2e = { instances, selects }

init('basic', '#basic')

init('nativeSync', '#native-sync')

init('multi', '#multi', {
  settings: {
    closeOnSelect: false
  }
})

init('deselect', '#deselect', {
  settings: {
    allowDeselect: true
  }
})

init('noSearch', '#no-search', {
  settings: {
    showSearch: false
  }
})

init('keepSearch', '#keep-search', {
  settings: {
    keepSearch: true
  }
})

init('disabled', '#disabled', {
  settings: {
    disabled: true
  }
})

init('optgroups', '#optgroups')

init('placeholder', '#placeholder', {
  settings: {
    placeholderText: 'Choose one...'
  }
})

init('label', '#label-select')

init('openDown', '#open-down', {
  settings: {
    openPosition: 'down'
  }
})

init('openUp', '#open-up', {
  settings: {
    openPosition: 'up'
  }
})

init('searchHighlight', '#search-highlight', {
  settings: {
    searchHighlight: true
  }
})

init('disabledOption', '#disabled-option')

init('keyboard', '#keyboard', {
  settings: {
    showSearch: false
  }
})
