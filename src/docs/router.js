import home from './pages/home.vue'
import install from './pages/install.vue'
import selects from './pages/selects.vue'
import options from './pages/options.vue'
import methods from './pages/methods.vue'

export default {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  routes: [
    {path: '/', component: home},
    {path: '/install', component: install},
    {path: '/selects', component: selects},
    {path: '/options', component: options},
    {path: '/methods', component: methods}
  ]
}
