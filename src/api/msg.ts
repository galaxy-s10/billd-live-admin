import { IList, IMsg, IPaging } from '@/interface';
import request from '@/utils/request';

export function fetchMsgList(params: IList<IMsg>) {
  return request.get<IPaging<IMsg>>('/msg/list', {
    params,
  });
}

export function fetchMsgFind(id: number) {
  return request.get<IMsg>(`/msg/find/${id}`);
}

export function fetchMsgUpdate(data: IMsg) {
  return request.post(`/msg/update`, data);
}
