import { IAuth } from '@/interface';
import request from '@/utils/request';

/** 权限列表(分页) */
export function fetchAuthList(params) {
  return request({
    url: '/auth/list',
    method: 'get',
    params,
  });
}

/** 权限列表(不分页) */
export function fetchAllList() {
  return request({
    url: '/auth/all_list',
    method: 'get',
  });
}

/** 获取树型权限 */
export function fetchTreeAuth(id?: number) {
  return request({
    url: `/auth/get_tree_auth`,
    method: 'get',
    params: { id },
  });
}

/** 获取除了父级以外的所有权限（树型） */
export function fetchTreeChildAuth() {
  return request({
    url: `/auth/get_tree_child_auth`,
    method: 'get',
  });
}

/** 获取该权限的子权限（只找一层） */
export function fetchGetChildAuth(id: number) {
  return request({
    url: `/auth/get_child_auth/${id}`,
    method: 'get',
  });
}

/** 给某个权限批量设置子权限 */
export function fetchSetAddChildAuth({ id, c_auths }: IAuth) {
  return request({
    url: `/auth/set_add_child_auth`,
    method: 'put',
    data: { id, c_auths },
  });
}

/** 获取该权限的子权限（递归查找所有） */
export function fetchAllChildAuth(id: number) {
  return request({
    url: `/auth/get_all_child_auth/${id}`,
    method: 'get',
  });
}

/** 获取某个权限的权限 */
export function fetchAuthAuth(id) {
  return request({
    url: `/auth/get_auth_auth/${id}`,
    method: 'get',
  });
}

/** 新增权限 */
export function fetchCreateAuth({
  p_id,
  auth_name,
  auth_value,
  type,
  priority,
}: IAuth) {
  return request({
    url: `/auth/create`,
    method: 'post',
    data: {
      p_id,
      auth_name,
      auth_value,
      type,
      priority,
    },
  });
}

/** 修改权限 */
export function fetchUpdateAuth({
  id,
  p_id,
  auth_name,
  auth_value,
  type,
  priority,
}: IAuth) {
  return request({
    url: `/auth/update/${id}`,
    method: 'put',
    data: {
      p_id,
      auth_name,
      auth_value,
      type,
      priority,
    },
  });
}

/** 批量删除子权限 */
export function fetchBatchDeleteChildAuths({ id, c_auths }: IAuth) {
  return request({
    url: `/auth/batch_delete_child_auths`,
    method: 'delete',
    data: {
      id,
      c_auths,
    },
  });
}

/** 批量新增子权限 */
export function fetchBatchAddChildAuths({ id, c_auths }: IAuth) {
  return request({
    url: `/auth/batch_add_child_auths`,
    method: 'put',
    data: {
      id,
      c_auths,
    },
  });
}

/** 删除权限 */
export function fetchDeleteAuth(id: number) {
  return request({
    url: `/auth/delete/${id}`,
    method: 'delete',
  });
}
