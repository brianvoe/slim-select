<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

interface Person {
  first_name: string
  last_name: string
}

export default defineComponent({
  name: 'AllowEmptySearch',
  components: {
    HighlightStyle
  },
  mounted() {
    // Single
    const single = new SlimSelect({
      select: this.$refs.showSearchSingle as HTMLSelectElement,
      settings: {
        placeholderText: 'Search First',
        searchingText: 'Searching Users...',
        searchHighlight: true,
        allowDeselect: true,
        allowEmptySearch: true
      },
      events: {
        beforeOpen: () => single.search(''),
        search: this.searchPromise
      }
    })

    // Multiple
    const multi = new SlimSelect({
      select: this.$refs.showSearchMulti as HTMLSelectElement,
      settings: {
        placeholderText: 'Search First',
        searchingText: 'Searching Users...',
        searchHighlight: true,
        allowDeselect: true,
        allowEmptySearch: true
      },
      events: {
        beforeOpen: () => multi.search(''),
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
  <div id="allowEmptySearch" class="content">
    <h2 class="header">allowEmptySearch</h2>
    <p>
      The allowEmptySearch setting determines whether when the search input is empty, the search can still be performed.
      This can be useful for dropdowns implementing the <code>search</code> method that want to show a list of options on open of the select.
      When set to true, the <code>search</code> method will still trim the input before performing the search.
    </p>

    <div class="row" style="padding: 0 0 var(--spacing-half) 0">
      <select ref="showSearchSingle"></select>
      <select ref="showSearchMulti" multiple> </select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        const slim = new SlimSelect({
          select: '#selectElement',
          settings: {
            placeholderText: 'Search First',
            searchingText: 'Searching Users...',
            searchHighlight: true,
            allowDeselect: true,
            allowEmptySearch: true
          },
          events: {
            beforeOpen: () => slim.search(''),
            search: (searchValue, selected, catalog) => {
              return new Promise((resolve, reject) => {

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
