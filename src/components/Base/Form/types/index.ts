import { FormItemRule } from 'naive-ui';
import { LabelPlacement } from 'naive-ui/es/form/src/interface';
import { StyleValue } from 'vue';

import { FormTypeEnum } from '@/interface';

export interface IFormItemBase {
  type: FormTypeEnum;
  label: string;
  gridSpan?: number;
  labelWidth?: number;
  rule?: FormItemRule | Array<FormItemRule>;
  disabled?: boolean;
  uploadConfig?: {
    max?: number;
    prefix?: string;
  };
  treeSelectConfig?: {
    key?: string;
    label?: string;
    disabled?: string;
  };
  switchConfig?: {
    checkedText?: string;
    unCheckedText?: string;
    checkedValue?: any;
    unCheckedValue?: any;
    defaultValue?: any;
  };
  path?: string;
  placeholder?: any;
  options?: {
    label?: string;
    value?: any;
    name?: string;
    disabled?: boolean;
  }[];
  optionsDefaultChecked?: any;
  isHidden?: boolean;
  style?: StyleValue;
}

export interface IFormItem<T> extends IFormItemBase {
  field: keyof T;
}

export interface IFormItemFieldString extends IFormItemBase {
  field: string;
}

export interface IForm<T> {
  formItems: Array<IFormItemBase & { field: keyof T }>;
  gridSpan?: number;
  formStyle?: StyleValue;
  showAction?: boolean;
  confirmLoading?: boolean;
  labelPlacement?: LabelPlacement;
}
