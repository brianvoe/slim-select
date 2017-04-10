import home from './pages/home.vue'
import selects from './pages/selects.vue'
import options from './pages/options.vue'

export default {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  routes: [
    {path: '/', component: home},
    {path: '/selects', component: selects},
    {path: '/options', component: options}
  ]
}
