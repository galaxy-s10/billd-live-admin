import { IGlobalMsg } from '@/interface';
import request from '@/utils/request';

export function fetchGlobalMsgList(params) {
  return request.get('/global_msg/list', {
    params,
  });
}

export function fetchGlobalMsgMyList(params) {
  return request.get('/global_msg/my_list', {
    params,
  });
}

export function fetchGlobalMsgCreate(data) {
  return request.post('/global_msg/create', data);
}

export function fetchGlobalMsgFind(id: number) {
  return request.get(`/global_msg/find/${id}`);
}

export function fetchGlobalMsgUpdate(data: IGlobalMsg) {
  return request.post(`/global_msg/update/${data.id!}`, data);
}
