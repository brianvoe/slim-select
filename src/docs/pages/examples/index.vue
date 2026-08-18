<script lang="ts">
import { defineComponent } from 'vue'

import AdSlot from '../../components/adslot.vue'

// Sections
import FormReset from './form_reset.vue'
import Required from './required.vue'
import TextOverflow from './text_overflow.vue'
import Label from './label.vue'
import Keyboard from './keyboard.vue'
import MenuExample from './menu.vue'

export default defineComponent({
  name: 'Usage',
  components: {
    AdSlot,
    FormReset,
    Required,
    TextOverflow,
    Label,
    Keyboard,
    MenuExample
  }
})
</script>

<template>
  <div id="usage" class="contents">
    <MenuExample />
    <Label />
    <AdSlot ad-slot="1270131515" />
    <Keyboard />
    <FormReset />
    <AdSlot ad-slot="1270131515" />
    <Required />
    <TextOverflow />
    <AdSlot ad-slot="1270131515" />
  </div>
</template>
