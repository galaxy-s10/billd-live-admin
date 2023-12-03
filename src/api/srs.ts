import request from '@/utils/request';

export function fetchGetApiV1Streams(params: { start: number; count: number }) {
  return request.instance({
    url: '/srs/apiV1Streams',
    method: 'get',
    params,
  });
}

export function fetchGetApiV1Clients(params: { start: number; count: number }) {
  return request.instance({
    url: `/srs/apiV1Clients`,
    method: 'get',
    params,
  });
}

export function fetchDeleteApiV1Clients(clientId: string) {
  return request.instance({
    url: `/srs/apiV1Clients/${clientId}`,
    method: 'delete',
  });
}
