import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: './',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: { template: '<router-view />' },
      redirect: { name: '/sub-app-old' },
    },
    {
      path: '/',
      redirect: { name: 'home' },
    },
    {
      path: '*',
      component: () => import('@/views/notFound/'),
    },
  ],
});

export default router;
