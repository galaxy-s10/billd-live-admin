<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="item in currentRouteArr"
      :key="item.path"
    >
      {{ t(item.meta.title) }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useAppStore } from '@/store/app';

const { t } = useI18n();
const appStore = useAppStore();
const route = useRoute();
const path = ref(route.path);
const { routes } = toRefs(appStore);

const handleTree = (source, target) => {
  const res: any = [];
  const strArr = target.split('/');
  const originSource = JSON.parse(JSON.stringify(source));
  // WARN:待优化

  const find = (source, target) => {
    for (let i = 0; i < source.length; i += 1) {
      const item = source[i];
      if (item.key === target) {
        res.unshift(item);
        strArr.pop();
        const pid = strArr.join('/');
        if (pid !== '') {
          find(originSource, pid);
        }
        break;
      } else if (item.children) {
        find(item.children, target);
      }
    }
  };
  find(source, target);
  return res;
};
const currentRouteArr = ref(handleTree(routes.value, path.value));

watch(
  () => route.path,
  () => {
    currentRouteArr.value = reactive(handleTree(routes.value, route.path));
  }
);
</script>

<style lang="scss" scoped></style>
