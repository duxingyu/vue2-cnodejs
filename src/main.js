import Vue from 'vue';
import axios from 'axios';
import { Pagination } from 'element-ui';
import router from './router/router';
import store from './store/index';
import App from './App';

// reset、公共css、markdown样式
import './assets/css/reset.css';
import './assets/css/common.css';
import './assets/css/github-markdown.css';
import './assets/el.scss';

Vue.prototype.$http = axios;
Vue.use(Pagination);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
