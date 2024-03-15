/**
 * @jest-environment jsdom
 */

'use strict'

import { describe, expect, test } from '@jest/globals'
import Render, { Callbacks } from './render'
import Settings from './settings'
import Store, { DataArray, Option } from './store'
import CssClasses from './css_classes'

describe('select module', () => {
  test('constructor', () => {
    // create a new store with 2 options
    const store = new Store('single', [
      { text: 'test1', value: 'test1' },
      { text: 'test2', value: 'test2' },
    ])

    // default settings
    const settings = new Settings()
    const classes = new CssClasses()

    // default callbacks
    const callbacks = {
      open: () => {},
      close: () => {},
      addSelected: (value: string) => {},
      setSelected: (value: string[]) => {},
      addOption: (option: Option) => {},
      search: (search: string) => {},
      beforeChange: (before: DataArray, after: DataArray) => {
        return true
      },
    } as Callbacks

    const render = new Render(settings, classes, store, callbacks)
    expect(render).toBeInstanceOf(Render)
  })
})
