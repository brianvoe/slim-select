import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./pages/home.vue')
    },
    {
      path: '/install',
      name: 'Install',
      component: () => import('./pages/install.vue')
    },
    {
      path: '/selects',
      name: 'Selects',
      component: () => import('./pages/selects.vue')
    },
    {
      path: '/data',
      name: 'Data',
      component: () => import('./pages/data.vue')
    },
    {
      path: '/examples',
      name: 'Examples',
      component: () => import('./pages/examples/index.vue')
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('./pages/privacy.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('./pages/settings/index.vue')
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import('./pages/events/index.vue')
    },
    {
      path: '/methods',
      name: 'Methods',
      component: () => import('./pages/methods/index.vue')
    },
    {
      path: '/vue',
      name: 'Vue',
      component: () => import('./pages/frameworks/vue.vue')
    },
    {
      path: '/react',
      name: 'React',
      component: () => import('./pages/frameworks/react.vue')
    }
  ]
})

export default router
