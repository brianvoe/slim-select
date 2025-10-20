<script lang="ts">
import { defineComponent } from 'vue'
import Countries from './countries.vue'
import FormReset from './form_reset.vue'
import Required from './required.vue'
import TextOverflow from './text_overflow.vue'

export default defineComponent({
  name: 'Examples',
  components: {
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
    <Required />
    <TextOverflow />
  </div>
</template>
