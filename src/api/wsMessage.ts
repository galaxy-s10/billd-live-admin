import { IList, IPaging, IWsMessage } from '@/interface';
import request from '@/utils/request';

export function fetchGetWsMessageList(params: IList<IWsMessage>) {
  return request.get<IPaging<IWsMessage>>('/ws_message/list', {
    params,
  });
}

export function fetchGetWsMessageFind(id: number) {
  return request.get<IWsMessage>(`/ws_message/find/${id}`);
}

export function fetchGetWsMessageUpdate(data: IWsMessage) {
  return request.post(`/ws_message/update`, data);
}
