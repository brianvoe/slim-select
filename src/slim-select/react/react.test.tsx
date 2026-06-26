import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest'
import { render, cleanup, act, waitFor } from '@testing-library/react'
import React, { useState, useEffect, useRef, createRef } from 'react'
import SlimSelect, { Option } from '../index'
import SlimSelectReact, { SlimSelectRef } from './react'

const EMPTY_DATA: { value: string; text: string }[] = []

const BASIC_DATA = [
  { value: '1', text: 'Option 1' },
  { value: '2', text: 'Option 2' },
  { value: '3', text: 'Option 3' }
]

async function expectSlimSelect(
  ref: React.RefObject<SlimSelectRef | null>
): Promise<SlimSelect> {
  await waitFor(() => {
    expect(ref.current?.slimSelect).toBeInstanceOf(SlimSelect)
  })
  return ref.current!.slimSelect!
}

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
      const { container } = render(<SlimSelectReact data={EMPTY_DATA} />)
      const select = container.querySelector('select')
      expect(select).toBeTruthy()
    })

    test('renders with single select by default', () => {
      const { container } = render(<SlimSelectReact data={EMPTY_DATA} />)
      const select = container.querySelector('select')
      expect(select?.hasAttribute('multiple')).toBe(false)
    })

    test('renders with multiple attribute when multiple prop is true', () => {
      const { container } = render(
        <SlimSelectReact data={EMPTY_DATA} multiple />
      )
      const select = container.querySelector('select')
      expect(select?.hasAttribute('multiple')).toBe(true)
    })
  })

  describe('Value and onChange binding', () => {
    test('accepts initial value for single select', async () => {
      const ref = createRef<SlimSelectRef>()

      const TestComponent = () => {
        const [value, setValue] = useState('2')

        return (
          <SlimSelectReact
            ref={ref}
            value={value}
            onChange={(val) => setValue(val as string)}
            data={BASIC_DATA}
          />
        )
      }

      render(<TestComponent />)
      const slim = await expectSlimSelect(ref)
      expect(slim.getSelected()[0]).toBe('2')
    })

    test('accepts initial value for multiple select', async () => {
      const ref = createRef<SlimSelectRef>()

      const TestComponent = () => {
        const [value, setValue] = useState(['2', '3'])
        return (
          <SlimSelectReact
            ref={ref}
            value={value}
            onChange={(val) => setValue(val as string[])}
            multiple
            data={BASIC_DATA}
          />
        )
      }

      render(<TestComponent />)
      const slim = await expectSlimSelect(ref)
      expect(slim.getSelected()).toEqual(['2', '3'])
    })

    test('calls onChange when selection changes', async () => {
      const onChangeMock = vi.fn()
      const ref = createRef<SlimSelectRef>()

      render(
        <SlimSelectReact
          ref={ref}
          value="1"
          onChange={onChangeMock}
          data={[
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ]}
        />
      )

      const slim = await expectSlimSelect(ref)
      await act(async () => {
        slim.setSelected('2')
      })

      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalledWith('2')
      })
    })

    test('calls the latest onChange after parent re-renders', async () => {
      const firstHandler = vi.fn()
      const secondHandler = vi.fn()
      const ref = createRef<SlimSelectRef>()

      const { rerender } = render(
        <SlimSelectReact
          ref={ref}
          value="1"
          onChange={firstHandler}
          data={[
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ]}
        />
      )

      const slim = await expectSlimSelect(ref)

      rerender(
        <SlimSelectReact
          ref={ref}
          value="1"
          onChange={secondHandler}
          data={[
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ]}
        />
      )

      await act(async () => {
        slim.setSelected('2')
      })

      await waitFor(() => {
        expect(secondHandler).toHaveBeenCalledWith('2')
        expect(firstHandler).not.toHaveBeenCalled()
      })
    })

    test('updates selection when value prop changes', async () => {
      const ref = createRef<SlimSelectRef>()

      const TestComponent = ({ initialValue }: { initialValue: string }) => {
        const [value, setValue] = useState(initialValue)

        useEffect(() => {
          const timer = setTimeout(() => {
            act(() => {
              setValue('2')
            })
          }, 100)
          return () => clearTimeout(timer)
        }, [])

        return (
          <SlimSelectReact
            ref={ref}
            value={value}
            onChange={(val) => setValue(val as string)}
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' }
            ]}
          />
        )
      }

      render(<TestComponent initialValue="1" />)
      const slim = await expectSlimSelect(ref)

      await waitFor(
        () => {
          expect(slim.getSelected()[0]).toBe('2')
        },
        { timeout: 500 }
      )
    })

    test('exposes slimSelect via ref after mount', async () => {
      const ref = createRef<SlimSelectRef>()

      render(<SlimSelectReact ref={ref} data={BASIC_DATA} />)

      const slim = await expectSlimSelect(ref)
      expect(slim).toBeInstanceOf(SlimSelect)
    })
  })

  describe('Data Prop', () => {
    test('initializes with data prop', async () => {
      const ref = createRef<SlimSelectRef>()
      render(<SlimSelectReact ref={ref} data={BASIC_DATA} />)

      const slim = await expectSlimSelect(ref)
      expect(slim.getData()).toHaveLength(3)
    })

    test('updates data when data prop changes', async () => {
      const ref = createRef<SlimSelectRef>()

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

        return <SlimSelectReact ref={ref} data={data} />
      }

      render(<TestComponent />)
      const slim = await expectSlimSelect(ref)

      await waitFor(
        () => {
          expect(slim.getData()).toHaveLength(3)
        },
        { timeout: 500 }
      )
    })

    test('skips setData when data prop is recreated with identical structure', async () => {
      let slimSelect: SlimSelect | null = null

      const TestComponent = () => {
        const ref = useRef<SlimSelectRef>(null)
        const [tick, setTick] = useState(0)
        const data = [
          { value: '1', text: 'Option 1' },
          { value: '2', text: 'Option 2' }
        ]

        useEffect(() => {
          slimSelect = ref.current?.slimSelect ?? null
          if (tick === 0) {
            setTick(1)
          }
        }, [tick])

        return <SlimSelectReact ref={ref} data={data} />
      }

      render(<TestComponent />)

      await waitFor(() => {
        expect(slimSelect).toBeTruthy()
      })

      const setDataSpy = vi.spyOn(slimSelect!, 'setData')
      setDataSpy.mockClear()

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50))
      })

      expect(setDataSpy).not.toHaveBeenCalled()
    })

    test('re-syncs value selection after data prop changes', async () => {
      const ref = createRef<SlimSelectRef>()

      const TestComponent = () => {
        const [data, setData] = useState([
          { value: 'a', text: 'A' },
          { value: 'b', text: 'B' }
        ])

        useEffect(() => {
          const timer = setTimeout(() => {
            act(() => {
              setData([
                { value: 'b', text: 'B updated' },
                { value: 'c', text: 'C' }
              ])
            })
          }, 100)
          return () => clearTimeout(timer)
        }, [])

        return (
          <SlimSelectReact
            ref={ref}
            value="b"
            onChange={() => {}}
            data={data}
          />
        )
      }

      render(<TestComponent />)
      const slim = await expectSlimSelect(ref)

      await waitFor(
        () => {
          expect(slim.getSelected()).toEqual(['b'])
        },
        { timeout: 500 }
      )
    })
  })

  describe('Settings Prop', () => {
    test('applies settings prop', async () => {
      const ref = createRef<SlimSelectRef>()

      render(
        <SlimSelectReact
          ref={ref}
          data={[{ value: '1', text: 'Option 1' }]}
          settings={{
            showSearch: false,
            placeholderText: 'Custom Placeholder'
          }}
        />
      )

      const slim = await expectSlimSelect(ref)
      expect(slim.settings.showSearch).toBe(false)
      expect(slim.settings.placeholderText).toBe('Custom Placeholder')
    })
  })

  describe('Events Prop', () => {
    test('calls afterChange event from events prop', async () => {
      const afterChangeMock = vi.fn()
      const ref = createRef<SlimSelectRef>()

      render(
        <SlimSelectReact
          ref={ref}
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

      const slim = await expectSlimSelect(ref)
      slim.setSelected('2')
      await waitFor(() => {
        expect(afterChangeMock).toHaveBeenCalled()
      })
    })

    test('calls both custom afterChange and onChange', async () => {
      const afterChangeMock = vi.fn()
      const onChangeMock = vi.fn()
      const ref = createRef<SlimSelectRef>()

      render(
        <SlimSelectReact
          ref={ref}
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

      const slim = await expectSlimSelect(ref)
      slim.setSelected('2')

      await waitFor(() => {
        expect(afterChangeMock).toHaveBeenCalled()
        expect(onChangeMock).toHaveBeenCalledWith('2')
      })
    })

    test('calls the latest events.afterChange after parent re-renders', async () => {
      const firstHandler = vi.fn()
      const secondHandler = vi.fn()
      const ref = createRef<SlimSelectRef>()

      const { rerender } = render(
        <SlimSelectReact
          ref={ref}
          value="1"
          data={[
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ]}
          events={{ afterChange: firstHandler }}
        />
      )

      const slim = await expectSlimSelect(ref)

      rerender(
        <SlimSelectReact
          ref={ref}
          value="1"
          data={[
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ]}
          events={{ afterChange: secondHandler }}
        />
      )

      slim.setSelected('2')

      await waitFor(() => {
        expect(secondHandler).toHaveBeenCalled()
        expect(firstHandler).not.toHaveBeenCalled()
      })
    })
  })

  describe('Empty and Invalid Values', () => {
    test('handles empty string as value for single select', async () => {
      const ref = createRef<SlimSelectRef>()

      const TestComponent = () => {
        const [value, setValue] = useState('')
        return (
          <SlimSelectReact
            ref={ref}
            value={value}
            onChange={(val) => setValue(val as string)}
            data={[
              { value: '1', text: 'Option 1' },
              { value: '2', text: 'Option 2' }
            ]}
          />
        )
      }

      render(<TestComponent />)
      const slim = await expectSlimSelect(ref)

      const data = slim.getData()
      const hasPlaceholder = (data as Option[]).some(
        (opt: any) => opt.placeholder
      )
      expect(hasPlaceholder).toBe(true)

      const selectedValues = slim.getSelected()
      expect(selectedValues).toEqual([''])

      const hasValidOptionSelected = selectedValues.some(
        (val) => val !== '' && ['1', '2'].includes(val)
      )
      expect(hasValidOptionSelected).toBe(false)
    })

    test('shows placeholder when value does not exist in options for single select', async () => {
      const ref = createRef<SlimSelectRef>()

      const TestComponent = () => {
        const [value, setValue] = useState('banana')
        return (
          <SlimSelectReact
            ref={ref}
            value={value}
            onChange={(val) => setValue(val as string)}
            data={BASIC_DATA}
          />
        )
      }

      const { container } = render(<TestComponent />)
      const slim = await expectSlimSelect(ref)

      const data = slim.getData()
      const hasPlaceholder = (data as Option[]).some(
        (opt: any) => opt.placeholder
      )
      expect(hasPlaceholder).toBe(true)

      const slimMain = container.querySelector('.ss-main') as HTMLElement
      expect(slimMain).toBeDefined()

      const selectedOptions = (slim as any).store.getSelectedOptions()
      const hasPlaceholderSelected = selectedOptions.some(
        (opt: any) => opt.placeholder && opt.selected
      )
      const hasValidOptionSelected = selectedOptions.some(
        (opt: any) =>
          opt.selected &&
          !opt.placeholder &&
          ['1', '2', '3'].includes(opt.value)
      )

      expect(hasPlaceholderSelected).toBe(true)
      expect(hasValidOptionSelected).toBe(false)
    })

    test('handles empty array as value for multiple select', async () => {
      const ref = createRef<SlimSelectRef>()

      const TestComponent = () => {
        const [value, setValue] = useState([] as string[])
        return (
          <SlimSelectReact
            ref={ref}
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
      await expectSlimSelect(ref)
      expect(container.querySelector('select')).toBeTruthy()
    })

    test('updates onChange for multiple select when invalid values are provided', async () => {
      const onChangeMock = vi.fn()
      const ref = createRef<SlimSelectRef>()

      render(
        <SlimSelectReact
          ref={ref}
          value={['banana', 'apple']}
          onChange={onChangeMock}
          multiple
          data={BASIC_DATA}
        />
      )

      const slim = await expectSlimSelect(ref)
      slim.setSelected(['1', '2'])

      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalledWith(['1', '2'])
      })
    })
  })
})
