import { IGoods } from '@/interface';
import request from '@/utils/request';

export function fetchGoodsCreate(data: IGoods) {
  return request.instance({
    url: `/goods/create`,
    method: 'post',
    data,
  });
}

export function fetchGoodsList(params) {
  return request.get('/goods/list', {
    params,
  });
}

export function fetchGoodsFind(id: number) {
  return request.get(`/goods/find/${id}`);
}

export function fetchGoodsUpdate(data: IGoods) {
  return request.instance({
    url: `/goods/update/${data.id!}`,
    method: 'put',
    data,
  });
}
