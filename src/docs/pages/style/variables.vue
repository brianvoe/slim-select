<script lang="ts">
import { defineComponent } from 'vue'
import ShikiStyle from '@/docs/components/shiki_style.vue'
import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Variables',
  components: {
    ShikiStyle
  },
  data() {
    return {
      singleSelect: null as SlimSelect | null,
      multiSelect: null as SlimSelect | null,
      variables: {
        primaryColor: '#5897fb',
        bgColor: '#ffffff',
        fontColor: '#4d4d4d',
        borderColor: '#dcdee2',
        borderRadius: '4px',
        mainHeight: '40px',
        contentHeight: '300px',
        searchHeight: '40px',
        optionHeight: 'auto',
        spacingL: '9px',
        spacingM: '7px',
        spacingS: '5px',
        animationTiming: '0.2s'
      }
    }
  },
  mounted() {
    // Create dynamic style element
    const styleElement = document.createElement('style')
    styleElement.id = 'dynamic-variables'
    document.head.appendChild(styleElement)

    // Single select
    this.singleSelect = new SlimSelect({
      select: this.$refs.singleSelect as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
        contentPosition: 'relative',
        contentLocation: this.$refs.singleSelectContent as HTMLElement
      },
      data: [
        { text: 'Single Select Example', value: 'single' },
        { text: 'Customizable Variables', value: 'custom' },
        { text: 'Real-time Updates', value: 'realtime' }
      ]
    })

    // Multi select
    this.multiSelect = new SlimSelect({
      select: this.$refs.multiSelect as HTMLSelectElement,
      settings: {
        alwaysOpen: true,
        contentPosition: 'relative',
        contentLocation: this.$refs.multiSelectContent as HTMLElement
      },
      data: [
        { text: 'Multiple Selection', value: 'multi' },
        { text: 'Interactive Demo', value: 'interactive' },
        { text: 'Variable Showcase', value: 'showcase' }
      ]
    })

    this.updateVariables()
  },
  beforeUnmount() {
    // Clean up dynamic style element
    const styleElement = document.getElementById('dynamic-variables')
    if (styleElement) {
      styleElement.remove()
    }
  },
  methods: {
    updateVariable(variable: string, value: string) {
      this.variables[variable as keyof typeof this.variables] = value
      this.updateVariables()
    },
    handleInputChange(event: Event, variable: string) {
      const target = event.target as HTMLInputElement
      if (target) {
        this.updateVariable(variable, target.value)
      }
    },
    updateVariables() {
      const style = document.getElementById('dynamic-variables') as HTMLStyleElement
      if (!style) return

      style.textContent = `
        .variable-showcase {
          --ss-primary-color: ${this.variables.primaryColor};
          --ss-bg-color: ${this.variables.bgColor};
          --ss-font-color: ${this.variables.fontColor};
          --ss-border-color: ${this.variables.borderColor};
          --ss-border-radius: ${this.variables.borderRadius};
          --ss-main-height: ${this.variables.mainHeight};
          --ss-search-height: ${this.variables.searchHeight};
          --ss-option-height: ${this.variables.optionHeight};
          --ss-content-height: ${this.variables.contentHeight};
          --ss-spacing-l: ${this.variables.spacingL};
          --ss-spacing-m: ${this.variables.spacingM};
          --ss-spacing-s: ${this.variables.spacingS};
          --ss-animation-timing: ${this.variables.animationTiming};
        }
      `
    }
  }
})
</script>

