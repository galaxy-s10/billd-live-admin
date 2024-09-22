import { arrayUnique, windowReload } from 'billd-utils';
import { defineStore } from 'pinia';

import { fetchRegister } from '@/api/emailUser';
import { fetchLogin, fetchUserInfo, fetchUserNameLogin } from '@/api/user';
import { IRole, IUser } from '@/interface';
import router from '@/router';
import { asyncRoutes } from '@/router/asyncRoute';
import { clearToken, setToken } from '@/utils/localStorage';

type UserRootState = {
  userInfo?: IUser;
  token?: string;
  roles?: IRole[];
};

export const useUserStore = defineStore('user', {
  state: (): UserRootState => {
    return {
      userInfo: undefined,
      token: undefined,
      roles: undefined,
    };
  },
  actions: {
    setUserInfo(res) {
      this.userInfo = res;
    },
    setToken(res) {
      setToken(res);
      this.token = res;
    },
    setRoles(res) {
      this.roles = res;
    },
    logout() {
      clearToken();
      this.token = undefined;
      this.userInfo = undefined;
      this.roles = undefined;
      router.push('/login').then(() =>
        setTimeout(() => {
          windowReload();
        }, 300)
      );
    },
    async pwdLogin({ id, password }) {
      try {
        const { data: token } = await fetchLogin({
          id,
          password,
        });
        this.setToken(token);
        return token;
      } catch (error: any) {
        // 错误返回401，全局的响应拦截会打印报错信息
        return null;
      }
    },
    async fetchUserNameLogin({ username, password }) {
      try {
        const { data: token } = await fetchUserNameLogin({
          username,
          password,
        });
        this.setToken(token);
        return token;
      } catch (error: any) {
        // 错误返回401，全局的响应拦截会打印报错信息
        return null;
      }
    },
    async register({ email, code }) {
      try {
        // @ts-ignore
        const { data: token } = await fetchRegister({
          email,
          code,
        });
        this.setToken(token);
        return { token };
      } catch (error: any) {
        window.$message.error(error.message);
        return error;
      }
    },
    async getUserInfo() {
      try {
        const { code, data }: any = await fetchUserInfo();
        this.setUserInfo(data);
        this.setRoles(data.roles);
        return { code, data };
      } catch (error) {
        return error;
      }
    },
    generateAsyncRoutes(roles) {
      // 比较两数组是否有交集(返回true代表有交集)
      const hasMixin = (a, b) => {
        return a.length + b.length !== new Set([...a, ...b]).size;
      };
      const myRole = roles.map((v) => v.role_value);
      const handleAsyncRoutes = (roleRoutes) => {
        const deepFind = (route) => {
          const res: any[] = [];
          route.forEach((v) => {
            const t = { ...v };
            if (t.meta && t.meta.roles) {
              // 有meta数据，且meta有roles数据，开始判断权限，有权限才允许访问
              const hasRole = hasMixin(arrayUnique(t.meta.roles), myRole);
              hasRole && res.push(t);
            } else {
              // 没有meta信息，允许访问
              res.push(t);
            }
            if (t.children) {
              t.children = deepFind(t.children);
            }
          });
          return res;
        };
        const res = deepFind(roleRoutes);
        return res;
      };
      return handleAsyncRoutes(asyncRoutes);
    },
  },
});
