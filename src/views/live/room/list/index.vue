<template>
  <div class="live-stream-wrap">
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :loading="tableListLoading"
      :columns="columns"
      :data="tableListData"
      :bordered="false"
      :pagination="pagination"
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
      <AddLiveRoomCpt
        ref="addLiveRoomRef"
        v-model="currRow"
        :show-action="false"
      ></AddLiveRoomCpt>
    </HModal>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref } from 'vue';

import { fetchUpdateAuth } from '@/api/auth';
import { fetchLiveRoomList } from '@/api/liveRoom';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IApiV1Streams, ILive } from '@/interface';

import AddLiveRoomCpt from '../add/index.vue';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

const tableListData = ref<ILive[]>([]);
const total = ref(0);
const pagination = usePage();
const modalConfirmLoading = ref(false);
const modalVisiable = ref(false);
const modalTitle = ref('编辑直播间');
const tableListLoading = ref(false);
const currRow = ref({});
const addLiveRoomRef = ref<any>(null);

const params = ref<{
  orderName: string;
  orderBy: string;
  nowPage?: number;
  pageSize?: number;
}>({
  nowPage: 1,
  pageSize: 20,
  orderBy: 'desc',
  orderName: 'created_at',
});

const createColumns = () => {
  const action: TableColumns<IApiV1Streams['streams'][0]> = [
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
                type: 'primary',
                onClick: () => {
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
  return [...columnsConfig, ...action];
};

const columns = createColumns();

onMounted(async () => {
  await ajaxFetchList(params.value);
});

const handlePageChange = async (currentPage) => {
  params.value.nowPage = currentPage;
  await ajaxFetchList({ ...params.value, nowPage: currentPage });
};

const handleSearch = (v) => {
  params.value = {
    ...params.value,
    ...v,
    nowPage: 1,
    pageSize: params.value.pageSize,
    rangTimeType: v.rangTimeType ? 'created_at' : undefined,
    rangTimeStart: v.rangTimeType ? v.rangTimeType[0] : undefined,
    rangTimeEnd: v.rangTimeType ? v.rangTimeType[1] : undefined,
  };
  handlePageChange(1);
};

const ajaxFetchList = async (args) => {
  try {
    tableListLoading.value = true;
    const res = await fetchLiveRoomList(args);
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
};

const modalCancel = () => {
  modalVisiable.value = false;
};

const modalConfirm = async () => {
  try {
    modalConfirmLoading.value = true;
    const res = await addLiveRoomRef.value.validateForm();
    await fetchUpdateAuth({
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

const modalUpdateShow = (newVal) => {
  modalVisiable.value = newVal;
};
</script>

<style lang="scss" scoped>
.live-stream-wrap {
  .red {
    color: red;
  }
  .page-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: flex-end;
    .sel {
      width: 70px;
    }
    > div {
      margin-right: 10px;
    }
  }
}
</style>
