import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h } from 'vue';

import { IUser, UserStatusEnum } from '@/interface';

// eslint-disable-next-line
export const columnsConfig = (_t): TableColumns<IUser> => {
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
          width: 150,
        });
      },
      width: 150,
    },
    {
      title: '简介',
      key: 'desc',
      align: 'center',
      ellipsis: {
        tooltip: true,
      },
      width: 150,
    },
    {
      title: '状态',
      key: 'status',
      align: 'center',
      render(row) {
        return row.status === UserStatusEnum.normal ? '正常' : '禁用';
      },
      width: 100,
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
