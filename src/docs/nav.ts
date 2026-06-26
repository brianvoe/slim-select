export interface NavLink {
  label: string
  path: string
}

export interface HeaderItem {
  id: string
  label: string
  /** Direct link (no dropdown) */
  path?: string
  /** Dropdown of pages */
  children?: NavLink[]
}

/**
 * Top header is intentionally short. "Docs" and "Frameworks" open a dropdown of
 * pages; each page renders its own "On this page" sidebar (see page_nav.vue).
 */
export const headerItems: HeaderItem[] = [
  {
    id: 'docs',
    label: 'Docs',
    children: [
      { label: 'Get started', path: '/get-started' },
      { label: 'Install', path: '/install' },
      { label: 'Selects', path: '/selects' },
      { label: 'Data', path: '/data' },
      { label: 'Settings', path: '/settings' },
      { label: 'Events', path: '/events' },
      { label: 'Methods', path: '/methods' }
    ]
  },
  {
    id: 'usage',
    label: 'Usage',
    path: '/usage'
  },
  {
    id: 'style',
    label: 'Style',
    path: '/style'
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    children: [
      { label: 'Vue', path: '/vue' },
      { label: 'React', path: '/react' }
    ]
  }
]

/** Routes that render the sticky "On this page" sidebar. */
const sidebarPaths = new Set<string>([
  '/get-started',
  '/install',
  '/selects',
  '/data',
  '/style',
  '/settings',
  '/events',
  '/methods',
  '/usage',
  '/vue',
  '/react'
])

export function hasSidebar(path: string): boolean {
  return sidebarPaths.has(path)
}

/** Which header item should appear active for the current route. */
export function activeHeaderId(path: string): string | null {
  if (path === '/') {
    return null
  }
  const item = headerItems.find(
    (h) => h.path === path || h.children?.some((c) => c.path === path)
  )
  return item?.id ?? null
}
