<template>
  <div class="live-stream-wrap">
    <!-- <HSearch
      :search-form-config="searchFormConfig"
      :init-value="reqParams"
      @click-search="ajaxFetchList(reqParams)"
    ></HSearch> -->
    <div class="page-wrap">
      <div>分页大小：</div>
      <div class="sel">
        <n-select
          v-model:value="reqParams.count"
          :options="options"
        />
      </div>

      <div>当前页数：{{ reqParams.start / reqParams.count + 1 }}</div>

      <n-space>
        <n-button
          :disabled="preBtnDisabled"
          @click="reqParams.start -= reqParams.count"
        >
          上一页
        </n-button>
        <n-button
          :disabled="nextBtnDisabled"
          @click="reqParams.start += reqParams.count"
        >
          下一页
        </n-button></n-space
      >
    </div>
    <n-data-table
      remote
      :loading="starListLoading"
      :columns="columns()"
      :data="tableList"
      :bordered="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { computed, h, onMounted, ref, watch } from 'vue';

import { fetchDeleteApiV1Clients, fetchGetApiV1Streams } from '@/api/srs';
import { IApiV1Streams } from '@/interface';

import { columnsConfig } from './config/columns.config';

const tableList = ref([]);
const options = ref([
  {
    label: '10',
    value: 10,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '30',
    value: 30,
  },
  {
    label: '50',
    value: 50,
  },
  {
    label: '100',
    value: 100,
  },
]);

const preBtnDisabled = computed(() => reqParams.value.start <= 0);

const nextBtnDisabled = ref(false);

const starListLoading = ref(false);

const reqParams = ref({
  start: 0, // 开始的索引，默认0。
  count: 20, // 返回的总数目，默认为10。
});

const columns = () => {
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
              NPopconfirm,
              {
                'positive-text': '确定',
                'negative-text': '取消',
                'on-positive-click': () => {
                  window.$message.info('敬请期待!');
                  // 流信息中的stream.publish.cid就是推流的客户端id：
                  fetchDeleteApiV1Clients(row.publish.cid);
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

watch(
  () => reqParams.value,
  (newVal) => {
    ajaxFetchList(newVal);
  },
  { deep: true }
);

const ajaxFetchList = async (params: { start: number; count: number }) => {
  try {
    starListLoading.value = true;
    const res: any = await fetchGetApiV1Streams(params);
    if (res.code === 200) {
      starListLoading.value = false;
      tableList.value = res.data.streams;
      if (res.data.streams.length < reqParams.value.count) {
        nextBtnDisabled.value = true;
      } else {
        nextBtnDisabled.value = false;
      }
    } else {
      Promise.reject(res);
    }
  } catch (err) {
    Promise.reject(err);
  }
};

onMounted(async () => {
  await ajaxFetchList(reqParams.value);
});
</script>

<style lang="scss" scoped>
.live-stream-wrap {
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
