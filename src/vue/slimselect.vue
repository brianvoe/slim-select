<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect, { Config } from '../slim-select'

export default defineComponent({
  name: 'SlimSelect',
  props: {
    settings: {
      type: Object,
    },
  },
  data() {
    return {
      slim: null as SlimSelect | null,
    }
  },
  mounted() {
    let config = {
      select: this.$refs.slim as HTMLSelectElement,
    } as Config

    // If props are passed in, merge them with the config
    if (this.settings) {
      config.settings = this.settings
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
