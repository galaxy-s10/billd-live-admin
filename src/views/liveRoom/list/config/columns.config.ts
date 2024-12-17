import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h } from 'vue';

import { liveRoomTypeEnumMap } from '@/constant';
import { ILiveRoom, LiveRoomStatusEnum, SwitchEnum } from '@/interface';

// eslint-disable-next-line
export const columnsConfig = (_t): TableColumns<ILiveRoom> => [
  {
    title: 'id',
    key: 'id',
    align: 'center',
    width: 100,
    fixed: 'left',
  },
  {
    title: '直播间名称',
    key: 'name',
    align: 'center',
    width: 150,
  },
  {
    title: '直播间简介',
    key: 'desc',
    align: 'center',
    width: 150,
  },
  {
    title: '权重',
    key: 'priority',
    align: 'center',
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 100,
    render(row) {
      return row.status === LiveRoomStatusEnum.normal ? '正常' : '禁用';
    },
  },
  {
    title: '是否显示',
    key: 'is_show',
    align: 'center',
    width: 100,
    render(row) {
      return row.is_show === SwitchEnum.yes ? '显示' : '隐藏';
    },
  },
  {
    title: '开播预览图',
    key: 'cover_img',
    align: 'center',
    width: 150,
    render(row) {
      if (row.cover_img) {
        return h('img', {
          src: row.cover_img,
          width: 150,
        });
      }
      return h('span', {}, '-');
    },
  },
  {
    title: '直播间背景',
    key: 'bg_img',
    align: 'center',
    width: 150,
    render(row) {
      if (row.bg_img) {
        const reg = /.+\.mp4$/g;
        const url = row.bg_img as string;
        if (reg.exec(url)) {
          return h('div', [
            h(
              'video',
              {
                width: '150',
                autoplay: true,
                muted: true,
              },
              [
                h('source', {
                  src: row.bg_img,
                  type: 'video/mp4',
                }),
                'Your browser does not support HTML5 video.',
              ]
            ),
          ]);
        } else {
          return h('img', {
            src: row.bg_img,
            width: 150,
          });
        }
      }
      return h('span', {}, '-');
    },
  },
  {
    title: 'type',
    key: 'type',
    align: 'center',
    width: 80,
    render(row) {
      return liveRoomTypeEnumMap[row.type!];
    },
  },
  {
    title: 'cdn',
    key: 'cdn',
    align: 'center',
    width: 100,
    render(row) {
      return row.cdn === SwitchEnum.yes ? '使用cdn' : '不使用cdn';
    },
  },
  {
    title: '备注',
    key: 'remark',
    align: 'center',
    width: 150,
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
