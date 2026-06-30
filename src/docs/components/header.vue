<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '@/slim-select'
import { headerItems, activeHeaderId, type HeaderItem } from '../nav'

export default defineComponent({
  name: 'Header',
  data() {
    return {
      headerItems,
      openId: null as string | null,
      mobileOpen: false,
      navSlims: new Map<string, SlimSelect>()
    }
  },
  computed: {
    activeId(): string | null {
      return activeHeaderId(this.$route.path)
    }
  },
  watch: {
    $route() {
      this.closeAll()
    },
    mobileOpen(open) {
      document.body.style.overflow = open ? 'hidden' : ''
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onKeydown)
    this.$nextTick(() => this.initNavSlims())
  },
  unmounted() {
    document.removeEventListener('keydown', this.onKeydown)
    document.body.style.overflow = ''
    this.destroyNavSlims()
  },
  methods: {
    closeAll() {
      this.navSlims.forEach((slim) => {
        if (slim.settings.isOpen) {
          slim.close()
        }
      })
      this.openId = null
      this.mobileOpen = false
    },
    destroyNavSlims() {
      this.navSlims.forEach((slim) => slim.destroy())
      this.navSlims.clear()
    },
    initNavSlims() {
      this.destroyNavSlims()

      const header = this.$refs.headerEl as HTMLElement | undefined
      if (!header) {
        return
      }

      header.querySelectorAll<HTMLElement>('.nav-slim').forEach((group) => {
        const id = group.dataset.navId
        const select = group.querySelector('select')
        const content = group.querySelector<HTMLElement>('.nav-slim-content')
        if (!id || !select || !content) {
          return
        }

        const item = headerItems.find((entry) => entry.id === id)
        if (!item?.children) {
          return
        }

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
            { placeholder: true, text: item.label },
            ...item.children.map((child) => ({
              text: child.label,
              value: child.path
            }))
          ],
          events: {
            afterOpen: () => {
              this.openId = id
            },
            afterClose: () => {
              if (this.openId === id) {
                this.openId = null
              }
            },
            afterChange: (options) => {
              const path = options[0]?.value
              if (!path || options[0]?.placeholder) {
                return
              }

              slim.setSelected('', false)
              this.$router.push(path)
            }
          }
        })

        this.navSlims.set(id, slim)
      })
    },
    toggleNavMenu(id: string) {
      const slim = this.navSlims.get(id)
      if (!slim) {
        return
      }

      this.navSlims.forEach((other, otherId) => {
        if (otherId !== id && other.settings.isOpen) {
          other.close()
        }
      })

      if (slim.settings.isOpen) {
        slim.close()
      } else {
        slim.open()
      }
    },
    onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.closeAll()
      }
    },
    isActive(item: HeaderItem): boolean {
      return this.activeId === item.id
    }
  }
})
</script>

