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

const menuSettings = {
  showSearch: false,
  alwaysOpen: true,
  closeOnSelect: true,
  allowDeselect: false,
  contentPosition: 'relative' as const,
  contentWidth: '>180px',
  modal: 'off' as const
}

export default defineComponent({
  name: 'MenuExample',
  components: {
    HighlightStyle
  },
  data() {
    return {
      menuItems,
      open: false,
      selected: '',
      slim: null as SlimSelect | null
    }
  },
  mounted() {
    document.addEventListener('click', this.onDocumentClick)
    document.addEventListener('keydown', this.onKeydown)
    this.$nextTick(() => this.initMenu())
  },
  unmounted() {
    document.removeEventListener('click', this.onDocumentClick)
    document.removeEventListener('keydown', this.onKeydown)
    this.slim?.destroy()
    this.slim = null
  },
  methods: {
    initMenu() {
      const root = this.$refs.menuRoot as HTMLElement | undefined
      const select = root?.querySelector('select')
      const content = root?.querySelector<HTMLElement>('.menu-nav-slim-content')
      if (!select || !content) {
        return
      }

      this.slim?.destroy()

      const slim = new SlimSelect({
        select,
        settings: {
          ...menuSettings,
          placeholderText: 'Products',
          contentLocation: content
        },
        data: [
          { placeholder: true, text: 'Products' },
          ...menuItems.map((item) => ({
            text: item.label,
            value: item.value
          }))
        ],
        events: {
          afterChange: (options) => {
            const value = options[0]?.value
            if (!value || options[0]?.placeholder) {
              return
            }

            slim.setSelected('', false)
            this.selected = menuItems.find((item) => item.value === value)?.label ?? value
            this.open = false
          }
        }
      })

      this.slim = slim
    },
    toggleMenu() {
      this.open = !this.open
    },
    onDocumentClick(event: MouseEvent) {
      const root = this.$refs.menuRoot as HTMLElement | undefined
      if (root && !root.contains(event.target as Node)) {
        this.open = false
      }
    },
    onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.open = false
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

  .menu-demo-result {
    margin: var(--spacing-half) 0 0;
    font-size: 14px;
    color: var(--on-dark-muted);

    strong {
      color: var(--on-dark);
    }
  }

  .menu-nav-group {
    position: relative;
    display: inline-flex;
  }

  .menu-nav-slim {
    --ss-bg-color: var(--chrome);
    --ss-border-color: var(--chrome-border);
    --ss-font-color: var(--on-dark-muted);
    --ss-primary-color: var(--accent);
    --ss-highlight-color: var(--on-dark);
    --ss-content-height: auto;
    --ss-option-height: 36px;
    --ss-spacing-l: 10px;

    > select,
    .ss-main {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      border: 0;
      opacity: 0;
      pointer-events: none;
    }

    .menu-nav-slim-content {
      display: none;
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: 20;
      width: max-content;
      border-radius: var(--border-radius);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
    }
  }

  .menu-demo.is-open .menu-nav-slim-content {
    display: block;
  }
}
</style>

<template>
  <div id="menu" class="content">
    <h2 class="header">Navigation menu</h2>
    <p>
      SlimSelect can power a site navigation dropdown while you keep full control of the trigger button. The select
      provides keyboard-friendly options and routing hooks; your button toggles when the panel is visible.
    </p>
    <p>
      Style the dropdown with CSS variables on the wrapper — set <code>--ss-bg-color</code>,
      <code>--ss-primary-color</code>, <code>--ss-option-height</code>, and related tokens once, then add a small amount
      of structural CSS for the panel layout and trigger hiding.
    </p>
    <p>
      If you do not need a fully custom button, you can skip most of this by styling
      <code>.ss-main</code> directly as your nav link instead of hiding it.
    </p>

    <div ref="menuRoot" class="menu-demo" :class="{ 'is-open': open }">
      <nav class="menu-demo-bar" aria-label="Demo navigation">
        <a class="menu-demo-link" href="#" @click.prevent>Home</a>
        <div class="menu-nav-group menu-nav-slim">
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

      <p v-if="selected" class="menu-demo-result">
        Navigated to <strong>{{ selected }}</strong>
      </p>
    </div>

    <HighlightStyle language="html">
      <pre>
&lt;div class="menu-nav-slim" data-open="false"&gt;
  &lt;button type="button" class="menu-trigger" aria-expanded="false"&gt;Products&lt;/button&gt;
  &lt;select tabindex="-1" aria-hidden="true"&gt;…&lt;/select&gt;
  &lt;div class="menu-nav-slim-content"&gt;&lt;/div&gt;
&lt;/div&gt;
      </pre>
    </HighlightStyle>

    <HighlightStyle language="javascript">
      <pre>
const menuSettings = {
  showSearch: false,
  alwaysOpen: true,
  closeOnSelect: true,
  allowDeselect: false,
  contentPosition: 'relative',
  contentWidth: '&gt;180px',
  modal: 'off'
}

const group = document.querySelector('.menu-nav-slim')
const slim = new SlimSelect({
  select: group.querySelector('select'),
  settings: {
    ...menuSettings,
    placeholderText: 'Products',
    contentLocation: group.querySelector('.menu-nav-slim-content')
  },
  data: [
    { placeholder: true, text: 'Products' },
    { text: 'Analytics', value: 'analytics' },
    { text: 'Billing', value: 'billing' }
  ],
  events: {
    afterChange: (options) => {
      const value = options[0]?.value
      if (!value || options[0]?.placeholder) return
      slim.setSelected('', false)
      window.location.href = '/app/' + value
      group.dataset.open = 'false'
    }
  }
})

group.querySelector('.menu-trigger').addEventListener('click', (e) => {
  e.stopPropagation()
  group.dataset.open = group.dataset.open === 'true' ? 'false' : 'true'
})
      </pre>
    </HighlightStyle>

    <HighlightStyle language="css">
      <pre>
.menu-nav-slim {
  position: relative;
  --ss-bg-color: #1e293b;
  --ss-border-color: rgba(255, 255, 255, 0.12);
  --ss-font-color: rgba(255, 255, 255, 0.72);
  --ss-primary-color: rgba(88, 151, 251, 0.22);
  --ss-content-height: auto;
  --ss-option-height: 36px;
  --ss-spacing-l: 10px;
}

.menu-nav-slim > select,
.menu-nav-slim .ss-main {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  opacity: 0;
  pointer-events: none;
}

.menu-nav-slim-content {
  display: none;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 20;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.menu-nav-slim[data-open='true'] .menu-nav-slim-content {
  display: block;
}
      </pre>
    </HighlightStyle>

    <p>
      See also
      <router-link to="/settings#alwaysOpen">alwaysOpen</router-link>,
      <router-link to="/settings#contentLocation">contentLocation</router-link>, and
      <router-link to="/settings#contentWidth">contentWidth</router-link> for the related settings.
    </p>
  </div>
</template>
