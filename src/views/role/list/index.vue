<template>
  <div>
    <HSearch
      :search-form-config="searchForm"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
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
      <EditRoleAuthCpt
        v-if="isEditAuth"
        ref="editRoleAuthRef"
        v-model="currRow"
        :show-action="false"
      ></EditRoleAuthCpt>
      <AddRoleCpt
        v-else
        ref="addRoleRef"
        v-model="currRow"
        :show-action="false"
      ></AddRoleCpt>
    </HModal>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  fetchRoleAuth,
  fetchRoleList,
  fetchUpdateRole,
  fetchUpdateRoleAuth,
} from '@/api/role';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IList, IRole } from '@/interface';

import AddRoleCpt from '../add/index.vue';
import EditRoleAuthCpt from '../editRoleAuth/index.vue';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

const { t } = useI18n();

interface ISearch extends IRole, IList<any> {}

const tableListData = ref([]);
const total = ref(0);
const isEditAuth = ref(false);
const pagination = usePage();

const modalConfirmLoading = ref(false);
const modalVisiable = ref(false);
const modalTitle = ref('');
const tableListLoading = ref(false);
const currRow = ref({});
const addRoleRef = ref<InstanceType<typeof AddRoleCpt>>();
const editRoleAuthRef = ref<InstanceType<typeof EditRoleAuthCpt>>();
const params = ref<ISearch>({
  orderName: 'id',
  orderBy: 'desc',
});
const searchForm = ref(searchFormConfig(t));

const createColumns = (): TableColumns<IRole> => {
  const action: TableColumns<IRole> = [
    {
      title: '操作',
      key: 'actions',
      width: 200,
      align: 'center',
      fixed: 'right',
      render(row) {
        return h(
          NSpace,
          {
            justify: 'center',
          },
          () => [
            h(
              NButton,
              {
                size: 'small',
                type: 'info',
                onClick: async () => {
                  const { data } = await fetchRoleAuth(row.id!);
                  isEditAuth.value = true;
                  modalTitle.value = '编辑角色权限';
                  modalVisiable.value = true;
                  currRow.value = {
                    id: row.id,
                    role_auths: data.result.map((v: IRole) => v.id),
                  };
                },
              },
              () => '编辑角色权限' // 用箭头函数返回性能更好。
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'primary',
                onClick: () => {
                  isEditAuth.value = false;
                  modalTitle.value = '编辑角色';
                  modalVisiable.value = true;
                  currRow.value = { ...row };
                },
              },
              () => '编辑' // 用箭头函数返回性能更好。
            ),
          ]
        );
      },
    },
  ];
  return [...columnsConfig(t), ...action];
};

const columns = createColumns();

onMounted(() => {
  handlePageChange(1);
});

watch(
  () => pagination.pageSize,
  () => {
    handlePageChange(1);
  }
);

async function ajaxFetchList(args) {
  try {
    tableListLoading.value = true;
    const res: any = await fetchRoleList(args);
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

const modalCancel = () => {
  modalVisiable.value = false;
};

const updateRole = async () => {
  try {
    modalConfirmLoading.value = true;
    const res: any = await addRoleRef.value?.validateForm();
    await fetchUpdateRole({
      ...res,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    });
    window.$message.success('更新成功!');
    modalVisiable.value = false;
    handlePageChange(params.value.nowPage);
  } catch (error) {
    console.log(error);
  } finally {
    modalConfirmLoading.value = false;
  }
};

const updateRoleAuth = async () => {
  try {
    modalConfirmLoading.value = true;
    const res: any = await editRoleAuthRef.value?.validateForm();
    await fetchUpdateRoleAuth({
      id: res.id,
      role_auths: res.role_auths,
    });
    window.$message.success('更新成功!');
    modalVisiable.value = false;
    handlePageChange(params.value.nowPage);
  } catch (error) {
    console.log(error);
  } finally {
    modalConfirmLoading.value = false;
  }
};

const modalConfirm = () => {
  if (isEditAuth.value) {
    updateRoleAuth();
  } else {
    updateRole();
  }
};

const modalUpdateShow = (newVal) => {
  modalVisiable.value = newVal;
};
</script>

<style lang="scss" scoped></style>
