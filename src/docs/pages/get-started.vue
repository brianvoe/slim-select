<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '@/docs/components/highlight_style.vue'
import SlimSelect from '@/slim-select'

const teamOptions = [
  { value: 'design', text: 'Design' },
  { value: 'engineering', text: 'Engineering' },
  { value: 'product', text: 'Product' },
  { value: 'marketing', text: 'Marketing' },
  { value: 'support', text: 'Support' }
]

export default defineComponent({
  name: 'GetStarted',
  components: {
    HighlightStyle
  },
  data() {
    return {
      instances: [] as SlimSelect[]
    }
  },
  mounted() {
    const add = (config: ConstructorParameters<typeof SlimSelect>[0]) => {
      const instance = new SlimSelect(config)
      this.instances.push(instance)
      return instance
    }

    add({
      select: this.$refs.basic as HTMLSelectElement
    })

    add({
      select: this.$refs.single as HTMLSelectElement
    })

    add({
      select: this.$refs.multi as HTMLSelectElement,
      settings: { closeOnSelect: false }
    })

    add({
      select: this.$refs.dataSelect as HTMLSelectElement,
      data: [{ placeholder: true, text: 'Pick a team…' }, ...teamOptions]
    })

    add({
      select: this.$refs.settingsSelect as HTMLSelectElement,
      settings: {
        placeholderText: 'Choose a team…',
        searchPlaceholder: 'Filter teams…'
      },
      data: [{ placeholder: true, text: 'Choose a team…' }, ...teamOptions]
    })
  },
  unmounted() {
    this.instances.forEach((instance) => instance.destroy())
    this.instances = []
  }
})
</script>

<style lang="scss">
#get-started {
  .demo-block {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-quarter);
    width: 100%;
    min-width: 0;
  }

  .demo-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-primary);
  }

  .see-also {
    margin: 0;
    font-size: 13px;
    color: var(--muted);
  }

  .settings-links {
    margin: 0;
    padding-left: var(--spacing);
    line-height: 1.8;

    a {
      font-weight: 600;
    }
  }

  .next-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-half);
  }

  .next-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: var(--spacing-half);
    border: 1px solid var(--surface-border);
    border-radius: var(--border-radius);
    text-decoration: none;
    color: inherit;
    background: var(--surface-raised);
    transition:
      border-color 0.15s ease,
      transform 0.15s ease,
      box-shadow 0.15s ease;

    &:hover {
      border-color: var(--color-primary);
      box-shadow: var(--shadow);
      transform: translateY(-2px);
    }
  }

  .next-card-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--color-primary);
  }

  .next-card-desc {
    font-size: 13px;
    line-height: 1.45;
    color: var(--muted);
  }
}
</style>

