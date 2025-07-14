import { ILog } from '@/interface';
import request from '@/utils/request';

export function fetchLogList(params) {
  return request({
    url: '/log/list',
    method: 'get',
    params,
  });
}

export function fetchCreateLog(data: ILog) {
  return request({
    url: '/log/create',
    method: 'post',
    data,
  });
}

export function fetchUpdateLog(data: ILog) {
  return request({
    url: `/log/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteLog(id: number) {
  return request({
    url: `/log/delete/${id}`,
    method: 'delete',
  });
}
