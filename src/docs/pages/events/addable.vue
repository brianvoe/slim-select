<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Addable',
  mounted() {
    new SlimSelect({
      select: this.$refs.addableSingle as HTMLSelectElement,
      events: {
        addable: (value: string) => {
          return value
        },
      },
    })

    new SlimSelect({
      select: this.$refs.addableMulti as HTMLSelectElement,
      events: {
        addable: (value: string) => {
          return {
            text: value,
            value: value.toLowerCase(),
          }
        },
      },
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">addable</h2>
    <p>Slim select has the ability to dynamically add options via the search input field</p>
    <p>
      addable is a callback which takes a function parameter. The return value is the string of the value you want
      added.
    </p>

    <div class="set-content">
      <select ref="addableSingle">
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <select ref="addableMultiple" multiple>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '.element .you #want',
          // Optional - In the event you want to alter/validate it as a return value
          addable: function (value) {
            // return false or null if you do not want to allow value to be submitted
            if (value === 'bad') {return false}

            // Return the value string
            return value // Optional - value alteration // ex: value.toLowerCase()

            // Optional - Return a valid data object. See methods/setData for list of valid options
            return {
              text: value,
              value: value.toLowerCase()
            }
          }
        })
      </code>
    </pre>
  </div>
</template>