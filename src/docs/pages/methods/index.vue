<script lang="ts">
import { defineComponent } from 'vue'

import GetSelected from './get_selected.vue'
import SetSelected from './set_selected.vue'
import GetData from './get_data.vue'
import SetData from './set_data.vue'
import EnableDisable from './enable_disable.vue'
import Search from './search.vue'
import Destroy from './destroy.vue'

export default defineComponent({
  name: 'Methods',
  components: {
    GetSelected,
    SetSelected,
    GetData,
    SetData,
    EnableDisable,
    Search,
    Destroy,
  },
})
</script>

<template>
  <div id="methods" class="contents">
    <GetSelected />
    <SetSelected />
    <GetData />
    <SetData />
    <EnableDisable />
    <Search />
    <Destroy />
  </div>
</template>
