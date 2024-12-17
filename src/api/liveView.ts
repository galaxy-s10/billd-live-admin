import { ILiveView, IPaging } from '@/interface';
import request from '@/utils/request';

export function fetchLiveViewList(params) {
  return request.get<IPaging<ILiveView>>('/live_view/list', {
    params,
  });
}
