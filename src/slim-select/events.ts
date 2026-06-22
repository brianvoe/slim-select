/**
 * Global window/document listeners extracted from SlimSelect.
 *
 * Keeps index.ts thinner and makes listener attach/detach testable in isolation.
 * Document click is separate from attach() so it only runs while dropdown is
 * fully open (wired via Lifecycle onOpenReady / onCloseReady).
 */

import { debounce, hasClassInTree } from './helpers'

export interface GlobalEventHandlers {
  onDocumentClick: (e: Event) => void
  onWindowResize: () => void
  onWindowScroll: () => void
  onVisibilityChange: () => void
}

export default class GlobalEvents {
  private attached = false

  constructor(private handlers: GlobalEventHandlers) {}

  /** Attach long-lived listeners for the SlimSelect instance lifetime. */
  public attach(options: { listenScroll: boolean }): void {
    if (this.attached) {
      return
    }

    this.attached = true
    window.addEventListener('resize', this.resizeHandler, false)

    // Scroll listener only needed when openPosition is auto (reposition on scroll)
    if (options.listenScroll) {
      window.addEventListener('scroll', this.scrollHandler, false)
    }

    document.addEventListener('visibilitychange', this.visibilityHandler)
  }

  /** Attached after open animation completes — closes on outside click. */
  public attachDocumentClick(): void {
    document.addEventListener('click', this.handlers.onDocumentClick)
  }

  public detachDocumentClick(): void {
    document.removeEventListener('click', this.handlers.onDocumentClick)
  }

  public detach(options: { listenScroll: boolean }): void {
    if (!this.attached) {
      return
    }

    this.attached = false
    this.detachDocumentClick()
    window.removeEventListener('resize', this.resizeHandler, false)

    if (options.listenScroll) {
      window.removeEventListener('scroll', this.scrollHandler, false)
    }

    document.removeEventListener('visibilitychange', this.visibilityHandler)
  }

  private resizeHandler = debounce(() => {
    this.handlers.onWindowResize()
  })

  private scrollHandler = debounce(() => {
    this.handlers.onWindowScroll()
  })

  private visibilityHandler = () => {
    this.handlers.onVisibilityChange()
  }
}

export { hasClassInTree }
