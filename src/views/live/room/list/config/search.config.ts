import { IForm } from '@/components/Base/Form';
import { liveRoomTypeMap } from '@/constant';
import { useOrder } from '@/hooks/use-order';
import {
  FormTypeEnum,
  ILiveRoom,
  ISearch,
  LiveRoomPullIsShouldAuthEnum,
} from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<ILiveRoom>> = {
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
      label: '直播间类型',
      placeholder: '请选择直播间类型',
      options: Object.keys(liveRoomTypeMap).map((v) => {
        return { label: liveRoomTypeMap[v], value: v };
      }),
    },
    {
      field: 'keyWord',
      type: FormTypeEnum.input,
      label: '关键字',
      placeholder: '房间名',
    },
    {
      field: 'cdn',
      type: FormTypeEnum.radio,
      label: 'cdn',
      options: [
        { label: '使用', value: 1 },
        { label: '不使用', value: 2 },
      ],
    },
    {
      field: 'pull_is_should_auth',
      type: FormTypeEnum.radio,
      label: '拉流鉴权',
      options: [
        { label: '需要', value: LiveRoomPullIsShouldAuthEnum.yes },
        { label: '不需要', value: LiveRoomPullIsShouldAuthEnum.no },
      ],
    },
    ...useOrder(columnsConfig),
  ],
};
