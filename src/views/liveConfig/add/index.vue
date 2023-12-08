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
import { useRoute } from 'vue-router';

import { fetchCreateFrontend } from '@/api/liveConfig';
import HForm, { IForm } from '@/components/Base/Form';
import { FormTypeEnum, ILiveConfig } from '@/interface';

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

const route = useRoute();

const hFormRef = ref<InstanceType<typeof HForm>>();
const formData = ref({ ...props.modelValue });
const confirmLoading = ref(false);
const formConfigRes = ref<IForm<ILiveConfig>>();

onMounted(() => {
  formConfigRes.value = formConfig(formData.value.type!);
  if (formData.value.type === FormTypeEnum.upload) {
    formConfigRes.value.formItems.forEach((item) => {
      if (item.field === 'value') {
        item.uploadConfig = {
          max: 1,
        };
        item.placeholder = '请选择文件';
        item.rule = { required: true, trigger: 'blur', type: 'array' };
      }
    });
    formData.value.value = [
      {
        id: formData.value.value,
        name: formData.value.value,
        url: formData.value.value,
        status: 'finished',
        percentage: 100,
      },
    ];
  }
});

const handleConfirm = async (v) => {
  try {
    confirmLoading.value = true;
    if (route.query.id) {
      console.log(v);
      window.$message.success('更新成功');
    } else {
      const { message }: any = await fetchCreateFrontend(v);
      window.$message.success(message);
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