<template>
  <div id="get-started" class="contents">
    <div id="overview" class="content">
      <h2 class="header">Get started</h2>
      <p>
        SlimSelect upgrades a native <code>&lt;select&gt;</code> in one line of
        JavaScript — no framework required. You keep your existing markup, form
        submission, and accessibility; SlimSelect handles the UI.
      </p>
      <p>
        This page covers the smallest path from zero to working dropdown. For
        package managers, CDN tags, and build options, see
        <router-link to="/install">Install</router-link>.
      </p>
    </div>

    <div id="first-select" class="content">
      <h2 class="header">Your first select</h2>
      <p>
        Add a <code>&lt;select&gt;</code> to your page, include the SlimSelect
        script and stylesheet, then pass a CSS selector or element reference to
        the constructor.
      </p>

      <div class="demo-block">
        <label class="demo-label" for="get-started-basic">Department</label>
        <select id="get-started-basic" ref="basic">
          <option value="design">Design</option>
          <option value="engineering">Engineering</option>
          <option value="product">Product</option>
        </select>
      </div>

      <HighlightStyle language="html">
        <pre>
          &lt;select id="department"&gt;
            &lt;option value="design"&gt;Design&lt;/option&gt;
            &lt;option value="engineering"&gt;Engineering&lt;/option&gt;
            &lt;option value="product"&gt;Product&lt;/option&gt;
          &lt;/select&gt;

          &lt;script&gt;
            new SlimSelect({
              select: '#department'
            })
          &lt;/script&gt;
        </pre>
      </HighlightStyle>

      <p class="see-also">
        Using npm or a bundler?
        <code>import SlimSelect from 'slim-select'</code> and
        <code>import 'slim-select/styles'</code> — details on the
        <router-link to="/install">Install</router-link> page.
      </p>
    </div>

    <div id="single-multiple" class="content">
      <h2 class="header">Single &amp; multiple</h2>
      <p>
        Single selects work out of the box. For multi-select, add the
        <code>multiple</code> attribute to your <code>&lt;select&gt;</code> —
        the same constructor handles both.
      </p>

      <div class="row">
        <div class="demo-block">
          <label class="demo-label" for="get-started-single">Single</label>
          <select id="get-started-single" ref="single">
            <option value="design">Design</option>
            <option value="engineering">Engineering</option>
            <option value="product">Product</option>
          </select>
        </div>
        <div class="demo-block">
          <label class="demo-label" for="get-started-multi">Multiple</label>
          <select id="get-started-multi" ref="multi" multiple>
            <option value="design">Design</option>
            <option value="engineering">Engineering</option>
            <option value="product">Product</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>

      <HighlightStyle language="javascript">
        <pre>
          // Single
          new SlimSelect({ select: '#single' })

          // Multiple — same API, add multiple on the &lt;select&gt;
          new SlimSelect({ select: '#multi' })
        </pre>
      </HighlightStyle>

      <p class="see-also">
        Optgroups, pre-selected values, and more examples:
        <router-link to="/selects">Selects</router-link>.
      </p>
    </div>

    <div id="data" class="content">
      <h2 class="header">Options from JavaScript</h2>
      <p>
        Instead of writing <code>&lt;option&gt;</code> tags, pass a
        <code>data</code> array. This is useful for dynamic lists, API
        responses, and placeholders.
      </p>

      <div class="demo-block">
        <label class="demo-label" for="get-started-data">Team</label>
        <select id="get-started-data" ref="dataSelect"></select>
      </div>

      <HighlightStyle language="javascript">
        <pre>
          new SlimSelect({
            select: '#team',
            data: [
              { placeholder: true, text: 'Pick a team…' },
              { value: 'design', text: 'Design' },
              { value: 'engineering', text: 'Engineering' },
              { value: 'product', text: 'Product' }
            ]
          })
        </pre>
      </HighlightStyle>

      <p class="see-also">
        Full data shape (optgroups, HTML options, disabled rows):
        <router-link to="/data">Data</router-link>.
      </p>
    </div>

    <div id="settings" class="content">
      <h2 class="header">Customize behavior</h2>
      <p>
        Pass a <code>settings</code> object to tune placeholders, search, modal
        mode, and dozens of other behaviors without touching the DOM structure.
      </p>

      <div class="demo-block">
        <label class="demo-label" for="get-started-settings"
          >Team (searchable)</label
        >
        <select id="get-started-settings" ref="settingsSelect"></select>
      </div>

      <HighlightStyle language="javascript">
        <pre>
          new SlimSelect({
            select: '#team',
            settings: {
              placeholderText: 'Choose a team…',
              searchPlaceholder: 'Filter teams…'
            },
            data: [/* … */]
          })
        </pre>
      </HighlightStyle>

      <ul class="settings-links">
        <li>
          <router-link to="/settings#placeholder">placeholderText</router-link>
          — empty-state label
        </li>
        <li>
          <router-link to="/settings#showSearch">showSearch</router-link> —
          filter long lists
        </li>
        <li>
          <router-link to="/settings#modal">modal</router-link> — full-screen
          picker (new in v4)
        </li>
        <li>
          <router-link to="/settings">All settings →</router-link>
        </li>
      </ul>
    </div>

    <div id="next-steps" class="content">
      <h2 class="header">Next steps</h2>
      <p>Once the basics are working, explore the rest of the docs:</p>

      <div class="next-grid">
        <router-link class="next-card" to="/install">
          <span class="next-card-title">Install</span>
          <span class="next-card-desc">npm, CDN, and download options</span>
        </router-link>
        <router-link class="next-card" to="/usage">
          <span class="next-card-title">Usage</span>
          <span class="next-card-desc">Real-world patterns and edge cases</span>
        </router-link>
        <router-link class="next-card" to="/style">
          <span class="next-card-title">Style</span>
          <span class="next-card-desc">CSS variables and theming</span>
        </router-link>
        <router-link class="next-card" to="/events">
          <span class="next-card-title">Events</span>
          <span class="next-card-desc">Hooks for change, search, and more</span>
        </router-link>
        <router-link class="next-card" to="/methods">
          <span class="next-card-title">Methods</span>
          <span class="next-card-desc"
            >Programmatic open, setSelected, destroy</span
          >
        </router-link>
        <router-link class="next-card" to="/vue">
          <span class="next-card-title">Vue &amp; React</span>
          <span class="next-card-desc">Official framework wrappers</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
