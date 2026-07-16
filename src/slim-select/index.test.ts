'use strict'

import { afterEach, beforeEach, describe, expect, test, vi, type Mock } from 'vitest'
import SlimSelect from '@/slim-select'

/** Destroy every SlimSelect still attached to a select in the document. */
function destroyAllSlimSelects(): void {
  document.querySelectorAll('select').forEach((selectEl) => {
    const instance = (selectEl as HTMLSelectElement & { slim?: SlimSelect })
      .slim
    if (!instance) {
      return
    }
    delete (selectEl as HTMLSelectElement & { slim?: SlimSelect }).slim
    instance.destroy()
  })
}

/** Destroy the shared fixture instance (may reference a select removed from the DOM). */
function destroyFixture(slim?: SlimSelect): void {
  if (slim?.render) {
    slim.destroy()
  }
}

describe('SlimSelect Module', () => {
  let slim: SlimSelect

  beforeEach(() => {
    document.body.innerHTML = '<select id="test"></select>'

    slim = new SlimSelect({
      select: '#test'
    })
  })

  afterEach(() => {
    destroyAllSlimSelects()
    destroyFixture(slim)
  })

  describe('constructor', () => {
    test('missing select element throws error', () => {
      const errorMock = vi.fn()
      const slim = new SlimSelect({
        select: '#invalid',
        events: { error: errorMock }
      })

      expect(slim.select).toBeUndefined()
      expect(slim.store).toBeUndefined()
      expect(slim.render).toBeUndefined()
      expect(errorMock).toHaveBeenCalled()
      expect(errorMock.mock.calls[0][0].message).toBe(
        'Could not find select element'
      )
    })

    test('invalid element throws error', () => {
      document.body.innerHTML = '<div id="invalid"></div>'

      const errorMock = vi.fn()
      const slim = new SlimSelect({
        select: '#invalid',
        events: { error: errorMock }
      })

      expect(slim.select).toBeUndefined()
      expect(slim.store).toBeUndefined()
      expect(slim.render).toBeUndefined()
      expect(errorMock).toHaveBeenCalled()
      expect(errorMock.mock.calls[0][0].message).toBe(
        'Element isnt of type select'
      )
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
    expect(slimSelect.render.main.deselect.main.classList).toContain(
      slimSelect.render.classes.hide
    )
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
    expect(slimSelect.render.main.deselect.main.classList).not.toContain(
      slimSelect.render.classes.hide
    )
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
      expect(selectEl.style.clipPath).toBe('inset(50%)')

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
        (opt) =>
          opt.getAttribute('aria-selected') === 'true' &&
          opt.textContent?.includes('Option 1')
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
    let searchMock: Mock<
      (searchValue: string, selected: any[], catalog?: any[]) => any[]
    >

    beforeEach(() => {
      destroyAllSlimSelects()
      document.body.innerHTML = '<select id="searchTest"></select>'

      searchMock = vi.fn(
        (searchValue: string, selected: any[], catalog?: any[]) => {
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
        }
      )

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

    test('should restore catalog when search is cleared on close', () => {
      slim.open()
      let options = document.querySelectorAll('.ss-option')
      expect(options).toHaveLength(2)

      slim.search('te')
      options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)

      slim.close()
      slim.open()
      options = document.querySelectorAll('.ss-option')
      expect(options).toHaveLength(2)
      expect(options[0].textContent).toBe('A')
      expect(options[1].textContent).toBe('B')
    })

    test('should re-run API search on reopen when keepSearch is true', () => {
      slim.destroy()
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        settings: {
          keepSearch: true
        },
        events: {
          search: searchMock
        }
      })

      slim.open()
      slim.search('te')
      expect(document.querySelectorAll('.ss-option').length).toBeGreaterThanOrEqual(
        11
      )

      slim.close()
      expect(slim.render.content.search.input.value).toBe('te')

      slim.open()
      expect(searchMock).toHaveBeenCalledTimes(2)
      expect(document.querySelectorAll('.ss-option').length).toBeGreaterThanOrEqual(
        11
      )
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
    })

    test('should persist API search results while keepSearch is enabled', () => {
      slim.destroy()
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        settings: {
          keepSearch: true
        },
        events: {
          search: searchMock
        }
      })

      slim.search('te')
      let options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)

      slim.close()
      slim.open()
      options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)
    })

    test('should handle selection from search results correctly', () => {
      slim.open()
      slim.search('te')

      const options = document.querySelectorAll('.ss-option')
      options[0].dispatchEvent(new MouseEvent('click'))

      const selected = slim.getSelected()
      expect(selected.length).toBe(1)

      slim.close()
      slim.open()

      const reopenedOptions = document.querySelectorAll('.ss-option')
      expect(reopenedOptions.length).toBeGreaterThanOrEqual(2)
      expect(slim.getSelected()).toEqual(selected)
    })

    test('should handle multiple selections from search results', () => {
      slim.destroy()
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        settings: {
          isMultiple: true,
          keepSearch: true
        },
        events: {
          search: searchMock
        }
      })

      slim.open()
      slim.search('te')

      const options = document.querySelectorAll('.ss-option')
      options[0].dispatchEvent(new MouseEvent('click', { metaKey: true }))
      options[1].dispatchEvent(new MouseEvent('click', { metaKey: true }))

      slim.close()
      slim.open()

      const reopenedOptions = document.querySelectorAll('.ss-option')
      expect(reopenedOptions.length).toBeGreaterThanOrEqual(11)
    })

    test('should handle new search after reopening', () => {
      slim.destroy()
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        settings: {
          keepSearch: true
        },
        events: {
          search: searchMock
        }
      })

      slim.open()
      slim.search('te')
      let options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)

      slim.close()
      slim.open()
      options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)

      slim.search('ei')
      options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)
    })

    test('should handle search with no results correctly', () => {
      slim.open()
      slim.search('xyz')

      const noResults = document.querySelector('.ss-search')
      expect(noResults).toBeTruthy()

      slim.close()
      slim.open()

      const options = document.querySelectorAll('.ss-option')
      expect(options).toHaveLength(2)
    })

    test('should handle async search results correctly', async () => {
      // Mock async search
      const asyncSearchMock = vi.fn().mockResolvedValue([
        { value: 'async1', text: 'Async Result 1' },
        { value: 'async2', text: 'Async Result 2' }
      ])

      slim.destroy()
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
      slim.open()
      slim.search('async')

      // Wait for async results
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Check results are displayed (should include the async results)
      let options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(2)

      // Find the async results in the options
      const asyncOptions = Array.from(options).filter((option) =>
        option.textContent?.includes('Async Result')
      )
      expect(asyncOptions).toHaveLength(2)
      expect(asyncOptions[0].textContent).toBe('Async Result 1')
      expect(asyncOptions[1].textContent).toBe('Async Result 2')

      slim.close()
      slim.open()

      options = document.querySelectorAll('.ss-option')
      expect(options).toHaveLength(2)
    })

    test('issue #671: first search result is selectable when allowDeselect and no prior selection (single select)', async () => {
      document.body.innerHTML = '<select id="searchFirstResult"></select>'

      const asyncSearchMock = vi.fn().mockResolvedValue([
        { value: 'first', text: 'First Result' },
        { value: 'second', text: 'Second Result' }
      ])

      const slimFirst = new SlimSelect({
        select: '#searchFirstResult',
        data: [],
        settings: { allowDeselect: true },
        events: { search: asyncSearchMock }
      })

      slimFirst.open()
      slimFirst.search('xy')
      await new Promise((r) => setTimeout(r, 100))

      const options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(2)

      const firstOption = Array.from(options).find(
        (el) => el.textContent?.trim() === 'First Result'
      )
      expect(firstOption).toBeTruthy()
      expect(firstOption?.getAttribute('aria-selected')).toBe('false')

      firstOption!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      expect(slimFirst.getSelected()).toEqual(['first'])
    })

    test('API search select then search again keeps selection without duplicates', () => {
      slim.open()
      slim.search('te')

      const nullOption = Array.from(
        document.querySelectorAll('.ss-option')
      ).find((el) => el.textContent?.trim() === 'Null')
      expect(nullOption).toBeTruthy()
      nullOption!.dispatchEvent(new MouseEvent('click'))
      expect(slim.getSelected()).toEqual(['null'])

      slim.search('ei')

      const nullLabels = Array.from(
        document.querySelectorAll('.ss-option')
      ).filter((el) => el.textContent?.trim() === 'Null')
      expect(nullLabels.length).toBe(1)
      expect(slim.getSelected()).toEqual(['null'])
    })

    test('should pass selected options and catalog baseline to search callback', () => {
      slim.setSelected('a')
      slim.open()
      slim.search('te')

      const [, selected, catalog] = searchMock.mock.calls[0]
      expect(selected).toEqual(
        expect.arrayContaining([expect.objectContaining({ value: 'a', text: 'A' })])
      )
      expect(catalog).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ value: 'a', text: 'A' }),
          expect.objectContaining({ value: 'b', text: 'B' })
        ])
      )
    })

    test('should update store data with search results and restore catalog on clear', () => {
      slim.open()
      slim.search('te')
      expect(searchMock).toHaveBeenCalledWith(
        'te',
        expect.any(Array),
        expect.arrayContaining([
          expect.objectContaining({ value: 'a', text: 'A' }),
          expect.objectContaining({ value: 'b', text: 'B' })
        ])
      )

      let options = document.querySelectorAll('.ss-option')
      expect(options.length).toBeGreaterThanOrEqual(11)

      const storeData = slim.getData()
      expect(storeData.length).toBeGreaterThanOrEqual(11)

      slim.search('')
      options = document.querySelectorAll('.ss-option')
      expect(options).toHaveLength(2)
      expect(slim.getData()).toHaveLength(2)
    })

    test('shows error message when async API search rejects', async () => {
      const failingSearch = vi.fn().mockRejectedValue('Something went wrong')

      slim.destroy()
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        events: {
          search: failingSearch
        }
      })

      slim.open()
      slim.search('fail')

      await new Promise((resolve) => setTimeout(resolve, 50))

      const error = document.querySelector('.ss-error')
      expect(error).toBeTruthy()
      expect(error?.textContent).toBe('Something went wrong')
      expect(document.querySelectorAll('.ss-option')).toHaveLength(0)
    })

    test('recovers with new results after API search error', async () => {
      const recoverySearch = vi
        .fn()
        .mockRejectedValueOnce('Temporary failure')
        .mockResolvedValueOnce([{ value: 'recovered', text: 'Recovered' }])

      slim.destroy()
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        events: {
          search: recoverySearch
        }
      })

      slim.open()
      slim.search('bad')
      await new Promise((resolve) => setTimeout(resolve, 50))
      expect(document.querySelector('.ss-error')?.textContent).toBe(
        'Temporary failure'
      )

      slim.search('good')
      await new Promise((resolve) => setTimeout(resolve, 50))

      expect(document.querySelector('.ss-error')).toBeFalsy()
      const recovered = Array.from(document.querySelectorAll('.ss-option')).find(
        (el) => el.textContent?.trim() === 'Recovered'
      )
      expect(recovered).toBeTruthy()
    })

    test('ignores stale API search response when query changes', async () => {
      let resolveSlow: (value: { value: string; text: string }[]) => void
      const slowPromise = new Promise<{ value: string; text: string }[]>(
        (resolve) => {
          resolveSlow = resolve
        }
      )

      const raceSearch = vi
        .fn()
        .mockImplementationOnce(() => slowPromise)
        .mockImplementationOnce(() => [{ value: 'fast', text: 'Fast Result' }])

      slim.destroy()
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        events: {
          search: raceSearch
        }
      })

      slim.open()
      slim.search('slow')
      slim.search('fast')

      resolveSlow!([{ value: 'slow', text: 'Slow Result' }])
      await new Promise((resolve) => setTimeout(resolve, 50))

      const labels = Array.from(document.querySelectorAll('.ss-option')).map(
        (el) => el.textContent?.trim()
      )
      expect(labels).toContain('Fast Result')
      expect(labels).not.toContain('Slow Result')
    })

    test('ignores stale API search error when query changes', async () => {
      let rejectSlow: (reason: string) => void
      const slowPromise = new Promise<{ value: string; text: string }[]>(
        (_resolve, reject) => {
          rejectSlow = reject
        }
      )

      const raceSearch = vi
        .fn()
        .mockImplementationOnce(() => slowPromise)
        .mockImplementationOnce(() => [{ value: 'fast', text: 'Fast Result' }])

      slim.destroy()
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        events: {
          search: raceSearch
        }
      })

      slim.open()
      slim.search('slow')
      slim.search('fast')
      await new Promise((resolve) => setTimeout(resolve, 50))

      rejectSlow!('Stale error')
      await new Promise((resolve) => setTimeout(resolve, 50))

      expect(document.querySelector('.ss-error')).toBeFalsy()
      expect(
        Array.from(document.querySelectorAll('.ss-option')).some(
          (el) => el.textContent?.trim() === 'Fast Result'
        )
      ).toBe(true)
    })

    test('hides selected options in API search results when hideSelected is true', () => {
      slim.destroy()
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        settings: {
          isMultiple: true,
          hideSelected: true,
          keepSearch: true
        },
        events: {
          search: searchMock
        }
      })

      slim.open()
      slim.search('te')

      const nullOption = Array.from(
        document.querySelectorAll('.ss-option')
      ).find((el) => el.textContent?.trim() === 'Null')
      expect(nullOption).toBeTruthy()
      nullOption!.dispatchEvent(
        new MouseEvent('click', { bubbles: true, metaKey: true })
      )
      expect(slim.getSelected()).toContain('null')

      slim.search('te')

      const visibleOptions = slim.render.getOptions(true, true, true)
      expect(
        visibleOptions.some((el) => el.textContent?.trim() === 'Null')
      ).toBe(false)
      expect(slim.getSelected()).toContain('null')
    })

    test('issue #695: API search that returns full catalog clears Searching...', () => {
      document.body.innerHTML = `
        <select multiple id="searchFullCatalog">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      `

      const slimFull = new SlimSelect({
        select: '#searchFullCatalog',
        settings: {
          hideSelected: true,
          closeOnSelect: false
        },
        events: {
          search: (searchValue, _selected, catalog) => {
            const normalize = (str: string) =>
              str.toLowerCase().replace(/\s/g, '')
            return (catalog || []).filter(
              (option) =>
                'text' in option &&
                normalize(option.text).includes(normalize(searchValue))
            )
          }
        }
      })

      slimFull.open()
      slimFull.search('Opt')

      expect(document.querySelector('.ss-searching')).toBeNull()
      expect(document.querySelectorAll('.ss-option').length).toBe(3)

      slimFull.destroy()
    })

    test('addable during API search adds option to catalog baseline', async () => {
      const emptySearch = vi.fn().mockReturnValue([])

      slim.destroy()
      document.body.innerHTML = '<select id="searchTest" multiple></select>'
      slim = new SlimSelect({
        select: '#searchTest',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        events: {
          search: emptySearch,
          addable: (value: string) => ({
            text: value,
            value: value.toLowerCase()
          })
        }
      })

      slim.open()
      slim.search('new')
      expect(
        slim.render.content.list.querySelectorAll('.ss-option')
      ).toHaveLength(0)

      slim.render.content.search.input.value = 'Custom'
      slim.render.content.search.input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      )

      await new Promise((resolve) => setTimeout(resolve, 50))

      expect(slim.getSelected()).toEqual(['custom'])
      const values = slim.store
        .getDataOptions()
        .map((option) => option.value)
      expect(values).toContain('a')
      expect(values).toContain('b')
      expect(values).toContain('custom')
      expect(slim.render.content.search.input.value).toBe('')
      expect(
        slim.render.content.list.querySelectorAll('.ss-option')
      ).toHaveLength(3)
    })
  })

  describe('local search', () => {
    test('filters options in place without rebuilding the list', () => {
      document.body.innerHTML = `
        <select id="local-search">
          <option value="1">Apple</option>
          <option value="2">Banana</option>
          <option value="3">Cherry</option>
        </select>
      `

      const slim = new SlimSelect({ select: '#local-search' })
      slim.open()
      const renderOptionsSpy = vi.spyOn(slim.render, 'renderOptions')
      const list = slim.render.content.list
      const initialChildCount = list.children.length

      slim.search('app')

      expect(renderOptionsSpy).not.toHaveBeenCalled()
      expect(list.children.length).toBe(initialChildCount)
      expect(slim.render.getOptions(true, true, true)).toHaveLength(1)
      expect(slim.render.getOptions(true, true, true)[0].textContent).toBe(
        'Apple'
      )
    })

    test('filters with trimmed term but preserves spaces in the input', () => {
      document.body.innerHTML = `
        <select id="local-search-trim">
          <option value="1">Apple</option>
          <option value="2">Banana</option>
          <option value="3">Cherry</option>
        </select>
      `

      const slim = new SlimSelect({ select: '#local-search-trim' })
      slim.open()
      slim.render.content.search.input.value = '  app  '
      slim.search('  app  ')

      expect(slim.render.content.search.input.value).toBe('  app  ')
      expect(slim.render.getOptions(true, true, true)).toHaveLength(1)
      expect(slim.render.getOptions(true, true, true)[0].textContent).toBe(
        'Apple'
      )
    })

    test('allows spaces while typing multi-word search terms', () => {
      document.body.innerHTML = `
        <select id="local-search-spaces">
          <option value="1">John Smith</option>
          <option value="2">Jane Doe</option>
          <option value="3">John Doe</option>
        </select>
      `

      const slim = new SlimSelect({ select: '#local-search-spaces' })
      slim.open()
      slim.render.content.search.input.value = 'John '
      slim.search('John ')

      expect(slim.render.content.search.input.value).toBe('John ')
      expect(slim.render.getOptions(true, true, true)).toHaveLength(2)

      slim.render.content.search.input.value = 'John Smith'
      slim.search('John Smith')

      expect(slim.render.content.search.input.value).toBe('John Smith')
      expect(slim.render.getOptions(true, true, true)).toHaveLength(1)
      expect(slim.render.getOptions(true, true, true)[0].textContent).toBe(
        'John Smith'
      )
    })

    test('whitespace-only input clears search and restores all options', () => {
      document.body.innerHTML = `
        <select id="local-search-clear">
          <option value="1">Apple</option>
          <option value="2">Banana</option>
          <option value="3">Cherry</option>
        </select>
      `

      const slim = new SlimSelect({ select: '#local-search-clear' })
      slim.open()
      slim.search('app')
      expect(slim.render.getOptions(true, true, true)).toHaveLength(1)

      slim.search('   ')

      expect(slim.render.content.search.input.value).toBe('')
      expect(slim.render.getOptions(true, true, true)).toHaveLength(3)
    })
  })

  describe('search whitespace', () => {
    test('API search receives trimmed searchValue', () => {
      destroyAllSlimSelects()
      document.body.innerHTML = '<select id="searchTrim"></select>'

      const searchMock = vi.fn().mockReturnValue([
        { value: 'x', text: 'X' }
      ])

      const slim = new SlimSelect({
        select: '#searchTrim',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        events: {
          search: searchMock
        }
      })

      slim.open()
      slim.render.content.search.input.value = '  te  '
      slim.search('  te  ')

      expect(slim.render.content.search.input.value).toBe('  te  ')
      expect(searchMock).toHaveBeenCalledWith(
        'te',
        expect.any(Array),
        expect.any(Array)
      )
    })

    test('whitespace-only input clears API search without calling search callback', () => {
      destroyAllSlimSelects()
      document.body.innerHTML = '<select id="searchWhitespace"></select>'

      const searchMock = vi.fn().mockReturnValue([
        { value: 'x', text: 'X' }
      ])

      const slim = new SlimSelect({
        select: '#searchWhitespace',
        data: [
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ],
        events: {
          search: searchMock
        }
      })

      slim.open()
      slim.search('te')
      expect(
        slim.render.content.list.querySelectorAll('.ss-option').length
      ).toBeGreaterThanOrEqual(1)

      searchMock.mockClear()
      slim.search('   ')

      expect(searchMock).not.toHaveBeenCalled()
      expect(slim.render.content.search.input.value).toBe('')
      expect(
        slim.render.content.list.querySelectorAll('.ss-option')
      ).toHaveLength(2)
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
      const label = document.querySelector(
        'label[for="label-test-select"]'
      ) as HTMLLabelElement
      label.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )

      // Wait for setTimeout in label handler
      await new Promise((r) => setTimeout(r, 10))

      // SlimSelect should be open
      expect(slim.settings.isOpen).toBe(true)
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
      label.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )

      // Wait for setTimeout in label handler
      await new Promise((r) => setTimeout(r, 10))

      // SlimSelect should be open
      expect(slim.settings.isOpen).toBe(true)
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
      const label = document.querySelector(
        'label[for="disabled-label-select"]'
      ) as HTMLLabelElement
      label.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )

      // Wait for setTimeout in label handler
      await new Promise((r) => setTimeout(r, 10))

      // SlimSelect should remain closed when disabled
      expect(slim.settings.isOpen).toBe(false)
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
      document.body.innerHTML =
        '<select><option value="usa">United States</option></select>'

      const selectElement = document.querySelector(
        'select'
      ) as HTMLSelectElement
      const slim = new SlimSelect({
        select: selectElement
      })

      // SlimSelect should have assigned an id to the select
      expect(selectElement.id).toBeTruthy()
      expect(selectElement.id).toBe(slim.settings.id)
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
      const label = document.querySelector(
        'label[for="cleanup-test-select"]'
      ) as HTMLLabelElement
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
      label.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      await new Promise((r) => setTimeout(r, 300)) // after animation
      expect(slim.settings.isOpen).toBe(true)

      // Now click the main div to close
      const mainDiv = document.querySelector(
        `.ss-main[data-id="${slim.settings.id}"]`
      ) as HTMLElement
      expect(mainDiv).toBeTruthy()

      mainDiv.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      await new Promise((r) => setTimeout(r, 300)) // after animation

      // SlimSelect should be closed
      expect(slim.settings.isOpen).toBe(false)
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
      const deselectButton = document.querySelector(
        `.ss-main[data-id="${slim.settings.id}"] .ss-deselect`
      ) as HTMLElement
      expect(deselectButton).toBeTruthy()

      deselectButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      await new Promise((r) => setTimeout(r, 10))

      // Should be deselected (returns array with empty string for single select)
      expect(slim.getSelected()).toEqual([''])
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
      const mainDiv = document.querySelector(
        `.ss-main[data-id="${slim.settings.id}"]`
      ) as HTMLElement
      mainDiv.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      await new Promise((r) => setTimeout(r, 10))
      expect(slim.settings.isOpen).toBe(true)

      // Click main div again to close
      mainDiv.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      await new Promise((r) => setTimeout(r, 10))
      expect(slim.settings.isOpen).toBe(false)

      // Click main div again to open
      mainDiv.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      await new Promise((r) => setTimeout(r, 10))
      expect(slim.settings.isOpen).toBe(true)
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
      const label1 = document.querySelector(
        'label:first-of-type'
      ) as HTMLLabelElement
      label1.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      await new Promise((r) => setTimeout(r, 300))
      expect(slim1.settings.isOpen).toBe(true)
      expect(slim2.settings.isOpen).toBe(false)

      // Click second label - should close first and open second
      const label2 = document.querySelector(
        'label:last-of-type'
      ) as HTMLLabelElement
      label2.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      await new Promise((r) => setTimeout(r, 300))
      expect(slim1.settings.isOpen).toBe(false)
      expect(slim2.settings.isOpen).toBe(true)

      // Click first label again - should close second and open first
      label1.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      await new Promise((r) => setTimeout(r, 300))
      expect(slim1.settings.isOpen).toBe(true)
      expect(slim2.settings.isOpen).toBe(false)
    })
  })

  describe('option changes race condition scenarios', () => {
    test('options should persist when added to select and value is set immediately', async () => {
      // Reproduce the issue: empty select, init SlimSelect, add options, set value
      document.body.innerHTML = '<select id="test-select"></select>'

      const selectElement = document.getElementById(
        'test-select'
      ) as HTMLSelectElement
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
    })

    test('rapid option and value changes should preserve final state', async () => {
      // Test multiple rapid mutations to ensure queue mechanism works correctly
      document.body.innerHTML = '<select id="test-select"></select>'

      const selectElement = document.getElementById(
        'test-select'
      ) as HTMLSelectElement
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

      const selectElement = document.getElementById(
        'test-select'
      ) as HTMLSelectElement
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

      const selectElement = document.getElementById(
        'test-select'
      ) as HTMLSelectElement
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
    })

    test('should handle option change after first render', async () => {
      // Test scenario: start with 2 options
      document.body.innerHTML = `
        <select id="test-select">
          <option value="opt1">Option 1</option>
          <option value="opt2">Option 2</option>
        </select>
      `

      const selectElement = document.getElementById(
        'test-select'
      ) as HTMLSelectElement
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
    })
  })

  describe('sync and lifecycle', () => {
    test('native option add with selection triggers single updateOptions', async () => {
      document.body.innerHTML = '<select id="sync-native"></select>'

      const selectElement = document.getElementById(
        'sync-native'
      ) as HTMLSelectElement
      const slim = new SlimSelect({ select: selectElement })
      const updateOptionsSpy = vi.spyOn(slim.select, 'updateOptions')

      const option = document.createElement('option')
      option.value = '1'
      option.textContent = 'One'
      selectElement.appendChild(option)
      selectElement.value = '1'

      await new Promise<void>((resolve) => queueMicrotask(resolve))

      expect(updateOptionsSpy.mock.calls.length).toBeLessThanOrEqual(1)
      expect(slim.getData().length).toBe(1)
      expect(slim.getSelected()).toEqual(['1'])
    })

    test('api setSelected uses lightweight native update', () => {
      document.body.innerHTML = `
        <select id="sync-select">
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
      `

      const slim = new SlimSelect({ select: '#sync-select' })
      const setSelectedByValueSpy = vi.spyOn(slim.select, 'setSelectedByValue')
      const updateOptionsSpy = vi.spyOn(slim.select, 'updateOptions')

      updateOptionsSpy.mockClear()

      slim.setSelected('2')

      expect(setSelectedByValueSpy).toHaveBeenCalled()
      expect(updateOptionsSpy).not.toHaveBeenCalled()
      expect(slim.getSelected()).toEqual(['2'])
    })

    test('native select change event fires on UI selection', () => {
      document.body.innerHTML = `
        <select id="change-event-select">
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
      `

      const selectEl = document.getElementById(
        'change-event-select'
      ) as HTMLSelectElement
      const onChangeMock = vi.fn()
      selectEl.addEventListener('change', onChangeMock)

      const slim = new SlimSelect({ select: '#change-event-select' })

      slim.open()
      const option = Array.from(document.querySelectorAll('.ss-option')).find(
        (el) => el.textContent?.trim() === 'Two'
      )
      option!.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(onChangeMock).toHaveBeenCalled()
      expect(selectEl.value).toBe('2')
    })

    test('rapid open then close does not leave isFullOpen true', async () => {
      document.body.innerHTML =
        '<select id="sync-open"><option value="1">One</option></select>'

      const slim = new SlimSelect({
        select: '#sync-open',
        settings: { timeoutDelay: 100 }
      })

      slim.open()
      expect(slim.settings.isOpen).toBe(true)

      slim.close()
      expect(slim.settings.isOpen).toBe(false)
      expect(slim.settings.isFullOpen).toBe(false)

      await new Promise((r) => setTimeout(r, 150))
      expect(slim.settings.isFullOpen).toBe(false)
    })

    test('beforeClose return false prevents close', () => {
      document.body.innerHTML =
        '<select id="before-close-veto"><option value="1">One</option><option value="2" selected>Two</option></select>'

      const beforeCloseMock = vi.fn(() => false)
      const slim = new SlimSelect({
        select: '#before-close-veto',
        events: {
          beforeClose: beforeCloseMock
        }
      })

      slim.open()
      expect(slim.settings.isOpen).toBe(true)

      slim.close()
      expect(beforeCloseMock).toHaveBeenCalledWith({
        source: 'api',
        selectionChanged: false
      })
      expect(slim.settings.isOpen).toBe(true)
    })

    test('beforeClose receives context when re-clicking selected option', () => {
      document.body.innerHTML =
        '<select id="before-close-reclick"><option value="1">One</option><option value="2" selected>Two</option></select>'

      const beforeCloseMock = vi.fn()
      const slim = new SlimSelect({
        select: '#before-close-reclick',
        events: {
          beforeClose: beforeCloseMock
        }
      })

      slim.open()
      const selectedOption = Array.from(
        document.querySelectorAll('.ss-option.ss-selected')
      )[0]
      selectedOption!.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(beforeCloseMock).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'select',
          selectionChanged: false,
          option: expect.objectContaining({ value: '2' })
        })
      )
      expect(slim.settings.isOpen).toBe(false)
    })

    test('beforeClose can veto close on re-clicking selected option', () => {
      document.body.innerHTML =
        '<select id="before-close-reclick-veto"><option value="1">One</option><option value="2" selected>Two</option></select>'

      const slim = new SlimSelect({
        select: '#before-close-reclick-veto',
        events: {
          beforeClose: (info) => {
            if (info.source === 'select' && !info.selectionChanged) {
              return false
            }
          }
        }
      })

      slim.open()
      const selectedOption = Array.from(
        document.querySelectorAll('.ss-option.ss-selected')
      )[0]
      selectedOption!.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(slim.settings.isOpen).toBe(true)
    })
  })

  describe('cssClasses with space-separated strings', () => {
    test('space-separated cssClasses are applied as individual classes', () => {
      document.body.innerHTML =
        '<select id="test"><option>Test</option></select>'

      const slim = new SlimSelect({
        select: '#test',
        cssClasses: {
          main: 'class1 class2'
        }
      })

      expect(slim.render.main.main.classList.contains('ss-main')).toBe(true)
      expect(slim.render.main.main.classList.contains('class1')).toBe(true)
      expect(slim.render.main.main.classList.contains('class2')).toBe(true)
    })
  })
})
