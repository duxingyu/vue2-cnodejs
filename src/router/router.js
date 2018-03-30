import Vue from 'vue';
import Router from 'vue-router';
import appList from '@/pages/appList';
import appTopic from '@/pages/appTopic';
import appUser from '@/pages/appUser';
import appLogin from '@/pages/appLogin';
import newTopic from '@/pages/newTopic';
import about from '@/pages/about';
import appMessage from '@/pages/appMessage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'appList',
      component: appList,
      alias: '/?tab=home',
    },
    {
      path: '/topic/:topicId',
      name: 'appTopic',
      component: appTopic,
      props: true,
    },
    {
      path: '/login',
      name: 'appLogin',
      component: appLogin,
    },
    {
      path: '/user/:userId',
      name: 'appUser',
      component: appUser,
      props: true,
      children: [
        {
          path: ':list',
          name: 'appUserList',
          component: appUser,
        },
      ],
    },
    {
      path: '/my/messages',
      name: 'appMessage',
      component: appMessage,
    },
    {
      path: '/create',
      name: 'newTopic',
      component: newTopic,
    },
    {
      path: '/edit',
      name: 'topicEdit',
      component: newTopic,
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
    {
      path: '*',
      component: appList,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    const position = {};

    if (savedPosition) {
      return savedPosition;
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0;
      position.y = 0;
      return position;
    }
  },
});
