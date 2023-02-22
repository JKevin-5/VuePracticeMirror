import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Empty,Sticky,NavBar,Tabbar, TabbarItem, Search, Toast, Loading, Col, Row,Grid, GridItem ,Form,Field} from "vant";
import request from "./axios/request";
import store from "./store";
import "vant/lib/index.css";
import "mand-mobile/lib/mand-mobile.css";
import { Amount } from "mand-mobile";
// 引入封装的工具类
import tools from './util/tool';

Vue.prototype.$Tools= tools
Vue.prototype.request = request;

Vue.component(Amount.name, Amount);
Vue.use(Grid, GridItem);
Vue.use(NavBar,Sticky,Empty);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);
Vue.use(Col);
Vue.use(Row);
Vue.use(Form);
Vue.use(Field);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
