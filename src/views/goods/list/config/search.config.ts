import { IForm } from '@/components/Base/Form';
import { goodsTypeEnumMap } from '@/constant';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, IGoods, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

// eslint-disable-next-line
export const searchFormConfig = (t): IForm<ISearch<IGoods>> => {
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
        field: 'type',
        type: FormTypeEnum.select,
        label: '商品类型',
        placeholder: '请选择商品类型',
        options: Object.keys(goodsTypeEnumMap).map((v) => {
          return { label: goodsTypeEnumMap[v], value: v };
        }),
      },
      {
        field: 'keyWord',
        type: FormTypeEnum.input,
        label: '关键字',
        placeholder: '商品名称/介绍/标记/备注',
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
