<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Search',
  mounted() {
    const ajaxSingle = new SlimSelect({
      select: this.$refs.ajaxSingle as HTMLSelectElement,
      settings: {
        placeholderText: 'Search "Graham"',
        searchingText: 'Searching Users...',
      },
      //   ajax(search: any, callback: any) {
      //     if (search.length < 3) {
      //       callback('Need 3 characters')
      //       return
      //     }

      //     fetch('https://jsonplaceholder.typicode.com/users')
      //       .then((response) => {
      //         return response.json()
      //       })
      //       .then((json) => {
      //         const data = [] as any
      //         for (const j of json) {
      //           data.push({ text: j.name })
      //         }

      //         callback(data)
      //       })
      //       .catch((error) => {
      //         callback(false)
      //       })
      //   }
    })

    const ajaxMulti = new SlimSelect({
      select: this.$refs.ajaxMulti as HTMLSelectElement,
      settings: {
        placeholderText: 'Search "Dennis"',
      },
      // ajax(search: any, callback: any) {
      //   fetch('https://jsonplaceholder.typicode.com/users')
      //     .then((response) => {
      //       return response.json()
      //     })
      //     .then((json) => {
      //       const data = [] as any
      //       for (const j of json) {
      //         data.push({ text: j.name })
      //       }

      //       setTimeout(() => {
      //         ajaxMulti.setSearchText('Sorry No Results.')
      //         callback(data)
      //       }, 1000)
      //     })
      //     .catch((error) => {
      //       callback(false)
      //     })
      // }
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">ajax</h2>
    <p>
      Slim select allows you to syncronize result values from your ajax requests.<br />
      Call callback() method with slimselect data, false or string with specific string.<br />
      <br />
      When doing fetch request for each ajax call be sure to debounce your request so you are not getting fetch race
      conditions.
    </p>

    <div class="select-split">
      <select ref="ajaxSingle">
        <option data-placeholder="true"></option>
      </select>
      <select ref="ajaxMultiple" multiple></select>
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
