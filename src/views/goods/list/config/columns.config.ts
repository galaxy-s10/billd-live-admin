import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h } from 'vue';

import { goodsTypeEnumMap } from '@/constant';
import { IGoods } from '@/interface';
import { formatMoney } from '@/utils';

// eslint-disable-next-line
export const columnsConfig = (_t): TableColumns<IGoods> => {
  return [
    {
      title: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '类型',
      key: 'type',
      width: 100,
      render(row) {
        return goodsTypeEnumMap[row.type!];
      },
    },
    {
      title: '名称',
      key: 'name',
      width: 150,
    },
    {
      title: '介绍',
      key: 'desc',
      width: 100,
      ellipsis: true,
    },
    {
      title: '短介绍',
      key: 'short_desk',
      width: 150,
    },
    {
      title: '商品图',
      key: 'cover',
      width: 200,
      render(row) {
        return h('img', {
          src: row.cover,
          width: 150,
        });
      },
    },
    {
      title: '现价',
      key: 'price',
      width: 150,
      render(row) {
        return formatMoney(row.price);
      },
    },
    {
      title: '原价',
      key: 'original_price',
      width: 150,
      render(row) {
        return formatMoney(row.original_price);
      },
    },
    {
      title: '数量',
      key: 'nums',
      width: 200,
    },
    {
      title: '付款人数',
      key: 'pay_nums',
      width: 200,
    },
    {
      title: '库存',
      key: 'inventory',
      width: 200,
    },
    {
      title: '标记',
      key: 'badge',
      width: 200,
    },
    {
      title: '标记背景色',
      key: 'badge_bg',
      width: 150,
    },
    {
      title: '备注',
      key: 'remark',
      width: 150,
    },
    {
      title: '创建时间',
      key: 'created_at',
      width: 180,
      fixed: 'right',
    },
    {
      title: '最后更新',
      key: 'updated_at',
      width: 180,
      fixed: 'right',
    },
  ];
};
