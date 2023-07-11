import { ITheme } from '@/interface';
import request from '@/utils/request';

export function fetchThemeList(params) {
  return request({
    url: '/theme/list',
    method: 'get',
    params,
  });
}

export function fetchCreateTheme(data: ITheme) {
  return request({
    url: '/theme/create',
    method: 'post',
    data,
  });
}
export function fetchUpdateTheme(data: ITheme) {
  return request({
    url: `/theme/update/${data.id}`,
    method: 'put',
    data,
  });
}
export function fetchDeleteTheme(id: number) {
  return request({
    url: `/theme/delete/${id}`,
    method: 'delete',
  });
}
