<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect, { DataArray } from '../../../slim-select'

export default defineComponent({
  name: 'BeforeAfterChange',
  data() {
    return {
      beforeChangeSingle: [] as DataArray,
      beforeChangeMultiple: [] as DataArray,
      afterChangeSingle: [] as DataArray,
      afterChangeMultiple: [] as DataArray,
    }
  },
  mounted() {
    new SlimSelect({
      select: this.$refs.beforeChangeSingle as HTMLSelectElement,
      events: {
        beforeChange: (newValue: DataArray, oldValue: DataArray) => {
          this.beforeChangeSingle = newValue
        },
      },
    })

    new SlimSelect({
      select: this.$refs.beforeChangeMultiple as HTMLSelectElement,
      events: {
        beforeChange: (newValue: DataArray, oldValue: DataArray) => {
          this.beforeChangeMultiple = newValue
          return true
        },
      },
    })

    new SlimSelect({
      select: this.$refs.afterChangeSingle as HTMLSelectElement,
      events: {
        afterChange: (value: DataArray) => {
          this.afterChangeSingle = value
        },
      },
    })

    new SlimSelect({
      select: this.$refs.afterChangeMultiple as HTMLSelectElement,
      events: {
        afterChange: (value: DataArray) => {
          this.afterChangeMultiple = value
        },
      },
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">beforeOnChange</h2>
    <p>
      beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it
      produces isnt to your liking. In order to stop the change from happening just return false on the callback.
      Returning nothing or true will allow it to continue as normal.
    </p>

    <div v-if="beforeChangeSingle">
      <strong>Before on change: {{ beforeChangeSingle }}</strong>
    </div>

    <select ref="beforeChangeSingle">
      <option value="value1">Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>
    <br /><br />

    <div v-if="beforeChangeMultiple">
      <strong>Before on change: {{ beforeChangeMultiple }}</strong>
    </div>

    <select ref="beforeChangeMultiple" multiple>
      <option value="value1" selected>Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '.element .you #want',
          events: {
            beforeChange: (newVal, oldVal) => {
              console.log(newVal)
              return false // this will stop the change from happening
            }
          }
        })
      </code>
    </pre>
  </div>

  <div class="content">
    <h2 class="header">afterChange</h2>
    <p>afterChange will trigger a callback after the value of the select dropdown has changed.</p>

    <div v-if="afterChangeSingle">
      <strong>On change: {{ afterChangeSingle }}</strong>
    </div>

    <select ref="afterChangeSingle">
      <option value="value1">Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>
    <br /><br />

    <div v-if="afterChangeMultiple">
      <strong>On change: {{ afterChangeMultiple }}</strong>
    </div>

    <select ref="afterChangeMultiple" multiple>
      <option value="value1" selected>Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '.element .you #want',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      </code>
    </pre>
  </div>
</template>
