import cookies from 'js-cookie';

import { COOKIE_KEY } from '@/constant';

export const getLoginEnv = () => {
  return cookies.get(COOKIE_KEY.loginEnv);
};

export const setLoginEnv = (val) => {
  cookies.set(COOKIE_KEY.loginEnv, val, {
    domain: process.env.NODE_ENV === 'development' ? undefined : '.hsslive.cn',
  });
};

export const clearLoginEnv = () => {
  cookies.remove(COOKIE_KEY.loginEnv);
};
