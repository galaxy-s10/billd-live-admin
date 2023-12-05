import { RouteRecordRaw } from 'vue-router';

// 异步路由
export const notFoundRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    // component: () => import('@/views/error/404/index.vue'),
    redirect: '/error/404',
    meta: {
      hidden: true,
    },
  },
];
