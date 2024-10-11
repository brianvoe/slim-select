'use strict'

import { describe, expect, test } from '@jest/globals'
import Settings from './settings'
import Select from './select'
import { Option, Optgroup } from './store'

const defaultSettings: { [key: string]: any } = {
  id: 'ss-qucyuytu',
  style: '',
  class: [],
  isMultiple: false,
  isOpen: false,
  isFullOpen: false,
  intervalMove: null,
  disabled: false,
  alwaysOpen: false,
  showSearch: true,
  focusSearch: true,
  ariaLabel: 'Combobox',
  searchPlaceholder: 'Search',
  searchText: 'No Results',
  searchingText: 'Searching...',
  searchHighlight: false,
  closeOnSelect: true,
  contentLocation: HTMLBodyElement,
  contentPosition: 'absolute',
  openPosition: 'auto',
  placeholderText: 'Select Value',
  allowDeselect: false,
  hideSelected: false,
  keepOrder: false,
  showOptionTooltips: false,
  minSelected: 0,
  maxSelected: 1000,
  timeoutDelay: 200,
  maxValuesShown: 20,
  maxValuesMessage: '{number} selected'
}

describe('Settings module', () => {
  let select: Select

  beforeEach(() => {
    const selectElement = document.createElement('select')
    select = new Select(selectElement)
  })

  test('empty constructor returns default settings', () => {
    // Convert to unknown and then to custom object to prevent TS from throwing errors
    const settings = new Settings() as unknown as { [key: string]: string }
    Object.keys(defaultSettings).forEach((key) => {
      if (key === 'id') {
        expect(settings[key].substring(0, 3)).toBe('ss-')
      } else if (key === 'contentLocation') {
        expect(settings[key]).toBeInstanceOf(defaultSettings[key])
      } else {
        expect(settings[key]).toStrictEqual(defaultSettings[key])
      }
    })
  })

  test('settings can be overwritten via the constructor', () => {
    const customSettings = {
      disabled: true,
      alwaysOpen: true,
      showSearch: false,
      focusSearch: true,
      searchHighlight: true,
      closeOnSelect: false,
      placeholderText: 'new placeholder',
      hideSelected: true,
      keepOrder: true,
      showOptionTooltips: true
    }

    const settingsWithOverride = {
      ...defaultSettings,
      ...customSettings
    } as unknown as { [key: string]: any }

    // Convert to unknown and then to custom object to prevent TS from throwing errors
    const settings = new Settings(customSettings) as unknown as { [key: string]: any }
    Object.keys(settingsWithOverride).forEach((key) => {
      if (key === 'id') {
        expect(settings[key].substring(0, 3)).toBe('ss-')
      } else if (key === 'contentLocation') {
        expect(settings[key]).toBeInstanceOf(defaultSettings[key])
      } else {
        expect(settings[key]).toStrictEqual(settingsWithOverride[key])
      }
    })
  })

  test('enable', () => {
    select.select.disabled = true

    select.enable()
    expect(select.select.disabled).toBe(false)
  })

  test('disable', () => {
    select.select.disabled = false

    select.disable()
    expect(select.select.disabled).toBe(true)
  })

  test('showUI', () => {
    select.select.setAttribute('tabindex', '1')
    select.select.setAttribute('aria-hidden', 'true')
    select.select.style.display = 'none'

    select.showUI()
    expect(select.select.getAttribute('tabindex')).toBeFalsy()
    expect(select.select.getAttribute('aria-hidden')).toBeFalsy()
    expect(select.select.style.display).toBeFalsy()
  })

  describe('createOptgroup', () => {
    test('group gets created correctly', () => {
      const optGroup = new Optgroup({
        label: 'test',
        options: [
          {
            text: 'opt 1'
          },
          {
            text: 'opt 2'
          }
        ]
      })

      const optGroupElement = select.createOptgroup(optGroup)

      expect(optGroupElement).toBeInstanceOf(HTMLOptGroupElement)
      expect(optGroupElement.children).toHaveLength(2)
    })

    test('selectAll get set correctly', () => {
      const optGroup = new Optgroup({
        label: 'test',
        selectAll: true,
        options: [
          {
            text: 'opt 1'
          },
          {
            text: 'opt 2'
          }
        ]
      })

      const optGroupElement = select.createOptgroup(optGroup)

      expect(optGroupElement).toBeInstanceOf(HTMLOptGroupElement)
      expect(optGroupElement.dataset.selectAll).toBe('true')
    })

    test('closable get set correctly', () => {
      const optGroup = new Optgroup({
        label: 'test',
        closable: 'open',
        options: [
          {
            text: 'opt 1'
          },
          {
            text: 'opt 2'
          }
        ]
      })

      const optGroupElement = select.createOptgroup(optGroup)

      expect(optGroupElement).toBeInstanceOf(HTMLOptGroupElement)
      expect(optGroupElement.dataset.closable).toBe(optGroup.closable)
    })
  })

  describe('createOption', () => {
    test('correct content is set', () => {
      const option = new Option({ text: 'opt' })
      const optionElement = select.createOption(option)

      expect(optionElement).toBeInstanceOf(HTMLOptionElement)
      expect(optionElement.id).toBe(option.id)
      expect(optionElement.textContent).toBe(option.text)
    })

    test('HTML is set as data attribute', () => {
      const option = new Option({ text: 'opt', html: '<h1>opt</h1>' })
      const optionElement = select.createOption(option)

      expect(optionElement.dataset.html).toBe(option.html)
    })

    test('malicious text is inserted with innerText', () => {
      // decoded text: <img src=x onerror=alert(1)></img>
      const str = '&#x3c;&#x69;&#x6d;&#x67;&#x20;&#x73;&#x72;&#x63;&#x3d;&#x78;&#x20;&#x6f;&#x6e;&#x65;&#x72;&#x72;&#x6f;&#x72;&#x3d;&#x61;&#x6c;&#x65;&#x72;&#x74;&#x28;&#x31;&#x29;&#x3e;&#x3c;&#x2f;&#x69;&#x6d;&#x67;&#x3e;'
      // const str = 'opt'
      const decode = (string: string|null) => {
        if(string === null) return ''
        const doc = new DOMParser().parseFromString(string, "text/html")
        return doc.documentElement.textContent;
      }
      const option = new Option({ text: str })
      const optionElement = select.createOption(option)
      // expect(decode(optionElement.textContent)).toBe('opt')
      expect(optionElement.textContent).toBe(str)
    })

    test('disabled sets disabled property correctly', () => {
      const option = new Option({ text: 'opt', disabled: true })
      const optionElement = select.createOption(option)

      expect(optionElement.disabled).toBe(true)
    })

    test('display false sets inline style correctly', () => {
      const option = new Option({ text: 'opt', display: false })
      const optionElement = select.createOption(option)

      expect(optionElement.style.display).toBe('none')
    })

    test('placeholder and mandatory set data attributes correctly', () => {
      const option = new Option({
        text: 'opt',
        placeholder: true,
        mandatory: true
      })
      const optionElement = select.createOption(option)

      expect(optionElement.dataset.placeholder).toBeTruthy()
      expect(optionElement.dataset.mandatory).toBeTruthy()
    })

    test('class sets CSS classes correctly', () => {
      const option = new Option({
        text: 'opt',
        class: 'class0 class1 class2'
      })
      const optionElement = select.createOption(option)

      expect(optionElement.classList.contains('class0')).toBe(true)
      expect(optionElement.classList.contains('class1')).toBe(true)
      expect(optionElement.classList.contains('class2')).toBe(true)
    })

    test('custom data attributes are set correctly', () => {
      const option = new Option({
        text: 'opt',
        data: {
          test0: 'a',
          test1: 'b'
        }
      })
      const optionElement = select.createOption(option)

      expect(optionElement.dataset.test0).toBe('a')
      expect(optionElement.dataset.test1).toBe('b')
    })
  })

  test('destroy', () => {
    select.destroy()

    expect((<any>select).observer).toBeFalsy()
    expect('id' in select.select.dataset).toBeFalsy()
  })
})
