<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'GetSelected',
  components: {
    HighlightStyle
  },
  data() {
    return {
      selectedSingle: null as SlimSelect | null,
      selectedSingleValue: [] as string[],
      selectedMultiple: null as SlimSelect | null,
      selectedMultipleValue: [] as string[],
      selectedKeepOrder: null as SlimSelect | null,
      selectedKeepOrderValue: [] as string[]
    }
  },
  mounted() {
    this.selectedSingle = new SlimSelect({
      select: this.$refs.selectedSingle as HTMLSelectElement
    })
    this.selectedMultiple = new SlimSelect({
      select: this.$refs.selectedMultiple as HTMLSelectElement
    })
    this.selectedKeepOrder = new SlimSelect({
      select: this.$refs.selectedKeepOrder as HTMLSelectElement,
      settings: {
        keepOrder: true
      }
    })

    this.selectedKeepOrder!.setSelected(['value3', 'value1'])
  },
  methods: {
    getSelected() {
      this.selectedSingleValue = this.selectedSingle!.getSelected()
      this.selectedMultipleValue = this.selectedMultiple!.getSelected()
      this.selectedKeepOrderValue = this.selectedKeepOrder!.getSelected()
    }
  }
})
</script>

<template>
  <div id="getSelected" class="content">
    <h2 class="header">getSelected</h2>
    <p>
      The getSelected method retrieves the currently selected values from the SlimSelect instance, returning them as an
      array of strings. This is essential for form processing, data validation, and any scenario where you need to
      access the user's current selections programmatically.
    </p>
    <p>
      Whether you're working with single-select or multi-select dropdowns, this method provides a consistent interface
      for accessing selected values, making it easy to integrate SlimSelect with form handling, API calls, or other
      application logic that depends on user selections.
    </p>

    <div class="alert info">
      Whether or not its a single or multiple select, getSelected will always return an array.
    </div>

    <div class="alert">
      <p><strong>Multi-Select Order:</strong></p>
      <ul>
        <li>
          <code>keepOrder: false</code> (default) → Returns in <strong>DOM order</strong> (how options appear in HTML)
        </li>
        <li><code>keepOrder: true</code> → Returns in <strong>selection order</strong> (order you clicked them)</li>
      </ul>
    </div>

    <div class="row">
      <div class="btn" @click="getSelected">Get Selected</div>

      <div>
        <select ref="selectedSingle">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <div class="pad-t-m pad-b-m" v-if="selectedSingleValue.length">
          <b>Single Select Value:</b> {{ selectedSingleValue }}
        </div>
      </div>

      <div>
        <select ref="selectedMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3" selected>Value 3</option>
        </select>
        <div class="pad-t-m pad-b-m" v-if="selectedMultipleValue.length">
          <b>Multi Select Value:</b> {{ selectedMultipleValue }}
        </div>
      </div>

      <div>
        <select ref="selectedKeepOrder" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <div class="pad-t-m pad-b-m" v-if="selectedKeepOrderValue.length">
          <b>Keep Order Value:</b> {{ selectedKeepOrderValue }}
        </div>
      </div>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        var select = new SlimSelect({
          select: '#selectElement'

          // Optional - If you want to keep the order of the selected values
          // settings: { keepOrder: true }
        })
        var values = select.getSelected() // Will return an array of strings
        console.log(values)
      </pre>
    </HighlightStyle>
  </div>
</template>
