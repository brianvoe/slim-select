<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '@/docs/components/highlight_style.vue'
import SlimSelect from '@/slim-select'

const menuItems = [
  { label: 'Analytics', value: 'analytics' },
  { label: 'Billing', value: 'billing' },
  { label: 'Team settings', value: 'team' },
  { label: 'Integrations', value: 'integrations' }
]

export default defineComponent({
  name: 'MenuExample',
  components: {
    HighlightStyle
  },
  data() {
    return {
      menuItems,
      open: false,
      slim: null as SlimSelect | null
    }
  },
  mounted() {
    this.$nextTick(() => this.initMenu())
  },
  unmounted() {
    this.slim?.destroy()
    this.slim = null
  },
  methods: {
    initMenu() {
      const group = this.$refs.menuGroup as HTMLElement | undefined
      const select = group?.querySelector('select')
      const content = group?.querySelector<HTMLElement>('.menu-nav-slim-content')
      if (!group || !select || !content) {
        return
      }

      this.slim?.destroy()

      const slim = new SlimSelect({
        select,
        settings: {
          showSearch: false,
          contentLocation: content,
          contentPosition: 'relative',
          contentWidth: '>180px',
          modal: 'off'
        },
        data: [
          { placeholder: true, text: 'Products' },
          ...menuItems.map((item) => ({
            text: item.label,
            value: item.value
          }))
        ],
        events: {
          afterOpen: () => {
            this.open = true
          },
          afterClose: () => {
            this.open = false
          },
          afterChange: (options) => {
            console.log(options[0]?.value)
            slim.setSelected('', false)
          }
        }
      })

      this.slim = slim
    },
    toggleMenu() {
      if (!this.slim) {
        return
      }

      if (this.slim.settings.isOpen) {
        this.slim.close()
      } else {
        this.slim.open()
      }
    }
  }
})
</script>

<style lang="scss">
#menu {
  .menu-demo {
    margin: var(--spacing-half) 0;
    padding: var(--spacing);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--chrome-deep);
  }

  .menu-demo-bar {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .menu-demo-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 32px;
    padding: 0 12px;
    border: 0;
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    color: var(--on-dark-muted);
    background: transparent;
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease;

    &:hover,
    &.menu-demo-trigger[aria-expanded='true'] {
      color: var(--on-dark);
      background: var(--accent);
    }
  }

  .menu-demo-chevron {
    width: 9px;
    height: 9px;

    path {
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  .menu-nav-group {
    position: relative;
    display: inline-flex;
  }

  .menu-nav-slim {
    position: relative;

    /* SlimSelect theme — adjust appearance via variables only */
    --ss-bg-color: #1e293b;
    --ss-border-color: #334155;
    --ss-font-color: #b8c5d6;
    --ss-primary-color: #2d4a63;
    --ss-highlight-color: #ffffff;
    --ss-border-radius: 4px;
    --ss-content-height: auto;
    --ss-option-height: 36px;
    --ss-spacing-s: 4px;
    --ss-spacing-m: 6px;
    --ss-spacing-l: 10px;

    /* Layout — position the content div where SlimSelect mounts the panel */
    .ss-main {
      display: none;
    }

    .menu-nav-slim-content {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: 20;
      width: max-content;
    }
  }
}
</style>

<template>
  <div id="menu" class="content">
    <h2 class="header">Navigation menu</h2>
    <p>
      SlimSelect can power a site navigation dropdown while you keep full control of the trigger button. Call
      <code>open()</code> and <code>close()</code> from your button — SlimSelect handles panel visibility, outside
      clicks, and keyboard-friendly option selection.
    </p>
    <p>
      Style the dropdown by setting SlimSelect CSS variables on <code>.menu-nav-slim</code> — colors, spacing,
      option height, and border radius all come from the standard <code>--ss-*</code> tokens. No extra
      <code>.ss-content</code> or <code>.ss-option</code> overrides are needed.
    </p>
    <p>
      A small amount of layout CSS is still required to hide <code>.ss-main</code> and position the content mount
      point below your custom button.
    </p>
    <p>
      If you do not need a fully custom button, you can skip most of this by styling
      <code>.ss-main</code> directly as your nav link instead of hiding it.
    </p>

    <div class="menu-demo">
      <nav class="menu-demo-bar" aria-label="Demo navigation">
        <a class="menu-demo-link" href="#" @click.prevent>Home</a>
        <div ref="menuGroup" class="menu-nav-group menu-nav-slim">
          <button type="button" class="menu-demo-link menu-demo-trigger" :aria-expanded="open" @click.stop="toggleMenu">
            Products
            <svg class="menu-demo-chevron" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 4l4 4 4-4" />
            </svg>
          </button>
          <select tabindex="-1" aria-hidden="true" aria-label="Products">
            <option value="" disabled selected hidden>Products</option>
            <option v-for="item in menuItems" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
          <div class="menu-nav-slim-content"></div>
        </div>
        <a class="menu-demo-link" href="#" @click.prevent>Pricing</a>
      </nav>
    </div>

    <HighlightStyle language="html">
      <pre>
&lt;div class="menu-nav-slim"&gt;
  &lt;button type="button" class="menu-trigger" aria-expanded="false"&gt;Products&lt;/button&gt;
  &lt;select tabindex="-1" aria-hidden="true"&gt;…&lt;/select&gt;
  &lt;div class="menu-nav-slim-content"&gt;&lt;/div&gt;
&lt;/div&gt;
      </pre>
    </HighlightStyle>

    <HighlightStyle language="javascript">
      <pre>
const group = document.querySelector('.menu-nav-slim')

const slim = new SlimSelect({
  select: group.querySelector('select'),
  settings: {
    showSearch: false,
    contentLocation: group.querySelector('.menu-nav-slim-content'),
    contentPosition: 'relative',
    contentWidth: '&gt;180px',
    modal: 'off'
  },
  data: [
    { placeholder: true, text: 'Products' },
    { text: 'Analytics', value: 'analytics' },
    { text: 'Billing', value: 'billing' }
  ],
  events: {
    afterChange: (options) => {
      console.log(options[0]?.value)
      slim.setSelected('', false)
    }
  }
})

group.querySelector('.menu-trigger').addEventListener('click', (e) => {
  e.stopPropagation()
  slim.settings.isOpen ? slim.close() : slim.open()
})
      </pre>
    </HighlightStyle>

    <HighlightStyle language="css">
      <pre>
/* SlimSelect theme */
.menu-nav-slim {
  --ss-bg-color: #1e293b;
  --ss-border-color: #334155;
  --ss-font-color: #b8c5d6;
  --ss-primary-color: #2d4a63;
  --ss-highlight-color: #ffffff;
  --ss-border-radius: 4px;
  --ss-content-height: auto;
  --ss-option-height: 36px;
  --ss-spacing-s: 4px;
  --ss-spacing-m: 6px;
  --ss-spacing-l: 10px;
}

/* Layout — position the content div where SlimSelect mounts the panel */
.menu-nav-slim {
  position: relative;
}

.menu-nav-slim .ss-main {
  display: none;
}

.menu-nav-slim-content {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 20;
}
      </pre>
    </HighlightStyle>

    <p>
      See also
      <router-link to="/methods#openClose">open / close</router-link>,
      <router-link to="/settings#contentLocation">contentLocation</router-link>, and
      <router-link to="/settings#contentWidth">contentWidth</router-link> for the related settings.
    </p>
  </div>
</template>
