import {
  BulbOutline,
  LockClosedOutline,
  PersonOutline,
  ShieldOutline,
  WalletOutline,
} from '@vicons/ionicons5';
import { RouteRecordRaw } from 'vue-router';

import { DEFAULT_ROLE_INFO, ROUTE_ROLES, ROUTE_SORT } from '@/constant';
import Layout from '@/layout/index.vue';

import { notFoundRoutes } from './notFound';
import { renderIcon } from './utils';

// 默认路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/live',
    component: Layout,
    meta: {
      title: '直播管理',
      icon: renderIcon(BulbOutline),
      sort: ROUTE_SORT.live,
      roles: [
        DEFAULT_ROLE_INFO.SUPER_ADMIN.role_value,
        DEFAULT_ROLE_INFO.LIVE_ADMIN.role_value,
      ],
    },
    children: [
      {
        name: 'liveRecord',
        path: '/live/record',
        component: () => import('@/views/live/record/list/index.vue'),
        meta: {
          title: '直播记录',
        },
      },
      {
        name: 'liveRoom',
        path: '/live/room',
        component: () => import('@/views/live/room/list/index.vue'),
        meta: {
          title: '直播间列表',
        },
      },
      {
        name: 'liveAnchor',
        path: '/live/anchor',
        component: () => import('@/views/live/anchor/list/index.vue'),
        meta: {
          title: '在线主播',
        },
      },
      {
        name: 'liveAudience',
        path: '/live/audience',
        component: () => import('@/views/live/audience/list/index.vue'),
        meta: {
          title: '在线观众',
        },
      },
      {
        name: 'liveStream',
        path: '/live/stream',
        component: () => import('@/views/live/stream/list/index.vue'),
        meta: {
          title: '在线stream',
          roles: [DEFAULT_ROLE_INFO.SUPER_ADMIN.role_value],
        },
      },
      {
        name: 'liveClient',
        path: '/live/client',
        component: () => import('@/views/live/client/list/index.vue'),
        meta: {
          title: '在线client',
          roles: [DEFAULT_ROLE_INFO.SUPER_ADMIN.role_value],
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
      roles: [DEFAULT_ROLE_INFO.SUPER_ADMIN.role_value],
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
          roles: [DEFAULT_ROLE_INFO.SUPER_ADMIN.role_value],
        },
      },
    ],
  },
  {
    path: '/role',
    component: Layout,
    meta: {
      title: '角色管理',
      icon: renderIcon(LockClosedOutline),
      sort: ROUTE_SORT.role,
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
      roles: [ROUTE_ROLES.SUPER_ADMIN],
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
        },
      },
    ],
  },
  {
    name: 'order',
    path: '/order',
    component: Layout,
    meta: {
      title: '订单管理',
      sort: ROUTE_SORT.order,
      roles: [DEFAULT_ROLE_INFO.SUPER_ADMIN.role_value],
    },
    children: [
      {
        name: 'orderList',
        path: '/order/list',
        component: () => import('@/views/order/list/index.vue'),
        meta: {
          icon: renderIcon(WalletOutline),
          title: '订单列表',
        },
      },
    ],
  },
  ...notFoundRoutes, // 404路由一定要放在异步路由的最后
];
