import { IBackend } from '@/interface';
import request, { IResponse } from '@/utils/request';

// 执行命令
export function fetchExecCmd(cmd: string) {
  return request({
    url: '/backend/exec_cmd',
    method: 'post',
    data: { cmd },
  });
}

export function fetchBackendList(params): Promise<IResponse<IBackend>> {
  return request.get('/backend/list', { params });
}

export function fetchFindBackend(id: number): Promise<IResponse<IBackend>> {
  return request.get(`/backend/find/${id}`);
}

export function fetchCreateBackend(data: IBackend) {
  return request({
    url: `/backend/create`,
    method: 'post',
    data,
  });
}

export function fetchUpdateBackend(data: IBackend) {
  return request({
    url: `/backend/update/${data.id}`,
    method: 'put',
    data,
  });
}

export function fetchDeleteBackend(id: number) {
  return request({
    url: `/backend/delete/${id}`,
    method: 'delete',
  });
}
