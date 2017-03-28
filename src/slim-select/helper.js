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
