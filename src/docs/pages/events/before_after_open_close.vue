<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'BeForeAfterOpenClose',
  components: {
    HighlightStyle
  },
  data() {
    return {
      beforeAfterOpenCloseSingle: null as SlimSelect | null,
      singleState: '',
      singleStateTimeout: null as ReturnType<typeof setTimeout> | null,
      beforeAfterOpenCloseMultiple: null as SlimSelect | null,
      multipleState: '',
      multipleStateTimeout: null as ReturnType<typeof setTimeout> | null
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
        }
      }
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
        }
      }
    })
  },
  methods: {
    setState(el: string, state: string) {
      if (el === 'single') {
        // Clear any pending timeout
        if (this.singleStateTimeout) {
          clearTimeout(this.singleStateTimeout)
          this.singleStateTimeout = null
        }
        this.singleState = state
        // Set timer to clear state
        this.singleStateTimeout = setTimeout(() => {
          this.singleState = ''
          this.singleStateTimeout = null
        }, 1000)
      } else {
        // Clear any pending timeout
        if (this.multipleStateTimeout) {
          clearTimeout(this.multipleStateTimeout)
          this.multipleStateTimeout = null
        }
        this.multipleState = state
        // Set timer to clear state
        this.multipleStateTimeout = setTimeout(() => {
          this.multipleState = ''
          this.multipleStateTimeout = null
        }, 1000)
      }
    }
  }
})
</script>

<template>
  <div id="open" class="content">
    <h2 class="header">beforeOpen / afterOpen / beforeClose / afterClose</h2>
    <p>
      These events provide fine-grained control over the dropdown's open and close lifecycle. The beforeOpen and
      afterOpen events fire when the dropdown is being opened, while beforeClose and afterClose fire when it's being
      closed.
    </p>
    <p>
      These events are perfect for implementing custom animations, loading states, analytics tracking, or any UI
      behavior that needs to respond to the dropdown's visibility changes. You can use them to show/hide other elements,
      trigger animations, or perform cleanup operations.
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
    <HighlightStyle language="javascript">
      <pre>
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
      </pre>
    </HighlightStyle>
  </div>
</template>
