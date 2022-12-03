<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'
import { Option } from '../../../slim-select/store'

export default defineComponent({
  name: 'SearchFilter',
  mounted() {
    new SlimSelect({
      select: this.$refs.searchFilterSingle as HTMLSelectElement,
      settings: {
        searchHighlight: true,
      },
      events: {
        searchFilter: (option: Option, search: string) => {
          return option.text.toLowerCase().includes(search.toLowerCase())
        },
      },
    })

    new SlimSelect({
      select: this.$refs.searchFilterMultiple as HTMLSelectElement,
      data: [
        // List of foods seprated by optgroups
        {
          label: 'Fruits',
          options: [
            { text: 'Apple', value: 'apple' },
            { text: 'Banana', value: 'banana' },
            { text: 'Orange', value: 'orange' },
          ],
        },
        {
          label: 'Vegetables',
          options: [
            { text: 'Carrot', value: 'carrot' },
            { text: 'Potato', value: 'potato' },
            { text: 'Tomato', value: 'tomato' },
          ],
        },
        {
          label: 'Meats',
          options: [
            { text: 'Beef', value: 'beef' },
            { text: 'Chicken', value: 'chicken' },
            { text: 'Pork', value: 'pork' },
          ],
        },
        {
          label: 'Seafood',
          options: [
            { text: 'Crab', value: 'crab' },
            { text: 'Lobster', value: 'lobster' },
            { text: 'Shrimp', value: 'shrimp' },
          ],
        },
      ],
      settings: {
        searchHighlight: true,
      },
      events: {
        searchFilter: (option: Option, search: string) => {
          return option.text.toLowerCase().includes(search.toLowerCase())
        },
      },
    })
  },
})
</script>

<template>
  <div id="searchFilter" class="content">
    <h2 class="header">searchFilter</h2>
    <p>searchFilter event is used to replace the default matching algorithm.</p>
    <p>See Data for the proper object interface of <em>option</em>.</p>

    <div class="row">
      <select ref="searchFilterSingle">
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="pineapple">Pineapple</option>
      </select>

      <select ref="searchFilterMultiple">
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="pineapple">Pineapple</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
          events: {
            // Example: Exact case sensitive start of string match
            searchFilter: (option, search) => {
              return option.text.substr(0, search.length) === search
            }

            // Default
            searchFilter: (option, search) => {
              return option.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
            }
          }
        })
      </code>
    </pre>
  </div>
</template>
