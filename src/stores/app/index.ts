import { defineStore } from 'pinia';

import { getCurrEnv } from '@/utils/localStorage';

type AppRootState = {
  loading: boolean;
  collapsed: boolean;
  env: string | null;
  path?: string;
  routes: any[];
  tabList: Record<string, string>;
};

export const useAppStore = defineStore('app', {
  state: (): AppRootState => {
    return {
      loading: false,
      collapsed: false,
      env: getCurrEnv(),
      path: undefined,
      routes: [],
      tabList: {},
    };
  },
  actions: {
    setLoading(res) {
      this.loading = res;
    },
    setCollapsed(res) {
      this.collapsed = res;
    },
    setEnv(res) {
      this.env = res;
    },
    setPath(res) {
      this.path = res;
    },
    setRoutes(res) {
      this.routes = res;
    },
    setTabList(res) {
      this.tabList = res;
    },
  },
});
