<template>
  <n-form
    ref="formRef"
    label-width="auto"
    label-align="right"
    :label-placement="props.labelPlacement"
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
              :placeholder="item.placeholder || ''"
              :disabled="item.disabled"
              type="text"
              @update:value="handleValueChange($event, item.field)"
            />
          </template>
          <template v-else-if="item.type === FormTypeEnum.number">
            <n-input-number
              clearable
              :value="modelValue[`${item.field}`]"
              :placeholder="item.placeholder || ''"
              :disabled="item.disabled"
              @update:value="handleValueChange($event, item.field)"
            />
          </template>
          <template v-else-if="item.type === FormTypeEnum.password">
            <n-input
              clearable
              :value="modelValue[`${item.field}`]"
              :placeholder="item.placeholder || ''"
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
              :placeholder="item.placeholder || ''"
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
              :placeholder="item.placeholder || ''"
              :render-label="renderSelectLabel"
              clearable
              @update:value="handleValueChange($event, item.field)"
            />
          </template>
          <template v-else-if="item.type === FormTypeEnum.radio">
            <n-radio-group
              :value="modelValue[`${item.field}`]"
              :default-value="item.optionsDefaultChecked"
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
              :default-value="item.switchConfig?.defaultValue"
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
              ref="hUploadRef"
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
          <template v-else-if="item.type === FormTypeEnum.datePickerRange">
            <n-date-picker
              :value="modelValue[`${item.field}`]"
              type="datetimerange"
              :shortcuts="rangeShortcuts"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              clearable
              @update:value="handleValueChange($event, item.field)"
            ></n-date-picker>
          </template>
          <template v-else-if="item.type === FormTypeEnum.datePickerDatetime">
            <n-date-picker
              :value="modelValue[`${item.field}`]"
              type="datetime"
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
</template>

<script lang="ts" setup>
import { SelectOption } from 'naive-ui';
import { Shortcuts } from 'naive-ui/es/date-picker/src/interface';
import { LabelPlacement } from 'naive-ui/es/form/src/interface';
import { StyleValue, ref } from 'vue';

import UploadCpt from '@/components/Base/Upload';
import MarkdownEditor from '@/components/MarkdownEditor';
import { FormTypeEnum } from '@/interface';
import { dateStartAndEnd } from '@/utils';

import { IFormItemFieldString } from '../types';

const props = withDefaults(
  defineProps<{
    modelValue: any;
    formItems?: IFormItemFieldString[];
    gridSpan?: number;
    showAction?: boolean;
    confirmLoading?: boolean;
    formStyle?: StyleValue;
    labelPlacement?: LabelPlacement;
  }>(),
  {
    formItems: () => [],
    showAction: false,
    gridSpan: undefined,
    formStyle: undefined,
    labelPlacement: 'left',
  }
);

const emits = defineEmits([
  'update:modelValue',
  'click:confirm',
  'update:filed',
]);

defineExpose({
  handleReset,
  handleValidate,
  validateAndUpload,
});

const formRef = ref<any>();
const hUploadRef = ref<InstanceType<typeof UploadCpt>[]>([]);
const loading = ref(props.confirmLoading);

function handleValidate() {
  return new Promise((resolve, reject) => {
    formRef.value.validate((error) => {
      if (!error) {
        resolve(props.modelValue);
      } else {
        console.log('字段校验错误', props.modelValue);
        reject(error);
      }
    });
  });
}

