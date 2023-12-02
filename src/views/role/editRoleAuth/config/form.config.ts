import { fetchTreeAuth } from '@/api/auth';
import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, IRole } from '@/interface';

export const formConfig = async (): Promise<IForm<IRole>> => {
  const [treeAuth]: any = await Promise.all([fetchTreeAuth()]);

  return {
    gridSpan: 24,
    formStyle: {
      justifyContent: 'center',
    },
    labelPlacement: 'left',
    formItems: [
      {
        field: 'role_auths',
        type: FormTypeEnum.treeSelect,
        label: '权限',
        treeSelectConfig: {
          label: 'auth_name',
          key: 'id',
        },
        gridSpan: 20,
        placeholder: '请选择权限',
        options: treeAuth.data.map((v) => {
          return {
            // ...v,
            auth_name: v.auth_name,
            id: v.id,
            children: v.children,
          };
        }),
      },
    ],
  };
};
