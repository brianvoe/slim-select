<script lang="ts">
import { defineComponent, PropType } from 'vue'

import SlimSelect, { Config, Events } from '../slim-select'
import Settings from '../slim-select/settings'
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
      type: Object as PropType<Settings>,
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

    // Wrap config.events.afterChange to run emitUpdateSelectedValues
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
      this.value = selected
    }
  },
  beforeUnmount() {
    if (this.slim) {
      this.slim.destroy()
    }
  },
  watch: {
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
        const multi = this.$props.multiple
        const val = this.$props.modelValue

        // If modelValue is undefined, return empty string or array
        if (val === undefined) {
          return multi ? [] : ''
        }

        // If its multiple and the modelValue is a string, return an array with the string
        if (multi && typeof val === 'string') {
          return [val]
        }

        // If its not multiple and the modelValue is an array, return the first item
        if (!multi && Array.isArray(val)) {
          return val[0]
        }

        return multi ? [] : ''
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
  },
})
</script>

<template>
  <select :multiple="multiple" ref="slim">
    <slot />
  </select>
</template>
