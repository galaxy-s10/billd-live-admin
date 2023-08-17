<template>
  <div class="dashboard-wrap">
    <div>用户id: {{ userInfo?.id }}</div>
    <div>用户昵称: {{ userInfo?.username }}</div>
    <div>
      用户头像:
      <img
        class="avatar"
        :src="userInfo?.avatar"
        alt=""
      />
    </div>
    <div>简介: {{ userInfo?.title }}</div>
    <div>角色: {{ userInfo?.roles.map((v) => v.role_name) }}</div>
    <div>累计发出点赞: {{ userInfo?.send_stars_total }}</div>
    <div>累计收到点赞: {{ userInfo?.receive_stars_total }}</div>
    <div>累计发出评论: {{ userInfo?.send_comments_total }}</div>
    <div>累计收到回复: {{ userInfo?.receive_comments_total }}</div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

import { useUserStore } from '@/store/user';

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
