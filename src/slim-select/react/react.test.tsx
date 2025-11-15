import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest'
import { render, cleanup, act, waitFor } from '@testing-library/react'
import { useState, useEffect, useRef } from 'react'
import SlimSelect, { Option } from '../index'
import SlimSelectReact, { SlimSelectRef } from './react'

describe('SlimSelect React Component', () => {
  let consoleInfoSpy: any
  let consoleWarnSpy: any

  beforeEach(() => {
    // Mock console methods
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
    // Restore console methods
    consoleInfoSpy.mockRestore()
    consoleWarnSpy.mockRestore()
  })

  describe('Basic Rendering', () => {
    test('renders a select element', () => {
      const { container } = render(<SlimSelectReact />)
      const select = container.querySelector('select')
      expect(select).toBeTruthy()
    })

    test('renders with single select by default', () => {
      const { container } = render(<SlimSelectReact />)
      const select = container.querySelector('select')
      expect(select?.hasAttribute('multiple')).toBe(false)
    })

    test('renders with multiple attribute when multiple prop is true', () => {
      const { container } = render(<SlimSelectReact multiple />)
      const select = container.querySelector('select')
      expect(select?.hasAttribute('multiple')).toBe(true)
    })
  })

  describe('Value and onChange binding', () => {
    test('accepts initial value for single select', async () => {
      const TestComponent = () => {
        const [value, setValue] = useState('2')
        const ref = useRef<SlimSelectRef>(null)

        return (
          <SlimSelectReact
            ref={ref}
            value={value}
            onChange={(val) => setValue(val as string)}
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' },
              { value: '3', text: 'Option 3' }
            ]}
          />
        )
      }

      const { container } = render(<TestComponent />)

      await waitFor(
        () => {
          const select = container.querySelector('select')
          const slimInstance = (select as any)?._slimSelect as SlimSelect
          if (slimInstance) {
            const selected = slimInstance.getSelected()
            expect(selected[0]).toBe('2')
          }
        },
        { timeout: 500 }
      )
    })

    test('accepts initial value for multiple select', async () => {
      const TestComponent = () => {
        const [value, setValue] = useState(['2', '3'])
        return (
          <SlimSelectReact
            value={value}
            onChange={(val) => setValue(val as string[])}
            multiple
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' },
              { value: '3', text: 'Option 3' }
            ]}
          />
        )
      }

      const { container } = render(<TestComponent />)

      await waitFor(
        () => {
          const select = container.querySelector('select')
          const slimInstance = (select as any)?._slimSelect as SlimSelect
          if (slimInstance) {
            const selected = slimInstance.getSelected()
            expect(selected).toEqual(['2', '3'])
          }
        },
        { timeout: 500 }
      )
    })

    test('calls onChange when selection changes', async () => {
      const onChangeMock = vi.fn()
      const TestComponent = () => {
        return (
          <SlimSelectReact
            value="1"
            onChange={onChangeMock}
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' }
            ]}
          />
        )
      }

      const { container } = render(<TestComponent />)

      await waitFor(
        async () => {
          const select = container.querySelector('select')
          const slimInstance = (select as any)?._slimSelect as SlimSelect
          if (slimInstance) {
            await act(async () => {
              slimInstance.setSelected('2')
            })
            await waitFor(
              () => {
                expect(onChangeMock).toHaveBeenCalledWith('2')
              },
              { timeout: 500 }
            )
          }
        },
        { timeout: 500 }
      )
    })

    test('updates selection when value prop changes', async () => {
      const TestComponent = ({ initialValue }: { initialValue: string }) => {
        const [value, setValue] = useState(initialValue)

        useEffect(() => {
          // Simulate parent updating value
          const timer = setTimeout(() => {
            act(() => {
              setValue('2')
            })
          }, 100)
          return () => clearTimeout(timer)
        }, [])

        return (
          <SlimSelectReact
            value={value}
            onChange={(val) => setValue(val as string)}
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' }
            ]}
          />
        )
      }

      const { container } = render(<TestComponent initialValue="1" />)

      await waitFor(
        () => {
          const select = container.querySelector('select')
          const slimInstance = (select as any)?._slimSelect as SlimSelect
          if (slimInstance) {
            const selected = slimInstance.getSelected()
            expect(selected[0]).toBe('2')
          }
        },
        { timeout: 500 }
      )
    })
  })

  describe('Data Prop', () => {
    test('initializes with data prop', async () => {
      const testData = [
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' }
      ]

      const { container } = render(<SlimSelectReact data={testData} />)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const select = container.querySelector('select')
      const slimInstance = (select as any)?._slimSelect as SlimSelect
      if (slimInstance) {
        const data = slimInstance.getData()
        expect(data).toHaveLength(3)
      }
    })

    test('updates data when data prop changes', async () => {
      const TestComponent = () => {
        const [data, setData] = useState([
          { value: '1', text: 'Option 1' },
          { value: '2', text: 'Option 2' }
        ])

        useEffect(() => {
          const timer = setTimeout(() => {
            act(() => {
              setData([
                { value: '3', text: 'Option 3' },
                { value: '4', text: 'Option 4' },
                { value: '5', text: 'Option 5' }
              ])
            })
          }, 100)
          return () => clearTimeout(timer)
        }, [])

        return <SlimSelectReact data={data} />
      }

      const { container } = render(<TestComponent />)

      await waitFor(
        () => {
          const select = container.querySelector('select')
          const slimInstance = (select as any)?._slimSelect as SlimSelect
          if (slimInstance) {
            const data = slimInstance.getData()
            expect(data).toHaveLength(3)
          }
        },
        { timeout: 500 }
      )
    })
  })

  describe('Settings Prop', () => {
    test('applies settings prop', async () => {
      const { container } = render(
        <SlimSelectReact
          data={[{ value: '1', text: 'Option 1' }]}
          settings={{
            showSearch: false,
            placeholderText: 'Custom Placeholder'
          }}
        />
      )
      await new Promise((resolve) => setTimeout(resolve, 100))

      const select = container.querySelector('select')
      const slimInstance = (select as any)?._slimSelect as SlimSelect
      if (slimInstance) {
        expect(slimInstance.settings.showSearch).toBe(false)
        expect(slimInstance.settings.placeholderText).toBe('Custom Placeholder')
      }
    })
  })

  describe('Events Prop', () => {
    test('calls afterChange event from events prop', async () => {
      const afterChangeMock = vi.fn()

      const TestComponent = () => {
        return (
          <SlimSelectReact
            value="1"
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' }
            ]}
            events={{
              afterChange: afterChangeMock
            }}
          />
        )
      }

      const { container } = render(<TestComponent />)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const select = container.querySelector('select')
      const slimInstance = (select as any)?._slimSelect as SlimSelect
      if (slimInstance) {
        slimInstance.setSelected('2')
        await new Promise((resolve) => setTimeout(resolve, 100))
        expect(afterChangeMock).toHaveBeenCalled()
      }
    })

    test('calls both custom afterChange and onChange', async () => {
      const afterChangeMock = vi.fn()
      const onChangeMock = vi.fn()

      const TestComponent = () => {
        return (
          <SlimSelectReact
            value="1"
            onChange={onChangeMock}
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' }
            ]}
            events={{
              afterChange: afterChangeMock
            }}
          />
        )
      }

      const { container } = render(<TestComponent />)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const select = container.querySelector('select')
      const slimInstance = (select as any)?._slimSelect as SlimSelect
      if (slimInstance) {
        slimInstance.setSelected('2')
        await new Promise((resolve) => setTimeout(resolve, 100))
        expect(afterChangeMock).toHaveBeenCalled()
        expect(onChangeMock).toHaveBeenCalledWith('2')
      }
    })
  })

  describe('Empty and Invalid Values', () => {
    test('handles empty string as value for single select', async () => {
      const TestComponent = () => {
        const [value, setValue] = useState('')
        return (
          <SlimSelectReact
            value={value}
            onChange={(val) => setValue(val as string)}
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' }
            ]}
          />
        )
      }

      const { container } = render(<TestComponent />)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const select = container.querySelector('select')
      const slimInstance = (select as any)?._slimSelect as SlimSelect
      if (slimInstance) {
        // Verify placeholder exists in data
        const data = slimInstance.getData()
        const hasPlaceholder = (data as Option[]).some((opt: any) => opt.placeholder)
        expect(hasPlaceholder).toBe(true)

        // CRITICAL: Verify what's actually selected - should be empty string (placeholder)
        const selectedValues = slimInstance.getSelected()
        expect(selectedValues).toEqual([''])

        // Verify no valid option is selected
        const hasValidOptionSelected = selectedValues.some((val) => val !== '' && ['1', '2'].includes(val))
        expect(hasValidOptionSelected).toBe(false)
      }
    })

    test('shows placeholder when value does not exist in options for single select', async () => {
      const TestComponent = () => {
        const [value, setValue] = useState('banana')
        return (
          <SlimSelectReact
            value={value}
            onChange={(val) => setValue(val as string)}
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' },
              { value: '3', text: 'Option 3' }
            ]}
          />
        )
      }

      const { container } = render(<TestComponent />)
      await waitFor(
        () => {
          const select = container.querySelector('select')
          const slimInstance = (select as any)?._slimSelect as SlimSelect
          if (slimInstance) {
            // Verify placeholder exists in data (with empty value, not 'banana')
            const data = slimInstance.getData()
            const hasPlaceholder = (data as Option[]).some((opt: any) => opt.placeholder)
            expect(hasPlaceholder).toBe(true)

            // CRITICAL: Check what's actually displayed in the SlimSelect UI
            // SlimSelect renders a custom UI - check the .ss-single or .ss-placeholder element
            const slimMain = container.querySelector('.ss-main') as HTMLElement
            expect(slimMain).toBeDefined()

            // Check what's in the .ss-values container
            const ssValues = slimMain?.querySelector('.ss-values') as HTMLElement
            expect(ssValues).toBeDefined()

            // If placeholder is selected, it should show placeholder (no .ss-single element)
            // If a real option is selected, it will show .ss-single with the option text
            const singleValue = ssValues?.querySelector('.ss-single') as HTMLElement
            const placeholderEl = ssValues?.querySelector('.ss-placeholder') as HTMLElement

            // CRITICAL: If placeholder is correctly selected, we should NOT see .ss-single with "Option 1"
            // Instead, we should either see placeholder OR empty (if placeholder text is empty)
            if (singleValue) {
              const displayedText = singleValue.textContent?.trim() || ''
              // This should NOT be showing a real option
              expect(displayedText).not.toBe('Option 1')
              expect(displayedText).not.toBe('Option 2')
              expect(displayedText).not.toBe('Option 3')

              // If it's showing something, it might be the placeholder (empty text is OK)
              // But we should verify the placeholder option is actually selected in the store
            }

            // Check the store to see what's actually selected
            const selectedOptions = (slimInstance as any).store.getSelectedOptions()
            const hasPlaceholderSelected = selectedOptions.some((opt: any) => opt.placeholder && opt.selected)
            const hasValidOptionSelected = selectedOptions.some(
              (opt: any) => opt.selected && !opt.placeholder && ['1', '2', '3'].includes(opt.value)
            )

            // The placeholder should be selected, not a valid option
            expect(hasPlaceholderSelected).toBe(true)
            expect(hasValidOptionSelected).toBe(false)
          }
        },
        { timeout: 500 }
      )
    })

    test('handles empty array as value for multiple select', async () => {
      const TestComponent = () => {
        const [value, setValue] = useState([] as string[])
        return (
          <SlimSelectReact
            value={value}
            onChange={(val) => setValue(val as string[])}
            multiple
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' }
            ]}
          />
        )
      }

      const { container } = render(<TestComponent />)
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Should not throw errors
      expect(container.querySelector('select')).toBeTruthy()
    })

    test('updates onChange for multiple select when invalid values are provided', async () => {
      const onChangeMock = vi.fn()

      const TestComponent = () => {
        return (
          <SlimSelectReact
            value={['banana', 'apple']}
            onChange={onChangeMock}
            multiple
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' },
              { value: '3', text: 'Option 3' }
            ]}
          />
        )
      }

      const { container } = render(<TestComponent />)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const select = container.querySelector('select')
      const slimInstance = (select as any)?._slimSelect as SlimSelect
      if (slimInstance) {
        // When user manually selects valid options, onChange should update
        slimInstance.setSelected(['1', '2'])
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Verify onChange has been called with the valid values
        expect(onChangeMock).toHaveBeenCalledWith(['1', '2'])
      }
    })
  })
})
