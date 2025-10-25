<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '@/docs/components/shiki_style.vue'
import AdSlot from '@/docs/components/adslot.vue'

// Sections
import Variables from './style/variables.vue'

export default defineComponent({
  name: 'Style',
  components: {
    ShikiStyle,
    AdSlot,
    Variables
  }
})
</script>

<template>
  <div id="style" class="contents">
    <Variables />
  </div>
</template>
