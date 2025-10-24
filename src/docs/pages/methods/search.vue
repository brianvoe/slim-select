<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Search',
  data() {
    return {
      searchSingle: null as SlimSelect | null,
      searchMultiple: null as SlimSelect | null
    }
  },
  mounted() {
    this.searchSingle = new SlimSelect({
      select: this.$refs.searchSingle as HTMLSelectElement
    })
    this.searchMultiple = new SlimSelect({
      select: this.$refs.searchMultiple as HTMLSelectElement
    })
  },
  methods: {
    setSearch() {
      this.searchSingle!.open()
      this.searchSingle!.search('value 2')

      this.searchMultiple!.open()
      this.searchMultiple!.search('value 2')
    }
  },
  components: {
    ShikiStyle
  }
})
</script>

<template>
  <div id="search" class="content">
    <h2 class="header">search</h2>
    <p>
      The search method allows you to programmatically set the search input value and filter the dropdown options
      accordingly. This is particularly useful for implementing custom search functionality, pre-filtering options based
      on external conditions, or creating advanced search interfaces that go beyond the default search behavior.
    </p>
    <p>
      When called, this method updates the search input field and immediately applies the search filter to the available
      options, showing only those that match the search criteria. This is essential for creating responsive search
      experiences where the search term can be set programmatically based on user interactions or external data.
    </p>

    <div class="row">
      <div class="btn" @click="setSearch()">Set Search</div>
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

    <ShikiStyle language="javascript">
      <pre>
        var select = new SlimSelect({
          select: '#selectElement'
        })
        select.search('value')
      </pre>
    </ShikiStyle>
  </div>
</template>
