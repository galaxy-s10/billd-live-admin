<template>
  <div class="live-stream-wrap">
    <!-- <HSearch
      :search-form-config="searchFormConfig"
      :init-value="reqParams"
      @click-search="ajaxFetchList(reqParams)"
    ></HSearch> -->
    <div>
      <div>
        <span> 服务器带宽：30Mbps，理论速率：</span>
        <span class="red">3.75MB/s</span>，即3750KB/s
      </div>
      <div class="red">
        <b>
          <span>
            后端对用户推流码率有限制（2500kbps，即{{
              (2500 / 8 / 1000).toFixed(2)
            }}MB/s）
          </span>
          <span>如果超过，则会被自动踢掉！</span>
        </b>
      </div>
      <div>当前页的推流占用带宽：{{ bandwidth.push }}MB/s</div>
      <div>当前页的拉流占用带宽：{{ bandwidth.pull }}MB/s</div>
      <div>
        当前页的推流+拉流占用带宽：
        <span class="red">{{ bandwidth.all }}MB/s</span>
      </div>
      <div>
        剩余可用带宽：
        <span class="red">
          {{ (3.75 - Number(bandwidth.all)).toFixed(2) }}MB/s
        </span>
      </div>
    </div>
    <div class="page-wrap">
      <div>分页大小：</div>
      <div class="sel">
        <n-select
          v-model:value="reqParams.count"
          :options="options"
        />
      </div>

      <div>当前页数：{{ reqParams.start / reqParams.count + 1 }}</div>

      <div>当前页有几条记录：{{ tableList.length }}</div>

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
        </n-button>
        <n-button
          type="success"
          @click="ajaxFetchList(reqParams)"
        >
          刷新
        </n-button>
      </n-space>
    </div>
    <n-data-table
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
import { computed, h, onMounted, reactive, ref, watch } from 'vue';

import { fetchDeleteApiV1Clients, fetchGetApiV1Clients } from '@/api/srs';
import { IApiV1Clients } from '@/interface';

import { columnsConfig } from './config/columns.config';

const bandwidth = reactive({
  push: '0',
  pull: '0',
  all: '0',
});
const tableList = ref<IApiV1Clients['clients']>([]);
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
  const action: TableColumns<IApiV1Clients['clients'][0]> = [
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
                'on-positive-click': async () => {
                  const res = await fetchDeleteApiV1Clients(row.id);
                  if (res.data.code === 0) {
                    window.$message.success('踢掉成功！');
                    reqParams.value.start = 0;
                    ajaxFetchList(reqParams.value);
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
watch(
  () => tableList.value,
  (newVal) => {
    let push = 0;
    let pull = 0;
    newVal.forEach((item) => {
      push += item.kbps.recv_30s;
      pull += item.kbps.send_30s;
    });
    bandwidth.push = `${(push / 8 / 1000).toFixed(2)}`;
    bandwidth.pull = `${(pull / 8 / 1000).toFixed(2)}`;
    bandwidth.all = `${(push / 8 / 1000 + pull / 8 / 1000).toFixed(2)}`;
  },
  { deep: true }
);

watch(
  () => reqParams.value.count,
  () => {
    reqParams.value.start = 0;
    ajaxFetchList(reqParams.value);
  }
);

watch(
  () => reqParams.value.start,
  () => {
    ajaxFetchList(reqParams.value);
  }
);

const ajaxFetchList = async (params: { start: number; count: number }) => {
  try {
    starListLoading.value = true;
    const res: any = await fetchGetApiV1Clients(params);
    if (res.code === 200) {
      starListLoading.value = false;
      tableList.value = res.data.clients;
      if (res.data.clients.length < reqParams.value.count) {
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
