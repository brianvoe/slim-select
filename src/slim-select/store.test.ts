import { describe, expect, test } from '@jest/globals'
import { error } from 'console'
import Store, { Optgroup, Option } from './store'

describe('store module', () => {
  test('constructor', () => {
    let store = new Store()
    expect(store).toBeInstanceOf(Store)
  })

  test('mergeDefaultOption', () => {
    let option = Store.mergeDefaultOption({ id: '1', text: 'one' })
    expect(option).toEqual({
      id: '1',
      value: '',
      text: 'one',
      innerHTML: '',
      selected: false,
      display: true,
      disabled: false,
      placeholder: '',
      class: '',
      style: '',
      data: {},
      mandatory: false,
    })
  })

  test('set data', () => {
    let store = new Store()
    store.set([
      {
        text: 'test',
      },
    ])
    error(store.data)

    // Make sure data has one item and that it has the correct text
    expect(store.data.length).toBe(1)
    expect((store.data[0] as Option).text).toBe('test')

    // Make sure the data has all the default fields
    expect((store.data[0] as Option).id).toBeDefined()
    expect((store.data[0] as Option).value).toBeDefined()
    expect((store.data[0] as Option).text).toBeDefined()
    expect((store.data[0] as Option).innerHTML).toBeDefined()
    expect((store.data[0] as Option).selected).toBeDefined()
    expect((store.data[0] as Option).display).toBeDefined()
    expect((store.data[0] as Option).disabled).toBeDefined()
    expect((store.data[0] as Option).placeholder).toBeDefined()
    expect((store.data[0] as Option).class).toBeDefined()
    expect((store.data[0] as Option).style).toBeDefined()
    expect((store.data[0] as Option).data).toBeDefined()
    expect((store.data[0] as Option).mandatory).toBeDefined()
  })

  test('set data with optgroup', () => {
    let store = new Store()
    store.set([
      {
        label: 'test',
        options: [
          {
            text: 'test',
          },
        ],
      },
    ])

    // Make sure data has one item and that it has the correct text
    expect(store.data.length).toBe(1)
    expect((store.data[0] as Optgroup).label).toBe('test')
    expect((store.data[0] as Optgroup).options?.length).toBe(1)
    expect((store.data[0] as Optgroup).options?.[0].text).toBe('test')
  })

  test('set data with optgroup and option', () => {
    let store = new Store()
    store.set([
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

    // Make sure data has one item and that it has the correct text
    expect(store.data.length).toBe(2)
    expect((store.data[0] as Optgroup).label).toBe('test')
    expect((store.data[0] as Optgroup).options?.length).toBe(1)
    expect((store.data[0] as Optgroup).options?.[0].text).toBe('test')
    expect((store.data[1] as Option).text).toBe('test')
  })

  test('set data and set selected by ID', () => {
    let store = new Store()
    store.set([
      {
        id: '8675309',
        text: 'test',
      },
    ])
    store.setSelectedByID(['8675309'])

    // Make sure data has one item and that it has the correct text
    expect(store.data.length).toBe(1)
    expect((store.data[0] as Option).text).toBe('test')
    expect((store.data[0] as Option).selected).toBe(true)
  })

  test('set data and set selected by value', () => {
    let store = new Store()
    store.set([
      {
        text: 'test',
        value: 'hello',
      },
    ])
    store.setSelectedByID(['hello'])

    // Make sure data has one item and that it has the correct text
    expect(store.data.length).toBe(1)
    expect((store.data[0] as Option).text).toBe('test')
    expect((store.data[0] as Option).selected).toBe(true)
  })

  test('set data and search', () => {
    let store = new Store()
    store.set([
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

    const searchFilter = (opt: Option, search: string): boolean => {
      return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }

    // With searchFilter search against current store data set
    let search = store.search('test2', searchFilter)
    error(search)
    expect(search.length).toBe(1)
    expect((search[0] as Option).value).toBe('test2')
  })
})
