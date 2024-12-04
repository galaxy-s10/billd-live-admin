import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { ILive } from '@/interface';

// eslint-disable-next-line
export const columnsConfig = (_t): TableColumns<ILive> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '直播间id',
      key: 'live_room_id',
      align: 'center',
      width: 100,
    },
    {
      title: '直播间名',
      key: 'live_room_name',
      align: 'center',
      width: 100,
      render(row) {
        return row.live_room?.name;
      },
    },
    {
      title: '直播用户id',
      key: 'user_id',
      align: 'center',
      width: 100,
    },
    {
      title: '直播用户名',
      key: 'user_name',
      align: 'center',
      width: 100,
      render(row) {
        return row.user?.username;
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
