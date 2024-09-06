/**
 * @jest-environment jsdom
 */

'use strict'

import { describe, expect, jest, test } from '@jest/globals'
import Select from './select'
import Store, { Optgroup, Option } from './store'

describe('select module', () => {
  let select: Select

  beforeEach(() => {
    document.body.innerHTML = `<select id="test" multiple>
        <optgroup label="test1">
            <option id="111" value="1">One</option>
            <option id="222" value="2">Two</option>
        </optgroup>
        <optgroup label="test2">
            <option id="333" value="3">Three</option>
            <option id="444" value="4">Four</option>
            <option id="555" value="5">Five</option>
        </optgroup>
        <option id="666" value="6">Six</option>
      </select>`

    const selectElement = document.getElementById('test') as HTMLSelectElement
    select = new Select(selectElement)
  })

  describe('constructor', () => {
    test('constructor works', () => {
      document.body.innerHTML = '<select id="test"></select>'

      const selectElement = document.getElementById('test') as HTMLSelectElement
      const select = new Select(selectElement)

      expect(select).toBeInstanceOf(Select)
      expect(select.listen).toBe(true)
      expect((<any>select).observer).toBeInstanceOf(MutationObserver)
    })
  })

  describe('enable', () => {
    test('enable enables select element', () => {
      select.select.disabled = true
      select.enable()

      expect(select.select.disabled).toBe(false)
    })
  })

  describe('disable', () => {
    test('disable disables select element', () => {
      select.disable()

      expect(select.select.disabled).toBe(true)
    })
  })

  describe('hideUI', () => {
    test('correct HTML attributes get set', () => {
      select.hideUI()

      expect(select.select.tabIndex).toBe(-1)
      expect(select.select.style.display).toBe('none')
      expect(select.select.getAttribute('aria-hidden')).toBe('true')
    })
  })

  describe('showUI', () => {
    test('HTML attributes get reset', () => {
      select.select.tabIndex = -1
      select.select.style.display = 'none'
      select.select.setAttribute('aria-hidden', 'true')

      select.showUI()

      expect(select.select.tabIndex).toBeFalsy()
      expect(select.select.style.display).toBeFalsy()
      expect(select.select.getAttribute('aria-hidden')).toBeNull()
    })
  })

  describe('getData', () => {
    test('get data from select options', () => {
      document.body.innerHTML = `<select id="test">
        <option id="value1" value="1">One</option>
        <option value="2">Two</option>
      </select>`

      const selectElement = document.getElementById('test') as HTMLSelectElement
      const select = new Select(selectElement)
      const data = select.getData() as Option[]

      expect(data).toHaveLength(2)
      expect(data[0].id).toBe('value1')
      expect(data[0].value).toBe('1')
      expect(data[0].text).toBe('One')
      expect(data[1].value).toBe('2')
      expect(data[1].text).toBe('Two')
    })

    test('get data from select optgroups', () => {
      document.body.innerHTML = `<select id="test">
        <optgroup label="test1">
            <option id="111" value="1">One</option>
            <option id="222" value="2">Two</option>
        </optgroup>
        <optgroup label="test2">
            <option id="333" value="3">Three</option>
            <option id="444" value="4">Four</option>
            <option id="555" value="5">Five</option>
        </optgroup>
      </select>`

      const selectElement = document.getElementById('test') as HTMLSelectElement
      const select = new Select(selectElement)
      const data = select.getData() as Optgroup[]

      expect(data).toHaveLength(2)

      expect(data[0].label).toBe('test1')
      expect(data[0].options).toHaveLength(2)
      expect(data[0].options[0].id).toBe('111')
      expect(data[0].options[0].value).toBe('1')
      expect(data[0].options[0].text).toBe('One')
      expect(data[0].options[1].id).toBe('222')
      expect(data[0].options[1].value).toBe('2')
      expect(data[0].options[1].text).toBe('Two')

      expect(data[1].label).toBe('test2')
      expect(data[1].options).toHaveLength(3)
      expect(data[1].options[0].id).toBe('333')
      expect(data[1].options[0].value).toBe('3')
      expect(data[1].options[0].text).toBe('Three')
      expect(data[1].options[1].id).toBe('444')
      expect(data[1].options[1].value).toBe('4')
      expect(data[1].options[1].text).toBe('Four')
      expect(data[1].options[2].id).toBe('555')
      expect(data[1].options[2].value).toBe('5')
      expect(data[1].options[2].text).toBe('Five')
    })
  })

  describe('setSelected', () => {
    test('single option gets selected correctly', () => {
      // get id of the first option in the first optgroup
      const id = select.select.querySelector<HTMLOptionElement>('optgroup option')?.id
      expect(id).toBe('111')

      select.setSelected([id as string])
      expect(select.select.querySelector<HTMLOptionElement>('option[value="1"]')?.selected).toBe(true)
    })

    test('mix of options get selected correctly', () => {
      select.setSelected(['111', '222', '333'])

      expect(select.select.querySelector<HTMLOptionElement>('option[value="1"]')?.selected).toBe(true)
      expect(select.select.querySelector<HTMLOptionElement>('option[value="2"]')?.selected).toBe(true)
      expect(select.select.querySelector<HTMLOptionElement>('option[value="3"]')?.selected).toBe(true)
    })
  })

  describe('setSelectedByValue', () => {
    test('single value get selected correctly', () => {
      select.setSelectedByValue(['6'])

      expect(select.select.querySelector<HTMLOptionElement>('option[value="6"]')?.selected).toBe(true)
    })

    test('opt group value gets selected correctly', () => {
      select.setSelectedByValue(['4'])

      expect(select.select.querySelector<HTMLOptionElement>('option[value="4"]')?.selected).toBe(true)
    })

    test('mix of options get selected correctly', () => {
      select.setSelectedByValue(['2', '3', '6'])

      expect(select.select.querySelector<HTMLOptionElement>('option[value="2"]')?.selected).toBe(true)
      expect(select.select.querySelector<HTMLOptionElement>('option[value="3"]')?.selected).toBe(true)
      expect(select.select.querySelector<HTMLOptionElement>('option[value="6"]')?.selected).toBe(true)
    })
  })

  describe('updateSelected', () => {
    test('id gets updated correctly', () => {
      select.select.dataset.id = 'old_id'

      select.updateSelect('new_id')

      expect(select.select.dataset.id).toBe('new_id')
    })

    test('new styles are set correctly', () => {
      select.updateSelect(undefined, 'color: red')

      expect(select.select.style.color).toBe('red')
    })

    test("setting styles doesn't override id", () => {
      select.select.dataset.id = 'set_id'

      select.updateSelect(undefined, 'color: red')

      expect(select.select.dataset.id).toBe('set_id')
    })

    test('classes are set correctly', () => {
      select.updateSelect(undefined, undefined, ['class0', 'class1'])

      expect(select.select.classList.contains('class0')).toBe(true)
      expect(select.select.classList.contains('class1')).toBe(true)
    })
  })

  test('update select from data', () => {
    document.body.innerHTML = '<select id="test"></select>'

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)
    let store = new Store('single', [
      {
        id: '1',
        value: '1',
        text: 'One',
        selected: false
      },
      {
        id: '2',
        value: '2',
        text: 'Two',
        selected: false
      }
    ])
    let data = store.getData()
    select.updateOptions(data)

    expect(selectElement.outerHTML).toBe(
      '<select id="test"><option id="1" value="1">One</option><option id="2" value="2">Two</option></select>'
    )
  })

  describe('onValueChange', () => {
    let select: Select
    let selectElement: HTMLSelectElement

    beforeEach(() => {
      document.body.innerHTML = `<select id="test">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>`

      selectElement = document.getElementById('test') as HTMLSelectElement
      select = new Select(selectElement)
    })

    test('listener is triggered when the select value changes', async () => {
      // make sure the first element is selected as standard
      let data = select.getData() as Option[]
      expect(data[0].selected).toBe(true)

      const onValueMock = jest.fn()
      select.onValueChange = onValueMock

      // Change the value
      selectElement.value = '2'
      selectElement.dispatchEvent(new Event('change'))

      await new Promise((r) => setTimeout(r, 50))
      expect(onValueMock).toHaveBeenCalled()

      // Get selected data
      const selected = select.getSelectedValues()
      expect(selected[0]).toBe('2')

      // Check all data
      data = select.getData() as Option[]
      expect(data[0].selected).toBe(false)
      expect(data[1].selected).toBe(true)
    })

    test('listener is triggered when inner HTML is replaced with new options', async () => {
      const onValueMock = jest.fn()
      select.onValueChange = onValueMock

      selectElement.innerHTML = `<option value="4">Four</option>
        <option value="5" selected>Five</option>
        <option value="6">Six</option>`

      await new Promise((r) => setTimeout(r, 50))
      expect(onValueMock).toHaveBeenCalled()

      // Give the mutation observer time to run
      const data = select.getData() as Option[]
      expect(data[1].value).toBe('5')
      expect(data[1].selected).toBe(true)
    })
  })

  describe('onOptionsChange', () => {
    test('listener triggers when select options change without changing the select value', async () => {
      document.body.innerHTML = `<select id="test">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>`

      const selectElement = document.getElementById('test') as HTMLSelectElement
      const select = new Select(selectElement)

      let data = select.getData() as Option[]
      expect(data).toHaveLength(3)

      const onOptionsMock = jest.fn()
      select.onOptionsChange = onOptionsMock

      selectElement.innerHTML = '<option value="1">One</option><option value="2">Two</option>'

      await new Promise((r) => setTimeout(r, 50))
      expect(onOptionsMock).toHaveBeenCalled()

      data = select.getData() as Option[]
      expect(data).toHaveLength(2)
    })

    test('listener triggers when optgroup options change', async () => {
      document.body.innerHTML = `<select id="test">
        <optgroup id="test_optgroup" label="test1">
            <option value="1">One</option>
            <option value="2">Two</option>
        </optgroup>
        <optgroup label="test2">
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
        </optgroup>
      </select>`

      const selectElement = document.getElementById('test') as HTMLSelectElement
      const select = new Select(selectElement)

      const optGroups = select.getData() as Optgroup[]
      expect(optGroups).toHaveLength(2)

      const onOptionsMock = jest.fn()
      select.onOptionsChange = onOptionsMock

      const selectOptgroup = document.getElementById('test_optgroup') as HTMLOptGroupElement
      selectOptgroup.innerHTML = '<option value="8">Eight</option><option value="9">Nine</option>'

      await new Promise((r) => setTimeout(r, 50))
      expect(onOptionsMock).toHaveBeenCalled()

      const options = select.getData() as Option[]
      expect(options).toHaveLength(2)

      // get selected data
      const selected = select.getSelectedValues()
      expect(selected).toHaveLength(1)
    })

    test('listener triggers when select option text changes', async () => {
      document.body.innerHTML = `<select id="test">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>`

      const selectElement = document.getElementById('test') as HTMLSelectElement
      const select = new Select(selectElement)

      let data = select.getData() as Option[]
      expect(data[0].text).toBe('One')

      const onOptionsMock = jest.fn()
      select.onOptionsChange = onOptionsMock

      let option = selectElement.options[0]
      option.text = 'New One'

      await new Promise((r) => setTimeout(r, 50))
      expect(onOptionsMock).toHaveBeenCalled()

      data = select.getData() as Option[]
      expect(data[0].text).toBe('New One')
    })

    test('listener triggers when select optgroup option text changes', async () => {
      document.body.innerHTML = `<select id="test">
        <optgroup id="test_optgroup" label="test1">
            <option id=test_option value="1">One</option>
            <option value="2">Two</option>
        </optgroup>
        <optgroup label="test2">
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
        </optgroup>
      </select>`

      const selectElement = document.getElementById('test') as HTMLSelectElement
      const select = new Select(selectElement)

      let dataOptgroup = select.getData() as Optgroup[]

      expect(dataOptgroup[0].options[0].text).toBe('One')

      const onOptionsMock = jest.fn()
      select.onOptionsChange = onOptionsMock

      let selectOption = document.getElementById('test_option') as HTMLOptionElement
      selectOption.text = 'New One'

      await new Promise((r) => setTimeout(r, 50))
      expect(onOptionsMock).toHaveBeenCalled()

      let dataOption = select.getData() as Optgroup[]
      expect(dataOption[0].options[0].text).toBe('New One')
    })
  })
})
