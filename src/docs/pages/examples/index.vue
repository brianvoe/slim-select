<script lang="ts">
import { defineComponent } from 'vue'
import Countries from './countries.vue'
import FormReset from './form_reset.vue'

export default defineComponent({
  name: 'Examples',
  components: {
    Countries,
    FormReset
  }
})
</script>

<template>
  <div id="examples" class="contents">
    <Countries />
    <FormReset />
  </div>
</template>
