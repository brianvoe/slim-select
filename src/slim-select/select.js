export default class select {
  constructor (info = {}) {
    this.element = info.select
    this.main = info.main

    this.addAttributes()
    this.addEventListeners()
    this.addMutationObserver()
  }

  addAttributes () {
    this.element.tabIndex = -1
    // this.element.style.display = 'none'
  }

  addEventListeners () {
    // Add onChange listener to original select
    this.element.addEventListener('change', (e) => {
      this.main.set(e.target.value, 'value')
    })
  }

  addMutationObserver () {
    // Add MutationObserver to select
    new MutationObserver((mutations) => {
      this.main.data.parseSelectData()
      this.main.data.setSelectedFromSelect()
      this.main.slim.options()
      this.main.set(this.main.data.selected.id, 'id', false)
    }).observe(this.element, {
      attributes: true,
      childList: true,
      characterData: true
    })
  }
}
