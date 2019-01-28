import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: () => import(/* webpackChunkName: "home" */ './pages/home.vue') },
    { path: '/install', component: () => import(/* webpackChunkName: "install" */ './pages/install.vue') },
    { path: '/selects', component: () => import(/* webpackChunkName: "selects" */ './pages/selects.vue') },
    { path: '/options', component: () => import(/* webpackChunkName: "options" */ './pages/options.vue') },
    { path: '/methods', component: () => import(/* webpackChunkName: "methods" */ './pages/methods.vue') }
  ]
})
