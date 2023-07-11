import { IUser } from '@/interface';
import request, { IResponse } from '@/utils/request';

export function fetchLogin({ id, password }) {
  return request({
    url: '/user/login',
    method: 'post',
    data: { id, password },
  });
}

export function fetchUserInfo() {
  return request({
    url: '/user/get_user_info',
    method: 'get',
  });
}

export function fetchUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params,
  });
}

export function fetchUserDetail(id: number): Promise<IResponse<IUser>> {
  return request.get(`/user/find/${id}`);
}

export function fetchUserPwd() {
  return request({
    url: `/user/get_pwd`,
    method: 'get',
  });
}

export function fetchUpdateUser({ id, username, status, avatar, desc }: IUser) {
  return request({
    url: `/user/update/${id}`,
    method: 'put',
    data: {
      username,
      status,
      avatar,
      desc,
    },
  });
}

export function fetchUpdatePwd({ oldpwd, newpwd }) {
  return request({
    url: `/user/update_pwd`,
    method: 'put',
    data: {
      oldpwd,
      newpwd,
    },
  });
}

export function fetchUpdateUserRole({ id, user_roles }: IUser) {
  return request({
    url: `/user/update_user_role/${id}`,
    method: 'put',
    data: {
      user_roles,
    },
  });
}
