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

      // Select should be hidden but still focusable (1px for validation popup)
      expect(selectEl.style.position).toBe('absolute')
      expect(selectEl.style.width).toBe('1px')
      expect(selectEl.style.height).toBe('1px')
      expect(selectEl.style.opacity).toBe('0')
      expect(selectEl.style.margin).toBe('0px')
      expect(selectEl.style.padding).toBe('0px')
      expect(selectEl.style.clip).toContain('rect')

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

  describe('keepOrder setting', () => {
    test('keepOrder: false returns values in DOM order (default)', () => {
      document.body.innerHTML = `
        <select id="test" multiple>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
        </select>
      `

      const slim = new SlimSelect({
        select: '#test',
        settings: {
          keepOrder: false // DOM order (default)
        }
      })

      // Select in reverse order: Cherry -> Apple -> Banana
      slim.setSelected(['cherry', 'apple', 'banana'])

      // Should return in DOM order (how they appear in HTML)
      expect(slim.getSelected()).toEqual(['apple', 'banana', 'cherry'])
    })

    test('keepOrder: true returns values in selection order', () => {
      document.body.innerHTML = `
        <select id="test" multiple>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
        </select>
      `

      const slim = new SlimSelect({
        select: '#test',
        settings: {
          keepOrder: true // Selection order
        }
      })

      // Select in specific order: Cherry -> Apple -> Banana
      slim.setSelected(['cherry', 'apple', 'banana'])

      // Should return in the order they were selected (click order)
      expect(slim.getSelected()).toEqual(['cherry', 'apple', 'banana'])
    })

    test('keepOrder: true preserves click order in getSelected', () => {
      document.body.innerHTML = `
        <select id="test" multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
        </select>
      `

      const slim = new SlimSelect({
        select: '#test',
        settings: {
          keepOrder: true
        }
      })

      // Simulate user clicking options in random order
      slim.setSelected(['5', '2', '4', '1'])

      // Should maintain that exact order
      expect(slim.getSelected()).toEqual(['5', '2', '4', '1'])
    })
  })

  describe('maxValuesShown with deselection', () => {
    test('can still deselect options via dropdown when maxValuesShown is exceeded', () => {
      document.body.innerHTML = `
        <select id="test" multiple>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
        </select>
      `

      const slim = new SlimSelect({
        select: '#test',
        settings: {
          maxValuesShown: 2 // Show "X selected" when more than 2
        }
      })

      // Select 3 options (exceeds maxValuesShown)
      slim.setSelected(['1', '2', '3'])
      expect(slim.getSelected()).toEqual(['1', '2', '3'])

      // Verify counter is shown (not individual values)
      const counter = document.querySelector('.ss-max')
      expect(counter?.textContent).toBe('3 selected')

      // Open dropdown
      slim.open()

      // Find and click on a selected option to deselect it
      const options = document.querySelectorAll('[role="option"]')
      const selectedOption = Array.from(options).find(
        (opt) => opt.getAttribute('aria-selected') === 'true' && opt.textContent?.includes('Option 1')
      ) as HTMLElement

      expect(selectedOption).toBeTruthy()

      // Click the selected option - should deselect it
      selectedOption.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      // Should now only have 2 selected
      expect(slim.getSelected()).toEqual(['2', '3'])
    })

    test('deselecting via dropdown updates maxValuesShown display', () => {
      document.body.innerHTML = `
        <select id="test" multiple>
          <option value="1">Value 1</option>
          <option value="2">Value 2</option>
          <option value="3">Value 3</option>
        </select>
      `

      const slim = new SlimSelect({
        select: '#test',
        settings: {
          maxValuesShown: 2
        }
      })

      // Select 3 options (shows "3 selected")
      slim.setSelected(['1', '2', '3'])

      // Open and deselect one
      slim.open()
      const options = document.querySelectorAll('[role="option"]')
      const firstSelected = Array.from(options).find(
        (opt) => opt.getAttribute('aria-selected') === 'true'
      ) as HTMLElement
      firstSelected.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      // Now only 2 selected - should show individual values again (not counter)
      const individualValues = document.querySelectorAll('.ss-value')
      expect(individualValues.length).toBeGreaterThan(0)

      const counter = document.querySelector('.ss-max')
      expect(counter).toBeNull()
    })
  })
})
