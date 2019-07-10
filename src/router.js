import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todolist',
      props: true,
      component: () => import('./views/todolist.vue')
    },
    {
      path: '/analytics',
      name: 'analytics',
      props: true,
      component: () => import('./views/analytics.vue')
    },
    {
      path: '/ringtone',
      name: 'ringtone',
      props: true,
      component: () => import('./views/ringtone.vue')
    },
    {
      path: '*',
      redirect: '/',
    },
  ]
})
