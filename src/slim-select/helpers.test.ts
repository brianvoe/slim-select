'use strict'

import { describe, expect, test, vi } from 'vitest'
import { hasClassInTree, debounce, isEqual, kebabCase, dataStructureEqual, selectedIdsEqual } from './helpers'
import { Optgroup, Option } from './store'

describe('helpers module', () => {
  describe('hasClassInTree', () => {
    test('single element does not have class', () => {
      const element = document.createElement('div')
      element.className = 'invalid-class'

      expect(hasClassInTree(element, 'test-class')).toBeNull()
    })

    test('single element has class', () => {
      const element = document.createElement('div')
      element.className = 'test-class'

      expect(hasClassInTree(element, 'test-class')).toBe(element)

      element.classList.add('class-2', 'class-3')
      expect(hasClassInTree(element, 'test-class')).toBe(element)
    })

    test('single element has class as data id', () => {
      const element = document.createElement('div')
      element.dataset.id = 'test-class'

      expect(hasClassInTree(element, 'test-class')).toBe(element)

      element.classList.add('class-2', 'class-3')
      expect(hasClassInTree(element, 'test-class')).toBe(element)
    })

    test('parent element does not have class', () => {
      const element = document.createElement('div')
      element.className = 'invalid-class'
      const child = document.createElement('div')
      element.appendChild(child)

      expect(hasClassInTree(child, 'test-class')).toBeNull()
    })

    test('parent element has class', () => {
      const element = document.createElement('div')
      element.className = 'test-class'
      const child = document.createElement('div')
      element.appendChild(child)

      expect(hasClassInTree(child, 'test-class')).toBe(element)

      element.classList.add('class-2', 'class-3')
      expect(hasClassInTree(child, 'test-class')).toBe(element)
    })

    test('parent element has class as data id', () => {
      const element = document.createElement('div')
      element.dataset.id = 'test-class'

      const child = document.createElement('div')
      element.appendChild(child)

      expect(hasClassInTree(child, 'test-class')).toBe(element)

      element.classList.add('class-2', 'class-3')
      expect(hasClassInTree(child, 'test-class')).toBe(element)
    })
  })

  describe('debounce', () => {
    test('debounce calls function after default timeout', async () => {
      const callback = vi.fn()
      const debounced_function = debounce(callback)
      debounced_function()

      await new Promise((r) => setTimeout(r, 100))

      expect(callback).toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('debounce calls function after higher timeout', async () => {
      const callback = vi.fn()
      const debounced_function = debounce(callback, 100)
      debounced_function()

      await new Promise((r) => setTimeout(r, 50))
      expect(callback).not.toHaveBeenCalled()

      // Wait a bit longer to account for CI timing variations
      await new Promise((r) => setTimeout(r, 100))
      expect(callback).toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('debounce calls function after lower timeout', async () => {
      const callback = vi.fn()
      const debounced_function = debounce(callback, 10)
      debounced_function()

      await new Promise((r) => setTimeout(r, 5))
      expect(callback).not.toHaveBeenCalled()

      // Wait a bit longer to account for CI timing variations
      await new Promise((r) => setTimeout(r, 10))
      expect(callback).toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('debounce respects inmediate setting', () => {
      const callback = vi.fn()
      const debounced_function = debounce(callback, 1000, true)
      debounced_function()

      expect(callback).toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('debounce respects order of calls', async () => {
      const callback = vi.fn(() => {})
      const debounced_function: (a: number) => void = debounce(callback)
      debounced_function(0)
      debounced_function(1)

      await new Promise((r) => setTimeout(r, 50))
      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback.mock.calls[0]).toStrictEqual([1])
    })
  })

  describe('isEqual', () => {
    test('different objects are not equal', () => {
      expect(isEqual({ a: 1 }, { b: 1 })).toBe(false)
    })

    test('equal objects are equal', () => {
      expect(isEqual({ a: 1 }, { a: 1 })).toBe(true)
    })

    test('more complex objects are equal', () => {
      expect(
        isEqual({ a: 1, b: { c: 'asdf' } }, { a: 1, b: { c: 'asdf' } })
      ).toBe(true)
    })
  })

  describe('selectedIdsEqual', () => {
    test('compares sorted ids regardless of order', () => {
      expect(selectedIdsEqual(['b', 'a'], ['a', 'b'])).toBe(true)
      expect(selectedIdsEqual(['a'], ['b'])).toBe(false)
      expect(selectedIdsEqual([], [])).toBe(true)
      expect(selectedIdsEqual(['a'], ['a', 'b'])).toBe(false)
    })
  })

  describe('dataStructureEqual', () => {
    test('compares options and optgroups without JSON.stringify', () => {
      const left = [
        new Option({ id: '1', text: 'One', value: '1', selected: true }),
        new Optgroup({
          id: 'g1',
          label: 'Group',
          options: [{ id: '2', text: 'Two', value: '2', data: { foo: 'bar' } }]
        })
      ]
      const right = [
        { id: '1', text: 'One', value: '1', selected: true },
        {
          id: 'g1',
          label: 'Group',
          options: [{ id: '2', text: 'Two', value: '2', data: { foo: 'bar' } }]
        }
      ]

      expect(dataStructureEqual(left, right)).toBe(true)
      expect(
        dataStructureEqual(left, [
          { id: '1', text: 'One', value: '1', selected: false },
          right[1]
        ])
      ).toBe(false)
      expect(dataStructureEqual(left, left)).toBe(true)
    })

    test('detects length and item type mismatches', () => {
      const options = [{ id: '1', text: 'One', value: '1' }]

      expect(dataStructureEqual(options, options)).toBe(true)
      expect(dataStructureEqual(options, [])).toBe(false)
      expect(
        dataStructureEqual(options, [{ label: 'Group', options: [] }])
      ).toBe(false)
    })

    test('detects option id differences against partial data', () => {
      expect(
        dataStructureEqual(
          [{ id: 'abc', text: 'One', value: '1' }],
          [{ text: 'One', value: '1' }]
        )
      ).toBe(false)
    })

    test('matches isEqual for full option arrays', () => {
      const a = Array.from({ length: 5 }, (_, i) =>
        new Option({
          id: `id-${i}`,
          text: `Option ${i}`,
          value: `value-${i}`,
          selected: i === 0
        })
      )
      const b = a.map((option) => ({ ...option }))

      expect(dataStructureEqual(a, b)).toBe(true)
      expect(isEqual(a, b)).toBe(true)
    })
  })

  describe('kebabCase', () => {
    test('kebab-case string', () => {
      expect(kebabCase('kebab-case')).toBe('kebab-case')
    })

    test('camelCase string', () => {
      expect(kebabCase('camelCase')).toBe('camel-case')
    })

    test('string with initial uppercase', () => {
      expect(kebabCase('UpperCase')).toBe('upper-case')
    })
  })
})
