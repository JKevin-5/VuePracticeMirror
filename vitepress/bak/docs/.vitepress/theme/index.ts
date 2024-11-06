// https://vitepress.dev/guide/custom-theme

import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import Home from './views/home/Home.vue'
// import OutSource from './views/home/OutSource.vue'
import './style.css'
import Layout from "./Layout.vue";
export default {
  extends: DefaultTheme,
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
    // app.component('Home', Home),
    // app.component('OutSource', OutSource)
  }
} satisfies Theme