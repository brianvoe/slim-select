/**
 * Open/close state machine for SlimSelect.
 *
 * Replaces scattered openTimeout/closeTimeout in index.ts with a single flow:
 *   closed → opening → open → closing → closed
 *
 * Maps to settings consumers expect:
 *   - isOpen: true during opening + open
 *   - isFullOpen: true only in open state (after animation / afterOpen)
 *
 * Lifecycle waits for render.waitForAnimation() before firing afterOpen/afterClose.
 * When no animation waiter is provided, falls back to settings.timeoutDelay.
 */

export type LifecycleState = 'closed' | 'opening' | 'open' | 'closing'

export interface LifecycleHandlers {
  beforeOpen?: () => void
  afterOpen?: () => void
  beforeClose?: () => void
  afterClose?: () => void
  /** Fires when fully open — used to attach document click-outside listener. */
  onOpenReady?: () => void
  /** Fires when fully closed — used to detach document click-outside listener. */
  onCloseReady?: () => void
}

export interface LifecycleOptions {
  /** Fallback when waitForAnimation is not provided (no CSS element yet). */
  timeoutDelay: number
  waitForAnimation?: (
    phase: 'open' | 'close',
    signal?: AbortSignal
  ) => Promise<void>
}

export default class Lifecycle {
  public state: LifecycleState = 'closed'
  private pendingTimer: ReturnType<typeof setTimeout> | null = null
  /** Resolvers for in-flight waitForPhase promises — cancelled on rapid toggle. */
  private waitResolvers: Array<() => void> = []
  /** Incremented on cancelPending(); stale async completions check this before firing handlers. */
  private generation = 0
  private animationAbort: AbortController | null = null

  constructor(
    private handlers: LifecycleHandlers,
    private options: LifecycleOptions
  ) {}

  public get isOpen(): boolean {
    return this.state === 'opening' || this.state === 'open'
  }

  public get isFullOpen(): boolean {
    return this.state === 'open'
  }

  public async requestOpen(): Promise<void> {
    if (this.state === 'opening' || this.state === 'open') {
      return
    }

    this.cancelPending()
    const gen = ++this.generation

    if (this.handlers.beforeOpen) {
      this.handlers.beforeOpen()
    }

    this.state = 'opening'
    await this.waitForPhase('open', gen)

    // User closed before open animation finished (issue #397)
    if (gen !== this.generation) {
      if (this.state === 'opening') {
        this.state = 'closed'
      }
      return
    }

    this.state = 'open'

    if (this.handlers.afterOpen) {
      this.handlers.afterOpen()
    }

    if (this.handlers.onOpenReady) {
      this.handlers.onOpenReady()
    }
  }

  public async requestClose(): Promise<void> {
    if (this.state === 'closed' || this.state === 'closing') {
      return
    }

    this.cancelPending()
    const gen = ++this.generation

    if (this.handlers.beforeClose) {
      this.handlers.beforeClose()
    }

    this.state = 'closing'
    await this.waitForPhase('close', gen)

    if (gen !== this.generation) {
      return
    }

    this.state = 'closed'

    if (this.handlers.afterClose) {
      this.handlers.afterClose()
    }

    if (this.handlers.onCloseReady) {
      this.handlers.onCloseReady()
    }
  }

  /** Cancel timers and resolve waiting phases — called when open/close race each other. */
  public cancelPending(): void {
    this.generation++
    this.animationAbort?.abort()
    this.animationAbort = null
    if (this.pendingTimer) {
      clearTimeout(this.pendingTimer)
      this.pendingTimer = null
    }
    const resolvers = this.waitResolvers.splice(0)
    for (const resolve of resolvers) {
      resolve()
    }
  }

  public destroy(): void {
    this.cancelPending()
    this.state = 'closed'
  }

  /**
   * Wait for the CSS animation to finish (or timeoutDelay when no waiter exists).
   * cancelPending() resolves the wait early for rapid open/close toggles.
   */
  private waitForPhase(
    phase: 'open' | 'close',
    gen: number
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      let settled = false
      const finish = () => {
        if (settled) {
          return
        }
        settled = true
        const idx = this.waitResolvers.indexOf(finish)
        if (idx !== -1) {
          this.waitResolvers.splice(idx, 1)
        }
        resolve()
      }

      this.waitResolvers.push(finish)

      if (this.options.waitForAnimation) {
        const controller = new AbortController()
        this.animationAbort = controller
        void this.options
          .waitForAnimation(phase, controller.signal)
          .catch(() => undefined)
          .finally(() => {
            if (this.animationAbort === controller) {
              this.animationAbort = null
            }
            finish()
          })
      } else {
        this.pendingTimer = setTimeout(() => {
          this.pendingTimer = null
          finish()
        }, this.options.timeoutDelay)
      }
    }).then(() => {
      if (gen !== this.generation) {
        return
      }
    })
  }
}
