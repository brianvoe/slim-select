<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../slim-select'

export default defineComponent({
  name: 'Data',
  mounted() {
    new SlimSelect({
      select: this.$refs.dataSingle as HTMLSelectElement,
      data: [
        {
          placeholder: true,
          text: 'data placeholder',
        },
        { text: 'Cat' },
        { text: 'Dog' },
        { text: 'Bird' },
      ],
    })

    new SlimSelect({
      select: this.$refs.dataMultiple as HTMLSelectElement,
      data: [
        {
          placeholder: true,
          text: 'data placeholder',
        },
        { text: 'Human' },
        {
          label: 'Animals',
          options: [{ text: 'Cat' }, { text: 'Dog' }, { text: 'Bird' }],
        },
      ],
    })
  },
})
</script>

<template>
  <div id="data">
    <div class="content">
      <h2 class="header">data</h2>
      <p>Data is a value that can be set to initialize options in the select dropdown</p>

      <div class="select-split">
        <select ref="dataSingle"></select>
        <select ref="dataMultiple" multiple></select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '.element .you #want',
            data: [
              {text: 'Value 1'},
              {text: 'Value 2'},
              {text: 'Value 3'}
            ],
            // groups
            data: [
              {
                label: 'Animals',
                options: [
                  {text: 'Cat'},
                  {text: 'Dog'},
                  {text: 'Bird'}
                ]
              }
            ]
            // Mix - option and group options
            data: [
              {text: 'Human'}, // regular option
              {
                label: 'Animals',
                options: [
                  {text: 'Cat'},
                  {text: 'Dog'},
                  {text: 'Bird'}
                ]
              }
            ]
          })

          // If you want to set a placeholder set the first object placeholder to true
          {'placeholder': true, 'text': 'placeholder text'}
        </code>
      </pre>

      <h4>Data Types</h4>
      <pre>
        <code class="language-javascript">
          var optgroup = {
            label: 'label', // Required
            options: [] // Required - value is an array of options
          }

          var option = {
            text: 'text', // Required
            value: 'value', // Optional - value will be set by text if not set
            html: '&lt;b&gt;Html&lt;/b&gt;', // Optional - will be used for display purposes if set
            selected: false, // Optional - default is false
            disabled: false, // Optional - default is false
            placeholder: false, // Optional - default is false
            class: '', // Optional - default is not set
            style: '', // Optional - default is not set
            data: {} // Optional - If you have data attributes
          }
        </code>
      </pre>
    </div>
  </div>
</template>
