<script lang="ts">
import { defineComponent } from 'vue'

import Destroy from './destroy.vue'
import EnableDisable from './enable_disable.vue'
import GetData from './get_data.vue'
import GetSelected from './get_selected.vue'
import OpenClose from './open_close.vue'
import Search from './search.vue'
import SetData from './set_data.vue'
import SetSelected from './set_selected.vue'

export default defineComponent({
  name: 'Methods',
  components: {
    GetSelected,
    SetSelected,
    GetData,
    SetData,
    EnableDisable,
    OpenClose,
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
    <OpenClose />
    <Search />
    <Destroy />
  </div>
</template>
