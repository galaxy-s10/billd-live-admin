import {
  LogoGithub,
  SettingsOutline,
  SpeedometerOutline,
} from '@vicons/ionicons5';
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
      title: 'router.dashboard',
      name: 'dashboardManage',
      sort: ROUTE_SORT.dashboard,
      icon: renderIcon(SpeedometerOutline),
    },
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'router.dashboard',
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: 'router.login',
      hidden: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    name: 'setting',
    path: '/setting',
    component: Layout,
    meta: {
      title: 'router.setting',
      // oneChildren: true,
      icon: renderIcon(SettingsOutline),
      sort: ROUTE_SORT.setting,
    },
    children: [
      {
        name: 'settingAccount',
        path: '/setting/account',
        component: () => import('@/views/setting/account/index.vue'),
        meta: {
          title: 'router.settingAccount',
        },
      },
    ],
  },
  {
    name: 'github',
    path: '/github',
    component: Layout,
    meta: {
      title: 'router.github',
      oneChildren: true,
      sort: ROUTE_SORT.github,
    },
    children: [
      {
        name: 'githubInfo',
        path: '/github/info',
        component: () => import('@/views/github/index.vue'),
        meta: {
          title: 'router.github',
          icon: renderIcon(LogoGithub),
        },
      },
    ],
  },
  {
    name: 'authError',
    path: '/error/401',
    component: () => import('@/views/errorPage/401/index.vue'),
    meta: {
      title: 'router.401',
      hidden: true,
    },
  },
  {
    name: 'notFound',
    path: '/error/404',
    component: () => import('@/views/errorPage/404/index.vue'),
    meta: {
      title: 'router.404',
      hidden: true,
    },
  },
];

const router = createRouter({
  routes: defaultRoutes,
  history: createWebHistory(),
});

export default router;
