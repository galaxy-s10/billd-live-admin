import { IForm } from '@/components/Base/Form';
import {
  FormTypeEnum,
  ILiveRoom,
  LiveRoomIsShowEnum,
  LiveRoomPullIsShouldAuthEnum,
  LiveRoomUseCDNEnum,
} from '@/interface';

export const formConfig = (): IForm<ILiveRoom> => {
  return {
    gridSpan: 18,
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
        field: 'desc',
        type: FormTypeEnum.input,
        label: '直播间简介',
        placeholder: '请输入直播间简介',
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'weight',
        type: FormTypeEnum.number,
        label: '直播间权重',
        placeholder: '请输入直播间权重',
        rule: { required: true, trigger: 'blur', type: 'number' },
      },
      {
        field: 'cover_img',
        type: FormTypeEnum.upload,
        uploadConfig: {
          max: 1,
        },
        label: '开播预览图',
      },
      {
        field: 'bg_img',
        type: FormTypeEnum.upload,
        uploadConfig: {
          max: 1,
        },
        label: '直播间背景',
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
        rule: { required: true, trigger: 'blur', type: 'number' },
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
          defaultValue: LiveRoomIsShowEnum.yes,
        },
        rule: { trigger: 'blur', type: 'number' },
      },
      {
        field: 'remark',
        type: FormTypeEnum.input,
        label: '直播间备注',
        placeholder: '请输入直播间备注',
        rule: { trigger: 'blur' },
      },
    ],
  };
};
