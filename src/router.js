import home from './components/home.vue'
import simple from './components/simple.vue'
import multiple from './components/multiple.vue'
import group from './components/group.vue'
import observer from './components/observer.vue'
import data from './components/data.vue'

export default {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  routes: [
    {path: '/', component: home},
    {path: '/simple', component: simple},
    {path: '/multiple', component: multiple},
    {path: '/group', component: group},
    {path: '/observer', component: observer},
    {path: '/data', component: data}
  ]
}
