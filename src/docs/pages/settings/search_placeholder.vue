<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'SearchPlaceholder',
  components: {
    HighlightStyle
  },
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
    <p>
      The searchPlaceholder setting allows you to customize the placeholder text that appears in the search input field.
      This provides helpful guidance to users about what they can search for and creates a more intuitive search
      experience.
    </p>
    <p>
      You can use this setting to provide context-specific instructions, such as "Search for countries", "Find users",
      or any other descriptive text that helps users understand how to use the search functionality effectively.
    </p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="searchPlaceholderSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>

      <select ref="searchPlaceholderMulti" multiple>
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
            searchPlaceholder: 'Search for the good stuff!'
          }
        })
      </pre>
    </HighlightStyle>
  </div>
</template>
