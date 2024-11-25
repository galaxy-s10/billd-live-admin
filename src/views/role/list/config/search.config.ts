import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, IRole, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

// eslint-disable-next-line
export const searchFormConfig = (t): IForm<ISearch<IRole>> => {
  return {
    gridSpan: 8,
    labelPlacement: 'left',
    formStyle: {
      justifyContent: 'center',
    },
    formItems: [
      {
        field: 'id',
        type: FormTypeEnum.input,
        label: 'id',
        placeholder: '请输入id',
      },
      {
        field: 'keyWord',
        type: FormTypeEnum.input,
        label: '关键字',
        placeholder: '名称/标识',
      },
      {
        field: 'type',
        type: FormTypeEnum.radio,
        label: '类型',
        placeholder: '请选择类型',
        options: [
          { label: '默认角色', value: 1 },
          { label: '自定义', value: 2 },
        ],
      },
      {
        field: 'rangTimeType',
        type: FormTypeEnum.datePickerRange,
        label: '时间范围',
        placeholder: '请选择时间范围',
      },
      ...useOrder({ columnsConfig, t }),
    ],
  };
};
