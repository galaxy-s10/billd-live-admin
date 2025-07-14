import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { IApiV1Streams } from '@/interface';

export const columnsConfig: TableColumns<IApiV1Streams['streams'][0]> = [
  {
    title: 'id',
    key: 'id',
    align: 'center',
    width: 200,
  },
  {
    title: 'name',
    key: 'name',
    align: 'center',
    width: 200,
  },
  {
    title: 'vhost',
    key: 'vhost',
    align: 'center',
    width: 200,
  },
  {
    title: 'app',
    key: 'app',
    align: 'center',
    width: 200,
  },
  {
    title: 'tcUrl',
    key: 'tcUrl',
    align: 'center',
    width: 200,
  },
  {
    title: 'url',
    key: 'url',
    align: 'center',
    width: 200,
  },
  {
    title: 'live_ms',
    key: 'live_ms',
    align: 'center',
    width: 200,
  },
  {
    title: 'clients',
    key: 'clients',
    align: 'center',
    width: 200,
  },
  {
    title: 'frames',
    key: 'frames',
    align: 'center',
    width: 200,
  },
  {
    title: 'send_bytes',
    key: 'send_bytes',
    align: 'center',
    width: 200,
  },
  {
    title: 'recv_bytes',
    key: 'recv_bytes',
    align: 'center',
    width: 200,
  },
  {
    title: 'kbps',
    key: 'kbps',
    align: 'center',
    width: 200,
    render(row) {
      return JSON.stringify(row.kbps);
    },
  },
  {
    title: 'publish',
    key: 'publish',
    align: 'center',
    width: 200,
    render(row) {
      return JSON.stringify(row.publish);
    },
  },
  {
    title: 'video',
    key: 'video',
    align: 'center',
    width: 200,
    render(row) {
      return JSON.stringify(row.video);
    },
  },
  {
    title: 'audio',
    key: 'audio',
    align: 'center',
    width: 200,
    render(row) {
      return JSON.stringify(row.audio);
    },
  },
];
