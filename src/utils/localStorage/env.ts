import { LOCALSTORAGE_KEY } from '@/constant';
import cache from '@/utils/cache';

export const getCurrEnv = () => {
  return cache.getStorageExp<string>(LOCALSTORAGE_KEY.currEnv);
};

export const setCurrEnv = (val) => {
  return cache.setStorageExp(LOCALSTORAGE_KEY.currEnv, val, 24);
};

export const clearCurrEnv = () => {
  return cache.clearStorage(LOCALSTORAGE_KEY.currEnv);
};
