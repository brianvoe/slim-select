import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick, PropType } from 'vue'
import SlimSelect, { Option, Events } from '@/slim-select'
import SlimSelectVue from './vue.vue'

describe('SlimSelect Vue Component', () => {
  let wrapper: VueWrapper<any>
  let consoleInfoSpy: ReturnType<typeof vi.spyOn>
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // Mock console methods
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    // Restore console methods
    consoleInfoSpy.mockRestore()
    consoleWarnSpy.mockRestore()
  })

  describe('Basic Rendering', () => {
    test('renders a select element', () => {
      wrapper = mount(SlimSelectVue)
      const select = wrapper.find('select')
      expect(select.exists()).toBe(true)
    })

    test('renders with single select by default', () => {
      wrapper = mount(SlimSelectVue)
      const select = wrapper.find('select')
      expect(select.attributes('multiple')).toBeUndefined()
    })

    test('renders with multiple attribute when multiple prop is true', () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          multiple: true
        }
      })
      const select = wrapper.find('select')
      expect(select.attributes('multiple')).toBeDefined()
    })
  })

  describe('Slot Content', () => {
    test('renders slot content', () => {
      wrapper = mount(SlimSelectVue, {
        slots: {
          default: `
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          `
        }
      })

      const options = wrapper.findAll('option')
      expect(options).toHaveLength(2)
      expect(options[0].text()).toBe('Option 1')
      expect(options[1].text()).toBe('Option 2')
    })

    test('shows warning when both slot and data prop are provided', () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          data: [{ value: '1', text: 'Data Option' }]
        },
        slots: {
          default: '<option value="2">Slot Option</option>'
        }
      })

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Both slot content and data prop are provided')
      )
    })

    test('reactive slot content WITHOUT :selected attribute works with v-model', async () => {
      // Test that v-model auto-syncs without needing :selected
      const TestComponent = {
        components: { SlimSelectVue },
        template: `
          <SlimSelectVue v-model="selected" multiple>
            <option v-for="opt in options" :key="opt.value" :value="opt.value">
              {{ opt.text }}
            </option>
          </SlimSelectVue>
        `,
        data() {
          return {
            selected: ['v1'] as string[],
            options: [
              { value: 'v1', text: 'Value 1' },
              { value: 'v2', text: 'Value 2' },
              { value: 'v3', text: 'Value 3' }
            ]
          }
        }
      }

      const wrapper = mount(TestComponent)
      await nextTick()

      // Verify initial selection works without :selected
      const slimComponent = wrapper.findComponent(SlimSelectVue)
      const slim = (slimComponent.vm as any).slim as SlimSelect
      expect(slim.getSelected()).toEqual(['v1'])

      // Parent component updates selected
      ;(wrapper.vm.selected as string[]) = ['v2', 'v3']
      await nextTick()

      // Verify SlimSelect reflects the change
      expect(slim.getSelected()).toEqual(['v2', 'v3'])
    })
  })

  describe('v-model binding', () => {
    test('accepts initial modelValue for single select', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: '2',
          data: [
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' },
            { value: '3', text: 'Option 3' }
          ]
        }
      })

      await nextTick()
      const slim = (wrapper.vm as any).slim as SlimSelect
      const selected = slim.getSelected()
      expect(selected[0]).toBe('2')
    })

    test('accepts initial modelValue for multiple select', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: ['2', '3'],
          multiple: true,
          data: [
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' },
            { value: '3', text: 'Option 3' }
          ]
        }
      })

      await nextTick()
      const slim = (wrapper.vm as any).slim as SlimSelect
      const selected = slim.getSelected()
      expect(selected).toEqual(['2', '3'])
    })

    test('emits update:modelValue when selection changes', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: '1',
          data: [
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ]
        }
      })

      await nextTick()
      const slim = (wrapper.vm as any).slim as SlimSelect

      // Simulate selection change
      slim.setSelected('2')
      await nextTick()

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted?.[0]).toEqual(['2'])
    })

    test('updates selection when modelValue prop changes', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: '1',
          data: [
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ]
        }
      })

      await nextTick()

      // Update modelValue
      await wrapper.setProps({ modelValue: '2' })
      await nextTick()

      const slim = (wrapper.vm as any).slim as SlimSelect
      const selected = slim.getSelected()
      expect(selected[0]).toBe('2')
    })
  })

  describe('Data Prop', () => {
    test('initializes with data prop', async () => {
      const testData = [
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' },
        { value: '3', text: 'Option 3' }
      ]

      wrapper = mount(SlimSelectVue, {
        props: {
          data: testData
        }
      })

      await nextTick()
      const slim = (wrapper.vm as any).slim as SlimSelect
      const data = slim.getData()

      expect(data).toHaveLength(3)
    })

    test('updates data when data prop changes', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          data: [
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ]
        }
      })

      await nextTick()

      // Update data prop
      await wrapper.setProps({
        data: [
          { value: '3', text: 'Option 3' },
          { value: '4', text: 'Option 4' },
          { value: '5', text: 'Option 5' }
        ]
      })

      await nextTick()
      const slim = (wrapper.vm as any).slim as SlimSelect
      const data = slim.getData()

      expect(data).toHaveLength(3)
    })
  })

  describe('Settings Prop', () => {
    test('applies settings prop', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          data: [{ value: '1', text: 'Option 1' }],
          settings: {
            showSearch: false,
            placeholderText: 'Custom Placeholder'
          }
        }
      })

      await nextTick()
      const slim = (wrapper.vm as any).slim as SlimSelect

      expect(slim.settings.showSearch).toBe(false)
      expect(slim.settings.placeholderText).toBe('Custom Placeholder')
    })
  })

  describe('Events Prop', () => {
    test('calls afterChange event from events prop', async () => {
      const afterChangeMock = vi.fn()

      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: '1',
          data: [
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ],
          events: {
            afterChange: afterChangeMock
          }
        }
      })

      await nextTick()
      const slim = (wrapper.vm as any).slim as SlimSelect

      // Trigger a change
      slim.setSelected('2')
      await nextTick()

      expect(afterChangeMock).toHaveBeenCalled()
    })

    test('calls both custom afterChange and emits update:modelValue', async () => {
      const afterChangeMock = vi.fn()

      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: '1',
          data: [
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ],
          events: {
            afterChange: afterChangeMock
          }
        }
      })

      await nextTick()
      const slim = (wrapper.vm as any).slim as SlimSelect

      // Trigger a change
      slim.setSelected('2')
      await nextTick()

      // Both should be called
      expect(afterChangeMock).toHaveBeenCalled()
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted?.[0]).toEqual(['2'])
    })
  })

  describe('Component Methods', () => {
    test('getSlimSelect returns SlimSelect instance', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          data: [{ value: '1', text: 'Option 1' }]
        }
      })

      await nextTick()
      const slimInstance = (wrapper.vm as any).getSlimSelect()

      expect(slimInstance).toBeInstanceOf(SlimSelect)
    })

    test('getCleanValue handles string values correctly', () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          multiple: false
        }
      })

      const result = (wrapper.vm as any).getCleanValue('test')
      expect(result).toBe('test')
    })

    test('getCleanValue converts string to array for multiple select', () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          multiple: true
        }
      })

      const result = (wrapper.vm as any).getCleanValue('test')
      expect(result).toEqual(['test'])
    })

    test('getCleanValue converts array to string for single select', () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          multiple: false
        }
      })

      const result = (wrapper.vm as any).getCleanValue(['test1', 'test2'])
      expect(result).toBe('test1')
    })

    test('getCleanValue returns empty array for undefined value in multiple select', () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          multiple: true
        }
      })

      const result = (wrapper.vm as any).getCleanValue(undefined)
      expect(result).toEqual([])
    })

    test('getCleanValue returns empty string for undefined value in single select', () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          multiple: false
        }
      })

      const result = (wrapper.vm as any).getCleanValue(undefined)
      expect(result).toBe('')
    })
  })

  describe('Lifecycle', () => {
    test('initializes SlimSelect on mount', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          data: [{ value: '1', text: 'Option 1' }]
        }
      })

      await nextTick()
      const slim = (wrapper.vm as any).slim

      expect(slim).not.toBeNull()
      expect(slim).toBeInstanceOf(SlimSelect)
    })

    test('destroys SlimSelect on unmount', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          data: [{ value: '1', text: 'Option 1' }]
        }
      })

      await nextTick()
      const slim = (wrapper.vm as any).slim as SlimSelect
      const destroySpy = vi.spyOn(slim, 'destroy')

      wrapper.unmount()

      expect(destroySpy).toHaveBeenCalled()
    })
  })

  describe('Value Type Handling', () => {
    test('handles empty string as modelValue for single select', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: '',
          data: [
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ]
        }
      })

      await nextTick()
      expect(wrapper.props('modelValue')).toBe('')
    })

    test('handles empty array as modelValue for multiple select', async () => {
      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: [],
          multiple: true,
          data: [
            { value: '1', text: 'Option 1' },
            { value: '2', text: 'Option 2' }
          ]
        }
      })

      await nextTick()
      expect(wrapper.props('modelValue')).toEqual([])
    })
  })

  describe('Reactivity Edge Cases', () => {
    test('does not cause conflicts with v-once on slot', async () => {
      // This test ensures v-once prevents reactivity issues
      wrapper = mount(SlimSelectVue, {
        slots: {
          default: `
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          `
        }
      })

      await nextTick()

      // The slot should render only once
      const initialOptions = wrapper.findAll('option')
      expect(initialOptions).toHaveLength(2)

      // SlimSelect should be initialized without errors
      const slim = (wrapper.vm as any).slim
      expect(slim).toBeInstanceOf(SlimSelect)
    })

    test('data prop changes are reactive', async () => {
      const initialData = [
        { value: '1', text: 'Option 1' },
        { value: '2', text: 'Option 2' }
      ]

      wrapper = mount(SlimSelectVue, {
        props: {
          data: initialData
        }
      })

      await nextTick()
      let slim = (wrapper.vm as any).slim as SlimSelect
      let data = slim.getData()
      expect(data).toHaveLength(2)

      // Update data prop
      const newData = [
        { value: '3', text: 'Option 3' },
        { value: '4', text: 'Option 4' },
        { value: '5', text: 'Option 5' }
      ]

      await wrapper.setProps({ data: newData })
      await nextTick()

      slim = (wrapper.vm as any).slim as SlimSelect
      data = slim.getData()
      expect(data).toHaveLength(3)
    })
  })

  describe('Complex Parent-Child Reactivity Scenario', () => {
    test('handles computed props from parent with bidirectional v-model updates', async () => {
      // Simulate a parent component with computed values based on modelValue
      // Similar to the CustomFields use case
      const parentModelValue = {
        field1: ['option1', 'option2'],
        field2: ['option3']
      }

      const updateCallback = vi.fn()

      // Create wrapper with data computed from parent's modelValue
      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: parentModelValue.field1,
          multiple: true,
          data: [
            { value: 'option1', text: 'Option 1' },
            { value: 'option2', text: 'Option 2' },
            { value: 'option3', text: 'Option 3' },
            { value: 'option4', text: 'Option 4' }
          ],
          events: {
            afterChange: updateCallback
          }
        }
      })

      await nextTick()

      // Verify initial selection from parent's computed value
      const slim = (wrapper.vm as any).slim as SlimSelect
      let selected = slim.getSelected()
      expect(selected).toEqual(['option1', 'option2'])

      // User makes a change in SlimSelect
      slim.setSelected(['option2', 'option3', 'option4'])
      await nextTick()

      // Verify the change callback was called
      expect(updateCallback).toHaveBeenCalled()

      // Verify v-model emitted the update
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted?.[emitted.length - 1]).toEqual([['option2', 'option3', 'option4']])
    })

    test('updates when parent changes computed data based on new modelValue', async () => {
      // Start with initial values
      const fieldValues = [
        { value: 'opt1', text: 'Option 1' },
        { value: 'opt2', text: 'Option 2' },
        { value: 'opt3', text: 'Option 3' }
      ]

      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: ['opt1'],
          multiple: true,
          data: fieldValues.map((v) => ({
            value: v.value,
            text: v.text,
            selected: ['opt1'].includes(v.value)
          }))
        }
      })

      await nextTick()
      let slim = (wrapper.vm as any).slim as SlimSelect
      let selected = slim.getSelected()
      expect(selected).toEqual(['opt1'])

      // Parent updates its modelValue (e.g., from API or another form field)
      // This should update the computed values and SlimSelect
      await wrapper.setProps({
        modelValue: ['opt2', 'opt3'],
        data: fieldValues.map((v) => ({
          value: v.value,
          text: v.text,
          selected: ['opt2', 'opt3'].includes(v.value)
        }))
      })

      await nextTick()

      // Verify SlimSelect reflects the new selection
      slim = (wrapper.vm as any).slim as SlimSelect
      selected = slim.getSelected()
      expect(selected).toEqual(['opt2', 'opt3'])
    })

    test('handles afterChange callback that triggers parent valueChange method', async () => {
      // Simulates the pattern: user changes SlimSelect -> afterChange -> parent's valueChange() -> emit
      let parentValues = {
        customField1: ['value1']
      }

      const valueChangeCallback = vi.fn(() => {
        // Simulate parent's valueChange method that formats and emits
        const formatted = { customField1: parentValues.customField1 }
        return formatted
      })

      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: parentValues.customField1,
          multiple: true,
          data: [
            { value: 'value1', text: 'Value 1' },
            { value: 'value2', text: 'Value 2' },
            { value: 'value3', text: 'Value 3' }
          ],
          events: {
            afterChange: (newVal: Option[]) => {
              // Update parent's local values
              parentValues.customField1 = newVal.map((o: Option) => o.value)
              // Call parent's valueChange method
              valueChangeCallback()
            }
          } as Events
        }
      })

      await nextTick()

      // User changes selection
      const slim = (wrapper.vm as any).slim as SlimSelect
      slim.setSelected(['value2', 'value3'])
      await nextTick()

      // Verify the callback chain was triggered
      expect(valueChangeCallback).toHaveBeenCalled()
      expect(parentValues.customField1).toEqual(['value2', 'value3'])

      // Verify v-model emission
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted?.[emitted.length - 1]).toEqual([['value2', 'value3']])
    })

    test('maintains reactivity through multiple prop updates from parent computed', async () => {
      // Test that reactivity works through multiple cycles
      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: ['a'],
          multiple: true,
          data: [
            { value: 'a', text: 'A' },
            { value: 'b', text: 'B' },
            { value: 'c', text: 'C' }
          ]
        }
      })

      await nextTick()
      let slim = (wrapper.vm as any).slim as SlimSelect
      expect(slim.getSelected()).toEqual(['a'])

      // First parent update
      await wrapper.setProps({ modelValue: ['b'] })
      await nextTick()
      expect(slim.getSelected()).toEqual(['b'])

      // Second parent update
      await wrapper.setProps({ modelValue: ['a', 'c'] })
      await nextTick()
      expect(slim.getSelected()).toEqual(['a', 'c'])

      // User makes a change
      slim.setSelected(['b', 'c'])
      await nextTick()

      // Verify emission
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted?.[emitted.length - 1]).toEqual([['b', 'c']])

      // Parent responds to the change
      await wrapper.setProps({ modelValue: ['b', 'c'] })
      await nextTick()
      expect(slim.getSelected()).toEqual(['b', 'c'])
    })

    test('handles data prop updates from parent computed with selected state', async () => {
      // Simulates when parent recomputes data array with updated selected states
      const allOptions = [
        { value: 'v1', text: 'Value 1' },
        { value: 'v2', text: 'Value 2' },
        { value: 'v3', text: 'Value 3' }
      ]

      const computeDataProp = (selectedValues: string[]) => {
        return allOptions.map((opt) => ({
          value: opt.value,
          text: opt.text,
          selected: selectedValues.includes(opt.value)
        }))
      }

      wrapper = mount(SlimSelectVue, {
        props: {
          modelValue: ['v1'],
          multiple: true,
          data: computeDataProp(['v1'])
        }
      })

      await nextTick()
      let slim = (wrapper.vm as any).slim as SlimSelect
      expect(slim.getSelected()).toEqual(['v1'])

      // Parent's modelValue changes, triggering recompute of data prop
      await wrapper.setProps({
        modelValue: ['v2', 'v3'],
        data: computeDataProp(['v2', 'v3'])
      })

      await nextTick()
      slim = (wrapper.vm as any).slim as SlimSelect
      expect(slim.getSelected()).toEqual(['v2', 'v3'])

      // Verify data was updated
      const data = slim.getData()
      expect(data).toHaveLength(3)
    })

    test('CustomFields use case: parent-child pattern with reactive slot content', async () => {
      // Recreate the actual working pattern: parent passes value to child via v-model
      const ChildComponent = {
        components: { SlimSelectVue },
        template: `
          <SlimSelectVue
            v-model="value"
            multiple
            :events="{ afterChange: () => handleChange() }"
          >
            <option v-for="opt in fieldOptions" :key="opt.value" :value="opt.value">
              {{ opt.name }}
            </option>
          </SlimSelectVue>
        `,
        props: {
          modelValue: { type: Array as PropType<string[]>, required: true },
          fieldOptions: { type: Array, required: true }
        },
        emits: ['update:modelValue'],
        computed: {
          value: {
            get(this: any): string[] {
              return this.modelValue || []
            },
            set(this: any, newValue: string[]) {
              this.$emit('update:modelValue', newValue)
            }
          }
        },
        methods: {
          handleChange() {
            // Handle selection change
          }
        }
      }

      const ParentComponent = {
        components: { ChildComponent },
        template: `
          <ChildComponent
            v-model="selectedValues"
            :field-options="options"
          />
        `,
        data() {
          return {
            selectedValues: ['value1'] as string[],
            options: [
              { value: 'value1', name: 'Value 1' },
              { value: 'value2', name: 'Value 2' },
              { value: 'value3', name: 'Value 3' }
            ]
          }
        }
      }

      const wrapper = mount(ParentComponent)
      await nextTick()

      // Verify initial state
      const slimComponent = wrapper.findComponent(SlimSelectVue)
      const slim = (slimComponent.vm as any).slim as SlimSelect
      expect(slim.getSelected()).toEqual(['value1'])

      // User changes selection via SlimSelect
      slim.setSelected(['value2', 'value3'])
      await nextTick()

      // Verify parent data updated
      expect((wrapper.vm as any).selectedValues).toEqual(['value2', 'value3'])

      // Parent's data changes (from API or other form)
      ;((wrapper.vm as any).selectedValues as string[]) = ['value1', 'value3']
      await nextTick()

      // Verify SlimSelect reflects the new selection
      expect(slim.getSelected()).toEqual(['value1', 'value3'])
    })
  })
})
