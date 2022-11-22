<script lang="ts">
import { defineComponent } from 'vue'

import Vue from './vue.vue'

export default defineComponent({
  name: 'Events',
  components: {
    Vue,
  },
})
</script>

<template>
  <div id="frameworks" class="contents">
    <Vue />
  </div>
</template>
