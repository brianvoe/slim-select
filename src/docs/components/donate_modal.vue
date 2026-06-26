<script lang="ts">
import { defineComponent } from 'vue'
import DocsModal from '@/docs/components/modal.vue'

const SESSION_KEY = 'ss-donate-shown'
const VISIT_KEY = 'ss-last-visit'
const RETURNING_GAP = 30 * 60 * 1000 // 30 min since last visit = "came back"
const FIRST_VISIT_DELAY = 75_000 // gentle: 75s for a brand-new visitor
const RETURNING_DELAY = 8_000 // returning visitor: nudge sooner

export default defineComponent({
  name: 'DonateModal',
  components: { DocsModal },
  data() {
    return {
      open: false,
      timer: 0 as number
    }
  },
  mounted() {
    const now = Date.now()
    let returning = false
    try {
      const last = Number(localStorage.getItem(VISIT_KEY) || 0)
      returning = last > 0 && now - last > RETURNING_GAP
      localStorage.setItem(VISIT_KEY, String(now))
      if (sessionStorage.getItem(SESSION_KEY)) {
        return // already shown this session
      }
    } catch {
      /* storage blocked — fall through with defaults */
    }

    this.timer = window.setTimeout(
      () => {
        this.open = true
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          /* ignore */
        }
      },
      returning ? RETURNING_DELAY : FIRST_VISIT_DELAY
    )
  },
  unmounted() {
    clearTimeout(this.timer)
  },
  methods: {
    close() {
      this.open = false
    }
  }
})
</script>

<template>
  <DocsModal :open="open" max-width="460px" :show-close="false" @close="close">
    <div class="donate">
      <div class="donate-heart">♥</div>
      <h3 class="donate-title">SlimSelect is built by one developer</h3>
      <p class="donate-copy">
        It's free, open source, and used by thousands of projects — but it's maintained in
        spare time. A small donation keeps the fixes, docs, and new features coming.
      </p>
      <p class="donate-copy donate-copy--soft">If it's saved you time, please consider chipping in.</p>

      <div class="donate-actions">
        <a
          class="donate-btn donate-btn--primary"
          href="https://github.com/sponsors/brianvoe"
          target="_blank"
          rel="noopener"
          @click="close"
        >
          ♥ Sponsor on GitHub
        </a>
        <a
          class="donate-btn donate-btn--coffee"
          href="https://www.buymeacoffee.com/brianvoe"
          target="_blank"
          rel="noopener"
          @click="close"
        >
          ☕ Buy me a coffee
        </a>
      </div>

      <button type="button" class="donate-later" @click="close">Maybe later</button>
    </div>
  </DocsModal>
</template>

<style lang="scss">
.donate {
  padding: var(--spacing-half) var(--spacing-half) var(--spacing);
  text-align: center;
}

.donate-heart {
  margin: 0 auto var(--spacing-half);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: #fff;
  border-radius: 50%;
  background: linear-gradient(135deg, #5897fb 0%, #6366f1 100%);
}

.donate-title {
  margin: 0 0 var(--spacing-quarter);
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
}

.donate-copy {
  margin: 0 auto var(--spacing-quarter);
  max-width: 360px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);

  &--soft {
    font-style: italic;
  }
}

.donate-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-quarter);
  margin: var(--spacing) 0 var(--spacing-half);
}

.donate-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border-radius: var(--border-radius);
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    text-decoration: none;
  }

  &--primary {
    color: #fff;
    background: var(--color-primary);
    box-shadow: 0 8px 20px rgba(88, 151, 251, 0.35);
  }

  &--coffee {
    color: var(--ink);
    background: #ffdd00;
  }
}

.donate-later {
  height: auto;
  padding: 4px 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  background: transparent;
  box-shadow: none;

  &:hover {
    color: var(--ink);
    text-decoration: underline;
  }
}
</style>
