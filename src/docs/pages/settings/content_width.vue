<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'ContentWidth',
  components: {
    HighlightStyle
  },
  data() {
    return {
      defaultWidth: null as SlimSelect | null,
      exactWidth: null as SlimSelect | null,
      minWidth: null as SlimSelect | null,
      maxWidth: null as SlimSelect | null
    }
  },
  mounted() {
    // Default: dropdown width matches trigger exactly
    this.defaultWidth = new SlimSelect({
      select: this.$refs.defaultWidth as HTMLSelectElement
    })

    // Exact width: always 300px regardless of trigger
    this.exactWidth = new SlimSelect({
      select: this.$refs.exactWidth as HTMLSelectElement,
      settings: {
        contentWidth: '300px'
      }
    })

    // Min-width: at least 300px, can grow to fit content
    this.minWidth = new SlimSelect({
      select: this.$refs.minWidth as HTMLSelectElement,
      settings: {
        contentWidth: '>300px'
      }
    })

    // Max-width: no wider than 300px, content wraps if longer
    this.maxWidth = new SlimSelect({
      select: this.$refs.maxWidth as HTMLSelectElement,
      settings: {
        contentWidth: '<300px'
      }
    })
  },
  beforeUnmount() {
    this.defaultWidth?.destroy()
    this.exactWidth?.destroy()
    this.minWidth?.destroy()
    this.maxWidth?.destroy()
  }
})
</script>

<style lang="scss">
#contentWidth {
  .side-by-side {
    display: flex;
    gap: var(--spacing);
    flex-wrap: wrap;
  }

  .demo-box {
    flex: 1;
    min-width: 200px;
    padding: var(--spacing);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
  }

  .w-100 {
    width: 100px;
  }

  .form-group {
    margin-bottom: var(--spacing-half);

    label {
      display: block;
      margin-bottom: var(--spacing-quarter);
      font-weight: 600;
    }
  }
}
</style>

<template>
  <div id="contentWidth" class="content">
    <h2 class="header">contentWidth</h2>
    <p>
      The <code>contentWidth</code> setting controls how the dropdown content width is determined.
      By default the dropdown matches the trigger width exactly, which can cause long option text to
      wrap. Use the <code>&gt;</code> and <code>&lt;</code> prefixes to set min or max widths
      instead.
    </p>

    <div class="alert info">
      <p>
        <strong>Syntax:</strong>
        <code>"300px"</code> = exact width,
        <code>"&gt;300px"</code> = min-width (can grow),
        <code>"&lt;300px"</code> = max-width (can shrink).
        Omit the setting for default behavior (match trigger width).
      </p>
    </div>

    <div class="side-by-side">
      <div class="demo-box">
        <h3>Default</h3>
        <p>Width matches trigger. Long options wrap.</p>
        <div class="w-100">
          <div class="form-group">
            <select ref="defaultWidth">
              <option>Option 1</option>
              <option>Option 2 with a long description from backend</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>

      <div class="demo-box">
        <h3>contentWidth: "300px"</h3>
        <p>Exact 300px regardless of trigger width.</p>
        <div class="w-100">
          <div class="form-group">
            <select ref="exactWidth">
              <option>Option 1</option>
              <option>Option 2 with a long description from backend</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>

      <div class="demo-box">
        <h3>contentWidth: "&gt;300px"</h3>
        <p>At least 300px wide, can grow to fit content.</p>
        <div class="w-100">
          <div class="form-group">
            <select ref="minWidth">
              <option>Option 1</option>
              <option>Option 2 with a long description from backend</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>

      <div class="demo-box">
        <h3>contentWidth: "&lt;300px"</h3>
        <p>No wider than 300px, content wraps if longer.</p>
        <div class="w-100">
          <div class="form-group">
            <select ref="maxWidth">
              <option>Option 1</option>
              <option>Option 2 with a long description from backend</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <HighlightStyle language="javascript">
      <pre>
// Default: dropdown width matches trigger (no setting needed)
new SlimSelect({ select: '#select1' })

// Exact width: always 300px
new SlimSelect({
  select: '#select2',
  settings: { contentWidth: '300px' }
})

// Min-width: at least 300px, grows to fit content
new SlimSelect({
  select: '#select3',
  settings: { contentWidth: '>300px' }
})

// Max-width: no wider than 300px
new SlimSelect({
  select: '#select4',
  settings: { contentWidth: '&lt;300px' }
})
      </pre>
    </HighlightStyle>
  </div>
</template>
