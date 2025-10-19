<script lang="ts">
import { defineComponent, PropType } from 'vue'
import SlimSelect, { Config, Events } from '../index'
import { SettingsPartial } from '../settings'
import { DataArrayPartial, Option } from '../store'

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
      type: Array as PropType<DataArrayPartial>
    },
    settings: {
      type: Object as PropType<SettingsPartial>
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
        const value = this.multiple ? newVal.map((option) => option.value) : newVal.length > 0 ? newVal[0].value : ''

        // Update v-model if value changed
        if (this.value !== value) {
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

    // Get SlimSelect selected values
    let selected = this.$props.multiple ? this.slim.getSelected() : this.slim.getSelected()[0]

    // Check if modelValue is the same as the value of the select
    if (this.value !== selected) {
      // If not, set the value of the select to the modelValue
      // Don't trigger afterChange on initial sync
      this.slim.setSelected(this.value, false)
    }
  },
  updated() {
    // After DOM updates (like slot content changes), sync selection from modelValue
    // This ensures :selected attribute isn't needed on slot options
    if (this.slim && !this.data) {
      const currentSelected = this.slim.getSelected()
      const modelValues = Array.isArray(this.value) ? this.value : [this.value]
      const needsSync = JSON.stringify(currentSelected.sort()) !== JSON.stringify(modelValues.sort())

      if (needsSync) {
        this.slim.setSelected(this.value, false)
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

        // Set the value of the select to the newVal
        // Don't trigger afterChange when programmatically updating from parent
        this.slim.setSelected(this.getCleanValue(newVal), false)
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
    }
  }
})
</script>

<template>
  <select :multiple="multiple" ref="slim">
    <slot />
  </select>
</template>
