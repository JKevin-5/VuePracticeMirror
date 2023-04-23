import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        redirect: "/home/main",
      },
      {
        path: "main",
        name: "MainPage",
        component: () => import("../views/main/MainPage.vue"),
      },
      {
        path: "my",
        name: "MyPage",
        component: () => import("../views/my/MyPage.vue"),
      },
      {
        path: "search",
        name: "SearchPage",
        component: () => import("../views/search/SearchPage.vue"),
      },
      // {
      //   path: "friend",
      //   name: "FriendPage",
      //   component: () => import("../views/FriendPage.vue"),
      // },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/position",
    name: "PositionPage",
    component: () => import("../views/my/PositionPage.vue"),
  },
  {
    path: "/positionEdit",
    name: "positionEdit",
    component: () => import("../views/my/PositionEditPage.vue"),
  },
  {
    path: "/positionHis",
    name: "positionHis",
    component: () => import("../views/my/PositionHisPage.vue"),
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
  base: "fund-app", // 如果有域名
  mode: "history",
  routes,
});

export default router;
