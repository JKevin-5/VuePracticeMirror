import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/word',
      name: 'word',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WordViewer.vue'),
      props: route => ({ file: route.query.file })
    },{
      path: '/excel',
      name: 'excel',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ExcelViewer.vue'),
      props: route => ({ file: route.query.file })
    },{
      path: '/pdf',
      name: 'pdf',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PDFViewer.vue'),
      props: route => ({ file: route.query.file })
    }
  ]
})

export default router
