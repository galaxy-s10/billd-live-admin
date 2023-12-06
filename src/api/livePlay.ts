import request from '@/utils/request';

export function fetchLivePlayList(params) {
  return request.get('/live_play/list', {
    params,
  });
}
