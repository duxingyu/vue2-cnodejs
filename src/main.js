import Vue from 'vue';
import axios from 'axios';
import { Pagination, Select, Option } from 'element-ui';
import router from './router/router';
import store from './store/index';
import App from './App';

// reset、公共css、markdown样式、element-ui主题色
import './assets/css/reset.css';
import './assets/css/common.css';
import './assets/css/github-markdown.css';
import './assets/el.scss';

axios.defaults.baseURL = 'https://cnodejs.org/api/v1/';
Vue.prototype.$http = axios;
// element-ui的Loading组件配置
Vue.prototype.$loadConfig = {
  target: '#app',
  fullscreen: false,
  lock: true,
};
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
