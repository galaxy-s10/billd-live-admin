import request from '@/utils/request';

export function fetchOrderList(params) {
  return request.get('/order/order_list', {
    params,
  });
}
