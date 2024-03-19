'use strict'
import { describe, expect, test } from '@jest/globals'
import Settings from './settings'

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
  maxValuesMessage: '{number} selected',
}

describe('Settings module', () => {
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
      showOptionTooltips: true,
    }

    const settingsWithOverride = {
      ...defaultSettings,
      ...customSettings,
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
})
