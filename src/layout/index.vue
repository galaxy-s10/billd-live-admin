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
      </n-layout>
    </n-layout>
    <PoweredByCpt></PoweredByCpt>
  </n-space>
</template>

<script lang="ts">
import { CaretDownOutline } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { defineComponent, h, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import PoweredByCpt from '@/components/PoweredBy/index.vue';
import { defaultRoutes } from '@/router/index';
import { useAppStore } from '@/store/app';

import HeaderCpt from './header/header.vue';
import openTabCpt from './openTab/openTab.vue';

import type { RouteRecordRaw } from 'vue-router';

export default defineComponent({
  components: {
    HeaderCpt,
    openTabCpt,
    PoweredByCpt,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const appStore = useAppStore();
    const handleRoutes = (routes: RouteRecordRaw[]) => {
      routes.forEach((v) => {
        if (v.children && v.children.length === 1) {
          v.meta = {
            title: v.children[0].meta?.title,
            icon: v.children[0].meta?.icon,
            hidden: v.children[0].meta?.hidden,
            sort: v.meta?.sort,
          };
          // @ts-ignore
          v.label = v.meta.title;
          // @ts-ignore
          v.key = v.children[0].path;
          // @ts-ignore
          v.show = !v.meta.hidden;
          delete v.children;
        } else if (v.children && v.children.length > 1) {
          // @ts-ignore
          v.label = v.meta && v.meta.title;
          // @ts-ignore
          v.key = v.path;
          handleRoutes(v.children);
        } else if (!v.children) {
          if (v.meta) {
            // @ts-ignore
            v.label = v.meta && v.meta.title;
            // @ts-ignore
            v.key = v.path;
            // @ts-ignore
            v.show = !v.meta.hidden;
          }
        }
      });
      return routes;
    };

    function sortRoute(a, b) {
      return (b.meta?.sort || 0) - (a.meta?.sort || 0);
    }

    const menuOptions = ref(
      handleRoutes([...defaultRoutes, ...appStore.routes]).sort(sortRoute)
    );
    const handleUpdateValue = (key: string, item) => {
      path.value = key;
      if (!appStore.tabList[key]) {
        appStore.setTabList({
          ...appStore.tabList,
          [key]: item.meta.title,
        });
      }
      router.push(key);
    };
    const path = ref(route.path);
    watch(
      () => route.path,
      () => {
        appStore.setPath(route.path);
        path.value = route.path;
      }
    );
    appStore.setRoutes(menuOptions);
    appStore.setPath(route.path);
    appStore.setTabList({ [route.path]: route.meta.title });

    return {
      appStore,
      menuOptions,
      currentPath: path,
      handleUpdateValue,
      renderMenuLabel(option) {
        return option.label;
      },
      renderMenuIcon(option) {
        const vn = option.meta && option.meta.icon;
        return vn ? h(vn) : false;
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      },
    };
  },
});
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
    padding: 10px 10px 50px 10px;
  }
}
</style>
