<template>
  <div class="live-stream-wrap">
    <div class="page-wrap">
      <div>当前页有几条记录：{{ tableList.length }}</div>

      <n-space>
        <n-button
          type="success"
          @click="ajaxFetchList()"
        >
          刷新
        </n-button>
      </n-space>
    </div>
    <n-data-table
      :loading="starListLoading"
      :columns="columns"
      :data="tableList"
      :bordered="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import { TableColumns } from 'naive-ui/es/data-table/src/interface';
import { h, onMounted, ref } from 'vue';

import { fetchForwardList, fetchKillForward } from '@/api/live';
import { IApiV1Clients } from '@/interface';

import { columnsConfig } from './config/columns.config';

const tableList = ref<IApiV1Clients['clients']>([]);

const starListLoading = ref(false);

const createColumns = () => {
  const action: TableColumns<IApiV1Clients['clients'][0]> = [
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
                  const res = await fetchKillForward(row.id);
                  if (res.data.code === 0) {
                    window.$message.success('踢掉成功！');
                    ajaxFetchList();
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

const ajaxFetchList = async () => {
  try {
    starListLoading.value = true;
    const res: any = await fetchForwardList();
    if (res.code === 200) {
      starListLoading.value = false;
      tableList.value = res.data.list
        .filter((v) => v !== '')
        .map((v) => {
          return { cmd: v };
        });
    } else {
      Promise.reject(res);
    }
  } catch (err) {
    Promise.reject(err);
  }
};

onMounted(async () => {
  await ajaxFetchList();
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
