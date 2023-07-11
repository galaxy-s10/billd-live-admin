import { FormTypeEnum } from '@/interface';

import type { FormItemRule } from 'naive-ui';
import type { StyleValue } from 'vue';

export interface IFormItem<T> {
  field: T extends String ? string : keyof T;
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
  };
  path?: string;
  placeholder?: any;
  options?: any[];
  isHidden?: boolean;
  style?: StyleValue;
}

export interface IForm<T> {
  formItems: IFormItem<T>[];
  gridSpan?: Number;
  formStyle?: StyleValue;
  showAction?: Boolean;
  confirmLoading?: Boolean;
  labelPlacement?: 'top' | 'left';
}
