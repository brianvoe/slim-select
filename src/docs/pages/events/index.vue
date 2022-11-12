<script lang="ts">
import { defineComponent } from 'vue'

import BeforeAfterChange from './before_after_change.vue'
import BeforeAfterOpenClose from './before_after_open_close.vue'
import Search from './search.vue'
import SearchFilter from './search_filter.vue'
import Addable from './addable.vue'

export default defineComponent({
  name: 'Events',
  components: {
    BeforeAfterChange,
    BeforeAfterOpenClose,
    Search,
    SearchFilter,
    Addable,
  },
})
</script>

<template>
  <div id="events" class="contents">
    <BeforeAfterChange />
    <BeforeAfterOpenClose />
    <Search />
    <SearchFilter />
    <Addable />
  </div>
</template>
