<template>
  <div>home221{{ appStore.path }}</div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
</script>

<style lang="scss" scoped></style>
