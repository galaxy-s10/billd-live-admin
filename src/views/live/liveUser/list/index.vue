<template>
  <div class="live-audience-wrap">
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
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { fetchLiveViewList } from '@/api/liveView';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { ILiveView } from '@/interface';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

const { t } = useI18n();

const tableListData = ref<ILiveView[]>([]);
const total = ref(0);
const pagination = usePage();
const tableListLoading = ref(false);
const params = ref({
  live_room_id: undefined,
  user_id: undefined,
  nowPage: 1,
  pageSize: 20,
});

const createColumns = (): TableColumns<ILiveView> => {
  const action: TableColumns<ILiveView> = [
    {
      title: '操作',
      key: 'actions',
      width: 100,
      align: 'center',
      fixed: 'right',
      render() {
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
                'on-positive-click': () => {
                  handlePageChange();
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
  return [...columnsConfig(t), ...action];
};

const columns = createColumns();
const scrollX = ref(0);
const searchForm = ref(searchFormConfig(t));

columns.forEach((item) => {
  if (item.width) {
    scrollX.value += Number(item.width);
  }
});

onMounted(() => {
  handlePageChange();
});

async function handlePageChange() {
  await ajaxFetchList(params.value);
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
  handlePageChange();
};

async function ajaxFetchList(args) {
  try {
    tableListLoading.value = true;
    const res = await fetchLiveViewList({ ...args });
    if (res.code === 200) {
      tableListLoading.value = false;
      tableListData.value = res.data.rows;
      total.value = res.data.total;
      pagination.itemCount = res.data.total;
      pagination.nowPage = args.nowPage;
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
.live-audience-wrap {
}
</style>
