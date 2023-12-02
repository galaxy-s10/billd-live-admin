import { defineStore } from 'pinia';

import { getCurrEnv } from '@/utils/localStorage';

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      loading: false,
      collapsed: false,
      env: getCurrEnv(),
      path: null,
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
