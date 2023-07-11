<template>
  <div>home{{ counter }}</div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const { counter, setCounter } = toRefs(appStore);

// setInterval(() => {
//   setCounter.value(counter.value + 1);
// }, 1000);
</script>

<style lang="scss" scoped></style>
