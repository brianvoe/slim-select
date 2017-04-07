import Vue from 'vue'
import VueRouter from 'vue-router'

import app from 'docs/app.vue'
import routerList from 'docs/router.js'

import hljs from 'highlightjs'
import './google-analytics.js'

import 'scss/index.scss'
import 'slim-select/index.scss'

Vue.directive('highlightjs', {
  deep: true,
  bind: function (el, binding) {
    // on first bind, highlight all targets
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.innerHTML = binding.value
      }
      hljs.highlightBlock(target)
    })
  },
  componentUpdated: function (el, binding) {
    // after an update, re-fill the content and then highlight
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value) {
        target.innerHTML = binding.value
        hljs.highlightBlock(target)
      }
    })
  }
})

// Router setup
Vue.use(VueRouter)
const router = new VueRouter(routerList)

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(app)
}).$mount('#app')
