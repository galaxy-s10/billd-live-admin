<template>
  <div v-if="!route.query.id">请选择商品id</div>
  <AddCpt
    v-if="Object.keys(formData).length"
    :edit="true"
    v-model="formData"
  ></AddCpt>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { fetchGoodsFind } from '@/api/googds';

import AddCpt from '../create/index.vue';

const formData = ref({});
const route = useRoute();

onMounted(async () => {
  if (!route.query.id) return;
  const { data } = await fetchGoodsFind(+route.query.id!);
  formData.value = data;
});
</script>

<style lang="scss" scoped></style>
