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

import {
  fetchUpload,
  fetchUploadChunk,
  fetchUploadMergeChunk,
  fetchUploadProgress,
} from '@/api/qiniuData';
import { QINIU_BLOG } from '@/constant';
import { getHash, splitFile } from '@/utils';

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
    prefix: QINIU_BLOG.prefix['image/'],
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
const prefixOptions = Object.keys(QINIU_BLOG.prefix).map((v) => {
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

const mergeAndUpload = async ({ hash, ext, id }) => {
  await fetchUploadMergeChunk({ hash, ext });
  const { data } = await fetchUpload({
    hash,
    ext,
    prefix: prefixValue.value,
  });
  list.value.forEach((val) => {
    if (val.id === id) {
      val.status = 'finished';
      val.percentage = 100;
      val.url = data.resultUrl;
    }
  });
  clearInterval(timerObj.value[id]);
  return data;
};

const upload = async (file: UploadFileInfo) => {
  const id = file.id;
  try {
    const { hash, ext } = await getHash(file.file!);
    const prefix = prefixValue.value;
    const { code } = await fetchUploadProgress({ prefix, hash, ext });
    if (code === 3) {
      const { data } = await fetchUpload({ prefix, hash, ext });
      list.value.forEach((val) => {
        if (val.id === id) {
          val.status = 'finished';
          val.percentage = 100;
          val.url = data.resultUrl;
        }
      });
      return data;
    }
    const chunkList = splitFile(file.file!);
    let isMerge = false;
    return new Promise((resolve) => {
      for (let i = 0; i < chunkList.length; i += 1) {
        const v = chunkList[i];
        const form = new FormData();
        form.append('prefix', prefix);
        form.append('hash', hash);
        form.append('ext', ext);
        form.append('chunkName', v.chunkName);
        form.append('chunkTotal', `${chunkList.length}`);
        form.append('uploadFiles', v.chunk);
        fetchUploadChunk(form).then((res) => {
          list.value.forEach((val) => {
            if (val.id === id) {
              val.status = 'uploading';
              val.percentage = res.data.percentage;
              if (res.data.percentage === 50) {
                if (!isMerge) {
                  mergeAndUpload({ hash, ext, id }).then((uploadRes) => {
                    resolve(uploadRes);
                  });
                  isMerge = true;
                }
              }
            }
          });
        });
      }
      let flag = false;
      timerObj.value[id] = setInterval(async () => {
        try {
          const { code, data, message } = await fetchUploadProgress({
            hash,
            prefix,
            ext,
          });
          if (flag) {
            clearInterval(timerObj.value[id]);
            return;
          }
          if (code === 1) {
            const percentage = data.percentage!;
            list.value.forEach((v) => {
              if (v.id === file.id) {
                v.status = percentage < 100 ? 'uploading' : 'finished';
                v.percentage = percentage;
              }
            });
            if (percentage === 100) {
              flag = true;
            }
          } else if (code === 2) {
            list.value.forEach((v) => {
              if (v.id === file.id) {
                v.status = 'uploading';
                v.percentage = 0;
              }
            });
          } else {
            console.log(code, message);
          }
        } catch (error) {
          console.log(error);
          clearInterval(timerObj.value[id]);
        }
      }, 1000);
    });
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
