import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { ILive } from '@/interface';

export const columnsConfig = (t): TableColumns<ILive> => [
  {
    title() {
      return t('live.table.id');
    },
    key: 'id',
    align: 'center',
    width: 100,
  },
  {
    title() {
      return t('live.table.liveRoomId');
    },
    key: 'live_room_id',
    align: 'center',
    width: 100,
  },
  {
    title() {
      return t('live.table.anchorId');
    },
    key: 'user_id',
    align: 'center',
    width: 100,
  },
  {
    title() {
      return t('live.table.createdAt');
    },
    key: 'created_at',
    align: 'center',
    width: 200,
    fixed: 'right',
  },
  {
    title() {
      return t('live.table.updatedAt');
    },
    key: 'updated_at',
    align: 'center',
    width: 200,
    fixed: 'right',
  },
];
