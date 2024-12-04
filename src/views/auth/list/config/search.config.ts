import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, IAuth, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

// eslint-disable-next-line
export const searchFormConfig = (t): IForm<ISearch<IAuth>> => {
  return {
    gridSpan: 8,
    labelPlacement: 'left',
    formStyle: {
      justifyContent: 'center',
    },
    formItems: [
      {
        field: 'id',
        type: FormTypeEnum.number,
        label: 'id',
      },

      {
        field: 'type',
        type: FormTypeEnum.radio,
        label: '类型',
        options: [
          { label: '默认权限', value: 1 },
          { label: '自定义', value: 2 },
        ],
      },
      {
        field: 'keyWord',
        type: FormTypeEnum.input,
        label: '关键字',
        placeholder: '名称/标识',
      },
      {
        field: 'rangTimeType',
        type: FormTypeEnum.datePickerRange,
        label: '时间范围',
      },
      ...useOrder({ columnsConfig: columnsConfig(t), t }),
    ],
  };
};
