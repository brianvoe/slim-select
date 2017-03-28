export default class select {
  constructor (info = {}) {
    this.element = info.select
    this.main = info.main

    // If they passed in just data create select
    if (info.data) { this.data = info.data; this.create() }

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

  create () {
    // Clear out select
    this.element.innerHTML = ''

    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].options) {
        var optgroup = document.createElement('optgroup')
        optgroup.label = this.data[i].label
        for (var o = 0; o < this.data[i].options.length; o++) {
          optgroup.appendChild(this.createOption(this.data[i].options[o]))
        }
        this.element.appendChild(optgroup)
      } else {
        this.element.appendChild(this.createOption(this.data[i]))
      }
    }
  }

  createOption (info) {
    var option = document.createElement('option')
    option.value = info.value
    option.innerHTML = info.innerHTML || info.text

    return option
  }
}
