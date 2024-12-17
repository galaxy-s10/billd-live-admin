import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, ILiveRoomLiveUser, ISearch } from '@/interface';

// eslint-disable-next-line
export const searchFormConfig = (_t): IForm<ISearch<ILiveRoomLiveUser>> => {
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
      },
      {
        field: 'user_id',
        type: FormTypeEnum.number,
        label: '用户id',
      },
      {
        field: 'keyWord',
        type: FormTypeEnum.input,
        label: '关键字',
        placeholder: '用户名/直播间名',
      },
    ],
  };
};
