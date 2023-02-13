import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MainPage from "../views/MainPage.vue";
import MyPage from "../views/MyPage.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path:"/",
        redirect:"/main"
      },
      {
        path: "main",
        name: "MainPage",
        component: MainPage,
      },
      {
        path: "my",
        name: "MyPage",
        component: MyPage,
      },
      {
        path: "search",
        name: "SearchPage",
        component: () => import("../views/SearchPage.vue"),
      },
      // {
      //   path: "friend",
      //   name: "FriendPage",
      //   component: () => import("../views/FriendPage.vue"),
      // },
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
];

const router = new VueRouter({
  base: 'fund-app', // 如果有域名
  mode: 'history',
  routes,
});

export default router;
