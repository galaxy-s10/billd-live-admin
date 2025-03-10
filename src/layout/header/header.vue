<template>
  <header class="header-warp">
    <div class="left">
      <BreadcrumbCpt></BreadcrumbCpt>
    </div>
    <div class="action">
      <n-dropdown
        trigger="hover"
        :options="options"
        @select="handleSelect"
      >
        <div class="user">
          <img
            class="avatar"
            :src="userStore.userInfo?.avatar"
            alt=""
          />
          <span class="name">{{ userStore.userInfo?.username }}</span>
        </div>
      </n-dropdown>
      <n-dropdown
        trigger="hover"
        :options="langOptions"
        @select="handleSelectLang"
      >
        <div class="lang">
          <n-icon size="20">
            <language></language>
          </n-icon>
        </div>
      </n-dropdown>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Language } from '@vicons/ionicons5';
import { windowReload } from 'billd-utils';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import BreadcrumbCpt from '@/components/Breadcrumb/index.vue';
import { LIVE_CLIENT_URL } from '@/spec-config';
import { useAppStore } from '@/store/app';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const appStore = useAppStore();
const router = useRouter();
const { locale } = useI18n();

const options = ref([
  {
    label: '直播前台',
    key: '1',
  },
  {
    label: '账号设置',
    key: '2',
  },
  {
    label: '退出登录',
    key: '3',
  },
]);

const localeMap = {
  zh: '中文',
  en: 'English',
};

const langOptions = ref([
  {
    label: localeMap.zh,
    key: 'zh',
  },
  {
    label: localeMap.en,
    key: 'en',
  },
]);

function handleSelectLang(key) {
  locale.value = key;
}

const handleSelect = (v) => {
  if (v === '1') {
    window.open(LIVE_CLIENT_URL);
  } else if (v === '2') {
    router.push('/setting/account').then(
      () => {},
      () => {}
    );
  } else if (v === '3') {
    userStore.logout();
    appStore.setRoutes([]);
    router.push('/login').then(
      () => {
        windowReload();
      },
      (err) => {
        console.log(err);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.header-warp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-bottom: 1px solid #eee;
  .left {
    padding: 0 10px;
  }
  .action {
    display: flex;
    align-items: center;
    > div:hover {
      cursor: pointer;
      background-color: #f6f6f6;
    }
    .user {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 48px;
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      .name {
        margin-left: 6px;
        font-size: 14px;
      }
    }
    .lang {
      display: inline-flex;
      height: 48px;
      align-items: center;
      padding: 0 10px;
    }
  }
}
</style>
