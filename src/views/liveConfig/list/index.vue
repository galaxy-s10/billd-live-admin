<template>
  <div>
    <HSearch
      :search-form-config="searchFormConfig"
      :init-value="params"
      @click-search="handleSearch"
    ></HSearch>
    <n-data-table
      remote
      :loading="starListLoading"
      :columns="columns"
      :data="starListData"
      :pagination="pagination"
      :bordered="false"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { DataTableColumns, NButton, NPopconfirm, NSpace } from 'naive-ui';
import { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchDeleteFrontend, fetchFrontendList } from '@/api/liveConfig';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IFrontend, IList } from '@/interface';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

interface ISearch extends IFrontend, IList {}

const starListData = ref([]);
const total = ref(0);
const pagination = usePage();
const router = useRouter();

const starListLoading = ref(false);

const params = ref<ISearch>({
  nowPage: 1,
  pageSize: 10,
  orderName: 'id',
  orderBy: 'desc',
});
const createColumns = (): DataTableColumns<IFrontend> => {
  const action: TableColumn<IFrontend> = {
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
              onClick: () => {
                router.push({
                  name: 'liveConfigEdit',
                  query: { id: row.id },
                });
              },
            },
            () => '编辑' // 用箭头函数返回性能更好。
          ),
          h(
            NPopconfirm,
            {
              'positive-text': '确定',
              'negative-text': '取消',
              'on-positive-click': async () => {
                await fetchDeleteFrontend(row.id!);
                window.$message.success('删除成功！');
                await handlePageChange(params.value.nowPage);
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
              default: () => '确定删除吗?',
            }
          ),
        ]
      );
    },
  };
  return [...columnsConfig(), action];
};

const columns = createColumns();
const ajaxFetchList = async (args) => {
  try {
    starListLoading.value = true;
    const res: any = await fetchFrontendList(args);
    if (res.code === 200) {
      starListLoading.value = false;
      starListData.value = res.data.rows;
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
</script>

<style lang="scss" scoped></style>
