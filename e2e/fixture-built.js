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

/** @type {{ calls: { searchValue: string }[], nextError: string | null, results: { value: string, text: string }[] }} */
const apiSearchState = {
  calls: [],
  nextError: null,
  results: [
    { value: 'api-one', text: 'API One' },
    { value: 'api-two', text: 'API Two' },
    { value: 'api-null', text: 'API Null' }
  ]
}

/**
 * @param {string} searchValue
 */
function apiSearchHandler(searchValue) {
  apiSearchState.calls.push({ searchValue })

  if (apiSearchState.nextError) {
    const message = apiSearchState.nextError
    apiSearchState.nextError = null
    return Promise.reject(message)
  }

  if (searchValue.length >= 2) {
    return apiSearchState.results
  }

  return []
}

/** @param {string} searchValue */
function apiSearchEmpty(searchValue) {
  apiSearchState.calls.push({ searchValue })
  return []
}

window.SlimSelect = SlimSelect
window.e2e = { instances, selects, apiSearchState }

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

init('apiSearch', '#api-search', {
  data: [
    { value: 'a', text: 'Catalog A' },
    { value: 'b', text: 'Catalog B' }
  ],
  events: {
    search: apiSearchHandler
  }
})

init('apiSearchMulti', '#api-search-multi', {
  data: [
    { value: 'a', text: 'Catalog A' },
    { value: 'b', text: 'Catalog B' }
  ],
  settings: {
    hideSelected: true,
    keepSearch: true
  },
  events: {
    search: apiSearchHandler
  }
})

init('apiSearchAddable', '#api-search-addable', {
  data: [
    { value: 'a', text: 'Catalog A' },
    { value: 'b', text: 'Catalog B' }
  ],
  events: {
    search: apiSearchEmpty,
    addable: (value) => ({
      text: value,
      value: value.toLowerCase()
    })
  }
})
