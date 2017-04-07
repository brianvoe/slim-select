<script>
  import SlimSelect from '../slim-select/index.ts'
  import logo from 'images/logo.png'

  export default {
    data () {
      return {
        logo,
        navData: [
          {text: 'Home', value: '/'},
          {text: 'Simple', value: 'simple'},
          {text: 'Multiple', value: 'multiple'},
          {text: 'Group', value: 'group'},
          {text: 'Observer', value: 'observer'},
          {text: 'Data', value: 'data'}
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
        onChange: (value) => {
          this.$router.push({ path: value })
        }
      })
      slim.setData(this.navData)
    }
  }
</script>

<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        Slim Select
      </div>
      <div class="tagline">
        Slim vanilla javascript select dropdown
      </div>
      <div class="select-nav">
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
  </div>
</template>
