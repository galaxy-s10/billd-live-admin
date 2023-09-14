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
            name="pwdlogin"
            tab="账密登录"
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
            name="codelogin"
            tab="免密登录"
          >
            <n-form
              ref="registerFormRef"
              label-placement="left"
              size="large"
              :model="registerForm"
              :rules="registerRules"
            >
              <n-form-item path="email">
                <n-input
                  v-model:value="registerForm.email"
                  placeholder="请输入邮箱"
                >
                  <template #prefix>
                    <n-icon
                      size="20"
                      class="lang"
                    >
                      <MailOutline></MailOutline>
                    </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="code">
                <n-input-group>
                  <n-input
                    v-model:value="registerForm.code"
                    placeholder="请输入验证码"
                    @keyup.enter="handleRegisterSubmit"
                  />
                  <n-button
                    type="primary"
                    ghost
                    :disabled="downCount !== 0"
                    :loading="sendCodeLoading"
                    @click="sendCode()"
                  >
                    发送{{ downCount !== 0 ? `(${downCount})` : '' }}
                  </n-button>
                </n-input-group>
              </n-form-item>
            </n-form>
            <n-button
              type="primary"
              block
              secondary
              strong
              @click="handleRegisterSubmit"
            >
              登录
            </n-button>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
    <SwitchEnv></SwitchEnv>
    <PoweredByCpt></PoweredByCpt>
  </div>
</template>

<script lang="ts" setup>
import {
  LockClosedOutline,
  MailOutline,
  PersonOutline,
} from '@vicons/ionicons5';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { fetchSendLoginCode, fetchSendRegisterCode } from '@/api/emailUser';
import PoweredByCpt from '@/components/PoweredBy/index.vue';
import { useUserStore } from '@/store/user';

const loginRules = {
  id: { required: true, message: '请输入账号', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
};
const registerRules = {
  email: { required: true, message: '请输入邮箱', trigger: 'blur' },
  code: { required: true, message: '请输入验证码', trigger: 'blur' },
};

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const loginForm = ref({
  id: '',
  password: '',
});
const registerForm = ref({
  email: '',
  code: '',
});
const loginFormRef = ref(null);
const registerFormRef = ref(null);
const currentTab = ref('pwdlogin');
const sendCodeLoading = ref(false);
const downCount = ref(0);

const handleLogin = async () => {
  let token = null;
  if (currentTab.value === 'codelogin') {
    token = await userStore.codeLogin({
      email: registerForm.value.email,
      code: registerForm.value.code,
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
const handleRegister = async () => {
  const { token } = await userStore.register({
    email: registerForm.value.email,
    code: registerForm.value.code,
  });
  if (token) {
    window.$message.success('注册成功!');
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
const handleRegisterSubmit = (e) => {
  e.preventDefault();
  // @ts-ignore
  registerFormRef.value.validate((errors) => {
    if (!errors) {
      if (currentTab.value === 'register') {
        handleRegister();
      } else {
        handleLogin();
      }
    }
  });
};
/** 发送验证码 */
const sendCode = async () => {
  if (registerForm.value.email === '')
    return window.$message.warning('请输入邮箱!');
  try {
    sendCodeLoading.value = true;
    if (currentTab.value === 'codelogin') {
      await fetchSendLoginCode(registerForm.value.email);
    } else {
      await fetchSendRegisterCode(registerForm.value.email);
    }
    sendCodeLoading.value = false;
    window.$message.success('发送成功!');
    downCount.value = 60;
    const timer = setInterval(() => {
      downCount.value -= 1;
      if (downCount.value === 0) {
        clearInterval(timer);
      }
    }, 1000);
  } catch (error: any) {
    sendCodeLoading.value = false;
    console.log(error);
  }
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
