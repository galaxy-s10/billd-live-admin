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
      :bordered="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  fetchAllLiveRoomOnlineUser,
  fetchLiveRoomOnlineUser,
} from '@/api/live';
import HSearch from '@/components/Base/Search';
import { ILiveRoomLiveUser } from '@/interface';

import { columnsConfig } from './config/columns.config';
import { searchFormConfig } from './config/search.config';

const { t } = useI18n();

const tableListData = ref<ILiveRoomLiveUser[]>([]);
const tableListLoading = ref(false);
const params = ref({});

const createColumns = (): TableColumns<ILiveRoomLiveUser> => {
  const action: TableColumns<ILiveRoomLiveUser> = [
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
  };
  handlePageChange();
};

async function ajaxFetchList(args) {
  try {
    tableListLoading.value = true;
    let res;
    if (args.live_room_id) {
      res = await fetchLiveRoomOnlineUser(args.live_room_id);
    } else {
      res = await fetchAllLiveRoomOnlineUser();
    }
    console.log(res);
    if (res.code === 200) {
      tableListLoading.value = false;
      tableListData.value = res.data.filter((v) => {
        if (args.keyWord?.length) {
          if (v.live_room_name.indexOf(args.keyWord) !== -1) {
            return true;
          }
          if (v.user_username.indexOf(args.keyWord) !== -1) {
            return true;
          }
          return false;
        } else {
          return true;
        }
      });
      if (args.live_room_id) {
        tableListData.value = tableListData.value.filter(
          (v) => v.live_room_id === args.live_room_id
        );
      }
      if (args.user_id) {
        tableListData.value = tableListData.value.filter(
          (v) => v.user_id === args.user_id
        );
      }
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
