import { defineStore } from 'pinia';

interface RootState {
  counter: number;
}

export const useAppStore = defineStore('app', {
  state: (): RootState => {
    return {
      counter: 1,
    };
  },
  actions: {
    setCounter(res: RootState['counter']) {
      this.counter = res;
    },
  },
});
