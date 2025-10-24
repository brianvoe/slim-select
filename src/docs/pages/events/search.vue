<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect, { Option, Optgroup } from '@/slim-select'
import ShikiStyle from '../../components/shiki_style.vue'

interface Person {
  first_name: string
  last_name: string
}

export default defineComponent({
  name: 'SearchEvent',
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
      search: string,
      currentData: (Option | Optgroup)[]
    ): Promise<(Partial<Option> | Partial<Optgroup>)[]> {
      return new Promise((resolve, reject) => {
        if (search.length < 2) {
          return reject('Search must be at least 2 characters')
        }

        fetch('https://api.gofakeit.com/statics/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_name: search
          })
        })
          .then((response) => response.json())
          .then((data: Person[]) => {
            if (!data || data.length === 0) {
              return reject('No results found')
            }

            // Take the results and create an array of options excluding any that are already selected in currentData
            const options = data
              .filter((person) => {
                return !currentData.some((dataItem) => {
                  // check if option has a value property
                  return dataItem instanceof Option && dataItem.value === `${person.first_name} ${person.last_name}`
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
  },
  components: {
    ShikiStyle
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
      When a user types in the search field, your callback function receives the search term and current data. You can
      return a Promise that resolves with new options, reject with an error message, or return false to prevent the
      search.
    </p>

    <div class="row">
      <select ref="searchSingle"></select>
      <select ref="searchMultiple" multiple></select>
    </div>

    <ShikiStyle language="javascript">
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
            search: (search, currentData) => {
              return new Promise((resolve, reject) => {
                if (search.length &lt; 2) {
                  return reject('Search must be at least 2 characters')
                }

                // Fetch users from gofakeit API based on search term
                fetch('https://api.gofakeit.com/statics/users', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    first_name: search
                  })
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (!data || data.length === 0) {
                      return reject('No results found')
                    }

                    // Take the results and create an array of options 
                    // excluding any that are already selected in currentData
                    const options = data
                      .filter((person) => {
                        return !currentData.some((dataItem) => {
                          // check if option has a value property
                          return dataItem instanceof Option &amp;&amp; 
                                 dataItem.value === `${person.first_name} ${person.last_name}`
                        })
                      })
                      .map((person) => {
                        return {
                          text: `${person.first_name} ${person.last_name}`,
                          value: `${person.first_name} ${person.last_name}`
                        }
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
      </pre>
    </ShikiStyle>
  </div>
</template>
