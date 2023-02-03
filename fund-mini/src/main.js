import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Tabbar, TabbarItem ,Search } from 'vant';
import Toast from 'vant';

Vue.use(Toast);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
