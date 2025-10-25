<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Home',
  data() {
    return {
      single: null as SlimSelect | null,
      multiple: null as SlimSelect | null
    }
  },
  mounted() {
    this.single = new SlimSelect({
      select: this.$refs.slimSingle as HTMLSelectElement
    })
    this.multiple = new SlimSelect({
      select: this.$refs.slimMulti as HTMLSelectElement
    })

    setTimeout(() => {
      if (this.single) {
        this.single.open()
      }
      setTimeout(() => {
        if (this.single) {
          this.single.setSelected('best')
        }
      }, 500)
      setTimeout(() => {
        if (this.single) {
          this.single.setSelected('select')
        }
      }, 1000)
      setTimeout(() => {
        if (this.single) {
          this.single.setSelected('ever')
        }
      }, 1500)
      setTimeout(() => {
        if (this.single) {
          this.single.close()
        }
      }, 2000)

      if (this.multiple) {
        this.multiple.open()
      }
      setTimeout(() => {
        if (this.multiple) {
          this.multiple.setSelected(['best'])
        }
      }, 500)
      setTimeout(() => {
        if (this.multiple) {
          this.multiple.setSelected(['best', 'select'])
        }
      }, 1000)
      setTimeout(() => {
        if (this.multiple) {
          this.multiple.setSelected(['best', 'select', 'ever'])
        }
      }, 1500)
      setTimeout(() => {
        if (this.multiple) {
          this.multiple.close()
        }
      }, 2000)
    }, 500)
  },
  unmounted() {
    if (this.single) {
      this.single.destroy()
    }
    if (this.multiple) {
      this.multiple.destroy()
    }
  },
  methods: {
    handleClick() {
      window.dispatchEvent(new Event('nav-updated'))
    }
  }
})
</script>

