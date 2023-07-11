import { IRole } from '@/interface';
import request from '@/utils/request';

/** 角色列表(分页) */
export function fetchRoleList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params,
  });
}

/** 角色列表(不分页) */
export function fetchAllList(params?: IRole) {
  return request({
    url: '/role/all_list',
    method: 'get',
    params,
  });
}

/** 获取树型角色 */
export function fetchUserRole(id: number) {
  return request({
    url: `/role/get_user_role/${id}`,
    method: 'get',
  });
}

/** 获取树型角色 */
export function fetchTreeRole(id?: number) {
  return request({
    url: `/role/get_tree_role`,
    method: 'get',
    params: { id },
  });
}

/** 获取除了父级以外的所有角色（树型） */
export function fetchTreeChildRole() {
  return request({
    url: `/role/get_tree_child_role`,
    method: 'get',
  });
}

/** 获取该角色的子角色（只找一层） */
export function fetchGetChildRole(id: number) {
  return request({
    url: `/role/get_child_role/${id}`,
    method: 'get',
  });
}

/** 获取该角色的子角色（递归查找所有） */
export function fetchAllChildRole(id: number) {
  return request({
    url: `/role/get_all_child_role/${id}`,
    method: 'get',
  });
}

/** 获取某个角色的权限 */
export function fetchRoleAuth(id: number) {
  return request({
    url: `/role/get_role_auth/${id}`,
    method: 'get',
  });
}

/** 修改角色权限 */
export function fetchUpdateRoleAuth({ id, role_auths }: IRole) {
  return request({
    url: `/role/update_role_auth/${id}`,
    method: 'put',
    data: {
      role_auths,
    },
  });
}

/** 新增角色 */
export function fetchCreateRole({
  p_id,
  role_name,
  role_value,
  type,
  priority,
}: IRole) {
  return request({
    url: `/role/create`,
    method: 'post',
    data: {
      p_id,
      role_name,
      role_value,
      type,
      priority,
    },
  });
}

/** 修改角色 */
export function fetchUpdateRole({
  id,
  p_id,
  role_name,
  role_value,
  type,
  priority,
}: IRole) {
  return request({
    url: `/role/update/${id}`,
    method: 'put',
    data: {
      p_id,
      role_name,
      role_value,
      type,
      priority,
    },
  });
}

/** 批量删除子角色 */
export function fetchBatchDeleteChildRoles({ id, c_roles }: IRole) {
  return request({
    url: `/role/batch_delete_child_roles`,
    method: 'post',
    data: {
      id,
      c_roles,
    },
  });
}

/** 批量新增子角色 */
export function fetchBatchAddChildRoles({ id, c_roles }: IRole) {
  return request({
    url: `/role/batch_add_child_roles`,
    method: 'put',
    data: {
      id,
      c_roles,
    },
  });
}

/** 删除角色 */
export function fetchDeleteRole(id: number) {
  return request({
    url: `/role/delete/${id}`,
    method: 'delete',
  });
}
