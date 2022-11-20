<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Search',
  data() {
    return {
      searchSingle: null as SlimSelect | null,
      searchMultiple: null as SlimSelect | null,
    }
  },
  mounted() {
    this.searchSingle = new SlimSelect({
      select: this.$refs.searchSingle as HTMLSelectElement,
    })
    this.searchMultiple = new SlimSelect({
      select: this.$refs.searchMultiple as HTMLSelectElement,
    })
  },
  methods: {
    setSearch() {
      this.searchSingle!.open()
      this.searchSingle!.search('value 2')

      this.searchMultiple!.open()
      this.searchMultiple!.search('value 2')
    },
  },
})
</script>

<template>
  <div id="search" class="content">
    <h2 class="header">search</h2>
    <p>The search method will update the search input field and search the data against that value.</p>

    <div class="row">
      <div class="btn" @click="setSearch">Set Search</div>
      <select ref="searchSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="searchMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement'
        })
        select.search('value')
      </code>
    </pre>
  </div>
</template>
