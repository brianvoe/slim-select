/**
 * @jest-environment jsdom
 */

'use strict'

import { beforeEach, describe, expect, test, vi } from 'vitest'
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
      const errorMock = vi.fn()
      const slim = new SlimSelect({ select: '#invalid', events: { error: errorMock } })

      expect(slim.select).toBeUndefined()
      expect(slim.store).toBeUndefined()
      expect(slim.render).toBeUndefined()
      expect(errorMock).toHaveBeenCalled()
      expect(errorMock.mock.calls[0][0].message).toBe('Could not find select element')
    })

    test('invalid element throws error', () => {
      document.body.innerHTML = '<div id="invalid"></div>'

      const errorMock = vi.fn()
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

    const selectEnableMock = vi.fn()
    const renderEnableMock = vi.fn()

    slim.select.enable = selectEnableMock
    slim.render.enable = renderEnableMock

    slim.enable()

    expect(slim.settings.disabled).toBe(false)
    expect(selectEnableMock).toHaveBeenCalled()
    expect(renderEnableMock).toHaveBeenCalled()
  })

  test('disable', () => {
    slim.settings.disabled = false

    const selectDisableMock = vi.fn()
    const renderDisableMock = vi.fn()

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

  describe('required attribute support', () => {
    test('select with required attribute remains focusable for validation', () => {
      document.body.innerHTML = '<select id="test" required></select>'

      const slim = new SlimSelect({
        select: '#test'
      })

      const selectEl = document.getElementById('test') as HTMLSelectElement

      // Select should be hidden but still focusable
      expect(selectEl.style.position).toBe('absolute')
      expect(selectEl.style.width).toBe('0px')
      expect(selectEl.style.height).toBe('0px')
      expect(selectEl.style.opacity).toBe('0')

      // Required attribute should still be present
      expect(selectEl.hasAttribute('required')).toBe(true)

      // Select should be able to receive focus programmatically
      selectEl.focus()
      expect(document.activeElement).toBe(selectEl)
    })

    test('form validation works with required select', () => {
      // Create a form with required select
      document.body.innerHTML = `
        <form id="test-form">
          <select id="test" name="test-select" required>
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      `

      const slim = new SlimSelect({
        select: '#test'
      })

      const form = document.getElementById('test-form') as HTMLFormElement
      const selectEl = document.getElementById('test') as HTMLSelectElement

      // Form should be invalid when nothing is selected
      expect(selectEl.required).toBe(true)
      expect(selectEl.value).toBe('')
      expect(form.checkValidity()).toBe(false)

      // Select an option
      slim.setSelected(['1'])

      // Form should now be valid
      expect(selectEl.value).toBe('1')
      expect(form.checkValidity()).toBe(true)
    })
  })
})
