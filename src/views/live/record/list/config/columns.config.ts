import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { ILiveRecord } from '@/interface';
import { formatTime } from '@/router/utils';

export const columnsConfig: TableColumns<ILiveRecord> = [
  {
    title: 'id',
    key: 'id',
    align: 'center',
    width: 100,
    fixed: 'left',
  },
  {
    title: '直播间id',
    key: 'live_room_id',
    align: 'center',
    width: 100,
    fixed: 'left',
  },
  {
    title: '主播id',
    key: 'user_id',
    align: 'center',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'client_id',
    key: 'client_id',
    align: 'center',
  },
  {
    title: '观看数',
    key: 'view',
    align: 'center',
  },
  {
    title: '弹幕数',
    key: 'danmu',
    align: 'center',
  },
  {
    title: '直播时长',
    key: 'duration',
    align: 'center',
  },
  {
    title: '直播结束时间',
    key: 'end_time',
    align: 'center',
    render(row) {
      return row.end_time ? formatTime(+row.end_time) : '-';
    },
    width: 180,
    fixed: 'right',
  },
  {
    title: '创建时间',
    key: 'created_at',
    align: 'center',
    width: 180,
    fixed: 'right',
  },
  {
    title: '最后更新',
    key: 'updated_at',
    align: 'center',
  },
];
