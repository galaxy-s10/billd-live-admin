<template>
  <div>
    <n-data-table
      ref="table"
      remote
      :row-key="(row) => row.id"
      :loading="tableLoading"
      :columns="columns"
      :data="authData"
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
            label="权限"
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
            label="子权限"
            path="c_auths"
          >
            <n-tree
              style="width: 100%"
              checkable
              cascade
              selectable
              :data="childAuthData"
              :default-checked-keys="formValue.c_auths"
              key-field="id"
              label-field="auth_name"
              children-field="children"
              @update:checked-keys="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
        <p>
          注意：会删除选中的权限以及它关联的所有权限(即选中的权限的所有子孙权限)
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
            label="权限"
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
            label="子权限"
            path="c_auths"
          >
            <n-tree-select
              multiple
              cascade
              checkable
              check-strategy="child"
              :options="batchAddOptions"
              key-field="id"
              label-field="auth_name"
              children-field="children"
              @update:value="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
        <p>注意1：每次新增的子权限需要是同一个父级（但不是同一个祖先）。</p>
        <p>
          注意2：这里的新增其实并不是新增，而是修改当前的选中的权限的父级权限。
        </p>
      </div>
    </HModal>
  </div>
</template>

<script lang="ts" setup>
import { FormInst, NButton, NPopconfirm, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref, watch } from 'vue';

import {
  fetchAllChildAuth,
  fetchAllList,
  fetchBatchAddChildAuths,
  fetchBatchDeleteChildAuths,
  fetchCreateAuth,
  fetchDeleteAuth,
  fetchGetChildAuth,
  fetchTreeAuth,
  fetchUpdateAuth,
} from '@/api/auth';
import HModal from '@/components/Base/Modal';
import { FormTypeEnum, IAuth, modalTypeEnum } from '@/interface';
import { deepCloneByJson } from '@/utils';

const rules: any = {
  p_id: {
    // required: true,
    type: FormTypeEnum.number,
    message: '请选择父级权限',
    trigger: ['input'],
  },
  p_auth_name: {
    required: true,
    message: '请输入权限父级权限',
    trigger: ['input', 'blur', 'change'],
  },
  auth_name: {
    required: true,
    message: '请输入权限名称',
    trigger: ['input', 'blur'],
  },
  auth_value: {
    required: true,
    message: '请输入权限标识',
    trigger: ['input', 'blur'],
  },
  type: {
    message: '请选择权限类型',
    type: FormTypeEnum.number,
    trigger: ['input', 'blur'],
  },
  priority: {
    require: false,
    message: '请输入权限权重',
    trigger: ['input'],
  },
};

const authData = ref([]);
const defaultCheckedKeys = ref([]);
const total = ref(0);
const currentAuth = ref();
const tableLoading = ref(false);
const modalConfirmLoading = ref(false);
const modalVisiable = ref(false);
const modalTitle = ref('');
const selectList = ref([]);
const childAuthData = ref([]);
const batchAddOptions = ref([]);
const modalType = ref<modalTypeEnum>(modalTypeEnum.ADD);

const formValue = ref<IAuth>({
  id: 1,
  p_id: 0,
  auth_name: '',
  auth_value: '',
  type: 1,
  priority: 1,
  c_auths: [],
});
const formRef = ref<FormInst | null>(null);

watch(
  () => modalVisiable.value,
  (newVal) => {
    newVal === false && (currentAuth.value = undefined);
  }
);

const updateShow = (newVal) => {
  modalVisiable.value = newVal;
  newVal === false && (currentAuth.value = undefined);
};

const ajaxFetchAuthList = async () => {
  try {
    tableLoading.value = true;
    const res: any = await fetchTreeAuth(1);
    if (res.code === 200) {
      tableLoading.value = false;
      authData.value = res.data;
      total.value = res.data.total;
    } else {
      Promise.reject(res);
    }
  } catch (err) {
    Promise.reject(err);
  }
};

onMounted(async () => {
  await ajaxFetchAuthList();
});

const handlePageChange = async () => {
  await ajaxFetchAuthList();
};

const createColumns = (): TableColumns<IAuth> => {
  return [
    {
      title: 'id',
      key: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: '权限名称',
      key: 'auth_name',
      width: 150,
      align: 'center',
    },
    {
      title: '权限标识',
      key: 'auth_value',
      width: 200,
      align: 'center',
    },
    {
      title: '权限类型',
      key: 'type',
      align: 'center',
      width: 200,
      render(row) {
        return row.type === 1 ? '默认权限' : '自定义';
      },
    },
    {
      title: '权限权重',
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
          //       modalTitle.value = '编辑权限';
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
          //       modalTitle.value = '新增权限';
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
                deleteAuth(row.id);
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
              default: () => '会删除底下关联的所有子权限，确定吗?',
            }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'info',
              onClick: async () => {
                const treeAuth = await fetchGetChildAuth(row.id!); // 子权限树
                const allAuth = await fetchAllList(); // 父级权限下拉框
                childAuthData.value = treeAuth.data.result;
                selectList.value = allAuth.data.rows.map((v) => {
                  return {
                    ...v,
                    label: v.auth_name,
                    value: v.id,
                  };
                });
                formValue.value.id = row.id;
                modalTitle.value = '批量删除子权限';
                modalType.value = modalTypeEnum.BATCH_DELETE;
                modalVisiable.value = true;
              },
            },
            () => '批量删除子权限' // 用箭头函数返回性能更好。
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'warning',
              onClick: async () => {
                const allChildAuth = await fetchAllChildAuth(row.id!); // 子权限树
                const allChildAuthIds = [
                  row.id,
                  ...allChildAuth.data.result.map((v) => v.id),
                ];
                const allAuth = await fetchAllList(); // 父级权限下拉框
                // 递归禁用已有的权限
                const disableAuth = (data) => {
                  data.forEach((v) => {
                    if (allChildAuthIds.includes(v.id)) {
                      v.disabled = true;
                    }
                    if (v.children) {
                      disableAuth(v.children);
                    }
                  });
                  return data;
                };
                batchAddOptions.value = disableAuth(
                  deepCloneByJson(authData.value)
                );
                selectList.value = allAuth.data.rows.map((v) => {
                  return {
                    ...v,
                    label: v.auth_name,
                    value: v.id,
                  };
                });
                formValue.value.id = row.id;
                modalTitle.value = '批量新增子权限';
                modalType.value = modalTypeEnum.BATCH_ADD;
                modalVisiable.value = true;
              },
            },
            () => '批量新增子权限' // 用箭头函数返回性能更好。
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
    await fetchUpdateAuth({
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
    await fetchCreateAuth({
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

const deleteAuth = async (id) => {
  try {
    modalConfirmLoading.value = true;
    const { message }: any = await fetchDeleteAuth(id);
    modalVisiable.value = false;
    window.$message.success(message);
  } catch (error) {
    console.log(error);
  } finally {
    modalConfirmLoading.value = false;
    handlePageChange();
  }
};

const batchDeleteChildAuths = async () => {
  try {
    modalConfirmLoading.value = true;
    const { message }: any = await fetchBatchDeleteChildAuths({
      id: formValue.value.id,
      c_auths: formValue.value.c_auths,
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

const batchAddChildAuths = async () => {
  try {
    modalConfirmLoading.value = true;
    const { message }: any = await fetchBatchAddChildAuths({
      id: formValue.value.id,
      c_auths: formValue.value.c_auths,
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
          batchDeleteChildAuths();
          break;
        case modalTypeEnum.BATCH_ADD:
          batchAddChildAuths();
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
  formValue.value.c_auths = keys;
};
</script>

<style lang="scss" scoped></style>
