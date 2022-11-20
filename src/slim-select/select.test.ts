/**
 * @jest-environment jsdom
 */

'use strict'

import { describe, expect, test } from '@jest/globals'
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
        <option value="1">One</option>
        <option value="2">Two</option>
    </select>`

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)
    let data = select.getData() as Option[]
    expect(data.length).toBe(2)
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

    expect(selectElement.innerHTML).toBe('<option value="1">One</option><option value="2">Two</option>')
  })

  test('event change value listener', () => {
    document.body.innerHTML = `<select id="test">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </select>`

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)

    let data = select.getData() as Option[]

    expect(data[0].selected).toBe(true)

    let didChange = false
    select.addValueChangeListener(() => {
      didChange = true
    })

    selectElement.value = '2'

    data = select.getData() as Option[]

    expect(data[1].selected).toBe(true)

    // Give the mutation observer time to run
    setTimeout(() => {
      expect(didChange).toBe(true)
    }, 100)
  })

  test('mutation observer listener', () => {
    document.body.innerHTML = `<select id="test">
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </select>`

    let selectElement = document.getElementById('test') as HTMLSelectElement
    let select = new Select(selectElement)

    let data = select.getData() as Option[]

    expect(data.length).toBe(3)

    let didChange = false
    select.addSelectChangeListener(() => {
      didChange = true
    })

    selectElement.innerHTML = '<option value="1">One</option><option value="2">Two</option>'

    data = select.getData() as Option[]

    expect(data.length).toBe(2)

    // Give the mutation observer time to run
    setTimeout(() => {
      expect(didChange).toBe(true)
    }, 100)
  })
})
