<script lang="ts">
import { defineComponent } from 'vue'

import AdSlot from '../../components/adslot.vue'

// Sections
import FormReset from './form_reset.vue'
import Required from './required.vue'
import TextOverflow from './text_overflow.vue'
import Label from './label.vue'
import MenuExample from './menu.vue'

export default defineComponent({
  name: 'Usage',
  components: {
    AdSlot,
    FormReset,
    Required,
    TextOverflow,
    Label,
    MenuExample
  }
})
</script>

<template>
  <div id="usage" class="contents">
    <MenuExample />
    <AdSlot ad-slot="1270131515" />
    <Label />
    <FormReset />
    <AdSlot ad-slot="1270131515" />
    <Required />
    <AdSlot ad-slot="1270131515" />
    <TextOverflow />
  </div>
</template>
