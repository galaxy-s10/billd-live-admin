import request from '@/utils/request';

export function fetchQqUserList(params) {
  return request.instance({
    url: '/qq_user/list',
    method: 'get',
    params,
  });
}

// qq登录
export function fetchQQLogin(code: any) {
  return request.instance({
    url: `/qq_user/login`,
    method: 'post',
    data: { code },
  });
}

// 绑定qq
export function fetchBindQQ(code: any) {
  return request.instance({
    url: `/qq_user/bind_qq`,
    method: 'post',
    data: { code },
  });
}
// 取消绑定qq
export function fetchCancelBindQQ() {
  return request.instance({
    url: `/qq_user/cancel_bind_qq`,
    method: 'post',
  });
}
