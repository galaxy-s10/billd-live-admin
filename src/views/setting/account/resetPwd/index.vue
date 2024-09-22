<template>
  <n-modal
    :show="showModal"
    preset="dialog"
    title="重置密码"
    positive-text="确认"
    negative-text="取消"
    :mask-closable="false"
    :loading="loading"
    @positive-click="submitCallback"
    @negative-click="negativeClick"
    @after-leave="afterLeave"
    @close="negativeClick"
  >
    <n-form
      ref="bindEmailFormRef"
      label-placement="left"
      size="large"
      :model="bindEmailForm"
      :rules="bindEmailRules"
    >
      <n-form-item path="oldpwd">
        <n-input
          v-model:value="bindEmailForm.oldpwd"
          placeholder="请输入旧密码"
        >
          <template #prefix>
            <n-icon
              size="20"
              class="lang"
            >
              <LockClosedOutline></LockClosedOutline>
            </n-icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="newpwd">
        <n-input
          v-model:value="bindEmailForm.newpwd"
          placeholder="请输入新密码"
        >
          <template #prefix>
            <n-icon
              size="20"
              class="lang"
            >
              <LockClosedOutline></LockClosedOutline>
            </n-icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="newpwd2">
        <n-input
          v-model:value="bindEmailForm.newpwd2"
          placeholder="请再次输入新密码"
        >
          <template #prefix>
            <n-icon
              size="20"
              class="lang"
            >
              <LockClosedOutline></LockClosedOutline>
            </n-icon>
          </template>
        </n-input>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script lang="ts">
export default {
  name: 'ResetPwdCpt',
};
</script>

<script lang="ts" setup>
import { LockClosedOutline } from '@vicons/ionicons5';
import { windowReload } from 'billd-utils';
import { FormItemRule, FormRules } from 'naive-ui';
import { ref } from 'vue';

import { fetchUpdatePwd } from '@/api/user';

const emits = defineEmits(['negativeClick']);

function validatePasswordStartWith(
  _rule: FormItemRule,
  value: string
): boolean {
  return (
    !!bindEmailForm.value.newpwd &&
    bindEmailForm.value.newpwd.startsWith(value) &&
    bindEmailForm.value.newpwd.length === value.length
  );
}
const bindEmailRules: FormRules = {
  oldpwd: { required: true, message: '请输入旧密码', trigger: 'blur' },
  newpwd: { required: true, message: '请输入新密码', trigger: 'blur' },
  newpwd2: {
    required: true,
    message: '请再次输入新密码',
    trigger: 'blur',
    validator: validatePasswordStartWith,
  },
};
const loading = ref(false);
const showModal = ref(true);
const bindEmailFormRef = ref(null);
const bindEmailForm = ref({
  oldpwd: '',
  newpwd: '',
  newpwd2: '',
});

const submitCallback = () => {
  // @ts-ignore
  bindEmailFormRef.value!.validate(async (errors) => {
    if (!errors) {
      try {
        loading.value = true;
        const res: any = await fetchUpdatePwd({
          oldpwd: bindEmailForm.value.oldpwd,
          newpwd: bindEmailForm.value.newpwd,
        });
        window.$message.success(res.message);
        emits('negativeClick', false);
        setTimeout(() => {
          windowReload();
        }, 500);
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    }
  });
};

const negativeClick = () => {
  emits('negativeClick', false);
};

const afterLeave = () => {};
</script>

<style lang="scss" scoped></style>
