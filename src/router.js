import home from './components/home.vue'
import simple from './components/simple.vue'
import group from './components/group.vue'

export default {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  routes: [
    {path: '/', component: home},
    {path: '/simple', component: simple},
    {path: '/group', component: group}
  ]
}
