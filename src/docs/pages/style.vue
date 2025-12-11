<script lang="ts">
import { defineComponent } from 'vue'
import AdSlot from '@/docs/components/adslot.vue'

// Sections
import Variables from './style/variables.vue'
import Classes from './style/classes.vue'
import Styles from './style/styles.vue'

export default defineComponent({
  name: 'Style',
  components: {
    AdSlot,
    Variables,
    Classes,
    Styles
  }
})
</script>

<template>
  <div id="style" class="contents">
    <Variables />
    <Classes />
    <Styles />
  </div>
</template>
