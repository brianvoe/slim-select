<script lang="ts">
import download from 'downloadjs'
import { defineComponent } from 'vue'
import HighlightStyle from '@/docs/components/highlight_style.vue'

type CdnProvider = 'jsdelivr' | 'unpkg' | 'cdnjs'

const cdnProviders: Record<
  CdnProvider,
  {
    name: string
    description: string
    browseUrl: string
    jsUrl: string
    cssUrl: string
    note?: string
  }
> = {
  jsdelivr: {
    name: 'jsDelivr',
    description: 'Fast, reliable CDN with npm and GitHub support.',
    browseUrl: 'https://www.jsdelivr.com/package/npm/slim-select',
    jsUrl: 'https://cdn.jsdelivr.net/npm/slim-select@latest/dist/slimselect.js',
    cssUrl: 'https://cdn.jsdelivr.net/npm/slim-select@latest/dist/slimselect.css'
  },
  unpkg: {
    name: 'unpkg',
    description: 'CDN for everything on npm, served directly from the registry.',
    browseUrl: 'https://unpkg.com/browse/slim-select/dist/',
    jsUrl: 'https://unpkg.com/slim-select@latest/dist/slimselect.js',
    cssUrl: 'https://unpkg.com/slim-select@latest/dist/slimselect.css'
  },
  cdnjs: {
    name: 'cdnjs',
    description: 'Community-powered CDN hosted by Cloudflare.',
    browseUrl: 'https://cdnjs.com/libraries/slim-select',
    jsUrl: 'https://cdnjs.cloudflare.com/ajax/libs/slim-select/2.13.1/slimselect.min.js',
    cssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/slim-select/2.13.1/slimselect.min.css',
    note: 'cdnjs indexes releases manually — check the library page for the latest available version.'
  }
}

export default defineComponent({
  name: 'Install',
  components: {
    HighlightStyle
  },
  data() {
    return {
      activeCdn: 'jsdelivr' as CdnProvider,
      cdnProviders,
      codepenUrl: 'https://codepen.io/brianvoe/pen/MWXqXXV',
      codepenEmbedUrl: 'https://codepen.io/brianvoe/embed/MWXqXXV?default-tab=result&height=400&theme-id=light'
    }
  },
  computed: {
    activeProvider() {
      return this.cdnProviders[this.activeCdn]
    },
    cdnExampleHtml() {
      const { jsUrl, cssUrl } = this.activeProvider

      return `<html>
  <head>
    <script src="${jsUrl}"><\/script>
    <link href="${cssUrl}" rel="stylesheet">
  </head>
  <body>
    <select id="selectElement">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
    <script>
      new SlimSelect({
        select: '#selectElement'
      })
    <\/script>
  </body>
</html>`
    }
  },
  methods: {
    downloadJs() {
      download(this.cdnProviders.jsdelivr.jsUrl)
    },
    downloadCss() {
      download(this.cdnProviders.jsdelivr.cssUrl)
    },
    setActiveCdn(provider: string) {
      this.activeCdn = provider as CdnProvider
    }
  }
})
</script>

<style lang="scss">
#install {
  .download-btns {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-half);

    .btn {
      flex: 1 1 auto;
    }
  }

  #cdn {
    .cdn-providers {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 13.75rem), 1fr));
      gap: var(--spacing-half);
    }

    .cdn-provider-col {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-quarter);
      min-width: 0;
    }

    .cdn-provider {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: var(--spacing-quarter);
      width: 100%;
      min-width: 0;
      height: auto;
      min-height: 0;
      padding: var(--spacing-half);
      border: 2px solid var(--color-border);
      border-radius: var(--border-radius);
      background: var(--color-white);
      cursor: pointer;
      text-align: left;
      font: inherit;
      color: inherit;
      box-sizing: border-box;
      white-space: normal;
      overflow: hidden;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;

      &:hover {
        box-shadow: var(--box-shadow);
        transform: translateY(-2px);
      }

      &.active {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 1px var(--color-primary);
      }

      .cdn-provider-name {
        width: 100%;
        min-width: 0;
        color: var(--color-primary);
        font-size: 18px;
        font-weight: 700;
        margin: 0;
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      .cdn-provider-description {
        width: 100%;
        min-width: 0;
        margin: 0;
        font-size: 13px;
        line-height: 1.5;
        color: var(--color-secondary);
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
    }

    .cdn-provider-link {
      font-size: 13px;
      font-weight: 600;
      padding: 0 var(--spacing-quarter);
    }

    .cdn-example-header {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-quarter);
      padding: var(--spacing-half) 0 0 0;

      h3 {
        margin: 0;
        color: var(--color-primary);
        font-size: 18px;
        font-weight: 600;
      }

      p {
        margin: 0;
      }
    }

    .cdn-files {
      padding: var(--spacing-half);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      background: #fafbfc;

      h3 {
        margin: 0 0 var(--spacing-quarter) 0;
        color: var(--color-primary);
        font-size: 16px;
        font-weight: 600;
      }

      ul {
        margin: 0;
        padding-left: var(--spacing);
        line-height: 1.7;
      }
    }

    .codepen-section {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-half);
      padding: var(--spacing);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      background: linear-gradient(135deg, #fafbfc 0%, #f0f4ff 100%);

      .codepen-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-half);

        h3 {
          margin: 0;
          color: var(--color-primary);
          font-size: 18px;
          font-weight: 600;
        }

        .btn {
          flex: 0 0 auto;
          text-decoration: none;
        }
      }

      p {
        margin: 0;
      }

      .codepen-embed {
        width: 100%;
        max-width: 100%;
        min-height: 320px;
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        background: var(--color-white);
        box-sizing: border-box;

        @media (max-width: 768px) {
          min-height: 280px;
        }
      }
    }
  }
}
</style>

