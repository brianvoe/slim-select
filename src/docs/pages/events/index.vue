<script lang="ts">
import { defineComponent } from 'vue'

import BeforeAfterChange from './before_after_change.vue'
import Search from './search.vue'
import SearchFilter from './search_filter.vue'
import Addable from './addable.vue'

export default defineComponent({
  name: 'Events',
  components: {
    BeforeAfterChange,
    Search,
    SearchFilter,
    Addable,
  },
})
</script>

<template>
  <div id="events" class="contents">
    <BeforeAfterChange />
    <Search />
    <SearchFilter />
    <Addable />
  </div>
</template>
