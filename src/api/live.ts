import { ILive, IPaging } from '@/interface';
import request from '@/utils/request';

export function fetchLiveList(params) {
  return request.get<IPaging<ILive>>('/live/list', {
    params,
  });
}

export function fetchForwardList() {
  return request.get('/live/forward_list');
}

export function fetchKillForward(pid: number) {
  return request.post(`/live/kill_forward/${pid}`);
}

export function fetchCloseLiveByLiveRoomId(liveRoomId: number) {
  return request.post(`/live/close_live_by_live_room_id/${liveRoomId}`);
}
