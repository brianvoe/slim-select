<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'SearchFilter',
  mounted() {
    new SlimSelect({
      select: '#searchFilter',
      events: {
        // searchFilter: (option: any, search: any) => option.text.substr(0, search.length) === search,
      },
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">searchFilter</h2>
    <p>searchFilter option is used to replace the default matching algorithm.</p>
    <p>See methods/setData for the proper object interface of <em>option</em>.</p>

    <select id="searchFilter">
      <option value="apple">Apple</option>
      <option value="orange">Orange</option>
      <option value="pineapple">Pineapple</option>
    </select>

    <pre>
      <code class="language-javascript">
          new SlimSelect({
          select: '#searchFilter',
          // Exact case sensitive start of string match
          searchFilter: (option, search) => {
              return option.text.substr(0, search.length) === search
          }
          })
      </code>
    </pre>
  </div>
</template>