<template>
  <div>
    <n-data-table
      ref="table"
      remote
      :row-key="(row) => row.id"
      :loading="tableLoading"
      :columns="columns"
      :data="roleData"
      :bordered="false"
      @update:page="handlePageChange"
    />

    <HModal
      v-model:show="modalVisiable"
      :title="modalTitle"
      :loading="modalConfirmLoading"
      @update:show="updateShow"
      @confirm="modalConfirm"
      @cancel="modalCancel"
    >
      <div v-if="modalType === modalTypeEnum.BATCH_DELETE">
        <n-form
          ref="formRef"
          :inline="false"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          label-placement="left"
        >
          <n-form-item
            label="角色"
            path="id"
          >
            <n-select
              v-model:value="formValue.id"
              clearable
              :options="selectList"
              disabled
            />
          </n-form-item>
          <n-form-item
            label="子角色"
            path="c_roles"
          >
            <n-tree
              style="width: 100%"
              checkable
              cascade
              selectable
              :data="childRoleData"
              :default-checked-keys="formValue.c_roles"
              key-field="id"
              label-field="role_name"
              children-field="children"
              @update:checked-keys="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
        <p>
          注意：会删除选中的角色以及它关联的所有角色(即选中的角色的所有子孙角色)
        </p>
      </div>
      <div v-else-if="modalType === modalTypeEnum.BATCH_ADD">
        <n-form
          ref="formRef"
          :inline="false"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          label-placement="left"
        >
          <n-form-item
            label="角色"
            path="id"
          >
            <n-select
              v-model:value="formValue.id"
              clearable
              :options="selectList"
              disabled
            />
          </n-form-item>
          <n-form-item
            label="子角色"
            path="c_roles"
          >
            <n-tree-select
              multiple
              cascade
              checkable
              check-strategy="child"
              :options="batchAddOptions"
              key-field="id"
              label-field="role_name"
              children-field="children"
              @update:value="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
        <p>注意1：每次新增的子角色需要是同一个父级（但不是同一个祖先）。</p>
        <p>
          注意2：这里的新增其实并不是新增，而是修改当前的选中的角色的父级角色。
        </p>
      </div>
    </HModal>
  </div>
</template>

<script lang="ts" setup>
import { deepCloneByJson } from 'billd-utils';
import { FormInst, NButton, NPopconfirm, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref, watch } from 'vue';

import {
  fetchAllChildRole,
  fetchAllList,
  fetchBatchAddChildRoles,
  fetchBatchDeleteChildRoles,
  fetchCreateRole,
  fetchDeleteRole,
  fetchGetChildRole,
  fetchTreeRole,
  fetchUpdateRole,
} from '@/api/role';
import HModal from '@/components/Base/Modal';
import { FormTypeEnum, IRole, modalTypeEnum } from '@/interface';

const rules: any = {
  p_id: {
    // required: true,
    type: FormTypeEnum.number,
    message: '请选择父级角色',
    trigger: ['input'],
  },
  p_role_name: {
    required: true,
    message: '请输入角色父级角色',
    trigger: ['input', 'blur', 'change'],
  },
  role_name: {
    required: true,
    message: '请输入角色名称',
    trigger: ['input', 'blur'],
  },
  role_value: {
    required: true,
    message: '请输入角色标识',
    trigger: ['input', 'blur'],
  },
  type: {
    message: '请选择角色类型',
    type: FormTypeEnum.number,
    trigger: ['input', 'blur'],
  },
  priority: {
    require: false,
    message: '请输入角色权重',
    trigger: ['input'],
  },
  role_auths: {
    // required: true,
    message: '请选择角色权限',
    type: 'array',
    // trigger: ['input', 'blur', 'change'],
  },
};

const roleData = ref([]);
const defaultCheckedKeys = ref([]);
const total = ref(0);
const currentRole = ref();
const tableLoading = ref(false);
const modalConfirmLoading = ref(false);
const modalVisiable = ref(false);
const modalTitle = ref('');
const selectList = ref([]);
const childRoleData = ref([]);
const batchAddOptions = ref([]);
const modalType = ref<modalTypeEnum>(modalTypeEnum.ADD);

