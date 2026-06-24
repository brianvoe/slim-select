<script lang="ts">
import { defineComponent } from 'vue'

let scrollLockCount = 0

function lockScroll() {
  if (scrollLockCount === 0) {
    document.body.style.overflow = 'hidden'
  }
  scrollLockCount++
}

function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1)
  if (scrollLockCount === 0) {
    document.body.style.overflow = ''
  }
}

export default defineComponent({
  name: 'DocsModal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    maxWidth: {
      type: String,
      default: '720px'
    },
    zIndex: {
      type: Number,
      // Above docs nav (100000) and SlimSelect modal (--ss-modal-z-index: 1000001)
      default: 1000002
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true
    },
    closeOnEscape: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close', 'update:open'],
  data() {
    return {
      titleId: `docs-modal-title-${Math.random().toString(36).slice(2, 9)}`
    }
  },
  watch: {
    open: {
      handler(isOpen: boolean) {
        if (this.lockScroll) {
          if (isOpen) {
            lockScroll()
          } else {
            unlockScroll()
          }
        }

        if (this.closeOnEscape) {
          if (isOpen) {
            document.addEventListener('keydown', this.onKeydown)
          } else {
            document.removeEventListener('keydown', this.onKeydown)
          }
        }
      }
    }
  },
  unmounted() {
    document.removeEventListener('keydown', this.onKeydown)
    if (this.open && this.lockScroll) {
      unlockScroll()
    }
  },
  methods: {
    onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape' && this.open) {
        this.close()
      }
    },
    close() {
      this.$emit('close')
      this.$emit('update:open', false)
    },
    onBackdropClick() {
      if (this.closeOnBackdrop) {
        this.close()
      }
    }
  }
})
</script>

<style lang="scss">
.docs-modal-fade-enter-active,
.docs-modal-fade-leave-active {
  transition: opacity 0.22s ease;

  .docs-modal-dialog {
    transition:
      transform 0.22s ease,
      opacity 0.22s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    .docs-modal-dialog {
      transition: none;
    }
  }
}

.docs-modal-fade-enter-from,
.docs-modal-fade-leave-to {
  opacity: 0;

  .docs-modal-dialog {
    opacity: 0;
    transform: scale(0.94) translateY(8px);
  }

  @media (prefers-reduced-motion: reduce) {
    .docs-modal-dialog {
      transform: none;
    }
  }
}

.docs-modal {
  position: fixed;
  inset: 0;
  z-index: 1000002;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing);
  background: rgba(0, 0, 0, 0.55);

  .docs-modal-dialog {
    display: flex;
    flex-direction: column;
    width: min(100%, 720px);
    max-height: min(80vh, 720px);
    background: var(--color-bg, #fff);
    color: var(--color-font, #24292f);
    border: 1px solid var(--color-border, #d0d7de);
    border-radius: var(--border-radius, 8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.28);
    overflow: hidden;
  }

  .docs-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-half);
    padding: var(--spacing-half) var(--spacing);
    border-bottom: 1px solid var(--color-border, #d0d7de);
    background: var(--color-bg-alt, #f6f8fa);

    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
    }
  }

  .docs-modal-header-text {
    flex: 1 1 auto;
    min-width: 0;
  }

  .docs-modal-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    font-size: 22px;
    line-height: 1;
    color: inherit;
    background: transparent;
    border: 1px solid var(--color-border, #d0d7de);
    border-radius: var(--border-radius, 6px);
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .docs-modal-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    padding: var(--spacing-half);

    pre.hljs {
      margin: 0;
    }
  }
}
</style>

<template>
  <Teleport to="body">
    <Transition name="docs-modal-fade" appear>
      <div
        v-if="open"
        class="docs-modal"
        :style="{ zIndex }"
        @click.self="onBackdropClick"
      >
        <div
          class="docs-modal-dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          :style="{ maxWidth }"
        >
          <div v-if="title || $slots.header || showClose" class="docs-modal-header">
            <div class="docs-modal-header-text">
              <slot name="header">
                <h3 v-if="title" :id="titleId">{{ title }}</h3>
              </slot>
            </div>
            <button
              v-if="showClose"
              type="button"
              class="docs-modal-close"
              aria-label="Close"
              @click="close"
            >
              &times;
            </button>
          </div>
          <div class="docs-modal-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
