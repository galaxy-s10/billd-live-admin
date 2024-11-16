import request from '@/utils/request';

export function fetchGoodsList(params) {
  return request.get('/goods/list', {
    params,
  });
}
