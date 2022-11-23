<script lang="ts">
import { defineComponent, PropType } from 'vue'

import SlimSelect, { Config, Events } from '../slim-select'
import Settings from '../slim-select/settings'
import { DataArrayPartial } from '../slim-select/store'

export default defineComponent({
  name: 'SlimSelect',
  props: {
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

    // Initialize SlimSelect
    this.slim = new SlimSelect(config)
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
  methods: {
    // This allows via a ref to call the SlimSelect methods
    getSlimSelect() {
      return this.slim
    },
  },
})
</script>

<template>
  <select ref="slim">
    <slot />
  </select>
</template>
