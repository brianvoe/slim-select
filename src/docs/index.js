import Vue from 'vue'
import VueRouter from 'vue-router'

import app from 'docs/app.vue'
import routerList from 'docs/router.js'
import Prism from 'prismjs'
import Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

import './google-analytics.js'

import 'scss/index.scss'
import 'slim-select/slimselect.scss'

/* eslint-disable no-new */
new Normalizer({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true
})
// new Copy()

Vue.mixin({
  updated () {
    Prism.highlightAll()
  }
})

// Router setup
Vue.use(VueRouter)
const router = new VueRouter(routerList)

new Vue({
  router,
  render: (h) => h(app)
}).$mount('#app')
