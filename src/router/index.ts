import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { setupRouterGuards } from './guards';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/splash',
  },
  {
    path: '/splash',
    name: 'Splash',
    component: () => import('@/pages/splash/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/home/index.vue'),
  },
  {
    path: '/login/one-key',
    name: 'OneKeyLogin',
    component: () => import('@/pages/login/one-key.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/app',
    component: () => import('@/pages/app/index.vue'),
    meta: { requiresAuth: true },
    redirect: '/app/home',
    children: [
      {
        path: 'home',
        name: 'AppHome',
        component: () => import('@/pages/app/tabs/home.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'qa',
        name: 'AppQa',
        component: () => import('@/pages/app/tabs/qa.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'message',
        name: 'AppMessage',
        component: () => import('@/pages/app/tabs/message.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'mine',
        name: 'AppMine',
        component: () => import('@/pages/app/tabs/mine.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/im/list',
    name: 'ImList',
    component: () => import('@/pages/im/list.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/im/chat/:expertId',
    name: 'ImChat',
    component: () => import('@/pages/im/chat.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/live/list',
    name: 'LiveList',
    component: () => import('@/pages/live/list.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

setupRouterGuards(router);

export default router;
