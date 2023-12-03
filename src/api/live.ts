import { ILive, IPaging } from '@/interface';
import request from '@/utils/request';

export function fetchLiveList(params: {
  orderName: string;
  orderBy: string;
  nowPage?: number;
  pageSize?: number;
}) {
  return request.get<IPaging<ILive>>('/live/list', {
    params,
  });
}
