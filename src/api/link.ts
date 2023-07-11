import { ILink } from '@/interface';
import request from '@/utils/request';

export function fetchLinkList(params) {
  return request({
    url: '/link/list',
    method: 'get',
    params,
  });
}

export function fetchCreateLink(data: ILink) {
  return request({
    url: '/link/create',
    method: 'post',
    data,
  });
}
export function fetchUpdateLink(data: ILink) {
  return request({
    url: `/link/update/${data.id}`,
    method: 'put',
    data,
  });
}
export function fetchDeleteLink(id: number) {
  return request({
    url: `/link/delete/${id}`,
    method: 'delete',
  });
}
