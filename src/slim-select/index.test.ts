/**
 * @jest-environment jsdom
 */

'use strict'

import { describe, expect, test } from '@jest/globals'
import SlimSelect from './'
import { OptionOptional } from './store'
import { Config } from './index'

describe('SlimSelect Module', () => {
  let slim: SlimSelect

  beforeEach(() => {
    document.body.innerHTML = '<select id="test"></select>'

    slim = new SlimSelect({
      select: '#test'
    })
  })

  describe('constructor', () => {
    test('missing select element throws error', () => {
      const errorMock = jest.fn()
      const slim = new SlimSelect({ select: '#invalid', events: { error: errorMock } })

      expect(slim.select).toBeUndefined()
      expect(slim.store).toBeUndefined()
      expect(slim.render).toBeUndefined()
      expect(errorMock).toHaveBeenCalled()
      expect(errorMock.mock.calls[0][0].message).toBe('Could not find select element')
    })

    test('invalid element throws error', () => {
      document.body.innerHTML = '<div id="invalid"></div>'

      const errorMock = jest.fn()
      const slim = new SlimSelect({ select: '#invalid', events: { error: errorMock } })

      expect(slim.select).toBeUndefined()
      expect(slim.store).toBeUndefined()
      expect(slim.render).toBeUndefined()
      expect(errorMock).toHaveBeenCalled()
      expect(errorMock.mock.calls[0][0].message).toBe('Element isnt of type select')
    })

    test('valid minimal constructor with query string', () => {
      document.body.innerHTML = '<select id="test"></select>'

      const slimSelect = new SlimSelect({
        select: '#test'
      })

      expect(slimSelect).toBeInstanceOf(SlimSelect)
    })

    test('valid minimal constructor with HTML element', () => {
      document.body.innerHTML = '<select id="test"></select>'

      const slimSelect = new SlimSelect({
        select: document.getElementById('test') as Element
      })

      expect(slimSelect).toBeInstanceOf(SlimSelect)
    })

    test('disabled gets applied correctly', () => {
      document.body.innerHTML = '<select id="test"></select>'

      const slim = new SlimSelect({
        select: document.getElementById('test') as Element,
        settings: {
          disabled: true
        }
      })

      expect(slim.settings.disabled).toBe(true)
    })
  })

  test('enable', () => {
    slim.settings.disabled = true

    const selectEnableMock = jest.fn()
    const renderEnableMock = jest.fn()

    slim.select.enable = selectEnableMock
    slim.render.enable = renderEnableMock

    slim.enable()

    expect(slim.settings.disabled).toBe(false)
    expect(selectEnableMock).toHaveBeenCalled()
    expect(renderEnableMock).toHaveBeenCalled()
  })

  test('disable', () => {
    slim.settings.disabled = false

    const selectDisableMock = jest.fn()
    const renderDisableMock = jest.fn()

    slim.select.disable = selectDisableMock
    slim.render.disable = renderDisableMock

    slim.disable()

    expect(slim.settings.disabled).toBe(true)
    expect(selectDisableMock).toHaveBeenCalled()
    expect(renderDisableMock).toHaveBeenCalled()
  })

  test('multiple - do not render deselect all with no selected options', () => {
    document.body.innerHTML = `<select id="test" multiple>
        <option data-placeholder="true"></option>
        <option id="1" value="1">One</option>
        <option id="2" value="2">Two</option>
        <option id="3" value="3">Two</option>
    </select>`

    const options: OptionOptional[] = [
      {
        id: '1',
        value: '1',
        text: 'One'
      },
      {
        id: '2',
        value: '2',
        text: 'Two'
      },
      {
        id: '3',
        value: '3',
        text: 'Three'
      }
    ]
    const config: Config = {
      select: '#test',
      settings: {
        allowDeselect: true
      },
      data: options
    }

    let slimSelect = new SlimSelect(config)
    expect(slimSelect.store.getSelectType()).toEqual('multiple')
    expect(slimSelect.getSelected()).toHaveLength(0)
    expect(slimSelect.render.main.deselect.main.classList).toContain(slimSelect.render.classes.hide)
  })
  test('multiple - render deselect all option with selected options', () => {
    document.body.innerHTML = `<select id="test" multiple>
        <option data-placeholder="true"></option>
        <option id="1" value="1">One</option>
        <option id="2" value="2">Two</option>
        <option id="3" value="3">Two</option>
    </select>`

    const options: OptionOptional[] = [
      {
        id: '1',
        value: '1',
        text: 'One',
        selected: true
      },
      {
        id: '2',
        value: '2',
        text: 'Two',
        selected: true
      },
      {
        id: '3',
        value: '3',
        text: 'Three'
      }
    ]
    const config: Config = {
      select: '#test',
      settings: {
        allowDeselect: true
      },
      data: options
    }

    let slimSelect = new SlimSelect(config)
    expect(slimSelect.store.getSelectType()).toEqual('multiple')
    expect(slimSelect.getSelected()).toHaveLength(2)
    expect(slimSelect.render.main.deselect.main.classList).not.toContain(slimSelect.render.classes.hide)
  })
})
