<script lang="ts">
import { defineComponent } from 'vue'

/** Vitest unit tests + Playwright e2e — update when the suite grows. */
const TEST_COUNT = 523

type Stat = {
  id: string
  label: string
  value: number | null
  fallback: number
  /** Skip live fetch; use fallback (or fixed value) immediately */
  static?: boolean
  /** Omit trailing "+" on the displayed number */
  plus?: boolean
}

export default defineComponent({
  name: 'UsageStats',
  data() {
    const primaryStats: Stat[] = [
      { id: 'stars', label: 'GitHub stars', value: null, fallback: 3000, plus: true },
      { id: 'npm', label: 'npm downloads / month', value: null, fallback: 250000, plus: true },
      { id: 'cdn', label: 'CDN requests / month', value: null, fallback: 8000000, plus: true }
    ]
    const secondaryStats: Stat[] = [
      {
        id: 'tests',
        label: 'Tests (unit + e2e)',
        value: TEST_COUNT,
        fallback: TEST_COUNT,
        static: true,
        plus: true
      },
      {
        id: 'deps',
        label: 'Dependencies',
        value: 0,
        fallback: 0,
        static: true,
        plus: false
      }
    ]

    return {
      primaryStats,
      secondaryStats,
      animated: {
        stars: 0,
        npm: 0,
        cdn: 0,
        tests: 0,
        deps: 0
      } as Record<string, number>,
      started: false,
      observer: null as IntersectionObserver | null
    }
  },
  computed: {
    allStats(): Stat[] {
      return [...this.primaryStats, ...this.secondaryStats]
    }
  },
  mounted() {
    this.loadStars()
    this.loadNpm()
    this.loadCdn()

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          const instant = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
          this.start(instant)
          this.observer?.disconnect()
          this.observer = null
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
    )
    this.observer.observe(this.$el as Element)
  },
  unmounted() {
    this.observer?.disconnect()
  },
  methods: {
    start(instant = false) {
      if (this.started) {
        return
      }
      this.started = true
      this.allStats.forEach((stat) => {
        const target = stat.value ?? stat.fallback
        if (instant) {
          this.animated[stat.id] = target
        } else {
          this.animateTo(stat.id, target)
        }
      })
    },
    animateTo(id: string, target: number) {
      const from = this.animated[id] ?? 0
      if (target === from) {
        return
      }
      const duration = 1400
      const startTime = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        this.animated[id] = Math.round(from + (target - from) * eased)
        if (t < 1) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    },
    setStat(id: string, value: number) {
      const stat = this.allStats.find((s) => s.id === id)
      if (stat && !stat.static && Number.isFinite(value) && value > 0) {
        stat.value = value
        if (this.started) {
          this.animateTo(id, value)
        }
      }
    },
    async loadStars() {
      try {
        const res = await fetch('https://api.github.com/repos/brianvoe/slim-select')
        if (!res.ok) {
          return
        }
        const data = await res.json()
        this.setStat('stars', data?.stargazers_count)
      } catch {
        /* keep fallback */
      }
    },
    async loadNpm() {
      try {
        const res = await fetch('https://api.npmjs.org/downloads/point/last-month/slim-select')
        if (!res.ok) {
          return
        }
        const data = await res.json()
        this.setStat('npm', data?.downloads)
      } catch {
        /* keep fallback */
      }
    },
    async loadCdn() {
      try {
        const res = await fetch('https://data.jsdelivr.com/v1/stats/packages/npm/slim-select?period=month')
        if (!res.ok) {
          return
        }
        const data = await res.json()
        this.setStat('cdn', data?.hits?.total)
      } catch {
        /* keep fallback */
      }
    },
    format(value: number): string {
      if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1) + 'M'
      }
      if (value >= 1_000) {
        return (value / 1_000).toFixed(value >= 10_000 ? 0 : 1) + 'k'
      }
      return String(value)
    },
    display(stat: Stat): string {
      const value = this.animated[stat.id] ?? 0
      const formatted = this.format(value)
      return stat.plus === false ? formatted : formatted + '+'
    }
  }
})
</script>

<template>
  <section class="usage-stats">
    <p class="usage-eyebrow">Loved by developers</p>
    <h2 class="usage-title">Used in production around the world</h2>

    <div class="usage-pyramid">
      <div class="usage-grid usage-grid--primary">
        <div v-for="stat in primaryStats" :key="stat.id" class="usage-stat">
          <strong>{{ display(stat) }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>

      <div class="usage-grid usage-grid--secondary">
        <div v-for="stat in secondaryStats" :key="stat.id" class="usage-stat">
          <strong>{{ display(stat) }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <p class="usage-foot">Join thousands of developers shipping better dropdowns with SlimSelect.</p>
  </section>
</template>

<style lang="scss">
.usage-stats {
  text-align: center;
}

.usage-eyebrow {
  margin: 0 0 var(--spacing-quarter);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #93c5fd;
}

.usage-title {
  margin: 0 0 var(--spacing);
  font-size: clamp(24px, 3.5vw, 34px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--on-dark);
}

.usage-pyramid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-half);
}

.usage-grid {
  display: grid;
  gap: var(--spacing-half);
  width: 100%;
}

.usage-grid--primary {
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.usage-grid--secondary {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: min(100%, 720px);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.usage-stat {
  padding: var(--spacing);
  border-radius: var(--border-radius);
  background: var(--chrome-fill);
  border: 1px solid var(--chrome-border);

  strong {
    display: block;
    margin-bottom: 6px;
    font-size: clamp(30px, 5vw, 44px);
    font-weight: 800;
    letter-spacing: -0.03em;
    background: linear-gradient(90deg, #ffffff 0%, #93c5fd 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: var(--on-dark-muted);
  }
}

.usage-foot {
  margin: var(--spacing) 0 0;
  font-size: 15px;
  color: var(--on-dark-muted);
}
</style>
