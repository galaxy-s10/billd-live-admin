<template>
  <div class="account-wrap">
    <div class="list">
      <div class="item">
        <div class="label">密码</div>
        <div class="content">
          <n-button
            text
            type="info"
            @click="getPwd()"
          >
            点击获取
          </n-button>
          {{ password }}
        </div>
        <n-button
          text
          type="info"
          @click="changeCpt"
        >
          重置
        </n-button>
      </div>
    </div>

    <component
      v-if="currCpt"
      :is="cptList[currCpt]"
      @negative-click="negativeClick"
    ></component>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { fetchUserPwd } from '@/api/user';

import ResetPwdCpt from './resetPwd/index.vue';

const password = ref('');
const currCpt = ref();

const cptList = {
  [ResetPwdCpt.name]: ResetPwdCpt,
};

const changeCpt = () => {
  console.log(ResetPwdCpt);
  currCpt.value = ResetPwdCpt.name;
};

const negativeClick = () => {
  currCpt.value = undefined;
};

const getPwd = async () => {
  const res = await fetchUserPwd();
  password.value = res.data.password;
  window.$message.success('获取密码成功！');
};
</script>

<style lang="scss" scoped>
.account-wrap {
  .list {
    .item {
      display: flex;
      align-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f1f1f1;
      padding: 10px 0;
      .label {
        width: 80px;
        margin: 10px;
      }
      .content {
        flex: 1;
      }
    }
  }
}
</style>
