import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { ILiveRecord } from '@/interface';
import { formatTime } from '@/router/utils';

export const columnsConfig = (t): TableColumns<ILiveRecord> => [
  {
    title() {
      return t('live.table.id');
    },
    key: 'id',
    align: 'center',
    width: 100,
    fixed: 'left',
  },
  {
    title() {
      return t('live.table.liveRoomId');
    },
    key: 'live_room_id',
    align: 'center',
    width: 100,
    fixed: 'left',
  },
  {
    title() {
      return t('live.table.anchorId');
    },
    key: 'user_id',
    align: 'center',
    width: 100,
    fixed: 'left',
  },
  {
    title() {
      return t('live.table.client_id');
    },
    key: 'client_id',
    align: 'center',
  },
  {
    title() {
      return t('live.table.viewNums');
    },
    key: 'view',
    align: 'center',
  },
  {
    title() {
      return t('live.table.danmuNums');
    },
    key: 'danmu',
    align: 'center',
  },
  {
    title() {
      return t('live.table.liveDuration');
    },
    key: 'duration',
    align: 'center',
  },
  {
    title() {
      return t('live.table.liveEndTime');
    },
    key: 'end_time',
    align: 'center',
    render(row) {
      return row.end_time ? formatTime(+row.end_time) : '-';
    },
    width: 180,
    fixed: 'right',
  },
  {
    title() {
      return t('live.table.createdAt');
    },
    key: 'created_at',
    align: 'center',
    width: 180,
    fixed: 'right',
  },
  {
    title() {
      return t('live.table.updatedAt');
    },
    key: 'updated_at',
    align: 'center',
  },
];
