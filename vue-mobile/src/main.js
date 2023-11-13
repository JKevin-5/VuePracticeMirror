import Vue from 'vue'

import App from './App.vue'
import router from './router'

//项目内样式（放置于uno样式后）
import './assets/main.css'

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
