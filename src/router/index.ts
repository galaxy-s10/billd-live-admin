import { BulbOutline, SpeedometerOutline } from '@vicons/ionicons5';
import { createRouter, createWebHistory } from 'vue-router';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from './utils';

import type { RouteRecordRaw } from 'vue-router';

// 默认路由
export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    meta: {
      sort: ROUTE_SORT.dashboard,
    },
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '控制台',
          icon: renderIcon(SpeedometerOutline),
        },
      },
    ],
  },
  {
    path: '/live',
    component: Layout,
    meta: {
      sort: ROUTE_SORT.live,
      title: '直播管理',
      icon: renderIcon(BulbOutline),
    },
    children: [
      {
        name: 'stream',
        path: '/live/stream',
        component: () => import('@/views/live/stream/list/index.vue'),
        meta: {
          title: '在线stream',
        },
      },
      {
        name: 'client',
        path: '/live/client',
        component: () => import('@/views/live/client/list/index.vue'),
        meta: {
          title: '在线client',
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
];
const router = createRouter({
  routes: defaultRoutes,
  history: createWebHistory(),
});

export default router;
