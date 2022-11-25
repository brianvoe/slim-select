<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue'

import SlimSelect from '../../../slim-select'
import { DataArray, Option } from '../../../slim-select/store'

interface Person {
  first_name: string
  last_name: string
}

let searchData: Person[] = []
let searchSingle: Ref<HTMLSelectElement | null> = ref(null)
let searchMultiple: Ref<HTMLSelectElement | null> = ref(null)

// Go fetch some gofakeit data via post to json
fetch('https://api.gofakeit.com/json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'array',
    rowcount: 1000,
    indent: false,
    fields: [
      { name: 'first_name', function: 'firstname', params: {} },
      { name: 'last_name', function: 'lastname', params: {} },
    ],
  }),
})
  .then((response) => response.json())
  .then((data: Person[]) => {
    searchData = data
  })

onMounted(() => {
  new SlimSelect({
    select: searchSingle.value!,
    settings: {
      placeholderText: 'Search First or Last Name',
      searchingText: 'Searching Users...',
      searchHighlight: true,
    },
    events: {
      search: searchPromise,
    },
  })

  new SlimSelect({
    select: searchMultiple.value!,
    settings: {
      placeholderText: 'Search First or Last Name',
      searchingText: 'Searching Users...',
      searchHighlight: true,
    },
    events: {
      search: searchPromise,
    },
  })
})

function searchPromise(search: string, currentData: DataArray): Promise<Option[]> {
  return new Promise((resolve, reject) => {
    if (search.length < 2) {
      return reject('Search must be at least 2 characters')
    }

    const results = searchData.filter((person) => {
      return (
        person.first_name.toLowerCase().includes(search.toLowerCase()) ||
        person.last_name.toLowerCase().includes(search.toLowerCase())
      )
    })

    if (results.length === 0) {
      return reject('No results found')
    }

    // Take the results and create an array of options excluding any that are already selected in currentData
    const options = results
      .filter((person) => {
        return !currentData.some((data) => {
          // check if option has a value property
          return data instanceof Option && data.value === `${person.first_name} ${person.last_name}`
        })
      })
      .map((person) => {
        return {
          text: `${person.first_name} ${person.last_name}`,
          value: `${person.first_name} ${person.last_name}`,
        } as Option
      })

    // Simulate a slow search
    setTimeout(() => {
      resolve(options)
    }, 300)
  })
}
</script>

<template>
  <div id="search" class="content">
    <h2 class="header">search</h2>
    <p>
      Slim select allows you to syncronize result values from your promise response.<br />
      Call callback() method with slimselect data, false or string with specific string.
    </p>

    <div class="row">
      <select ref="searchSingle"></select>
      <select ref="searchMultiple" multiple></select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          events: {
            search: (search, currentData) => {
              return new Promise((resolve, reject) => {
                if (search.length &lt; 2) {
                  return reject('Search must be at least 2 characters')
                }

                // Fetch random first and last name data
                fetch('https://api.gofakeit.com/json', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    type: 'array',
                    rowcount: 10,
                    indent: false,
                    fields: [
                      { name: 'first_name', function: 'firstname', params: {} },
                      { name: 'last_name', function: 'lastname', params: {} },
                    ],
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    // Take the data and create an array of options 
                    // excluding any that are already selected in currentData
                    const options = data
                      .filter((person) => {
                        return !currentData.some((optionData) => {
                          return optionData.value === `${person.first_name} ${person.last_name}`
                        })
                      })
                      .map((person) => {
                        return {
                          text: `${person.first_name} ${person.last_name}`,
                          value: `${person.first_name} ${person.last_name}`,
                        }
                      })

                    resolve(options)
                  })
              })
            }
          }
        })
      </code>
    </pre>
  </div>
</template>
