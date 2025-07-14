import { IComment } from '@/interface';
import request from '@/utils/request';

export function fetchCommentList(params) {
  return request({
    url: '/comment/list',
    method: 'get',
    params,
  });
}

export function fetchCreateComment(data: IComment) {
  return request({
    url: '/comment/create',
    method: 'post',
    data,
  });
}
export function fetchUpdateComment(data: IComment) {
  return request({
    url: `/comment/update/${data.id}`,
    method: 'put',
    data,
  });
}
export function fetchDeleteComment(id: number) {
  return request({
    url: `/comment/delete/${id}`,
    method: 'delete',
  });
}
