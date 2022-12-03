<script lang="ts">
import { defineComponent, PropType } from 'vue'

import SlimSelect, { Config, Events } from '../slim-select'
import { SettingsPartial } from '../slim-select/settings'
import { DataArrayPartial, Option } from '../slim-select/store'

export default defineComponent({
  name: 'SlimSelect',
  props: {
    modelValue: {
      type: [String, Array, undefined] as PropType<string | string[] | undefined>,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array as PropType<DataArrayPartial>,
    },
    settings: {
      type: Object as PropType<SettingsPartial>,
    },
    events: {
      type: Object as PropType<Events>,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      slim: null as SlimSelect | null,
    }
  },
  mounted() {
    let config = {
      select: this.$refs.slim,
    } as Config

    // If data is passed in, use it
    if (this.data) {
      config.data = this.data
    }

    // If settings are passed in, use it
    if (this.settings) {
      config.settings = this.settings
    }

    // If events are passed in, use it
    if (this.events) {
      config.events = this.events
    }
    if (!config.events) {
      config.events = {}
    }

    // Wrap config.events.afterChange to run value update
    const ogAfterChange = config.events.afterChange
    config.events.afterChange = (newVal: Option[]) => {
      const value = this.multiple ? newVal.map((option) => option.value) : newVal[0].value

      // Check if value is different from modelValue
      if (this.value !== value) {
        this.value = value
      }

      // If they had an original afterChange, run it
      if (config.events && ogAfterChange) {
        ogAfterChange(newVal)
      }
    }

    // Initialize SlimSelect
    this.slim = new SlimSelect(config)

    // Get SlimSelect selected values
    let selected = this.$props.multiple ? this.slim.getSelected() : this.slim.getSelected()[0]

    // Check if modelValue is the same as the value of the select
    if (this.value !== selected) {
      // If not, set the value of the select to the modelValue
      this.slim.setSelected(this.value)
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
        // Set the value of the select to the newVal
        this.slim?.setSelected(this.getCleanValue(newVal))
      },
      immediate: true,
    },
    data: {
      handler: function (newData) {
        if (this.slim) {
          this.slim.setData(newData)
        }
      },
      deep: true,
    },
  },
  computed: {
    value: {
      get(): string | string[] {
        return this.getCleanValue(this.$props.modelValue)
      },
      set(value: string | string[]) {
        this.$emit('update:modelValue', value)
      },
    },
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
  },
})
</script>

<template>
  <select :multiple="multiple" ref="slim">
    <slot />
  </select>
</template>
