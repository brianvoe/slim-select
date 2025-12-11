<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '@/docs/components/highlight_style.vue'
import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Classes',
  components: {
    HighlightStyle
  },
  mounted() {
    new SlimSelect({
      select: this.$refs.selectClass as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
        contentPosition: 'relative',
        contentLocation: this.$refs.selectClassContent as HTMLElement,
        showSearch: false
      }
    })
    new SlimSelect({
      select: this.$refs.optionClass as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
        contentPosition: 'relative',
        contentLocation: this.$refs.optionClassContent as HTMLElement,
        showSearch: false
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

  // Forest Theme - Main element
  .forest-main.ss-main {
    background: linear-gradient(135deg, #2d5016, #4a7c59);
    color: white;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(45, 80, 22, 0.4);
    border-left: 4px solid #1a3d0a;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(45, 80, 22, 0.6);
    }
  }

  // Forest Theme - Options
  .ss-option.forest-option {
    color: white;
    background: linear-gradient(135deg, #4a7c59, #6b8e6b);
    font-weight: 600;
    border-left: 4px solid #2d5016;

    &:hover {
      background: linear-gradient(135deg, #5a8c69, #7b9e7b);
      transform: translateX(5px);
    }
  }

  // Fire Theme - Main element
  .fire-main.ss-main {
    background: linear-gradient(135deg, #d63031, #e17055);
    color: white;
    border: none;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(214, 48, 49, 0.4);
    border-left: 4px solid #a71e1e;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(214, 48, 49, 0.6);
    }
  }

  // Fire Theme - Options
  .ss-option.fire-option {
    color: white;
    background: linear-gradient(135deg, #e17055, #fdcb6e);
    font-weight: 600;
    border-left: 4px solid #d63031;

    &:hover {
      background: linear-gradient(135deg, #f1a65a, #fdcb6e);
      transform: translateX(5px);
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
        <h3>Forest Theme</h3>
        <select ref="selectClass" class="forest-main">
          <option class="forest-option" value="value1">Pine Green</option>
          <option class="forest-option" value="value2">Moss Green</option>
          <option class="forest-option" value="value3">Sage Green</option>
        </select>
        <div ref="selectClassContent" class="dropdown-content-container"></div>
      </div>
      <div class="select-example">
        <h3>Fire Theme</h3>
        <select ref="optionClass" class="fire-main">
          <option class="fire-option" value="value1">Flame Red</option>
          <option class="fire-option" value="value2">Ember Orange</option>
          <option class="fire-option" value="value3">Coal Black</option>
        </select>
        <div ref="optionClassContent" class="dropdown-content-container"></div>
      </div>
    </div>

    <HighlightStyle language="html">
      <pre>
        &lt;!-- Forest Theme: Complete styling for select and options --&gt;
        &lt;select class="forest-main"&gt;
          &lt;option class="forest-option" value="value1"&gt;Pine Green&lt;/option&gt;
          &lt;option class="forest-option" value="value2"&gt;Moss Green&lt;/option&gt;
          &lt;option class="forest-option" value="value3"&gt;Sage Green&lt;/option&gt;
        &lt;/select&gt;

        &lt;!-- Fire Theme: Complete styling for select and options --&gt;
        &lt;select class="fire-main"&gt;
          &lt;option class="fire-option" value="value1"&gt;Flame Red&lt;/option&gt;
          &lt;option class="fire-option" value="value2"&gt;Ember Orange&lt;/option&gt;
          &lt;option class="fire-option" value="value3"&gt;Coal Black&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </HighlightStyle>

    <HighlightStyle language="css">
      <pre>
        /* Forest Theme - Main element */
        .forest-main.ss-main {
          background: linear-gradient(135deg, #2d5016, #4a7c59);
          color: white;
          border: none;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(45, 80, 22, 0.4);
          border-left: 4px solid #1a3d0a;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(45, 80, 22, 0.6);
          }
        }

        /* Forest Theme - Options */
        .ss-option.forest-option {
          color: white;
          background: linear-gradient(135deg, #4a7c59, #6b8e6b);
          font-weight: 600;
          border-left: 4px solid #2d5016;

          &:hover {
            background: linear-gradient(135deg, #5a8c69, #7b9e7b);
            transform: translateX(5px);
          }
        }

        /* Fire Theme - Main element */
        .fire-main.ss-main {
          background: linear-gradient(135deg, #d63031, #e17055);
          color: white;
          border: none;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(214, 48, 49, 0.4);
          border-left: 4px solid #a71e1e;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(214, 48, 49, 0.6);
          }
        }

        /* Fire Theme - Options */
        .ss-option.fire-option {
          color: white;
          background: linear-gradient(135deg, #e17055, #fdcb6e);
          font-weight: 600;
          border-left: 4px solid #d63031;

          &:hover {
            background: linear-gradient(135deg, #f1a65a, #fdcb6e);
            transform: translateX(5px);
          }
        }
      </pre>
    </HighlightStyle>
  </div>
</template>
