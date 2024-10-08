<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Search',
  mounted() {
    // Single
    new SlimSelect({
      select: this.$refs.showSearchSingle as HTMLSelectElement,
      settings: {
        showSearch: false
      }
    })
    new SlimSelect({
      select: this.$refs.focusSearchSingle as HTMLSelectElement,
      settings: {
        focusSearch: false
      }
    })
    new SlimSelect({
      select: this.$refs.searchTextSingle as HTMLSelectElement,
      settings: {
        searchText: 'Sorry, nothing to see here'
      }
    })
    new SlimSelect({
      select: this.$refs.searchPlaceholderSingle as HTMLSelectElement,
      settings: {
        searchPlaceholder: 'Search for the good stuff!'
      }
    })
    new SlimSelect({
      select: this.$refs.searchHighlightSingle as HTMLSelectElement,
      settings: {
        searchHighlight: true
      }
    })

    // Multiple
    new SlimSelect({
      select: this.$refs.showSearchMulti as HTMLSelectElement,
      settings: {
        showSearch: false
      }
    })
    new SlimSelect({
      select: this.$refs.focusSearchMulti as HTMLSelectElement,
      settings: {
        focusSearch: false
      }
    })
    new SlimSelect({
      select: this.$refs.searchTextMulti as HTMLSelectElement,
      settings: {
        searchText: 'Sorry nothing to see here'
      }
    })
    new SlimSelect({
      select: this.$refs.searchPlaceholderMulti as HTMLSelectElement,
      settings: {
        searchPlaceholder: 'Search for the good stuff!'
      }
    })
    new SlimSelect({
      select: this.$refs.searchHighlightMulti as HTMLSelectElement,
      settings: {
        searchHighlight: true
      }
    })
  }
})
</script>

<template>
  <div id="search" class="content">
    <h2 class="header">showSearch / focusSearch / searchText / searchingText / searchHighlight</h2>
    <p><b>showSearch</b> - is a boolean value that will decide whether or not to show the search. Default is true.</p>
    <p>
      <b>focusSearch</b> - is a boolean value that will decide whether or not to focus on the search on open. Default is
      true.
    </p>
    <p>
      <b>searchText</b> - is a string value that will show in the event there are no results. Default is 'No Results'.
    </p>
    <p>
      <b>searchingText</b> - is a string value that will show during an fetch search request. Default is 'Searching...'.
    </p>
    <p>
      <b>searchPlaceholder</b> - is a string value that will set the value of the input search placeholder text. Default
      is 'Search'.
    </p>
    <p><b>searchHighlight</b> - is a boolean value that will highlight search results. Default is false.</p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="showSearchSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
      <select ref="focusSearchSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
      <select ref="searchTextSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
      <select ref="searchPlaceholderSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
      <select ref="searchHighlightSingle">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
    </div>

    <div class="row">
      <select ref="showSearchMulti" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
      <select ref="focusSearchMulti" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
      <select ref="searchTextMulti" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
      <select ref="searchPlaceholderMulti" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
      <select ref="searchHighlightMulti" multiple>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        let slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            showSearch: false, // used in example
            focusSearch: false, // used in example
            searchText: 'Sorry nothing to see here', // used in example
            searchPlaceholder: 'Search for the good stuff!', // used in example
            searchHighlight: true // used in example
          }
        })
      </code>
    </pre>
  </div>
</template>
