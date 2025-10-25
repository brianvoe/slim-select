<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'ShowSearch',
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
  },
  components: {
    ShikiStyle
  }
})
</script>

<template>
  <div id="showSearch" class="content">
    <h2 class="header">showSearch</h2>
    <p>
      The showSearch setting controls whether the search input field is displayed in the dropdown. When enabled, users
      can type to filter through options, making it easier to find specific values in long lists.
    </p>
    <p>
      This feature is particularly useful for dropdowns with many options, as it significantly improves usability by
      allowing users to quickly locate and select the desired option without scrolling through the entire list. The
      default value is true, but you can disable it for simple dropdowns with few options.
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

    <ShikiStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            showSearch: false
          }
        })
      </pre>
    </ShikiStyle>
  </div>
</template>
