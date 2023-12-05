import { toRefs } from 'vue';

import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';

import router from './router';
import { getToken } from './utils/localStorage';

// 白名单，不需要登录即可跳转，如登录页
const whiteList = [
  '/login',
  '/oauth/qq_login',
  '/oauth/github_login',
  '/error/404',
  '/error/401',
];

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const { roles } = toRefs(userStore);
  const hasToken = getToken();
  appStore.setLoading(true);
  // 先判断有没有登录
  if (hasToken) {
    userStore.setToken(hasToken);
    if (to.path === '/login') {
      next('/');
    }
    // 判断用户有没有角色
    if (roles?.value && roles.value.length) {
      next();
    } else {
      const { code, data }: any = await userStore.getUserInfo();
      if (code !== 200) {
        next(false);
        return;
      }
      if (!data.roles || !data.roles.length) {
        next(false);
        window.$message.error('你没有角色');
        return;
      }
      const routeRes = userStore.generateAsyncRoutes(data.roles);
      routeRes.forEach((v) => {
        router.addRoute(v);
      });
      appStore.setRoutes(routeRes);
      next({ ...to, replace: true });
      return;
    }
  } else {
    // 没登录的话，判断跳转的页面在不在白名单内
    if (whiteList.indexOf(to.path) !== -1) {
      return next();
    }
    next(`/login?redirect=${to.path}`);
  }
});

router.afterEach(() => {
  const appStore = useAppStore();
  appStore.setLoading(false);
});
