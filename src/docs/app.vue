<script>
  import SlimSelect from '@/slim-select'

  export default {
    data() {
      const path = this.$route.path
      return {
        year: new Date().getFullYear(),
        navData: [
          {text: 'Home', value: '/', selected: (path === '/')},
          {text: 'Installation', value: 'install', selected: (path === '/install')},
          {text: 'Select Types', value: 'selects', selected: (path === '/selects')},
          {text: 'Options', value: 'options', selected: (path === '/options')},
          {text: 'Methods', value: 'methods', selected: (path === '/methods')}
        ]
      }
    },
    mounted() {
      // Lets redirect to path
      if (this.$route.query.p) {
        this.$router.push({ path: this.$route.query.p })
      }

      const slim = new SlimSelect({
        select: '#select-nav',
        showSearch: false,
        onChange: (info) => {
          this.$router.push({ path: info.value })
        }
      })
      slim.setData(this.navData)

      this.$router.onReady(() => {
        const urlPathValue = this.$route.path.replace('/', '')
        if (urlPathValue !== '') {
          slim.setSelected(urlPathValue)
        }
      })
    }
  }
</script>

<style lang="scss">
  #app {
    .select-nav {
      .ss-single-selected {
        position: relative;
        z-index: 2000;

        .placeholder {
          font-weight: bold;
        }
      }

      .ss-content {
        box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.2);

        .ss-option {
          font-weight: bold;
        }
      }
    }
  }
</style>

<template>
  <div id="app">
    <div class="header">
      <div class="text">
        <div class="logo">
          Slim Select
        </div>
        <div class="tagline">
          Slim advanced select dropdown
        </div>
      </div>
      <div class="select-nav">
        <a href="https://github.com/brianvoe/slim-select" target="_blank">
          <img src="images/github.png" />
        </a>
        <a href="https://www.npmjs.com/package/slim-select" target="_blank">
          <img src="images/npm.png" />
        </a>
        <select id="select-nav"></select>
      </div>
    </div>
    <div class="main">
      <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </div>
    <div class="footer">
      © {{year}} <a href="http://webiswhatido.com" style="color: #ffffff;" target="_blank">Brian Voelker</a>. Slim Select is under the MIT license.
    </div>
  </div>
</template>
