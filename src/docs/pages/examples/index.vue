<script lang="ts">
import { defineComponent } from 'vue'
import Countries from './countries.vue'

export default defineComponent({
  name: 'Examples',
  components: {
    Countries
  }
})
</script>

<template>
  <div id="examples" class="contents">
    <Countries />
  </div>
</template>
