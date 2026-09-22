<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'AllowEmptySearch',
  components: {
    HighlightStyle
  },
  mounted() {
    // Single
    new SlimSelect({
      select: this.$refs.showSearchSingle as HTMLSelectElement,
      settings: {
        showSearch: false
      }
    })

    // Multiple
    new SlimSelect({
      select: this.$refs.showSearchMulti as HTMLSelectElement,
      settings: {
        showSearch: false
      }
    })
  }
})
</script>

<template>
  <div id="allowEmptySearch" class="content">
    <h2 class="header">allowEmptySearch</h2>
    <p>
      The allowEmptySearch setting determines whether the search input can be empty. 
      When set to true, users can perform a search with an empty or whitespace-only input, which will display all available options.
      The search value will be still be trimmed before being processed.
    </p>
    <p>
      This feature is useful for enabling dropdowns to load a list of options when the search is first opened.
    </p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="showSearchSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>

      <select ref="showSearchMulti" multiple>
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
            allowEmptySearch: true
          }
        })
      </pre>
    </HighlightStyle>
  </div>
</template>
