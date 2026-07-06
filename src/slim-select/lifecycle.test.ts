import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import Lifecycle from './lifecycle'

describe('Lifecycle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('transitions closed -> opening -> open', async () => {
    const afterOpen = vi.fn()
    const onOpenReady = vi.fn()
    const lifecycle = new Lifecycle(
      { afterOpen, onOpenReady },
      { timeoutDelay: 200 }
    )

    const openPromise = lifecycle.requestOpen()
    expect(lifecycle.state).toBe('opening')
    expect(lifecycle.isOpen).toBe(true)
    expect(lifecycle.isFullOpen).toBe(false)

    await vi.advanceTimersByTimeAsync(200)
    await openPromise

    expect(lifecycle.state).toBe('open')
    expect(lifecycle.isFullOpen).toBe(true)
    expect(afterOpen).toHaveBeenCalledTimes(1)
    expect(onOpenReady).toHaveBeenCalledTimes(1)
  })

  test('rapid open then close cancels open completion', async () => {
    const afterOpen = vi.fn()
    const afterClose = vi.fn()
    const lifecycle = new Lifecycle({ afterOpen, afterClose }, { timeoutDelay: 200 })

    const openPromise = lifecycle.requestOpen()
    await vi.advanceTimersByTimeAsync(50)
    const closePromise = lifecycle.requestClose()

    await vi.advanceTimersByTimeAsync(200)
    await Promise.all([openPromise, closePromise])

    expect(afterOpen).not.toHaveBeenCalled()
    expect(afterClose).toHaveBeenCalledTimes(1)
    expect(lifecycle.state).toBe('closed')
  })

  test('uses animation promise when provided', async () => {
    let resolveAnimation!: () => void
    const waitForAnimation = vi.fn(
      (_phase: 'open' | 'close', _signal?: AbortSignal) =>
        new Promise<void>((resolve) => {
          resolveAnimation = resolve
        })
    )

    const afterOpen = vi.fn()
    const lifecycle = new Lifecycle(
      { afterOpen },
      { timeoutDelay: 100, waitForAnimation }
    )

    const openPromise = lifecycle.requestOpen()
    expect(waitForAnimation).toHaveBeenCalledWith(
      'open',
      expect.any(AbortSignal)
    )

    await vi.advanceTimersByTimeAsync(100)
    expect(afterOpen).not.toHaveBeenCalled()

    resolveAnimation()
    await openPromise

    expect(afterOpen).toHaveBeenCalledTimes(1)
    expect(lifecycle.isFullOpen).toBe(true)
  })

  test('aborts in-flight animation wait on rapid toggle', async () => {
    const signals: AbortSignal[] = []
    const waitForAnimation = vi.fn(
      (_phase: 'open' | 'close', signal?: AbortSignal) => {
        if (signal) {
          signals.push(signal)
        }
        return new Promise<void>(() => {})
      }
    )

    const lifecycle = new Lifecycle(
      {},
      { timeoutDelay: 200, waitForAnimation }
    )

    void lifecycle.requestOpen()
    expect(signals[0]?.aborted).toBe(false)

    void lifecycle.requestClose()
    expect(signals[0]?.aborted).toBe(true)
  })

  test('beforeClose return false vetoes close and skips onClose', async () => {
    const onClose = vi.fn()
    const afterClose = vi.fn()
    const lifecycle = new Lifecycle(
      {
        beforeClose: () => false,
        onClose,
        afterClose
      },
      { timeoutDelay: 200 }
    )

    void lifecycle.requestOpen()
    await vi.advanceTimersByTimeAsync(200)

    const closed = await lifecycle.requestClose()

    expect(closed).toBe(false)
    expect(onClose).not.toHaveBeenCalled()
    expect(afterClose).not.toHaveBeenCalled()
    expect(lifecycle.state).toBe('open')
  })

  test('beforeClose runs before onClose', async () => {
    const order: string[] = []
    const lifecycle = new Lifecycle(
      {
        beforeClose: () => {
          order.push('beforeClose')
        },
        onClose: () => {
          order.push('onClose')
        },
        afterClose: () => {
          order.push('afterClose')
        }
      },
      { timeoutDelay: 200 }
    )

    void lifecycle.requestOpen()
    await vi.advanceTimersByTimeAsync(200)

    const closePromise = lifecycle.requestClose()
    await vi.advanceTimersByTimeAsync(200)
    await closePromise

    expect(order).toEqual(['beforeClose', 'onClose', 'afterClose'])
  })
})
