<template>
  <div>
    <HSearch
      :search-form-config="searchForm"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :scroll-x="scrollX"
      :loading="tableListLoading"
      :columns="columns"
      :data="tableListData"
      :pagination="pagination"
      :bordered="false"
      @update:page="handlePageChange"
    />
    <HModal
      v-model:show="modalVisiable"
      :title="modalTitle"
      :loading="modalConfirmLoading"
      @update:show="modalUpdateShow"
      @confirm="modalConfirm"
      @cancel="modalCancel"
    >
      <div v-if="modalType === modalUserTypeEnum.EDIT">
        <AddUser
          ref="addUserRef"
          v-model="currRow"
          :show-action="false"
        ></AddUser>
      </div>
      <div v-if="modalType === modalUserTypeEnum.EDIT_ROLE">
        <n-form
          ref="formRef"
          :inline="false"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          label-placement="left"
        >
          <n-form-item
            label="用户名"
            path="username"
          >
            <n-input
              v-model:value="formValue.username"
              placeholder="请输入用户名"
              disabled
            />
          </n-form-item>
          <n-form-item
            label="角色"
            path="user_roles"
          >
            <n-tree
              style="width: 100%"
              checkable
              cascade
              selectable
              :data="roleTreeList"
              :default-checked-keys="formValue.user_roles"
              key-field="id"
              label-field="role_name"
              children-field="children"
              @update:checked-keys="updateCheckedKeys"
            />
          </n-form-item>
        </n-form>
      </div>
    </HModal>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NSpace, UploadFileInfo } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { fetchTreeRole, fetchUserRole } from '@/api/role';
import {
  fetchUpdateUser,
  fetchUpdateUserRole,
  fetchUserDetail,
  fetchUserList,
} from '@/api/user';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IList, IUser, modalUserTypeEnum } from '@/interface';

import AddUser from '../add/index.vue';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

const { t } = useI18n();

interface ISearch extends IUser, IList<any> {}

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['input', 'blur', 'change'],
  },
};
const tableListData = ref([]);
const total = ref(0);
const pagination = usePage();
const roleTreeList = ref([]);
const modalType = ref<modalUserTypeEnum>(modalUserTypeEnum.EDIT);
const formValue = ref<IUser>({
  id: 1,
  username: '',
  desc: '',
  avatar: '',
  status: 1,
  user_roles: [],
});
const modalConfirmLoading = ref(false);
const modalVisiable = ref(false);
const modalTitle = ref('编辑用户');
const tableListLoading = ref(false);
const currRow = ref({});
const params = ref<ISearch>({
  orderName: 'id',
  orderBy: 'desc',
});
const defaultCheckedKeys = ref([]);
const formRef = ref<any>(null);
const addUserRef = ref<InstanceType<typeof AddUser>>();

const createColumns = (): TableColumns<IUser> => {
  const action: TableColumns<IUser> = [
    {
      title: '操作',
      key: 'actions',
      width: 200,
      fixed: 'right',
      align: 'center',
      render(row) {
        return h(NSpace, { justify: 'center' }, () => [
          h(
            NButton,
            {
              size: 'small',
              onClick: async () => {
                const { data } = await fetchUserDetail(row.id!);
                // @ts-ignore
                data.qq_users = data.qq_users?.length ? 1 : 2;
                // @ts-ignore
                data.github_users = data.github_users?.length ? 1 : 2;
                // @ts-ignore
                data.email_users = data.email_users?.length ? 1 : 2;
                let avatar: UploadFileInfo[] = [];
                if (row.avatar) {
                  avatar = [
                    {
                      id: row.avatar as string,
                      name: row.avatar as string,
                      url: row.avatar as string,
                      status: 'finished',
                      percentage: 100,
                    },
                  ];
                }
                currRow.value = { ...data, avatar };
                modalType.value = modalUserTypeEnum.EDIT;
                modalVisiable.value = !modalVisiable.value;
              },
            },
            () => '编辑' // 用箭头函数返回性能更好。
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'primary',
              onClick: async () => {
                const userInfo = await fetchUserDetail(row.id!);
                const userRole = await fetchUserRole(row.id!);
                await ajaxFetchTreeRole();

                formValue.value = {
                  ...userInfo.data,
                  user_roles: userRole.data.result.map((v) => v.id),
                };
                modalTitle.value = '编辑角色';
                modalType.value = modalUserTypeEnum.EDIT_ROLE;
                modalVisiable.value = !modalVisiable.value;
              },
            },
            () => '编辑角色' // 用箭头函数返回性能更好。
          ),
        ]);
      },
    },
  ];
  return [...columnsConfig(t), ...action];
};
const searchForm = ref(searchFormConfig(t));

