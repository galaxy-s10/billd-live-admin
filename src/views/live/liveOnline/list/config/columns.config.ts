import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { ILive } from '@/interface';

export const columnsConfig = (): TableColumns<ILive> => [
  {
    title() {
      return 'id';
    },
    key: 'id',
    align: 'center',
    width: 100,
  },
  {
    title() {
      return '直播间id';
    },
    key: 'live_room_id',
    align: 'center',
    width: 100,
  },
  {
    title() {
      return '直播间名';
    },
    key: 'live_room_name',
    align: 'center',
    width: 100,
    render(row) {
      return row.live_room?.name;
    },
  },
  {
    title() {
      return '主播id';
    },
    key: 'user_id',
    align: 'center',
    width: 100,
  },
  {
    title() {
      return '主播名';
    },
    key: 'user_name',
    align: 'center',
    width: 100,
    render(row) {
      return row.user?.username;
    },
  },
  {
    title() {
      return '创建时间';
    },
    key: 'created_at',
    align: 'center',
    width: 200,
    fixed: 'right',
  },
  {
    title() {
      return '最后更新';
    },
    key: 'updated_at',
    align: 'center',
    width: 200,
    fixed: 'right',
  },
];
