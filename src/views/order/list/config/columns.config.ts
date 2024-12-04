import { TableColumns } from 'naive-ui/es/data-table/src/interface';

import { IOrder } from '@/interface';

// eslint-disable-next-line
export const columnsConfig = (_t): TableColumns<IOrder> => {
  return [
    {
      title: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '用户id',
      key: 'billd_live_user_id',
      align: 'center',
      width: 100,
      fixed: 'left',
    },
    {
      title: '直播间id',
      key: 'billd_live_live_room_id',
      align: 'center',
      width: 100,
      fixed: 'left',
    },
    {
      title: '商品id',
      key: 'billd_live_goods_id',
      align: 'center',
      width: 150,
      fixed: 'left',
    },
    {
      title: '商品名称',
      key: 'billd_live_order_subject',
      align: 'center',
      width: 200,
    },
    {
      title: '实付金额',
      key: 'buyer_pay_amount',
      align: 'center',
      width: 150,
    },
    {
      title: '交易状态',
      key: 'trade_status',
      align: 'center',
      width: 150,
    },
    {
      title: '客户端ip',
      key: 'client_ip',
      align: 'center',
      width: 200,
    },
    {
      title: '买家支付宝',
      key: 'buyer_logon_id',
      align: 'center',
      width: 200,
    },
    {
      title: '支付宝交易号',
      key: 'trade_no',
      align: 'center',
      width: 150,
    },
    {
      title: '商家订单号',
      key: 'out_trade_no',
      align: 'center',
      width: 150,
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
