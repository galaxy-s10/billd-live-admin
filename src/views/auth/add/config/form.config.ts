import { fetchAllList } from '@/api/auth';
import { IForm } from '@/components/Base/Form';
import { FormTypeEnum, IAuth } from '@/interface';

export const formConfig = async (): Promise<IForm<IAuth>> => {
  const [allAuth]: any = await Promise.all([fetchAllList()]);

  return {
    gridSpan: 16,
    formStyle: {
      justifyContent: 'center',
    },
    labelPlacement: 'left',
    formItems: [
      {
        field: 'p_id',
        type: FormTypeEnum.select,
        options: allAuth.data.rows.map((v) => {
          return {
            ...v,
            label: v.auth_name,
            value: v.id,
          };
        }),
        label: '父级权限',
        placeholder: '请选择父级权限',
      },
      {
        field: 'auth_name',
        type: FormTypeEnum.input,
        label: '权限名称',
        placeholder: '请输入权限名称',
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'auth_value',
        type: FormTypeEnum.input,
        label: '权限标识',
        placeholder: '请输入权限标识',
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'type',
        type: FormTypeEnum.radio,
        label: '权限类型',
        placeholder: '请选择权限类型',
        options: [
          { label: '默认权限', value: 1 },
          { label: '自定义', value: 2 },
        ],
      },
      {
        field: 'priority',
        type: FormTypeEnum.number,
        label: '权限权重',
        placeholder: '请输入权限权重',
      },
    ],
  };
};
