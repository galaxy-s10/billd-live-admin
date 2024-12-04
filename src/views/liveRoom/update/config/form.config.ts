import { IForm } from '@/components/Base/Form';
import {
  FormTypeEnum,
  ILiveRoom,
  LiveRoomIsShowEnum,
  LiveRoomOpenChatEnum,
  LiveRoomPullIsShouldAuthEnum,
  LiveRoomStatusEnum,
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
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'desc',
        type: FormTypeEnum.input,
        label: '直播间简介',
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'cdn',
        type: FormTypeEnum.radio,
        label: 'CDN',
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
        field: 'priority',
        type: FormTypeEnum.number,
        label: '直播间权重',
        rule: { required: true, trigger: 'blur', type: 'number' },
      },
      {
        field: 'key',
        type: FormTypeEnum.input,
        label: '推流秘钥',
        rule: { required: true, trigger: 'blur', type: 'number' },
      },
      {
        field: 'type',
        type: FormTypeEnum.number,
        label: '直播间类型',
        disabled: true,
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
        field: 'status',
        type: FormTypeEnum.radio,
        label: '直播间状态',
        options: [
          { label: '正常', value: LiveRoomStatusEnum.normal },
          { label: '禁用', value: LiveRoomStatusEnum.disable },
        ],
        rule: { required: true, trigger: 'blur', type: 'number' },
      },
      {
        field: 'is_show',
        type: FormTypeEnum.switch,
        label: '直播间是否显示',
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
        field: 'open_chat',
        type: FormTypeEnum.switch,
        label: '直播间是否开启聊天',
        switchConfig: {
          checkedValue: LiveRoomOpenChatEnum.yes,
          unCheckedValue: LiveRoomOpenChatEnum.no,
          checkedText: '开启',
          unCheckedText: '关闭',
          defaultValue: LiveRoomOpenChatEnum.yes,
        },
        rule: { trigger: 'blur', type: 'number' },
      },
      {
        field: 'rtmp_url',
        type: FormTypeEnum.input,
        label: 'rtmp拉流地址',
        rule: { trigger: 'blur' },
      },
      {
        field: 'flv_url',
        type: FormTypeEnum.input,
        label: 'flv拉流地址',
        rule: { trigger: 'blur' },
      },
      {
        field: 'hls_url',
        type: FormTypeEnum.input,
        label: 'hls拉流地址',
        rule: { trigger: 'blur' },
      },
      {
        field: 'webrtc_url',
        type: FormTypeEnum.input,
        label: 'webrtc拉流地址',
        rule: { trigger: 'blur' },
      },
      {
        field: 'push_rtmp_url',
        type: FormTypeEnum.input,
        label: 'rtmp直播推流地址',
        rule: { trigger: 'blur' },
      },
      {
        field: 'push_obs_server',
        type: FormTypeEnum.input,
        label: 'obs直播推流服务器',
        rule: { trigger: 'blur' },
      },
      {
        field: 'push_obs_stream_key',
        type: FormTypeEnum.input,
        label: 'obs直播推流秘钥',
        rule: { trigger: 'blur' },
      },
      {
        field: 'push_webrtc_url',
        type: FormTypeEnum.input,
        label: 'webrtc直播推流地址',
        rule: { trigger: 'blur' },
      },
      {
        field: 'push_srt_url',
        type: FormTypeEnum.input,
        label: 'srt直播推流地址',
        rule: { trigger: 'blur' },
      },
      {
        field: 'forward_bilibili_url',
        type: FormTypeEnum.input,
        label: '转推b站直播',
        rule: { trigger: 'blur' },
      },
      {
        field: 'forward_douyu_url',
        type: FormTypeEnum.input,
        label: '转推斗鱼直播',
        rule: { trigger: 'blur' },
      },
      {
        field: 'forward_huya_url',
        type: FormTypeEnum.input,
        label: '转推虎牙直播',
        rule: { trigger: 'blur' },
      },
      {
        field: 'forward_douyin_url',
        type: FormTypeEnum.input,
        label: '转推抖音直播',
        rule: { trigger: 'blur' },
      },
      {
        field: 'forward_kuaishou_url',
        type: FormTypeEnum.input,
        label: '转推快手直播',
        rule: { trigger: 'blur' },
      },
      {
        field: 'forward_xiaohongshu_url',
        type: FormTypeEnum.input,
        label: '转推小红书直播',
        rule: { trigger: 'blur' },
      },
      {
        field: 'remark',
        type: FormTypeEnum.input,
        label: '直播间备注',
        rule: { trigger: 'blur' },
      },
    ],
  };
};
