import { DataTableColumns } from 'naive-ui';

import { IAuth } from '@/interface';

export const columnsConfig = (): DataTableColumns<IAuth> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '权限名称',
      key: 'auth_name',
      align: 'center',
      width: 200,
    },
    {
      title: '权限标识',
      key: 'auth_value',
      align: 'center',
      width: 200,
    },
    {
      title: '权限权重',
      key: 'priority',
      align: 'center',
      width: 200,
    },
    {
      title: '权限类型',
      key: 'type',
      align: 'center',
      width: 200,
      render(row) {
        return row.type === 1 ? '默认权限' : '自定义';
      },
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
      width: 200,
      fixed: 'right',
    },
    {
      title: '最后更新',
      key: 'updated_at',
      align: 'center',
      width: 200,
      fixed: 'right',
    },
  ];
};
