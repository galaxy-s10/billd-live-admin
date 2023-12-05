import { IForm } from '@/components/Base/Form';
import {
  FormTypeEnum,
  ILiveRoom,
  LiveRoomPullIsShouldAuthEnum,
} from '@/interface';

export const formConfig = (): IForm<ILiveRoom> => {
  return {
    gridSpan: 16,
    formStyle: {
      justifyContent: 'center',
    },
    labelPlacement: 'left',
    formItems: [
      {
        field: 'name',
        type: FormTypeEnum.input,
        label: '直播间名称',
        placeholder: '请输入直播间名称',
        rule: { required: true, trigger: 'blur' },
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
        rule: { required: true, trigger: 'blur' },
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
    ],
  };
};
