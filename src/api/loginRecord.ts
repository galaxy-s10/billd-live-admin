import request from '@/utils/request';

export function fetchloginRecordList(params) {
  return request.get('/login_record/list', {
    params,
  });
}
