<template>
  <div>
    <n-form
      ref="formRef"
      label-width="auto"
      label-align="right"
      :label-placement="labelPlacement"
      :style="formStyle"
      :model="modelValue"
    >
      <n-grid
        :cols="24"
        :x-gap="24"
      >
        <template
          v-for="item in formItems"
          :key="item.field"
        >
          <n-form-item-gi
            v-if="!item.isHidden"
            :span="item.gridSpan || gridSpan"
            :label="item.label"
            :label-width="item.labelWidth"
            :path="item.field"
            :rule="item.rule"
            :style="item.style"
          >
            <template v-if="item.type === FormTypeEnum.input">
              <n-input
                clearable
                :value="modelValue[`${item.field}`]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                type="text"
                @update:value="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === FormTypeEnum.number">
              <n-input-number
                clearable
                :value="modelValue[`${item.field}`]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                @update:value="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === FormTypeEnum.password">
              <n-input
                clearable
                :value="modelValue[`${item.field}`]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                type="password"
                @update:value="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === FormTypeEnum.treeSelect">
              <n-tree-select
                multiple
                cascade
                checkable
                :placeholder="item.placeholder"
                :key-field="item.treeSelectConfig?.key"
                :label-field="item.treeSelectConfig?.label"
                :disabled-field="item.treeSelectConfig?.disabled"
                :options="item.options"
                :value="modelValue[`${item.field}`]"
                @update:value="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === FormTypeEnum.select">
              <n-select
                :value="modelValue[`${item.field}`]"
                :options="item.options"
                :disabled="item.disabled"
                :placeholder="item.placeholder"
                clearable
                @update:value="handleValueChange($event, item.field)"
              />
            </template>
            <template v-else-if="item.type === FormTypeEnum.radio">
              <n-radio-group
                :value="modelValue[`${item.field}`]"
                @update:value="handleValueChange($event, item.field)"
              >
                <n-radio
                  v-for="radio in item.options"
                  :key="radio.label"
                  :value="radio.value"
                  :disabled="radio.disabled"
                >
                  {{ radio.label }}
                </n-radio>
              </n-radio-group>
            </template>
            <template v-else-if="item.type === FormTypeEnum.checkbox">
              <n-checkbox-group
                :value="modelValue[`${item.field}`]"
                @update:value="handleValueChange($event, item.field)"
              >
                <n-checkbox
                  v-for="checkbox in item.options"
                  :key="checkbox.label"
                  :value="checkbox.value"
                >
                  {{ checkbox.label }}
                </n-checkbox>
              </n-checkbox-group>
            </template>
            <template v-else-if="item.type === FormTypeEnum.switch">
              <n-switch
                :value="modelValue[`${item.field}`]"
                :checked-value="item.switchConfig?.checkedValue"
                :unchecked-value="item.switchConfig?.unCheckedValue"
                @update:value="handleValueChange($event, item.field)"
              >
                <template #checked>
                  {{ item.switchConfig?.checkedText }}
                </template>
                <template #unchecked>
                  {{ item.switchConfig?.unCheckedText }}
                </template>
              </n-switch>
            </template>
            <template v-else-if="item.type === FormTypeEnum.upload">
              <UploadCpt
                ref="hssUploadRef"
                :field="item.field"
                :placeholder="item.placeholder"
                :max="item.uploadConfig?.max"
                :prefix="item.uploadConfig?.prefix"
                :model-value="modelValue[`${item.field}`]"
                @update:value="handleValueChange($event, item.field)"
              ></UploadCpt>
            </template>
            <template v-else-if="item.type === FormTypeEnum.markdown">
              <MarkdownEditor
                :model-value="modelValue[`${item.field}`]"
                @update:value="handleValueChange($event, item.field)"
              ></MarkdownEditor>
            </template>
            <template v-else-if="item.type === FormTypeEnum.datePicker">
              <n-date-picker
                :value="modelValue[`${item.field}`]"
                type="datetimerange"
                :shortcuts="rangeShortcuts"
                clearable
                @update:value="handleValueChange($event, item.field)"
              ></n-date-picker>
            </template>
          </n-form-item-gi>
        </template>
      </n-grid>

      <!-- 这里需要一个空格占位 -->
      <n-form-item
        v-if="showAction"
        label=" "
      >
        <n-space>
          <n-button @click="handleReset">重置</n-button>
          <n-button
            type="success"
            :loading="loading"
            @click="handleConfirm"
          >
            确定
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { fetchDeleteQiniuDataByQiniuKey } from '@/api/qiniuData';
import UploadCpt from '@/components/Base/Upload';
import MarkdownEditor from '@/components/MarkdownEditor';
import { QINIU_CDN_URL } from '@/constant';
import { FormTypeEnum } from '@/interface';

