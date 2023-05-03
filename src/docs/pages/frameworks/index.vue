<script lang="ts">
import { defineComponent } from 'vue'

import Vue from './vue.vue'
import React from './react.vue'

export default defineComponent({
  name: 'Events',
  components: {
    Vue,
    React,
  },
})
</script>

<template>
  <div id="frameworks" class="contents">
    <Vue />
    <React />
  </div>
</template>