const columns = createColumns();
const scrollX = ref(0);
columns.forEach((item) => {
  if (item.width) {
    scrollX.value += Number(item.width);
  }
});

onMounted(() => {
  handlePageChange(1);
});

watch(
  () => pagination.pageSize,
  () => {
    handlePageChange(1);
  }
);

const updateCheckedKeys = (keys) => {
  defaultCheckedKeys.value = keys;
  formValue.value.user_roles = keys;
};

async function ajaxFetchList(args) {
  try {
    tableListLoading.value = true;
    const res: any = await fetchUserList(args);
    if (res.code === 200) {
      tableListLoading.value = false;
      tableListData.value = res.data.rows;
      total.value = res.data.total;
      pagination.page = args.nowPage;
      pagination.itemCount = res.data.total;
      pagination.pageSize = args.pageSize;
    } else {
      Promise.reject(res);
    }
  } catch (err) {
    Promise.reject(err);
  }
}

async function handlePageChange(currentPage) {
  await ajaxFetchList({
    ...params.value,
    pageSize: pagination.pageSize,
    nowPage: currentPage,
  });
}

function modalUpdateShow(newVal) {
  modalVisiable.value = newVal;
}

const updateUser = async (val) => {
  try {
    modalConfirmLoading.value = true;
    const { message } = await fetchUpdateUser({
      ...val,
      avatar: val.avatar?.[0]?.resultUrl,
    });
    modalVisiable.value = false;
    window.$message.success(message);
    handlePageChange(params.value.nowPage);
  } catch (error) {
    console.log(error);
  } finally {
    modalConfirmLoading.value = false;
  }
};
const updateUserRole = async () => {
  try {
    modalConfirmLoading.value = true;
    await fetchUpdateUserRole({
      id: formValue.value.id,
      user_roles: formValue.value.user_roles,
    });
    modalVisiable.value = false;
    window.$message.success('修改成功!');
    handlePageChange(params.value.nowPage);
  } catch (error) {
    console.log(error);
  } finally {
    modalConfirmLoading.value = false;
  }
};

const modalConfirm = async () => {
  if (modalType.value === modalUserTypeEnum.EDIT) {
    const res = await addUserRef.value?.validateAndUpload();
    if (res) {
      updateUser(res);
    }
  } else if (modalType.value === modalUserTypeEnum.EDIT_ROLE) {
    formRef.value?.validate((errors) => {
      if (!errors) {
        updateUserRole();
      } else {
        window.$message.error(errors);
      }
    });
  }
};

const modalCancel = () => {
  modalVisiable.value = false;
};

const ajaxFetchTreeRole = async () => {
  try {
    const res: any = await fetchTreeRole();
    if (res.code === 200) {
      roleTreeList.value = res.data;
    } else {
      Promise.reject(res);
    }
  } catch (err) {
    Promise.reject(err);
  }
};
const handleSearch = (v) => {
  params.value = {
    ...params.value,
    ...v,
    nowPage: 1,
    pageSize: pagination.pageSize,
    rangTimeType: v.rangTimeType ? 'created_at' : undefined,
    rangTimeStart: v.rangTimeType ? v.rangTimeType[0] : undefined,
    rangTimeEnd: v.rangTimeType ? v.rangTimeType[1] : undefined,
  };
  handlePageChange(1);
};
</script>

<style lang="scss" scoped></style>