<style lang="scss">
#home {
  .title-header {
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    letter-spacing: -0.02em;
    line-height: 1;
    padding: 0 0 var(--spacing) 0;
    color: var(--color-primary);
  }

  .samples {
    position: relative;
    background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border);
    padding: var(--spacing-half);
    overflow: hidden;

    .try-it-out {
      text-align: center;
      color: var(--color-primary);
      font-size: 28px;
      font-weight: 600;
      padding: 0 0 var(--spacing-half) 0;
    }

    .demos {
      .single,
      .multi {
        flex: 1 1 50%;
        background: white;
        padding: var(--spacing-half);

        h3 {
          color: var(--color-primary);
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          padding: 0 0 var(--spacing-quarter) 0;
        }
      }
    }
  }

  .description {
    display: flex;
    text-align: center;
    flex-direction: column;
    gap: var(--spacing);

    .primary {
      font-size: 18px;
      line-height: 1.6;
      color: var(--color-secondary);
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .secondary {
      font-size: 16px;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      color: var(--color-font);
    }
  }

  .benefits {
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing);
      margin-top: var(--spacing);

      .benefit-item {
        padding: var(--spacing);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        background: var(--color-white);
        transition:
          box-shadow 0.3s ease,
          transform 0.3s ease;

        &:hover {
          box-shadow: var(--box-shadow);
          transform: translateY(-5px);
        }

        h3 {
          color: var(--color-primary);
          margin-bottom: var(--spacing-half);
        }

        p {
          margin-bottom: 0;
          color: var(--color-font);
        }
      }
    }
  }

  .use-cases {
    ul {
      list-style: none;
      padding: 0;

      li {
        padding: var(--spacing-half) 0;
        border-bottom: 1px solid var(--color-border);

        &:last-child {
          border-bottom: none;
        }

        strong {
          color: var(--color-primary);
        }
      }
    }
  }

  .support {
    .links {
      display: flex;
      height: 50px;
      flex-direction: row;
      gap: var(--spacing);
      overflow: hidden;

      .github-sponsor {
        height: 100%;
        width: 200px;
        border: 0;
        color-scheme: dark; // Makes iframe background white
      }

      .buycoffee img {
        height: 100%;
        width: auto;
      }
    }
  }

  .ads {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-half);
  }

  .features {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;

    .header {
      padding: 0 0 var(--spacing) 0;
    }

    .row {
      display: flex;
      justify-content: space-around;

      .list {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0px;
        margin: 0 auto;

        li {
          display: flex;
          align-items: center;
          padding: 0 0 5px 0;
          font-weight: bold;
          font-size: 20px;

          img {
            width: 20px;
            padding: 0 8px 0 0;
          }
        }
      }
    }
  }

  .frameworks {
    .framework-items {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing);

      .framework-item {
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          max-width: 100px;
          max-height: 100px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

<template>
  <div id="home" class="contents">
    <div class="content">
      <h1 class="title-header">Advanced Select Dropdown</h1>

      <div class="samples">
        <h2 class="try-it-out">Try It Out</h2>
        <div class="demos row">
          <div class="single">
            <h3>Single Select</h3>
            <select ref="slimSingle" aria-labelledby="sample-select-header">
              <option data-placeholder="true"></option>
              <option value="best">Best</option>
              <option value="select">Select</option>
              <option value="ever">Ever</option>
            </select>
          </div>
          <div class="multi">
            <h3>Multiple Select</h3>
            <select ref="slimMulti" multiple>
              <option value="best">Best</option>
              <option value="select">Select</option>
              <option value="ever">Ever</option>
            </select>
          </div>
        </div>
      </div>

      <div class="description">
        <p class="primary">
          SlimSelect is an advanced, lightweight, and feature-rich select dropdown library for modern web applications.
          Built with vanilla JavaScript and zero dependencies, it provides an exceptional user experience with powerful
          customization options, accessibility support, and seamless integration with Vue and React frameworks.
        </p>
        <p class="secondary">
          Whether you're building a simple contact form or a complex enterprise application, SlimSelect delivers the
          performance, flexibility, and user experience your project demands.
        </p>
      </div>
    </div>

    <div class="features content">
      <h2 class="header">Features</h2>
      <p>
        SlimSelect stands out with its comprehensive feature set, exceptional performance, and developer-friendly API.
      </p>

      <div class="row">
        <ul class="list">
          <li><img src="../assets/images/check-mark.svg" /> No Dependencies</li>
          <li><img src="../assets/images/check-mark.svg" /> Single Select</li>
          <li><img src="../assets/images/check-mark.svg" /> Multiple Select</li>
          <li><img src="../assets/images/check-mark.svg" /> Addable Options</li>
          <li><img src="../assets/images/check-mark.svg" /> Html Options</li>
          <li><img src="../assets/images/check-mark.svg" /> Settable Data</li>
          <li><img src="../assets/images/check-mark.svg" /> Callback Events</li>
          <li><img src="../assets/images/check-mark.svg" /> Placeholders</li>
          <li><img src="../assets/images/check-mark.svg" /> Form Requireds</li>
          <li><img src="../assets/images/check-mark.svg" /> Aria Support</li>
        </ul>
        <ul class="list">
          <li><img src="../assets/images/check-mark.svg" /> Advanced Search</li>
          <li><img src="../assets/images/check-mark.svg" /> Tabbable</li>
          <li><img src="../assets/images/check-mark.svg" /> Disable Options</li>
          <li><img src="../assets/images/check-mark.svg" /> Light Css</li>
          <li><img src="../assets/images/check-mark.svg" /> Light Color Scheme</li>
          <li><img src="../assets/images/check-mark.svg" /> Style Inheritance</li>
          <li><img src="../assets/images/check-mark.svg" /> Clean Animations</li>
          <li><img src="../assets/images/check-mark.svg" /> Performant</li>
          <li><img src="../assets/images/check-mark.svg" /> Typescript</li>
        </ul>
      </div>
    </div>

    <div class="benefits content">
      <h2 class="header">Key Benefits</h2>
      <p>
        SlimSelect is designed with modern web development in mind, offering significant advantages over traditional
        select elements and other dropdown libraries.
      </p>

      <div class="benefits-grid">
        <div class="benefit-item">
          <h3>Lightweight & Fast</h3>
          <p>
            At just a few kilobytes, SlimSelect delivers exceptional performance without compromising on features. Built
            with vanilla JavaScript and zero dependencies.
          </p>
        </div>

        <div class="benefit-item">
          <h3>Accessibility First</h3>
          <p>
            Full ARIA support, keyboard navigation, and screen reader compatibility ensure your dropdowns are accessible
            to all users. Meets WCAG guidelines.
          </p>
        </div>

        <div class="benefit-item">
          <h3>Highly Customizable</h3>
          <p>
            Customize every aspect of your dropdowns with CSS, SCSS variables, and JavaScript configuration. Adapts to
            your design system and requirements.
          </p>
        </div>

        <div class="benefit-item">
          <h3>Developer Friendly</h3>
          <p>
            Comprehensive documentation, TypeScript support, and a clean API make SlimSelect easy to integrate and
            maintain.
          </p>
        </div>
      </div>
    </div>

    <div class="use-cases content">
      <h2 class="header">Perfect For Every Use Case</h2>
      <p>
        SlimSelect is versatile enough to handle any dropdown requirement, from simple contact forms to complex
        enterprise applications.
      </p>

      <ul>
        <li><strong>Contact Forms & Surveys:</strong> Clean, professional dropdowns that enhance user experience</li>
        <li><strong>E-commerce Platforms:</strong> Product filters, category selection, and checkout forms</li>
        <li><strong>Admin Dashboards:</strong> Data filtering, user management, and configuration panels</li>
        <li><strong>Content Management:</strong> Category selection, tag management, and content organization</li>
        <li><strong>Search & Discovery:</strong> Location pickers, service selection, and advanced filtering</li>
        <li><strong>Mobile Applications:</strong> Touch-friendly interfaces optimized for mobile devices</li>
      </ul>
    </div>

    <div class="frameworks content">
      <h2 class="header">Framework Integration</h2>
      <p>
        SlimSelect seamlessly integrates with Vue and React frameworks. We provide dedicated components and integration
        guides to get you up and running quickly with your preferred framework.
      </p>
      <p>
        Our framework integrations maintain the same powerful features and customization options while following
        framework-specific best practices and conventions for optimal performance.
      </p>
      <div class="framework-items">
        <router-link class="framework-item" to="/vue" @click="handleClick">
          <svg viewBox="0 0 128 128">
            <path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"></path>
            <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"></path>
          </svg>
        </router-link>
        <router-link class="framework-item" to="/react" @click="handleClick">
          <svg viewBox="175.7 78 490.6 436.9" xmlns="http://www.w3.org/2000/svg">
            <g fill="#61dafb">
              <path
                d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z"
              />
              <circle cx="420.9" cy="296.5" r="45.7" />
            </g>
          </svg>
        </router-link>
      </div>
    </div>

    <div class="support content">
      <h2 class="header">Support</h2>
      <p>Help support creators that make development easier!</p>
      <div class="links">
        <iframe
          class="github-sponsor"
          src="https://github.com/sponsors/brianvoe/button"
          title="Sponsor brianvoe"
        ></iframe>
        <a class="buycoffee" href="https://www.buymeacoffee.com/brianvoe" target="_blank">
          <img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" />
        </a>
      </div>
    </div>
  </div>
</template>
