<template>
  <div class="dashboard-wrap">
    <div>用户id：{{ userInfo?.id }}</div>
    <div>用户昵称：{{ userInfo?.username }}</div>
    <div>
      用户头像：
      <img
        class="avatar"
        :src="userInfo?.avatar"
        alt=""
      />
    </div>
    <div>简介：{{ userInfo?.desc }}</div>
    <div>角色：{{ userInfo?.roles?.map((v) => v.role_name) }}</div>
    <div>权限：{{ userInfo?.auths?.map((v) => v.auth_name) }}</div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { userInfo } = toRefs(userStore);
</script>

<style lang="scss" scoped>
.dashboard-wrap {
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
