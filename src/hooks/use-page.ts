import { reactive } from 'vue';

export const usePage = () => {
  return reactive({
    page: 0, // 当前页
    itemCount: 0, // 总条数
    pageSize: 0, // 分页大小
    prefix({ itemCount }) {
      return `一共${itemCount}条数据`;
    },
  });
};
