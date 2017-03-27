export default class select {
  constructor (info = {}) {
    this.element = document.querySelector(info.select)
    this.open = info.open
    this.close = info.close

    this.addAttributes()

    // Add onChange listener to original select
    this.select.element.addEventListener('change', (e) => {
      this.set(e.target.value, 'value')
    })
  }

  addAttributes () {
    this.element.tabIndex = -1
    this.element.style.display = 'none'
  }

  addEventListeners () {

  }

  addMutationObserver () {
    // Add MutationObserver to select
    new MutationObserver((mutations) => {
      this.data.parseSelectData()
      this.data.setSelectedFromSelect()
      this.slim.options()
      this.set(this.data.selected.id, 'id', false)
    }).observe(this.select.element, {
      attributes: true,
      childList: true,
      characterData: true
    })
  }
}
