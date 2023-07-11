import { IFrontend } from '@/interface';
import request, { IResponse } from '@/utils/request';

export function fetchFrontendList(params): Promise<IResponse<IFrontend>> {
  return request.get('/frontend/list', { params });
}

export function fetchFindFrontend(id: number): Promise<IResponse<IFrontend>> {
  return request.get(`/frontend/find/${id}`);
}

export function fetchCreateFrontend(data: IFrontend) {
  return request({
    url: `/frontend/create`,
    method: 'post',
    data,
  });
}

export function fetchUpdateFrontend(data: IFrontend) {
  return request({
    url: `/frontend/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteFrontend(id: number) {
  return request({
    url: `/frontend/delete/${id}`,
    method: 'delete',
  });
}
