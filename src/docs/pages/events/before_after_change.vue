<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'
import { DataArray } from '../../../slim-select/store'

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
      settings: {
        allowDeselect: true,
      },
      events: {
        beforeChange: (newValue: DataArray, oldValue: DataArray) => {
          this.beforeChangeSingle = oldValue
          return true
        },
      },
    })

    new SlimSelect({
      select: this.$refs.beforeChangeMultiple as HTMLSelectElement,
      events: {
        beforeChange: (newValue: DataArray, oldValue: DataArray) => {
          this.beforeChangeMultiple = oldValue
          return true
        },
      },
    })

    new SlimSelect({
      select: this.$refs.afterChangeSingle as HTMLSelectElement,
      settings: {
        allowDeselect: true,
      },
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
  <div id="beforeChange" class="content">
    <h2 class="header">beforeChange</h2>
    <p>
      beforeOnChange will trigger a callback on an option click and will allow you the ability to halt if the value it
      produces isnt to your liking. In order to stop the change from happening just return false on the callback.
      Returning nothing or true will allow it to continue as normal.
    </p>

    <div class="alert info">
      Be sure to return true to allow for the change to happen. False or nothing to cancel change.
    </div>

    <div v-if="beforeChangeSingle">
      <strong>Before change: {{ beforeChangeSingle }}</strong>
    </div>

    <select ref="beforeChangeSingle">
      <option data-placeholder="true">Select Option</option>
      <option value="value1">Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>
    <br />

    <div v-if="beforeChangeMultiple">
      <strong>Before change: {{ beforeChangeMultiple }}</strong>
    </div>

    <select ref="beforeChangeMultiple" multiple>
      <option value="value1" selected>Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
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

  <div id="afterChange" class="content">
    <h2 class="header">afterChange</h2>
    <p>afterChange will trigger a callback after the value of the select dropdown has changed.</p>

    <div v-if="afterChangeSingle">
      <strong>After change: {{ afterChangeSingle }}</strong>
    </div>

    <select ref="afterChangeSingle">
      <option data-placeholder="true">Select Option</option>
      <option value="value1">Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>
    <br />

    <div v-if="afterChangeMultiple">
      <strong>After change: {{ afterChangeMultiple }}</strong>
    </div>

    <select ref="afterChangeMultiple" multiple>
      <option value="value1" selected>Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>

    <pre>
      <code class="language-javascript">
        new SlimSelect({
          select: '#selectElement',
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
