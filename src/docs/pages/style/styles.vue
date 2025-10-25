<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '../../components/shiki_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Styles',
  mounted() {
    new SlimSelect({
      select: this.$refs.selectStyle as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
        contentPosition: 'relative',
        contentLocation: this.$refs.selectStyleContent as HTMLElement
      }
    })
    new SlimSelect({
      select: this.$refs.optionStyle as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
        contentPosition: 'relative',
        contentLocation: this.$refs.optionStyleContent as HTMLElement
      }
    })
  },
  components: {
    ShikiStyle
  }
})
</script>

<style lang="scss">
#styles {
  .style-example {
    flex: 1;
    padding: var(--spacing);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: #f8f9fa;

    h3 {
      color: var(--color-primary);
    }
  }
}
</style>

<template>
  <div id="styles" class="content">
    <h2 class="header">inline styles</h2>
    <p>
      SlimSelect automatically inherits any inline styles that were applied to the original select element and its
      options. This ensures that your existing styling, whether applied through inline styles or CSS classes, is
      seamlessly preserved when SlimSelect transforms the element.
    </p>
    <p>
      This feature allows you to apply custom styling directly to your HTML elements and have those styles automatically
      carried over to the enhanced SlimSelect interface, maintaining visual consistency and reducing the need for
      additional CSS modifications.
    </p>

    <div class="row">
      <div class="style-example">
        <h3>Ocean Theme</h3>
        <select
          ref="selectStyle"
          style="
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 16px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          "
        >
          <option
            style="
              background: linear-gradient(135deg, #4facfe, #00f2fe);
              color: white;
              font-weight: bold;
              padding: 8px 12px;
            "
            value="value1"
          >
            Deep Blue
          </option>
          <option
            style="
              background: linear-gradient(135deg, #43e97b, #38f9d7);
              color: white;
              font-weight: bold;
              padding: 8px 12px;
            "
            value="value2"
          >
            Sea Green
          </option>
          <option
            style="
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              font-weight: bold;
              padding: 8px 12px;
            "
            value="value3"
          >
            Ocean Purple
          </option>
        </select>
        <div ref="selectStyleContent" class="dropdown-content-container"></div>
      </div>

      <div class="style-example">
        <h3>Sunset Theme</h3>
        <select
          ref="optionStyle"
          style="
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 12px 16px;
            font-weight: 600;
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
          "
        >
          <option
            style="
              background: linear-gradient(135deg, #ff6b6b, #ee5a24);
              color: white;
              font-weight: bold;
              padding: 8px 12px;
              border-left: 4px solid #c23616;
            "
            value="value1"
          >
            Sunset Orange
          </option>
          <option
            style="
              background: linear-gradient(135deg, #f093fb, #f5576c);
              color: white;
              font-weight: bold;
              padding: 8px 12px;
              border-left: 4px solid #e53e3e;
            "
            value="value2"
          >
            Pink Sunset
          </option>
          <option
            style="
              background: linear-gradient(135deg, #4ecdc4, #44a08d);
              color: white;
              font-weight: bold;
              padding: 8px 12px;
              border-left: 4px solid #2d8659;
            "
            value="value3"
          >
            Teal Horizon
          </option>
        </select>
        <div ref="optionStyleContent" class="dropdown-content-container"></div>
      </div>
    </div>

    <ShikiStyle language="html">
      <pre>
        &lt;!-- Ocean Theme: Complete styling for select and options --&gt;
        &lt;select style="
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 16px;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        "&gt;
          &lt;option style="
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: white;
            font-weight: bold;
            padding: 8px 12px;
          " value="value1"&gt;Deep Blue&lt;/option&gt;
          &lt;option style="
            background: linear-gradient(135deg, #43e97b, #38f9d7);
            color: white;
            font-weight: bold;
            padding: 8px 12px;
          " value="value2"&gt;Sea Green&lt;/option&gt;
          &lt;option style="
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            font-weight: bold;
            padding: 8px 12px;
          " value="value3"&gt;Ocean Purple&lt;/option&gt;
        &lt;/select&gt;

        &lt;!-- Sunset Theme: Complete styling for select and options --&gt;
        &lt;select style="
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 12px 16px;
          font-weight: 600;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
        "&gt;
          &lt;option style="
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            font-weight: bold;
            padding: 8px 12px;
            border-left: 4px solid #c23616;
          " value="value1"&gt;Sunset Orange&lt;/option&gt;
          &lt;option style="
            background: linear-gradient(135deg, #f093fb, #f5576c);
            color: white;
            font-weight: bold;
            padding: 8px 12px;
            border-left: 4px solid #e53e3e;
          " value="value2"&gt;Pink Sunset&lt;/option&gt;
          &lt;option style="
            background: linear-gradient(135deg, #4ecdc4, #44a08d);
            color: white;
            font-weight: bold;
            padding: 8px 12px;
            border-left: 4px solid #2d8659;
          " value="value3"&gt;Teal Horizon&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </ShikiStyle>
  </div>
</template>
