import { ITag } from '@/interface';
import request from '@/utils/request';

export function fetchTagList(params) {
  return request({
    url: '/tag/list',
    method: 'get',
    params,
  });
}

export function fetchCreateTag(data: ITag) {
  return request({
    url: '/tag/create',
    method: 'post',
    data,
  });
}

export function fetchUpdateTag(data: ITag) {
  return request({
    url: `/tag/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteTag(id: number) {
  return request({
    url: `/tag/delete/${id}`,
    method: 'delete',
  });
}
