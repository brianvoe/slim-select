import config from './config.js'
import {hasClassInTree} from './helper.js'
import Select from './select.js'
import Data from './data.js'
import Create from './create.js'

export default class SlimSelect {
  constructor (info = {}) {
    this.config = config()

    this.select = new Select({
      select: info.select,
      open: () => { this.open() },
      close: () => { this.close() }
    })

    this.data = new Data({
      select: this.select.element,
      hasSearch: (info.hasSearch !== undefined ? info.hasSearch : true)
    })

    this.slim = new Create({
      config: this.config,
      data: this.data,
      placeholderClick: () => { (this.data.contentOpen ? this.close() : this.open()) },
      searchInputChange: (e) => { this.search(e.target.value) },
      optionClick: (e) => { this.set(e.target.dataset.id, 'id') },
      open: () => { this.open() },
      close: () => { this.close() }
    })
    // Add after original select element
    this.select.element.after(this.slim.container)

    // Add onclick listener to document to closeContent if clicked outside
    document.addEventListener('click', (e) => {
      if (!hasClassInTree(e.target, this.config.id)) { this.close() }
    })
  }

  set (value, type = 'value', close = true) {
    this.data.setSelected(value, type)

    this.slim.selected.placeholder.innerHTML = this.data.selected.innerHTML
    this.select.element.value = this.data.selected.value
    if (close) { this.close() }
  }

  open () {
    this.data.contentOpen = true
    this.slim.search.input.focus()
    this.slim.selected.container.classList.add('open')
    this.slim.selected.arrowIcon.classList.remove('arrow-up')
    this.slim.selected.arrowIcon.classList.add('arrow-down')
    this.slim.content.classList.add('open')
  }

  close () {
    this.data.contentOpen = false
    this.slim.search.input.blur()
    this.slim.selected.container.classList.remove('open')
    this.slim.selected.arrowIcon.classList.add('arrow-up')
    this.slim.selected.arrowIcon.classList.remove('arrow-down')
    this.slim.content.classList.remove('open')
    this.search('') // clear search
  }

  search (value) {
    this.slim.search.input.value = value
    this.data.search(value)
    this.render()
  }

  render () {
    this.slim.options()
  }
}
