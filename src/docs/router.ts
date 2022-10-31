import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "home" */ './pages/home.vue'),
    },
    {
      path: '/install',
      name: 'Install',
      component: () => import(/* webpackChunkName: "install" */ './pages/install.vue'),
    },
    {
      path: '/selects',
      name: 'Selects',
      component: () => import(/* webpackChunkName: "selects" */ './pages/selects.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import(/* webpackChunkName: "settings" */ './pages/settings/index.vue'),
    },
    {
      path: '/methods',
      name: 'Methods',
      component: () => import(/* webpackChunkName: "methods" */ './pages/methods.vue'),
    },
  ],
})

export default router
