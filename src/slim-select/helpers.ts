/**
 * Generate an 8 character random string
 *
 * @returns a random 8 character string
 */
export function generateID(): string {
  return Math.random().toString(36).substring(2, 10)
}

/**
 * Check if a className exists on an element or any parent of the element
 *
 * @param element - the element to check
 * @param className - the class name we are looking for
 *
 * @returns the element that has the class or `null` if the class was not found
 */
export function hasClassInTree(element: HTMLElement, className: string): HTMLElement | null {
  function hasClass(e: HTMLElement, c: string) {
    // If the element has the class return element
    if (c && e && e.classList && e.classList.contains(c)) {
      return e
    }

    // If the element has a dataset id of the class return element
    if (c && e && e.dataset && e.dataset.id && e.dataset.id === className) {
      return e
    }

    return null
  }

  function parentByClass(e: any, c: string): any {
    if (!e || e === (document as any)) {
      return null
    } else if (hasClass(e, c)) {
      return e
    } else {
      return parentByClass(e.parentNode, c)
    }
  }

  return hasClass(element, className) || parentByClass(element, className)
}

/**
 * Executes the last function call after the wait time (or instantaneous if `immediate` is `true`)
 *
 * @param func - function that should be called after the wait time
 * @param [wait=50] - wait time in ms
 * @param [immediate=false] - if true, execute the function immediately instead of waiting
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait = 50, immediate = false): () => void {
  let timeout: any
  return function (this: any, ...args: any[]): void {
    const context = self
    const later = () => {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}

/**
 * Compares two objects by comparing their JSON representations
 *
 * @param a - first object
 * @param b - second object
 *
 * @returns `true` if `a` and `b` JSON representations are equal, `false` otherwise
 */
export function isEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

/**
 * Converts an input string into kebabCase
 *
 * @param str - input string
 *
 * @returns the input string in kebabCase
 */
export function kebabCase(str: string): string {
  const result = str.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (match) => '-' + match.toLowerCase())
  return str[0] === str[0].toUpperCase() ? result.substring(1) : result
}
