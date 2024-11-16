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

import { fetchFindLiveRoom, fetchUpdateLiveRoom } from '@/api/liveRoom';
import HForm from '@/components/Base/Form';

import { formConfig } from './config/form.config';

const route = useRoute();
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    showAction?: boolean;
  }>(),
  {
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
    const res = await fetchFindLiveRoom(id.value);
    if (res.code !== 200) return;
    const row = res.data;
    let bgImg: UploadFileInfo[] = [];
    let coverImg: UploadFileInfo[] = [];
    if (row.bg_img) {
      bgImg = [
        {
          id: row.bg_img as string,
          name: row.bg_img as string,
          url: row.bg_img as string,
          status: 'finished',
          percentage: 100,
        },
      ];
    }
    if (row.cover_img) {
      coverImg = [
        {
          id: row.cover_img as string,
          name: row.cover_img as string,
          url: row.cover_img as string,
          status: 'finished',
          percentage: 100,
        },
      ];
    }
    formData.value = {
      ...row,
      // @ts-ignore
      bg_img: bgImg,
      // @ts-ignore
      cover_img: coverImg,
    };
  }
}

const handleConfirm = async (v) => {
  try {
    confirmLoading.value = true;
    const { message }: any = await fetchUpdateLiveRoom(v);
    window.$message.success(message);
  } catch (error) {
    console.log(error);
  } finally {
    confirmLoading.value = false;
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