import { IFormItem } from '../types';

import type { PropType } from 'vue';

export default defineComponent({
  components: {
    MarkdownEditor,
    UploadCpt,
  },
  props: {
    modelValue: {
      type: Object,
      // required: true,
      default: () => {},
    },
    formItems: {
      type: Array as PropType<IFormItem<string>[]>,
      default: () => [],
    },
    gridSpan: {
      type: Number,
      default: 24,
    },
    showAction: {
      type: Boolean,
      default: false,
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    formStyle: {
      type: Object,
      default: () => {},
    },
    labelPlacement: {
      type: String,
      default: 'left',
    },
  },
  emits: ['update:modelValue', 'click:confirm', 'update:filed'],
  // emits: {
  //   'update:modelValue': (payload: any) => {
  //     return true;
  //   },
  //   'update:filed': (field: string, value: any) => {
  //     return true;
  //   },
  //   'click:confirm': (payload: any) => {
  //     return true;
  //   },
  // },
  setup(props, { emit }) {
    const formRef = ref<any>(null);
    const hssUploadRef = ref<any[]>();
    const loading = ref(props.confirmLoading);
    const handleValueChange = (value: any, field: string) => {
      console.log('kkkkkkkkkk', value, field);
      emit('update:modelValue', { ...props.modelValue, [field]: value });
      emit('update:filed', field, value);
    };

    const handleReset = () => {
      const obj = {};
      props.formItems.forEach((item) => {
        if (!item.disabled) {
          obj[item.field] = null;
        } else {
          obj[item.field] = props.modelValue[item.field];
        }
      });
      emit('update:modelValue', obj);
    };

    const handleValidate = () => {
      return new Promise((resolve, reject) => {
        formRef.value.validate((error) => {
          if (!error) {
            resolve(props.modelValue);
          } else {
            reject(error);
          }
        });
      });
    };

    // 和handleConfirm的唯一区别就是没有emit click:confirm事件，因为validateAndUpload注要是暴露给外部用的
    const validateAndUpload = async () => {
      try {
        loading.value = true;
        const res: any = await handleValidate();
        const uploadQueue: any = [];
        const delQueue: any = [];
        const del: string[] = [];
        hssUploadRef.value?.forEach((item) => {
          uploadQueue.push(item.startUpload());
        });
        const result = await Promise.all(uploadQueue);
        result.forEach((item) => {
          res[item.field] = item.result;
          del.push(...item.del);
        });
        del.forEach((url) => {
          const qiniu_key = url.replace(QINIU_CDN_URL, '');
          delQueue.push(fetchDeleteQiniuDataByQiniuKey(qiniu_key));
        });
        await Promise.all(delQueue);
        loading.value = false;
        return res;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };

    const handleConfirm = async () => {
      try {
        loading.value = true;
        const res: any = await handleValidate();
        const uploadQueue: any = [];
        const delQueue: any = [];
        const del: string[] = [];
        hssUploadRef.value?.forEach((item) => {
          uploadQueue.push(item.startUpload());
        });
        const result = await Promise.all(uploadQueue);
        result.forEach((item) => {
          res[item.field] = item.result;
          del.push(...item.del);
        });
        del.forEach((url) => {
          const qiniu_key = url.replace(QINIU_CDN_URL, '');
          delQueue.push(fetchDeleteQiniuDataByQiniuKey(qiniu_key));
        });
        await Promise.all(delQueue);
        loading.value = false;
        emit('click:confirm', res);
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };

    return {
      loading,
      formRef,
      hssUploadRef,
      handleValidate,
      validateAndUpload,
      handleReset,
      handleConfirm,
      handleValueChange,
      FormTypeEnum,
      rangeShortcuts: {
        近1小时: () => {
          const cur = new Date().getTime();
          return [cur - 1 * 60 * 60 * 1000, cur];
        },
        近2小时: () => {
          const cur = new Date().getTime();
          return [cur - 2 * 60 * 60 * 1000, cur];
        },
        近4小时: () => {
          const cur = new Date().getTime();
          return [cur - 4 * 60 * 60 * 1000, cur];
        },
        近6小时: () => {
          const cur = new Date().getTime();
          return [cur - 6 * 60 * 60 * 1000, cur];
        },
        近12小时: () => {
          const cur = new Date().getTime();
          return [cur - 12 * 60 * 60 * 1000, cur];
        },
        近24小时: () => {
          const cur = new Date().getTime();
          return [cur - 24 * 60 * 60 * 1000, cur];
        },
      },
    };
  },
});
</script>

<style lang="scss" scoped></style>
