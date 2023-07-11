import request from '@/utils/request';

export function fetchMonitList(params) {
  return request({
    url: '/monit/list',
    method: 'get',
    params,
  });
}
