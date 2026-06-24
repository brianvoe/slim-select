<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'
import type { ModalSetting } from '@/slim-select'

export default defineComponent({
  name: 'Modal',
  components: {
    HighlightStyle
  },
  data() {
    return {
      modal: 'on' as ModalSetting,
      slimSmall: null as SlimSelect | null,
      slimLarge: null as SlimSelect | null,
      smallOptions: [
        { value: 'apple', text: 'Apple' },
        { value: 'banana', text: 'Banana' },
        { value: 'cherry', text: 'Cherry' }
      ],
      largeOptions: Array.from({ length: 50 }, (_, i) => ({
        value: `value${i + 1}`,
        text: `Value ${i + 1}`
      }))
    }
  },
  mounted() {
    this.createSlim()
  },
  unmounted() {
    if (this.slimSmall) {
      this.slimSmall.destroy()
    }
    if (this.slimLarge) {
      this.slimLarge.destroy()
    }
  },
  methods: {
    createSlim() {
      if (this.slimSmall) {
        this.slimSmall.destroy()
      }
      if (this.slimLarge) {
        this.slimLarge.destroy()
      }

      const settings = { modal: this.modal }

      this.slimSmall = new SlimSelect({
        select: this.$refs.modalSelectSmall as HTMLSelectElement,
        settings
      })

      this.slimLarge = new SlimSelect({
        select: this.$refs.modalSelectLarge as HTMLSelectElement,
        settings
      })
    },
    setModal(value: ModalSetting) {
      this.modal = value
      this.createSlim()
    }
  }
})
</script>

<style lang="scss">
#modal {
  .modal-demo {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-quarter);
    align-items: flex-start;
    width: 100%;

    .highlight-style {
      align-self: stretch;
      width: 100%;
      max-width: 100%;
    }
  }

  .modal-selects {
    width: 100%;

    .modal-select-field {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-quarter);

      label {
        font-weight: bold;
        font-size: var(--font-size);
      }

      select,
      .ss-main {
        width: 100%;
        max-width: 100%;
      }
    }
  }

  .modal-controls {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-quarter);

    button {
      margin: 0;
      padding: var(--spacing-quarter) var(--spacing-half);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      background: var(--color-background);
      color: var(--color-font);
      font-size: var(--font-size);
      line-height: 1.2;
      cursor: pointer;

      &.active {
        border-color: var(--color-primary);
        color: var(--color-primary);
        font-weight: bold;
      }
    }
  }

  .modal-quick-ref {
    display: grid;
    grid-template-columns: minmax(5rem, auto) 1fr;
    gap: var(--spacing-quarter) var(--spacing-half);
    margin: 0;
    font-size: var(--font-size);

    dt {
      margin: 0;
      font-weight: bold;
    }

    dd {
      margin: 0;
    }

    code {
      white-space: nowrap;
    }
  }
}
</style>

<template>
  <div id="modal" class="content">
    <h2 class="header">modal</h2>
    <p>
      Open the option list as a centered modal with backdrop instead of a dropdown. Useful on small screens, but can be
      forced on or off.
    </p>

    <dl class="modal-quick-ref">
      <dt>Values</dt>
      <dd><code>off</code> · <code>on</code> · <code>mobile</code></dd>
      <dt>Default</dt>
      <dd><code>mobile</code> — modal below 768px viewport width</dd>
      <dt>Close</dt>
      <dd>X button, backdrop click, or Escape · page scroll locked while open</dd>
      <dt>Title</dt>
      <dd>Associated <code>&lt;label&gt;</code> text — override with <code>modalTitle</code></dd>
      <dt>Size</dt>
      <dd>
        <code>--ss-modal-width</code> (min(90vw, 400px)),
        <code>--ss-modal-height</code> (85vh)
      </dd>
    </dl>

    <div class="modal-demo">
      <div class="modal-controls">
        <button
          type="button"
          :class="{ active: modal === 'off' }"
          @click="setModal('off')"
        >
          off
        </button>
        <button
          type="button"
          :class="{ active: modal === 'on' }"
          @click="setModal('on')"
        >
          on
        </button>
        <button
          type="button"
          :class="{ active: modal === 'mobile' }"
          @click="setModal('mobile')"
        >
          mobile
        </button>
      </div>

      <div class="modal-selects row">
        <div class="modal-select-field">
          <label for="modal-select-small">Small list (3 options)</label>
          <select id="modal-select-small" ref="modalSelectSmall">
            <option data-placeholder="true"></option>
            <option
              v-for="option in smallOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>

        <div class="modal-select-field">
          <label for="modal-select-large">Large list (50 options)</label>
          <select id="modal-select-large" ref="modalSelectLarge">
            <option data-placeholder="true"></option>
            <option
              v-for="option in largeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>

      <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#selectElement',
          settings: {
            modal: 'mobile' // 'off' | 'on' | 'mobile'
          }
        })
      </pre>
      </HighlightStyle>
    </div>
  </div>
</template>
