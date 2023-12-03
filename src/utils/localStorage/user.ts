import { LOCALSTORAGE_KEY } from '@/constant';
import cache from '@/utils/cache';

export const getToken = () => {
  return cache.getStorage<string>(LOCALSTORAGE_KEY.token);
};
export const setToken = (val: string) => {
  return cache.setStorage(LOCALSTORAGE_KEY.token, val);
};
export const clearToken = () => {
  return cache.clearStorage(LOCALSTORAGE_KEY.token);
};
