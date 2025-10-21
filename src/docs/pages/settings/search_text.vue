<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'SearchText',
  mounted() {
    // Single
    new SlimSelect({
      select: this.$refs.searchTextSingle as HTMLSelectElement,
      settings: {
        searchText: 'Sorry, nothing to see here'
      }
    })

    // Multiple
    new SlimSelect({
      select: this.$refs.searchTextMulti as HTMLSelectElement,
      settings: {
        searchText: 'Sorry nothing to see here'
      }
    })
  }
})
</script>

<template>
  <div id="searchText" class="content">
    <h2 class="header">searchText</h2>
    <p>String value that will show in the event there are no search results. Default is 'No Results'.</p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="searchTextSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
    </div>

    <div class="row">
      <select ref="searchTextMulti" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchText: 'Sorry, nothing to see here'
          }
        })
      </code>
    </pre>
  </div>
</template>
