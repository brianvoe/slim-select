'use strict'

import { describe, expect, test } from '@jest/globals'
import Store, { DataArray, DataObjectPartial, Optgroup, Option } from './store'

describe('store module', () => {
  describe('constructor', () => {
    test('constructor without data', () => {
      let store = new Store('single', [])
      expect(store).toBeInstanceOf(Store)
    })

    test('constructor with single option', () => {
      const store = new Store('single', [
        {
          text: 'test'
        }
      ])

      const data = store.getData()

      // Make sure data has one item and that it has the correct text
      expect(data).toHaveLength(1)
      expect(data[0]).toBeInstanceOf(Option)

      const option = data[0] as Option

      expect(option.text).toBe('test')
      expect(option.id).toBeDefined()
      expect(option.value).toBeDefined()
      expect(option.text).toBeDefined()
      expect(option.html).toBeDefined()
      expect(option.selected).toBeDefined()
      expect(option.display).toBeDefined()
      expect(option.disabled).toBeDefined()
      expect(option.placeholder).toBeDefined()
      expect(option.class).toBeDefined()
      expect(option.style).toBeDefined()
      expect(option.data).toBeDefined()
      expect(option.mandatory).toBeDefined()
    })

    test('constructor with optgroup', () => {
      const store = new Store('single', [
        {
          label: 'opt group',
          options: [
            {
              text: 'test'
            }
          ]
        }
      ])

      const data = store.getData()

      expect(data).toHaveLength(1)

      expect(data[0]).toBeInstanceOf(Optgroup)
      const optGroup = data[0] as Optgroup

      expect(optGroup.label).toBe('opt group')
      expect(optGroup.options).toHaveLength(1)
      expect(optGroup.options?.[0].text).toBe('test')
    })

    test('constructor with optgroup and option', () => {
      const store = new Store('single', [
        {
          label: 'opt group',
          options: [
            {
              text: 'opt group option'
            }
          ]
        },
        {
          text: 'option'
        }
      ])

      const data = store.getData()

      expect(data).toHaveLength(2)

      expect(data[0]).toBeInstanceOf(Optgroup)
      const optGroup = data[0] as Optgroup

      expect(optGroup.label).toBe('opt group')
      expect(optGroup.options).toHaveLength(1)
      expect(optGroup.options?.[0].text).toBe('opt group option')

      expect(data[1]).toBeInstanceOf(Option)
      expect((data[1] as Option).text).toBe('option')
    })

    test('constructor with multiple selected on single select only registers first selected', () => {
      const store = new Store('single', [
        {
          text: 'test1'
        },
        {
          text: 'test2',
          value: 'test2',
          selected: true
        },
        {
          text: 'test3',
          selected: true
        }
      ])

      // cast to an option array here, so we don't need casts in the comparisons
      const data = store.getData() as Array<Option>

      expect(data).toHaveLength(3)
      expect(data[0].text).toBe('test1')
      expect(data[0].selected).toBe(false)
      expect(data[1].text).toBe('test2')
      expect(data[1].selected).toBe(true)
      expect(data[2].text).toBe('test3')
      expect(data[2].selected).toBe(false)
    })

    test('constructor without a selected element on single select selects first option', () => {
      const store = new Store('single', [
        {
          text: 'test1'
        },
        {
          text: 'test2',
          value: 'test2'
        },
        {
          text: 'test3'
        }
      ])

      // cast to an option array here, so we don't need casts in the comparisons
      const data = store.getData() as Array<Option>

      expect(data).toHaveLength(3)
      expect(data[0].text).toBe('test1')
      expect(data[0].selected).toBe(true)
      expect(data[1].text).toBe('test2')
      expect(data[1].selected).toBe(false)
      expect(data[2].text).toBe('test3')
      expect(data[2].selected).toBe(false)
    })

    test('constructor with multiple selected on multiple select registers all selected', () => {
      const store = new Store('multiple', [
        {
          text: 'test1'
        },
        {
          text: 'test2',
          value: 'test2',
          selected: true
        },
        {
          text: 'test3',
          selected: true
        }
      ])

      // cast to an option array here, so we don't need casts in the comparisons
      const data = store.getData() as Array<Option>

      expect(data).toHaveLength(3)
      expect(data[0].text).toBe('test1')
      expect(data[0].selected).toBe(false)
      expect(data[1].text).toBe('test2')
      expect(data[1].selected).toBe(true)
      expect(data[2].text).toBe('test3')
      expect(data[2].selected).toBe(true)
    })

    test('constructor without a selected element on multiple select does not select anything', () => {
      const store = new Store('multiple', [
        {
          text: 'test1'
        },
        {
          text: 'test2',
          value: 'test2'
        },
        {
          text: 'test3'
        }
      ])

      // cast to an option array here, so we don't need casts in the comparisons
      const data = store.getData() as Array<Option>

      expect(data).toHaveLength(3)
      data.forEach((option) => {
        expect(option.selected).toBe(false)
      })
    })
  })

  describe('validateDataArray', () => {
    let store: Store

    beforeAll(() => {
      store = new Store('single', [])
    })

    test('invalid data returns error', () => {
      const invalidData = { test: true }

      const res = store.validateDataArray(invalidData as unknown as DataArray)
      expect(res).toBeInstanceOf(Error)
      expect(res?.message).toBe('Data must be an array')
    })

    test('single invalid data entry returns error', () => {
      const invalidData = [{ name: 'this is invalid' }]

      const res = store.validateDataArray(invalidData as unknown as DataArray)
      expect(res).toBeInstanceOf(Error)
      expect(res?.message).toBe('Data object must be a valid optgroup or option')
    })

    test('invalid data and valid option returns error', () => {
      const invalidData = [
        {
          name: 'invalid data'
        },
        {
          text: 'valid option'
        }
      ]

      const res = store.validateDataArray(invalidData as unknown as DataArray)
      expect(res).toBeInstanceOf(Error)
      expect(res?.message).toBe('Data object must be a valid optgroup or option')
    })

    test('valid option and invalid data returns error', () => {
      const invalidData = [
        {
          text: 'valid'
        },
        {
          name: 'this is invalid'
        }
      ]

      const res = store.validateDataArray(invalidData as unknown as DataArray)
      expect(res).toBeInstanceOf(Error)
      expect(res?.message).toBe('Data object must be a valid optgroup or option')
    })

    test('valid opt group with invalid data returns error', () => {
      const invalidData = [
        {
          label: 'valid',
          options: [
            {
              invalid: 'asdf'
            }
          ]
        }
      ]

      const res = store.validateDataArray(invalidData as unknown as DataArray)
      expect(res).toBeInstanceOf(Error)
      expect(res?.message).toBe('Option must have a text')
    })

    test('single valid option validates', () => {
      const validData = [
        {
          text: 'valid option'
        }
      ]

      const res = store.validateDataArray(validData)
      expect(res).toBeNull()
    })

    test('multiple valid options validates', () => {
      const validData = [
        {
          text: 'valid option 1'
        },
        {
          text: 'valid option 2'
        }
      ]

      const res = store.validateDataArray(validData)
      expect(res).toBeNull()
    })

    test('single valid opt group validates', () => {
      const validData = [
        {
          label: 'valid opt group'
        }
      ]

      const res = store.validateDataArray(validData)
      expect(res).toBeNull()
    })

    test('valid opt group with options validates', () => {
      const validData = [
        {
          label: 'valid opt group',
          options: [
            {
              text: 'option 1'
            },
            {
              text: 'option 2'
            }
          ]
        }
      ]

      const res = store.validateDataArray(validData)
      expect(res).toBeNull()
    })
    test('valid opt group with options and separate options validates', () => {
      const validData = [
        {
          label: 'valid opt group',
          options: [
            {
              text: 'option 1'
            },
            {
              text: 'option 2'
            }
          ]
        },
        {
          text: 'main option 1'
        },
        {
          text: 'main option 2'
        }
      ]

      const res = store.validateDataArray(validData)
      expect(res).toBeNull()
    })
  })

  describe('validateOption', () => {
    let store: Store

    beforeAll(() => {
      store = new Store('single', [])
    })

    test('empty option returns error', () => {
      const res = store.validateOption({} as Option)
      expect(res).toBeInstanceOf(Error)
      expect(res?.message).toBe('Option must have a text')
    })

    test('invalid data returns error', () => {
      const res = store.validateOption({ label: 'text' } as unknown as Option)
      expect(res).toBeInstanceOf(Error)
      expect(res?.message).toBe('Option must have a text')
    })

    test('valid data returns null', () => {
      const res = store.validateOption({ text: 'text' })
      expect(res).toBeNull()
    })
  })

  describe('partialToFullData', () => {
    let store: Store

    beforeAll(() => {
      store = new Store('single', [])
    })

    test('empty partial returns empty data array', () => {
      const res = store.partialToFullData([])
      expect(res).toBeInstanceOf(Array)
      expect(res).toHaveLength(0)
    })

    test("invalid data get's ignored", () => {
      const res = store.partialToFullData([
        { error: 'this is invalid' } as unknown as DataObjectPartial,
        { text: 'valid' }
      ])
      expect(res).toBeInstanceOf(Array)
      expect(res).toHaveLength(1)

      expect(res[0]).toBeInstanceOf(Option)

      const option = res[0] as Option
      expect(option.text).toBe('valid')
    })

    test('valid data gets filled correctly', () => {
      const res = store.partialToFullData([
        {
          label: 'opt group',
          options: [{ text: 'opt 1' }, { text: 'opt 2' }]
        },
        {
          text: 'opt 3'
        }
      ])

      expect(res).toHaveLength(2)
      expect(res[0]).toBeInstanceOf(Optgroup)

      const optGroup = res[0] as Optgroup
      expect(optGroup.label).toBe('opt group')
      expect(optGroup.options).toHaveLength(2)
      expect(optGroup.options[0]).toBeInstanceOf(Option)
      expect(optGroup.options[0].text).toBe('opt 1')
      expect(optGroup.options[1]).toBeInstanceOf(Option)
      expect(optGroup.options[1].text).toBe('opt 2')
    })
  })

  describe('setData', () => {
    let store: Store

    beforeEach(() => {
      store = new Store('single', [
        {
          text: 'initial option'
        },
        {
          text: 'initial selected option',
          selected: true
        }
      ])
    })

    test('invalid data does override existing data', () => {
      store.setData([{ invalid: true } as unknown as Option])

      const data = store.getData()
      expect(data).toHaveLength(0)
    })

    test('valid data overrides existing data', () => {
      store.setData([
        {
          text: 'opt 1'
        },
        {
          text: 'opt 2'
        },
        {
          text: 'opt 3'
        }
      ])

      const data = store.getData() as Array<Option>
      expect(data).toHaveLength(3)
      expect(data[0].text).toBe('opt 1')
      expect(data[1].text).toBe('opt 2')
      expect(data[2].text).toBe('opt 3')
    })

    test('valid data on single select automatically selects first option', () => {
      store.setData([
        {
          text: 'opt 1'
        },
        {
          text: 'opt 2'
        }
      ])

      const data = store.getData() as Array<Option>
      expect(data).toHaveLength(2)
      expect(data[0].selected).toBe(true)
    })

    test('valid data on single select selects correct option', () => {
      store.setData([
        {
          text: 'opt 1'
        },
        {
          text: 'opt 2',
          selected: true
        }
      ])

      const data = store.getData() as Array<Option>
      expect(data).toHaveLength(2)
      expect(data[1].text).toBe('opt 2')
      expect(data[1].selected).toBe(true)
    })
  })

  describe('getData', () => {
    test('getData gets all options', () => {
      const data = [
        {
          label: 'group test',
          options: [
            {
              text: 'sub opt 1'
            },
            {
              text: 'sub opt 2'
            }
          ]
        },
        {
          text: 'test1'
        },
        {
          text: 'test2',
          value: 'test2'
        },
        {
          text: 'test3'
        }
      ]

      const flatData = [
        {
          text: 'sub opt 1'
        },
        {
          text: 'sub opt 2'
        },
        {
          text: 'test1'
        },
        {
          text: 'test2',
          value: 'test2'
        },
        {
          text: 'test3'
        }
      ]

      const store = new Store('single', data)

      const storedData = store.getData()
      storedData.forEach((dataObject, index) => {
        if ('label' in dataObject) {
          expect(dataObject.label).toBe(data[index].label)
          dataObject.options.forEach((subOpt, subIndex) => {
            expect(subOpt.text).toBe(data[index].options![subIndex].text)
            expect(subOpt.value).toBe(data[index].options![subIndex].text)
          })
        } else {
          expect(dataObject.text).toBe(data[index].text)
          expect(dataObject.value).toBe(data[index].text)
        }
      })

      // test flat array directly
      const storedDataOptions = store.getDataOptions()
      storedDataOptions.forEach((option, index) => {
        expect(option.text).toBe(flatData[index].text)
        expect(option.value).toBe(flatData[index].text)
      })
    })
  })

  describe('getDataOptions', () => {
    test('options only store returns same structure', () => {
      const store = new Store('single', [
        {
          text: 'opt 0'
        },
        {
          text: 'opt 1'
        }
      ])

      const data = store.getDataOptions()
      expect(data).toHaveLength(2)
      data.forEach((option, index) => {
        expect(option).toBeInstanceOf(Option)
        expect(option.text).toBe(`opt ${index}`)
      })
    })

    test('option group gets flattened', () => {
      const store = new Store('single', [
        {
          label: 'opt group',
          options: [
            {
              text: 'opt 0'
            },
            {
              text: 'opt 1'
            }
          ]
        },
        {
          text: 'opt 2'
        },
        {
          text: 'opt 3'
        }
      ])

      const data = store.getDataOptions()
      expect(data).toHaveLength(4)
      data.forEach((option, index) => {
        expect(option).toBeInstanceOf(Option)
        expect(option.text).toBe(`opt ${index}`)
      })
    })
  })

  describe('addOption', () => {
    test('append option', () => {
      const store = new Store('single', [
        {
          text: 'test1'
        }
      ])

      store.addOption({ text: 'test2' })

      const storeData = store.getDataOptions()
      expect(storeData).toHaveLength(2)
      expect(storeData[0].text).toBe('test1')
      expect(storeData[1].text).toBe('test2')
    })
  })

  describe('setSelectedBy', () => {
    let store: Store

    beforeEach(() => {
      store = new Store('single', [
        {
          text: 'opt 1'
        },
        {
          id: '12345678',
          text: 'id opt'
        },
        {
          text: 'opt 2'
        },
        {
          text: 'opt 3'
        }
      ])
    })

    test('set selected by ID', () => {
      store.setSelectedBy('id', ['12345678'])
      const data = store.getDataOptions()

      expect(data[0].text).toBe('opt 1')
      expect(data[0].selected).toBe(false)

      expect(data[1].text).toBe('id opt')
      expect(data[1].selected).toBe(true)
    })

    test('set selected by value', () => {
      store.setSelectedBy('value', ['opt 3'])

      const data = store.getDataOptions()

      expect(data[0].text).toBe('opt 1')
      expect(data[0].selected).toBe(false)

      expect(data[3].text).toBe('opt 3')
      expect(data[3].selected).toBe(true)
    })

    test('set selected to empty string selects first option', () => {
      const store = new Store('single', [
        {
          text: 'all',
          value: ''
        },
        {
          text: 'Value 1',
          value: '1',
          selected: true
        }
      ])
      store.setSelectedBy('value', [''])

      const data = store.getDataOptions()

      expect(data[0].text).toBe('all')
      expect(data[0].selected).toBe(true)
      expect(data[1].selected).toBe(false)
    })

    test('set multiple selected by value on single select only selects the first element', () => {
      store.setSelectedBy('value', ['opt 2', 'opt 3'])

      const data = store.getDataOptions()

      expect(data[2].selected).toBe(true)
      expect(data[3].selected).toBe(false)
    })
  })

  describe('getSelected', () => {
    test('get correct value when one option is selected', () => {
      const store = new Store('single', [
        {
          text: 'opt 0'
        },
        {
          text: 'opt 1'
        }
      ])

      const selected = store.getSelectedValues()
      expect(selected).toHaveLength(1)
      expect(selected[0]).toBe('opt 0')
    })

    test('get correct value when two options is selected', () => {
      const store = new Store('multiple', [
        {
          text: 'opt 0'
        },
        {
          text: 'opt 1',
          selected: true
        },
        {
          text: 'opt 2',
          selected: true
        }
      ])

      const selected = store.getSelectedValues()
      expect(selected).toHaveLength(2)

      expect(selected[0]).toBe('opt 1')
      expect(selected[1]).toBe('opt 2')
    })

    test('get correct order when using reorder options', () => {
      const store = new Store('multiple', [
        {
          text: 'opt 0'
        },
        {
          text: 'opt 1'
        },
        {
          text: 'opt 2'
        }
      ])

      store.setSelectedBy('value', ['opt 2', 'opt 0'])

      let selected = store.getSelectedOptions()
      selected = store.selectedOrderOptions(selected)
      expect(selected.map((opt) => opt.text)).toEqual(['opt 2', 'opt 0'])
    })
  })

  describe('getSelectedOptions', () => {
    test('get correct value when one option is selected', () => {
      const store = new Store('single', [
        {
          text: 'opt 0'
        },
        {
          text: 'opt 1'
        }
      ])

      const selected = store.getSelectedOptions()
      expect(selected).toHaveLength(1)
      expect(selected[0].text).toBe('opt 0')
    })

    test('get correct value when two options is selected', () => {
      const store = new Store('multiple', [
        {
          text: 'opt 0'
        },
        {
          text: 'opt 1',
          selected: true
        },
        {
          text: 'opt 2',
          selected: true
        }
      ])

      const selected = store.getSelectedOptions()
      expect(selected).toHaveLength(2)
      expect(selected[0].text).toBe('opt 1')
      expect(selected[1].text).toBe('opt 2')
    })
  })

  describe('getOptionByID', () => {
    let store: Store

    beforeAll(() => {
      store = new Store('single', [
        {
          text: 'opt 1'
        },
        {
          id: '12345678',
          text: 'id opt'
        },
        {
          text: 'opt 2'
        },
        {
          text: 'opt 3'
        }
      ])
    })

    test('invalid id gets null as result', () => {
      const res = store.getOptionByID('0000')
      expect(res).toBeNull()
    })

    test('valid id gets correct result', () => {
      const res = store.getOptionByID('12345678')
      expect(res).toBeInstanceOf(Option)
      expect((res as Option).text).toBe('id opt')
    })
  })

  describe('getSelectType', () => {
    test('get correct type on single select', () => {
      const store = new Store('single', [])
      expect(store.getSelectType()).toBe('single')
    })

    test('get correct type on multiple select', () => {
      const store = new Store('multiple', [])
      expect(store.getSelectType()).toBe('multiple')
    })
  })

  describe('getFirstOption', () => {
    test('getFirstOption returns first option', () => {
      const flatStore = new Store('single', [
        {
          text: 'test0'
        },
        {
          text: 'test1'
        }
      ])

      expect(flatStore.getFirstOption()?.text).toBe('test0')

      const store = new Store('single', [
        {
          label: 'group0',
          options: [
            {
              text: 'test0'
            },
            {
              text: 'test1'
            }
          ]
        },
        {
          text: 'test2'
        }
      ])

      expect(store.getFirstOption()?.text).toBe('test0')
    })
  })

  describe('search', () => {
    test('search with term returns correct option', () => {
      const store = new Store('single', [
        {
          text: 'test1'
        },
        {
          text: 'test2',
          value: 'test2'
        },
        {
          text: 'test3'
        }
      ])

      const searchFilter = (opt: Option, search: string): boolean => {
        return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
      }

      // With searchFilter search against current store data set
      const searchResults = store.search('test2', searchFilter)
      expect(searchResults).toHaveLength(1)
      expect((searchResults[0] as Option).value).toBe('test2')
    })

    test('empty search term returns all options', () => {
      const store = new Store('single', [
        {
          text: 'test1'
        },
        {
          text: 'test2',
          value: 'test2'
        },
        {
          text: 'test3'
        }
      ])

      const searchFilter = (opt: Option, search: string): boolean => {
        return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
      }

      // Test empty search term
      const searchResults = store.search('', searchFilter)
      expect(searchResults).toHaveLength(3)
    })
  })

  describe('filter', () => {
    let store: Store

    beforeAll(() => {
      store = new Store('single', [
        {
          label: 'group 0',
          options: [
            {
              text: 'opt 0',
              class: 'filter-me'
            },
            {
              text: 'opt 1'
            }
          ]
        },
        {
          text: 'opt 2',
          class: 'filter-me'
        }
      ])
    })

    test('empty filter function returns all options (with opt group)', () => {
      const res = store.filter(null, true)
      expect(res).toHaveLength(2)
      expect(res[0]).toBeInstanceOf(Optgroup)
      expect((res[0] as Optgroup).label).toBe('group 0')
      expect((res[0] as Optgroup).options).toHaveLength(2)
      expect(res[1]).toBeInstanceOf(Option)
    })

    test('empty filter function returns all options without optgroups flattens results', () => {
      const res = store.filter(null, false)
      expect(res).toHaveLength(3)
      expect(res[0]).toBeInstanceOf(Option)
      expect((res[0] as Option).text).toBe('opt 0')
      expect(res[1]).toBeInstanceOf(Option)
      expect((res[1] as Option).text).toBe('opt 1')
      expect(res[2]).toBeInstanceOf(Option)
      expect((res[2] as Option).text).toBe('opt 2')
    })

    test('filter function filters results accordingly', () => {
      const res = store.filter((o) => o.class === 'filter-me', false)
      expect(res).toHaveLength(2)
      expect(res[0]).toBeInstanceOf(Option)
      expect((res[0] as Option).text).toBe('opt 0')
      expect(res[1]).toBeInstanceOf(Option)
      expect((res[1] as Option).text).toBe('opt 2')
    })
  })
})
