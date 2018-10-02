export function hasClassInTree(element: HTMLElement, className: string) {
  function hasClass(element: HTMLElement, className: string) {
    if (!(!className || !element || !element.classList || !element.classList.contains(className))) {
      return element
    }
    return null
  }

  function parentByClass(childElement: any, className: string): any {
    if (!childElement || childElement === document as any) {
      return null
    } else if (hasClass(childElement, className)) {
      return childElement
    } else {
      return parentByClass(childElement.parentNode, className)
    }
  }

  return hasClass(element, className) || parentByClass(element, className)
}

export function ensureElementInView(container: HTMLElement, element: HTMLElement): void {
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

export function putContent(el: HTMLElement, currentPosition: string, isOpen: boolean): string {
  let height = el.offsetHeight
  var rect = el.getBoundingClientRect()
  var elemTop = (isOpen ? rect.top : rect.top - height)
  var elemBottom = (isOpen ? rect.bottom : rect.bottom + height)

  if (elemTop <= 0) { return 'below' }
  if (elemBottom >= window.innerHeight) { return 'above' }
  return (isOpen ? currentPosition : 'below')
}

export function debounce(func: Function, wait = 100, immediate = false): () => void {
  var timeout: any
  return function () {
    var context = self
    var args = arguments
    var later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export function isValueInArrayOfObjects(selected: any, key: string, value: string): boolean {
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

export function highlight(str: string, search: any, className: string) {
  // the completed string will be itself if already set, otherwise, the string that was passed in
  var completedString: any = completedString || str
  var regex = new RegExp("(" + search.trim() + ")(?![^<]*>[^<>]*</)", "i")

  // If the regex doesn't match the string just exit
  if (!str.match(regex)) { return str }

  // Otherwise, get to highlighting
  var matchStartPosition = (str.match(regex) as any).index
  var matchEndPosition = matchStartPosition + (str.match(regex) as any)[0].toString().length
  var originalTextFoundByRegex = str.substring(matchStartPosition, matchEndPosition)
  completedString = completedString.replace(regex, `<mark class="${className}">${originalTextFoundByRegex}</mark>`)
  return completedString
}

// Custom events
(function () {
  let w = (window as any)
  if (typeof w.CustomEvent === "function") { return }

  function CustomEvent(event: any, params: any) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    var evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = w.Event.prototype
  w.CustomEvent = CustomEvent
})();