<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Classes',
  components: {
    HighlightStyle
  },
  mounted() {
    // Method 1: Classes on the select element itself (applied to main container)
    new SlimSelect({
      select: this.$refs.selectElementClasses as HTMLSelectElement
    })

    // Method 2: Classes via cssClasses configuration (targeting specific elements)
    new SlimSelect({
      select: this.$refs.cssClassesConfig as HTMLSelectElement,
      cssClasses: {
        option: 'styled-option',
        main: 'styled-main',
        search: 'styled-search'
      }
    })
  }
})
</script>

<style lang="scss">
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--ss-text-color);
  }
}

.method-note {
  font-size: 0.75rem;
  color: var(--ss-text-color);
  opacity: 0.7;
  margin-top: 0.25rem;
  font-style: italic;
}

/* Method 1: Classes applied to main container from select element */
.bordered-select {
  border: 3px solid var(--ss-primary-color) !important;
  box-shadow:
    0 0 0 2px var(--ss-primary-color),
    0 0 0 4px rgba(88, 151, 251, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.2) !important;
  padding: 4px !important;
}

/* Method 2: Classes via cssClasses config - targeting specific elements */
.styled-option {
  padding: 0.75rem 1rem !important;
  border-left: 5px solid var(--ss-primary-color) !important;
  color: var(--ss-primary-color) !important;
  font-weight: 600 !important;
  background: rgba(88, 151, 251, 0.1) !important;
  margin: 2px 0 !important;
  transition: all 0.2s ease !important;

  &:hover {
    background: var(--ss-primary-color) !important;
    color: var(--ss-bg-color) !important;
    transform: translateX(4px) !important;
    box-shadow: -2px 0 12px rgba(88, 151, 251, 0.4) !important;
  }
}

.styled-main {
  border: 3px dashed var(--ss-primary-color) !important;
  padding: 4px !important;
  box-shadow:
    inset 0 0 15px rgba(88, 151, 251, 0.15),
    0 2px 6px rgba(0, 0, 0, 0.15) !important;
  background: rgba(88, 151, 251, 0.03) !important;
}

.styled-search {
  font-weight: 700 !important;
  font-size: 1.1em !important;
  border-bottom: 3px solid var(--ss-primary-color) !important;
  background: rgba(88, 151, 251, 0.08) !important;
  padding: 0.5rem !important;
  box-shadow: 0 2px 6px rgba(88, 151, 251, 0.25) !important;
}
</style>

<template>
  <div id="cssClasses" class="content">
    <h2 class="header">cssClasses</h2>
    <p>
      There are two ways to add custom CSS classes to SlimSelect: by adding classes directly to the original
      <code>&lt;select&gt;</code> element, or by using the <code>cssClasses</code> configuration object. Both methods
      allow you to add additional styling without breaking SlimSelect's core functionality.
    </p>
    <p>
      Classes added to the <code>&lt;select&gt;</code> element are applied to the main SlimSelect container, while the
      <code>cssClasses</code> configuration allows you to target specific elements like options, the main container,
      search input, and more. Your custom classes are appended to SlimSelect's default classes (like 'ss-main',
      'ss-option', etc.), ensuring proper functionality while providing additional styling hooks.
    </p>

    <div class="row">
      <div class="select-wrapper">
        <label>Method 1: Classes on Select Element</label>
        <select ref="selectElementClasses" class="bordered-select">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="cherry">Cherry</option>
          <option value="date">Date</option>
          <option value="elderberry">Elderberry</option>
        </select>
        <p class="method-note">Classes on the select element are applied to the main container</p>
      </div>
      <div class="select-wrapper">
        <label>Method 2: Classes via cssClasses Config</label>
        <select ref="cssClassesConfig">
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
        </select>
        <p class="method-note">cssClasses config targets specific elements (options, main, search, etc.)</p>
      </div>
    </div>

    <h3>Method 1: Classes on the Select Element</h3>
    <p>
      Add classes directly to the <code>&lt;select&gt;</code> element. These classes will be applied to the main
      SlimSelect container (the element with class <code>ss-main</code>).
    </p>
    <HighlightStyle language="html">
      <pre>
        &lt;select id="my-select" class="bordered-select"&gt;
          &lt;option value="apple"&gt;Apple&lt;/option&gt;
          &lt;option value="banana"&gt;Banana&lt;/option&gt;
          &lt;option value="cherry"&gt;Cherry&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </HighlightStyle>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#my-select'
          // Classes from the select element are automatically applied to the main container
          // No cssClasses config needed - classes on select element are used automatically
        })
      </pre>
    </HighlightStyle>

    <HighlightStyle language="css">
      <pre>
        /* This class is applied to the main container (ss-main) */
        .bordered-select {
          border: 3px solid var(--ss-primary-color);
          box-shadow: 0 0 0 2px var(--ss-primary-color),
                      0 0 0 4px rgba(88, 151, 251, 0.2),
                      0 4px 12px rgba(0, 0, 0, 0.2);
          background: rgba(88, 151, 251, 0.05);
          padding: 4px;
        }
      </pre>
    </HighlightStyle>

    <h3>Method 2: Classes via cssClasses Configuration</h3>
    <p>
      Use the <code>cssClasses</code> configuration object to target specific SlimSelect elements. Your custom classes
      are appended to SlimSelect's default classes (e.g., <code>ss-option</code>, <code>ss-main</code>, etc.).
    </p>
    <HighlightStyle language="html">
      <pre>
        &lt;select id="my-select"&gt;
          &lt;option value="red"&gt;Red&lt;/option&gt;
          &lt;option value="green"&gt;Green&lt;/option&gt;
          &lt;option value="blue"&gt;Blue&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </HighlightStyle>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#my-select',
          cssClasses: {
            option: 'styled-option',    // Appended to 'ss-option'
            main: 'styled-main',         // Appended to 'ss-main'
            search: 'styled-search'      // Appended to 'ss-search'
          }
        })
      </pre>
    </HighlightStyle>

    <HighlightStyle language="css">
      <pre>
        /* Classes are appended to default SlimSelect classes */
        /* Result: class="ss-option styled-option" */
        .styled-option {
          padding: 0.75rem 1rem;
          border-left: 5px solid var(--ss-primary-color);
          color: var(--ss-primary-color);
          font-weight: 600;
          background: rgba(88, 151, 251, 0.1);
          margin: 2px 0;
          transition: all 0.2s ease;
        }

        .styled-option:hover {
          background: var(--ss-primary-color);
          color: var(--ss-bg-color);
          transform: translateX(4px);
          box-shadow: -2px 0 12px rgba(88, 151, 251, 0.4);
        }

        /* Result: class="ss-main styled-main" */
        .styled-main {
          border: 3px dashed var(--ss-primary-color);
          padding: 4px;
          box-shadow: inset 0 0 15px rgba(88, 151, 251, 0.15),
                      0 2px 6px rgba(0, 0, 0, 0.15);
          background: rgba(88, 151, 251, 0.03);
        }

        /* Result: class="ss-search styled-search" */
        .styled-search {
          font-weight: 700;
          font-size: 1.1em;
          border-bottom: 3px solid var(--ss-primary-color);
          background: rgba(88, 151, 251, 0.08);
          padding: 0.5rem;
          box-shadow: 0 2px 6px rgba(88, 151, 251, 0.25);
        }
      </pre>
    </HighlightStyle>
  </div>
</template>
