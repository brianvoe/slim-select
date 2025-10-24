<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Addable',
  mounted() {
    new SlimSelect({
      select: this.$refs.addableSingle as HTMLSelectElement,
      events: {
        addable: (value: string) => {
          if (value.toLowerCase() === 'value') {
            return new Error('You cant set that value')
          }

          return {
            text: value,
            value: value.toLowerCase()
          }
        }
      }
    })

    new SlimSelect({
      select: this.$refs.addableMultiple as HTMLSelectElement,
      events: {
        addable: (value: string) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                text: value,
                value: value
              })
            }, 100)
          })
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
  <div id="addable" class="content">
    <h2 class="header">addable</h2>
    <p>
      The addable event enables users to create new options on-the-fly by typing in the search field. This powerful
      feature transforms SlimSelect into a dynamic, user-driven component that can grow and adapt based on user input.
    </p>
    <p>
      Perfect for scenarios like tag creation, user-defined categories, or any situation where you want to allow users
      to add new options that don't already exist. You can implement validation, formatting, or even async operations to
      create the new option.
    </p>

    <div class="row">
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

    <ShikiStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',

          events: {
            // Allow anything
            addable: function (value) { return value },

            // or 

            // Decide what is allowed to be added
            addable: function (value) {
              // return false or null if you do not want to allow value to be submitted
              if (value === 'bad') { return false }

              // return new 

              // Return the value string
              return value // Optional - value alteration // ex: value.toLowerCase()

              // Optional - Return a valid data object. 
              // See methods/setData for list of valid options
              return {
                text: value,
                value: value.toLowerCase()
              }

              // Optional - Return a promise with either a string or data object
              return new Promise((resolve) => {
                resolve({
                  text: value,
                  value: value,
                })
              })
            }
          }
        })
      </pre>
    </ShikiStyle>
  </div>
</template>
