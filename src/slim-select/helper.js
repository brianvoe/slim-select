export function filterValues (values, search) {
  var valuesArray = values.slice(0)
  search = search.toLowerCase()
  var filtered = valuesArray.map(function (obj) {
    // If optgroup
    if (obj.options) {
      let options = obj.options.filter(function (opt) {
        return opt.text.toLowerCase().indexOf(search) !== -1
      })
      if (options.length !== 0) {
        var optgroup = Object.assign({}, obj) // Break pointer
        optgroup.options = options
        return optgroup
      }
    }

    // If single option
    if (obj.text && obj.text.toLowerCase().indexOf(search) !== -1) { return obj }

    return false
  })

  filtered = filtered.filter(function (info) { return info })

  return filtered
}

export function hasClassInTree (element, className) {
  function hasClass (element, className) {
    if (!(!className || !element || !element.classList || !element.classList.contains(className))) {
      return element
    }
    return null
  }

  function parentByClass (childElement, className) {
    if (!childElement || childElement === document) {
      return null
    } else if (hasClass(childElement, className)) {
      return childElement
    } else {
      return parentByClass(childElement.parentNode, className)
    }
  }

  return hasClass(element, className) || parentByClass(element, className)
}