const formValue = ref<IRole>({
  id: 1,
  p_id: 0,
  role_name: '',
  role_value: '',
  type: 1,
  priority: 1,
  role_auths: [],
  c_roles: [],
});
const formRef = ref<FormInst | null>(null);

watch(
  () => modalVisiable.value,
  (newVal) => {
    newVal === false && (currentRole.value = undefined);
  }
);

const updateShow = (newVal) => {
  modalVisiable.value = newVal;
  newVal === false && (currentRole.value = undefined);
};

const ajaxFetchRoleList = async () => {
  try {
    tableLoading.value = true;
    const res: any = await fetchTreeRole(1);
    if (res.code === 200) {
      tableLoading.value = false;
      roleData.value = res.data;
      total.value = res.data.total;
    } else {
      Promise.reject(res);
    }
  } catch (err) {
    Promise.reject(err);
  }
};

onMounted(async () => {
  await ajaxFetchRoleList();
});

const handlePageChange = async () => {
  await ajaxFetchRoleList();
};

const createColumns = (): TableColumns<IRole> => {
  return [
    {
      title: 'id',
      key: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: '角色名称',
      key: 'role_name',
      width: 150,
      align: 'center',
    },
    {
      title: '角色标识',
      key: 'role_value',
      width: 150,
      align: 'center',
    },
    {
      title: '角色类型',
      key: 'type',
      align: 'center',
      width: 150,
      render(row) {
        return row.type === 1 ? '默认角色' : '自定义';
      },
    },
    {
      title: '角色权重',
      key: 'priority',
      width: 100,
      align: 'center',
    },
    {
      title: 'p_id',
      key: 'p_id',
      width: 100,
      align: 'center',
    },
    {
      title: '操作',
      key: 'actions',
      width: 300,
      align: 'center',
      fixed: 'right',
      render(row) {
        return h(NSpace, { justify: 'center' }, () => [
          // h(
          //   NButton,
          //   {
          //     size: 'small',
          //     onClick: () => {
          //       modalTitle.value = '编辑角色';
          //       currRow.value = { ...row };
          //       modalVisiable.value = !modalVisiable.value;
          //     },
          //   },
          //   () => '编辑' // 用箭头函数返回性能更好。
          // ),
          // h(
          //   NButton,
          //   {
          //     size: 'small',
          //     type: 'primary',
          //     onClick: () => {
          //       modalTitle.value = '新增角色';
          //       currRow.value = { ...row };
          //       modalVisiable.value = !modalVisiable.value;
          //     },
          //   },
          //   () => '新增' // 用箭头函数返回性能更好。
          // ),
          h(
            NPopconfirm,
            {
              'positive-text': '确定',
              'negative-text': '取消',
              'on-positive-click': () => {
                deleteRole(row.id);
              },
              'on-negative-click': () => {
                window.$message.info('已取消!');
              },
            },
            {
              trigger: () =>
                h(
                  NButton,
                  {
                    size: 'small',
                    type: 'error',
                  },
                  () => '删除' // 用箭头函数返回性能更好。
                ),
              default: () => '会删除底下关联的所有子角色，确定吗?',
            }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'info',
              onClick: async () => {
                const treeRole = await fetchGetChildRole(row.id!); // 子角色树
                const allRole = await fetchAllList(); // 父级角色下拉框
                childRoleData.value = treeRole.data.result;
                selectList.value = allRole.data.rows.map((v) => {
                  return {
                    ...v,
                    label: v.role_name,
                    value: v.id,
                  };
                });
                formValue.value.id = row.id;
                modalTitle.value = '批量删除子角色';
                modalType.value = modalTypeEnum.BATCH_DELETE;
                modalVisiable.value = true;
              },
            },
            () => '批量删除子角色' // 用箭头函数返回性能更好。
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'warning',
              onClick: async () => {
                const allChildRole = await fetchAllChildRole(row.id!); // 子角色树
                const allChildRoleIds = [
                  row.id,
                  ...allChildRole.data.result.map((v) => v.id),
                ];
                const allRole = await fetchAllList(); // 父级角色下拉框
                // 递归禁用已有的角色
                const disableRole = (data) => {
                  data.forEach((v) => {
                    if (allChildRoleIds.includes(v.id)) {
                      v.disabled = true;
                    }
                    if (v.children) {
                      disableRole(v.children);
                    }
                  });
                  return data;
                };
                batchAddOptions.value = disableRole(
                  deepCloneByJson(roleData.value)
                );
                selectList.value = allRole.data.rows.map((v) => {
                  return {
                    ...v,
                    label: v.role_name,
                    value: v.id,
                  };
                });
                formValue.value.id = row.id;
                modalTitle.value = '批量新增子角色';
                modalType.value = modalTypeEnum.BATCH_ADD;
                modalVisiable.value = true;
              },
            },
            () => '批量新增子角色' // 用箭头函数返回性能更好。
          ),
        ]);
      },
    },
  ];
};

