<template>
  <div class="live-anchor-wrap">
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :scroll-x="1400"
      :loading="tableListLoading"
      :columns="columns"
      :data="tableListData"
      :pagination="pagination"
      :bordered="false"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref, watch } from 'vue';

import { fetchLiveList } from '@/api/live';
import { fetchDeleteApiV1Clients } from '@/api/srs';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { ILive } from '@/interface';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

const tableListData = ref<ILive[]>([]);
const total = ref(0);
const pagination = usePage();
const tableListLoading = ref(false);
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
  const action: TableColumns<ILive> = [
    {
      title: '操作',
      key: 'actions',
      width: 100,
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
              NPopconfirm,
              {
                'positive-text': '确定',
                'negative-text': '取消',
                'on-positive-click': async () => {
                  // 流信息中的stream.publish.cid就是推流的客户端id：
                  const res = await fetchDeleteApiV1Clients(row.srs_client_id!);
                  if (res.data.code === 0) {
                    window.$message.success('踢掉成功！');
                    handlePageChange(1);
                  } else {
                    window.$message.error(
                      `踢掉失败,${JSON.stringify(res.data)}`
                    );
                  }
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
                    () => '踢掉' // 用箭头函数返回性能更好。
                  ),
                default: () => '确定踢掉吗?',
              }
            ),
          ]
        );
      },
    },
  ];
  return [...columnsConfig, ...action];
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

async function ajaxFetchList(args) {
  try {
    tableListLoading.value = true;
    const res = await fetchLiveList(args);
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
</script>

<style lang="scss" scoped>
.live-anchor-wrap {
}
</style>
