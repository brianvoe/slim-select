<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

const GROUND_LABELS = ['Ground', 'Ground (3–5 days)']

export default defineComponent({
  name: 'NativeChanges',
  components: {
    HighlightStyle
  },
  data() {
    return {
      slim: null as SlimSelect | null,
      overnightHidden: false,
      expressDisabled: false,
      groundLabelIndex: 0,
      hasPickup: false
    }
  },
  computed: {
    groundLabel(): string {
      return GROUND_LABELS[this.groundLabelIndex]
    }
  },
  mounted() {
    this.slim = new SlimSelect({
      select: this.$refs.nativeSelect as HTMLSelectElement
    })
  },
  unmounted() {
    this.slim?.destroy()
    this.slim = null
  },
  methods: {
    nativeSelect(): HTMLSelectElement {
      return this.$refs.nativeSelect as HTMLSelectElement
    },
    optionById(id: string): HTMLOptionElement | null {
      return this.nativeSelect().querySelector(`#${id}`)
    },
    toggleOvernight() {
      const option = this.optionById('native-overnight')
      if (!option) {
        return
      }

      this.overnightHidden = !this.overnightHidden
      option.hidden = this.overnightHidden
    },
    toggleExpress() {
      const option = this.optionById('native-express')
      if (!option) {
        return
      }

      this.expressDisabled = !this.expressDisabled
      option.disabled = this.expressDisabled
    },
    renameGround() {
      const option = this.optionById('native-ground')
      if (!option) {
        return
      }

      this.groundLabelIndex = (this.groundLabelIndex + 1) % GROUND_LABELS.length
      option.text = this.groundLabel
    },
    addPickup() {
      if (this.hasPickup || this.optionById('native-pickup')) {
        this.hasPickup = true
        return
      }

      const option = document.createElement('option')
      option.id = 'native-pickup'
      option.value = 'pickup'
      option.textContent = 'Store pickup'
      this.nativeSelect().appendChild(option)
      this.hasPickup = true
    },
    removePickup() {
      this.optionById('native-pickup')?.remove()
      this.hasPickup = false
    }
  }
})
</script>

<style lang="scss">
#nativeChanges {
  .native-demo {
    display: flex;
    flex-direction: column;
    gap: var(--spacing);
    margin-bottom: var(--spacing);

    .form-group {
      max-width: 28rem;

      label {
        display: block;
        margin-bottom: var(--spacing-quarter);
        font-weight: 600;
      }
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-quarter);

      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  .cases {
    margin: 0 0 var(--spacing);
    padding-left: 1.25rem;

    li {
      margin: var(--spacing-quarter) 0;
    }
  }
}
</style>

<template>
  <div id="nativeChanges" class="content">
    <h2 class="header">Native select changes</h2>
    <p>
      SlimSelect attaches a <code>MutationObserver</code> to the original <code>&lt;select&gt;</code> (including its
      <code>&lt;option&gt;</code> and <code>&lt;optgroup&gt;</code> children). When those nodes change, the dropdown
      updates on its own — no <code>setData()</code>, no extra watchers.
    </p>
    <p>
      Use that when something else owns the native select: a form library, server-rendered HTML, or a bit of DOM code.
    </p>

    <ul class="cases">
      <li><strong>Hide / show</strong> an option that is not offered in this region with <code>option.hidden</code></li>
      <li>
        <strong>Disable</strong> an option that should stay listed but unselectable, such as out of stock, with
        <code>option.disabled</code>
      </li>
      <li><strong>Rename</strong> a label when an ETA, price, or count changes with <code>option.text</code></li>
      <li>
        <strong>Add / remove</strong> options when another field changes with <code>appendChild</code> or
        <code>option.remove()</code>
      </li>
    </ul>

    <div class="native-demo">
      <div class="form-group">
        <label for="native-change-select">Delivery method</label>
        <select id="native-change-select" ref="nativeSelect">
          <option id="native-ground" value="ground">Ground</option>
          <option id="native-express" value="express">Express</option>
          <option id="native-overnight" value="overnight">Overnight</option>
        </select>
      </div>
      <div class="actions">
        <button type="button" class="btn" @click="toggleOvernight">
          {{ overnightHidden ? 'Show Overnight' : 'Hide Overnight' }}
        </button>
        <button type="button" class="btn" @click="toggleExpress">
          {{ expressDisabled ? 'Enable Express' : 'Disable Express' }}
        </button>
        <button type="button" class="btn" @click="renameGround">Rename Ground</button>
        <button type="button" class="btn" @click="addPickup" :disabled="hasPickup">Add Store pickup</button>
        <button type="button" class="btn" @click="removePickup" :disabled="!hasPickup">Remove Store pickup</button>
      </div>
    </div>

    <h3>Javascript</h3>
    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#delivery'
        })

        // Hide / show — not offered in this region
        document.getElementById('overnight').hidden = true

        // Disable — still listed, but not selectable
        document.getElementById('express').disabled = true

        // Rename — live label (ETA, price, count)
        document.getElementById('ground').text = 'Ground (3–5 days)'

        // Add
        const pickup = document.createElement('option')
        pickup.id = 'pickup'
        pickup.value = 'pickup'
        pickup.textContent = 'Store pickup'
        document.getElementById('delivery').appendChild(pickup)

        // Remove
        document.getElementById('pickup').remove()
      </pre>
    </HighlightStyle>

    <div class="alert info">
      <p>
        The observer watches attributes and child lists on the select. Changing <code>hidden</code>,
        <code>disabled</code>, <code>text</code>, or adding/removing options is enough. SlimSelect methods
        (<code>setData</code>, <code>setSelected</code>) are still the right API when you already hold a SlimSelect
        instance.
      </p>
    </div>
  </div>
</template>
