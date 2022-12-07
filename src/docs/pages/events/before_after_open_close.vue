<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'BeForeAfterOpenClose',
  data() {
    return {
      beforeAfterOpenCloseSingle: null as SlimSelect | null,
      singleState: '',
      beforeAfterOpenCloseMultiple: null as SlimSelect | null,
      multipleState: '',
    }
  },
  mounted() {
    this.beforeAfterOpenCloseSingle = new SlimSelect({
      select: this.$refs.beforeAfterOpenCloseSingle as HTMLSelectElement,
      events: {
        beforeOpen: () => {
          console.log('before open')
          this.setState('single', 'beforeOpen')
        },
        afterOpen: () => {
          console.log('after open')
          this.setState('single', 'afterOpen')
        },
        beforeClose: () => {
          console.log('before close')
          this.setState('single', 'beforeClose')
        },
        afterClose: () => {
          console.log('after close')
          this.setState('single', 'afterClose')
        },
      },
    })

    this.beforeAfterOpenCloseMultiple = new SlimSelect({
      select: this.$refs.beforeAfterOpenCloseMultiple as HTMLSelectElement,
      events: {
        beforeOpen: () => {
          console.log('before open')
          this.setState('multiple', 'beforeOpen')
        },
        afterOpen: () => {
          console.log('after open')
          this.setState('multiple', 'afterOpen')
        },
        beforeClose: () => {
          console.log('before close')
          this.setState('multiple', 'beforeClose')
        },
        afterClose: () => {
          console.log('after close')
          this.setState('multiple', 'afterClose')
        },
      },
    })
  },
  methods: {
    setState(el: string, state: string) {
      if (el === 'single') {
        this.singleState = state
      } else {
        this.multipleState = state
      }

      // Set timer to clear state
      setTimeout(() => {
        if (el === 'single') {
          this.singleState = ''
        } else {
          this.multipleState = ''
        }
      }, 1000)
    },
  },
})
</script>

<template>
  <div id="open" class="content">
    <h2 class="header">beforeOpen / afterOpen / beforeClose / afterClose</h2>
    <p>
      The beforeOpen, afterOpen, beforeClose, and afterClose events will fire before and after the select is opened and
      closed.
    </p>

    <div class="row">
      <div>
        <div>State: {{ singleState }}</div>
        <select ref="beforeAfterOpenCloseSingle">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>
      <div>
        <div>State: {{ multipleState }}</div>
        <select ref="beforeAfterOpenCloseMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>
    </div>
    <pre>
      <code class="language-javascript">
        var select = new SlimSelect({
          select: '#selectElement',
          events: {
            beforeOpen: () => {
              console.log('before open')
            },
            afterOpen: () => {
              console.log('after open')
            },
            beforeClose: () => {
              console.log('before close')
            },
            afterClose: () => {
              console.log('after close')
            },
          },
        })
      </code>
    </pre>
  </div>
</template>