<template>
  <div id="install" class="contents">
    <div id="npm" class="content">
      <h2 class="header">Npm</h2>
      <p>Most common usage is npm</p>

      <HighlightStyle language="bash">
        <pre>
          npm install slim-select
        </pre>
      </HighlightStyle>

      <HighlightStyle language="javascript">
        <pre>
          import SlimSelect from 'slim-select'

          // optional - import styles
          import 'slim-select/styles' // css
          import 'slim-select/scss' // scss

          new SlimSelect({
            select: '#selectElement'
          })
        </pre>
      </HighlightStyle>
    </div>

    <div id="cdn" class="content">
      <h2 class="header">Cdn</h2>
      <p>
        Include SlimSelect directly in your HTML with a script and stylesheet tag. Choose a CDN provider below to see
        the matching URLs and a ready-to-use example.
      </p>

      <div class="cdn-providers">
        <div v-for="(provider, key) in cdnProviders" :key="key" class="cdn-provider-col">
          <button
            type="button"
            class="cdn-provider"
            :class="{ active: activeCdn === key }"
            @click="setActiveCdn(key)"
          >
            <h3 class="cdn-provider-name">{{ provider.name }}</h3>
            <p class="cdn-provider-description">{{ provider.description }}</p>
          </button>
          <a class="cdn-provider-link" :href="provider.browseUrl" target="_blank" rel="noopener noreferrer">
            Browse files &rarr;
          </a>
        </div>
      </div>

      <div class="cdn-example-header">
        <h3>Quick Start</h3>
        <p>
          Example using <strong>{{ activeProvider.name }}</strong
          >.
          <span v-if="activeProvider.note">{{ activeProvider.note }}</span>
        </p>
      </div>

      <HighlightStyle :key="activeCdn" language="html">
        <pre>{{ cdnExampleHtml }}</pre>
      </HighlightStyle>

      <div class="cdn-files">
        <h3>Available Files</h3>
        <ul>
          <li><code>slimselect.js</code> — UMD minified (default)</li>
          <li><code>slimselect.es.js</code> — ES module build for modern browsers</li>
          <li><code>slimselect.cjs.js</code> — CommonJS build for Node.js</li>
          <li><code>slimselect.iife.js</code> — IIFE build for direct browser usage</li>
          <li><code>*.js.map</code> — Source maps for debugging (included automatically)</li>
        </ul>
      </div>

      <div class="alert info">New releases may be delayed until the next time a CDN indexes the package.</div>

      <div class="codepen-section">
        <div class="codepen-header">
          <h3>Live Example</h3>
          <a class="btn" :href="codepenUrl" target="_blank" rel="noopener noreferrer">Open in CodePen</a>
        </div>
        <p>
          Fork and experiment with SlimSelect in the browser. This CodePen is a great starting point for bug reports and
          quick prototypes.
        </p>
        <iframe
          class="codepen-embed"
          title="SlimSelect CodePen Example"
          :src="codepenEmbedUrl"
          loading="lazy"
          allowtransparency="true"
          allowfullscreen="true"
        ></iframe>
      </div>
    </div>

    <div id="download" class="content">
      <h2 class="header">Download</h2>
      <p>Download the latest minified umd version of slim select</p>
      <p>
        Files are served from
        <a target="_blank" href="https://www.jsdelivr.com/package/npm/slim-select" rel="noopener noreferrer"
          >jsDelivr</a
        >. Browse the package for other builds and versions.
      </p>
      <div class="rows download-btns">
        <div class="btn" @click="downloadJs()">Download js</div>
        <div class="btn" @click="downloadCss()">Download css</div>
      </div>
    </div>
  </div>
</template>
