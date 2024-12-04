import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, ISearch, IUser } from '@/interface';

import { columnsConfig } from './columns.config';

// eslint-disable-next-line
export const searchFormConfig = (t): IForm<ISearch<IUser>> => {
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
        field: 'status',
        type: FormTypeEnum.radio,
        label: '状态',
        options: [
          { label: '正常', value: 1 },
          { label: '禁用', value: 2 },
        ],
      },
      {
        field: 'keyWord',
        type: FormTypeEnum.input,
        label: '关键字',
        placeholder: '用户名/简介',
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
