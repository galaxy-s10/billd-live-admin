import { getUrlParams, hrefToTarget, isMobile } from 'billd-utils';

import { fetchBindGithub, fetchGithubLogin } from '@/api/githubUser';
import { fetchBindQQ, fetchQQLogin } from '@/api/qqUser';
import { POSTMESSAGE_TYPE, REDIRECT_URI } from '@/constant';
import router from '@/router';
import {
  GITHUB_CLIENT_ID,
  GITHUB_OAUTH_URL,
  QQ_CLIENT_ID,
  QQ_OAUTH_URL,
} from '@/spec-config';
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';
import { clearLoginEnv, setLoginEnv } from '@/utils/cookie';

export const handleLogin = async (e) => {
  const redirect = getUrlParams('redirect');
  const userStore = useUserStore();
  const appStore = useAppStore();
  const { type, data: code } = e.data;
  if (!POSTMESSAGE_TYPE.includes(type)) return;
  console.log('收到消息', type, code);
  if (type === 'login_expired') {
    window.$message.error('登录错误，请重试~');
    clearLoginEnv();
    return;
  }
  try {
    let token = '';
    switch (type) {
      case 'qq_login':
        if (userStore.userInfo) {
          const res: any = await fetchBindQQ(code);
          window.$message.success(res.message);
          // eslint-disable-next-line
          userStore.getUserInfo();
        } else {
          const { data } = await fetchQQLogin(code);
          token = data;
        }
        break;
      case 'github_login':
        if (userStore.userInfo) {
          const res: any = await fetchBindGithub(code);
          window.$message.success(res.message);
          // eslint-disable-next-line
          userStore.getUserInfo();
        } else {
          const { data } = await fetchGithubLogin(code);
          token = data;
        }
        break;
    }
    userStore.setToken(token);
    // eslint-disable-next-line
    router.push(redirect || '/');
  } catch (error) {
    console.log(error);
  } finally {
    appStore.setLoading(false);
    clearLoginEnv();
  }
};

export const loginMessage = () => {
  window.addEventListener('message', handleLogin);
};

export const useQQLogin = () => {
  const url = (state: string) =>
    `${QQ_OAUTH_URL}client_id=${QQ_CLIENT_ID}&redirect_uri=${REDIRECT_URI}qq_login&scope=get_user_info,get_vip_info,get_vip_rich_info&state=${state}`;
  let loginEnv = JSON.stringify({
    isMobile: false,
    isAdmin: true,
    env: 'qq',
  });
  if (isMobile()) {
    loginEnv = JSON.stringify({ ...JSON.parse(loginEnv), isMobile: true });
    setLoginEnv(loginEnv);
    hrefToTarget(url(window.btoa(loginEnv)));
  } else {
    setLoginEnv(loginEnv);
    window.open(
      url(window.btoa(loginEnv)),
      'qq_login_window',
      'toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=no,titlebar=no,toolbar=no,resizable=no,copyhistory=yes, width=918, height=609,top=250,left=400'
    );
  }
};

export const useGithubLogin = () => {
  const url = (state: string) =>
    `${GITHUB_OAUTH_URL}client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}github_login&scope=user&state=${state}`;
  let loginEnv = JSON.stringify({
    isMobile: false,
    isAdmin: true,
    env: 'github',
  });
  if (isMobile()) {
    loginEnv = JSON.stringify({ ...JSON.parse(loginEnv), isMobile: true });
    setLoginEnv(loginEnv);
    hrefToTarget(url(window.btoa(loginEnv)));
  } else {
    setLoginEnv(loginEnv);
    window.open(
      url(window.btoa(loginEnv)),
      'github_login_window',
      'toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=no,titlebar=no,toolbar=no,resizable=no,copyhistory=yes, width=918, height=609,top=250,left=400'
    );
  }
};
