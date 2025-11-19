<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '@/docs/components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Label',
  data() {
    return {
      countryFor: null as SlimSelect | null,
      countryWrap: null as SlimSelect | null,
      countryMultiple: null as SlimSelect | null,
      message: ''
    }
  },
  mounted() {
    this.countryFor = new SlimSelect({
      select: this.$refs.countryFor as HTMLSelectElement
    })
    this.countryWrap = new SlimSelect({
      select: this.$refs.countryWrap as HTMLSelectElement,
      settings: {
        allowDeselect: true
      }
    })
    this.countryMultiple = new SlimSelect({
      select: this.$refs.countryMultiple as HTMLSelectElement
    })
  },
  components: {
    ShikiStyle
  }
})
</script>

<style lang="scss">
#label {
  .label-examples {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-half);

    .example {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-quarter);

      .form-group {
        margin-bottom: var(--spacing-half);

        > label {
          display: block;
          margin-bottom: var(--spacing-quarter);
          font-weight: bold;
          cursor: pointer;

          &:hover {
            color: var(--color-primary);
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="label" class="content">
    <h2 class="header">Label Click Support</h2>
    <p>
      SlimSelect automatically handles label clicks to open the select dropdown. This works with both label association
      methods: using the <code>for</code> attribute or wrapping the select element. Click on any label below to see
      SlimSelect open automatically.
    </p>

    <div class="label-examples">
      <div class="example">
        <h3>Label with "for" Attribute</h3>
        <p>Click the label to open SlimSelect</p>
        <div class="form-group">
          <label for="country-for-label">Select a Country</label>
          <select id="country-for-label" ref="countryFor">
            <option value="">Choose a country...</option>
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="canada">Canada</option>
            <option value="australia">Australia</option>
            <option value="germany">Germany</option>
            <option value="france">France</option>
            <option value="japan">Japan</option>
            <option value="brazil">Brazil</option>
          </select>
        </div>
      </div>

      <div class="example">
        <h3>Wrapped Label</h3>
        <p>Click anywhere on the label text to open SlimSelect</p>
        <div class="form-group">
          <label>
            Select a Country
            <select ref="countryWrap">
              <option value="">Choose a country...</option>
              <option value="usa">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="canada">Canada</option>
              <option value="australia">Australia</option>
              <option value="germany">Germany</option>
              <option value="france">France</option>
              <option value="japan">Japan</option>
              <option value="brazil">Brazil</option>
            </select>
          </label>
        </div>
      </div>

      <div class="example">
        <h3>Multiple Select with Label</h3>
        <p>Works with multiple selects too!</p>
        <div class="form-group">
          <label for="country-multiple-label">Select Multiple Countries</label>
          <select id="country-multiple-label" ref="countryMultiple" multiple>
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="canada">Canada</option>
            <option value="australia">Australia</option>
            <option value="germany">Germany</option>
            <option value="france">France</option>
            <option value="japan">Japan</option>
            <option value="brazil">Brazil</option>
          </select>
        </div>
      </div>

      <div class="info-box">
        <strong>💡 How it works:</strong>
        <p>
          When you click on a label associated with a SlimSelect, it automatically opens the SlimSelect dropdown instead
          of the native browser select. This provides a better user experience and works consistently across all
          browsers, including iOS Safari where native labels can cause issues.
        </p>
      </div>
    </div>

    <h3>HTML</h3>
    <ShikiStyle language="html">
      <pre>
        &lt;!-- Method 1: Label with "for" attribute --&gt;
        &lt;label for="country-select"&gt;Select a Country&lt;/label&gt;
        &lt;select id="country-select"&gt;
          &lt;option value=""&gt;Choose a country...&lt;/option&gt;
          &lt;option value="usa"&gt;United States&lt;/option&gt;
          &lt;option value="uk"&gt;United Kingdom&lt;/option&gt;
        &lt;/select&gt;

        &lt;!-- Method 2: Wrapped label --&gt;
        &lt;label&gt;
          Select a Country
          &lt;select&gt;
            &lt;option value=""&gt;Choose a country...&lt;/option&gt;
            &lt;option value="usa"&gt;United States&lt;/option&gt;
            &lt;option value="uk"&gt;United Kingdom&lt;/option&gt;
          &lt;/select&gt;
        &lt;/label&gt;

        &lt;!-- Works with multiple selects too --&gt;
        &lt;label for="countries-select"&gt;Select Multiple Countries&lt;/label&gt;
        &lt;select id="countries-select" multiple&gt;
          &lt;option value="usa"&gt;United States&lt;/option&gt;
          &lt;option value="uk"&gt;United Kingdom&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </ShikiStyle>
  </div>
</template>
