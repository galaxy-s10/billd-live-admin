<template>
  <div class="mardown-wrap">
    <v-md-editor
      v-model="text"
      height="600px"
      :disabled-menus="[]"
      @change="handleChange"
      @upload-image="handleUploadImage"
    ></v-md-editor>
  </div>
</template>

<script lang="ts" setup>
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import VMdEditor from '@kangc/v-md-editor';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { ref, watch } from 'vue';

import { useUpload } from '@/hooks/use-upload';
import { TENCENTCLOUD_COS } from '@/spec-config';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('bash', bash);

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

VMdEditor.use(createTodoListPlugin()); // 任务列表
VMdEditor.use(createCopyCodePlugin()); // 快捷复制代码

const props = withDefaults(
  defineProps<{
    modelValue: string;
  }>(),
  {
    modelValue: '',
  }
);
const emits = defineEmits(['update:value']);

const text = ref(props.modelValue);
const allImg = ref<string[]>([]);
watch(
  () => props.modelValue,
  (val) => {
    if (val === null) text.value = '';
  }
);
const handleChange = (str) => {
  text.value = str;
  emits('update:value', str);
};

const handleUploadImage = async (_event, insertImage, files) => {
  try {
    const res: any = await useUpload({
      prefix:
        TENCENTCLOUD_COS['res-1305322458'].prefix['billd-live/client/img/'],
      file: files[0],
    });
    const img = {
      url: res.resultUrl,
      desc: res.resultUrl,
      // width: 'auto',
      // height: 'auto',
    };
    insertImage(img);
    allImg.value.push(img.url);
  } catch (error: any) {
    console.log(error);
    window.$message.error(error?.message);
  }
};
</script>

<style lang="scss" scoped>
.mardown-wrap {
  width: 100%;
  & :deep(.github-markdown-body) {
    blockquote {
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
