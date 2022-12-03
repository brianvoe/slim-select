/**
 * @jest-environment jsdom
 */

'use strict'

import { describe, expect, jest, test } from '@jest/globals'
import Select from './select'
import Store, { Optgroup, Option } from './store'

describe('select module', () => {
  test('constructor', () => {
    document.body.innerHTML = '<select id="test"></select>'

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)
    expect(select).toBeInstanceOf(Select)
  })

  test('get data from select options', () => {
    document.body.innerHTML = `<select id="test">
        <option id="value1" value="1">One</option>
        <option value="2">Two</option>
    </select>`

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)
    let data = select.getData() as Option[]
    expect(data.length).toBe(2)
    expect(data[0].id).toBe('value1')
    expect(data[0].value).toBe('1')
    expect(data[0].text).toBe('One')
    expect(data[1].value).toBe('2')
    expect(data[1].text).toBe('Two')
  })

  test('get data from select optgroups', () => {
    document.body.innerHTML = `<select id="test">
        <optgroup label="test1">
            <option value="1">One</option>
            <option value="2">Two</option>
        </optgroup>
        <optgroup label="test2">
            <option value="3">Three</option>
            <option value="4">Four</option>
            <option value="5">Five</option>
        </optgroup>
    </select>`

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)
    let data = select.getData() as Optgroup[]
    expect(data.length).toBe(2)
    expect(data[0].label).toBe('test1')
    expect(data[0].options.length).toBe(2)
    expect(data[0].options[0].value).toBe('1')
    expect(data[0].options[0].text).toBe('One')
    expect(data[0].options[1].value).toBe('2')
    expect(data[0].options[1].text).toBe('Two')
    expect(data[1].label).toBe('test2')
    expect(data[1].options.length).toBe(3)
    expect(data[1].options[0].value).toBe('3')
    expect(data[1].options[0].text).toBe('Three')
    expect(data[1].options[1].value).toBe('4')
    expect(data[1].options[1].text).toBe('Four')
    expect(data[1].options[2].value).toBe('5')
    expect(data[1].options[2].text).toBe('Five')
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
        selected: false,
      },
      {
        id: '2',
        value: '2',
        text: 'Two',
        selected: false,
      },
    ])
    let data = store.getData()
    select.updateOptions(data)

    expect(selectElement.outerHTML).toBe(
      '<select id="test"><option id="1" value="1">One</option><option id="2" value="2">Two</option></select>',
    )
  })

  test('event change value listener', async () => {
    document.body.innerHTML = `<select id="test">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </select>`

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)

    let data = select.getData() as Option[]

    expect(data[0].selected).toBe(true)

    const callback = jest.fn()
    select.onValueChange = callback

    // Change the value
    selectElement.value = '2'
    selectElement.dispatchEvent(new Event('change'))

    // TODO: figure out why this is not working
    // expect(callback).toHaveBeenCalled()

    // Get selected data
    const selected = select.getSelectedValues()
    expect(selected[0]).toBe('2')

    // Change the full data
    data = select.getData() as Option[]
    expect(data[1].selected).toBe(true)
  })

  test('event change value listener when options are replaced', () => {
    document.body.innerHTML = `<select id="test">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </select>`

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)

    let data = select.getData() as Option[]

    expect(data[0].selected).toBe(true)

    const callback = jest.fn()
    select.onValueChange = callback

    selectElement.innerHTML = `<option value="4">Four</option>
        <option value="5" selected>Five</option>
        <option value="6">Six</option>`

    // TODO: figure out why this is not working
    // expect(callback).toHaveBeenCalled()

    // Give the mutation observer time to run
    data = select.getData() as Option[]
    expect(data[1].value).toBe('5')
    expect(data[1].selected).toBe(true)
  })

  test('mutation observer listener for select option changes', () => {
    document.body.innerHTML = `<select id="test">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </select>`

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)

    let data = select.getData() as Option[]
    expect(data.length).toBe(3)

    const callback = jest.fn()
    select.onOptionsChange = callback

    selectElement.innerHTML = '<option value="1">One</option><option value="2">Two</option>'

    // TODO: figure out why this is not working
    // expect(callback).toHaveBeenCalled()

    data = select.getData() as Option[]
    expect(data.length).toBe(2)
  })

  test('mutation observer listener for select optgroup option changes', () => {
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

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)

    let dataOptgroup = select.getData() as Optgroup[]

    expect(dataOptgroup.length).toBe(2)

    const callback = jest.fn()
    select.onOptionsChange = callback

    let selectOptgroup = document.getElementById('test_optgroup') as HTMLOptGroupElement
    selectOptgroup.innerHTML = '<option value="8">Eight</option><option value="9">Nine</option>'

    // TODO: figure out why this is not working
    // expect(callback).toHaveBeenCalled()

    let dataOptgroups = select.getData() as Option[]
    expect(dataOptgroups.length).toBe(2)

    // get selected data
    let selected = select.getSelectedValues()
    expect(selected.length).toBe(1)
  })

  test('mutation observer listener for select option text changes', () => {
    document.body.innerHTML = `<select id="test">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </select>`

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)

    let data = select.getData() as Option[]

    expect(data[0].text).toBe('One')

    const callback = jest.fn()
    select.onOptionsChange = callback

    let option = selectElement.options[0]
    option.text = 'New One'

    data = select.getData() as Option[]
    expect(data[0].text).toBe('New One')
  })

  test('mutation observer listener for select optgroup option text changes', () => {
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

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)

    let dataOptgroup = select.getData() as Optgroup[]

    expect(dataOptgroup[0].options[0].text).toBe('One')

    const callback = jest.fn()
    select.onOptionsChange = callback

    let selectOption = document.getElementById('test_option') as HTMLOptionElement
    selectOption.text = 'New One'

    let dataOption = select.getData() as Optgroup[]
    expect(dataOption[0].options[0].text).toBe('New One')
  })
})
