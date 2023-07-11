import { IVisitorLog } from '@/interface';
import request from '@/utils/request';

export function fetchVisitorList(params) {
  return request({
    url: '/visitor_log/list',
    method: 'get',
    params,
  });
}

export function fetchCreateVisitor(data: IVisitorLog) {
  return request({
    url: '/visitor_log/create',
    method: 'post',
    data,
  });
}

export function fetchUpdateVisitor(data: IVisitorLog) {
  return request({
    url: `/visitor_log/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteVisitor(id: number) {
  return request({
    url: `/visitor_log/delete/${id}`,
    method: 'delete',
  });
}
