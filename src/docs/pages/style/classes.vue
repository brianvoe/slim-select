<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '@/docs/components/shiki_style.vue'
import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Classes',
  components: {
    ShikiStyle
  },
  mounted() {
    new SlimSelect({
      select: this.$refs.selectClass as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
        contentPosition: 'relative',
        contentLocation: this.$refs.selectClassContent as HTMLElement
      }
    })
    new SlimSelect({
      select: this.$refs.optionClass as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
        contentPosition: 'relative',
        contentLocation: this.$refs.optionClassContent as HTMLElement
      }
    })
  }
})
</script>

<style lang="scss">
#classes {
  .select-example {
    flex: 1;
    // min-width: 300px;
    padding: var(--spacing);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: #f8f9fa;

    h3 {
      color: var(--color-primary);
    }
  }

  // Main element class overrides
  .select-class.ss-main {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
  }

  // Option class overrides
  .ss-option {
    &.red {
      color: white;
      background: linear-gradient(135deg, #ff6b6b, #ee5a24);
      font-weight: 600;
      border-left: 4px solid #c23616;

      &:hover {
        background: linear-gradient(135deg, #ff5252, #d63031);
        transform: translateX(5px);
      }
    }

    &.green {
      color: white;
      background: linear-gradient(135deg, #00b894, #00a085);
      font-weight: 600;
      border-left: 4px solid #00a085;

      &:hover {
        background: linear-gradient(135deg, #00a085, #00b894);
        transform: translateX(5px);
      }
    }

    &.blue {
      color: white;
      background: linear-gradient(135deg, #74b9ff, #0984e3);
      font-weight: 600;
      border-left: 4px solid #0984e3;

      &:hover {
        background: linear-gradient(135deg, #0984e3, #74b9ff);
        transform: translateX(5px);
      }
    }
  }
}
</style>

<template>
  <div id="classes" class="content">
    <h2 class="header">CSS Classes</h2>
    <p>
      SlimSelect automatically inherits any CSS classes that were applied to the original select element and its
      options. This seamless inheritance allows you to maintain your existing styling while gaining all the enhanced
      functionality of SlimSelect.
    </p>
    <p>
      This feature ensures that your custom CSS classes, whether applied to the main select element or individual
      options, are preserved and applied to the corresponding SlimSelect elements, making the transition from native
      selects to SlimSelect completely transparent from a styling perspective.
    </p>

    <div class="row">
      <div class="select-example">
        <h3>Main Classes</h3>
        <select ref="selectClass" class="select-class">
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
        <div ref="selectClassContent" class="dropdown-content-container"></div>
      </div>
      <div class="select-example">
        <h3>Option Classes</h3>
        <select ref="optionClass" class="option-class">
          <option class="red" value="value1">Red Option</option>
          <option class="green" value="value2">Green Option</option>
          <option class="blue" value="value3">Blue Option</option>
        </select>
        <div ref="optionClassContent" class="dropdown-content-container"></div>
      </div>
    </div>

    <ShikiStyle language="html">
      <pre>
        &lt;!-- Main element with custom class --&gt;
        &lt;select class="select-class"&gt;
          &lt;option value="value1"&gt;Value 1&lt;/option&gt;
          &lt;option value="value2"&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;

        &lt;!-- Options with individual classes --&gt;
        &lt;select class="option-class"&gt;
          &lt;option class="red" value="value1"&gt;Red Option&lt;/option&gt;
          &lt;option class="green" value="value2"&gt;Green Option&lt;/option&gt;
          &lt;option class="blue" value="value3"&gt;Blue Option&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </ShikiStyle>
  </div>
</template>
