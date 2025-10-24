<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'TextOverflow',
  data() {
    return {
      singleConstrained: null as SlimSelect | null,
      placeholderConstrained: null as SlimSelect | null,
      multipleConstrained: null as SlimSelect | null
    }
  },
  mounted() {
    this.placeholderConstrained = new SlimSelect({
      select: this.$refs.placeholderConstrained as HTMLSelectElement
    })
    this.singleConstrained = new SlimSelect({
      select: this.$refs.singleConstrained as HTMLSelectElement
    })
    this.multipleConstrained = new SlimSelect({
      select: this.$refs.multipleConstrained as HTMLSelectElement
    })
  },
  components: {
    ShikiStyle
  }
})
</script>

<style lang="scss">
#textOverflow {
  .constrained-container {
    max-width: 250px;
    margin-bottom: var(--spacing);
    padding: var(--spacing);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
  }

  .form-group {
    margin-bottom: var(--spacing);

    label {
      display: block;
      margin-bottom: var(--spacing-half);
      font-weight: 600;
    }
  }
}
</style>

<template>
  <div id="textOverflow" class="content">
    <h2 class="header">Text Overflow Handling</h2>
    <p>
      This example showcases SlimSelect's intelligent text overflow handling. When text is too long for the available
      space, SlimSelect automatically truncates it with ellipsis (...) while keeping essential UI elements like arrows
      and clear buttons visible. This prevents layout breaking and maintains a clean, professional appearance.
    </p>

    <div class="alert info">
      <p>
        <strong>Feature:</strong> Text automatically truncates with ellipsis when it would overflow, ensuring the
        arrow/deselect buttons remain visible.
      </p>
    </div>

    <h3>Placeholder Text - Constrained Width</h3>
    <div class="constrained-container">
      <div class="form-group">
        <label>Select a very long placeholder option (250px max width)</label>
        <select ref="placeholderConstrained">
          <option value="" data-placeholder="true">
            Please choose from a very long list of available options that might exceed the container width
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
    </div>

    <h3>Single Select - Constrained Width</h3>
    <div class="constrained-container">
      <div class="form-group">
        <label>Country (250px max width)</label>
        <select ref="singleConstrained">
          <option value="short">USA</option>
          <option value="medium">United Kingdom</option>
          <option value="long" selected>Democratic People's Republic of Korea (North Korea)</option>
          <option value="very-long">Lao People's Democratic Republic (Laos) - Southeast Asia</option>
        </select>
      </div>
    </div>
    <h3>Multiple Select - Constrained Width</h3>
    <div class="constrained-container">
      <div class="form-group">
        <label>Features (250px max width)</label>
        <select ref="multipleConstrained" multiple>
          <option value="short" selected>AI</option>
          <option value="medium" selected>Machine Learning</option>
          <option value="long" selected>Natural Language Processing (NLP)</option>
          <option value="very-long" selected>Computer Vision and Image Recognition Systems</option>
          <option value="extremely-long">Deep Learning Neural Network Architecture Optimization</option>
        </select>
      </div>
    </div>

    <h3>HTML</h3>
    <ShikiStyle language="html">
      <pre>
        &lt;div style="max-width: 250px;"&gt;
          &lt;!-- Selected value with long text --&gt;
          &lt;select id="selectElement"&gt;
            &lt;option value="short"&gt;USA&lt;/option&gt;
            &lt;option value="long" selected&gt;
              Democratic People's Republic of Korea (North Korea)
            &lt;/option&gt;
          &lt;/select&gt;
          
          &lt;!-- Placeholder with long text --&gt;
          &lt;select id="placeholderElement"&gt;
            &lt;option value="" selected disabled&gt;
              Please choose from a very long list of available options
            &lt;/option&gt;
            &lt;option value="option1"&gt;Option 1&lt;/option&gt;
          &lt;/select&gt;
        &lt;/div&gt;
      </pre>
    </ShikiStyle>

    <h3>Javascript</h3>
    <ShikiStyle language="javascript">
      <pre>
        // Selected value with long text
        new SlimSelect({
          select: '#selectElement'
        })
        
        // Placeholder with long text
        new SlimSelect({
          select: '#placeholderElement'
        })

        // Text automatically truncates with ellipsis (...)
        // Arrow and deselect buttons remain visible
        // Works for both selected values and placeholders
      </pre>
    </ShikiStyle>

    <div class="alert">
      <p><strong>How it works:</strong></p>
      <ul>
        <li>✅ Long text is truncated with ellipsis (...)</li>
        <li>✅ Arrow and clear buttons stay visible</li>
        <li>✅ No text wrapping or layout breaking</li>
        <li>✅ Works in both single and multi-select modes</li>
        <li>✅ Works for selected values and placeholder text</li>
        <li>✅ Dropdown shows full text when opened</li>
      </ul>
    </div>
  </div>
</template>
