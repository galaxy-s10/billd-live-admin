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
import { onMounted, ref } from 'vue';

import { fetchUpdateLiveRoom } from '@/api/liveRoom';
import HForm, { IForm } from '@/components/Base/Form';
import { ILiveRoom } from '@/interface';

import { formConfig } from './config/form.config';

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

defineExpose({
  validateForm,
  validateAndUpload,
});

const hFormRef = ref<InstanceType<typeof HForm>>();
const formData = ref({ ...props.modelValue });
const confirmLoading = ref(false);
const formConfigRes = ref<IForm<ILiveRoom>>();

onMounted(() => {
  formConfigRes.value = formConfig();
});

const handleConfirm = async (v: ILiveRoom) => {
  try {
    const res = await fetchUpdateLiveRoom(v);
    if (res.code === 200) {
      window.$message.success('设置成功！');
    }
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
