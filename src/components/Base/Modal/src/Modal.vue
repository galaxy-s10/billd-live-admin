<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      :title="title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-icon
          size="20"
          style="cursor: pointer"
          @click="modalCancel"
        >
          <CloseOutline></CloseOutline>
        </n-icon>
      </template>
      <slot>默认内容</slot>
      <template #footer>
        <n-space justify="end">
          <n-button
            type="primary"
            :loading="loading"
            @click="modalConfirm"
          >
            确定
          </n-button>
          <n-button @click="modalCancel">取消</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { CloseOutline } from '@vicons/ionicons5';
import { ref, toRefs, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    show?: boolean;
    loading?: boolean;
    title?: string;
  }>(),
  {
    title: '',
  }
);
const emits = defineEmits(['update:show', 'confirm', 'cancel']);

const { show } = toRefs(props);
const showModal = ref(false);

const modalConfirm = () => {
  emits('confirm');
};

const modalCancel = () => {
  emits('cancel');
};

watch(
  () => show.value,
  (newVal) => {
    showModal.value = newVal;
  }
);

watch(
  () => showModal.value,
  (newVal, oldVal) => {
    showModal.value = newVal;
    emits('update:show', newVal, oldVal);
  }
);
</script>

<style lang="scss" scoped></style>
