import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, IUser } from '@/interface';

export const formConfig: IForm<IUser> = {
  gridSpan: 16,
  formStyle: {
    justifyContent: 'center',
  },
  labelPlacement: 'left',
  formItems: [
    {
      field: 'username',
      type: FormTypeEnum.input,
      label: '用户名',
      placeholder: '请输入用户名',
    },
    {
      field: 'avatar',
      type: FormTypeEnum.input,
      label: '头像',
      placeholder: '请输入头像',
    },
    {
      field: 'desc',
      type: FormTypeEnum.input,
      label: '简介',
      placeholder: '请输入简介',
    },
    {
      field: 'status',
      type: FormTypeEnum.radio,
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '正常', value: 1 },
        { label: '禁用', value: 2 },
      ],
    },
    {
      field: 'email_users',
      type: FormTypeEnum.radio,
      label: '邮箱绑定',
      placeholder: '邮箱绑定状态',
      options: [
        { label: '已绑定', value: 1, disabled: true },
        { label: '未绑定', value: 2, disabled: true },
      ],
    },
    {
      field: 'qq_users',
      type: FormTypeEnum.radio,
      label: 'qq绑定',
      placeholder: 'qq绑定状态',
      options: [
        { label: '已绑定', value: 1, disabled: true },
        { label: '未绑定', value: 2, disabled: true },
      ],
    },
    {
      field: 'github_users',
      type: FormTypeEnum.radio,
      label: 'github绑定',
      placeholder: 'github绑定状态',
      options: [
        { label: '已绑定', value: 1, disabled: true },
        { label: '未绑定', value: 2, disabled: true },
      ],
    },
  ],
};
