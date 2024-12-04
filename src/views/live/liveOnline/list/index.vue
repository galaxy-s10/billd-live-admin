<template>
  <div class="live-record-wrap">
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { fetchLiveList } from '@/api/live';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { ILive } from '@/interface';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

const { t, locale } = useI18n();
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

const columns = columnsConfig(t);

const scrollX = ref(0);
columns.forEach((item) => {
  if (item.width) {
    scrollX.value += Number(item.width);
  }
});
const searchForm = searchFormConfig(t);

onMounted(() => {
  handlePageChange(1);
});

watch(
  () => pagination.pageSize,
  () => {
    handlePageChange(1);
  }
);
watch(
  () => locale.value,
  () => {
    // @ts-ignore
    searchForm.value = searchFormConfig(t);
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
    const res = await fetchLiveList({
      ...args,
      childOrderName: 'priority',
      childOrderBy: 'desc',
    });
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
.live-record-wrap {
}
</style>
