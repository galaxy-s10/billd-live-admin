import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, ILive, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

// eslint-disable-next-line
export const searchFormConfig = (t): IForm<ISearch<ILive>> => {
  {
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
          label: t('live.id'),
          placeholder: '',
        },
        {
          field: 'live_room_id',
          type: FormTypeEnum.input,
          label: t('live.liveRoomId'),
          labelWidth: 80,
          placeholder: '',
        },
        {
          field: 'keyWord',
          type: FormTypeEnum.input,
          label: t('common.keyword'),
          placeholder: '',
        },
        ...useOrder({ columnsConfig, t }),
      ],
    };
  }
};
