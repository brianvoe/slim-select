import Vue from 'vue'
import VueRouter from 'vue-router'

import app from 'docs/app.vue'
import routerList from 'docs/router.js'

import 'scss/docs.scss'
import 'slim-select/index.scss'

// Router setup
Vue.use(VueRouter)
const router = new VueRouter(routerList)

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(app)
}).$mount('#app')
