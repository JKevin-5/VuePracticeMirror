import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainPage from '../views/MainPage.vue'
import MyPage from '../views/MyPage.vue'
import SearchPage from '../views/SearchPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { 
        path: 'main', 
        name: 'MainPage', 
        component: MainPage
      },{ 
        path: 'my', 
        name: 'MyPage', 
        component: MyPage
      },{ 
        path: 'search', 
        name: 'SearchPage', 
        component: SearchPage
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
