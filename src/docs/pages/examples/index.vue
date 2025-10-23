<script lang="ts">
import { defineComponent } from 'vue'

import AdSlot from '../../components/adslot.vue'

// Sections
import Countries from './countries.vue'
import FormReset from './form_reset.vue'
import Required from './required.vue'
import TextOverflow from './text_overflow.vue'

export default defineComponent({
  name: 'Examples',
  components: {
    AdSlot,
    Countries,
    FormReset,
    Required,
    TextOverflow
  }
})
</script>

<template>
  <div id="examples" class="contents">
    <Countries />
    <FormReset />
    <AdSlot ad-slot="1270131515" />

    <Required />
    <TextOverflow />
  </div>
</template>
