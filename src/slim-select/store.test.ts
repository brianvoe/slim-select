'use strict'

import { describe, expect, test } from '@jest/globals'
import Store, { Optgroup, Option } from './store'

describe('store module', () => {
  test('constructor', () => {
    let store = new Store('single', [])
    expect(store).toBeInstanceOf(Store)
  })

  test('set data', () => {
    let store = new Store('single', [
      {
        text: 'test',
      },
    ])

    let data = store.getData()

    // Make sure data has one item and that it has the correct text
    expect(data.length).toBe(1)
    expect((data[0] as Option).text).toBe('test')

    // Make sure the data has all the default fields
    expect((data[0] as Option).id).toBeDefined()
    expect((data[0] as Option).value).toBeDefined()
    expect((data[0] as Option).text).toBeDefined()
    expect((data[0] as Option).html).toBeDefined()
    expect((data[0] as Option).selected).toBeDefined()
    expect((data[0] as Option).display).toBeDefined()
    expect((data[0] as Option).disabled).toBeDefined()
    expect((data[0] as Option).placeholder).toBeDefined()
    expect((data[0] as Option).class).toBeDefined()
    expect((data[0] as Option).style).toBeDefined()
    expect((data[0] as Option).data).toBeDefined()
    expect((data[0] as Option).mandatory).toBeDefined()
  })

  test('set data with optgroup', () => {
    let store = new Store('single', [
      {
        label: 'test',
        options: [
          {
            text: 'test',
          },
        ],
      },
    ])

    let data = store.getData()

    // Make sure data has one item and that it has the correct text
    expect(data.length).toBe(1)
    expect((data[0] as Optgroup).label).toBe('test')
    expect((data[0] as Optgroup).options?.length).toBe(1)
    expect((data[0] as Optgroup).options?.[0].text).toBe('test')
  })

  test('set data with optgroup and option', () => {
    let store = new Store('single', [
      {
        label: 'test',
        options: [
          {
            text: 'test',
          },
        ],
      },
      {
        text: 'test',
      },
    ])

    let data = store.getData()

    // Make sure data has one item and that it has the correct text
    expect(data.length).toBe(2)
    expect((data[0] as Optgroup).label).toBe('test')
    expect((data[0] as Optgroup).options?.length).toBe(1)
    expect((data[0] as Optgroup).options?.[0].text).toBe('test')
    expect((data[1] as Option).text).toBe('test')
  })

  test('set data and set selected by ID', () => {
    let store = new Store('single', [
      {
        id: '8675309',
        text: 'test',
      },
    ])
    store.setSelectedBy('id', ['8675309'])

    let data = store.getData()

    // Make sure data has one item and that it has the correct text
    expect(data.length).toBe(1)
    expect((data[0] as Option).text).toBe('test')
    expect((data[0] as Option).selected).toBe(true)
  })

  test('set data and set selected by value', () => {
    let store = new Store('single', [
      {
        text: 'test',
        value: 'hello',
      },
    ])
    store.setSelectedBy('value', ['hello'])

    let data = store.getData()

    // Make sure data has one item and that it has the correct text
    expect(data.length).toBe(1)
    expect((data[0] as Option).text).toBe('test')
    expect((data[0] as Option).selected).toBe(true)
  })

  test('set data and set selected to empty string', () => {
    let store = new Store('single', [
      {
        text: 'all',
        value: '',
      },
      {
        text: 'Value 1',
        value: '1',
        selected: true,
      },
    ])
    store.setSelectedBy('value', [''])

    let data = store.getData()

    // Make sure data has one item and that it has the correct text
    expect(data.length).toBe(2)
    expect((data[0] as Option).text).toBe('all')
    expect((data[0] as Option).selected).toBe(true)
  })

  test('set data and set selected by value multiple for single element', () => {
    let store = new Store('single', [
      {
        text: 'test1',
      },
      {
        text: 'test2',
      },
    ])
    store.setSelectedBy('value', ['test1', 'test2'])

    let data = store.getData()

    // Make sure data has one item and that it has the correct text
    expect(data.length).toBe(2)
    expect((data[0] as Option).text).toBe('test1')
    expect((data[0] as Option).selected).toBe(true)
    expect((data[1] as Option).text).toBe('test2')
    expect((data[1] as Option).selected).toBe(false)
  })

  test('set data and search', () => {
    let store = new Store('single', [
      {
        text: 'test1',
      },
      {
        text: 'test2',
        value: 'test2',
      },
      {
        text: 'test3',
      },
    ])

    let data = store.getData()

    const searchFilter = (opt: Option, search: string): boolean => {
      return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }

    // With searchFilter search against current store data set
    let search = store.search('test2', searchFilter)
    expect(search.length).toBe(1)
    expect((search[0] as Option).value).toBe('test2')
  })

  test('set data with non selected on single select', () => {
    let store = new Store('single', [
      {
        text: 'test1',
      },
      {
        text: 'test2',
        value: 'test2',
      },
      {
        text: 'test3',
      },
    ])

    let data = store.getData()

    // Make sure data has one item and that it has the correct text
    expect(data.length).toBe(3)
    expect((data[0] as Option).text).toBe('test1')
    expect((data[0] as Option).selected).toBe(true)
    expect((data[1] as Option).text).toBe('test2')
    expect((data[1] as Option).selected).toBe(false)
    expect((data[2] as Option).text).toBe('test3')
    expect((data[2] as Option).selected).toBe(false)
  })

  test('set data with multiple selected on single select', () => {
    let store = new Store('single', [
      {
        text: 'test1',
      },
      {
        text: 'test2',
        value: 'test2',
        selected: true,
      },
      {
        text: 'test3',
        selected: true,
      },
    ])

    let data = store.getData()

    // Make sure data has one item and that it has the correct text
    expect(data.length).toBe(3)
    expect((data[0] as Option).text).toBe('test1')
    expect((data[0] as Option).selected).toBe(false)
    expect((data[1] as Option).text).toBe('test2')
    expect((data[1] as Option).selected).toBe(true)
    expect((data[2] as Option).text).toBe('test3')
    expect((data[2] as Option).selected).toBe(false)
  })
})
