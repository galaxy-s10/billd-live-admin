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
  </div>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { fetchGoodsList } from '@/api/googds';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import { IGoods, IList } from '@/interface';
import router from '@/router';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

const { t } = useI18n();

interface ISearch extends IGoods, IList<any> {}

const tableListData = ref([]);
const total = ref(0);
const pagination = usePage();
const tableListLoading = ref(false);
const params = ref<ISearch>({
  orderName: 'id',
  orderBy: 'desc',
});

const createColumns = (): TableColumns<IGoods> => {
  const action: TableColumns<IGoods> = [
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
                  router.push({
                    name: 'goodsUpdate',
                    query: { id: row.id },
                  });
                  // modalVisiable.value = true;
                  // let bgImg: UploadFileInfo[] = [];
                  // let coverImg: UploadFileInfo[] = [];
                  // if (row.bg_img) {
                  //   bgImg = [
                  //     {
                  //       id: row.bg_img as string,
                  //       name: row.bg_img as string,
                  //       url: row.bg_img as string,
                  //       status: 'finished',
                  //       percentage: 100,
                  //     },
                  //   ];
                  // }
                  // if (row.cover_img) {
                  //   coverImg = [
                  //     {
                  //       id: row.cover_img as string,
                  //       // name: row.cover_img as string,
                  //       name: 'base64',
                  //       url: row.cover_img as string,
                  //       status: 'finished',
                  //       percentage: 100,
                  //     },
                  //   ];
                  // }
                  // currRow.value = {
                  //   ...row,
                  //   // @ts-ignore
                  //   bg_img: bgImg,
                  //   // @ts-ignore
                  //   cover_img: coverImg,
                  // };
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
const searchForm = ref(searchFormConfig(t));

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

async function ajaxFetchList(args) {
  try {
    tableListLoading.value = true;
    const res: any = await fetchGoodsList(args);
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
</script>

<style lang="scss" scoped></style>
