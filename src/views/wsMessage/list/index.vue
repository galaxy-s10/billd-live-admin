<template>
  <div class="live-stream-wrap">
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
      :bordered="false"
      :pagination="pagination"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { fetchGetWsMessageList } from '@/api/wsMessage';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import {
  ILive,
  IWsMessage,
  LiveRoomIsShowEnum,
  LiveRoomStatusEnum,
  LiveRoomUseCDNEnum,
} from '@/interface';
import router from '@/router';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

const { t } = useI18n();

const tableListData = ref<ILive[]>([]);
const total = ref(0);
const pagination = usePage();
const tableListLoading = ref(false);

const params = ref<{
  is_show: LiveRoomIsShowEnum;
  status: LiveRoomStatusEnum;
  cdn: LiveRoomUseCDNEnum;
  orderName: string;
  orderBy: string;
  nowPage?: number;
  pageSize?: number;
}>({
  is_show: LiveRoomIsShowEnum.yes,
  status: LiveRoomStatusEnum.normal,
  cdn: LiveRoomUseCDNEnum.no,
  nowPage: 1,
  pageSize: 20,
  orderBy: 'desc',
  orderName: 'send_msg_time',
});
const searchForm = ref(searchFormConfig(t));

const createColumns = (): TableColumns<IWsMessage> => {
  const action: TableColumns<IWsMessage> = [
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
                    name: 'wsMessageUpdate',
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
const scrollX = ref(0);
columns.forEach((item) => {
  if (item.width) {
    scrollX.value += Number(item.width);
  }
});
onMounted(() => {
  handlePageChange(1);
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
    pageSize: pagination.pageSize,
    rangTimeType: v.rangTimeType ? 'created_at' : undefined,
    rangTimeStart: v.rangTimeType ? v.rangTimeType[0] : undefined,
    rangTimeEnd: v.rangTimeType ? v.rangTimeType[1] : undefined,
  };
  handlePageChange(1);
};

const ajaxFetchList = async (args) => {
  try {
    tableListLoading.value = true;
    const res = await fetchGetWsMessageList(args);
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
