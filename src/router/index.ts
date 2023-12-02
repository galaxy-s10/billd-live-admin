import {
  BulbOutline,
  LockClosedOutline,
  PersonOutline,
  ShieldOutline,
  SpeedometerOutline,
} from '@vicons/ionicons5';
import { createRouter, createWebHistory } from 'vue-router';

import { ROUTE_ROLES, ROUTE_SORT } from '@/constant';
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
      roles: [ROUTE_ROLES.SUPER_ADMIN],
    },
    children: [
      {
        name: 'liveStream',
        path: '/live/stream',
        component: () => import('@/views/live/stream/list/index.vue'),
        meta: {
          title: '在线stream',
        },
      },
      {
        name: 'liveClient',
        path: '/live/client',
        component: () => import('@/views/live/client/list/index.vue'),
        meta: {
          title: '在线client',
        },
      },
    ],
  },
  {
    name: 'user',
    path: '/user',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: renderIcon(PersonOutline),
      sort: ROUTE_SORT.user,
    },
    children: [
      {
        name: 'userList',
        path: '/user/list',
        component: () => import('@/views/user/list/index.vue'),
        meta: {
          title: '用户列表',
        },
      },
      {
        name: 'userAdd',
        path: '/user/add',
        component: () => import('@/views/user/add/index.vue'),
        meta: {
          title: '新增用户',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
  {
    path: '/role',
    component: Layout,
    meta: {
      sort: ROUTE_SORT.role,
      title: '角色管理',
      icon: renderIcon(LockClosedOutline),
      roles: [ROUTE_ROLES.SUPER_ADMIN],
    },
    children: [
      {
        name: 'roleList',
        path: '/role/list',
        component: () => import('@/views/role/list/index.vue'),
        meta: {
          title: '角色列表',
        },
      },
      {
        name: 'roleTree',
        path: '/role/tree',
        component: () => import('@/views/role/tree/index.vue'),
        meta: {
          title: '角色树',
        },
      },
      {
        name: 'addRole',
        path: '/role/add',
        component: () => import('@/views/role/add/index.vue'),
        meta: {
          title: '添加角色',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
        },
      },
    ],
  },
  {
    name: 'auth',
    path: '/auth',
    component: Layout,
    meta: {
      title: '权限管理',
      icon: renderIcon(ShieldOutline),
      sort: ROUTE_SORT.auth,
    },
    children: [
      {
        name: 'authList',
        path: '/auth/list',
        component: () => import('@/views/auth/list/index.vue'),
        meta: {
          title: '权限列表',
        },
      },
      {
        name: 'authTree',
        path: '/auth/tree',
        component: () => import('@/views/auth/tree/index.vue'),
        meta: {
          title: '权限树',
        },
      },
      {
        name: 'addAuth',
        path: '/auth/add',
        component: () => import('@/views/auth/add/index.vue'),
        meta: {
          title: '添加权限',
          roles: [ROUTE_ROLES.SUPER_ADMIN],
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
