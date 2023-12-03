import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h } from 'vue';

import { liveRoomTypeMap } from '@/constant';
import { ILiveRoom, LiveRoomPullIsShouldAuthEnum } from '@/interface';

export const columnsConfig: TableColumns<ILiveRoom> = [
  {
    title: 'id',
    key: 'id',
    align: 'center',
    width: 150,
  },
  {
    title: 'name',
    key: 'name',
    align: 'center',
    width: 200,
  },
  {
    title: 'cover_img',
    key: 'cover_img',
    align: 'center',
    width: 200,
    render(row) {
      if (row.cover_img) {
        return h('img', {
          src: row.cover_img,
          width: 120,
        });
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
      return liveRoomTypeMap[row.type!];
    },
  },
  {
    title: 'pull_is_should_auth',
    key: 'pull_is_should_auth',
    align: 'center',
    width: 200,
    render(row) {
      return row.pull_is_should_auth === LiveRoomPullIsShouldAuthEnum.yes
        ? '需要拉流鉴权'
        : '不需要拉流鉴权';
    },
  },
  {
    title: 'cdn',
    key: 'cdn',
    align: 'center',
    width: 100,
    render(row) {
      return row.cdn === 1 ? '使用cdn' : '不使用cdn';
    },
  },
  {
    title: 'weight',
    key: 'weight',
    align: 'center',
    width: 80,
  },

  {
    title: 'rtmp_url',
    key: 'rtmp_url',
    align: 'center',
    width: 200,
  },
  {
    title: 'flv_url',
    key: 'flv_url',
    align: 'center',
    width: 200,
  },
  {
    title: 'hls_url',
    key: 'hls_url',
    align: 'center',
    width: 200,
  },
  {
    title: '创建时间',
    key: 'created_at',
    align: 'center',
    width: 200,
  },
  {
    title: '最后更新',
    key: 'updated_at',
    align: 'center',
    width: 200,
  },
];
