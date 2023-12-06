import { KeyOutline, SpeedometerOutline } from '@vicons/ionicons5';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import { ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { renderIcon } from './utils';

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
    name: 'login',
    path: '/login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    name: 'settingAccountRoot',
    path: '/setting/accountRoot',
    component: Layout,
    children: [
      {
        name: 'settingAccount',
        path: '/setting/account',
        component: () => import('@/views/setting/account/index.vue'),
        meta: {
          title: '账号设置',
          icon: renderIcon(KeyOutline),
        },
      },
    ],
  },
  {
    name: 'authError',
    path: '/error/401',
    component: () => import('@/views/errorPage/401/index.vue'),
    meta: {
      title: '401页面',
      hidden: true,
    },
  },
  {
    name: 'notFound',
    path: '/error/404',
    component: () => import('@/views/errorPage/404/index.vue'),
    meta: {
      title: '404页面',
      hidden: true,
    },
  },
];

const router = createRouter({
  routes: defaultRoutes,
  history: createWebHistory(),
});

export default router;
