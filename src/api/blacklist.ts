import { IBlacklist } from '@/interface';
import request from '@/utils/request';

export function fetchBlacklistList(params) {
  return request({
    url: '/blacklist/list',
    method: 'get',
    params,
  });
}

export function fetchCreateBlacklist(data: IBlacklist) {
  return request({
    url: '/blacklist/create',
    method: 'post',
    data,
  });
}
export function fetchUpdateBlacklist(data: IBlacklist) {
  return request({
    url: `/blacklist/update/${data.id}`,
    method: 'put',
    data,
  });
}
export function fetchDeleteBlacklist(id: number) {
  return request({
    url: `/blacklist/delete/${id}`,
    method: 'delete',
  });
}
