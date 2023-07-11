import { createRouter, createWebHistory } from 'vue-router';

import type { RouteRecordRaw } from 'vue-router';

// 默认路由
export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home/home.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/about/about.vue'),
  },
];
const router = createRouter({
  routes: defaultRoutes,
  history: createWebHistory(),
});

export default router;
