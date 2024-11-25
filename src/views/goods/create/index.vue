<template>
  <HForm
    ref="hFormRef"
    v-bind="formConfigRes"
    v-model="formData"
    :show-action="showAction"
    :confirm-loading="confirmLoading"
    @click:confirm="handleConfirm"
  ></HForm>
</template>

<script lang="ts" setup>
import { UploadFileInfo } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import {
  fetchGoodsCreate,
  fetchGoodsFind,
  fetchGoodsUpdate,
} from '@/api/googds';
import HForm from '@/components/Base/Form';
import { IGoods } from '@/interface';

import { formConfig } from './config/form.config';

const route = useRoute();
const props = withDefaults(
  defineProps<{
    edit?: boolean;
    modelValue?: any;
    showAction?: boolean;
  }>(),
  {
    edit: false,
    modelValue: {},
    showAction: true,
  }
);

const hFormRef = ref<InstanceType<typeof HForm>>();
const formData = ref({ ...props.modelValue });
const confirmLoading = ref(false);
const formConfigRes = ref();
const id = ref();

defineExpose({
  validateForm,
  validateAndUpload,
});

onMounted(async () => {
  id.value = Number(route.query.id);
  await find();
  formConfigRes.value = await formConfig();
});

async function find() {
  if (id.value) {
    const res = await fetchGoodsFind(id.value);
    if (res.code !== 200) return;
    const row = res.data;
    let coverImg: UploadFileInfo[] = [];
    if (row.cover) {
      coverImg = [
        {
          id: row.cover as string,
          name: row.cover as string,
          url: row.cover as string,
          status: 'finished',
          percentage: 100,
        },
      ];
    }

    formData.value = {
      ...row,
      // @ts-ignore
      cover: coverImg,
    };
  }
}

async function handleCreate(v: IGoods) {
  try {
    confirmLoading.value = true;
    const { message }: any = await fetchGoodsCreate({
      ...v,
      // @ts-ignore
      cover: v.cover?.[0]?.resultUrl,
    });
    window.$message.success(message);
  } catch (error) {
    console.log(error);
  }
  confirmLoading.value = false;
}
async function handleUpdate(v: IGoods) {
  try {
    confirmLoading.value = true;
    const { message }: any = await fetchGoodsUpdate({
      ...v,
      // @ts-ignore
      cover: v.cover?.[0]?.resultUrl,
    });
    window.$message.success(message);
  } catch (error) {
    console.log(error);
  }
  confirmLoading.value = false;
}

const handleConfirm = async (v: IGoods) => {
  if (props.edit) {
    await handleUpdate(v);
  } else {
    await handleCreate(v);
  }
};

async function validateForm() {
  const res = await hFormRef.value?.handleValidate();
  return res;
}
async function validateAndUpload() {
  const res = await hFormRef.value?.validateAndUpload();
  return res;
}
</script>

<style lang="scss" scoped></style>