const columns = createColumns();

const update = async () => {
  try {
    modalConfirmLoading.value = true;
    await fetchUpdateRole({
      ...formValue.value,
      priority: Number(formValue.value.priority || 1),
    });
    modalVisiable.value = false;
    window.$message.success('修改成功!');
  } catch (error) {
    console.log(error);
  } finally {
    modalConfirmLoading.value = false;
    handlePageChange();
  }
};

const create = async () => {
  try {
    modalConfirmLoading.value = true;
    await fetchCreateRole({
      ...formValue.value,
      priority: Number(formValue.value.priority || 1),
    });
    modalVisiable.value = false;
    window.$message.success('新增成功!');
  } catch (error) {
    console.log(error);
  } finally {
    modalConfirmLoading.value = false;
    handlePageChange();
  }
};

const deleteRole = async (id) => {
  try {
    modalConfirmLoading.value = true;
    const { message }: any = await fetchDeleteRole(id);
    modalVisiable.value = false;
    window.$message.success(message);
  } catch (error) {
    console.log(error);
  } finally {
    modalConfirmLoading.value = false;
    handlePageChange();
  }
};

const batchDeleteChildRoles = async () => {
  try {
    modalConfirmLoading.value = true;
    const { message }: any = await fetchBatchDeleteChildRoles({
      id: formValue.value.id,
      c_roles: formValue.value.c_roles,
    });
    modalVisiable.value = false;
    window.$message.success(message);
  } catch (error) {
    console.log(error);
  } finally {
    modalConfirmLoading.value = false;
    handlePageChange();
  }
};

const batchAddChildRoles = async () => {
  try {
    modalConfirmLoading.value = true;
    const { message }: any = await fetchBatchAddChildRoles({
      id: formValue.value.id,
      c_roles: formValue.value.c_roles,
    });
    modalVisiable.value = false;
    window.$message.success(message);
  } catch (error) {
    console.log(error);
  } finally {
    modalConfirmLoading.value = false;
    handlePageChange();
  }
};

const modalConfirm = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      switch (modalType.value) {
        case modalTypeEnum.ADD:
          create();
          break;
        case modalTypeEnum.EDIT:
          update();
          break;
        case modalTypeEnum.BATCH_DELETE:
          batchDeleteChildRoles();
          break;
        case modalTypeEnum.BATCH_ADD:
          batchAddChildRoles();
          break;
        default:
          window.$message.warning('错误的操作!');
          break;
      }
    }
  });
};
const modalCancel = () => {
  modalVisiable.value = false;
};
const updateCheckedKeys = (keys) => {
  defaultCheckedKeys.value = keys;
  formValue.value.c_roles = keys;
};
</script>

<style lang="scss" scoped></style>
