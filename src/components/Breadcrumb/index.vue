<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="item in currentRouteArr"
      :key="item.path"
    >
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useAppStore } from '@/store/app';

export default defineComponent({
  setup() {
    const appStore = useAppStore();
    const route = useRoute();
    const path = ref(route.path);
    const { routes } = toRefs(appStore);

    const handleTree = (source, target) => {
      const res: any = [];
      const strArr = target.split('/');
      const originSource = JSON.parse(JSON.stringify(source));
      // WARN:待优化
      // eslint-disable-next-line
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
    const result = ref(handleTree(routes.value, path.value));

    watch(
      () => route.path,
      () => {
        result.value = reactive(handleTree(routes.value, route.path));
      }
    );
    return {
      currentRouteArr: result,
    };
  },
});
</script>

<style lang="scss" scoped></style>
