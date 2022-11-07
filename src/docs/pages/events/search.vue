<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue'

import SlimSelect, { Option } from '../../../slim-select'

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
    },
    events: {
      search: searchPromise,
    },
  })

  new SlimSelect({
    select: searchMultiple.value!,
    settings: {
      placeholderText: 'Search "Dennis"',
    },
    events: {
      search: searchPromise,
    },
  })
})

function searchPromise(search: string): Promise<Option[]> {
  console.log(search)
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

    // Convert the results to an array of options
    const options = results.map((person) => {
      return {
        text: `${person.first_name} ${person.last_name}`,
        value: `${person.first_name} ${person.last_name}`,
      }
    }) as Option[]

    // Simulate a slow search
    // setTimeout(() => {
    resolve(options)
    // }, 300)
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

    <div class="select-split">
      <select ref="searchSingle">
        <option data-placeholder="true"></option>
      </select>
      <select ref="searchMultiple" multiple></select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#ajax',
          searchingText: 'Searching...', // Optional - Will show during ajax request
          ajax: function (search, callback) {
            // Check search value. If you dont like it callback(false) or callback('Message String')
            if (search.length &lt; 3) {
              callback('Need 3 characters')
              return
            }

            // Perform your own ajax request here
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(function (response) {
              return response.json()
            })
            .then(function (json) {
              let data = []
              for (let i = 0; i &lt; json.length; i++) {
                data.push({text: json[i].name})
              }
              
              // Upon successful fetch send data to callback function.
              // Be sure to send data back in the proper format.
              // Refer to the method setData for examples of proper format.
              callback(data)
            })
            .catch(function(error) {
              // If any erros happened send false back through the callback
              callback(false)
            })
          }
        })
      </code>
    </pre>
  </div>
</template>
