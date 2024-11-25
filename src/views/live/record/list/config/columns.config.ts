import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { ILiveRecord } from '@/interface';
import { convertToTime } from '@/utils';

// eslint-disable-next-line
export const columnsConfig = (_t): TableColumns<ILiveRecord> => [
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
      return '观看数';
    },
    key: 'view',
    align: 'center',
    width: 100,
  },
  {
    title() {
      return '弹幕数';
    },
    key: 'danmu',
    align: 'center',
    width: 100,
  },
  {
    title() {
      return '观看时间';
    },
    key: 'duration',
    align: 'center',
    width: 100,
    render(row) {
      return convertToTime(row.duration || 0);
    },
  },
  {
    title() {
      return '直播开始时间';
    },
    key: 'start_time',
    align: 'center',
    width: 200,
    fixed: 'right',
  },
  {
    title() {
      return '直播结束时间';
    },
    key: 'end_time',
    align: 'center',
    width: 200,
    fixed: 'right',
  },
];
