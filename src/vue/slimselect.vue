<script>
import { defineComponent } from 'vue'

import SlimSelect from 'slim-select'

export default defineComponent({
  name: 'SlimSelect',
  props: {
    data: {
      type: Array,
    },
    settings: {
      type: Object,
    },
    events: {
      type: Object,
    },
  },
  data() {
    return {
      slim: null,
    }
  },
  mounted() {
    let config = {
      select: this.$refs.slim,
    }

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
})
</script>

<template>
  <select ref="slim">
    <slot />
  </select>
</template>
