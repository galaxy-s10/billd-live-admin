import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import {
  FormTypeEnum,
  ILive,
  ISearch,
  LiveRoomIsShowEnum,
  LiveRoomStatusEnum,
} from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<ILive>> = {
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
      field: 'live_room_id',
      type: FormTypeEnum.input,
      label: '直播间id',
      placeholder: '请输入直播间id',
    },
    {
      field: 'user_id',
      type: FormTypeEnum.input,
      label: '主播id',
      placeholder: '请输入主播id',
    },
    {
      field: 'live_room_is_show',
      type: FormTypeEnum.switch,
      label: '直播间是否显示',
      switchConfig: {
        checkedValue: LiveRoomIsShowEnum.yes,
        unCheckedValue: LiveRoomIsShowEnum.no,
        checkedText: '显示',
        unCheckedText: '隐藏',
      },
    },
    {
      field: 'live_room_status',
      type: FormTypeEnum.switch,
      label: '直播间状态',
      switchConfig: {
        checkedValue: LiveRoomStatusEnum.normal,
        unCheckedValue: LiveRoomStatusEnum.disable,
        checkedText: '正常',
        unCheckedText: '禁用',
      },
    },
    {
      field: 'keyWord',
      type: FormTypeEnum.input,
      label: '关键字',
      placeholder: 'srs_client_id/srs_stream/srs_stream_url',
    },
    ...useOrder(columnsConfig),
  ],
};
