import { IMusic } from '@/interface';
import request from '@/utils/request';

export function fetchMusicList(params) {
  return request({
    url: '/music/list',
    method: 'get',
    params,
  });
}

export function fetchCreateMusic(data: IMusic) {
  return request({
    url: '/music/create',
    method: 'post',
    data,
  });
}

export function fetchUpdateMusic(data: IMusic) {
  return request({
    url: `/music/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteMusic(id: number) {
  return request({
    url: `/music/delete/${id}`,
    method: 'delete',
  });
}
