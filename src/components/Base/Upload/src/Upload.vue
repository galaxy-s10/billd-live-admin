<template>
  <div class="upload-wrap">
    <n-select
      v-model:value="prefixValue"
      :options="prefixOptions"
    />
    <n-upload
      v-model:file-list="list"
      multiple
      :max="max"
      directory-dnd
      @change="handleUploadChange"
      @before-upload="beforeUpload"
    >
      <n-upload-dragger>
        <n-text style="font-size: 16px">
          {{ placeholder }}
        </n-text>
      </n-upload-dragger>
    </n-upload>
  </div>
</template>

<script lang="ts" setup>
import { UploadFileInfo } from 'naive-ui';
import { ref, watch } from 'vue';

import { useUpload } from '@/hooks/use-upload';
import { QINIU_KODO } from '@/spec-config';

const props = withDefaults(
  defineProps<{
    modelValue: any[];
    field?: string;
    placeholder?: string;
    max?: number;
    prefix?: string;
  }>(),
  {
    modelValue: () => [],
    field: '',
    placeholder: '点击或者拖动文件到该区域来上传',
    max: 10,
    prefix: QINIU_KODO.hssblog.prefix['billd-live/image/'],
  }
);
const emits = defineEmits(['update:value']);

defineExpose({
  startUpload,
});

const list = ref<UploadFileInfo[]>(
  props.modelValue.map((item: UploadFileInfo): UploadFileInfo => {
    return {
      id: item.id,
      name: item.name,
      url: item.url,
      status: item.status,
      percentage: item.percentage,
    };
  })
);
const oldList = [...list.value];
const prefixOptions = Object.keys(QINIU_KODO.hssblog.prefix).map((v) => {
  return { label: v, value: v };
});
const prefixValue = ref(props.prefix);
const timerObj = ref({});

watch(
  // @ts-ignore
  () => props.modelValue,
  (val) => {
    // 表单重置
    if (val === null) list.value = [];
    emits('update:value', val);
  }
);

const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
  list.value = data.fileList;
  emits('update:value', list.value);
};

const upload = async (file: UploadFileInfo) => {
  const id = file.id;
  try {
    const res = await useUpload({
      prefix: QINIU_KODO.hssblog.prefix['billd-live/image/'],
      file: file.file!,
    });
    return {
      flag: res.flag,
      resultUrl: res.resultUrl,
    };
  } catch (error) {
    console.log(error);
    clearInterval(timerObj.value[id]);
  }
};

async function startUpload() {
  const queue: any = [];
  const del: string[] = [];
  list.value.forEach((v) => {
    if (v.file) {
      queue.push(upload(v));
    } else {
      queue.push(Promise.resolve({ flag: true, resultUrl: v.url }));
    }
  });
  const result = await Promise.all(queue);
  oldList.forEach((val) => {
    let flag = false;
    for (let i = 0; i < result.length; i += 1) {
      if (result[i].resultUrl === val.url) {
        flag = true;
        return;
      }
    }
    if (!flag) {
      del.push(val.url!);
    }
  });
  return { field: props.field, result, del };
}

const beforeUpload = () => {
  return true;
};
</script>

<style lang="scss" scoped>
.upload-wrap {
  display: flex;
  flex-direction: column;
}
</style>
