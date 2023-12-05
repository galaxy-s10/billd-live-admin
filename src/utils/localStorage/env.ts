import { LOCALSTORAGE_KEY } from '@/constant';
import cache from '@/utils/cache';

export const getCurrEnv = () => {
  return cache.getStorage<string>(LOCALSTORAGE_KEY.env);
};

export const setCurrEnv = (val: string) => {
  return cache.setStorage(LOCALSTORAGE_KEY.env, val);
};

export const clearCurrEnv = () => {
  return cache.clearStorage(LOCALSTORAGE_KEY.env);
};
