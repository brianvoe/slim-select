<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import AdSlot from '../../components/adslot.vue'

// Sections
import Countries from './countries.vue'
import FormReset from './form_reset.vue'
import Required from './required.vue'
import TextOverflow from './text_overflow.vue'
import Label from './label.vue'

export default defineComponent({
  name: 'Examples',
  components: {
    ShikiStyle,
    AdSlot,
    Countries,
    FormReset,
    Required,
    TextOverflow,
    Label
  }
})
</script>

<template>
  <div id="examples" class="contents">
    <Countries />
    <AdSlot ad-slot="1270131515" />
    <Label />
    <AdSlot ad-slot="1270131515" />
    <FormReset />
    <AdSlot ad-slot="1270131515" />
    <Required />
    <AdSlot ad-slot="1270131515" />
    <TextOverflow />
  </div>
</template>
