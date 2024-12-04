import { IForm } from '@/components/Base/Form';
import { liveRoomTypeEnumMap } from '@/constant';
import { useOrder } from '@/hooks/use-order';
import {
  FormTypeEnum,
  ILiveRoom,
  ISearch,
  LiveRoomIsShowEnum,
  LiveRoomPullIsShouldAuthEnum,
  LiveRoomStatusEnum,
  LiveRoomUseCDNEnum,
} from '@/interface';

import { columnsConfig } from './columns.config';

// eslint-disable-next-line
export const searchFormConfig = (t): IForm<ISearch<ILiveRoom>> => {
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
        field: 'type',
        type: FormTypeEnum.select,
        label: '直播间类型',
        options: Object.keys(liveRoomTypeEnumMap).map((v) => {
          return { label: liveRoomTypeEnumMap[v], value: v };
        }),
      },
      {
        field: 'cdn',
        type: FormTypeEnum.radio,
        label: 'cdn',
        options: [
          { label: '使用', value: LiveRoomUseCDNEnum.yes },
          { label: '不使用', value: LiveRoomUseCDNEnum.no },
        ],
      },
      {
        field: 'pull_is_should_auth',
        type: FormTypeEnum.switch,
        label: '拉流鉴权',
        switchConfig: {
          checkedValue: LiveRoomPullIsShouldAuthEnum.yes,
          unCheckedValue: LiveRoomPullIsShouldAuthEnum.no,
          checkedText: '开启',
          unCheckedText: '关闭',
        },
      },
      {
        field: 'is_show',
        type: FormTypeEnum.switch,
        label: '是否显示',
        switchConfig: {
          checkedValue: LiveRoomIsShowEnum.yes,
          unCheckedValue: LiveRoomIsShowEnum.no,
          checkedText: '显示',
          unCheckedText: '隐藏',
        },
      },
      {
        field: 'status',
        type: FormTypeEnum.switch,
        label: '状态',
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
        placeholder: '直播间名称/简介/备注',
      },
      ...useOrder({ columnsConfig: columnsConfig(t), t }),
    ],
  };
};
