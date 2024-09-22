import { ILiveRoom, IPaging } from '@/interface';
import request from '@/utils/request';

export function fetchLiveRoomList(params) {
  return request.get<IPaging<ILiveRoom>>('/live_room/list', {
    params,
  });
}

export function fetchUpdateLiveRoomKey() {
  return request.instance({
    url: '/live_room/update_key',
    method: 'put',
  });
}

export function fetchUpdateLiveRoom(data: ILiveRoom) {
  return request.instance({
    url: `/live_room/update/${data.id!}`,
    method: 'put',
    data,
  });
}

export function fetchFindLiveRoom(roomId: number) {
  return request.instance({
    url: `/live_room/find/${roomId}`,
    method: 'get',
  });
}
