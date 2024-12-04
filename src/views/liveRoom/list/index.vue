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
import { useI18n } from 'vue-i18n';

import { fetchLiveRoomList, fetchUpdateLiveRoom } from '@/api/liveRoom';
import HModal from '@/components/Base/Modal';
import HSearch from '@/components/Base/Search';
import { usePage } from '@/hooks/use-page';
import {
  ILive,
  ILiveRoom,
  LiveRoomIsShowEnum,
  LiveRoomStatusEnum,
  LiveRoomUseCDNEnum,
} from '@/interface';
import router from '@/router';

import AddLiveRoomCpt from '../update/index.vue';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

const { t } = useI18n();

const tableListData = ref<ILive[]>([]);
const total = ref(0);
const pagination = usePage();
const modalConfirmLoading = ref(false);
const modalVisiable = ref(false);
const modalTitle = ref('编辑直播间');
const tableListLoading = ref(false);
const currRow = ref<ILiveRoom>({});
const addLiveRoomRef = ref<any>(null);

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
  orderName: 'created_at',
});
const searchForm = ref(searchFormConfig(t));

const createColumns = (): TableColumns<ILiveRoom> => {
  const action: TableColumns<ILiveRoom> = [
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
                    name: 'liveRoomUpdate',
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
    const res: ILiveRoom = await addLiveRoomRef.value.validateAndUpload();
    const { message } = await fetchUpdateLiveRoom({
      ...res,
      // @ts-ignore
      bg_img: res.bg_img?.[0]?.resultUrl,
      // @ts-ignore
      cover_img: res.cover_img?.[0]?.resultUrl,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    });
    window.$message.success(message);
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
