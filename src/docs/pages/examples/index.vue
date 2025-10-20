<script lang="ts">
import { defineComponent } from 'vue'
import Countries from './countries.vue'
import FormReset from './form_reset.vue'
import Required from './required.vue'

export default defineComponent({
  name: 'Examples',
  components: {
    Countries,
    FormReset,
    Required
  }
})
</script>

<template>
  <div id="examples" class="contents">
    <Countries />
    <FormReset />
    <Required />
  </div>
</template>
