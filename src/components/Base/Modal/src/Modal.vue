<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import { CloseOutline } from '@vicons/ionicons5';
import { defineComponent, toRefs, ref, watch } from 'vue';

export default defineComponent({
  components: { CloseOutline },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
  },
  emits: {
    'update:show': null,
    confirm: null,
    cancel: null,
  },
  setup(props, context) {
    const { show } = toRefs(props);
    const showModal = ref(false);
    const modalConfirm = () => {
      context.emit('confirm');
    };

    const modalCancel = () => {
      context.emit('cancel');
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
        context.emit('update:show', newVal, oldVal);
      }
    );

    return {
      modalConfirm,
      modalCancel,
      showModal,
    };
  },
});
</script>

<style lang="scss" scoped></style>
