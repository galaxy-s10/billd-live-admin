import { DataTableColumns } from 'naive-ui';

import { IRole } from '@/interface';

export const columnsConfig = (): DataTableColumns<IRole> => {
  return [
    {
      title: () => 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: () => '角色名称',
      key: 'role_name',
      align: 'center',
      width: 200,
    },
    {
      title: () => '角色标识',
      key: 'role_value',
      align: 'center',
      width: 200,
    },
    {
      title: () => '角色权重',
      key: 'priority',
      align: 'center',
      width: 100,
    },
    {
      title: () => '角色类型',
      key: 'type',
      align: 'center',
      width: 100,
      render(row) {
        return row.type === 1 ? '默认角色' : '自定义';
      },
    },
    {
      title: () => '创建时间',
      key: 'created_at',
      align: 'center',
      width: 200,
    },
    {
      title: () => '最后更新',
      key: 'updated_at',
      align: 'center',
      width: 200,
    },
  ];
};
