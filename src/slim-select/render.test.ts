'use strict'

import { describe, expect, test, vi, beforeEach } from 'vitest'
import Render, { Callbacks } from './render'
import Settings from './settings'
import Store, { Option } from './store'
import CssClasses from './classes'

describe('render module', () => {
  let render: Render
  let openMock: ReturnType<typeof vi.fn>
  let closeMock: ReturnType<typeof vi.fn>
  let addSelectedMock: ReturnType<typeof vi.fn>
  let setSelectedMock: ReturnType<typeof vi.fn>
  let addOptionMock: ReturnType<typeof vi.fn>
  let searchMock: ReturnType<typeof vi.fn>
  let afterChangeMock: ReturnType<typeof vi.fn>
  let beforeChangeMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    const store = new Store('single', [
      {
        text: 'test0',
        value: 'test0'
      },
      {
        text: 'test1',
        value: 'test1',
        html: '<span>test1</span>'
      },
      {
        text: 'test2',
        selected: true
      }
    ])

    // default settings
    const settings = new Settings()
    const classes = new CssClasses()

    openMock = vi.fn(() => {})
    closeMock = vi.fn(() => {})
    addSelectedMock = vi.fn(() => {})
    setSelectedMock = vi.fn(() => {})
    addOptionMock = vi.fn(() => {})
    searchMock = vi.fn(() => {})
    afterChangeMock = vi.fn(() => {})
    beforeChangeMock = vi.fn(() => true)

    // default callbacks
    const callbacks: Callbacks = {
      open: openMock as () => void,
      close: closeMock as () => void,
      setSelected: setSelectedMock as (value: string | string[], runAfterChange: boolean) => void,
      addOption: addOptionMock as (option: Option) => void,
      search: searchMock as (search: string) => void,
      afterChange: afterChangeMock as (newVal: Option[]) => void,
      beforeChange: beforeChangeMock as (newVal: Option[], oldVal: Option[]) => boolean | void
    }

    render = new Render(settings, classes, store, callbacks)
  })

  describe('constructor', () => {
    test('default constructor works', () => {
      // create a new store with 2 options
      const store = new Store('single', [
        { text: 'test1', value: 'test1' },
        { text: 'test2', value: 'test2' }
      ])

      // default settings
      const settings = new Settings()
      const classes = new CssClasses()

      // default callbacks
      const callbacks = {
        open: () => {},
        close: () => {},
        addSelected: () => {},
        setSelected: () => {},
        addOption: () => {},
        search: () => {},
        beforeChange: () => {
          return true
        }
      } as Callbacks

      const render = new Render(settings, classes, store, callbacks)
      expect(render).toBeInstanceOf(Render)
      expect(render.main.main).toBeInstanceOf(HTMLDivElement)
      expect(render.content.search.input).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe('enable', () => {
    test('enable removes disabled class from main and enables search input', () => {
      // disable stuff directly
      render.main.main.classList.add(render.classes.disabled)
      render.content.search.input.disabled = true

      render.enable()
      expect(render.main.main.classList.contains(render.classes.disabled)).toBe(false)
      expect(render.content.search.input.disabled).toBe(false)
    })
  })

  describe('disable', () => {
    test('disable adds disabled class to main and disables search input', () => {
      render.disable()
      expect(render.main.main.classList.contains(render.classes.disabled)).toBe(true)
      expect(render.content.search.input.disabled).toBe(true)
    })
  })

  describe('open', () => {
    test('open sets the correct attributes and CSS classes', () => {
      render.open()

      expect(render.main.arrow.path.getAttribute('d')).toBe(render.classes.arrowOpen)
      expect(render.main.main.getAttribute('aria-expanded')).toBe('true')
      expect(render.content.main.classList.contains(render.classes.contentOpen)).toBe(true)
      // Direction class should be set on both main and content (dirAbove or dirBelow)
      const mainHasDirection =
        render.main.main.classList.contains(render.classes.dirAbove) ||
        render.main.main.classList.contains(render.classes.dirBelow)
      const contentHasDirection =
        render.content.main.classList.contains(render.classes.dirAbove) ||
        render.content.main.classList.contains(render.classes.dirBelow)
      expect(mainHasDirection).toBe(true)
      expect(contentHasDirection).toBe(true)
    })
  })

  describe('close', () => {
    test('close sets the correct attributes and CSS classes', () => {
      render.open()
      render.close()

      expect(render.main.arrow.path.getAttribute('d')).toBe(render.classes.arrowClose)
      expect(render.main.main.getAttribute('aria-expanded')).toBe('false')
      expect(render.content.main.classList.contains(render.classes.contentOpen)).toBe(false)
      // Direction class should persist after close
      const hasDirection =
        render.content.main.classList.contains(render.classes.dirAbove) ||
        render.content.main.classList.contains(render.classes.dirBelow)
      expect(hasDirection).toBe(true)
    })
  })

  describe('updateClassStyles', () => {
    test('existing classes and styles are cleared', () => {
      // manually set classes and styles for testing
      render.main.main.className = 'test'
      render.main.main.style.color = 'red'

      render.content.main.className = 'test'
      render.content.main.style.color = 'red'

      render.updateClassStyles()

      expect(render.main.main.classList.contains('test')).toBe(false)
      expect(render.main.main.style.color).toBeFalsy()

      expect(render.content.main.classList.contains('test')).toBe(false)
      expect(render.content.main.style.color).toBeFalsy()
    })

    test('inline styles are applied to main elements', () => {
      render.settings.style = 'color: red'

      render.updateClassStyles()

      expect(render.main.main.style.color).toBe('red')
      expect(render.content.main.style.color).toBe('red')
    })

    test('classes are applied to main elements', () => {
      render.settings.class = ['test0', 'test1', 'test2']

      render.updateClassStyles()

      expect(render.main.main.classList.contains('test0')).toBe(true)
      expect(render.main.main.classList.contains('test1')).toBe(true)
      expect(render.main.main.classList.contains('test2')).toBe(true)

      expect(render.content.main.classList.contains('test0')).toBe(true)
      expect(render.content.main.classList.contains('test1')).toBe(true)
      expect(render.content.main.classList.contains('test2')).toBe(true)
    })

    test('if content position is relative, class is added on content', () => {
      render.settings.contentPosition = 'relative'

      render.updateClassStyles()

      expect(render.content.main.classList.contains('ss-relative')).toBe(true)
    })
  })

  describe('updateAriaAttributes', () => {
    test('sets correct aria attributes', () => {
      render.updateAriaAttributes()

      expect(render.main.main.role).toBe('combobox')
      expect(render.main.main.getAttribute('aria-haspopup')).toBe('listbox')
      expect(render.main.main.getAttribute('aria-controls')).toBe(render.content.list.id)
      expect(render.main.main.getAttribute('aria-expanded')).toBe('false')
      expect(render.content.list.getAttribute('role')).toBe('listbox')
      expect(render.content.list.getAttribute('aria-label')).toContain('listbox')
    })
  })

  describe('mainDiv', () => {
    test('correct HTML element gets created', () => {
      const main = render.main.main

      expect(main.dataset.id).toBe(render.settings.id)
      expect(main.getAttribute('aria-label')).toBe(render.settings.ariaLabel)
      expect(main.tabIndex).toBe(0)
      expect(main.children).toHaveLength(3)
      expect(main.children.item(0)?.className).toBe(render.classes.values)
      expect(main.children.item(1)?.classList.contains(render.classes.deselect)).toBe(true)
      expect(main.children.item(1)?.classList.contains(render.classes.hide)).toBe(true)
      expect(main.children.item(1)?.children).toHaveLength(1)
      expect(main.children.item(1)?.children).toHaveLength(1)
      expect(main.children.item(1)?.children.item(0)).toBeInstanceOf(SVGElement)
      expect(main.children.item(2)?.classList.contains(render.classes.arrow)).toBe(true)
      expect(main.children.item(2)?.classList.contains(render.classes.hide)).toBe(false)
      expect(main.children.item(2)?.children.item(0)).toBeInstanceOf(SVGElement)
    })

    test('arrow is hidden when alwaysOpen is set', () => {
      render.settings.alwaysOpen = true
      const main = render.mainDiv().main

      expect(main.children.item(2)?.classList.contains(render.classes.arrow)).toBe(true)
      expect(main.children.item(2)?.classList.contains(render.classes.hide)).toBe(true)
      expect(main.children.item(2)?.children.item(0)).toBeInstanceOf(SVGElement)
    })

    test('arrow key events on main element move highlight', () => {
      const highlightMock = vi.fn(() => {})

      render.highlight = highlightMock

      render.main.main.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
      expect(openMock).toHaveBeenCalled()
      expect(highlightMock).toHaveBeenCalledTimes(1)
      expect(highlightMock.mock.calls[0]).toStrictEqual(['up'])

      render.main.main.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
      expect(openMock).toHaveBeenCalledTimes(2)
      expect(highlightMock).toHaveBeenCalledTimes(2)
      expect(highlightMock.mock.calls[1]).toStrictEqual(['down'])
    })

    test('tab and escape key event on main element triggers close callback', () => {
      render.main.main.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
      expect(closeMock).toHaveBeenCalled()
      render.main.main.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      expect(closeMock).toHaveBeenCalledTimes(2)
    })

    test('enter and space key event on main element triggers open callback', () => {
      render.main.main.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
      expect(openMock).toHaveBeenCalled()
      render.main.main.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
      expect(openMock).toHaveBeenCalledTimes(2)
    })

    test('click on main event does nothing if element is disabled', () => {
      render.settings.disabled = true

      render.main.main.dispatchEvent(new MouseEvent('click'))

      expect(openMock).not.toHaveBeenCalled()
      expect(closeMock).not.toHaveBeenCalled()
    })

    test('click on main event triggers open if element is closed', () => {
      render.main.main.dispatchEvent(new MouseEvent('click'))

      expect(openMock).toHaveBeenCalled()
      expect(closeMock).not.toHaveBeenCalled()
    })

    test('click on main event triggers close if element is opened', () => {
      render.settings.isOpen = true

      render.main.main.dispatchEvent(new MouseEvent('click'))

      expect(openMock).not.toHaveBeenCalled()
      expect(closeMock).toHaveBeenCalled()
    })

    test('click on deselect does nothing if element is disabled', () => {
      render.settings.disabled = true

      const deselectElement: HTMLDivElement = render.main.main.querySelector(
        '.' + render.classes.deselect
      ) as HTMLDivElement

      deselectElement.dispatchEvent(new MouseEvent('click'))

      expect(afterChangeMock).not.toHaveBeenCalled()
    })

    test('click on deselect on single select runs callbacks', () => {
      const deselectElement: HTMLDivElement = render.main.main.querySelector(
        '.' + render.classes.deselect
      ) as HTMLDivElement

      deselectElement.dispatchEvent(new MouseEvent('click'))

      expect(setSelectedMock).toHaveBeenCalled()
      expect(closeMock).toHaveBeenCalled()
      expect(afterChangeMock).toHaveBeenCalled()
    })

    test('click on deselect on multiple select runs callbacks', () => {
      render.settings.isMultiple = true

      const deselectAllMock = vi.fn()

      render.updateDeselectAll = deselectAllMock

      const deselectElement: HTMLDivElement = render.main.main.querySelector(
        '.' + render.classes.deselect
      ) as HTMLDivElement
      deselectElement.dispatchEvent(new MouseEvent('click'))

      expect(deselectAllMock).toHaveBeenCalled()
      expect(setSelectedMock).toHaveBeenCalled()
      expect(closeMock).toHaveBeenCalled()
      expect(afterChangeMock).toHaveBeenCalled()
    })
  })

  describe('mainFocus', () => {
    let focusMock: (options?: FocusOptions | undefined) => void

    beforeEach(() => {
      focusMock = vi.fn(() => {}) as (options?: FocusOptions | undefined) => void
      render.main.main.focus = focusMock
    })

    test('mainFocus does nothing if the event is click', () => {
      render.mainFocus('click')
      expect(focusMock).not.toHaveBeenCalled()
    })

    test('mainFocus triggers focus if the event is not click', () => {
      render.mainFocus('keydown')
      expect(focusMock).toHaveBeenCalled()
      render.mainFocus('keyup')
      expect(focusMock).toHaveBeenCalledTimes(2)
      render.mainFocus('mouse')
      expect(focusMock).toHaveBeenCalledTimes(3)
    })
  })

  describe('placeholder', () => {
    test('placeholder uses fallback text if no option is found', () => {
      render.settings.placeholderText = 'placeholder text'
      const placeholder = render.placeholder()

      expect(placeholder.innerHTML).toBe(render.settings.placeholderText)
    })

    test('placeholder uses option html if option is found', () => {
      render.store.setData([
        {
          text: 'opt text',
          html: '<h1>Option HTML</h1>',
          placeholder: true
        }
      ])
      const placeholder = render.placeholder()

      expect(placeholder.innerHTML).toBe('<h1>Option HTML</h1>')
    })

    test('placeholder uses option text if option is found and no HTML is set', () => {
      render.store.setData([
        {
          text: 'opt text',
          placeholder: true
        }
      ])
      const placeholder = render.placeholder()

      expect(placeholder.innerHTML).toBe('opt text')
    })
  })

  describe('renderValues', () => {
    test('single select renders only one value', () => {
      render.renderValues()

      expect(render.main.values.children).toHaveLength(1)
    })

    test('single select renders HTML option', () => {
      render.store.setData([
        {
          text: 'opt0'
        },
        {
          text: 'opt1',
          html: '<span>opt1</span>',
          selected: true
        }
      ])
      render.renderValues()

      expect(render.main.values.children).toHaveLength(1)
      expect(render.main.values.children.item(0)?.innerHTML).toBe('<span>opt1</span>')
    })

    test('multiple select renders all selected values', () => {
      render.settings.isMultiple = true
      render.store = new Store('multiple', [
        {
          text: 'opt0',
          value: 'opt0',
          selected: true
        },
        {
          text: 'opt1',
          value: 'opt1',
          html: '<span>opt1</span>',
          selected: true
        },
        {
          text: 'opt2'
        }
      ])

      render.renderValues()

      expect(render.main.values.children).toHaveLength(2)
      expect(render.main.values.children.item(0)).toBeInstanceOf(HTMLDivElement)
      expect((render.main.values.children.item(0) as HTMLDivElement).textContent).toBe('opt0')
      expect(render.main.values.children.item(1)).toBeInstanceOf(HTMLDivElement)
      expect((render.main.values.children.item(1) as HTMLDivElement).textContent).toBe('opt1')
    })

    test('multiple select renders counter element when maxValuesShown is set', () => {
      render.settings.isMultiple = true
      render.settings.maxValuesShown = 2
      render.store = new Store('multiple', [
        {
          text: 'opt0',
          value: 'opt0',
          selected: true
        },
        {
          text: 'opt1',
          value: 'opt1',
          html: '<span>opt1</span>',
          selected: true
        },
        {
          text: 'opt2',
          value: 'opt2',
          selected: true
        },
        {
          text: 'opt4'
        }
      ])

      render.renderValues()

      expect(render.main.values.children).toHaveLength(1)
      expect(render.main.values.children.item(0)?.innerHTML).toBe('3 selected')
    })

    test('remove old options from values', () => {
      render.renderValues()
      expect(render.main.values.children).toHaveLength(1)
      expect(render.main.values.innerText).toBeFalsy()

      render.store.setSelectedBy('value', ['test1'])
      render.renderValues()

      expect(render.main.values.children).toHaveLength(1)
      expect(render.main.values.children.item(0)?.innerHTML).toBe('<span>test1</span>')
    })
  })

  describe('moveContent', () => {
    let contentAboveMock: () => void
    let contentBelowMock: () => void

    beforeEach(() => {
      contentAboveMock = vi.fn() as () => void
      contentBelowMock = vi.fn() as () => void

      render.moveContentAbove = contentAboveMock
      render.moveContentBelow = contentBelowMock
    })

    test('content is moved below when position is relative', () => {
      render.settings.contentPosition = 'relative'

      render.moveContent()
      expect(contentAboveMock).not.toHaveBeenCalled()
      expect(contentBelowMock).toHaveBeenCalled()
    })

    test('content is moved below when open position is down', () => {
      render.settings.openPosition = 'down'

      render.moveContent()
      expect(contentAboveMock).not.toHaveBeenCalled()
      expect(contentBelowMock).toHaveBeenCalled()
    })

    test('content is moved above when open position is up', () => {
      render.settings.openPosition = 'up'

      render.moveContent()
      expect(contentAboveMock).toHaveBeenCalled()
      expect(contentBelowMock).not.toHaveBeenCalled()
    })

    test('content is moved above when putContent is up', () => {
      render.putContent = vi.fn(() => 'up') as any

      render.moveContent()
      expect(contentAboveMock).toHaveBeenCalled()
      expect(contentBelowMock).not.toHaveBeenCalled()
    })

    test('content is moved below when putContent is down', () => {
      render.putContent = vi.fn(() => 'down') as any

      render.moveContent()
      expect(contentAboveMock).not.toHaveBeenCalled()
      expect(contentBelowMock).toHaveBeenCalled()
    })
  })

  describe('searchDiv', () => {
    test('search is hidden when showSearch setting is false', () => {
      render.settings.showSearch = false

      const search = render.searchDiv()

      expect(search.main.classList.contains(render.classes.hide)).toBe(true)
    })

    test('input is debounced', async () => {
      const search = render.searchDiv()

      search.input.dispatchEvent(new InputEvent('input', { data: 'asdf' }))

      // wait for debounce to trigger
      await new Promise((r) => setTimeout(r, 101))

      expect(searchMock).toHaveBeenCalled()
    })

    test('arrow keys move highlight', () => {
      const search = render.searchDiv()
      const highlightMock = vi.fn(() => {})

      render.highlight = highlightMock

      search.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
      expect(highlightMock).toHaveBeenCalledTimes(1)
      expect(highlightMock.mock.calls[0]).toStrictEqual(['up'])

      search.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
      expect(highlightMock).toHaveBeenCalledTimes(2)
      expect(highlightMock.mock.calls[1]).toStrictEqual(['down'])
    })

    test('tab triggers close callback', () => {
      const search = render.searchDiv()

      search.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))

      expect(closeMock).toHaveBeenCalled()
    })

    test('escape triggers close callback', () => {
      // separate test in case we want to also test the event someday
      const search = render.searchDiv()

      search.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

      expect(closeMock).toHaveBeenCalled()
    })

    test("enter and space don't call addable witout ctrl key", () => {
      const search = render.searchDiv()
      const addableMock = vi.fn((s: string) => ({
        text: s,
        value: s.toLowerCase()
      }))

      render.callbacks.addable = addableMock

      search.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
      expect(addableMock).not.toHaveBeenCalled()

      search.input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
      expect(addableMock).not.toHaveBeenCalled()
    })

    test('enter and space call event and does nothing without input value', () => {
      const addableMock = vi.fn((s: string) => ({
        text: s,
        value: s.toLowerCase()
      }))

      render.callbacks.addable = addableMock

      // recreate search because we have added the addable callback
      render.content.search = render.searchDiv()

      render.content.search.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
      expect(addableMock).not.toHaveBeenCalled()
    })

    test('enter and space call addable when defined', () => {
      const addableMock = vi.fn((s: string) => ({
        text: s,
        value: s.toLowerCase()
      }))

      render.callbacks.addable = addableMock

      // recreate search because we have added the addable callback
      render.content.search = render.searchDiv()

      render.content.search.input.value = 'Search'

      render.content.search.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
      expect(addableMock).toHaveBeenCalledTimes(1)
      expect(addableMock.mock.calls[0]).toStrictEqual(['Search'])
    })

    test('enter selects highlighted option before calling addable', () => {
      const addableMock = vi.fn((s: string) => ({
        text: s,
        value: s.toLowerCase()
      }))

      render.callbacks.addable = addableMock

      // recreate search because we have added the addable callback
      render.content.search = render.searchDiv()

      // Render options
      render.renderOptions(render.store.getDataOptions())

      // Set search value
      render.content.search.input.value = '1'

      // Highlight first option (simulating arrow down)
      render.highlight('down')

      // Verify an option is highlighted
      const highlighted = render.content.list.querySelector('.' + render.classes.highlighted)
      expect(highlighted).toBeTruthy()

      // Press Enter - should select highlighted option, NOT call addable
      render.content.search.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

      // Addable should NOT have been called because an option was highlighted
      expect(addableMock).not.toHaveBeenCalled()
    })

    test('enter calls addable when no option is highlighted', () => {
      const addableMock = vi.fn((s: string) => ({
        text: s,
        value: s.toLowerCase()
      }))

      render.callbacks.addable = addableMock

      // recreate search because we have added the addable callback
      render.content.search = render.searchDiv()

      // Render options
      render.renderOptions(render.store.getDataOptions())

      // Set search value
      render.content.search.input.value = 'NewItem'

      // Do NOT highlight any option (user just types and presses Enter)

      // Press Enter - should call addable since no option is highlighted
      render.content.search.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

      // Addable SHOULD have been called
      expect(addableMock).toHaveBeenCalledTimes(1)
      expect(addableMock.mock.calls[0]).toStrictEqual(['NewItem'])
    })
  })

  describe('searchFocus', () => {
    test('search is focused', () => {
      expect(document.activeElement).not.toBe(render.content.search.input)

      render.searchFocus()
      expect(document.activeElement).toBe(render.content.search.input)
    })
  })

  describe('getOptions', () => {
    test('returns all options when called without parameters', () => {
      // render all 3 default options and get them back
      render.renderOptions(render.store.getDataOptions())
      const opts = render.getOptions()

      expect(opts).toHaveLength(3)
    })

    test('filters correctly when filtering out placeholders', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0',
            placeholder: true
          },
          {
            text: 'opt1'
          },
          {
            text: 'opt2'
          }
        ])
      )

      const opts = render.getOptions(true, false, true)
      expect(opts).toHaveLength(2)
    })

    test('filters correctly when filtering out disabled options', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0',
            disabled: true
          },
          {
            text: 'opt1'
          },
          {
            text: 'opt2'
          }
        ])
      )

      const opts = render.getOptions(false, true)
      expect(opts).toHaveLength(2)
    })

    test('filters correctly when filtering out hidden options', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0',
            placeholder: true
          },
          {
            text: 'opt1'
          },
          {
            text: 'opt2'
          }
        ])
      )

      const opts = render.getOptions(false, false, true)
      expect(opts).toHaveLength(2)
    })

    test('filters correctly when filtering out hidden and disabled options', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0',
            disabled: true
          },
          {
            text: 'opt1',
            placeholder: true
          },
          {
            text: 'opt2'
          }
        ])
      )

      const opts = render.getOptions(false, true, true)
      expect(opts).toHaveLength(1)
    })
  })

  describe('highlight', () => {
    test('simply do nothing without breaking when options are empty', () => {
      render.renderOptions([])

      expect(() => render.highlight('up')).not.toThrow()
    })

    test('highlight single option that is not already highlighted', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0'
          }
        ])
      )

      render.highlight('up')

      expect(render.getOptions()[0].classList.contains(render.classes.highlighted)).toBe(true)
    })

    test('select first option with down when no option is highlighted or selected', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0'
          },
          {
            text: 'opt1'
          },
          {
            text: 'opt2'
          }
        ])
      )

      render.highlight('down')

      expect(render.getOptions()[0].classList.contains(render.classes.highlighted)).toBe(true)
    })

    test('select last option with up when no option is highlighted or selected', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0'
          },
          {
            text: 'opt1'
          },
          {
            text: 'opt2'
          }
        ])
      )

      render.highlight('up')

      expect(render.getOptions()[2].classList.contains(render.classes.highlighted)).toBe(true)
    })

    test('highlight next option on down after highlighted option', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0',
            class: render.classes.highlighted
          },
          {
            text: 'opt1'
          },
          {
            text: 'opt2'
          }
        ])
      )

      render.highlight('down')

      expect(render.getOptions()[1].classList.contains(render.classes.highlighted)).toBe(true)
    })

    test('highlight previous option on up before highlighted option', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0'
          },
          {
            text: 'opt1'
          },
          {
            text: 'opt2',
            class: render.classes.highlighted
          }
        ])
      )

      render.highlight('up')

      expect(render.getOptions()[1].classList.contains(render.classes.highlighted)).toBe(true)
    })

    test('highlight next option on down after selected option when no options is highlighted', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0',
            selected: true
          },
          {
            text: 'opt1'
          },
          {
            text: 'opt2'
          }
        ])
      )

      render.highlight('down')

      expect(render.getOptions()[1].classList.contains(render.classes.highlighted)).toBe(true)
    })

    test('skip to last option when using up at the first option', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0',
            selected: true
          },
          {
            text: 'opt1'
          },
          {
            text: 'opt2'
          }
        ])
      )

      render.highlight('up')

      expect(render.getOptions()[2].classList.contains(render.classes.highlighted)).toBe(true)
    })

    test('highlight next option within opt group on down', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0',
            selected: true
          },
          {
            label: 'opt group',
            options: [
              {
                text: 'opt1'
              }
            ]
          },
          {
            text: 'opt2'
          }
        ])
      )

      render.highlight('down')

      expect(render.getOptions()[1].classList.contains(render.classes.highlighted)).toBe(true)
    })

    test('highlight previous option within opt group on up', () => {
      render.renderOptions(
        render.store.partialToFullData([
          {
            text: 'opt0'
          },
          {
            label: 'opt group',
            options: [
              {
                text: 'opt1',
                selected: true
              }
            ]
          },
          {
            text: 'opt2'
          }
        ])
      )

      render.highlight('up')

      expect(render.getOptions()[0].classList.contains(render.classes.highlighted)).toBe(true)
    })
  })

  describe('listDiv', () => {
    test('list div has correct class', () => {
      const list = render.listDiv()

      expect(list.classList.contains(render.classes.list)).toBe(true)
    })
  })

  describe('renderError', () => {
    test('error message is rendered correctly', () => {
      expect(render.content.list.children).toHaveLength(0)

      render.renderError('test error')

      expect(render.content.list.children).toHaveLength(1)
      expect(render.content.list.children.item(0)).toBeInstanceOf(HTMLDivElement)
      expect(render.content.list.children.item(0)?.className).toBe(render.classes.error)
      expect(render.content.list.children.item(0)?.textContent).toBe('test error')
    })

    test('list is reset on new error', () => {
      expect(render.content.list.children).toHaveLength(0)

      render.renderError('test error')
      expect(render.content.list.children).toHaveLength(1)

      render.renderError('error 2')
      expect(render.content.list.children).toHaveLength(1)
      expect(render.content.list.children.item(0)?.textContent).toBe('error 2')
    })
  })

  describe('renderSearching', () => {
    test('search text is rendered correctly', () => {
      expect(render.content.list.children).toHaveLength(0)

      render.settings.searchingText = 'search'
      render.renderSearching()

      expect(render.content.list.children).toHaveLength(1)
      expect(render.content.list.children.item(0)).toBeInstanceOf(HTMLDivElement)
      expect(render.content.list.children.item(0)?.className).toBe(render.classes.searching)
      expect(render.content.list.children.item(0)?.textContent).toBe('search')
    })

    test('list is reset on new search text', () => {
      expect(render.content.list.children).toHaveLength(0)

      render.settings.searchingText = 'search'
      render.renderSearching()
      expect(render.content.list.children).toHaveLength(1)

      render.settings.searchingText = 'search 2'
      render.renderSearching()
      expect(render.content.list.children).toHaveLength(1)
      expect(render.content.list.children.item(0)?.textContent).toBe('search 2')
    })
  })

  describe('option', () => {
    test('add inline styles correctly', () => {
      const option = render.option(
        new Option({
          text: 'opt',
          style: 'color: red'
        })
      )

      expect(option.style.color).toBe('red')
    })

    test('add hidden class on option with display false', () => {
      const option = render.option(
        new Option({
          text: 'opt',
          display: false
        })
      )

      expect(option.classList.contains(render.classes.hide)).toBe(true)
    })

    test('add hidden class on selected option when hideSelected setting is true', () => {
      render.settings.hideSelected = true

      const option = render.option(
        new Option({
          text: 'opt',
          selected: true
        })
      )

      expect(option.classList.contains(render.classes.hide)).toBe(true)
    })

    test('title attribute is set when showOptionTooltips setting is true', () => {
      render.settings.showOptionTooltips = true

      const option = render.option(
        new Option({
          text: 'opt'
        })
      )

      expect(option.getAttribute('title')).toBe('opt')
    })

    test('text is highlighted correctly with option text', () => {
      render.settings.searchHighlight = true
      render.content.search.input.value = 'opt'

      const option = render.option(
        new Option({
          text: 'opt 1'
        })
      )

      expect(option.querySelector('mark')).toBeTruthy()
      expect(option.querySelector('mark')?.textContent).toBe('opt')
    })

    test('text is highlighted correctly with option HTML', () => {
      render.settings.searchHighlight = true
      render.content.search.input.value = 'opt'

      const option = render.option(
        new Option({
          text: 'opt 1',
          html: '<h1>opt 1</h1>'
        })
      )

      expect(option.querySelector('mark')).toBeTruthy()
      expect(option.querySelector('mark')?.textContent).toBe('opt')
    })

    test('text highlighting with special regex characters does not break HTML', () => {
      render.settings.searchHighlight = true
      render.content.search.input.value = '<'

      const option = render.option(
        new Option({
          text: 'option <test>'
        })
      )

      // Should not break the HTML structure
      expect(option.querySelector('.ss-option')).toBeFalsy() // No nested ss-option divs

      // The < character should be highlighted if found in text
      const mark = option.querySelector('mark')
      if (mark) {
        expect(mark.textContent).toBe('<')
      }
    })

    test('text highlighting escapes special regex characters', () => {
      render.settings.searchHighlight = true

      // Test various special regex characters
      const specialChars = ['<', '>', '.', '*', '+', '?', '^', '$', '{', '}', '(', ')', '|', '[', ']', '\\']

      specialChars.forEach((char) => {
        render.content.search.input.value = char
        const option = render.option(
          new Option({
            text: `option ${char} test`
          })
        )

        // Should not throw an error and should contain the character
        expect(option.textContent).toContain(char)
      })
    })

    test('text highlighting with HTML content highlights only text nodes', () => {
      render.settings.searchHighlight = true
      render.content.search.input.value = 'test'

      const option = render.option(
        new Option({
          text: 'test option',
          html: '<div class="wrapper">test option</div>'
        })
      )

      // Should not break HTML structure - the key fix for issue #570
      expect(option.querySelector('.wrapper')).toBeTruthy() // HTML structure preserved
      expect(option.querySelector('mark')).toBeTruthy() // Text is highlighted
      expect(option.querySelector('mark')?.textContent).toBe('test')
    })

    test('click does nothing when option is disabled', () => {
      const option = render.option(
        new Option({
          text: 'opt 1',
          disabled: true
        })
      )
      option.dispatchEvent(new MouseEvent('click'))

      expect(addOptionMock).not.toHaveBeenCalled()
      expect(setSelectedMock).not.toHaveBeenCalled()
    })

    test('click does nothing when max count of selected options is reached', () => {
      render.settings.isMultiple = true
      render.settings.maxSelected = 1

      const option = render.option(
        new Option({
          text: 'opt 1'
        })
      )
      option.dispatchEvent(new MouseEvent('click'))

      expect(addOptionMock).not.toHaveBeenCalled()
      expect(setSelectedMock).not.toHaveBeenCalled()
    })

    test('click does nothing when min count of selected options is reached', () => {
      render.settings.isMultiple = true
      render.settings.allowDeselect = true
      render.settings.minSelected = 1

      const option = render.option(
        new Option({
          text: 'opt 1',
          selected: true
        })
      )
      option.dispatchEvent(new MouseEvent('click'))

      expect(addOptionMock).not.toHaveBeenCalled()
      expect(setSelectedMock).not.toHaveBeenCalled()
    })

    test('click does nothing when trying to deselect a mandatory option', () => {
      const option = render.option(
        new Option({
          text: 'mandatory option',
          selected: true,
          mandatory: true
        })
      )
      option.dispatchEvent(new MouseEvent('click'))

      expect(addOptionMock).not.toHaveBeenCalled()
      expect(setSelectedMock).not.toHaveBeenCalled()
    })

    test('click removes option', () => {
      const option = render.option(
        new Option({
          text: 'new opt 1'
        })
      )

      option.dispatchEvent(new MouseEvent('click'))

      expect(addOptionMock).toHaveBeenCalled()

      // check that we add the right option
      expect(addOptionMock.mock.calls[0][0].text).toBe('new opt 1')
      expect(setSelectedMock).toHaveBeenCalled()
    })
  })

  describe('native multi-select behavior', () => {
    let render: Render
    let afterChangeMock: ReturnType<typeof vi.fn>
    let closeMock: ReturnType<typeof vi.fn>

    beforeEach(() => {
      // create a new store with 5 options for comprehensive testing
      const store = new Store('multiple', [
        { text: 'test1', value: 'test1' },
        { text: 'test2', value: 'test2' },
        { text: 'test3', value: 'test3' },
        { text: 'test4', value: 'test4' },
        { text: 'test5', value: 'test5' }
      ])

      const settings = new Settings()
      const classes = new CssClasses()

      afterChangeMock = vi.fn(() => {})
      closeMock = vi.fn(() => {})

      const callbacks = {
        open: () => {},
        close: closeMock,
        addSelected: () => {},
        setSelected: (value) => {
          store.setSelectedBy('id', typeof value === 'string' ? [value] : value)
        },
        addOption: () => {},
        search: () => {},
        afterChange: afterChangeMock
      } as Callbacks

      render = new Render(settings, classes, store, callbacks)
      render.settings.isMultiple = true
      render.settings.closeOnSelect = true
    })

    describe('Regular Click (no modifiers)', () => {
      test('toggles option (add/remove) without affecting others', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Click first option - adds it
        opts[0].dispatchEvent(new MouseEvent('click'))
        expect(afterChangeMock).toHaveBeenCalledWith([expect.objectContaining({ value: 'test1' })])

        // Click third option - adds it (first option still selected)
        opts[2].dispatchEvent(new MouseEvent('click'))
        expect(afterChangeMock).toHaveBeenCalledWith([
          expect.objectContaining({ value: 'test1' }),
          expect.objectContaining({ value: 'test3' })
        ])

        // Click first option again - removes it
        opts[0].dispatchEvent(new MouseEvent('click'))
        expect(afterChangeMock).toHaveBeenCalledWith([expect.objectContaining({ value: 'test3' })])
      })

      test('closes dropdown on regular click when closeOnSelect is true', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        opts[0].dispatchEvent(new MouseEvent('click'))
        expect(closeMock).toHaveBeenCalled()
      })

      test('regular click on selected option deselects it and closes dropdown', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Select two options
        opts[0].dispatchEvent(new MouseEvent('click'))
        opts[1].dispatchEvent(new MouseEvent('click'))

        expect(afterChangeMock).toHaveBeenLastCalledWith([
          expect.objectContaining({ value: 'test1' }),
          expect.objectContaining({ value: 'test2' })
        ])
        closeMock.mockClear()

        // Click on already selected option - should deselect it and close
        opts[0].dispatchEvent(new MouseEvent('click'))

        expect(afterChangeMock).toHaveBeenLastCalledWith([expect.objectContaining({ value: 'test2' })])
        expect(closeMock).toHaveBeenCalledTimes(1)
      })

      test('regression: regular click adds/removes and closes, Cmd/Ctrl keeps open', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Regular click - should close
        opts[0].dispatchEvent(new MouseEvent('click'))
        expect(closeMock).toHaveBeenCalledTimes(1)
        closeMock.mockClear()

        // Cmd+Click - should NOT close
        opts[1].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        expect(closeMock).not.toHaveBeenCalled()

        // Ctrl+Click - should NOT close
        opts[2].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))
        expect(closeMock).not.toHaveBeenCalled()

        // Regular click again - should close
        opts[3].dispatchEvent(new MouseEvent('click'))
        expect(closeMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('Cmd/Ctrl+Click (toggle selection)', () => {
      test('Cmd+Click adds option without deselecting others (Mac)', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Cmd+Click first option
        opts[0].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        expect(afterChangeMock).toHaveBeenCalledWith([expect.objectContaining({ value: 'test1' })])

        // Cmd+Click third option - both should be selected
        opts[2].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        expect(afterChangeMock).toHaveBeenCalledWith([
          expect.objectContaining({ value: 'test1' }),
          expect.objectContaining({ value: 'test3' })
        ])
      })

      test('Ctrl+Click adds option without deselecting others (Windows/Linux)', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Ctrl+Click first option
        opts[0].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))
        expect(afterChangeMock).toHaveBeenCalledWith([expect.objectContaining({ value: 'test1' })])

        // Ctrl+Click third option - both should be selected
        opts[2].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))
        expect(afterChangeMock).toHaveBeenCalledWith([
          expect.objectContaining({ value: 'test1' }),
          expect.objectContaining({ value: 'test3' })
        ])
      })

      test('Cmd+Click on selected option deselects it (Mac)', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Select multiple options with Cmd
        opts[0].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        opts[1].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        opts[2].dispatchEvent(new MouseEvent('click', { metaKey: true }))

        // Cmd+Click on middle option to deselect it
        opts[1].dispatchEvent(new MouseEvent('click', { metaKey: true }))

        expect(afterChangeMock).toHaveBeenCalledWith([
          expect.objectContaining({ value: 'test1' }),
          expect.objectContaining({ value: 'test3' })
        ])
      })

      test('Ctrl+Click on selected option deselects it (Windows/Linux)', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Select multiple options with Ctrl
        opts[0].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))
        opts[1].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))
        opts[2].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))

        // Ctrl+Click on middle option to deselect it
        opts[1].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))

        expect(afterChangeMock).toHaveBeenCalledWith([
          expect.objectContaining({ value: 'test1' }),
          expect.objectContaining({ value: 'test3' })
        ])
      })

      test('Cmd+Click toggles selection on and off', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Click to select
        opts[0].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        expect(afterChangeMock).toHaveBeenLastCalledWith([expect.objectContaining({ value: 'test1' })])

        // Click again to deselect
        opts[0].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        expect(afterChangeMock).toHaveBeenLastCalledWith([])

        // Click once more to select again
        opts[0].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        expect(afterChangeMock).toHaveBeenLastCalledWith([expect.objectContaining({ value: 'test1' })])
      })

      test('Cmd/Ctrl+Click works even when allowDeselect is false', () => {
        render.settings.allowDeselect = false
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Select with Cmd/Ctrl
        opts[0].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        opts[1].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))

        // Should be able to deselect with Cmd/Ctrl even though allowDeselect is false
        opts[0].dispatchEvent(new MouseEvent('click', { metaKey: true }))

        expect(afterChangeMock).toHaveBeenLastCalledWith([expect.objectContaining({ value: 'test2' })])
      })

      test('does NOT close dropdown on Cmd+Click', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        opts[0].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        expect(closeMock).not.toHaveBeenCalled()
      })

      test('does NOT close dropdown on Ctrl+Click', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        opts[0].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))
        expect(closeMock).not.toHaveBeenCalled()
      })
    })

    describe('Shift+Click (range selection)', () => {
      test('selects range from last clicked to current', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Click first option
        opts[0].dispatchEvent(new MouseEvent('click'))
        expect(afterChangeMock).toHaveBeenCalledWith([expect.objectContaining({ value: 'test1' })])

        // Shift+Click third option - should select test1, test2, test3
        opts[2].dispatchEvent(new MouseEvent('click', { shiftKey: true }))
        expect(afterChangeMock).toHaveBeenCalledWith([
          expect.objectContaining({ value: 'test1' }),
          expect.objectContaining({ value: 'test2' }),
          expect.objectContaining({ value: 'test3' })
        ])
      })

      test('selects range in reverse direction', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Click fourth option
        opts[3].dispatchEvent(new MouseEvent('click'))

        // Shift+Click second option - should select test2, test3, test4
        opts[1].dispatchEvent(new MouseEvent('click', { shiftKey: true }))
        expect(afterChangeMock).toHaveBeenCalledWith([
          expect.objectContaining({ value: 'test4' }),
          expect.objectContaining({ value: 'test2' }),
          expect.objectContaining({ value: 'test3' })
        ])
      })

      test('respects maxSelected limit', () => {
        render.settings.maxSelected = 2
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Click first option
        opts[0].dispatchEvent(new MouseEvent('click'))

        // Shift+Click fourth option - would select 4 items, exceeds limit
        opts[3].dispatchEvent(new MouseEvent('click', { shiftKey: true }))

        // Should keep only the original selection
        expect(afterChangeMock).toHaveBeenLastCalledWith([expect.objectContaining({ value: 'test1' })])
      })

      test('does NOT close dropdown on Shift+Click', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        opts[0].dispatchEvent(new MouseEvent('click'))
        closeMock.mockClear()

        opts[2].dispatchEvent(new MouseEvent('click', { shiftKey: true }))
        expect(closeMock).not.toHaveBeenCalled()
      })
    })

    describe('Combined modifier keys', () => {
      test('Cmd/Ctrl+Click then Shift+Click selects range from last click', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Cmd+Click first and Ctrl+Click third options (testing both)
        opts[0].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        opts[2].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))

        // Shift+Click fifth option - should add test3, test4, test5 to selection
        opts[4].dispatchEvent(new MouseEvent('click', { shiftKey: true }))

        expect(afterChangeMock).toHaveBeenLastCalledWith([
          expect.objectContaining({ value: 'test1' }),
          expect.objectContaining({ value: 'test3' }),
          expect.objectContaining({ value: 'test4' }),
          expect.objectContaining({ value: 'test5' })
        ])
      })

      test('can build complex selections like native multi-select (Mac)', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Select test1
        opts[0].dispatchEvent(new MouseEvent('click'))
        // Cmd+Add test3
        opts[2].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        // Cmd+Add test5
        opts[4].dispatchEvent(new MouseEvent('click', { metaKey: true }))
        // Cmd+Remove test3
        opts[2].dispatchEvent(new MouseEvent('click', { metaKey: true }))

        // Final selection should be test1 and test5
        expect(afterChangeMock).toHaveBeenLastCalledWith([
          expect.objectContaining({ value: 'test1' }),
          expect.objectContaining({ value: 'test5' })
        ])
      })

      test('can build complex selections like native multi-select (Windows/Linux)', () => {
        render.renderOptions(render.store.getDataOptions())
        const opts = render.getOptions(false, false, true)

        // Select test1
        opts[0].dispatchEvent(new MouseEvent('click'))
        // Ctrl+Add test3
        opts[2].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))
        // Ctrl+Add test5
        opts[4].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))
        // Ctrl+Remove test3
        opts[2].dispatchEvent(new MouseEvent('click', { ctrlKey: true }))

        // Final selection should be test1 and test5
        expect(afterChangeMock).toHaveBeenLastCalledWith([
          expect.objectContaining({ value: 'test1' }),
          expect.objectContaining({ value: 'test5' })
        ])
      })
    })
  })

  describe('destroy', () => {
    test('elements get removed', () => {
      expect(render.main.main).toBeInstanceOf(HTMLDivElement)
      expect(render.content.main).toBeInstanceOf(HTMLDivElement)

      // set some simple IDs, so we can search for the elements in the DOM
      render.main.main.id = 'main-id'
      render.content.main.id = 'content-id'

      render.destroy()

      expect(document.getElementById('main-id')).toBeNull()
      expect(document.getElementById('#content-id')).toBeNull()
    })
  })

  describe('moveContentAbove', () => {
    test('correct classes are set', () => {
      render.moveContentAbove()

      expect(render.main.main.classList.contains(render.classes.dirAbove)).toBe(true)
      expect(render.main.main.classList.contains(render.classes.dirBelow)).toBe(false)
      expect(render.content.main.classList.contains(render.classes.dirAbove)).toBe(true)
      expect(render.content.main.classList.contains(render.classes.dirBelow)).toBe(false)
    })
  })

  describe('moveContentBelow', () => {
    test('correct classes are set', () => {
      render.moveContentBelow()

      expect(render.main.main.classList.contains(render.classes.dirAbove)).toBe(false)
      expect(render.main.main.classList.contains(render.classes.dirBelow)).toBe(true)
      expect(render.content.main.classList.contains(render.classes.dirAbove)).toBe(false)
      expect(render.content.main.classList.contains(render.classes.dirBelow)).toBe(true)
    })
  })

  describe('setContentPosition (via moveContentBelow)', () => {
    // Helper: mock getBoundingClientRect on an element to return specific values
    function mockRect(el: HTMLElement, rect: Partial<DOMRect>) {
      el.getBoundingClientRect = vi.fn(
        () =>
          ({
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            toJSON: () => {},
            ...rect
          }) as DOMRect
      )
    }

    test('absolute (default): content aligns below trigger using document coords', () => {
      // Simulate trigger at viewport (100, 50) with height 40 and width 200
      mockRect(render.main.main, { top: 100, left: 50, height: 40, width: 200 })

      // No scroll
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
      Object.defineProperty(window, 'scrollX', { value: 0, writable: true })

      render.settings.contentPosition = 'absolute'
      render.moveContentBelow()

      // top = viewportTop(100) + scrollY(0) + height(40) = 140
      // left = viewportLeft(50) + scrollX(0) = 50
      expect(render.content.main.style.top).toBe('140px')
      expect(render.content.main.style.left).toBe('50px')
      expect(render.content.main.style.width).toBe('200px')
    })

    test('absolute: content accounts for page scroll', () => {
      // Trigger at viewport (100, 50) but page is scrolled down 300px and right 20px
      mockRect(render.main.main, { top: 100, left: 50, height: 40, width: 200 })

      Object.defineProperty(window, 'scrollY', { value: 300, writable: true })
      Object.defineProperty(window, 'scrollX', { value: 20, writable: true })

      render.settings.contentPosition = 'absolute'
      render.moveContentBelow()

      // top = viewportTop(100) + scrollY(300) + height(40) = 440
      // left = viewportLeft(50) + scrollX(20) = 70
      expect(render.content.main.style.top).toBe('440px')
      expect(render.content.main.style.left).toBe('70px')
      expect(render.content.main.style.width).toBe('200px')
    })

    test('absolute: content aligns correctly when trigger is near top of page', () => {
      // Trigger is at very top, no scroll
      mockRect(render.main.main, { top: 0, left: 10, height: 30, width: 150 })

      Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
      Object.defineProperty(window, 'scrollX', { value: 0, writable: true })

      render.settings.contentPosition = 'absolute'
      render.moveContentBelow()

      // top = 0 + 0 + 30 = 30
      // left = 10 + 0 = 10
      expect(render.content.main.style.top).toBe('30px')
      expect(render.content.main.style.left).toBe('10px')
      expect(render.content.main.style.width).toBe('150px')
    })

    test('fixed: content uses viewport coords without scroll offset', () => {
      // Same trigger position and scroll as the absolute+scroll test
      mockRect(render.main.main, { top: 100, left: 50, height: 40, width: 200 })

      Object.defineProperty(window, 'scrollY', { value: 300, writable: true })
      Object.defineProperty(window, 'scrollX', { value: 20, writable: true })

      render.settings.contentPosition = 'fixed'
      render.moveContentBelow()

      // Fixed ignores scroll: top = viewportTop(100) + height(40) = 140
      // left = viewportLeft(50) = 50
      expect(render.content.main.style.top).toBe('140px')
      expect(render.content.main.style.left).toBe('50px')
      expect(render.content.main.style.width).toBe('200px')
    })

    test('relative: content position styles are not set', () => {
      mockRect(render.main.main, { top: 100, left: 50, height: 40, width: 200 })

      render.settings.contentPosition = 'relative'

      // Reset styles to confirm they aren't changed
      render.content.main.style.top = ''
      render.content.main.style.left = ''
      render.content.main.style.width = ''

      render.moveContentBelow()

      // setContentPosition returns early for relative, so no inline positioning
      expect(render.content.main.style.top).toBe('')
      expect(render.content.main.style.left).toBe('')
      expect(render.content.main.style.width).toBe('')
    })

    test('absolute vs fixed diverge only by scroll offset', () => {
      const triggerRect = { top: 200, left: 80, height: 36, width: 250 }

      Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
      Object.defineProperty(window, 'scrollX', { value: 0, writable: true })

      // Absolute
      mockRect(render.main.main, triggerRect)
      render.settings.contentPosition = 'absolute'
      render.moveContentBelow()
      const absTop = render.content.main.style.top
      const absLeft = render.content.main.style.left

      // Fixed
      mockRect(render.main.main, triggerRect)
      render.settings.contentPosition = 'fixed'
      render.moveContentBelow()
      const fixedTop = render.content.main.style.top
      const fixedLeft = render.content.main.style.left

      // Absolute top should be exactly scrollY more than fixed top
      expect(parseFloat(absTop)).toBe(parseFloat(fixedTop) + 500)
      // Left should differ by scrollX (which is 0 here, so equal)
      expect(parseFloat(absLeft)).toBe(parseFloat(fixedLeft))
    })
  })
})
