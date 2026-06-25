import type { Optgroup, Option } from './store'
import { MODAL_MOBILE_BREAKPOINT, type ModalSetting } from './settings'

type DataItem = Partial<Option> | Partial<Optgroup>

/** Copy option data attributes into a plain object (not a live DOMStringMap). */
export function copyOptionData(
  data?: { [key: string]: string } | DOMStringMap | null
): { [key: string]: string } {
  if (!data) {
    return {}
  }

  const result: { [key: string]: string } = {}
  for (const key of Object.keys(data)) {
    const value = data[key]
    if (value !== undefined) {
      result[key] = value
    }
  }
  return result
}

/** Label text only — excludes nested form controls (e.g. wrapped select options). */
export function getLabelElementText(label: HTMLLabelElement): string {
  const clone = label.cloneNode(true) as HTMLLabelElement
  clone
    .querySelectorAll('select, option, optgroup, textarea, input, button')
    .forEach((el) => el.remove())

  return clone.textContent?.replace(/\s+/g, ' ').trim() || ''
}

/** Associated label text for a select, or its aria-label when no label is linked. */
export function getAssociatedLabelText(select: HTMLSelectElement): string {
  if (select.labels && select.labels.length > 0) {
    const texts = Array.from(select.labels)
      .map(getLabelElementText)
      .filter(Boolean)

    if (texts.length > 0) {
      return [...new Set(texts)].join(' ')
    }
  }

  return select.getAttribute('aria-label')?.trim() || ''
}

// Generate an 8 character random string
export function generateID(): string {
  return Math.random().toString(36).substring(2, 10)
}

export function hasClassInTree(
  element: HTMLElement,
  className: string
): HTMLElement | null {
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

// debounce will call the last requested function after the wait time
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait = 50,
  immediate = false
): () => void {
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

export function isEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

/** Compare selected id sets regardless of order (multi-select). */
export function selectedIdsEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) {
    return false
  }

  const sortedA = [...a].sort()
  const sortedB = [...b].sort()
  return sortedA.every((id, i) => id === sortedB[i])
}

const OPTION_FIELDS = [
  'id',
  'value',
  'text',
  'html',
  'defaultSelected',
  'selected',
  'display',
  'disabled',
  'placeholder',
  'class',
  'style',
  'mandatory'
] as const

function shallowRecordEqual(
  a: Record<string, string>,
  b: Record<string, string>
): boolean {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  if (aKeys.length !== bKeys.length) {
    return false
  }

  for (const key of aKeys) {
    if (a[key] !== b[key]) {
      return false
    }
  }

  return true
}

function normalizedOptionField(
  option: Partial<Option>,
  field: (typeof OPTION_FIELDS)[number]
): string | boolean | Record<string, string> {
  switch (field) {
    case 'id':
      return option.id || ''
    case 'value':
      return option.value === undefined ? option.text || '' : option.value || ''
    case 'text':
      return option.text || ''
    case 'html':
      return option.html || ''
    case 'defaultSelected':
      return option.defaultSelected ?? false
    case 'selected':
      return option.selected ?? false
    case 'display':
      return option.display ?? true
    case 'disabled':
      return option.disabled ?? false
    case 'placeholder':
      return option.placeholder ?? false
    case 'class':
      return option.class || ''
    case 'style':
      return option.style || ''
    case 'mandatory':
      return option.mandatory ?? false
    default:
      return option.data || {}
  }
}

function isOptgroupItem(item: DataItem): item is Partial<Optgroup> {
  return (
    !!item && typeof item === 'object' && 'label' in item && 'options' in item
  )
}

function optionStructureEqual(a: Partial<Option>, b: Partial<Option>): boolean {
  for (const field of OPTION_FIELDS) {
    const av = normalizedOptionField(a, field)
    const bv = normalizedOptionField(b, field)

    if (av !== bv) {
      return false
    }
  }

  return shallowRecordEqual(a.data || {}, b.data || {})
}

function optgroupStructureEqual(
  a: Partial<Optgroup>,
  b: Partial<Optgroup>
): boolean {
  const normalized = (optgroup: Partial<Optgroup>) => ({
    id: optgroup.id || '',
    label: optgroup.label || '',
    selectAll: optgroup.selectAll ?? false,
    closable: optgroup.closable || 'off'
  })

  const aNormalized = normalized(a)
  const bNormalized = normalized(b)

  if (
    aNormalized.id !== bNormalized.id ||
    aNormalized.label !== bNormalized.label ||
    aNormalized.selectAll !== bNormalized.selectAll ||
    aNormalized.closable !== bNormalized.closable
  ) {
    return false
  }

  const aOptions = a.options || []
  const bOptions = b.options || []

  if (aOptions.length !== bOptions.length) {
    return false
  }

  for (let i = 0; i < aOptions.length; i++) {
    if (!optionStructureEqual(aOptions[i], bOptions[i])) {
      return false
    }
  }

  return true
}

/** Compare option/optgroup arrays without JSON.stringify. */
export function dataStructureEqual(a: DataItem[], b: DataItem[]): boolean {
  if (a === b) {
    return true
  }

  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; i++) {
    const aItem = a[i]
    const bItem = b[i]
    const aIsOptgroup = isOptgroupItem(aItem)
    const bIsOptgroup = isOptgroupItem(bItem)

    if (aIsOptgroup !== bIsOptgroup) {
      return false
    }

    if (aIsOptgroup) {
      if (!optgroupStructureEqual(aItem, bItem)) {
        return false
      }
      continue
    }

    if (
      !optionStructureEqual(aItem as Partial<Option>, bItem as Partial<Option>)
    ) {
      return false
    }
  }

  return true
}

export function kebabCase(str: string): string {
  const result = str.replace(
    /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
    (match) => '-' + match.toLowerCase()
  )
  return str[0] === str[0].toUpperCase() ? result.substring(1) : result
}

export function shouldUseModalView(
  modal: ModalSetting,
  viewportWidth: number = typeof window !== 'undefined'
    ? window.innerWidth
    : MODAL_MOBILE_BREAKPOINT
): boolean {
  if (modal === 'on') {
    return true
  }
  if (modal === 'mobile') {
    return viewportWidth < MODAL_MOBILE_BREAKPOINT
  }
  return false
}
