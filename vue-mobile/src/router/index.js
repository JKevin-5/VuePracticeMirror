import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },{
      path: '/',
      redirect: 'home'
    },{
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      children:[
        {
          path: '',
          redirect: 'dashboard'
        },
        {
          path: 'dashboard',
          name:'dashboard',
          component: () => import('../views/DashBoard.vue')
        },
        {
          path: 'calendar',
          name:'calendar',
          component: () => import('../views/Calendar.vue')
        },
        {
          path: 'user',
          name:'user',
          component: () => import('../views/User.vue')
        },
        {
          path: 'self',
          name:'self',
          component: () => import('../views/Self.vue')
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    },
    {
      path: '*',
      redirect: '404'
    }
  ]
})

export default router
