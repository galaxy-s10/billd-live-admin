<template>
  <div>
    <n-watermark
      v-if="appStore.env !== 'prod'"
      :content="'当前是' + parseEnv(appStore.env)"
      cross
      fullscreen
      :font-size="16"
      :line-height="16"
      :width="384"
      :height="384"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
    />
    <HModal
      v-model:show="modalVisiable"
      :title="modalTitle"
      @confirm="modalConfirm"
      @cancel="modalVisiable = false"
    >
      选择当前环境：
      <n-radio-group v-model:value="currEnv">
        <n-space>
          <n-radio
            v-for="env in envList"
            :key="env.value"
            :value="env.value"
          >
            {{ env.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </HModal>
    <div class="switch-env">
      <n-button
        type="info"
        size="tiny"
        @click="modalVisiable = !modalVisiable"
      >
        切换环境
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import HModal from '@/components/Base/Modal';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';
import { getCurrEnv, setCurrEnv } from '@/utils/localStorage';

const userStore = useUserStore();
const appStore = useAppStore();
const currEnv = ref(getCurrEnv() || 'prod');
const isDev = process.env.NODE_ENV === 'development';
const modalVisiable = ref(false);
const modalTitle = ref('切换环境');
const envList = [
  {
    value: 'beta',
    label: '测试环境',
  },
  {
    value: 'prod',
    label: '正式环境',
  },
  {
    value: 'development',
    label: '本地开发环境',
  },
].filter((v) => {
  if (!isDev && v.value === 'development') {
    return false;
  }
  return true;
});

onMounted(() => {
  setCurrEnv(currEnv.value);
  appStore.setEnv(currEnv.value);
  handleVConsole();
});

function handleVConsole() {
  // if (['development', 'beta'].includes(currEnv.value)) {
  //   // eslint-disable-next-line
  //   import('vconsole').then((vConsole) => {
  //     // eslint-disable-next-line
  //     new vConsole.default();
  //   });
  // }
}

const modalConfirm = () => {
  setCurrEnv(currEnv.value);
  appStore.setEnv(currEnv.value);
  modalVisiable.value = false;
  window.$message.success(`切换${parseEnv(appStore.env)}环境成功！`);
  userStore.logout();
};

const parseEnv = (env) => {
  switch (env) {
    case 'prod':
      return '正式环境';
    case 'beta':
      return '测试环境';
    case 'development':
      return '本地开发环境';
    default:
      return '正式环境';
  }
};
</script>

<style lang="scss" scoped>
.switch-env {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 999;
  color: red;
  cursor: pointer;
}
</style>
