<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'SearchPlaceholder',
  mounted() {
    // Single
    new SlimSelect({
      select: this.$refs.searchPlaceholderSingle as HTMLSelectElement,
      settings: {
        searchPlaceholder: 'Search for the good stuff!'
      }
    })

    // Multiple
    new SlimSelect({
      select: this.$refs.searchPlaceholderMulti as HTMLSelectElement,
      settings: {
        searchPlaceholder: 'Search for the good stuff!'
      }
    })
  }
})
</script>

<template>
  <div id="searchPlaceholder" class="content">
    <h2 class="header">searchPlaceholder</h2>
    <p>String value that will set the placeholder text of the search input. Default is 'Search'.</p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="searchPlaceholderSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
    </div>

    <div class="row">
      <select ref="searchPlaceholderMulti" multiple>
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
            searchPlaceholder: 'Search for the good stuff!'
          }
        })
      </code>
    </pre>
  </div>
</template>
