/** Shared scroll offset for in-page doc section links (fixed site header). */
export function docScrollOffset(): number {
  const header = document.querySelector('.site-header') as HTMLElement | null
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
