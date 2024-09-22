<template>
  <div class="login-warp">
    <div class="content">
      <img
        class="logo"
        src="@/assets/img/billd-admin-logo.png"
        alt=""
      />
      <n-card>
        <n-tabs
          :value="currentTab"
          :default-value="currentTab"
          size="large"
          :on-update:value="tabChange"
        >
          <n-tab-pane
            name="idLogin"
            tab="id登录"
          >
            <n-form
              ref="loginFormRef"
              label-placement="left"
              size="large"
              :model="loginForm"
              :rules="loginRules"
            >
              <n-form-item path="id">
                <n-input
                  v-model:value="loginForm.id"
                  type="text"
                  placeholder="请输入账号"
                >
                  <template #prefix>
                    <n-icon
                      size="20"
                      class="lang"
                    >
                      <PersonOutline></PersonOutline>
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="loginForm.password"
                  type="password"
                  show-password-on="mousedown"
                  placeholder="请输入密码"
                  @focus="onFocus"
                  @blur="onBlur"
                  @keyup.enter="handleLoginSubmit"
                >
                  <template #prefix>
                    <n-icon
                      size="20"
                      class="lang"
                    >
                      <LockClosedOutline></LockClosedOutline>
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
            </n-form>
            <n-button
              type="primary"
              block
              secondary
              strong
              @click="handleLoginSubmit"
            >
              登录
            </n-button>
          </n-tab-pane>
          <n-tab-pane
            name="usernameLogin"
            tab="用户名登录"
          >
            <n-form
              ref="loginFormRef"
              label-placement="left"
              size="large"
              :model="loginForm"
              :rules="loginRules"
            >
              <n-form-item path="id">
                <n-input
                  v-model:value="loginForm.id"
                  type="text"
                  placeholder="请输入用户名"
                >
                  <template #prefix>
                    <n-icon
                      size="20"
                      class="lang"
                    >
                      <PersonOutline></PersonOutline>
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="password">
                <n-input
                  v-model:value="loginForm.password"
                  type="password"
                  show-password-on="mousedown"
                  placeholder="请输入密码"
                  @focus="onFocus"
                  @blur="onBlur"
                  @keyup.enter="handleLoginSubmit"
                >
                  <template #prefix>
                    <n-icon
                      size="20"
                      class="lang"
                    >
                      <LockClosedOutline></LockClosedOutline>
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
            </n-form>
            <n-button
              type="primary"
              block
              secondary
              strong
              @click="handleLoginSubmit"
            >
              登录
            </n-button>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LockClosedOutline, PersonOutline } from '@vicons/ionicons5';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useUserStore } from '@/stores/user';

const loginRules = {
  id: { required: true, message: '请输入账号', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
};

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const loginForm = ref({
  id: '',
  password: '',
});

const loginFormRef = ref(null);
const currentTab = ref<'idLogin' | 'usernameLogin'>('idLogin');

const handleLogin = async () => {
  let token = null;
  if (currentTab.value === 'usernameLogin') {
    token = await userStore.fetchUserNameLogin({
      username: loginForm.value.id,
      password: loginForm.value.password,
    });
  } else {
    token = await userStore.pwdLogin({
      id: +loginForm.value.id,
      password: loginForm.value.password,
    });
  }
  if (token) {
    window.$message.success('登录成功!');
    router.push((route.query.redirect as '') || '/');
  }
};
const handleLoginSubmit = (e) => {
  e.preventDefault();
  // @ts-ignore
  loginFormRef.value.validate((errors) => {
    if (!errors) {
      handleLogin();
    }
  });
};

const tabChange = (v) => {
  currentTab.value = v;
};
const focus = ref(false);
const onFocus = () => {
  focus.value = true;
};
const onBlur = () => {
  focus.value = false;
};
</script>

<style lang="scss">
.login-warp {
  position: relative;
  min-height: 100vh;
  background-color: #f5f7f9;
  .content {
    position: absolute;
    top: calc(50% - 60px);
    left: 50%;
    min-width: 350px;
    border-radius: 5px;
    transform: translate(-50%, -50%);

    .logo {
      display: block;
      margin: 0 auto 10px;
      width: 300px;
    }

    .other-login {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 5px 0;
      .logo-wrap {
        display: flex;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #f4f8fb;
        cursor: pointer;

        .qq-logo {
          margin: 0 auto;
          width: 25px;
        }
      }
    }
  }
}
</style>
