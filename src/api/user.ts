/* eslint-disable camelcase */
import { IUser } from '@/interface';
import request from '@/utils/request';

export function fetchLogin({ id, password }) {
  return request.instance({
    url: '/user/login',
    method: 'post',
    data: { id, password },
  });
}
export function fetchUserNameLogin({ username, password }) {
  return request.instance({
    url: '/user/username_login',
    method: 'post',
    data: { username, password },
  });
}

export function fetchUserInfo() {
  return request.get('/user/get_user_info');
}

export function fetchUserList(params) {
  return request.instance({
    url: '/user/list',
    method: 'get',
    params,
  });
}

export function fetchUserDetail(id: number) {
  return request.get<IUser>(`/user/find/${id}`);
}

export function fetchUserPwd() {
  return request.instance({
    url: `/user/get_pwd`,
    method: 'get',
  });
}

export function fetchUserCreate(data: IUser) {
  return request.post(`/user/create`, data);
}
export function fetchUpdateUser(data: IUser) {
  return request.instance({
    url: `/user/update/${data.id!}`,
    method: 'put',
    data,
  });
}

export function fetchUpdatePwd({ oldpwd, newpwd }) {
  return request.instance({
    url: `/user/update_pwd`,
    method: 'put',
    data: {
      oldpwd,
      newpwd,
    },
  });
}

export function fetchUpdateUserRole({ id, user_roles }: IUser) {
  return request.instance({
    url: `/user/update_user_role/${id!}`,
    method: 'put',
    data: {
      user_roles,
    },
  });
}
