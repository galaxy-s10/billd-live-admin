<template>
  <div v-if="!route.query.id">请选择前端设置id</div>
  <AddFrontend
    v-if="Object.keys(formData).length"
    v-model="formData"
  ></AddFrontend>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { fetchFindFrontend } from '@/api/liveConfig';

import AddFrontend from '../add/index.vue';

const formData = ref({});
const route = useRoute();

onMounted(async () => {
  if (!route.query.id) return;
  const { data } = await fetchFindFrontend(+route.query.id!);
  formData.value = data;
});
</script>

<style lang="scss" scoped></style>
