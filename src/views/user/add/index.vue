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

import { fetchRoleList } from '@/api/role';
import { fetchUserCreate } from '@/api/user';
import HForm from '@/components/Base/Form';
import { DEFAULT_ROLE_INFO } from '@/constant';
import { IUser } from '@/interface';

import { formConfig } from './config/form.config';

const formConfigRes = ref();

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

onMounted(async () => {
  const res = await fetchRoleList({});
  if (res.code === 200) {
    formConfigRes.value = await formConfig({
      roleOptions: res.data.rows
        .filter((v) => v.id !== DEFAULT_ROLE_INFO.ALL_ROLE.id)
        .map((v) => {
          return { label: v.role_name, value: v.id };
        }),
    });
  }
});

defineExpose({
  validateForm,
  validateAndUpload,
});

const handleConfirm = async (vv: IUser) => {
  const v = { ...vv };
  let avatar = '';
  // @ts-ignore
  if (v.avatar?.[0] && v.avatar[0].flag) {
    // @ts-ignore
    avatar = v.avatar[0].resultUrl;
  }
  v.avatar = avatar;
  // @ts-ignore
  v.user_roles = [v.user_roles];

  const res = await fetchUserCreate(v);
  if (res.code === 200) {
    window.$message.success('新建成功！');
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
