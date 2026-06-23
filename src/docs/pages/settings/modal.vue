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
      modal: 'mobile' as ModalSetting,
      slim: null as SlimSelect | null
    }
  },
  mounted() {
    this.createSlim()
  },
  unmounted() {
    if (this.slim) {
      this.slim.destroy()
    }
  },
  methods: {
    createSlim() {
      if (this.slim) {
        this.slim.destroy()
      }

      this.slim = new SlimSelect({
        select: this.$refs.modalSelect as HTMLSelectElement,
        settings: { modal: this.modal }
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
  .modal-controls {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-half);
    margin: 0 0 var(--spacing);

    button {
      padding: var(--spacing-half) var(--spacing);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      background: var(--color-background);
      color: var(--color-font);
      cursor: pointer;

      &.active {
        border-color: var(--color-primary);
        color: var(--color-primary);
        font-weight: bold;
      }
    }
  }
}
</style>

<template>
  <div id="modal" class="content">
    <h2 class="header">modal</h2>
    <p>
      The modal setting controls whether SlimSelect opens as a traditional dropdown or as a centered modal dialog with a
      backdrop. Modal mode is ideal on smaller screens where a full dropdown panel can feel cramped.
    </p>
    <p>
      When modal mode is active, the option list opens in a centered card (max-width 400px) over a semi-transparent
      backdrop. Close via the X button, clicking the backdrop, or pressing Escape. Page scrolling is locked while the
      modal is open.
    </p>
    <p>Values: <strong>"off"</strong> | <strong>"on"</strong> | <strong>"mobile"</strong></p>
    <p>Default: <strong>"mobile"</strong> (modal below 768px viewport width, dropdown at or above)</p>

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

    <div class="row">
      <select ref="modalSelect">
        <option data-placeholder="true"></option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
        <option value="date">Date</option>
        <option value="elderberry">Elderberry</option>
        <option value="fig">Fig</option>
        <option value="grape">Grape</option>
        <option value="honeydew">Honeydew</option>
      </select>
    </div>
    <br />

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
</template>