<style lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  width: 100%;
  background: var(--chrome-bar);
  border-bottom: 1px solid var(--chrome-border);
  overflow: visible;

  .inner {
    display: flex;
    align-items: center;
    gap: var(--spacing-half);
    width: 100%;
    max-width: var(--width-max);
    height: var(--height-header);
    margin: 0 auto;
    padding: 0 var(--spacing-half);
    box-sizing: border-box;
  }

  /* Slim wordmark — gradient clip matches the home hero */
  .logo {
    flex: 0 0 auto;
    font-size: 28px;
    font-weight: 300;
    line-height: 1;
    letter-spacing: 0.02em;
    white-space: nowrap;
    text-decoration: none;
    background: linear-gradient(90deg, #ffffff 0%, #93c5fd 100%);
    background-size: 200% auto;
    background-position: 0% center;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: transform 0.3s ease;

    &:hover {
      animation: header-logo-shimmer 1.4s ease infinite;
      transform: scale(1.04);
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover {
        animation: none;
        transform: none;
        background-position: 100% center;
      }
    }
  }

  @keyframes header-logo-shimmer {
    0%,
    100% {
      background-position: 0% center;
    }

    50% {
      background-position: 100% center;
    }
  }

  .nav {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    gap: 4px;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .nav-group {
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
  }

  .nav-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 32px;
    padding: 0 12px;
    margin: 0;
    border: 0;
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    text-decoration: none;
    color: var(--on-dark-muted);
    background: transparent;
    cursor: pointer;
    box-sizing: border-box;
    vertical-align: middle;
    appearance: none;
    -webkit-appearance: none;
    transition:
      background 0.15s ease,
      color 0.15s ease;

    &[type='button'] {
      min-height: 0;
      min-width: 0;
      overflow: visible;
      text-align: inherit;
    }

    &:hover,
    &.active {
      color: var(--on-dark);
      background: var(--accent);
    }
  }

  .nav-chevron {
    flex: 0 0 auto;
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

  .nav-slim {
    position: relative;
    --ss-bg-color: var(--chrome);
    --ss-border-color: var(--chrome-border);
    --ss-font-color: var(--on-dark-muted);
    --ss-primary-color: var(--accent);
    --ss-highlight-color: var(--on-dark);
    --ss-border-radius: var(--border-radius);
    --ss-content-height: auto;
    --ss-option-height: 36px;
    --ss-spacing-s: 4px;
    --ss-spacing-m: 6px;
    --ss-spacing-l: 10px;

    .ss-main {
      display: none;
    }

    .nav-slim-content {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      z-index: var(--z-mega);
      width: max-content;
    }
  }

  .actions {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: var(--spacing-half);
    margin-left: auto;
  }

  .social {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: var(--border-radius);
    transition:
      background 0.2s ease,
      transform 0.2s ease;

    img {
      height: 26px;
      width: auto;
      transition:
        filter 0.2s ease,
        opacity 0.2s ease;
    }

    &:hover {
      background: var(--chrome-fill);
      transform: translateY(-1px);
    }

    &--github {
      img {
        filter: brightness(0) invert(1);
        opacity: 0.88;
      }

      &:hover img {
        opacity: 1;
        filter: brightness(0) invert(1) drop-shadow(0 0 6px rgba(147, 197, 253, 0.65));
      }
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid var(--chrome-border);
    border-radius: var(--border-radius);
    background: var(--chrome-fill);
    cursor: pointer;

    span {
      display: block;
      width: 18px;
      height: 2px;
      margin: 0 auto;
      border-radius: 1px;
      background: var(--on-dark);
    }

    @media (max-width: 768px) {
      display: flex;
    }
  }

  .mobile {
    position: fixed;
    top: var(--height-header);
    left: 0;
    right: 0;
    bottom: 0;
    z-index: calc(var(--z-header) + 1);
    overflow-y: auto;
    background: var(--chrome-deep);

    @media (min-width: 769px) {
      display: none;
    }

    .mobile-inner {
      max-width: var(--width-max);
      margin: 0 auto;
      padding: var(--spacing-half);
    }

    .mobile-home,
    .mobile-head {
      display: block;
      padding: 12px 12px 6px;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      color: var(--on-dark);
    }

    .mobile-group {
      padding-bottom: var(--spacing-quarter);
      border-bottom: 1px solid var(--chrome-border);

      & + .mobile-group {
        margin-top: var(--spacing-quarter);
      }
    }

    .mobile-link {
      display: block;
      padding: 10px 12px;
      margin-left: var(--spacing-quarter);
      border-radius: var(--border-radius);
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      color: var(--on-dark-muted);

      &:hover,
      &.active {
        color: var(--on-dark);
        background: var(--accent);
      }
    }
  }
}
</style>

<template>
  <header ref="headerEl" class="app-header">
    <div class="inner">
      <router-link class="logo" to="/" @click="closeAll">Slim Select</router-link>

      <nav class="nav" aria-label="Main">
        <template v-for="item in headerItems" :key="item.id">
          <router-link
            v-if="item.path"
            class="nav-item"
            :class="{ active: isActive(item) }"
            :to="item.path"
            @click="closeAll"
          >
            {{ item.label }}
          </router-link>

          <div v-else class="nav-group nav-slim" :data-nav-id="item.id">
            <button
              type="button"
              class="nav-item"
              :class="{ active: isActive(item) || openId === item.id }"
              :aria-expanded="openId === item.id"
              @click.stop="toggleNavMenu(item.id)"
            >
              {{ item.label }}
              <svg class="nav-chevron" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>
            <select :aria-label="item.label" tabindex="-1" aria-hidden="true">
              <option value="" disabled selected hidden>{{ item.label }}</option>
              <option v-for="child in item.children" :key="child.path" :value="child.path">
                {{ child.label }}
              </option>
            </select>
            <div class="nav-slim-content"></div>
          </div>
        </template>
      </nav>

      <div class="actions">
        <a
          class="social social--github"
          href="https://github.com/brianvoe/slim-select"
          target="_blank"
          rel="noopener"
        >
          <img src="../assets/images/github.png" alt="GitHub" />
        </a>
        <a class="social" href="https://www.npmjs.com/package/slim-select" target="_blank" rel="noopener">
          <img src="../assets/images/npm.png" alt="npm" />
        </a>
        <button
          type="button"
          class="hamburger"
          :aria-expanded="mobileOpen"
          aria-label="Toggle menu"
          @click.stop="mobileOpen = !mobileOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="mobile">
      <div class="mobile-inner">
        <router-link class="mobile-home" to="/" @click="closeAll">Home</router-link>
        <div v-for="item in headerItems" :key="item.id" class="mobile-group">
          <router-link v-if="item.path" class="mobile-head" :to="item.path" @click="closeAll">
            {{ item.label }}
          </router-link>
          <template v-else>
            <div class="mobile-head">{{ item.label }}</div>
            <router-link
              v-for="child in item.children"
              :key="child.path"
              class="mobile-link"
              :class="{ active: $route.path === child.path }"
              :to="child.path"
              @click="closeAll"
            >
              {{ child.label }}
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
