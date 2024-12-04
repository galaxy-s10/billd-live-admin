import { IForm } from '@/components/Base/Form';
import { GlobalMsgTypeEnumMap } from '@/constant';
import { FormTypeEnum, IGlobalMsg } from '@/interface';

export const formConfig = (): IForm<IGlobalMsg> => {
  return {
    gridSpan: 16,
    formStyle: {
      justifyContent: 'center',
    },
    labelPlacement: 'left',
    formItems: [
      {
        field: 'user_id',
        type: FormTypeEnum.number,
        label: '用户id',
      },
      {
        field: 'type',
        type: FormTypeEnum.radio,
        label: '类型',
        options: Object.keys(GlobalMsgTypeEnumMap).map((v) => {
          return { label: GlobalMsgTypeEnumMap[v], value: +v };
        }),
        rule: { required: true, trigger: 'blur', type: 'number' },
      },
      {
        field: 'content',
        type: FormTypeEnum.input,
        label: '内容',
      },
      {
        field: 'remark',
        type: FormTypeEnum.input,
        label: '备注',
      },
    ],
  };
};
