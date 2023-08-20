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
    title: 'name',
    key: 'name',
    align: 'center',
    width: 200,
  },
  {
    title: 'recv_30s（推流码率）',
    key: 'kbps.recv_30s',
    align: 'center',
    width: 200,
    sorter: (row1, row2) => {
      return row2.kbps.recv_30s - row1.kbps.recv_30s;
    },
    render(row) {
      // kbps, kbit/s, kb/s都是同一个意思
      const m = (row.kbps.recv_30s / 8 / 1000).toFixed(2);
      // return `${formatMemorySize((row.kbps.recv_30s * 1000) / 8, 0)}/s`;
      return `${m}MB/s`;
    },
    defaultSortOrder: 'ascend',
  },
  {
    title: 'send_30s（拉流码率）',
    key: 'kbps.send_30s',
    align: 'center',
    width: 200,
    sorter: (row1, row2) => {
      return row2.kbps.send_30s - row1.kbps.send_30s;
    },
    render(row) {
      // kbps, kbit/s, kb/s都是同一个意思
      const m = (row.kbps.send_30s / 8 / 1000).toFixed(2);
      // return `${formatMemorySize((row.kbps.send_30s * 1000) / 8, 0)}/s`;
      return `${m}MB/s`;
    },
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
];
