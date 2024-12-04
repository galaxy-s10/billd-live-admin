import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, IUser, UserStatusEnum } from '@/interface';

export const formConfig = ({
  roleOptions,
}: {
  roleOptions: { label: any; value: any }[];
}): Promise<IForm<IUser>> => {
  return Promise.resolve({
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
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'password',
        type: FormTypeEnum.password,
        label: '用户密码',
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'user_roles',
        type: FormTypeEnum.radio,
        label: '用户角色',
        options: roleOptions,
        rule: { required: false, trigger: 'blur', type: 'any' },
      },
      {
        field: 'avatar',
        type: FormTypeEnum.upload,
        uploadConfig: {
          max: 1,
        },
        label: '头像',
      },
      {
        field: 'desc',
        type: FormTypeEnum.input,
        label: '简介',
      },
      {
        field: 'status',
        type: FormTypeEnum.radio,
        label: '状态',
        options: [
          { label: '正常', value: UserStatusEnum.normal },
          { label: '禁用', value: UserStatusEnum.disable },
        ],
        rule: { required: false, trigger: 'blur', type: 'number' },
      },
    ],
  });
};
