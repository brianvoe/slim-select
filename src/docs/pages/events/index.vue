<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import AdSlot from '../../components/adslot.vue'

// Sections
import Error from './error.vue'
import BeforeAfterChange from './before_after_change.vue'
import BeforeAfterOpenClose from './before_after_open_close.vue'
import Search from './search.vue'
import SearchFilter from './search_filter.vue'
import Addable from './addable.vue'

export default defineComponent({
  name: 'Events',
  components: {
    ShikiStyle,
    AdSlot,
    Error,
    BeforeAfterChange,
    BeforeAfterOpenClose,
    Search,
    SearchFilter,
    Addable
  }
})
</script>

<template>
  <div id="events" class="contents">
    <Error />
    <BeforeAfterChange />
    <AdSlot ad-slot="1270131515" />

    <BeforeAfterOpenClose />
    <Search />
    <AdSlot ad-slot="1270131515" />

    <SearchFilter />
    <Addable />
  </div>
</template>