<style lang="scss">
#variables {
  .examples-section {
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: var(--spacing);
    background: var(--color-white);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: var(--spacing);

    h3 {
      margin: 0 0 var(--spacing) 0;
      color: var(--color-primary);
    }

    .row {
      display: flex;
      gap: var(--spacing);
      flex-wrap: wrap;

      .single,
      .multi {
        flex: 1;
        min-width: 200px;

        label {
          display: block;
          margin-bottom: var(--spacing-half);
          font-weight: 600;
          color: var(--color-primary);
        }
      }
    }
  }

  .controls-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-half);

    h3 {
      color: var(--color-primary);
      margin-bottom: var(--spacing-half);
    }

    .control-group-section {
      h4 {
        color: var(--color-primary);
        font-size: 14px;
        font-weight: 600;
        margin-bottom: var(--spacing-half);
      }

      .controls-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--spacing-half);

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 2px;

          label {
            font-weight: 600;
            color: var(--color-font);
            font-size: 12px;
          }

          input {
            padding: 4px 6px;
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius);
            font-size: 12px;
            transition: border-color 0.3s ease;

            &:focus {
              outline: none;
              border-color: var(--color-primary);
              box-shadow: 0 0 0 2px rgba(88, 151, 251, 0.2);
            }

            &[type='color'] {
              height: 25px;
              width: 100%;
              padding: 1px;
              cursor: pointer;
            }
          }

          .default-value {
            font-size: 10px;
            color: var(--color-secondary);
            font-family: monospace;
            background: #e9ecef;
            padding: 1px 3px;
            border-radius: 2px;
            display: inline-block;
            width: fit-content;
          }
        }
      }
    }
  }

  .generated-css {
    margin: 0;

    h3 {
      margin: 0 0 var(--spacing-quarter) 0;
      color: var(--color-primary);
    }
  }
}
</style>

