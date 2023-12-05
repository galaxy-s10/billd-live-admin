import { LOCALSTORAGE_KEY } from '@/constant';
import cache from '@/utils/cache';

export const getToken = () => {
  return cache.getStorageExp<string>(LOCALSTORAGE_KEY.token);
};
export const setToken = (val: string) => {
  return cache.setStorageExp(LOCALSTORAGE_KEY.token, val, 24);
};
export const clearToken = () => {
  return cache.clearStorage(LOCALSTORAGE_KEY.token);
};
