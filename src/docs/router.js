import home from './pages/home.vue'
import simple from './pages/simple.vue'
import multiple from './pages/multiple.vue'
import group from './pages/group.vue'
import observer from './pages/observer.vue'
import data from './pages/data.vue'

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
