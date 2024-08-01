import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, ILiveRoom } from '@/interface';

export const formConfig = (): IForm<ILiveRoom> => {
  return {
    gridSpan: 16,
    formStyle: {
      justifyContent: 'center',
    },
    labelPlacement: 'left',
    formItems: [
      {
        field: 'id',
        type: FormTypeEnum.number,
        label: '直播间id',
        placeholder: '请输入直播间id',
        rule: { required: true, type: 'number' },
      },
      {
        field: 'forward_bilibili_url',
        type: FormTypeEnum.input,
        label: 'b站',
        placeholder: '请输入b站直播推流码',
      },
      {
        field: 'forward_huya_url',
        type: FormTypeEnum.input,
        label: '虎牙',
        placeholder: '请输入虎牙直播推流码',
      },
    ],
  };
};
