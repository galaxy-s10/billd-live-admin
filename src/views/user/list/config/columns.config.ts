import { DataTableColumns } from 'naive-ui';
import { h } from 'vue';

import { IUser } from '@/interface';

export const columnsConfig = (): DataTableColumns<IUser> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
      fixed: 'left',
    },
    {
      title: '用户名',
      key: 'username',
      align: 'center',
      width: 120,
    },
    {
      title: '头像',
      key: 'avatar',
      align: 'center',
      render(row) {
        return h('img', {
          src: row.avatar,
          width: 100,
        });
      },
      width: 100,
    },
    {
      title: '简介',
      key: 'desc',
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row) {
        return row.status === 1 ? '正常' : '禁用';
      },
    },
    {
      title: '创建时间',
      key: 'created_at',
      align: 'center',
      width: 180,
    },
    {
      title: '最后更新',
      key: 'updated_at',
      align: 'center',
      width: 180,
    },
  ];
};
