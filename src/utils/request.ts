import axios, { Axios, AxiosRequestConfig } from 'axios';

import { AXIOS_BASEURL } from '@/constant';
import { useUserStore } from '@/stores/user';
import { getCurrEnv, getToken } from '@/utils/localStorage';

export interface MyAxiosPromise<T = any>
  extends Promise<{
    code: number;
    data: T;
    message: string;
  }> {}

interface MyAxiosInstance extends Axios {
  // eslint-disable-next-line
  (config: AxiosRequestConfig): MyAxiosPromise;
  // eslint-disable-next-line
  (url: string, config?: AxiosRequestConfig): MyAxiosPromise;
}

class MyAxios {
  // axios 实例
  instance: MyAxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // @ts-ignore
    this.instance = axios.create(config);

    // 请求拦截器
    this.instance.interceptors.request.use(
      (cfg) => {
        switch (getCurrEnv()) {
          case 'prod':
            cfg.baseURL = AXIOS_BASEURL;
            break;
          case 'beta':
            cfg.baseURL = AXIOS_BASEURL;
            break;
          case 'development':
            cfg.baseURL = '/api/';
            break;
          default:
            cfg.baseURL = '/api/';
            break;
        }
        const token = getToken();
        if (token) {
          // eslint-disable-next-line
          cfg.headers.Authorization = `Bearer ${token}`;
        }
        return cfg;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        console.log('response.config.url', response.config.url);
        console.log('response.data', response.data);
        return response.data;
      },
      (error) => {
        console.log('响应拦截到错误', error);
        if (error.message.indexOf('timeout') !== -1) {
          console.error(error.message);
          window.$message.error('请求超时，请重试');
        }
        const errorResponse = error.response;
        const errorMessage = error.message;
        if (error.response) {
          const whiteList = [400, 401, 403, 404, 500];
          const rspStatusCode = errorResponse.status as number;
          const rspData = errorResponse.data;
          if (!whiteList.includes(rspStatusCode)) {
            console.log('其他状态码');
            window.$message.error(error.message);
            return Promise.reject(error.message);
          }
          if (rspStatusCode === 401) {
            const userStore = useUserStore();
            userStore.logout();
          }
          if (rspStatusCode === 500) {
            window.$message.error(errorMessage);
          }
          if ([400, 401, 403, 404, 500].includes(rspStatusCode)) {
            if (rspData.message) {
              console.error(rspData.message);
              window.$message.error(rspData.message);
            }
            return Promise.reject(rspData);
          }
        } else {
          // 请求超时没有response
          console.error(errorMessage);
          window.$message.error(errorMessage);
          return Promise.reject(errorMessage);
        }
      }
    );
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): MyAxiosPromise<T> {
    return this.instance.get(url, config);
  }

  post<T = any>(
    url: string,
    data?: {} | undefined,
    config?: AxiosRequestConfig
  ): MyAxiosPromise<T> {
    return this.instance.post(url, data, config);
  }

  put<T = any>(
    url: string,
    data?: {} | undefined,
    config?: AxiosRequestConfig
  ): MyAxiosPromise<T> {
    return this.instance.put(url, data, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): MyAxiosPromise<T> {
    return this.instance.delete(url, config);
  }
}

export default new MyAxios({
  timeout: 1000 * 5,
});
