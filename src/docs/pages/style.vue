<script lang="ts">
import { defineComponent } from 'vue'
import AdSlot from '@/docs/components/adslot.vue'

// Sections
import Showcase from './style/showcase.vue'
import Customize from './style/customize.vue'
import Classes from './style/classes.vue'
import Styles from './style/styles.vue'
import Countries from './style/countries.vue'

export default defineComponent({
  name: 'Style',
  components: {
    AdSlot,
    Showcase,
    Customize,
    Classes,
    Styles,
    Countries
  }
})
</script>

<template>
  <div id="style" class="contents">
    <Showcase />
    <AdSlot ad-slot="1270131515" />

    <Customize />
    <AdSlot ad-slot="1270131515" />

    <Classes />
    <AdSlot ad-slot="1270131515" />

    <Styles />
    <AdSlot ad-slot="1270131515" />

    <Countries />
  </div>
</template>
