import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Tabbar, TabbarItem, Search, Toast, Loading, Col, Row,Grid, GridItem } from "vant";
import request from "./axios/request";
import store from "./store";
import "vant/lib/index.css";
import "mand-mobile/lib/mand-mobile.css";
import { Amount } from "mand-mobile";

Vue.component(Amount.name, Amount);
Vue.prototype.request = request;
Vue.use(Grid, GridItem);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);
Vue.use(Col);
Vue.use(Row);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
