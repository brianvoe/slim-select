<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'KeepSearch',
  components: {
    HighlightStyle
  },
  mounted() {
    // Single
    new SlimSelect({
      select: this.$refs.keepSearchSingle as HTMLSelectElement,
      settings: {
        keepSearch: true
      }
    })

    // Multiple
    new SlimSelect({
      select: this.$refs.keepSearchMulti as HTMLSelectElement,
      settings: {
        keepSearch: true
      }
    })
  }
})
</script>

<template>
  <div id="keepSearch" class="content">
    <h2 class="header">keepSearch</h2>
    <p>
      The keepSearch setting controls whether the search input text is preserved when the dropdown closes. When enabled,
      any text entered in the search field will remain when you reopen the dropdown, allowing you to continue your
      previous search.
    </p>
    <p>
      By default, the search field is cleared each time the dropdown closes. Enabling this setting is useful when users
      need to maintain their last search and results, such as when picking multiple selections in a multi-select
      dropdown.
    </p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="keepSearchSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
        <option value="fish">Fish</option>
        <option value="hamster">Hamster</option>
        <option value="rabbit">Rabbit</option>
      </select>

      <select ref="keepSearchMulti" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
        <option value="fish">Fish</option>
        <option value="hamster">Hamster</option>
        <option value="rabbit">Rabbit</option>
      </select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            keepSearch: true
          }
        })
      </pre>
    </HighlightStyle>
  </div>
</template>
