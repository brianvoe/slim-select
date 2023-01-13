<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../slim-select'

export default defineComponent({
  name: 'Home',
  data() {
    return {
      single: null as SlimSelect | null,
      multiple: null as SlimSelect | null,
    }
  },
  mounted() {
    this.single = new SlimSelect({
      select: this.$refs.slimSingle as HTMLSelectElement,
    })
    this.multiple = new SlimSelect({
      select: this.$refs.slimMulti as HTMLSelectElement,
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
})
</script>

<style lang="scss">
#home {
  .samples {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing);

    .single {
      flex: 1 1 50%;
    }
    .multi {
      flex: 1 1 50%;
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
      justify-content: space-around;

      .list {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding: 0px;
        width: 200px;
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
}
</style>

<template>
  <div id="home" class="content">
    <div class="samples row">
      <div class="single">
        <h2 id="sample-select-header">Single Select</h2>
        <select ref="slimSingle" aria-labelledby="sample-select-header">
          <option data-placeholder="true"></option>
          <option value="best">Best</option>
          <option value="select">Select</option>
          <option value="ever">Ever</option>
        </select>
      </div>
      <div class="multi">
        <h2>Multi Select</h2>
        <select ref="slimMulti" multiple>
          <option value="best">Best</option>
          <option value="select">Select</option>
          <option value="ever">Ever</option>
        </select>
      </div>
    </div>

    <br />

    <div class="support">
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

    <br />
    <div class="separator" />
    <br />

    <div class="features">
      <h2 class="header">Features</h2>

      <div class="row">
        <ul class="list">
          <li><img src="../assets/images/check-mark.svg" /> No Dependencies</li>
          <li><img src="../assets/images/check-mark.svg" /> ~30kb - ~5kb gzip</li>
          <li><img src="../assets/images/check-mark.svg" /> Single Select</li>
          <li><img src="../assets/images/check-mark.svg" /> Multiple Select</li>
          <li><img src="../assets/images/check-mark.svg" /> Addable Options</li>
          <li><img src="../assets/images/check-mark.svg" /> Html Options</li>
          <li><img src="../assets/images/check-mark.svg" /> Settable Data</li>
          <li><img src="../assets/images/check-mark.svg" /> Callback Events</li>
          <li><img src="../assets/images/check-mark.svg" /> Placeholders</li>
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

    <br />
    <div class="separator" />
    <br />

    <div class="frameworks">
      <h2 class="header">Frameworks</h2>
      <p>
        SlimSelect is in the process of adding a few framework integrations.<br />
        If you are an expert in any specific framework and would like to help out, please reach out!
      </p>
      <div class="row frameworks">
        <router-link to="frameworks#vue">
          <svg viewBox="0 0 128 128" width="100" height="100">
            <path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"></path>
            <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z"></path>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>
