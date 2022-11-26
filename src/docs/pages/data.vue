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
  <div id="data" class="contents">
    <div id="types" class="content">
      <h2 class="header">Data Types</h2>
      <p>
        There are two types of data types. The option which consists of a variation of fields to customize the option.
        You can also provide an optgroup which has a label and an array of options.
      </p>
      <pre>
        <code class="language-javascript">
          var optgroup = {
            label: 'label', // Required
            selectAll: false, // Optional - default false
            closable: 'off', // Optional - default 'off' - 'off', 'open', 'close'
            options: [] // Required - value is an array of options
          }

          var option = {
            text: 'text', // Required
            value: 'value', // Optional - value will be set by text if not set
            html: '&lt;b&gt;Html&lt;/b&gt;', // Optional - will be used for display purposes if set
            selected: false, // Optional - default is false
            display: true, // Optional - default is true
            disabled: false, // Optional - default is false
            mandatory: false, // Optional - default is false
            placeholder: false, // Optional - default is false
            class: '', // Optional - default is not set
            style: '', // Optional - default is not set
            data: {} // Optional - If you have data attributes
          }
        </code>
      </pre>
    </div>

    <div id="field" class="content">
      <h2 class="header">Data Field</h2>
      <p>
        The data field is an array of options and optgroups. The data field can be used in place of the select element.
        The data field will also be used to update the options in the original select element.
      </p>
      <p>
        The only required field is the text field. The value field will be set to the text field if not set. All other
        fields are optional and have default values if not set.
      </p>

      <div class="row">
        <select ref="dataSingle"></select>
        <select ref="dataMultiple" multiple></select>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#selectElement',
            
            // Options
            data: [
              {text: 'Value 1'},
              {text: 'Value 2'},
              {text: 'Value 3'}
            ],

            // Optgroup
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
    </div>
  </div>
</template>
