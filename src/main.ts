import Vue from 'vue'
import router from '@/docs/router'

import app from '@/docs/app.vue'
import Prism from 'prismjs'
import Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

import '@/docs/assets/scss/index.scss'
import '@/slim-select/slimselect.scss'

new Normalizer({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true
})

Vue.mixin({
  updated() {
    Prism.highlightAll()
  }
})

new Vue({
  router,
  render: (h) => h(app)
}).$mount('#app')
