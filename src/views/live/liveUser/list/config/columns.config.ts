import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { ILiveView } from '@/interface';
import { convertToTime } from '@/utils';

// eslint-disable-next-line
export const columnsConfig = (_t): TableColumns<ILiveView> => [
  {
    title: '直播记录id',
    key: 'live_record_id',
    align: 'center',
    width: 150,
  },
  {
    title: '直播间id',
    key: 'live_room_id',
    align: 'center',
    width: 150,
  },
  {
    title: '用户id',
    key: 'user_id',
    align: 'center',
    width: 150,
  },
  {
    title: '用户名',
    key: 'username',
    align: 'center',
    width: 150,
    render(row) {
      return row.user?.username;
    },
  },
  {
    title: 'ip',
    key: 'client_ip',
    align: 'center',
    width: 200,
  },
  {
    title: '观看时间',
    key: 'duration',
    align: 'center',
    width: 200,
    render(row) {
      return convertToTime(row.duration || 0);
    },
  },
  {
    title: '备注',
    key: 'remark',
    align: 'center',
    width: 200,
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
