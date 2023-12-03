import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { ILive } from '@/interface';

export const columnsConfig: TableColumns<ILive[]> = [
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
    width: 120,
  },
  {
    title: '主播id',
    key: 'user_id',
    align: 'center',
    width: 120,
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
    width: 200,
  },
];
