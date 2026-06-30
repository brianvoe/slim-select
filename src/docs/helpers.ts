import type SlimSelect from '@/slim-select'

/** Shared scroll offset for in-page doc section links (fixed site header). */
export function docScrollOffset(): number {
  const header = document.querySelector('.app-header') as HTMLElement | null
  return (header?.offsetHeight ?? 64) + 16
}

export function scrollToId(id: string, behavior: ScrollBehavior = 'smooth'): boolean {
  const el = document.getElementById(id)
  if (!el) {
    return false
  }

  window.scroll({
    top: el.getBoundingClientRect().top + window.scrollY - docScrollOffset(),
    behavior
  })
  return true
}

/** Retry scrolling until lazy page sections exist in the DOM. */
export function scrollToHashId(
  id: string,
  options: {
    behavior?: ScrollBehavior
    maxAttempts?: number
    intervalMs?: number
  } = {}
): void {
  const { behavior = 'smooth', maxAttempts = 15, intervalMs = 100 } = options

  const attempt = (n: number) => {
    if (scrollToId(id, behavior)) {
      return
    }
    if (n < maxAttempts) {
      window.setTimeout(() => attempt(n + 1), intervalMs)
    }
  }

  attempt(0)
}

type SlimSelectElement = HTMLSelectElement & { slim?: SlimSelect }

const ORPHAN_ROOT_SELECTOR = '.ss-main[data-id], .ss-content[data-id], .ss-modal-overlay[data-id]'

/**
 * Destroy SlimSelect instances left behind by doc page navigation and remove
 * their orphaned UI (especially dropdown panels appended to document.body).
 */
export function destroyOrphanedSlimSelects(): void {
  const activeIds = new Set<string>()

  document.querySelectorAll('select').forEach((el) => {
    const select = el as SlimSelectElement
    const slim = select.slim
    if (!slim) {
      return
    }

    if (!select.isConnected) {
      slim.destroy()
      delete select.slim
      return
    }

    activeIds.add(slim.settings.id)
  })

  document.querySelectorAll<HTMLElement>(ORPHAN_ROOT_SELECTOR).forEach((el) => {
    const id = el.dataset.id
    if (!id || activeIds.has(id)) {
      return
    }
    el.remove()
  })
}
