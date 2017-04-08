import Vue from 'vue';
import router from './router/router';
import store from './store/index';
import App from './App';
import axios from 'axios';

Vue.prototype.$http = axios;

import './assets/css/reset.css';
import './assets/css/common.css';
import './assets/css/github-markdown.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});