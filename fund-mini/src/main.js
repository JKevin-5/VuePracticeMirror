import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Tabbar, TabbarItem ,Search ,Toast, Loading } from 'vant';
import request from './axios/request';
import store from './store'
import 'vant/lib/index.css';

Vue.prototype.request = request;
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
