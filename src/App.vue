<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view></router-view>
    <SwitchEnv></SwitchEnv>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui';

const themeOverrides = {
  common: {
    primaryColor: '#ffd700',
  },
};
</script>

<style lang="scss" scoped></style>
