<template>
  <n-space class="layout-wrap">
    <n-layout
      position="absolute"
      has-sider
    >
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="appStore.collapsed"
        show-trigger
        @collapse="appStore.setCollapsed(true)"
        @expand="appStore.setCollapsed(false)"
      >
        <n-menu
          :value="currentPath"
          :collapsed="appStore.collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
          @update:value="handleUpdateValue"
        />
      </n-layout-sider>
      <n-layout>
        <div
          class="head-wrap"
          :style="{
            width: !appStore.collapsed
              ? 'calc(100vw - 240px)'
              : 'calc(100vw - 64px)',
          }"
        >
          <HeaderCpt></HeaderCpt>
          <openTabCpt></openTabCpt>
        </div>
        <div class="main-wrap">
          <router-view></router-view>
        </div>
        <PoweredBy></PoweredBy>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
import { CaretDownOutline } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { MenuMixedOption } from 'naive-ui/es/menu/src/interface';
import { h, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';

import { defaultRoutes } from '@/router/index';
import { useAppStore } from '@/stores/app';

import HeaderCpt from './header/header.vue';
import openTabCpt from './openTab/openTab.vue';

// import { deepCloneExclude } from '@/utils';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const { t } = useI18n();
// const copyOriginDefaultRoutes = deepCloneExclude(
//   defaultRoutes,
//   'component'
// );
const handleRoutes = (routes: RouteRecordRaw[]) => {
  routes.forEach((v) => {
    if (v.meta?.oneChildren && v.children) {
      v.meta = {
        title: v.children[0].meta?.title,
        icon: v.children[0].meta?.icon,
        hidden: v.children[0].meta?.hidden,
        sort: v.meta?.sort,
      };
      // @ts-ignore
      v.label = v.meta.title || '';
      // @ts-ignore
      v.key = v.children[0].path || '';
      // @ts-ignore
      v.show = !v.meta.hidden;
      delete v.children;
    } else {
      // @ts-ignore
      v.label = v.meta?.title || '';
      // @ts-ignore
      v.key = v.path || '';
      // @ts-ignore
      v.show = !v.meta?.hidden;
      if (v.children) {
        handleRoutes(v.children);
      }
    }
  });
  return routes;
};

function sortRoute(a, b) {
  return (b.meta?.sort || 0) - (a.meta?.sort || 0);
}

const menuOptions = ref<MenuMixedOption[]>(
  // @ts-ignore
  handleRoutes([...defaultRoutes, ...appStore.routes]).sort(sortRoute)
);
const handleUpdateValue = (key: string, item) => {
  currentPath.value = key;
  if (!appStore.tabList[key]) {
    appStore.setTabList({
      ...appStore.tabList,
      [key]: item.meta.title,
    });
  }
  router.push(key);
};
const currentPath = ref(route.path);
watch(
  () => route.path,
  () => {
    appStore.setPath(route.path);
    currentPath.value = route.path;
  }
);
appStore.setRoutes(menuOptions);
appStore.setPath(route.path);
appStore.setTabList({ [route.path]: route.meta.title });
function renderMenuLabel(option) {
  return t(option.label);
}
function renderMenuIcon(option) {
  const vn = option.meta && option.meta.icon;
  return vn ? h(vn) : false;
}
function expandIcon() {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
}
</script>

<style lang="scss" scoped>
.layout-wrap {
  height: 100vh;

  .head-wrap {
    position: fixed;
    z-index: 10;
    background-color: white;
  }
  .main-wrap {
    margin-top: 90px;
    padding: 10px 10px 50px 15px;
  }
}
</style>
