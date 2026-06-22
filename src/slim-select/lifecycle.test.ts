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
      () =>
        new Promise<void>((resolve) => {
          resolveAnimation = resolve
        })
    )

    const afterOpen = vi.fn()
    const lifecycle = new Lifecycle(
      { afterOpen },
      { timeoutDelay: 500, waitForAnimation }
    )

    const openPromise = lifecycle.requestOpen()
    expect(waitForAnimation).toHaveBeenCalledWith('open')

    resolveAnimation()
    await openPromise

    expect(afterOpen).toHaveBeenCalledTimes(1)
    expect(lifecycle.isFullOpen).toBe(true)
  })
})
