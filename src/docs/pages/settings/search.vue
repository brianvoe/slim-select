<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Search',
  mounted() {
    new SlimSelect({ select: this.$refs.showSearchSingle as HTMLSelectElement, settings: { showSearch: false } })
    new SlimSelect({
      select: this.$refs.searchTextSingle as HTMLSelectElement,
      settings: {
        searchText: 'Sorry nothing to see here',
      },
      events: {
        beforeOpen: () => {
          console.log('beforeOpen')
        },
        beforeClose: () => {
          console.log('beforeClose')
        },
        afterOpen: () => {
          console.log('afterOpen')
        },
        afterClose: () => {
          console.log('afterClose')
        },
      },
    })
    new SlimSelect({
      select: this.$refs.searchPlaceholderSingle as HTMLSelectElement,
      settings: { searchPlaceholder: 'Search for the good stuff!' },
    })
    new SlimSelect({
      select: this.$refs.searchHighlightSingle as HTMLSelectElement,
      settings: { searchHighlight: true },
    })
    new SlimSelect({ select: this.$refs.showSearchMulti as HTMLSelectElement, settings: { showSearch: false } })
    new SlimSelect({
      select: this.$refs.searchTextMulti as HTMLSelectElement,
      settings: { searchText: 'Sorry nothing to see here' },
    })
    new SlimSelect({
      select: this.$refs.searchPlaceholderMulti as HTMLSelectElement,
      settings: { searchPlaceholder: 'Search for the good stuff!' },
    })
    new SlimSelect({
      select: this.$refs.searchHighlightMulti as HTMLSelectElement,
      settings: { searchHighlight: true },
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">showSearch / searchText / searchingText / searchHighlight</h2>
    <p>showSearch is a boolean value that will decide whether or not to show the search. Default is true.</p>
    <p>searchText is a string value that will show in the event there are no results. Default is 'No Results'.</p>
    <p>searchingText is a string value that will show during an ajax request. Default is 'Searching...'.</p>
    <p>
      searchPlaceholder is a string value that will set the value of the input search placeholder text. Default is
      'Search'.
    </p>
    <p>searchHighlight is a boolean value that will highlight search results. Default is false.</p>

    <div class="set-content">
      <select ref="showSearchSingle">
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

    <div class="set-content">
      <select ref="showSearchMulti" multiple>
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
          select: '#search',
          settings: {
            showSearch: false,
            searchText: 'Sorry nothing to see here',
            searchPlaceholder: 'Search for the good stuff!',
            searchHighlight: true
          }
        })
      </code>
    </pre>
  </div>
</template>