<template>
  <div id="variables" class="content">
    <h2 class="header">CSS Variables</h2>
    <p>
      SlimSelect uses CSS custom properties (variables) that you can easily override to match your website's design
      system. Use the controls below to modify variables in real-time and see the changes applied to the examples.
    </p>

    <!-- Live Examples -->
    <div class="examples-section">
      <div class="row">
        <div class="single">
          <label>Single Select</label>
          <select ref="singleSelect" class="variable-showcase">
            <option data-placeholder="true"></option>
          </select>
          <div ref="singleSelectContent" class="dropdown-content-container"></div>
        </div>
        <div class="multi">
          <label>Multiple Select</label>
          <select ref="multiSelect" class="variable-showcase" multiple>
            <option data-placeholder="true"></option>
          </select>
          <div ref="multiSelectContent" class="dropdown-content-container"></div>
        </div>
      </div>
    </div>

    <!-- Variable Controls -->
    <div class="controls-section">
      <h3>Variable Controls</h3>

      <!-- Colors Group -->
      <div class="control-group-section">
        <h4>Colors</h4>
        <div class="controls-row">
          <div class="control-group">
            <label for="primaryColor">Primary</label>
            <input
              id="primaryColor"
              type="color"
              v-model="variables.primaryColor"
              @input="handleInputChange($event, 'primaryColor')"
            />
            <span class="default-value">Default: #5897fb</span>
          </div>

          <div class="control-group">
            <label for="bgColor">Background</label>
            <input
              id="bgColor"
              type="color"
              v-model="variables.bgColor"
              @input="handleInputChange($event, 'bgColor')"
            />
            <span class="default-value">Default: #ffffff</span>
          </div>

          <div class="control-group">
            <label for="fontColor">Font</label>
            <input
              id="fontColor"
              type="color"
              v-model="variables.fontColor"
              @input="handleInputChange($event, 'fontColor')"
            />
            <span class="default-value">Default: #4d4d4d</span>
          </div>

          <div class="control-group">
            <label for="borderColor">Border</label>
            <input
              id="borderColor"
              type="color"
              v-model="variables.borderColor"
              @input="handleInputChange($event, 'borderColor')"
            />
            <span class="default-value">Default: #dcdee2</span>
          </div>
        </div>
      </div>

      <!-- Heights Group -->
      <div class="control-group-section">
        <h4>Heights</h4>
        <div class="controls-row">
          <div class="control-group">
            <label for="mainHeight">Main</label>
            <input
              id="mainHeight"
              type="text"
              v-model="variables.mainHeight"
              @input="handleInputChange($event, 'mainHeight')"
              placeholder="30px"
            />
            <span class="default-value">Default: 40px</span>
          </div>

          <div class="control-group">
            <label for="contentHeight">Content</label>
            <input
              id="contentHeight"
              type="text"
              v-model="variables.contentHeight"
              @input="handleInputChange($event, 'contentHeight')"
              placeholder="300px"
            />
            <span class="default-value">Default: 300px</span>
          </div>

          <div class="control-group">
            <label for="searchHeight">Search</label>
            <input
              id="searchHeight"
              type="text"
              v-model="variables.searchHeight"
              @input="handleInputChange($event, 'searchHeight')"
              placeholder="30px"
            />
            <span class="default-value">Default: 40px</span>
          </div>

          <div class="control-group">
            <label for="optionHeight">Option</label>
            <input
              id="optionHeight"
              type="text"
              v-model="variables.optionHeight"
              @input="handleInputChange($event, 'optionHeight')"
              placeholder="auto"
            />
            <span class="default-value">Default: auto</span>
          </div>
        </div>
      </div>

      <!-- Spacing Group -->
      <div class="control-group-section">
        <h4>Spacing</h4>
        <div class="controls-row">
          <div class="control-group">
            <label for="spacingL">Large</label>
            <input
              id="spacingL"
              type="text"
              v-model="variables.spacingL"
              @input="handleInputChange($event, 'spacingL')"
              placeholder="7px"
            />
            <span class="default-value">Default: 9px</span>
          </div>

          <div class="control-group">
            <label for="spacingM">Medium</label>
            <input
              id="spacingM"
              type="text"
              v-model="variables.spacingM"
              @input="handleInputChange($event, 'spacingM')"
              placeholder="5px"
            />
            <span class="default-value">Default: 7px</span>
          </div>

          <div class="control-group">
            <label for="spacingS">Small</label>
            <input
              id="spacingS"
              type="text"
              v-model="variables.spacingS"
              @input="handleInputChange($event, 'spacingS')"
              placeholder="3px"
            />
            <span class="default-value">Default: 5px</span>
          </div>
        </div>
      </div>

      <!-- Other Properties -->
      <div class="control-group-section">
        <h4>Other Properties</h4>
        <div class="controls-row">
          <div class="control-group">
            <label for="borderRadius">Border Radius</label>
            <input
              id="borderRadius"
              type="text"
              v-model="variables.borderRadius"
              @input="handleInputChange($event, 'borderRadius')"
              placeholder="4px"
            />
            <span class="default-value">Default: 4px</span>
          </div>

          <div class="control-group">
            <label for="animationTiming">Animation</label>
            <input
              id="animationTiming"
              type="text"
              v-model="variables.animationTiming"
              @input="handleInputChange($event, 'animationTiming')"
              placeholder="0.2s"
            />
            <span class="default-value">Default: 0.2s</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Generated CSS -->
    <div class="generated-css">
      <h3>Generated CSS</h3>
      <ShikiStyle language="css">
        <pre>
          .variable-showcase {
            /* Colors */
            --ss-primary-color: {{ variables.primaryColor }};
            --ss-bg-color: {{ variables.bgColor }};
            --ss-font-color: {{ variables.fontColor }};
            --ss-border-color: {{ variables.borderColor }};
            --ss-border-radius: {{ variables.borderRadius }};

            /* Heights */
            --ss-main-height: {{ variables.mainHeight }};
            --ss-search-height: {{ variables.searchHeight }};
            --ss-option-height: {{ variables.optionHeight }};
            --ss-content-height: {{ variables.contentHeight }};

            /* Spacing */
            --ss-spacing-l: {{ variables.spacingL }};
            --ss-spacing-m: {{ variables.spacingM }};
            --ss-spacing-s: {{ variables.spacingS }};

            /* Other Properties */
            --ss-border-radius: {{ variables.borderRadius }};
            --ss-animation-timing: {{ variables.animationTiming }};
          }
        </pre>
      </ShikiStyle>
    </div>
  </div>
</template>