const rangeShortcuts: Shortcuts = {
  近2小时: () => {
    const cur = new Date().getTime();
    return [cur - 2 * 60 * 60 * 1000, cur];
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
  近2天: () => {
    const cur = new Date().getTime();
    return [cur - 2 * 24 * 60 * 60 * 1000, cur];
  },
  近3天: () => {
    const cur = new Date().getTime();
    return [cur - 3 * 24 * 60 * 60 * 1000, cur];
  },
  近1周: () => {
    const cur = new Date().getTime();
    return [cur - 7 * 24 * 60 * 60 * 1000, cur];
  },
  近1个月: () => {
    const cur = new Date().getTime();
    return [cur - 30 * 24 * 60 * 60 * 1000, cur];
  },
  近3个月: () => {
    const cur = new Date().getTime();
    return [cur - 30 * 3 * 24 * 60 * 60 * 1000, cur];
  },
  近半年: () => {
    const cur = new Date().getTime();
    return [cur - 30 * 6 * 24 * 60 * 60 * 1000, cur];
  },
  近一年: () => {
    const cur = new Date().getTime();
    return [cur - 30 * 12 * 24 * 60 * 60 * 1000, cur];
  },
  今天: () => {
    const res = dateStartAndEnd(new Date());
    return [+new Date(res.startTime), +new Date(res.endTime)];
  },
  昨天: () => {
    // 获取今天的日期
    const today = new Date();
    // 创建一个新的日期对象，设置为昨天
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const res = dateStartAndEnd(yesterday);
    return [+new Date(res.startTime), +new Date(res.endTime)];
  },
  当月: () => {
    // 获取当前日期
    const today = new Date();

    // 获取当前年份和月份
    const year = today.getFullYear();
    const month = today.getMonth(); // 注意：月份从0开始，0代表1月，11代表12月

    // 获取当前月份的第一天和最后一天
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0); // 下个月的第一天减去一天
    const { endTime } = dateStartAndEnd(lastDay);
    return [+new Date(firstDay), +new Date(endTime)];
  },
  上月: () => {
    // 获取当前日期
    const today = new Date();

    // 获取当前年份和月份
    const year = today.getFullYear();
    const month = today.getMonth(); // 注意：月份从0开始，0代表1月，11代表12月

    // 获取上个月的第一天和最后一天
    const firstDayLastMonth = new Date(year, month - 1, 1);
    const lastDayLastMonth = new Date(year, month, 0); // 当前月的第一天减去一天

    const { endTime } = dateStartAndEnd(lastDayLastMonth);
    return [+new Date(firstDayLastMonth), +new Date(endTime)];
  },
};

function renderSelectLabel(option: SelectOption) {
  return (option.label as string) || '';
}

const handleValueChange = (value: any, field: string) => {
  emits('update:modelValue', { ...props.modelValue, [field]: value });
  emits('update:filed', field, value);
};

function handleReset() {
  const obj = {};
  props.formItems.forEach((item) => {
    if (!item.disabled) {
      obj[item.field] = null;
    } else {
      obj[item.field] = props.modelValue[item.field];
    }
  });
  emits('update:modelValue', obj);
}

// 和handleConfirm的唯一区别就是没有emit click:confirm事件，因为validateAndUpload注要是暴露给外部用的
async function validateAndUpload() {
  try {
    loading.value = true;
    const res: any = await handleValidate();
    const uploadQueue: any = [];
    // const delQueue: any = [];
    const del: string[] = [];
    hUploadRef.value.forEach((item) => {
      uploadQueue.push(item.startUpload());
    });
    const result = await Promise.all(uploadQueue);
    result.forEach((item) => {
      res[item.field] = item.result;
      del.push(...item.del);
    });
    // del.forEach((url) => {
    //   // eslint-disable-next-line
    //   const qiniu_key = url.replace(QINIU_CDN_URL, '');
    //   delQueue.push(fetchDeleteQiniuDataByQiniuKey(qiniu_key));
    // });
    // await Promise.all(delQueue);
    loading.value = false;
    return res;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
}

const handleConfirm = async () => {
  try {
    loading.value = true;
    const res: any = await handleValidate();
    const uploadQueue: any = [];
    // const delQueue: any = [];
    const del: string[] = [];
    hUploadRef.value.forEach((item) => {
      uploadQueue.push(item.startUpload());
    });
    const result = await Promise.all(uploadQueue);
    result.forEach((item) => {
      res[item.field] = item.result;
      del.push(...item.del);
    });
    // del.forEach((url) => {
    //   // eslint-disable-next-line
    //   const qiniu_key = url.replace(QINIU_CDN_URL, '');
    //   delQueue.push(fetchDeleteQiniuDataByQiniuKey(qiniu_key));
    // });
    // await Promise.all(delQueue);
    loading.value = false;
    emits('click:confirm', res);
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
