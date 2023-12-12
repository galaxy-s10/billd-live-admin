import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h } from 'vue';

import { liveRoomTypeMap } from '@/constant';
import {
  ILiveRoom,
  LiveRoomPullIsShouldAuthEnum,
  LiveRoomUseCDNEnum,
} from '@/interface';

export const columnsConfig: TableColumns<ILiveRoom> = [
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
    title: 'weight',
    key: 'weight',
    align: 'center',
  },
  {
    title: 'cover_img',
    key: 'cover_img',
    align: 'center',
    render(row) {
      if (row.cover_img) {
        return h('img', {
          src: row.cover_img,
          width: 120,
        });
      }
      return h('span', {}, '-');
    },
    width: 200,
  },
  {
    title: 'bg_img',
    key: 'bg_img',
    align: 'center',
    render(row) {
      if (row.bg_img) {
        const reg = /.+\.mp4$/g;
        const url = row.bg_img as string;
        if (reg.exec(url)) {
          return h('div', [
            h(
              'video',
              {
                width: '120',
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
            src: row.cover_img,
            width: 120,
          });
        }
      }
      return h('span', {}, '-');
    },
    width: 200,
  },
  {
    title: 'type',
    key: 'type',
    align: 'center',
    render(row) {
      return liveRoomTypeMap[row.type!];
    },
    width: 80,
  },
  {
    title: '拉流鉴权',
    key: 'pull_is_should_auth',
    align: 'center',
    render(row) {
      return row.pull_is_should_auth === LiveRoomPullIsShouldAuthEnum.yes
        ? '开启'
        : '关闭';
    },
    width: 200,
  },
  {
    title: 'cdn',
    key: 'cdn',
    align: 'center',
    render(row) {
      return row.cdn === LiveRoomUseCDNEnum.yes ? '使用cdn' : '不使用cdn';
    },
    width: 100,
  },
  {
    title: 'rtmp_url',
    key: 'rtmp_url',
    align: 'center',
    width: 150,
  },
  {
    title: 'flv_url',
    key: 'flv_url',
    align: 'center',
    width: 150,
  },
  {
    title: 'hls_url',
    key: 'hls_url',
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
