import Vue from 'vue'

import App from './App.vue'
import router from './router'

import axios from 'axios'

import { Toast } from 'vant'

//项目内样式（放置于uno样式后）
import './assets/main.css'

axios.defaults.baseURL = 'http://localhost:5173'

Vue.config.productionTip = false

Vue.use(Toast)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
