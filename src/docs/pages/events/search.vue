<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect, { Option, Optgroup } from '@/slim-select'
import HighlightStyle from '../../components/highlight_style.vue'

interface Person {
  first_name: string
  last_name: string
}

export default defineComponent({
  name: 'SearchEvent',
  components: {
    HighlightStyle
  },
  mounted() {
    new SlimSelect({
      select: this.$refs.searchSingle as HTMLSelectElement,
      settings: {
        placeholderText: 'Search First Name',
        searchingText: 'Searching Users...',
        searchHighlight: true,
        allowDeselect: true
      },
      events: {
        search: this.searchPromise
      }
    })

    new SlimSelect({
      select: this.$refs.searchMultiple as HTMLSelectElement,
      settings: {
        closeOnSelect: false,
        placeholderText: 'Search First Name',
        searchingText: 'Searching Users...',
        searchHighlight: true,
        allowDeselect: true
      },
      events: {
        search: this.searchPromise
      }
    })
  },
  methods: {
    searchPromise(
      searchValue: string,
      selected: Option[],
      catalog?: (Option | Optgroup)[]
    ): Promise<(Partial<Option> | Partial<Optgroup>)[]> {
      return new Promise((resolve, reject) => {
        if (searchValue.length < 2) {
          return reject('Search must be at least 2 characters')
        }

        const queryParams = new URLSearchParams({
          first_name: searchValue,
          limit: '20'
        })
        const url = `https://api.gofakeit.com/statics/users?${queryParams}`

        fetch(url)
          .then((response) => response.json())
          .then((resp: { results?: Person[]; error?: string }) => {
            const data = resp?.results
            if (!data || data.length === 0) {
              return reject(resp?.error || 'No results found')
            }

            // Take the results and create an array of options excluding any that are already selected
            const options = data
              .filter((person) => {
                return !selected.some((dataItem) => {
                  // check if option has a value property
                  return dataItem.value === `${person.first_name} ${person.last_name}`
                })
              })
              .map((person) => {
                return {
                  text: `${person.first_name} ${person.last_name}`,
                  value: `${person.first_name} ${person.last_name}`
                } as Option
              })

            resolve([{ label: 'Results', selectAll: true, options: options }])
          })
          .catch((error) => {
            reject('Error fetching results')
          })
      })
    }
  }
})
</script>

<template>
  <div id="search" class="content">
    <h2 class="header">search</h2>
    <p>
      The search event enables dynamic data loading from external APIs or data sources. This powerful feature allows you
      to fetch results asynchronously based on user input, making it perfect for autocomplete functionality, user
      search, or any scenario where you need to load data on demand.
    </p>
    <p>
      When <code>events.search</code> is set, Slim Select uses your callback for remote search instead of filtering
      local options with <code>searchFilter</code>. API search results are temporary — clearing the search field or
      closing the dropdown (when <code>keepSearch</code> is false) restores the catalog baseline while preserving the
      current selection.
    </p>

    <h3 class="header">Callback parameters</h3>
    <p>Your callback is invoked on each non-empty search with three arguments:</p>
    <ul>
      <li>
        <code>searchValue</code> (<code>string</code>) — The current search input text, trimmed. Whitespace-only
        input clears the search.
      </li>
      <li>
        <code>selected</code> (<code>Option[]</code>) — Options currently selected in the control. Use this to exclude
        already-picked values from API results. This is not the full option list.
      </li>
      <li>
        <code>catalog</code> (<code>(Option | Optgroup)[]</code>, optional) — A clone of the catalog baseline: the
        option list Slim Select restores when search is cleared. During an active API search, this is not the same as
        <code>getData()</code>, which reflects temporary search results shown in the dropdown.
      </li>
    </ul>

    <h3 class="header">Return value</h3>
    <p>
      Return a <code>Promise</code> or an array of options/optgroups to display while searching. Reject the promise (or
      pass a string to <code>reject</code>) to show an error message. Return an empty array to show no results.
    </p>

    <div class="row">
      <select ref="searchSingle"></select>
      <select ref="searchMultiple" multiple></select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            placeholderText: 'Search First',
            searchingText: 'Searching Users...',
            searchHighlight: true,
            allowDeselect: true
          },
          events: {
            search: (searchValue, selected, catalog) => {
              return new Promise((resolve, reject) => {
                if (searchValue.length &lt; 2) {
                  return reject('Search must be at least 2 characters')
                }

                // GoFakeIt Statics API: build URL with query params (first_name, limit)
                const queryParams = new URLSearchParams({
                  first_name: searchValue,
                  limit: '20'
                })
                const url = `https://api.gofakeit.com/statics/users?${queryParams}`

                fetch(url)
                  .then((response) => response.json())
                  .then((resp) => {
                    const data = resp?.results || []
                    if (!data.length) {
                      return reject(resp?.error || 'No results found')
                    }

                    // Take the results and create an array of options
                    // excluding any that are already selected
                    const options = data
                      .filter((person) => {
                        return !selected.some((dataItem) => {
                          return dataItem.value === `${person.first_name} ${person.last_name}`
                        })
                      })
                      .map((person) => {
                        return {
                          text: `${person.first_name} ${person.last_name}`,
                          value: `${person.first_name} ${person.last_name}`
                        }
                      })

                    // catalog is available when you need local context, e.g. merging with API results
                    // console.log('Local baseline options:', catalog)

                    resolve([{ label: 'Results', selectAll: true, options: options }])
                  })
                  .catch((error) => {
                    reject('Error fetching results')
                  })
              })
            }
          }
        })
      </pre>
    </HighlightStyle>
  </div>
</template>
