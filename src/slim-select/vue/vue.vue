<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SlimSelect, { Config, Events, Option, Optgroup, Settings } from '../index'

export default defineComponent({
  name: 'SlimSelect',
  props: {
    modelValue: {
      type: [String, Array, undefined] as PropType<string | string[] | undefined>
    },
    multiple: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array as PropType<(Partial<Option> | Partial<Optgroup>)[]>
    },
    settings: {
      type: Object as PropType<Partial<Settings>>
    },
    events: {
      type: Object as PropType<Events>,
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      slim: null as SlimSelect | null
    }
  },
  mounted() {
    // Warning: If both slot and data are provided, data takes precedence
    const hasSlotContent = this.$slots.default && this.$slots.default().length > 0
    if (hasSlotContent && this.data) {
      console.warn(
        '[SlimSelect Vue] Both slot content and data prop are provided. Data prop will take precedence and slot content will be ignored.'
      )
    }

    let config = {
      select: this.$refs.slim
    } as Config

    // If data is passed in, use it
    if (this.data) {
      config.data = this.data
    }

    // If settings are passed in, use it
    if (this.settings) {
      config.settings = this.settings
    }

    // Create a copy of events to avoid mutating the prop
    const ogAfterChange = this.events?.afterChange
    config.events = {
      ...this.events,
      afterChange: (newVal: Option[]) => {
        if (!this.slim) return

        const value = this.multiple ? newVal.map((option) => option.value) : newVal.length > 0 ? newVal[0].value : ''

        // Check if the current v-model value exists in options
        // If it doesn't exist, don't update v-model (preserve invalid value like regular HTML select)
        const currentValue = this.getCleanValue(this.$props.modelValue)
        const options = this.slim.store.getDataOptions()
        const currentValueExists = Array.isArray(currentValue)
          ? currentValue.length > 0 && currentValue.every((val) => options.some((opt) => opt.value === val))
          : currentValue !== '' && options.some((opt) => opt.value === currentValue)

        // Only update v-model if:
        // 1. The value actually changed, AND
        // 2. Either the current v-model value exists in options, OR we're setting to a valid non-empty value
        // This prevents clearing invalid v-model values when we show placeholder
        if (
          this.value !== value &&
          (currentValueExists || (value !== '' && options.some((opt) => opt.value === value)))
        ) {
          this.value = value
        }

        // Call the original afterChange callback if it exists
        if (ogAfterChange) {
          ogAfterChange(newVal)
        }
      }
    }

    // Initialize SlimSelect
    this.slim = new SlimSelect(config)

    // Sync initial modelValue to SlimSelect
    this.syncModelValueToSlimSelect(false)
  },
  updated() {
    // After DOM updates (like slot content changes), sync selection from modelValue
    // This ensures :selected attribute isn't needed on slot options
    if (this.slim && !this.data) {
      const currentSelected = this.slim.getSelected()
      const modelValues = Array.isArray(this.value) ? this.value : [this.value]
      const needsSync = JSON.stringify(currentSelected.sort()) !== JSON.stringify(modelValues.sort())

      if (needsSync) {
        // Use the same sync method to handle invalid values properly
        this.syncModelValueToSlimSelect(false)
      }
    }
  },
  beforeUnmount() {
    if (this.slim) {
      this.slim.destroy()
    }
  },
  watch: {
    modelValue: {
      handler: function (newVal: string | string[] | undefined) {
        if (!this.slim) return
        // Sync modelValue to SlimSelect (don't trigger afterChange when programmatically updating from parent)
        this.syncModelValueToSlimSelect(false)
      }
    },
    data: {
      handler: function (newData) {
        if (this.slim) {
          this.slim.setData(newData)
        }
      },
      deep: true
    }
  },
  computed: {
    value: {
      get(): string | string[] {
        return this.getCleanValue(this.$props.modelValue)
      },
      set(value: string | string[]) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    // This allows via a ref to call the SlimSelect methods
    getSlimSelect() {
      return this.slim
    },
    getCleanValue(val: string | string[] | undefined): string | string[] {
      const multi = this.$props.multiple

      // If its multiple and the modelValue is a string, return an array with the string
      if (typeof val === 'string') {
        return multi ? [val] : val
      }

      // If its not multiple and the modelValue is an array, return the first item
      if (Array.isArray(val)) {
        return multi ? val : val[0]
      }

      return multi ? [] : ''
    },
    syncModelValueToSlimSelect(runAfterChange: boolean = false): void {
      if (!this.slim) return

      const cleanValue = this.getCleanValue(this.$props.modelValue)
      const modelValueIsExplicitlyEmpty =
        this.$props.modelValue === '' || (Array.isArray(this.$props.modelValue) && this.$props.modelValue.length === 0)

      // Check if the value exists in the options
      // If it doesn't exist, clear selection to show placeholder (like regular HTML select)
      const options = this.slim.store.getDataOptions()

      // For empty string, check if there's a placeholder option - if not, we need to add one
      // For non-empty values, check if they exist in options
      const valueExists = Array.isArray(cleanValue)
        ? cleanValue.length > 0 && cleanValue.every((val) => options.some((opt) => opt.value === val))
        : cleanValue !== '' && options.some((opt) => opt.value === cleanValue)

      if (valueExists) {
        // Value exists in options, set it normally
        this.slim.setSelected(cleanValue, runAfterChange)
      } else {
        // Value doesn't exist in options, clear selection to show placeholder
        // This matches the behavior of a regular HTML select where invalid values don't select anything
        // Only add placeholder if modelValue is explicitly set to empty/invalid (not undefined)
        const hasPlaceholder = options.some((opt) => opt.placeholder)

        if (!hasPlaceholder && !this.multiple && (modelValueIsExplicitlyEmpty || (cleanValue !== '' && !valueExists))) {
          // Add a placeholder option so placeholder text shows when nothing is selected
          // Get current data and prepend placeholder option
          const currentData = this.slim.getData()
          const placeholderOption = {
            text: '',
            value: '',
            placeholder: true
          }

          // Use setData to update everything (store, select, render)
          this.slim.setData([placeholderOption, ...currentData])
        }

        // Clear selection by setting to empty
        // Note: The store will auto-select the first option, but if it's a placeholder,
        // the render will show placeholder text instead of the option text
        this.slim.setSelected(this.multiple ? [] : '', runAfterChange)
      }
    }
  }
})
</script>

<template>
  <select :multiple="multiple" ref="slim">
    <slot />
  </select>
</template>
