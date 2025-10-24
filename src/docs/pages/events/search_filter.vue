<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect, { type Option, type Optgroup } from '@/slim-select'

export default defineComponent({
  name: 'SearchFilter',
  mounted() {
    new SlimSelect({
      select: this.$refs.searchFilterSingle as HTMLSelectElement,
      settings: {
        searchHighlight: true
      },
      events: {
        searchFilter: (option: Option, search: string) => {
          return option.text.toLowerCase().includes(search.toLowerCase())
        }
      }
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
            { text: 'Orange', value: 'orange' }
          ]
        },
        {
          label: 'Vegetables',
          options: [
            { text: 'Carrot', value: 'carrot' },
            { text: 'Potato', value: 'potato' },
            { text: 'Tomato', value: 'tomato' }
          ]
        },
        {
          label: 'Meats',
          options: [
            { text: 'Beef', value: 'beef' },
            { text: 'Chicken', value: 'chicken' },
            { text: 'Pork', value: 'pork' }
          ]
        },
        {
          label: 'Seafood',
          options: [
            { text: 'Crab', value: 'crab' },
            { text: 'Lobster', value: 'lobster' },
            { text: 'Shrimp', value: 'shrimp' }
          ]
        }
      ],
      settings: {
        searchHighlight: true
      },
      events: {
        searchFilter: (option: Option, search: string) => {
          return option.text.toLowerCase().includes(search.toLowerCase())
        }
      }
    })
  },
  components: {
    ShikiStyle
  }
})
</script>

<template>
  <div id="searchFilter" class="content">
    <h2 class="header">searchFilter</h2>
    <p>
      The searchFilter event allows you to customize how SlimSelect filters through existing options when users search.
      By default, SlimSelect uses a case-insensitive substring match, but you can override this behavior to implement
      custom filtering logic.
    </p>
    <p>
      This is perfect for implementing advanced search features like fuzzy matching, exact phrase matching, or custom
      business logic for filtering options based on your specific requirements.
    </p>

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

    <ShikiStyle language="javascript">
      <pre>
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
      </pre>
    </ShikiStyle>
  </div>
</template>
