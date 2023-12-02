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
      @cancel="modalCancel"
    >
      选择当前环境：
      <n-radio-group v-model:value="currEnv">
        <n-space>
          <n-radio
            v-for="env in envlist2"
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
        @click="showModal"
      >
        切换环境
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { windowReload } from 'billd-utils';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import HModal from '@/components/Base/Modal';
import { envList } from '@/constant';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';
import { getCurrEnv, setCurrEnv } from '@/utils/localStorage';

const router = useRouter();
const userStore = useUserStore();
const appStore = useAppStore();
const currEnv = ref(appStore.env);
const hasEnv = getCurrEnv();
const isDev = process.env.NODE_ENV === 'development';
const modalVisiable = ref(false);
const modalTitle = ref('切换环境');

const envlist2 = envList.filter((v) => {
  if (!isDev && v.value === 'development') {
    return false;
  }
  return true;
});

watch(
  () => appStore.env,
  () => {
    currEnv.value = appStore.env;
    handleVConsole();
  }
);

if (hasEnv) {
  appStore.setEnv(hasEnv);
} else {
  appStore.setEnv('prod');
  setCurrEnv('prod');
}
handleVConsole();

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
  appStore.setEnv(currEnv.value);
  setCurrEnv(currEnv.value);
  window.$message.success(`切换${parseEnv(currEnv.value)}环境成功！`);
  modalVisiable.value = false;
  userStore.logout();
  // eslint-disable-next-line
  router.push('/login').then(() => windowReload());
};

const modalCancel = () => {
  modalVisiable.value = false;
};

const parseEnv = (env) => {
  switch (env) {
    case 'beta':
      return '测试环境';
    case 'prod':
      return '正式环境';
    default:
      return '本地开发环境';
  }
};

const showModal = () => {
  modalVisiable.value = !modalVisiable.value;
};
</script>

<style lang="scss" scoped>
.switch-env {
  position: fixed;
  bottom: 0;
  right: 0;
  color: red;
  z-index: 9999;
  cursor: pointer;
}
</style>
