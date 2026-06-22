import { describe, expect, test, vi } from 'vitest'
import GlobalEvents from './events'

describe('GlobalEvents', () => {
  test('attaches and detaches window listeners', () => {
    const onDocumentClick = vi.fn()
    const onWindowResize = vi.fn()
    const events = new GlobalEvents({
      onDocumentClick,
      onWindowResize,
      onWindowScroll: vi.fn(),
      onVisibilityChange: vi.fn()
    })

    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    events.attach({ listenScroll: true })
    events.attachDocumentClick()
    events.detachDocumentClick()
    events.detach({ listenScroll: true })

    expect(addSpy).toHaveBeenCalled()
    expect(removeSpy).toHaveBeenCalled()

    addSpy.mockRestore()
    removeSpy.mockRestore()
  })
})
