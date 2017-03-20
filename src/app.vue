<script>
  import navComponent from './nav.vue'
  import logo from 'images/logo.png'

  export default {
    data () {
      return {
        logo
      }
    },

    components: {
      navComponent
    }
  }
</script>

<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <img :src="logo" />ue-build
      </div>
      <div class="tagline">
        
      </div>
    </div>
    <div class="main">
      <navComponent />
      <div class="content">
        <transition name="fade" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
