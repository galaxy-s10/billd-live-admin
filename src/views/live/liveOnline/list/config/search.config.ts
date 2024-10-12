import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { FormTypeEnum, ILive, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

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
        type: FormTypeEnum.input,
        label: 'live.id',
        placeholder: 'live.placeholderId',
      },
      {
        field: 'live_room_id',
        type: FormTypeEnum.input,
        label: 'live.liveRoomId',
        labelWidth: 80,
        placeholder: 'live.placeholderLiveRoomId',
      },
      {
        field: 'user_id',
        type: FormTypeEnum.input,
        label: 'live.anchorId',
        placeholder: 'live.placeholderAnchorId',
      },
      {
        field: 'keyWord',
        type: FormTypeEnum.input,
        label: 'common.keyword',
        placeholder: 'live.placeholderClient_id',
      },
      ...useOrder(columnsConfig(t)),
    ],
  };
};
