import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, ILiveView, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

// eslint-disable-next-line
export const searchFormConfig = (t): IForm<ISearch<ILiveView>> => {
  return {
    gridSpan: 8,
    labelPlacement: 'left',
    formStyle: {
      justifyContent: 'center',
    },
    formItems: [
      {
        field: 'live_room_id',
        type: FormTypeEnum.number,
        label: '直播间id',
        placeholder: '请输入直播间id',
      },
      {
        field: 'user_id',
        type: FormTypeEnum.number,
        label: '用户id',
        placeholder: '请输入用户id',
      },
      {
        field: 'keyWord',
        type: FormTypeEnum.input,
        label: 'ip/备注',
        placeholder: '请输入ip/备注',
      },
      {
        field: 'childKeyWord',
        type: FormTypeEnum.input,
        label: '用户名',
        placeholder: '请输入用户名',
      },
      ...useOrder({ columnsConfig, t }),
    ],
  };
};
