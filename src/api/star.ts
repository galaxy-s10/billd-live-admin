import { IStar } from '@/interface';
import request from '@/utils/request';

export function fetchStarList(params) {
  return request({
    url: '/star/list',
    method: 'get',
    params,
  });
}

export function fetchCreateStar(data: IStar) {
  return request({
    url: '/star/create',
    method: 'post',
    data,
  });
}
export function fetchUpdateStar(data: IStar) {
  return request({
    url: `/star/update/${data.id}`,
    method: 'put',
    data,
  });
}
export function fetchDeleteStar(id: number) {
  return request({
    url: `/star/delete/${id}`,
    method: 'delete',
  });
}
