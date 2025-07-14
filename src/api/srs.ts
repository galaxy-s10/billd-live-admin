import request from '@/utils/request';

export function fetchGetApiV1Streams(params) {
  return request({
    url: '/srs/apiV1Streams',
    method: 'get',
    params,
  });
}

export function fetchGetApiV1Clients() {
  return request({
    url: `/srs/apiV1Clients`,
    method: 'get',
  });
}

export function fetchDeleteApiV1Clients(clientId: string) {
  return request({
    url: `/srs/apiV1Clients/${clientId}`,
    method: 'delete',
  });
}
