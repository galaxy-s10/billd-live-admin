import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { IApiV1Clients } from '@/interface';

export const columnsConfig: TableColumns<IApiV1Clients['clients'][0]> = [
  {
    title: 'id',
    key: 'id',
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
    title: 'stream',
    key: 'stream',
    align: 'center',
    width: 200,
  },
  {
    title: 'ip',
    key: 'ip',
    align: 'center',
    width: 200,
  },
  {
    title: 'pageUrl',
    key: 'pageUrl',
    align: 'center',
    width: 200,
  },
  {
    title: 'swfUrl',
    key: 'swfUrl',
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
    title: 'name',
    key: 'name',
    align: 'center',
    width: 200,
  },
  {
    title: 'type',
    key: 'type',
    align: 'center',
    width: 200,
  },
  {
    title: 'publish',
    key: 'publish',
    align: 'center',
    width: 200,
  },
  {
    title: 'alive',
    key: 'alive',
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
];
