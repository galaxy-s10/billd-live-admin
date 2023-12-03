import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, ILivePlay, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<ILivePlay>> = {
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
      field: 'user_id',
      type: FormTypeEnum.input,
      label: '观众id',
      placeholder: '请输入观众id',
    },
    {
      field: 'live_room_id',
      type: FormTypeEnum.input,
      label: '直播间id',
      placeholder: '请输入直播间id',
    },
    ...useOrder(columnsConfig),
  ],
};
