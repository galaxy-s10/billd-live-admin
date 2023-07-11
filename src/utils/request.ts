import axios, { AxiosRequestConfig } from 'axios';

import router from '@/router';
import { useUserStore } from '@/store/user';
import cache from '@/utils/cache';

import { getCurrEnv } from './localStorage';

const config: AxiosRequestConfig = {
  // baseURL: '/api/', // 本地开发：/api/，线上正式服：/prodapi/，线上测试服：/betaapi/
  timeout: 1000 * 5,
  withCredentials: true, // 允许跨域携带cookie信息
};
const service = axios.create(config);

export interface IResponse<T> {
  code: number;
  data: T;
  message: string;
}

// 请求拦截
service.interceptors.request.use(
  (cfg) => {
    switch (getCurrEnv()) {
      case 'prod':
        cfg.baseURL = 'https://api.hsslive.cn/prodapi/admin/';
        break;
      case 'beta':
        cfg.baseURL = 'https://api.hsslive.cn/betaapi/admin/';
        break;
      case 'development':
        cfg.baseURL = '/api/';
        break;
    }
    const token = cache.getStorageExp('token');
    if (token) {
      // @ts-ignore
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log('响应拦截到错误', error);
    if (error.message.indexOf('timeout') !== -1) {
      window.$message.error(error.message);
      return;
    }
    const userStore = useUserStore();
    const statusCode = error.response.status as number;
    const errorResponseData = error.response.data;
    const whiteList = ['400', '401', '403', '404'];
    if (error.response) {
      if (!whiteList.includes(`${statusCode}`)) {
        if (statusCode === 500) {
          let msg = errorResponseData.message;
          if (errorResponseData?.errorCode) {
            msg = errorResponseData.error;
          }
          window.$message.error(msg);
          return Promise.reject(msg);
        }
        window.$message.error(error.message);
        return Promise.reject(error);
      }
      if (statusCode === 400) {
        window.$message.error(errorResponseData.message);
        return Promise.reject(errorResponseData);
      }
      if (statusCode === 401) {
        window.$message.error(errorResponseData.message);
        userStore.logout();
        router.push('/login');
        window.close();
        window.opener?.postMessage(
          {
            type: 'login_expired',
            data: null,
          },
          '*'
        );
        return Promise.reject(errorResponseData);
      }
      if (statusCode === 403) {
        window.$message.error(errorResponseData.message);
        return Promise.reject(errorResponseData);
      }
      if (statusCode === 404) {
        window.$message.error(errorResponseData.message);
        return Promise.reject(errorResponseData);
      }
    } else {
      // 请求超时没有response
      window.$message.error(error.message);
      return Promise.reject(error.message);
    }
  }
);
export default service;
