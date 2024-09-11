/**
 * @jest-environment jsdom
 */

'use strict'

import { describe, expect, test } from '@jest/globals'
import Render, { Callbacks } from './render'
import Settings from './settings'
import Store, { Option } from './store'
import CssClasses from './classes'

describe('render module', () => {
  let render: Render
  let openMock: jest.Mock
  let closeMock: jest.Mock
  let addSelectedMock: jest.Mock
  let setSelectedMock: jest.Mock
  let addOptionMock: jest.Mock
  let searchMock: jest.Mock
  let afterChangeMock: jest.Mock
  let beforeChangeMock: jest.Mock

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

    openMock = jest.fn(() => {})
    closeMock = jest.fn(() => {})
    addSelectedMock = jest.fn(() => {})
    setSelectedMock = jest.fn(() => {})
    addOptionMock = jest.fn(() => {})
    searchMock = jest.fn(() => {})
    afterChangeMock = jest.fn(() => {})
    beforeChangeMock = jest.fn(() => true)

    // default callbacks
    const callbacks = {
      open: openMock,
      close: closeMock,
      addSelected: addSelectedMock,
      setSelected: setSelectedMock,
      addOption: addOptionMock,
      search: searchMock,
      afterChange: afterChangeMock,
      beforeChange: beforeChangeMock
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
      expect(render.main.main.classList.contains(render.classes.openBelow)).toBe(true)
      expect(render.main.main.classList.contains(render.classes.openAbove)).toBe(false)
      expect(render.main.main.getAttribute('aria-expanded')).toBe('true')
      expect(render.content.main.classList.contains(render.classes.openBelow)).toBe(true)
      expect(render.content.main.classList.contains(render.classes.openAbove)).toBe(false)
    })
  })

  describe('close', () => {
    test('close sets the correct attributes and CSS classes', () => {
      render.close()

      expect(render.main.arrow.path.getAttribute('d')).toBe(render.classes.arrowClose)
      expect(render.main.main.classList.contains(render.classes.openBelow)).toBe(false)
      expect(render.main.main.classList.contains(render.classes.openAbove)).toBe(false)
      expect(render.main.main.getAttribute('aria-expanded')).toBe('false')
      expect(render.content.main.classList.contains(render.classes.openBelow)).toBe(false)
      expect(render.content.main.classList.contains(render.classes.openAbove)).toBe(false)
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
      expect(render.main.main.getAttribute('aria-controls')).toBe(render.content.main.id)
      expect(render.main.main.getAttribute('aria-expanded')).toBe('false')
      expect(render.content.main.getAttribute('role')).toBe('listbox')
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
      const highlightMock = jest.fn(() => {})

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

      const deselectAllMock = jest.fn()

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
    let focusMock: jest.Mock

    beforeEach(() => {
      focusMock = jest.fn(() => {})
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

  describe('multipleValue', () => {})

  describe('contentDiv', () => {})

  describe('moveContent', () => {
    let contentAboveMock: jest.Mock
    let contentBelowMock: jest.Mock

    beforeEach(() => {
      contentAboveMock = jest.fn()
      contentBelowMock = jest.fn()

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
      render.putContent = jest.fn(() => 'up')

      render.moveContent()
      expect(contentAboveMock).toHaveBeenCalled()
      expect(contentBelowMock).not.toHaveBeenCalled()
    })

    test('content is moved below when putContent is down', () => {
      render.putContent = jest.fn(() => 'down')

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
      const highlightMock = jest.fn(() => {})

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
      const addableMock = jest.fn((s: string) => ({
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
      const addableMock = jest.fn((s: string) => ({
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
      const addableMock = jest.fn((s: string) => ({
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

      expect(() => render.highlight('up')).not.toThrowError()
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

  describe('renderOptions', () => {})

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

      expect(render.main.main.classList.contains(render.classes.openAbove)).toBe(true)
      expect(render.main.main.classList.contains(render.classes.openBelow)).toBe(false)

      expect(render.content.main.classList.contains(render.classes.openAbove)).toBe(true)
      expect(render.content.main.classList.contains(render.classes.openBelow)).toBe(false)
    })
  })

  describe('moveContentBelow', () => {
    test('correct classes are set', () => {
      render.moveContentBelow()

      expect(render.main.main.classList.contains(render.classes.openAbove)).toBe(false)
      expect(render.main.main.classList.contains(render.classes.openBelow)).toBe(true)

      expect(render.content.main.classList.contains(render.classes.openAbove)).toBe(false)
      expect(render.content.main.classList.contains(render.classes.openBelow)).toBe(true)
    })
  })

  describe('ensureElementInView', () => {})

  describe('putContent', () => {})

  describe('updateDeselectAll', () => {})
})
