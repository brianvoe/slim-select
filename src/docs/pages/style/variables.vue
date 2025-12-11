<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '@/docs/components/highlight_style.vue'
import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Variables',
  components: {
    HighlightStyle
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
    },
    randomizeVariables() {
      // Color randomizer
      const colors = [
        '#667eea',
        '#764ba2',
        '#f093fb',
        '#f5576c',
        '#4facfe',
        '#00f2fe',
        '#43e97b',
        '#38f9d7',
        '#ff6b6b',
        '#4ecdc4',
        '#45b7d1',
        '#96ceb4',
        '#feca57',
        '#ff9ff3',
        '#54a0ff',
        '#5f27cd',
        '#00d2d3',
        '#ff9f43'
      ]

      // Height randomizer (reasonable ranges)
      const heights = ['25px', '30px', '35px', '40px', '45px', '50px', '55px', '60px']
      const contentHeights = ['200px', '250px', '300px', '350px', '400px', '450px', '500px']

      // Spacing randomizer
      const spacingValues = ['3px', '4px', '5px', '6px', '7px', '8px', '9px', '10px', '12px', '15px']

      // Border radius randomizer
      const borderRadii = ['2px', '4px', '6px', '8px', '10px', '12px', '15px', '20px']

      // Animation timing randomizer
      const timings = ['0.1s', '0.15s', '0.2s', '0.25s', '0.3s', '0.4s', '0.5s', '0.6s']

      // Random selection function
      const randomFrom = (array: string[]) => array[Math.floor(Math.random() * array.length)]

      // Update all variables with random values
      this.variables.primaryColor = randomFrom(colors)
      // this.variables.bgColor = '#ffffff'
      // this.variables.fontColor = randomFrom(['#ffffff', '#000000'])
      this.variables.borderColor = randomFrom(colors)
      this.variables.borderRadius = randomFrom(borderRadii)
      this.variables.mainHeight = randomFrom(heights)
      this.variables.contentHeight = randomFrom(contentHeights)
      this.variables.searchHeight = randomFrom(heights)
      this.variables.optionHeight = randomFrom(['auto', '25px', '30px', '35px', '40px'])
      this.variables.spacingL = randomFrom(spacingValues)
      this.variables.spacingM = randomFrom(spacingValues)
      this.variables.spacingS = randomFrom(spacingValues)
      this.variables.animationTiming = randomFrom(timings)

      // Update the CSS
      this.updateVariables()
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

    .controls-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-half);

      h3 {
        color: var(--color-primary);
      }

      .randomize-btn {
        background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        border: none;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
      }
    }

    .control-group-section {
      h4 {
        color: var(--color-primary);

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
      <div class="controls-header">
        <h3>Variable Controls</h3>
        <button @click="randomizeVariables" class="randomize-btn">🎲 Randomize</button>
      </div>
      <p>
        Make changes to the variables below to see the changes applied to the examples. You can also copy the generated
        CSS below to your own CSS file.
      </p>

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
      <HighlightStyle language="css">
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
      </HighlightStyle>
    </div>
  </div>
</template>
