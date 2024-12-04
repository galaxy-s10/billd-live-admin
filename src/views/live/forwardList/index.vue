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
import { useI18n } from 'vue-i18n';

import { fetchForwardList, fetchKillForward } from '@/api/live';
import { IApiV1Clients } from '@/interface';

import { columnsConfig } from './config/columns.config';

const { t } = useI18n();

const tableList = ref<IApiV1Clients['clients']>([]);

const starListLoading = ref(false);

const createColumns = (): TableColumns => {
  const action: TableColumns = [
    {
      title: '操作',
      key: 'actions',
      width: 100,
      align: 'center',
      fixed: 'right',
      render(row: any) {
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
                  const cmd: string = row.cmd || '';
                  const cmdarr = cmd.match(/\s+(\d+)\s+/);
                  const pid = Number(cmdarr?.[1]);
                  if (pid) {
                    await fetchKillForward(pid);
                    window.$message.success('已下发指令');
                    ajaxFetchList();
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
  return [...columnsConfig(t), ...action];
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
