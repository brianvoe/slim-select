<script>
  import SlimSelect from '../slim-select/index.ts'

  export default {
    data () {
      let path = this.$route.path
      return {
        year: new Date().getFullYear(),
        navData: [
          {text: 'Home', value: '/', selected: (path === '/')},
          {text: 'Select Types', value: 'selects', selected: (path === '/selects')},
          {text: 'Options', value: 'options', selected: (path === '/options')},
          {text: 'Methods', value: 'methods', selected: (path === '/methods')}
        ]
      }
    },
    mounted () {
      // Lets redirect to path
      if (this.$route.query.p) {
        this.$router.push({ path: this.$route.query.p })
      }

      let slim = new SlimSelect({
        select: '#select-nav',
        showSearch: false,
        onChange: (info) => {
          this.$router.push({ path: info.value })
        }
      })
      slim.setData(this.navData)
    }
  }
</script>

<template>
  <div id="app">
    <div class="header">
      <div class="text">
        <div class="logo">
          Slim Select
        </div>
        <div class="tagline">
          Slim vanilla javascript select dropdown
        </div>
      </div>
      <div class="select-nav">
        <a href="https://github.com/brianvoe/slim-select" target="_blank">
          <img src="~images/github.png" />
        </a>
        <a href="https://www.npmjs.com/package/slim-select" target="_blank">
          <img src="~images/npm.png" />
        </a>
        <select id="select-nav"></select>
      </div>
    </div>
    <div class="main">
      <div class="content">
        <transition name="fade" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <div class="footer">
      © {{year}} <a href="http://webiswhatido.com" target="_blank">Brian Voelker</a>. Slim Select is under the MIT license.
    </div>
  </div>
</template>
