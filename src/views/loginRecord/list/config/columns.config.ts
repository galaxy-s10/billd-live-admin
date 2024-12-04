import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { LoginRecordEnumMap } from '@/constant';
import { ILoginRecord } from '@/interface';
import { parseUa } from '@/utils';

// eslint-disable-next-line
export const columnsConfig = (_t): TableColumns<ILoginRecord> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '用户id',
      key: 'user_id',
      align: 'center',
      width: 100,
    },
    {
      title: '用户名',
      key: 'user_username',
      align: 'center',
      width: 100,
      render(row) {
        return row.user?.username;
      },
    },
    {
      title: '类型',
      key: 'type',
      align: 'center',
      width: 100,
      render(row) {
        return LoginRecordEnumMap[row.type!];
      },
    },
    {
      title: 'ip',
      key: 'ip',
      align: 'center',
      width: 100,
    },
    {
      title: 'parseUa',
      key: 'parseUa',
      align: 'center',
      width: 100,
      render(row) {
        return parseUa(row.user_agent!);
      },
    },
    {
      title: 'user_agent',
      key: 'user_agent',
      align: 'center',
      width: 200,
    },
    {
      title: '备注',
      key: 'remark',
      align: 'center',
      width: 100,
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
      width: 180,
      fixed: 'right',
    },
  ];
};
