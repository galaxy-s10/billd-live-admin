import { defineStore } from 'pinia';

type RootState = {
  detail: any;
};

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      detail: { id: -1 },
    } as RootState;
  },
  actions: {
    setDetail(payload: number) {
      console.log('setDetail的payload', payload);
    },
  },
});
