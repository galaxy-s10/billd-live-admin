<template>
  <div class="search-wrap">
    <HForm
      ref="hFormRef"
      v-bind="searchFormConfig"
      v-model="formData"
    ></HForm>
    <n-space justify="end">
      <n-button
        type="info"
        @click="handleReset"
      >
        重置
      </n-button>
      <n-button
        type="success"
        @click="handleSearch"
      >
        搜索
      </n-button>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import HForm from '@/components/Base/Form';

const props = withDefaults(
  defineProps<{
    searchFormConfig?: any;
    initValue?: any;
  }>(),
  {
    searchFormConfig: {},
    initValue: {},
  }
);
const emits = defineEmits(['clickReset', 'clickSearch']);

const formData = ref({ ...props.initValue });
const hFormRef = ref<InstanceType<typeof HForm>>();

const handleReset = () => {
  hFormRef.value?.handleReset();
  emits('clickReset');
};

const handleSearch = async () => {
  try {
    const res = await hFormRef.value?.handleValidate();
    emits('clickSearch', res);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.search-wrap {
  margin-bottom: 10px;
}
</style>
