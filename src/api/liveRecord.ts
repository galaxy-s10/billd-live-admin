import request from '@/utils/request';

export function fetchLiveRecordList(params) {
  return request.get('/live_record/list', {
    params,
  });
}
