import { IWorks } from '@/interface';
import request from '@/utils/request';

export function fetchWorksList(params) {
  return request({
    url: '/works/list',
    method: 'get',
    params,
  });
}

export function fetchCreateWorks(data: IWorks) {
  return request({
    url: '/works/create',
    method: 'post',
    data,
  });
}

export function fetchUpdateWorks(data: IWorks) {
  return request({
    url: `/works/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteWorks(id: number) {
  return request({
    url: `/works/delete/${id}`,
    method: 'delete',
  });
}
