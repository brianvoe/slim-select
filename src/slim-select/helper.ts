export function hasClassInTree(element: HTMLElement, className: string) {
  function hasClass(e: HTMLElement, c: string) {
    if (!(!c || !e || !e.classList || !e.classList.contains(c))) { return e }
    return null
  }

  function parentByClass(e: any, c: string): any {
    if (!e || e === document as any) {
      return null
    } else if (hasClass(e, c)) {
      return e
    } else {
      return parentByClass(e.parentNode, c)
    }
  }

  return hasClass(element, className) || parentByClass(element, className)
}

export function ensureElementInView(container: HTMLElement, element: HTMLElement): void {
  // Determine container top and bottom
  const cTop = container.scrollTop + container.offsetTop // Make sure to have offsetTop
  const cBottom = cTop + container.clientHeight

  // Determine element top and bottom
  const eTop = element.offsetTop
  const eBottom = eTop + element.clientHeight

  // Check if out of view
  if (eTop < cTop) {
    container.scrollTop -= (cTop - eTop)
  } else if (eBottom > cBottom) {
    container.scrollTop += (eBottom - cBottom)
  }
}

export function putContent(el: HTMLElement, currentPosition: string, isOpen: boolean): string {
  const height = el.offsetHeight
  const rect = el.getBoundingClientRect()
  const elemTop = (isOpen ? rect.top : rect.top - height)
  const elemBottom = (isOpen ? rect.bottom : rect.bottom + height)

  if (elemTop <= 0) { return 'below' }
  if (elemBottom >= window.innerHeight) { return 'above' }
  return (isOpen ? currentPosition : 'below')
}

export function debounce(func: (...params: any[]) => void, wait = 100, immediate = false): () => void {
  let timeout: any
  return function(this: any, ...args: any[]) {
    const context = self
    const later = () => {
      timeout = null
      if (!immediate) { func.apply(context, args) }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) { func.apply(context, args) }
  }
}

export function isValueInArrayOfObjects(selected: any, key: string, value: string): boolean {
  if (!Array.isArray(selected)) {
    return selected[key] === value
  }

  for (const s of selected) {
    if (s && s[key] && s[key] === value) {
      return true
    }
  }

  return false
}

export function highlight(str: string, search: any, className: string) {
  // the completed string will be itself if already set, otherwise, the string that was passed in
  let completedString: any = str
  const regex = new RegExp('(' + search.trim() + ')(?![^<]*>[^<>]*</)', 'i')

  // If the regex doesn't match the string just exit
  if (!str.match(regex)) { return str }

  // Otherwise, get to highlighting
  const matchStartPosition = (str.match(regex) as any).index
  const matchEndPosition = matchStartPosition + (str.match(regex) as any)[0].toString().length
  const originalTextFoundByRegex = str.substring(matchStartPosition, matchEndPosition)
  completedString = completedString.replace(regex, `<mark class="${className}">${originalTextFoundByRegex}</mark>`)
  return completedString
}

export function kebabCase(str: string) {
  const result = str.replace(
    /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
    (match) => '-' + match.toLowerCase()
  )
  return (str[0] === str[0].toUpperCase())
    ? result.substring(1)
    : result
}

// Custom events
(() => {
  const w = (window as any)
  if (typeof w.CustomEvent === 'function') { return }

  function CustomEvent(event: any, params: any) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = w.Event.prototype
  w.CustomEvent = CustomEvent
})()
