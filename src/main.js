import Vue from 'vue';
import axios from 'axios';
import router from './router/router';
import store from './store/index';
import App from './App';

import './assets/css/reset.css';
import './assets/css/common.css';
import './assets/css/github-markdown.css';

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
