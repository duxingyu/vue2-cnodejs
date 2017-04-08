import Vue from 'vue';
import Router from 'vue-router';
import appList from '@/pages/appList';
import appTopic from '@/pages/appTopic';
import appUser from '@/pages/appUser';
import appLogin from '@/pages/appLogin';
import newTopic from '@/pages/newTopic';
import about from '@/pages/about';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/',
    name: 'appList',
    component: appList,
    alias: '/?tab=home',
  }, {
    path: '/topic/:id',
    name: 'appTopic',
    component: appTopic,
  }, {
    path: '/login',
    name: 'appLogin',
    component: appLogin,
  }, {
    path: '/user/:id',
    name: 'appUser',
    component: appUser,
  }, {
    path: '/create',
    name: 'newTopic',
    component: newTopic,
  }, {
    path: '/about',
    name: 'about',
    component: about,
  }],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
