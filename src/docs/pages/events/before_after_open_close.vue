<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect, { type CloseInfo } from '@/slim-select'

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
      keepOpenOnReclick: false,
      lastCloseInfo: null as CloseInfo | null,
      closeResult: '',
      beforeAfterOpenCloseMultiple: null as SlimSelect | null,
      multipleState: '',
      multipleStateTimeout: null as ReturnType<typeof setTimeout> | null
    }
  },
  computed: {
    closeInfoSummary(): string {
      if (!this.lastCloseInfo) {
        return '—'
      }

      const info = this.lastCloseInfo
      const optionText = info.option?.text ? `, option: "${info.option.text}"` : ''

      return `source: "${info.source}", selectionChanged: ${info.selectionChanged}${optionText}`
    }
  },
  mounted() {
    this.beforeAfterOpenCloseSingle = new SlimSelect({
      select: this.$refs.beforeAfterOpenCloseSingle as HTMLSelectElement,
      events: {
        beforeOpen: () => {
          this.setState('single', 'beforeOpen')
        },
        afterOpen: () => {
          this.setState('single', 'afterOpen')
        },
        beforeClose: (info: CloseInfo) => {
          this.lastCloseInfo = info

          if (
            this.keepOpenOnReclick &&
            info.source === 'select' &&
            !info.selectionChanged
          ) {
            this.closeResult = 'Close blocked — re-clicked the already selected option'
            this.setState('single', 'beforeClose (blocked)')
            return false
          }

          const changed = info.selectionChanged ? 'changed' : 'unchanged'
          this.setState('single', `beforeClose (${info.source}, ${changed})`)

          if (info.source === 'select' && !info.selectionChanged) {
            this.closeResult = 'Dropdown closed — re-clicked the already selected option'
          } else {
            this.closeResult = `Dropdown closed — source: ${info.source}`
          }
        },
        afterClose: () => {
          this.setState('single', 'afterClose')
        }
      }
    })

    this.beforeAfterOpenCloseMultiple = new SlimSelect({
      select: this.$refs.beforeAfterOpenCloseMultiple as HTMLSelectElement,
      events: {
        beforeOpen: () => {
          this.setState('multiple', 'beforeOpen')
        },
        afterOpen: () => {
          this.setState('multiple', 'afterOpen')
        },
        beforeClose: (info: CloseInfo) => {
          const changed = info.selectionChanged ? 'changed' : 'unchanged'
          this.setState('multiple', `beforeClose (${info.source}, ${changed})`)
        },
        afterClose: () => {
          this.setState('multiple', 'afterClose')
        }
      }
    })
  },
  unmounted() {
    this.beforeAfterOpenCloseSingle?.destroy()
    this.beforeAfterOpenCloseMultiple?.destroy()
  },
  methods: {
    setState(el: string, state: string) {
      if (el === 'single') {
        if (this.singleStateTimeout) {
          clearTimeout(this.singleStateTimeout)
          this.singleStateTimeout = null
        }
        this.singleState = state
        this.singleStateTimeout = setTimeout(() => {
          this.singleState = ''
          this.singleStateTimeout = null
        }, 2000)
      } else {
        if (this.multipleStateTimeout) {
          clearTimeout(this.multipleStateTimeout)
          this.multipleStateTimeout = null
        }
        this.multipleState = state
        this.multipleStateTimeout = setTimeout(() => {
          this.multipleState = ''
          this.multipleStateTimeout = null
        }, 2000)
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
      closed. Use them for analytics, loading states, custom animations, or cleanup.
    </p>
    <p>
      <code>beforeClose</code> is unique — it runs <em>before</em> the dropdown closes, receives a
      <code>CloseInfo</code> object describing why the close was requested, and can return <code>false</code> to cancel
      it. By default, re-clicking an already selected option in a single select closes the dropdown. Return
      <code>false</code> from <code>beforeClose</code> to keep the list open instead.
    </p>
    <p>
      <code>CloseInfo</code> fields:
    </p>
    <ul>
      <li><code>source</code> — why the close was requested (<code>select</code>, <code>deselect</code>,
        <code>outside</code>, <code>toggle</code>, <code>escape</code>, <code>tab</code>, <code>modal</code>, or
        <code>api</code>)</li>
      <li><code>selectionChanged</code> — <code>true</code> when this action changes the selection (e.g. picking a new
        value or toggling off in multi-select). <code>false</code> for a single-select re-click on the current value.</li>
      <li><code>option</code> — the clicked option when <code>source</code> is <code>select</code>; omitted for other
        sources. In multi-select this is the click target, not the full selected list — use
        <code>beforeChange</code> / <code>afterChange</code> for the full selection.</li>
    </ul>

    <div class="alert info">
      <strong>Try it on the single select:</strong> "Value 2" is pre-selected. Open the dropdown and click "Value 2"
      again — it closes by default. Enable the checkbox below to block that close and keep browsing.
    </div>

    <label class="before-close-toggle">
      <input v-model="keepOpenOnReclick" type="checkbox" />
      Keep open when re-clicking the selected option
    </label>

    <div class="row">
      <div>
        <div>State: {{ singleState || '—' }}</div>
        <select ref="beforeAfterOpenCloseSingle">
          <option value="value1">Value 1</option>
          <option value="value2" selected>Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <div v-if="closeResult" class="before-close-result">
          <strong>Result:</strong> {{ closeResult }}
        </div>
        <div class="before-close-result muted">
          <strong>Last beforeClose context:</strong> {{ closeInfoSummary }}
        </div>
      </div>
      <div>
        <div>State: {{ multipleState || '—' }}</div>
        <select ref="beforeAfterOpenCloseMultiple" multiple>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </div>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          events: {
            beforeOpen: () => {
              console.log('before open')
            },
            afterOpen: () => {
              console.log('after open')
            },
            beforeClose: (info) => {
              // info.source — why close was requested
              // info.selectionChanged — true when selection changes in this action
              // info.option — clicked option when source is 'select'

              // Keep the list open when re-clicking the current value (single select)
              if (info.source === 'select' && !info.selectionChanged) {
                return false
              }
            },
            afterClose: () => {
              console.log('after close')
            }
          }
        })
      </pre>
    </HighlightStyle>
  </div>
</template>

<style scoped>
.before-close-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
  cursor: pointer;
}

.before-close-result {
  margin-top: 12px;
  padding: 12px;
  border-radius: 6px;
  background: var(--color-background-soft, #f5f5f5);
  font-size: 0.95em;
}

.before-close-result.muted {
  margin-top: 8px;
  opacity: 0.85;
}
</style>
