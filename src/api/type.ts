import { IType } from '@/interface';
import request from '@/utils/request';

export function fetchTypeList(params) {
  return request({
    url: '/type/list',
    method: 'get',
    params,
  });
}

export function fetchCreateType(data: IType) {
  return request({
    url: '/type/create',
    method: 'post',
    data,
  });
}
export function fetchUpdateType(data: IType) {
  return request({
    url: `/type/update/${data.id}`,
    method: 'put',
    data,
  });
}
export function fetchDeleteType(id: number) {
  return request({
    url: `/type/delete/${id}`,
    method: 'delete',
  });
}
