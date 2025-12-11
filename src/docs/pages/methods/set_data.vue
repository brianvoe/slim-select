<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'SetData',
  components: {
    HighlightStyle
  },
  data() {
    return {
      setDataSingle: null as SlimSelect | null,
      setDataMultiple: null as SlimSelect | null
    }
  },
  mounted() {
    // Set Data
    this.setDataSingle = new SlimSelect({
      select: this.$refs.setDataSingle as HTMLSelectElement,
      events: {
        error: (err: Error) => {
          console.error(err)
        }
      }
    })
    this.setDataMultiple = new SlimSelect({
      select: this.$refs.setDataMultiple as HTMLSelectElement,
      events: {
        error: (err: Error) => {
          console.error(err)
        }
      }
    })
  },
  methods: {
    setData() {
      // Fetch random json array data from gofakeit
      fetch('https://api.gofakeit.com/json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'array',
          rowcount: 10,
          indent: false,
          fields: [
            { name: 'text', function: 'generate', params: { str: '{firstname} {lastname}' } },
            { name: 'selected', function: 'bool' }
          ]
        })
      })
        .then((res) => res.json())
        .then((data) => {
          this.setDataSingle!.setData(data)
          this.setDataMultiple!.setData(data)
        })
        .catch((err) => console.error(err))
    }
  }
})
</script>

<template>
  <div id="setData" class="content">
    <h2 class="header">setData</h2>
    <p>
      The setData method allows you to dynamically update the options available in a SlimSelect instance by providing a
      new array of data objects. This is essential for creating responsive interfaces where the available options change
      based on user interactions, API responses, or other dynamic conditions.
    </p>
    <p>
      When called, this method completely replaces the existing options and re-renders the SlimSelect interface, making
      it perfect for scenarios like dependent dropdowns, filtered lists, or any situation where the available choices
      need to be updated dynamically without recreating the entire component.
    </p>
    <div class="alert info">
      If you use a single select but an option is not selected it will select the first option.
    </div>
    <div class="alert info">
      If you use a single select but pass in data with multiple selected options, the first option will be selected.
    </div>
    <div class="alert info">
      To get a better break down of possible data options see <router-link to="/data#types">data</router-link>
    </div>

    <div class="row">
      <div class="btn" @click="setData">Set Data</div>
      <select ref="setDataSingle"></select>
      <select ref="setDataMultiple" multiple></select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        var select = new SlimSelect({
          select: '#selectElement'
        })

        // Array of objects
        select.setData([
          {text: 'Value 1', value: 'value1'},
          {text: 'Value 2', value: 'value2'},
          {
            label: 'Group 1',
            options: [
              {text: 'Value 3', value: 'value3'},
              {text: 'Value 4', value: 'value4'},
            ]
          }
        ])
      </pre>
    </HighlightStyle>
  </div>
</template>
