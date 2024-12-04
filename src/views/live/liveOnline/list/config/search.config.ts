import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, ILive, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

// eslint-disable-next-line
export const searchFormConfig = (t): IForm<ISearch<ILive>> => {
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
        label: t('live.id'),
      },
      {
        field: 'live_room_id',
        type: FormTypeEnum.number,
        label: t('live.liveRoomId'),
        labelWidth: 80,
      },
      {
        field: 'keyWord',
        type: FormTypeEnum.input,
        label: t('common.keyword'),
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
