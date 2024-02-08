<template>
  <div class="dashboard-wrap">
    <div>{{ t('dashboard.userId') }}：{{ userInfo?.id }}</div>
    <div>{{ t('dashboard.userName') }}：{{ userInfo?.username }}</div>
    <div>
      {{ t('dashboard.userAvatar') }}：
      <img
        class="avatar"
        :src="userInfo?.avatar"
        alt=""
      />
    </div>
    <div>{{ t('dashboard.userDesc') }}：{{ userInfo?.desc }}</div>
    <div>
      {{ t('dashboard.userRole') }}：{{
        userInfo?.roles?.map((v) => v.role_name)
      }}
    </div>
    <div>
      {{ t('dashboard.userAuth') }}：{{
        userInfo?.auths?.map((v) => v.auth_name)
      }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserStore } from '@/stores/user';

const { t } = useI18n();
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
