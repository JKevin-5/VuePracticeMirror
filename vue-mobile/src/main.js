import Vue from 'vue'

import App from './App.vue'
import router from './router'
import 'vant/lib/index.css';
import axios from 'axios'

//项目内样式（放置于uno样式后）
import './assets/main.css'

axios.defaults.baseURL = 'http://localhost:5173'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
