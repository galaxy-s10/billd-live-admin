import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, IOrder, ISearch, PayStatusEnum } from '@/interface';

import { columnsConfig } from './columns.config';

// eslint-disable-next-line
export const searchFormConfig = (t): IForm<ISearch<IOrder>> => {
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
        field: 'billd_live_live_room_id',
        type: FormTypeEnum.input,
        label: '直播间id',
      },
      {
        field: 'billd_live_user_id',
        type: FormTypeEnum.input,
        label: '用户id',
      },
      {
        field: 'billd_live_goods_id',
        type: FormTypeEnum.input,
        label: '商品id',
      },
      {
        field: 'trade_status',
        type: FormTypeEnum.select,
        label: '交易状态',
        options: Object.keys(PayStatusEnum).map((v) => {
          return { label: PayStatusEnum[v], value: v };
        }),
      },
      {
        field: 'keyWord',
        type: FormTypeEnum.input,
        label: '关键字',
        placeholder: '商品名称/支付宝交易号/商家订单号/买家支付宝账号',
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
