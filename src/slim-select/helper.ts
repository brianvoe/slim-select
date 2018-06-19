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

export function ensureElementInView (container, element) {
  // Determine container top and bottom
  let cTop = container.scrollTop + container.offsetTop // Make sure to have offsetTop
  let cBottom = cTop + container.clientHeight

  // Determine element top and bottom
  let eTop = element.offsetTop
  let eBottom = eTop + element.clientHeight

  // Check if out of view
  if (eTop < cTop) {
    container.scrollTop -= (cTop - eTop)
  } else if (eBottom > cBottom) {
    container.scrollTop += (eBottom - cBottom)
  }
}

export function putContent (el, currentPosition: string, isOpen: boolean): string {
  let height = el.offsetHeight
  var rect = el.getBoundingClientRect()
  var elemTop = (isOpen ? rect.top : rect.top - height)
  var elemBottom = (isOpen ? rect.bottom : rect.bottom + height)

  if (elemTop <= 0) { return 'below' }
  if (elemBottom >= window.innerHeight) { return 'above'}
  return (isOpen ? currentPosition : 'below')
}

export function debounce (func, wait = 100, immediate = false) {
	var timeout
	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

export function isValueInArrayOfObjects (selected, key, value) {
  if (!Array.isArray(selected)) {
    return selected[key] === value
  }

  for (var i = 0; i < selected.length; i++) {
    if (selected[i] && selected[i][key] && selected[i][key] === value) {
      return true
    }
  }

  return false
}

export function highlight(text: string, search: string, className: string): string {
  var pattern = new RegExp('(>[^<.]*)(' + search.trim() + ')([^<.]*)', 'gi')
  var replaceWith = '$1<span ' + ( className ? 'class="' + className + '"' : '' ) + '">$2</span>$3'
  return text.replace(pattern, replaceWith)
}
