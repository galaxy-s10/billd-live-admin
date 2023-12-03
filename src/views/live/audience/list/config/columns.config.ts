import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { ILivePlay } from '@/interface';

export const columnsConfig: TableColumns<ILivePlay[]> = [
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
    title: '观众id',
    key: 'user_id',
    align: 'center',
    width: 120,
  },
  {
    title: '随机数id',
    key: 'random_id',
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
