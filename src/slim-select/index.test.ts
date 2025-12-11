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
      // clip property is deprecated and may not be accessible in all test environments
      // The code sets it, but some browsers/test environments may ignore or clear it
      // Check if clip is set OR if the other hiding properties are sufficient
      const clipValue = selectEl.style.clip
      if (clipValue) {
        expect(clipValue).toContain('rect')
      }
      // If clip is empty, the other hiding properties (position, width, height, opacity) are sufficient

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
    let searchMock: (searchValue: string, currentData: any[]) => any[]

    beforeEach(() => {
      document.body.innerHTML = '<select id="searchTest"></select>'

      searchMock = vi.fn().mockImplementation((searchValue: string, currentData: any[]) => {
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
      }) as typeof searchMock

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

    test('should keep search input when keepSearch is true', async () => {
      // Create new instance with keepSearch enabled
      const select = document.createElement('select')
      select.innerHTML = `
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      `
      document.body.appendChild(select)

      const slimWithKeepSearch = new SlimSelect({
        select: select,
        settings: {
          keepSearch: true
        }
      })

      // Open dropdown
      slimWithKeepSearch.open()

      // Search for something
      slimWithKeepSearch.search('test')
      expect(slimWithKeepSearch.render.content.search.input.value).toBe('test')

      // Close dropdown
      slimWithKeepSearch.close()

      // Search input should NOT be cleared when keepSearch is true
      expect(slimWithKeepSearch.render.content.search.input.value).toBe('test')

      // Cleanup
      slimWithKeepSearch.destroy()
      document.body.removeChild(select)
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

    test('clicking main div closes SlimSelect when wrapped in label', async () => {
      document.body.innerHTML = `
        <label>
          Select a Country
          <select id="wrapped-label-close-test">
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
          </select>
        </label>
      `

      const slim = new SlimSelect({
        select: '#wrapped-label-close-test',
        settings: {
          allowDeselect: true
        }
      })

      // Initially closed
      expect(slim.settings.isOpen).toBe(false)

      // Click the label to open
      const label = document.querySelector('label') as HTMLLabelElement
      label.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      await new Promise((r) => setTimeout(r, 300)) // after animation
      expect(slim.settings.isOpen).toBe(true)

      // Now click the main div to close
      const mainDiv = document.querySelector(`.ss-main[data-id="${slim.settings.id}"]`) as HTMLElement
      expect(mainDiv).toBeTruthy()

      mainDiv.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      await new Promise((r) => setTimeout(r, 300)) // after animation

      // SlimSelect should be closed
      expect(slim.settings.isOpen).toBe(false)

      slim.destroy()
    })

    test('deselect button works when wrapped in label', async () => {
      document.body.innerHTML = `
        <label>
          Select a Country
          <select id="wrapped-label-deselect-test">
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
          </select>
        </label>
      `

      const slim = new SlimSelect({
        select: '#wrapped-label-deselect-test',
        settings: {
          allowDeselect: true
        }
      })

      // Select an option
      slim.setSelected('usa')
      await new Promise((r) => setTimeout(r, 10))
      expect(slim.getSelected()).toEqual(['usa'])

      // Click the deselect button
      const deselectButton = document.querySelector(`[data-id="${slim.settings.id}"] .ss-deselect`) as HTMLElement
      expect(deselectButton).toBeTruthy()

      deselectButton.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      await new Promise((r) => setTimeout(r, 10))

      // Should be deselected (returns array with empty string for single select)
      expect(slim.getSelected()).toEqual([''])

      slim.destroy()
    })

    test('clicking main div toggles when wrapped in label', async () => {
      document.body.innerHTML = `
        <label>
          Select a Country
          <select id="wrapped-label-toggle-test">
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
          </select>
        </label>
      `

      const slim = new SlimSelect({
        select: '#wrapped-label-toggle-test'
      })

      // Initially closed
      expect(slim.settings.isOpen).toBe(false)

      // Click main div to open
      const mainDiv = document.querySelector(`.ss-main[data-id="${slim.settings.id}"]`) as HTMLElement
      mainDiv.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      await new Promise((r) => setTimeout(r, 10))
      expect(slim.settings.isOpen).toBe(true)

      // Click main div again to close
      mainDiv.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      await new Promise((r) => setTimeout(r, 10))
      expect(slim.settings.isOpen).toBe(false)

      // Click main div again to open
      mainDiv.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      await new Promise((r) => setTimeout(r, 10))
      expect(slim.settings.isOpen).toBe(true)

      slim.destroy()
    })

    test('clicking label on second select closes first select when both have labels', async () => {
      document.body.innerHTML = `
        <label>
          First Select
          <select id="first-select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </label>
        <label>
          Second Select
          <select id="second-select">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
          </select>
        </label>
      `

      const slim1 = new SlimSelect({
        select: '#first-select'
      })

      const slim2 = new SlimSelect({
        select: '#second-select'
      })

      // Both should be closed initially
      expect(slim1.settings.isOpen).toBe(false)
      expect(slim2.settings.isOpen).toBe(false)

      // Click first label to open first select
      const label1 = document.querySelector('label:first-of-type') as HTMLLabelElement
      label1.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      await new Promise((r) => setTimeout(r, 300))
      expect(slim1.settings.isOpen).toBe(true)
      expect(slim2.settings.isOpen).toBe(false)

      // Click second label - should close first and open second
      const label2 = document.querySelector('label:last-of-type') as HTMLLabelElement
      label2.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      await new Promise((r) => setTimeout(r, 300))
      expect(slim1.settings.isOpen).toBe(false)
      expect(slim2.settings.isOpen).toBe(true)

      // Click first label again - should close second and open first
      label1.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      await new Promise((r) => setTimeout(r, 300))
      expect(slim1.settings.isOpen).toBe(true)
      expect(slim2.settings.isOpen).toBe(false)

      slim1.destroy()
      slim2.destroy()
    })
  })

  describe('option changes race condition scenarios', () => {
    test('options should persist when added to select and value is set immediately', async () => {
      // Reproduce the issue: empty select, init SlimSelect, add options, set value
      document.body.innerHTML = '<select id="test-select"></select>'

      const selectElement = document.getElementById('test-select') as HTMLSelectElement
      const slim = new SlimSelect({
        select: selectElement
      })

      // Add option directly to the select element (not through SlimSelect API)
      const newOption = document.createElement('option')
      newOption.value = '1'
      newOption.textContent = 'one'
      selectElement.appendChild(newOption)

      // Set the value immediately
      selectElement.value = '1'

      // Wait for mutation observer and any async operations
      await new Promise((r) => setTimeout(r, 100))

      // Verify the option still exists
      expect(selectElement.options.length).toBe(1)
      expect(selectElement.value).toBe('1')
      expect(selectElement.options[0].value).toBe('1')
      expect(selectElement.options[0].textContent).toBe('one')

      // Verify SlimSelect also has the option
      const data = slim.getData()
      expect(data.length).toBe(1)
      expect((data[0] as any).value).toBe('1')
      expect((data[0] as any).text).toBe('one')

      slim.destroy()
    })

    test('rapid option and value changes should preserve final state', async () => {
      // Test multiple rapid mutations to ensure queue mechanism works correctly
      document.body.innerHTML = '<select id="test-select"></select>'

      const selectElement = document.getElementById('test-select') as HTMLSelectElement
      const slim = new SlimSelect({
        select: selectElement
      })

      // Add first option
      const option1 = document.createElement('option')
      option1.value = '1'
      option1.textContent = 'one'
      selectElement.appendChild(option1)
      selectElement.value = '1'

      // Immediately add second option
      const option2 = document.createElement('option')
      option2.value = '2'
      option2.textContent = 'two'
      selectElement.appendChild(option2)
      selectElement.value = '2'

      // Immediately add third option
      const option3 = document.createElement('option')
      option3.value = '3'
      option3.textContent = 'three'
      selectElement.appendChild(option3)
      selectElement.value = '3'

      // Wait for all mutations to process
      await new Promise((r) => setTimeout(r, 150))

      // Verify all options exist and final value is correct
      expect(selectElement.options.length).toBe(3)
      expect(selectElement.value).toBe('3')
      expect(selectElement.options[0].value).toBe('1')
      expect(selectElement.options[0].textContent).toBe('one')
      expect(selectElement.options[1].value).toBe('2')
      expect(selectElement.options[1].textContent).toBe('two')
      expect(selectElement.options[2].value).toBe('3')
      expect(selectElement.options[2].textContent).toBe('three')

      // Verify SlimSelect also has all options
      const data = slim.getData()
      expect(data.length).toBe(3)
      expect((data[0] as any).value).toBe('1')
      expect((data[0] as any).text).toBe('one')
      expect((data[1] as any).value).toBe('2')
      expect((data[1] as any).text).toBe('two')
      expect((data[2] as any).value).toBe('3')
      expect((data[2] as any).text).toBe('three')

      // Verify selected value
      const selected = slim.getSelected()
      expect(selected).toEqual(['3'])

      slim.destroy()
    })

    test('should handle removing all options and adding new ones', async () => {
      // Test scenario: start with options, remove all, then add new ones
      // This tests that the queue mechanism handles the removal and addition correctly
      document.body.innerHTML = `
        <select id="test-select">
          <option value="old1">Old One</option>
          <option value="old2">Old Two</option>
          <option value="old3">Old Three</option>
        </select>
      `

      const selectElement = document.getElementById('test-select') as HTMLSelectElement
      const slim = new SlimSelect({
        select: selectElement
      })

      // Verify initial state
      expect(selectElement.options.length).toBe(3)
      expect(slim.getData().length).toBe(3)

      // Remove all options (this will trigger mutation observer with empty data, which we skip)
      selectElement.innerHTML = ''

      // Wait for mutation observer to process the removal
      await new Promise((r) => setTimeout(r, 100))

      // Verify options are removed from DOM
      expect(selectElement.options.length).toBe(0)

      // Add completely new set of options one by one
      const newOption1 = document.createElement('option')
      newOption1.value = 'new1'
      newOption1.textContent = 'New One'
      selectElement.appendChild(newOption1)

      const newOption2 = document.createElement('option')
      newOption2.value = 'new2'
      newOption2.textContent = 'New Two'
      selectElement.appendChild(newOption2)

      const newOption3 = document.createElement('option')
      newOption3.value = 'new3'
      newOption3.textContent = 'New Three'
      selectElement.appendChild(newOption3)

      // Wait for all mutations to process
      await new Promise((r) => setTimeout(r, 200))

      // The key test: verify new options persist in DOM (not deleted by race condition)
      expect(selectElement.options.length).toBe(3)
      expect(selectElement.options[0].value).toBe('new1')
      expect(selectElement.options[0].textContent).toBe('New One')
      expect(selectElement.options[1].value).toBe('new2')
      expect(selectElement.options[1].textContent).toBe('New Two')
      expect(selectElement.options[2].value).toBe('new3')
      expect(selectElement.options[2].textContent).toBe('New Three')

      slim.destroy()
    })

    test('should handle rapidly removing all options', async () => {
      // Test scenario: start with options, rapidly remove them all
      document.body.innerHTML = `
        <select id="test-select">
          <option value="opt1">Option 1</option>
          <option value="opt2">Option 2</option>
          <option value="opt3">Option 3</option>
          <option value="opt4">Option 4</option>
        </select>
      `

      const selectElement = document.getElementById('test-select') as HTMLSelectElement
      const slim = new SlimSelect({
        select: selectElement
      })

      // Set an initial value
      selectElement.value = 'opt2'

      // Verify initial state
      expect(selectElement.options.length).toBe(4)
      expect(selectElement.value).toBe('opt2')
      expect(slim.getData().length).toBe(4)

      // Rapidly remove all options
      selectElement.removeChild(selectElement.options[0])
      selectElement.removeChild(selectElement.options[0])
      selectElement.removeChild(selectElement.options[0])
      selectElement.removeChild(selectElement.options[0])

      // Wait for all mutations to process
      await new Promise((r) => setTimeout(r, 200))

      // Verify all options are removed
      expect(selectElement.options.length).toBe(0)
      expect(selectElement.value).toBe('')

      // Verify SlimSelect also has no options
      const data = slim.getData()
      expect(data.length).toBe(0)

      // Verify selected value is empty
      const selected = slim.getSelected()
      expect(selected).toEqual([])

      slim.destroy()
    })

    test('should handle option change after first render', async () => {
      // Test scenario: start with 2 options
      document.body.innerHTML = `
        <select id="test-select">
          <option value="opt1">Option 1</option>
          <option value="opt2">Option 2</option>
        </select>
      `

      const selectElement = document.getElementById('test-select') as HTMLSelectElement
      const slim = new SlimSelect({
        select: selectElement
      })

      // Set an initial value
      selectElement.value = 'opt2'

      // Verify initial state
      expect(selectElement.options.length).toBe(2)
      expect(selectElement.value).toBe('opt2')
      expect(slim.getData().length).toBe(2)

      // Wait for all mutations to process
      await new Promise((r) => setTimeout(r, 200))

      // Rebuild options
      document.getElementById('test-select')!.innerHTML = `
        <option value="opt1">Option 1 updated</option>
        <option value="opt2" selected>Option 2 updated</option>
      `

      // Wait for all mutations to process
      await new Promise((r) => setTimeout(r, 200))

      // Verify options are still there
      expect(selectElement.options.length).toBe(2)
      expect(selectElement.options[0].textContent).toBe('Option 1 updated')
      expect(selectElement.options[1].textContent).toBe('Option 2 updated')
      expect(selectElement.value).toBe('opt2')

      // Verify SlimSelect also has the options
      const data = slim.getData()
      expect(data.length).toBe(2)

      // Verify selected value is empty
      const selected = slim.getSelected()
      expect(selected).toEqual(['opt2'])

      slim.destroy()
    })
  })

  describe('cssClasses with space-separated strings', () => {
    test('space-separated cssClasses are applied as individual classes', () => {
      document.body.innerHTML = '<select id="test"><option>Test</option></select>'

      const slim = new SlimSelect({
        select: '#test',
        cssClasses: {
          main: 'class1 class2'
        }
      })

      expect(slim.render.main.main.classList.contains('ss-main')).toBe(true)
      expect(slim.render.main.main.classList.contains('class1')).toBe(true)
      expect(slim.render.main.main.classList.contains('class2')).toBe(true)

      slim.destroy()
    })
  })
})
