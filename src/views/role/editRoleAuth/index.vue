<template>
  <HForm
    ref="hFormRef"
    v-bind="formConfigRes"
    v-model="formData"
    :show-action="showAction"
    :confirm-loading="confirmLoading"
  ></HForm>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import HForm from '@/components/Base/Form';

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

const hFormRef = ref<InstanceType<typeof HForm>>();
const formData = ref({ ...props.modelValue });
const confirmLoading = ref(false);
const formConfigRes = ref();

defineExpose({
  validateForm,
});

onMounted(async () => {
  formConfigRes.value = await formConfig();
});

async function validateForm() {
  const res = await hFormRef.value?.handleValidate();
  return res;
}
</script>

<style lang="scss" scoped></style>
