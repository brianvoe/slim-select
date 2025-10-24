<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect, { Option } from '@/slim-select'

export default defineComponent({
  name: 'BeforeAfterChange',
  data() {
    return {
      beforeChangeSingle: [] as Option[],
      beforeChangeMultiple: [] as Option[],
      afterChangeSingle: [] as Option[],
      afterChangeMultiple: [] as Option[]
    }
  },
  mounted() {
    new SlimSelect({
      select: this.$refs.beforeChangeSingle as HTMLSelectElement,
      settings: {
        allowDeselect: true
      },
      events: {
        beforeChange: (newValue: Option[], oldValue: Option[]) => {
          this.beforeChangeSingle = oldValue
          return true
        }
      }
    })

    new SlimSelect({
      select: this.$refs.beforeChangeMultiple as HTMLSelectElement,
      events: {
        beforeChange: (newValue: Option[], oldValue: Option[]) => {
          this.beforeChangeMultiple = oldValue
          return true
        }
      }
    })

    new SlimSelect({
      select: this.$refs.afterChangeSingle as HTMLSelectElement,
      settings: {
        allowDeselect: true
      },
      events: {
        afterChange: (value: Option[]) => {
          this.afterChangeSingle = value
        }
      }
    })

    new SlimSelect({
      select: this.$refs.afterChangeMultiple as HTMLSelectElement,
      events: {
        afterChange: (value: Option[]) => {
          this.afterChangeMultiple = value
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
  <div id="beforeChange" class="content">
    <h2 class="header">beforeChange</h2>
    <p>
      The beforeChange event allows you to intercept and validate changes before they are applied to the select element.
      This powerful feature enables you to implement custom validation logic, confirmation dialogs, or conditional logic
      that can prevent unwanted selections.
    </p>
    <p>
      Your callback function receives both the new value and the old value, allowing you to make informed decisions
      about whether to allow the change. Return false to prevent the change, or return true (or nothing) to allow it to
      proceed.
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

    <ShikiStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          events: {
            beforeChange: (newVal, oldVal) => {
              console.log(newVal)
              return false // this will stop the change from happening
            }
          }
        })
      </pre>
    </ShikiStyle>
  </div>

  <div id="afterChange" class="content">
    <h2 class="header">afterChange</h2>
    <p>
      The afterChange event fires after a selection has been made and provides you with the new selected value. This is
      the perfect place to trigger side effects like updating other UI elements, making API calls, or performing any
      actions that should happen when the selection changes.
    </p>
    <p>
      Unlike beforeChange, this event cannot prevent the change from happening - it's purely for responding to completed
      changes and updating your application state accordingly.
    </p>

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

    <ShikiStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          events: {
            afterChange: (newVal) => {
              console.log(newVal)
            }
          }
        })
      </pre>
    </ShikiStyle>
  </div>
</template>
