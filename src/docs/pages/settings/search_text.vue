<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'SearchText',
  components: {
    HighlightStyle
  },
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
    <p>
      The searchText setting allows you to customize the message that appears when a search query returns no matching
      results. This provides clear feedback to users when their search doesn't find any options, improving the overall
      user experience.
    </p>
    <p>
      You can use this setting to provide helpful guidance, such as "No matches found", "Try a different search term",
      or any other message that helps users understand why they're not seeing results and what they can do next.
    </p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="searchTextSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>

      <select ref="searchTextMulti" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            searchText: 'Sorry, nothing to see here'
          }
        })
      </pre>
    </HighlightStyle>
  </div>
</template>
