<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'MinMax',
  components: {
    HighlightStyle
  },
  data() {
    return {
      instances: [] as SlimSelect[]
    }
  },
  mounted() {
    this.instances = [
      new SlimSelect({
        select: this.$refs.surveySelect as HTMLSelectElement,
        settings: {
          closeOnSelect: false,
          minSelected: 2,
          maxSelected: 3
        }
      }),
      new SlimSelect({
        select: this.$refs.tagsSelect as HTMLSelectElement,
        settings: {
          closeOnSelect: false,
          maxSelected: 4
        }
      }),
      new SlimSelect({
        select: this.$refs.shiftsSelect as HTMLSelectElement,
        settings: {
          allowDeselect: true,
          closeOnSelect: false,
          minSelected: 2
        }
      })
    ]
  },
  unmounted() {
    this.instances.forEach((instance) => instance.destroy())
    this.instances = []
  }
})
</script>

<style lang="scss">
#minmax {
  .minmax-quick-ref {
    display: grid;
    grid-template-columns: minmax(5rem, auto) 1fr;
    gap: var(--spacing-quarter) var(--spacing-half);
    margin: 0 0 var(--spacing);
    font-size: var(--font-size);

    dt {
      margin: 0;
      font-weight: bold;
    }

    dd {
      margin: 0;
    }

    code {
      white-space: normal;
      overflow-wrap: anywhere;
    }

    @media (max-width: 560px) {
      grid-template-columns: 1fr;
    }
  }

  .minmax-demo {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-quarter);
    margin-bottom: var(--spacing);

    label {
      font-weight: bold;
      font-size: var(--font-size);
    }

    .hint {
      margin: 0;
      font-size: 13px;
      line-height: 1.5;
      opacity: 0.85;
    }

    select,
    .ss-main {
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>

<template>
  <div id="minmax" class="content">
    <h2 class="header">min / max</h2>
    <p>
      Enforce how many options someone can pick in a multi-select — useful for surveys, tag limits, and forms that need
      a valid range before submit.
    </p>

    <dl class="minmax-quick-ref">
      <dt>minSelected</dt>
      <dd>Minimum selections required · default <code>0</code></dd>
      <dt>maxSelected</dt>
      <dd>Maximum selections allowed · default <code>1000</code></dd>
      <dt>At minimum</dt>
      <dd>
        Value remove buttons and clear-all are hidden; users cannot deselect below the minimum from the list or pills
      </dd>
      <dt>Clear-all</dt>
      <dd>
        With <code>allowDeselect</code>, clears down to <code>minSelected</code> (does not wipe past the minimum)
      </dd>
    </dl>

    <h3>Rank your top features (min and max)</h3>
    <p class="hint">
      Survey-style: pick at least 2 and at most 3. Try selecting a fourth — it will not stick. Deselect down to 2 and
      the <strong>×</strong> on each pill disappears until you add another.
    </p>
    <div class="minmax-demo">
      <label for="minmax-survey">What do you like most about SlimSelect?</label>
      <select id="minmax-survey" ref="surveySelect" multiple>
        <option value="search" selected>Fast search</option>
        <option value="keyboard" selected>Keyboard navigation</option>
        <option value="mobile">Mobile friendly</option>
        <option value="a11y">Accessible</option>
        <option value="theming">Easy theming</option>
        <option value="size">Small bundle size</option>
      </select>
    </div>
    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#survey',
          settings: {
            closeOnSelect: false,
            minSelected: 2,
            maxSelected: 3
          }
        })
      </pre>
    </HighlightStyle>

    <h3>Tag a project (max only)</h3>
    <p class="hint">
      Cap how many tags can be added — common for skills, categories, or filters. No minimum; stop at 4 selections.
    </p>
    <div class="minmax-demo">
      <label for="minmax-tags">Skills (up to 4)</label>
      <select id="minmax-tags" ref="tagsSelect" multiple>
        <option value="js" selected>JavaScript</option>
        <option value="ts">TypeScript</option>
        <option value="vue">Vue</option>
        <option value="react">React</option>
        <option value="go">Go</option>
        <option value="python">Python</option>
        <option value="css">CSS</option>
        <option value="rust">Rust</option>
      </select>
    </div>
    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#tags',
          settings: {
            closeOnSelect: false,
            maxSelected: 4
          }
        })
      </pre>
    </HighlightStyle>

    <h3>Pick available shifts (min with clear)</h3>
    <p class="hint">
      Scheduling form: at least 2 days required. <code>allowDeselect</code> is on — use the field-level clear
      button to drop extras while keeping 2, or remove pills until you hit the floor.
    </p>
    <div class="minmax-demo">
      <label for="minmax-shifts">Available days</label>
      <select id="minmax-shifts" ref="shiftsSelect" multiple>
        <option value="mon" selected>Monday</option>
        <option value="tue" selected>Tuesday</option>
        <option value="wed" selected>Wednesday</option>
        <option value="thu" selected>Thursday</option>
        <option value="fri">Friday</option>
        <option value="sat">Saturday</option>
        <option value="sun">Sunday</option>
      </select>
    </div>
    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#shifts',
          settings: {
            allowDeselect: true,
            closeOnSelect: false,
            minSelected: 2
          }
        })
      </pre>
    </HighlightStyle>
  </div>
</template>
