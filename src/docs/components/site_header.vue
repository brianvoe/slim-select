<script lang="ts">
import { defineComponent } from 'vue'
import { headerItems, activeHeaderId, type HeaderItem } from '../nav'

export default defineComponent({
  name: 'SiteHeader',
  data() {
    return {
      headerItems,
      openId: null as string | null,
      mobileOpen: false,
      hoverCloseTimer: 0 as number
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
    document.addEventListener('click', this.onDocumentClick)
  },
  unmounted() {
    document.removeEventListener('keydown', this.onKeydown)
    document.removeEventListener('click', this.onDocumentClick)
    window.clearTimeout(this.hoverCloseTimer)
    document.body.style.overflow = ''
  },
  methods: {
    closeAll() {
      this.openId = null
      this.mobileOpen = false
      window.clearTimeout(this.hoverCloseTimer)
    },
    openDropdown(item: HeaderItem) {
      window.clearTimeout(this.hoverCloseTimer)
      this.openId = item.id
    },
    scheduleCloseDropdown() {
      window.clearTimeout(this.hoverCloseTimer)
      this.hoverCloseTimer = window.setTimeout(() => {
        this.openId = null
      }, 140)
    },
    onGroupFocusOut(event: FocusEvent) {
      const group = event.currentTarget as HTMLElement
      const next = event.relatedTarget as Node | null
      if (!next || !group.contains(next)) {
        this.scheduleCloseDropdown()
      }
    },
    onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.closeAll()
      }
    },
    onDocumentClick(event: MouseEvent) {
      const el = this.$refs.headerEl as HTMLElement | undefined
      if (el && !el.contains(event.target as Node)) {
        this.openId = null
      }
    },
    isActive(item: HeaderItem): boolean {
      return this.activeId === item.id || this.openId === item.id
    }
  }
})
</script>

<template>
  <header ref="headerEl" class="site-header">
    <div class="site-header-inner">
      <router-link class="site-logo" to="/" @click="closeAll">Slim Select</router-link>

      <nav class="site-nav" aria-label="Main">
        <template v-for="item in headerItems" :key="item.id">
          <!-- Direct link -->
          <router-link
            v-if="item.path"
            class="site-nav-item"
            :class="{ active: isActive(item) }"
            :to="item.path"
            @click="closeAll"
          >
            {{ item.label }}
          </router-link>

          <!-- Dropdown trigger -->
          <div
            v-else
            class="site-nav-group"
            @mouseenter="openDropdown(item)"
            @mouseleave="scheduleCloseDropdown"
            @focusin="openDropdown(item)"
            @focusout="onGroupFocusOut"
          >
            <button
              type="button"
              class="site-nav-item"
              :class="{ active: isActive(item) }"
              :aria-expanded="openId === item.id"
            >
              {{ item.label }}
              <svg class="site-nav-chevron" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>

            <div v-if="openId === item.id" class="site-dropdown">
              <router-link
                v-for="child in item.children"
                :key="child.path"
                class="site-dropdown-link"
                :to="child.path"
                @click="closeAll"
              >
                {{ child.label }}
              </router-link>
            </div>
          </div>
        </template>
      </nav>

      <div class="site-header-actions">
        <a
          class="site-social site-social--github"
          href="https://github.com/brianvoe/slim-select"
          target="_blank"
          rel="noopener"
        >
          <img src="../assets/images/github.png" alt="GitHub" />
        </a>
        <a class="site-social" href="https://www.npmjs.com/package/slim-select" target="_blank" rel="noopener">
          <img src="../assets/images/npm.png" alt="npm" />
        </a>
        <button
          type="button"
          class="site-hamburger"
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

    <!-- Mobile sheet -->
    <div v-if="mobileOpen" class="site-mobile">
      <div class="site-mobile-inner">
        <router-link class="site-mobile-home" to="/" @click="closeAll">Home</router-link>
        <div v-for="item in headerItems" :key="item.id" class="site-mobile-group">
          <router-link
            v-if="item.path"
            class="site-mobile-head"
            :to="item.path"
            @click="closeAll"
          >
            {{ item.label }}
          </router-link>
          <template v-else>
            <div class="site-mobile-head">{{ item.label }}</div>
            <router-link
              v-for="child in item.children"
              :key="child.path"
              class="site-mobile-link"
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

<style lang="scss">
.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  width: 100%;
  background: var(--chrome-bar);
  border-bottom: 1px solid var(--chrome-border);
}

.site-header-inner {
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
.site-logo {
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
    animation: site-logo-shimmer 1.4s ease infinite;
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

@keyframes site-logo-shimmer {
  0%,
  100% {
    background-position: 0% center;
  }

  50% {
    background-position: 100% center;
  }
}

.site-nav {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    display: none;
  }
}

.site-nav-group {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;

  // Bridge the gap so the pointer can reach the dropdown without closing.
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 10px;
  }
}

.site-nav-item {
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

.site-nav-chevron {
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

/* Compact dropdown anchored under its trigger */
.site-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: var(--z-mega);
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 100%;
  width: max-content;
  padding: 4px;
  background: var(--chrome);
  border: 1px solid var(--chrome-border);
  border-radius: var(--border-radius);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
  animation: site-dropdown-in 0.14s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}

@keyframes site-dropdown-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.site-dropdown-link {
  padding: 7px 10px;
  border-radius: var(--border-radius);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  color: var(--on-dark-muted);
  white-space: nowrap;

  &:hover {
    color: var(--on-dark);
    background: var(--accent);
  }

  &.active {
    color: var(--on-dark);
    background: var(--accent-strong);
  }
}

.site-header-actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: var(--spacing-half);
  margin-left: auto;
}

.site-social {
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
    transition: filter 0.2s ease, opacity 0.2s ease;
  }

  &:hover {
    background: var(--chrome-fill);
    transform: translateY(-1px);
  }

  &--github img {
    filter: brightness(0) invert(1);
    opacity: 0.88;
  }

  &--github:hover img {
    opacity: 1;
    filter: brightness(0) invert(1) drop-shadow(0 0 6px rgba(147, 197, 253, 0.65));
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.site-hamburger {
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

/* Mobile sheet */
.site-mobile {
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
}

.site-mobile-inner {
  max-width: var(--width-max);
  margin: 0 auto;
  padding: var(--spacing-half);
}

.site-mobile-home,
.site-mobile-head {
  display: block;
  padding: 12px 12px 6px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  color: var(--on-dark);
}

.site-mobile-group {
  padding-bottom: var(--spacing-quarter);
  border-bottom: 1px solid var(--chrome-border);

  & + .site-mobile-group {
    margin-top: var(--spacing-quarter);
  }
}

.site-mobile-link {
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
</style>
