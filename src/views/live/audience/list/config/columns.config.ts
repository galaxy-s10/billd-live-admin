import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { ILivePlay } from '@/interface';
import { formatTime } from '@/router/utils';

export const columnsConfig: TableColumns<ILivePlay> = [
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
    title: '观众id',
    key: 'user_id',
    align: 'center',
    width: 100,
    fixed: 'left',
  },
  {
    title: '随机数id',
    key: 'random_id',
    align: 'center',
    width: 120,
  },
  {
    title: 'srs_ip',
    key: 'srs_ip',
    align: 'center',
    width: 200,
  },

  {
    title: 'srs_stream',
    key: 'srs_stream',
    align: 'center',
    width: 200,
  },
  {
    title: 'srs_param',
    key: 'srs_param',
    align: 'center',
    width: 200,
  },
  {
    title: 'srs_stream_url',
    key: 'srs_stream_url',
    align: 'center',
    width: 200,
  },
  {
    title: 'srs_stream_id',
    key: 'srs_stream_id',
    align: 'center',
    width: 150,
  },
  {
    title: 'srs_action',
    key: 'srs_action',
    align: 'center',
    width: 120,
    fixed: 'right',
  },
  {
    title: 'srs_client_id',
    key: 'srs_client_id',
    align: 'center',
    width: 120,
    fixed: 'right',
  },
  {
    title: '观看结束时间',
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
