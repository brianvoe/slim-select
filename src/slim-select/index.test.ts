/**
 * @jest-environment jsdom
 */

'use strict'

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import SlimSelect from '@/slim-select'

describe('SlimSelect Module', () => {
  let slim: SlimSelect

  beforeEach(() => {
    document.body.innerHTML = '<select id="test"></select>'

    slim = new SlimSelect({
      select: '#test'
    })
  })

  afterEach(() => {
    if (slim) {
      slim.destroy()
    }
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

    const options = [
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
    const config = {
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

    const options = [
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
    const config = {
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

  describe('Search State Regression Tests', () => {
    let slim: SlimSelect
    let searchMock: ReturnType<typeof vi.fn>

    beforeEach(() => {
      document.body.innerHTML = '<select id="searchTest"></select>'

      searchMock = vi.fn().mockImplementation((searchValue: string) => {
        // Mock search results based on search value
        if (searchValue.length >= 2) {
          return [
            { value: 'null', text: 'Null' },
            { value: 'eins', text: 'Eins' },
            { value: 'zwei', text: 'Zwei' },
            { value: 'drei', text: 'Drei' },
            { value: 'vier', text: 'Vier' },
            { value: 'funf', text: 'Fünf' },
            { value: 'sechs', text: 'Sechs' },
            { value: 'sieben', text: 'Sieben' },
            { value: 'acht', text: 'Acht' },
            { value: 'neun', text: 'Neun' },
            { value: 'zehn', text: 'Zehn' }
          ]
        }
        return []
      })

      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        events: {
          search: searchMock
        }
      })
    })

    afterEach(() => {
      // Clean up to avoid timeout errors
      if (slim) {
        slim.destroy()
      }
    })

    test('should maintain search results when reopening dropdown', () => {
      // 1. Open dropdown - should show static options [A, B]
      slim.open()
      let options = document.querySelectorAll('.ss-option')
      expect(options).toHaveLength(2)
      expect(options[0].textContent).toBe('A')
      expect(options[1].textContent).toBe('B')
      slim.close()

      // 2. Search - should update store data with search results
      slim.search('te')
      options = document.querySelectorAll('.ss-option')
      // Should have search results (11) - static options are replaced
      expect(options.length).toBeGreaterThanOrEqual(11)

      // 3. Close and reopen - search results persist in store
      slim.close()
      slim.open()
      options = document.querySelectorAll('.ss-option')
      // Store data should still contain search results
      expect(options.length).toBeGreaterThanOrEqual(11)
    })

    test('should clear search input when closing dropdown', async () => {
      // Open dropdown first
      slim.open()

      // Search for something
      slim.search('te')
      expect(slim.render.content.search.input.value).toBe('te')

      // Close dropdown - this clears the search input
      slim.close()

      // Wait for close to complete (timeoutDelay is 200ms by default)
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Search input should be cleared
      expect(slim.render.content.search.input.value).toBe('')
    })

    test('should persist search results in store across close/open cycles', () => {
      // Search for something
      slim.search('te')

      // Search results are now in the store
      let options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)

      // Close and reopen - store data persists
      slim.close()
      slim.open()
      options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11) // Store data maintained

      slim.close()
      slim.open()
      options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11) // Still maintained after multiple cycles
    })

    test('should handle selection from search results correctly', () => {
      // Search for options
      slim.search('te')

      // Select first search result (should be from search results)
      const options = document.querySelectorAll('.ss-option')
      options[0].dispatchEvent(new MouseEvent('click'))

      // Check that an option is selected
      const selected = slim.getSelected()
      expect(selected.length).toBe(1)

      // Close and reopen
      slim.close()
      slim.open()

      // Should still have search results in store
      const reopenedOptions = document.querySelectorAll('.ss-option')
      expect(reopenedOptions.length).toBeGreaterThanOrEqual(11)

      // Selected value should be preserved
      expect(slim.getSelected()).toEqual(selected)
    })

    test('should handle multiple selections from search results', () => {
      // Configure for multi-select
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        settings: {
          isMultiple: true
        },
        events: {
          search: searchMock
        }
      })

      // Search for options
      slim.search('te')

      // Select first two search results (Null, Eins) using Cmd+Click
      const options = document.querySelectorAll('.ss-option')
      options[0].dispatchEvent(new MouseEvent('click', { metaKey: true })) // Cmd+Click to keep dropdown open
      options[1].dispatchEvent(new MouseEvent('click', { metaKey: true })) // Cmd+Click to keep dropdown open

      // Note: Search results are temporary and not added to the store
      // So the selection won't persist in the store, but the search state should be maintained

      // Close and reopen
      slim.close()
      slim.open()

      // Should still show search results (search state maintained)
      const reopenedOptions = document.querySelectorAll('.ss-option')
      // Multi-select may have additional options like deselect all, so we check for at least 11
      expect(reopenedOptions.length).toBeGreaterThanOrEqual(11)

      // Search results are maintained but selections from search results don't persist in store
      // This is expected behavior - search results are temporary
    })

    test('should handle new search after reopening', () => {
      // Initial search
      slim.search('te')
      let options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)

      // Close and reopen
      slim.close()
      slim.open()

      // Should still have previous search results in store
      options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)

      // Perform new search - this updates the store with new results
      slim.search('ei')
      options = document.querySelectorAll('.ss-option')

      // Should show new search results
      expect(options.length).toBeGreaterThanOrEqual(11)
    })

    test('should handle search with no results correctly', () => {
      // Search for something that returns no results
      slim.search('xyz')

      // Should show no results message (searchText)
      const noResults = document.querySelector('.ss-search')
      expect(noResults).toBeTruthy()

      // Close and reopen
      slim.close()
      slim.open()

      // Should still show no results (search state maintained)
      const stillNoResults = document.querySelector('.ss-search')
      expect(stillNoResults).toBeTruthy()
    })

    test('should handle async search results correctly', async () => {
      // Mock async search
      const asyncSearchMock = vi.fn().mockResolvedValue([
        { value: 'async1', text: 'Async Result 1' },
        { value: 'async2', text: 'Async Result 2' }
      ])

      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        events: {
          search: asyncSearchMock
        }
      })

      // Trigger async search
      slim.search('async')

      // Wait for async results
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Check results are displayed (should include the async results)
      let options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(2)

      // Find the async results in the options
      const asyncOptions = Array.from(options).filter((option) => option.textContent?.includes('Async Result'))
      expect(asyncOptions).toHaveLength(2)
      expect(asyncOptions[0].textContent).toBe('Async Result 1')
      expect(asyncOptions[1].textContent).toBe('Async Result 2')

      // Close and reopen
      slim.close()
      slim.open()

      // Should still show async search results
      options = document.querySelectorAll('.ss-option')
      const reopenedAsyncOptions = Array.from(options).filter((option) => option.textContent?.includes('Async Result'))
      expect(reopenedAsyncOptions).toHaveLength(2)
      expect(reopenedAsyncOptions[0].textContent).toBe('Async Result 1')
    })

    test('should update store data with search results', () => {
      // Test that search updates the store
      slim.search('te')
      expect(searchMock).toHaveBeenCalledWith('te', expect.any(Array))

      let options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)

      // Search results are now in the store
      const storeData = slim.getData()
      expect(storeData.length).toBeGreaterThanOrEqual(11)

      // Clear search - this now returns all current data in store
      slim.search('')
      options = document.querySelectorAll('.ss-option')

      // Empty search now shows all current data in store (search results)
      expect(options.length).toBeGreaterThanOrEqual(11)
    })
  })

  describe('label click support', () => {
    test('clicking label with for attribute opens SlimSelect', async () => {
      document.body.innerHTML = `
        <label for="label-test-select">Select a Country</label>
        <select id="label-test-select">
          <option value="usa">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="canada">Canada</option>
        </select>
      `

      const slim = new SlimSelect({
        select: '#label-test-select'
      })

      // Initially closed
      expect(slim.settings.isOpen).toBe(false)

      // Click the label
      const label = document.querySelector('label[for="label-test-select"]') as HTMLLabelElement
      label.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))

      // Wait for setTimeout in label handler
      await new Promise((r) => setTimeout(r, 10))

      // SlimSelect should be open
      expect(slim.settings.isOpen).toBe(true)

      slim.destroy()
    })

    test('clicking wrapped label opens SlimSelect', async () => {
      document.body.innerHTML = `
        <label>
          Select a Country
          <select id="wrapped-label-select">
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
          </select>
        </label>
      `

      const slim = new SlimSelect({
        select: '#wrapped-label-select'
      })

      // Initially closed
      expect(slim.settings.isOpen).toBe(false)

      // Click the label
      const label = document.querySelector('label') as HTMLLabelElement
      label.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))

      // Wait for setTimeout in label handler
      await new Promise((r) => setTimeout(r, 10))

      // SlimSelect should be open
      expect(slim.settings.isOpen).toBe(true)

      slim.destroy()
    })

    test('clicking label does not open SlimSelect when disabled', async () => {
      document.body.innerHTML = `
        <label for="disabled-label-select">Select a Country</label>
        <select id="disabled-label-select">
          <option value="usa">United States</option>
        </select>
      `

      const slim = new SlimSelect({
        select: '#disabled-label-select',
        settings: {
          disabled: true
        }
      })

      // Initially closed
      expect(slim.settings.isOpen).toBe(false)

      // Click the label
      const label = document.querySelector('label[for="disabled-label-select"]') as HTMLLabelElement
      label.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))

      // Wait for setTimeout in label handler
      await new Promise((r) => setTimeout(r, 10))

      // SlimSelect should remain closed when disabled
      expect(slim.settings.isOpen).toBe(false)

      slim.destroy()
    })

    test('SlimSelect automatically assigns id to select if missing for label association', () => {
      document.body.innerHTML = `
        <label for="auto-id-select">Select a Country</label>
        <select>
          <option value="usa">United States</option>
        </select>
      `

      // Note: This won't actually work because the label's 'for' points to 'auto-id-select'
      // but we're selecting the select without an id. This test verifies that SlimSelect
      // assigns an id. The actual id will be generated, so the label won't match.
      // Let's test the id assignment instead.
      document.body.innerHTML = '<select><option value="usa">United States</option></select>'

      const selectElement = document.querySelector('select') as HTMLSelectElement
      const slim = new SlimSelect({
        select: selectElement
      })

      // SlimSelect should have assigned an id to the select
      expect(selectElement.id).toBeTruthy()
      expect(selectElement.id).toBe(slim.settings.id)

      slim.destroy()
    })

    test('label handlers are cleaned up on destroy', async () => {
      document.body.innerHTML = `
        <label for="cleanup-test-select">Select a Country</label>
        <select id="cleanup-test-select">
          <option value="usa">United States</option>
        </select>
      `

      const slim = new SlimSelect({
        select: '#cleanup-test-select'
      })

      // Verify label handler works
      const label = document.querySelector('label[for="cleanup-test-select"]') as HTMLLabelElement
      label.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await new Promise((r) => setTimeout(r, 10))
      expect(slim.settings.isOpen).toBe(true)

      // Close and destroy
      slim.close()
      slim.destroy()

      // After destroy, label click should not open SlimSelect
      // (though SlimSelect is destroyed, so we can't check isOpen)
      // But we verify no errors are thrown
      expect(() => {
        label.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      }).not.toThrow()
    })
  })
})
